#!/usr/bin/env python
# coding: utf-8
# Copyright (c) 2023 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import shutil
import sys
import subprocess

def copy_dir(source_path, dest_path):
    try:
        shutil.rmtree(dest_path)
        shutil.copytree(source_path, dest_path, dirs_exist_ok=True, symlinks=True)
    except Exception as err:
        raise Exception(err.decode())


def run_cmd(cmd, execution_path=None):
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE,
                           stdin=subprocess.PIPE,
                           stderr=subprocess.PIPE,
                           cwd=execution_path)
    stdout, stderr = proc.communicate()
    if proc.returncode != 0:
        print(stdout.decode(), stderr.decode())
        raise Exception(stderr.decode())


def run_gulp(execution_path):
    run_cmd(["npm", "run", "clean"], execution_path)
    run_cmd(["npm", "run", "build"], execution_path)
    run_cmd(["npm", "run", "release"], execution_path)


def run_pack(execution_path):
    run_cmd(["npm", "pack"], execution_path)


def main(args):
    source_path = args[0]
    dest_and_exec_path = args[1]
    copy_dir(source_path, dest_and_exec_path)
    run_gulp(dest_and_exec_path)
    run_pack(dest_and_exec_path)


if __name__ == '__main__':
    main(sys.argv[1:])