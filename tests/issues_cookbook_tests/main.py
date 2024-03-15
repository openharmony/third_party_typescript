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

import argparse
import autotest_sdk


class MainClass:
    path = ''
    work_path = ''

    def __init__(self, path, expected_path='') -> None:
        self.path = path
        self.sdklinter = autotest_sdk.SDKLinterTest(path, expected_path)

    def diff(self):
        data_sdk = self.sdklinter.data_sdk


def run():
    parser = argparse.ArgumentParser(description='test for ArkTS')
    parser.add_argument('--project_path', help='project path.')
    parser.add_argument('--expected_path', default='',
                        help='expected files dir')
    parser.add_argument(
        '--mode', help='set object to sdk or codelinter. TODO future RT.')
    parser.add_argument('--verify', action='store_true', help='verify')
    parser.add_argument('--update', action='store_true', help='update')

    args = parser.parse_args()
    print(args.project_path,args.expected_path)
    m = MainClass(args.project_path, expected_path=args.expected_path)
    if args.mode == 'sdk':
        obj = m.sdklinter
    obj.open_output()
    if args.verify:
        obj.verify()
    if args.update:
        obj.update()


if __name__ == '__main__':
    run()
