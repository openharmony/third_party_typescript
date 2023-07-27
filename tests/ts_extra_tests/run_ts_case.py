#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#  Copyright (c) 2023 Huawei Device Co., Ltd.
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


import argparse
import os
import shutil

from tool.test_helper import get_path_file, get_disable_list, is_disable_case
from tool.testcfg import TestCase

TEMP_PATH = os.getcwd() + '/testTmp4/'

if os.path.exists(TEMP_PATH):
    shutil.rmtree(TEMP_PATH)

if not os.path.exists(TEMP_PATH):
    os.mkdir(TEMP_PATH)

total_case = 0
failed_case = 0
TestCase.temp_path = TEMP_PATH


def is_testcase_exist(parsers, arg):
    if not os.path.isabs(arg):
        arg = './' + arg
    if not os.path.exists(arg):
        parsers.error("The directory or file '%s' does not exist" % arg)
    return os.path.abspath(arg)


def is_file(parsers, arg):
    if not os.path.isfile(arg):
        parsers.error("The file '%s' does not exist" % arg)

    return os.path.abspath(arg)


def is_directory(parsers, arg):
    if not os.path.isdir(arg):
        parsers.error("The directory '%s' does not exist" % arg)

    return os.path.abspath(arg)


def parse_and_execute(path, ark_runtime=False, skip_negative=True):
    if path.endswith(".ts"):
        test_cases = TestCase(path)
        if not test_cases.is_test_case:
            return False, False
        # check test case declare
        if not test_cases.check_declaration():
            print(test_cases.path, test_cases.detail_result, sep='\t')
            return True, True
        if skip_negative and test_cases.is_negative():
            return False, False
        else:
            test_cases.execute(ark_runtime)
            if test_cases.fail:
                print('TESTCASE Fail! Fail reason is coming:')
                print(test_cases.path, test_cases.detail_result, sep='\t')
                return True, True
            return True, False
    else:
        return False, False


# create a parser object
parser = argparse.ArgumentParser(description="TypeScript Spec&Feature Test Tool")

# files or command
parser.add_argument("release", nargs='*', metavar="release", type=lambda arg: is_testcase_exist(parser, arg),
                    help="All test case in the release will be execute")

parser.add_argument("-a", "--ark_runtime", action="store_true", default=False, help="test on ark_runtime")

parser.add_argument("-s", "--skip-abnormal-case", action="store_true", default=False, help="skip abnormal test case")

parser.add_argument("-v", "--version", dest='limit_version', default=None, help="version limit")

# skip list
parser.add_argument("-d", "--disable-list", type=lambda arg: is_file(parser, arg), default=None,
                    help="path to the file that contains test to skip")

parser.add_argument(
    '--js-runtime', dest='js_runtime_path', default=None, type=lambda arg: is_directory(parser, arg),
    help='the path of js vm runtime')
parser.add_argument(
    '--LD_LIBRARY_PATH', dest='ld_library_path', default=None, help='LD_LIBRARY_PATH')

parser.add_argument(
    '--es2abc', dest='es2abc', default=None, help='ES2ABC_PATH')

parser.add_argument(
    '-tsc', dest='tsc', default="tsc", help='tsc')

# parse the arguments from standard input
args = parser.parse_args()
if args.js_runtime_path:
    TestCase.js_runtime_path = args.js_runtime_path
if args.ld_library_path:
    TestCase.ld_library_path = args.ld_library_path
if args.es2abc:
    TestCase.es2abc = args.es2abc

TestCase.tsc = args.tsc

disable_list = []
if args.disable_list:
    disable_list = get_disable_list(args.disable_list)

# tsc + node / es2abc
print("TEST CASE", "FAIL REASON", "FAIL LINE", sep="\t")

for file_path in args.release:
    root = file_path
    # gen abc file
    if args.ark_runtime:
        for file_paths in get_path_file("suite", None, True):
            if file_paths.endswith(".ts"):
                test_case = TestCase(file_paths)
                if not test_case.is_test_case:
                    test_case.create_abc(file_paths)

        for file_paths in get_path_file("test_ts_cases", None, True):
            if file_paths.endswith(".ts"):
                test_case = TestCase(file_paths)
                if not test_case.is_test_case:
                    test_case.create_abc(file_paths)

    if is_disable_case(file_path, disable_list):
        continue
    if os.path.isfile(file_path):
        is_test_count, failed = parse_and_execute(file_path, args.ark_runtime, args.skip_abnormal_case)
        if is_test_count:
            total_case += 1
            if failed:
                failed_case += 1
        continue
    for file_paths in get_path_file(file_path, None, True, args.limit_version):
        if not file_paths.endswith(".ts"):
            continue
        if is_disable_case(file_paths, disable_list):
            continue
        is_test_count, failed = parse_and_execute(file_paths, args.ark_runtime, args.skip_abnormal_case)
        if is_test_count:
            total_case += 1
            if failed:
                failed_case += 1

# delete abc files
if args.ark_runtime:
    for file_paths in get_path_file("suite", None, True):
        if file_paths.endswith(".abc"):
            if os.path.exists(file_paths):
                os.remove(file_paths)

    for file_paths in get_path_file("test_ts_cases", None, True):
        if file_paths.endswith(".abc"):
            if os.path.exists(file_paths):
                os.remove(file_paths)
        if file_paths.endswith(".ts"):
            if os.path.exists(file_paths):
                file = open(file_paths, 'r')
                lines = file.readlines()
                if lines[-1] == 'print("TESTCASE SUCCESS");':
                    lines.pop()
                    lines[-1] = lines[-1].replace('\n', '')
                    file = open(file_paths, 'w')
                    file.writelines(lines)
                    file.close()

print("TOTAL CASE COUNT:%d" % total_case)
print("SUCCESS CASE COUNT:%d" % (total_case-failed_case))
print("FAILED CASE COUNT:%d" % failed_case)
# delete temp dir
if os.path.exists(TEMP_PATH):
    shutil.rmtree(TEMP_PATH)
