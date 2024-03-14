from datetime import datetime
import json5
import os
import pandas as pd
import shutil
import subprocess
import sys


def parse_args():
    projects = []
    if len(sys.argv) > 1:
        if sys.argv[1].endswith(".txt"):
            list_file = sys.argv[1]
            with open(list_file, "r", encoding='utf-8') as f:
                projects = [line.strip() for line in f.readlines()]
        else:
            path = sys.argv[1]
            projects.append(path)
    return projects


def read_build_profile_config(buildProfileJson):
    if not os.path.exists(buildProfileJson):
        raise FileNotFoundError("FileNotFoundError " + buildProfileJson)
    with open(buildProfileJson, "r", encoding='utf-8') as file:
        content = json5.load(file)
        runtimeOS = "OpenHarmony"
        if 'runtimeOS' in content['app']['products'][0]:
            runtimeOS = content['app']['products'][0]['runtimeOS']
    return content, runtimeOS


def need_update_sdk_version(buildProfileJson, buildProfileJsonContent, runtimeOS):
    need = False
    targetVersion = 10 if runtimeOS == 'OpenHarmony' else '4.0.0(10)'
    if 'compileSdkVersion' in buildProfileJsonContent['app']:
        currentCompileSdkVersion = buildProfileJsonContent['app']['compileSdkVersion']
        currentcompatibleSdkVersion = buildProfileJsonContent['app']['compatibleSdkVersion']
        if currentCompileSdkVersion < 10:
            need = True
            buildProfileJsonContent['app']['products'][0]['compileSdkVersion'] = 10
            buildProfileJsonContent['app']['products'][0]['compatibleSdkVersion'] = 10
            del buildProfileJsonContent['app']['compileSdkVersion']
            del buildProfileJsonContent['app']['compatibleSdkVersion']
    else:
        currentCompileSdkVersion = buildProfileJsonContent['app']['products'][0]['compileSdkVersion']
        currentcompatibleSdkVersion = buildProfileJsonContent['app']['products'][0]['compatibleSdkVersion']
        if currentCompileSdkVersion < targetVersion:
            need = True
            buildProfileJsonContent['app']['products'][0]['compileSdkVersion'] = targetVersion
        if currentcompatibleSdkVersion < targetVersion:
            need = True
            buildProfileJsonContent['app']['products'][0]['compatibleSdkVersion'] = targetVersion
        if 'targetSdkVersion' in buildProfileJsonContent['app']['products'][0]:
            need = True
            buildProfileJsonContent['app']['products'][0]['targetSdkVersion'] = 10
        # # change arkTSVersion to 1.0 or 1.1
        # if 'arkTSVersion' not in buildProfileJsonContent['app']['products'][0]:
        #     need = True
        #     buildProfileJsonContent['app']['products'][0]['arkTSVersion'] = "1.0"
        #
        # # if need del arkTSVersion param
        # if 'arkTSVersion' in buildProfileJsonContent['app']['products'][0]:
        #     need = True
        #     del buildProfileJsonContent['app']['products'][0]['arkTSVersion']
    return need


def update_sdk_version(buildProfileJson, buildProfileJsonContent):
    with open(buildProfileJson, "w", encoding='utf-8', newline='\n') as file:
        json5.dump(buildProfileJsonContent, file, indent=2)


def read_hvigor_config(hvigorConfigJson):
    if not os.path.exists(hvigorConfigJson):
        raise FileNotFoundError("FileNotFoundError " + hvigorConfigJson)
    with open(hvigorConfigJson, "r", encoding='utf-8') as file:
        content = json5.load(file)
        return content


def need_update_hvigor_version(hvigorConfigJsonContent, runtimeOS):
    need = False
    if runtimeOS == "OpenHarmony":
        if hvigorConfigJsonContent['hvigorVersion'] != '4.0.4':
            need = True
            hvigorConfigJsonContent['hvigorVersion'] = '4.0.4'
        if hvigorConfigJsonContent['dependencies']['@ohos/hvigor-ohos-plugin'] != '4.0.4':
            need = True
            hvigorConfigJsonContent['dependencies']['@ohos/hvigor-ohos-plugin'] = '4.0.4'
    if runtimeOS == "HarmonyOS":
        if hvigorConfigJsonContent['hvigorVersion'] != '4.0.4':
            need = True
            hvigorConfigJsonContent['hvigorVersion'] = '4.0.4'
        if hvigorConfigJsonContent['dependencies']['@ohos/hvigor-ohos-plugin'] != '4.0.4':
            need = True
            hvigorConfigJsonContent['dependencies']['@ohos/hvigor-ohos-plugin'] = '4.0.4'
    return need


def update_hvigor_version(hvigorConfigJson, hvigorConfigJsonContent):
    with open(hvigorConfigJson, "w", encoding='utf-8', newline='\n') as file:
        json5.dump(hvigorConfigJsonContent, file, indent=2)


def prepare_project_config(project):
    if not os.path.exists(project):
        raise FileNotFoundError("FileNotFoundError " + project)

    localProperties = os.path.join(project, "local.properties")
    localPropertiesTemplate = "local.properties" # "local.properties" file in pwd
    shutil.copy(localPropertiesTemplate, localProperties)

    buildProfileJson = os.path.join(project, "build-profile.json5")
    buildProfileJsonContent, runtimeOS = read_build_profile_config(buildProfileJson)
    if need_update_sdk_version(buildProfileJson, buildProfileJsonContent, runtimeOS):
        update_sdk_version(buildProfileJson, buildProfileJsonContent)

    hvigorConfigJson = os.path.join(project, "hvigor", "hvigor-config.json5")
    hvigorConfigJsonContent = read_hvigor_config(hvigorConfigJson)
    if need_update_hvigor_version(hvigorConfigJsonContent, runtimeOS):
        update_hvigor_version(hvigorConfigJson, hvigorConfigJsonContent)
    wrapperJSPath = os.path.join(project, 'hvigor', 'hvigor-wrapper.js')
    update_hvigor_wrapper(wrapperJSPath)
    return buildProfileJsonContent


def update_hvigor_wrapper(wrapperJSPath):
    if os.path.exists('./hvigor-wrapper.js'):
        shutil.copy2('./hvigor-wrapper.js', wrapperJSPath)


def run_command(cmd, path):
    result = subprocess.run(cmd, cwd=path, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return result


def get_stderr(result):
    try:
        return result.stderr.decode()
    except:
        return result.stderr.decode('gbk')


def ohpm_install(project, buildProfileJsonContent):
    modules = buildProfileJsonContent['modules']
    modulesNames = [m['name'] for m in modules]
    install_cmd = 'ohpm install --all'
    log = ''
    result = run_command(install_cmd, project)
    log = result.stdout.decode() + get_stderr(result)
    install_cmd = 'cd ' + project + '; ' + install_cmd
    print(install_cmd)
    print(log)
    if result.returncode != 0:
        return install_cmd, log, False
    for m in modulesNames:
        modulePackageJson = os.path.join(project, m, 'oh-package.json5')
        if os.path.exists(modulePackageJson):
            cmd = 'ohpm install --all'
            result = run_command(cmd, os.path.join(project, m))
            cmd = 'cd ' + os.path.join(project, m) + '; ' + cmd
            print(cmd)
            install_cmd = install_cmd + '\n' + cmd
            log = result.stdout.decode() + get_stderr(result)
            print(log)
            if result.returncode != 0:
                return install_cmd, log, False
    return install_cmd, log, True


def sync_project(project):
    hvigorw_tool = ".\hvigorw.bat" if os.name == "nt" else "./hvigorw"
    sync_cmd = f"{hvigorw_tool} --sync -p product=default --parallel;"
    print(sync_cmd)
    result = run_command(sync_cmd, project)
    pass_info = "Finished ::init..."
    ret = True
    if not pass_info in result.stdout.decode():
        ret = False
    log = result.stdout.decode() + get_stderr(result)
    print(log)
    return "cd " + project + "; " + sync_cmd, log, True


def build_entry(project):
    hvigorw_tool = ".\hvigorw.bat" if os.name == "nt" else "./hvigorw"
    build_entry_cmd = f"{hvigorw_tool} clean --mode module -p product=default assembleHap --parallel;"
    print(build_entry_cmd)
    result = run_command(build_entry_cmd, project)
    pass_info = "BUILD SUCCESSFUL in"
    ret = True
    if not pass_info in result.stdout.decode():
        ret = False
    log = result.stdout.decode() + get_stderr(result)
    print(log)
    return build_entry_cmd, log, ret


def build_libraries(project, buildProfileJsonContent):
    modules = buildProfileJsonContent['modules']
    libs = [m['name'] + '@default' for m in modules if m['name'] != 'entry']
    if len(libs) < 1:
        return "", "", True
    hvigorw_tool = ".\hvigorw.bat" if os.name == "nt" else "./hvigorw"
    build_lib_cmd = f'{hvigorw_tool} clean --mode module -p module=' + \
                    ','.join(libs) + \
                    ' -p product=default assembleHar --parallel'
    print(build_lib_cmd)
    result = run_command(build_lib_cmd, project)
    pass_info = "BUILD SUCCESSFUL in"
    check_info = "LintArkTS..."
    ret = True
    if not pass_info in result.stdout.decode():
        ret = False
    if not check_info in result.stdout.decode():
        ret = False
    log = result.stdout.decode() + get_stderr(result)
    print(log)
    return build_lib_cmd, log, ret


def build_ohosTest(project):
    hvigorw_tool = ".\hvigorw.bat" if os.name == "nt" else "./hvigorw"
    build_ohosTest_cmd = f"{hvigorw_tool} --mode module -p module=entry@ohosTest -p buildMode=test clean assembleHap --parallel"
    print(build_ohosTest_cmd)
    result = run_command(build_ohosTest_cmd, project)
    pass_info = "BUILD SUCCESSFUL in"
    ret = True
    if not pass_info in result.stdout.decode():
        ret = False
    log = result.stdout.decode() + get_stderr(result)
    print(log)
    return build_ohosTest_cmd, log, ret


def build_single_project(project, datas):
    print("==================================================================")
    print("Start build " + project + "...")
    try:
        buildProfileJsonContent = prepare_project_config(project)
        cmd, log, ret = ohpm_install(project, buildProfileJsonContent)

        sync_ret = False
        entry_ret = False
        lib_ret = False
        xts_ret = False

        if ret:
            sync_cmd, sync_log, sync_ret = sync_project(project)
            cmd = cmd + '\n' + sync_cmd
            log = log + '\n' + sync_log

        if sync_ret:
            entry_cmd, entry_log, entry_ret = build_entry(project)
            cmd = cmd + '\n' + entry_cmd
            log = log + '\n' + entry_log

            lib_cmd, lib_log, lib_ret = build_libraries(project, buildProfileJsonContent)
            cmd = cmd + '\n' + lib_cmd
            log = log + '\n' + lib_log

            xts_cmd, xts_log, xts_ret = build_ohosTest(project)
            cmd = cmd + '\n' + xts_cmd
            log = log + '\n' + xts_log

        ret = ret and sync_ret and entry_ret and lib_ret and xts_ret

    except Exception as err:
        cmd = ""
        log = "Exception: " + str(err)
        ret = False

    data = pd.DataFrame({
        'name': [project],
        'cmd': [cmd],
        'log': [log],
        'ret': [ret]
    })
    datas = pd.concat([datas, data], ignore_index=True)
    datas.reset_index()
    return datas


def build_mutiple_projects(projects, datas):
    for project in projects:
        datas = build_single_project(project, datas)
        try:
            datas.to_excel('tmp.xlsx', index=False)
        except:
            datas.to_json('tmp.json', orient="records")
    return datas


def count_error_type(df):
    df['error'] = ''
    for i in df[df['ret'] == False].index:
        error_count = {}
        log = str(df['log'][i])
        lines = log.splitlines()
        for j, line in enumerate(lines):
            if 'ArkTS:ERROR File' in line:
                if j + 1 < len(lines):
                    error = lines[j + 1]
                    if error in error_count:
                        error_count[error] += 1
                    else:
                        error_count[error] = 1
        df['error'][i] = error_count
    return df


def main():
    starttime = datetime.now()
    projects = parse_args()
    datas = pd.DataFrame(columns=['name', 'cmd', 'log', 'ret'])
    datas = build_mutiple_projects(projects, datas)
    datas = count_error_type(datas)
    now = datetime.now().strftime("%Y%m%d_%H%M%S")
    try:
        datas.to_excel('tmp.xlsx', engine='xlsxwriter', index=False)
        os.rename('tmp.xlsx', now + '_output.xlsx')
    except Exception as e:
        datas.to_json('tmp.json', orient="records")
        os.rename('tmp.json', now + '_output.json')
    print(f"Test total cost {(datetime.now() - starttime).seconds} seconds")


if __name__ == "__main__":
    main()
