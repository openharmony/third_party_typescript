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


import os
import json
import autotest_sdk


class MainClass:
    path = ''
    work_path = ''

    def __init__(self, path, expected_path='', tsimportsendable=False) -> None:
        self.path = path
        self.sdklinter = autotest_sdk.SDKLinterTest(path, expected_path, tsimportsendable)

    def diff(self):
        data_sdk = self.sdklinter.data_sdk


def run(configs):
    print(configs["project_path"], configs["expected_path"])
    m = MainClass(
        configs["project_path"], expected_path=configs["expected_path"], tsimportsendable=configs["tsimportsendable"]
    )
    if configs["mode"] == "sdk":
        obj = m.sdklinter
    obj.open_output()
    if configs["verify"]:
        obj.verify()
    if configs["update"]:
        obj.update()


def set_environment_variables(configs):
    if configs["ide_enabled"]:
        ide_path = configs["ide_path"]
        deveco_sdk_home = os.path.join(ide_path, "sdk")
        current_path = os.environ.get("PATH", "")
        new_path = (
            os.path.join(ide_path, "tools", "ohpm", "bin")
            + os.pathsep
            + os.path.join(ide_path, "tools", "hvigor", "bin")
            + os.pathsep
            + os.path.join(ide_path, "tools", "node")
            + os.pathsep
            + current_path
        )
        os.environ["IDE_HOME"] = ide_path
        os.environ["DEVECO_SDK_HOME"] = deveco_sdk_home
    else:
        tools_path = configs["command_line_tools_path"]
        java_home = configs["java_home"]
        current_path = os.environ.get("PATH", "")
        new_path = (
            os.path.join(java_home, "bin")
            + os.pathsep
            + os.path.join(tools_path, "tool", "node", "bin")
            + os.pathsep
            + os.path.join(tools_path, "bin")
            + os.pathsep
            + current_path
        )
        os.environ["JAVA_HOME"] = java_home

    os.environ["PATH"] = new_path


def process_config():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(script_dir, 'config.json')
    with open(config_path, 'r') as f:
        config = json.load(f)
    return config


def main():
    configs = process_config()
    set_environment_variables(configs)
    run(configs)


if __name__ == '__main__':
    main()
