#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# Copyright (c) 2024 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import re
import json
import json5
import os
import subprocess


class Utils:
    def run_command(self, cmd, path):
        result = subprocess.run(cmd, cwd=os.path.abspath(path), shell=True,
                                stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return result

    def get_stderr(self, result):
        try:
            return result.stderr.decode()
        except Exception as e:
            return result.stderr.decode('gbk')

    def remove_ansi_colors(self, text):
        code_pattern = r"\x1b\[[0-9;]*[A-Za-z]"
        return re.sub(code_pattern, '', text)

    def remove_numbering(self, text):
        numbering_list = re.findall(r"(\d+ )(\S+):", text)
        for match in numbering_list:
            text = text.replace(match[0], '', 1)
        return text
    
    def split_log(self, log):
        log_parts = re.split(r"\n\x1b\[33m|\n\x1b\[31m", log)
        build_info = []
        for part in log_parts:
            clean_part = self.remove_ansi_colors(part)
            build_info.append(clean_part)
    
        return build_info


class SDKLinterTest:
    project_path = ''
    expected_path = 'tmp'
    tsimportsendable = False
    old_tsimportsendable = False
    data = []
    utils = Utils()
    build_info = []

    def __init__(self, project_path='', expected_path='', tsimportsendable=False) -> None:
        self.project_path = project_path.replace('\\', '/')
        self.expected_path = expected_path.replace('\\', '/')
        self.tsimportsendable = tsimportsendable

    def get_sdk_result(self):
        log = ''
        install_tool = "ohpm.bat" if os.name == "nt" else "ohpm"
        hvigorw_tool = "hvigorw.bat" if os.name == "nt" else "hvigorw"
        clean_cmd = f"{hvigorw_tool} -p product=default clean --analyze=normal --parallel --incremental --daemon;"
        self.utils.run_command(clean_cmd, self.project_path)
        install_cmd = f"{install_tool} install --all --registry https://repo.harmonyos.com/ohpm/ --strict_ssl true"
        print(install_cmd)
        result = self.utils.run_command(install_cmd, self.project_path)
        log = result.stdout.decode() + self.utils.get_stderr(result)
        install_cmd = 'cd ' + self.project_path + '; ' + install_cmd
        print(log)

        sync_cmd = f"{hvigorw_tool} --sync -p product=default --analyze=normal --parallel --incremental --daemon;"
        print(sync_cmd)
        result = self.utils.run_command(sync_cmd, self.project_path)
        log = result.stdout.decode() + self.utils.get_stderr(result)
        print(log)

        print(clean_cmd)
        clean_result = self.utils.run_command(clean_cmd, self.project_path)
        build_cmd = f"{hvigorw_tool} clean --mode module -p product=default assembleHap --analyze=normal --parallel --incremental --daemon;"
        build_result = self.utils.run_command(build_cmd, self.project_path)
        log = build_result.stdout.decode() + self.utils.get_stderr(build_result)
        print(log)

        print('=' * 60)
        if os.name == "nt":
            self.build_info = self.utils.remove_ansi_colors(log).split('\r\n')
        else:
            self.build_info = self.utils.split_log(log)

    def open_output(self):
        self.set_tsimportsendable(self.tsimportsendable)
        self.get_sdk_result()
        self.set_tsimportsendable(self.old_tsimportsendable)
        errors = self._split_errors_list()
        self.data = []
        hash_index_map = dict()
        for error in errors:
            filepath = self._get_filepath(error)
            # If filepath in SDK, skip it.
            if not filepath:
                print('Report info filepath is not in DevEcoProject:\n', error)
                continue
            row_col_info = re.findall(r".[ts|ets]:(\d+:\d+)", error)
            row, col = (row_col_info[0].split(
                ':')) if filepath and row_col_info else (-1, -1)

            error_info = re.findall(r"\n.*", error, re.DOTALL)
            error_level = re.findall(r"^\d+ (\S+):", error)
            if error_level:
                if error_level[0] == 'WARN':
                    error_level = 1
                elif error_level[0] == 'ERROR':
                    error_level = 2
            if filepath in hash_index_map:
                group_i = self.data[hash_index_map[filepath]]
            else:
                group_i = dict()
                group_i['filePath'] = filepath
                group_i['defects'] = []
                hash_index_map[filepath] = len(self.data)
                self.data.append(group_i)
            origin_error = self.utils.remove_numbering(error)
            if error_info:
                description = error_info[0]
                description = self.utils.remove_numbering(description)
            group_i["defects"].append(
                {
                    "origin": self._remove_more_info(origin_error)
                    .strip()
                    .replace(self.project_path, ""),
                    "severity": error_level,
                    "reportLine": int(row),
                    "reportColumn": int(col),
                    "description": (
                        self._remove_more_info(description)
                        .strip()
                        .replace(self.project_path, "")
                        if error_info
                        else ""
                    ),
                }
            )
        d = self.empty_report(hash_index_map)
        self.data.extend(d)

    def empty_report(self, hash_index_map):
        items = os.listdir(os.path.abspath(self.expected_path))

        empty_data = []
        for item in items:
            file_path = os.path.join(self.expected_path, item)
            if os.path.isfile(file_path):
                with open(file_path) as f:
                    d_json = json.load(f)
                    if 'sdklinter' in d_json:
                        if d_json['sdklinter']['filePath'] not in hash_index_map:
                            empty_data.append({
                                'filePath': d_json['sdklinter']['filePath'],
                                'defects': []
                            })
        return empty_data

    def update(self):
        self._data_sort()
        for i in self.data:
            file_path = os.path.join(self.expected_path, os.path.splitext(
                os.path.basename(i['filePath']))[0] + '-expected.json')
            read_data = dict()
            if os.path.exists(file_path) and os.path.isfile(file_path):
                with open(file_path) as f:
                    read_data = json.load(f)
            with open(file_path, 'w', encoding='utf-8') as f:
                read_data['sdklinter'] = i
                json.dump(read_data, f, indent=4)
        print('update done!')

    def verify(self):
        self._data_sort()
        expected_dicts = self._load_expected_files()
        output = []
        for i in expected_dicts:
            pass_flag = False
            for j in self.data:
                if i['filePath'] == j['filePath'] and i == j:
                    pass_flag = True
            output.append([i['filePath'], pass_flag])
        FILEPATH, PASS_FLAG = 0, 1
        files = [i[FILEPATH] for i in output]
        for i in self.data:
            if i['filePath'] not in files:
                output.append([i['filePath'], False])
        output.sort(key=lambda x: x[PASS_FLAG] is False)
        once = False  # Run once, print '===='
        for i in output:
            if once is not True and i[PASS_FLAG] is False:
                print('=' * 60)
                once = True
            print(*i)

    def set_tsimportsendable(self, tsimportsendable=False):
        hvigor_config = os.path.join(self.project_path, "hvigor", "hvigor-config.json5")
        if not os.path.exists(hvigor_config):
            return
        with open(hvigor_config) as f:
            config_data = json5.load(f)
        properties = config_data.setdefault("properties", {})
        self.old_tsimportsendable = properties.get("ark.tsImportSendable", False)
        properties["ark.tsImportSendable"] = tsimportsendable
        with open(hvigor_config, "w") as f:
            json5.dump(config_data, f, indent=4)

    def _split_errors_list(self):
        lines = self.build_info
        idx_list = []
        start_end = []
        for idx, line in enumerate(lines):
            if 'ArkTS:ERROR File' in line or 'ArkTS:WARN File' in line:
                idx_list.append(idx)
            elif 'COMPILE RESULT:FAIL' in line:
                idx_list.append(idx)
            lines[idx] = lines[idx]
        errors = []
        for i in range(len(idx_list) - 1):
            start, end = idx_list[i], idx_list[i + 1]
            errors.append('\n'.join(lines[start:end]) + '\n')
        return errors

    def _get_filepath(self, error):
        file_path = re.findall(self.project_path + '/(.*?):', error)
        file_path = file_path[0] if file_path else ''
        if file_path == '':
            error = error.replace('\\', '/')
            file_path = re.findall(self.project_path + '/(.*?):', error)
            file_path = file_path[0] if file_path else ''
        return file_path

    def _remove_more_info(self, error_msg):
        if "> More Info" in error_msg:
            error_msg = error_msg.split("> More Info")[0]
        return error_msg

    def _load_expected_files(self):
        expected_dicts = []
        for root, dirs, files in os.walk(self.expected_path):
            for file in files:
                with open(os.path.join(root, file), 'r') as f:
                    expected_dict = json.load(f)
                    sdklinter = expected_dict['sdklinter']
                    for defect in sdklinter['defects']:
                        defect['origin'] = defect['origin'].strip()
                        defect['description'] = defect['description'].strip()
                    expected_dicts.append(sdklinter)
        return expected_dicts

    def _data_sort(self):
        for i in self.data:
            i['defects'].sort(key=lambda x: (
                x['reportLine'], x['reportColumn'], -x['severity'], x['origin']))
