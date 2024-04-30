#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#  Copyright (c) 2023-2024 Huawei Device Co., Ltd.
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.


import re
import os, platform


def read_declaration(path):
    start_pattern = re.compile(r'^\/\*\*\-*')
    end_pattern = re.compile(r'^\s*\-+\*\/')
    context = ""
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        declaration_begin = False
        while True:
            line = f.readline()
            if not line:
                break
            if start_pattern.match(line):
                declaration_begin = True
                continue
            if end_pattern.match(line):
                declaration_begin = False
                break
            if declaration_begin:
                context += line
    return context


def list_root_directorys_new(directorys_in_root, filtered_directories, max_ts_version):
    # directorys_in_root like: ['2.0', '2.1', '2.2', ... '4.9', 'spec']
    if max_ts_version is None:
        filtered_directories = directorys_in_root
    else:
        max_ts_version = float(max_ts_version)
        for f_item in directorys_in_root:
            if f_item == 'spec':
                filtered_directories.append(f_item)
                continue
            try:
                f_num = float(f_item)
                if f_num <= max_ts_version:
                    filtered_directories.append(f_item)
            except Exception as e:
                print(e)

    return filtered_directories


def list_all_test_files_in_dir(dir_path, all_file_path=None, limit_version=None):
    if all_file_path is None:
        all_file_path = []

    if dir_path.endswith("test_ts_cases") or dir_path.endswith("test_ts_cases/"):
        is_root = True
    else:
        is_root = False

    items_in_dir = os.listdir(dir_path)
    filtered_directories = []

    if is_root:
        filtered_directories = list_root_directorys_new(items_in_dir, filtered_directories, limit_version)
    else:
        filtered_directories = items_in_dir

    for file_dir in filtered_directories:
        file_or_dir_path = os.path.join(dir_path, file_dir)
        if platform.system().lower() != 'windows' and '\\' in file_or_dir_path:
            file_or_dir_path = file_or_dir_path.replace('\\', '/')

        if os.path.isdir(file_or_dir_path):
            list_all_test_files_in_dir(file_or_dir_path, all_file_path, None)
        else:
            all_file_path.append(file_or_dir_path)

    return all_file_path


def get_disable_list(file_path):
    disable_list = []
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        while True:
            line = f.readline()
            if not line:
                break
            if platform.system().lower() == 'windows':
                line = line.replace('/', '\\')
            disable_list.append(line.strip())
    return disable_list

def is_disabled_case(file_path, disable_list):
    if disable_list is None:
        return False

    for one in disable_list:
        if file_path.endswith(one.strip()):
            return True

    return False