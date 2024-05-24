# ArkTS语法约束规则集测试用例

## 项目说明

本项目旨在对[从TypeScript到ArkTS的适配规则](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/quick-start/typescript-to-arkts-migration-guide.md)中的约束规则通过脚本方式进行验证并输出用例的测试结果报告。

其中测试用例默认存放在`testcase`目录，运行结果存放在`test_results`目录。

## 项目要求

1. 提供对ArkTS语法约束规则集的测试用例集
2. 框架能对用例集中的用例进行测试，并返回测试结果，成功/失败用例详情。并支持可选屏蔽用例
3. 用例集覆盖所有arkTS语法规则集，每条规则要有正例和反例覆盖，平均用例数不少于10个

## 快速开始

1. 编译构建typescript包(工作目录：third_party_typescript)
    ```shell
    npm install
    npm run build
    npm run release
    npm pack
    ```
    每次修改代码必须执行以上步骤。

2. 安装项目依赖，执行(工作目录：third_party_typescript/tests/arkTSTest)
    ```shell
    rm -r ./node_modules/ ./package-lock.json # 每次必须执行
    npm install # 每次必须执行
    ``` 
3. 将测试用例放至 testcase 文件夹，建议使用约束名称作为测试用例目录，如`arkts-no-any-unknown`
4. 运行`run.js`，进行代码测试

    ```nodejs
    node run.js -v1.0
    node run.js -v1.1
    ```

    指定测试用例文件夹运行:

    ```shell
    node run.js -P:testcase/arkts-identifiers-as-prop-names  // 可修改为当前路径下指定目录的测试用例
    ```

    打印详情:

    ```shell
    node run.js --detail
    ```

    屏蔽用例目录或具体用例:

    ```shell
    node run.js --ignore-list:testcase/arkts-identifiers-as-prop-names/case1.ets,testcase/arkts-no-any-unknown  # 通过--ignore-list指定或添加至 ignorecase.json 
    ```

    `ignorecase.json`示例:

    ```json
    {
        "ignoreCase":["testcase/arkts-identifiers-as-prop-names/xxxx.ets", "testcase/arkts-no-any-unknown"]
    }
    ```

    生成测试结果文件:

    ```shell
    node run.js -e
    ```
    
5. 生成的测试结果存放至 `test_results` 目录，命令行打印基本的测试信息，如:

    ```plain
    Total number of test cases:2 Number of use cases passed:1 The number of use cases that failed:1 Total running time:371ms
    Failed test cases：
    testcase/arkts-no-any-unknown/test2.ets
    ```

## 用法说明

### 打印失败测试用例详情

支持通过`--detail`或者`-D`指令打印具体失败用例细节，如运行指令：

```shell
node run.js -D
```
返回未通过用例详情：
```plain
==> Expect the error in Line null The null character. Expect exception rules:null  Actual error line 20  The 7character. Actual exception rules:Use explicit types instead of "any", "unknown" (arkts-no-any-unknown) Comparison Result:Fail!
Total number of test cases:2 Number of use cases passed:1 The number of use cases that failed:1 Total running time:371ms
Failed test cases：
testcase/arkts-no-any-unknown/test2.ets
```

### 屏蔽指定测试用例
    
1. 支持使用 `--ignore-list` 参数传入屏蔽的用例目录或具体用例，如运行指令：

```shell
# 忽略单个用例
node run.js --ignore-list:testcase/arkts-no-any-unknown/test2.ets 
```
返回用例测试结果：
```
Total number of test cases:1 Number of use cases passed:1 The number of use cases that failed:0 Total running time:342ms
Ignored test cases：
testcase/arkts-no-any-unknown/test2.ets
```
2. 忽略多个用例，请使用`,`分割输入（支持屏蔽目录）

```shell
node run.js --ignore-list:testcase/arkts-no-any-unknown/test2.ets,testcase/arkts-identifiers-as-prop-names
```
3. 支持通过配置文件导入屏蔽用例：

修改根目录下的`ignorecase.json.example`为`ignorecase.json`，配置`ignoreCase`字段为屏蔽用例字段，如:
```json
# ignorecase.json
{
"ignoreCase":["testcase/arkts-no-any-unknown/test2.ets","testcase/arkts-identifiers-as-prop-names"]
}
```

执行测试用例指令：

```shell
node run.js -D
```
运行结果：
```plain
// It can be observed that the configuration use case is properly masked
Total number of test cases:0 Number of use cases passed:0 The number of use cases that failed:0 Total running time:342ms
Ignored test cases：
testcase/arkts-no-any-unknown/test2.ets
testcase/arkts-identifiers-as-prop-names
```

### 使用其他代码运行测试用例脚本

以`Python`代码为例，参考文件`run_test.py`：
```python
import subprocess

p = subprocess.Popen("node run.js --detail", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = p.communicate()
print(out.decode('utf-8'), err.decode('utf-8'))

# 获取返回值
return_code = p.returncode
print(return_code)
```
预期如果有用例不通过，则抛出异常状态码为`1`，如果用例全部通过，则返回正确状态码为`0`。
