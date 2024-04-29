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


import argparse
import os
import shutil

from tool.test_helper import list_all_test_files_in_dir, get_disable_list, is_disabled_case
from tool.testcfg import TestCase

TEMP_DIR_NAME = ".local/"

def is_testcase_exist(parsers, arg):
    if not os.path.isabs(arg):
        arg = './' + arg
    if not os.path.exists(arg):
        parsers.error("The directory or file '%s' does not exist" % arg)
    return arg


def is_file(parsers, arg):
    if not os.path.isfile(arg):
        parsers.error("The file '%s' does not exist" % arg)

    return os.path.abspath(arg)


def is_directory(parsers, arg):
    if not os.path.isdir(arg):
        parsers.error("The directory '%s' does not exist" % arg)

    return os.path.abspath(arg)


def parse_and_execute(path, ark_runtime=False, skip_negative=True):
    if (path.endswith(".ts") | path.endswith(".tsx")):
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

def parse_input_args():
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

    parser.add_argument(
        '--enable-arkguard', dest='enable_arkguard', action="store_true", default=False, help='enable arkguard for each test')

    # parse the arguments from standard input
    args = parser.parse_args()
    return args

def copy_directory(src_dir, target_dir):
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
    shutil.copytree(src_dir, target_dir)


def copy_dir_to_temp(work_dir, dir_name, temp_dir):
    src_dir = os.path.join(work_dir, dir_name)
    target_dir = os.path.join(temp_dir, dir_name)
    copy_directory(src_dir, target_dir)

def prepare_for_js_runtime(args):
    if args.js_runtime_path:
        TestCase.js_runtime_path = args.js_runtime_path
    if args.ld_library_path:
        TestCase.ld_library_path = args.ld_library_path
    if args.es2abc:
        TestCase.es2abc = args.es2abc

    TestCase.tsc = args.tsc


def prepare_for_work_space():
    work_dir = os.getcwd()
    temp_dir = os.path.join(work_dir, TEMP_DIR_NAME)
    TestCase.temp_path = temp_dir

    copy_dir_to_temp(work_dir, "suite", temp_dir)
    copy_dir_to_temp(work_dir, "test_ts_cases", temp_dir)


def parse_disabled_list(args):
    disable_list = []
    if args.disable_list:
        disable_list = get_disable_list(args.disable_list)
    return disable_list


def prepare(args):
    prepare_for_work_space()
    prepare_for_js_runtime(args)

    if args.enable_arkguard:
        TestCase.enable_arkguard = True;

    disable_list = parse_disabled_list(args)
    suite_files = list_all_test_files_in_dir("%s/suite" % (TEMP_DIR_NAME), None)
    case_files = []
    for target_path in args.release:
        files = list_all_test_files_in_dir("%s/%s" % (TEMP_DIR_NAME, target_path), None, args.limit_version)
        case_files += files
    return disable_list, suite_files, case_files


def clean():
    # delete temp dir
    if os.path.exists(TEMP_DIR_NAME):
        shutil.rmtree(TEMP_DIR_NAME)


def run_cases(args, suite_files, case_files, disable_list):
    total_case = 0
    failed_case = 0

    for file_path in args.release:
        # gen abc file
        if args.ark_runtime:
            for file_paths in suite_files:
                if file_paths.endswith(".ts") | file_paths.endswith(".tsx"):
                    test_case = TestCase(file_paths)
                    if not test_case.is_test_case:
                        test_case.create_abc(file_paths)

            for file_paths in case_files:
                if file_paths.endswith(".ts") | file_paths.endswith(".tsx"):
                    test_case = TestCase(file_paths)
                    if not test_case.is_test_case:
                        test_case.create_abc(file_paths)

        if is_disabled_case(file_path, disable_list):
            continue
        if os.path.isfile(file_path):
            is_test_count, failed = parse_and_execute(file_path, args.ark_runtime, args.skip_abnormal_case)
            if is_test_count:
                total_case += 1
                if failed:
                    failed_case += 1
            continue

        for file_paths in case_files:
            if not file_paths.endswith(".ts") | file_paths.endswith(".tsx"):
                continue
            if is_disabled_case(file_paths, disable_list):
                continue
            is_test_count, failed = parse_and_execute(file_paths, args.ark_runtime, args.skip_abnormal_case)
            if is_test_count:
                total_case += 1
                if failed:
                    failed_case += 1
    return total_case, failed_case


def print_result(total_case, failed_case):
    print("TOTAL CASE COUNT:   %d" % total_case)
    print("SUCCESS CASE COUNT: %d" % (total_case - failed_case))
    print("FAILED CASE COUNT:  %d" % failed_case)


def main():
    args = parse_input_args()
    disable_list, suite_files, case_files = prepare(args)

    # tsc + node / es2abc
    print("TEST CASE", "FAIL REASON", "FAIL LINE", sep="\t")
    total_case, failed_case = run_cases(args, suite_files, case_files, disable_list)

    print_result(total_case, failed_case)
    clean()


main()
