# ArkTS Syntax Constraint Rule Set Test Cases
## Project Description
This project aims to validate the constraint rules in [TypeScript to ArkTS Cookbook](https://gitee.com/openharmony/docs/blob/master/en/application-dev/quick-start/typescript-to-arkts-migration-guide.md) by script and output the test result report of the cases.

The test cases are stored in the default directory called "testcase", and the results are stored in the "test_results" directory.

## Project Requirements
1. Provide a test case set for the ArkTS syntax constraint rule set. 
2. The framework should be able to test the cases in the test case set and return the test results, including details of successful and failed cases. It should also support optional case blocking. 
3. The test case set should cover all the ArkTS syntax rule sets, with at least 10 cases for each rule, including positive and negative examples.

## Getting Started

1. compile build typescript lib(pwd：third_party_typescript)
    ```shell
    npm install
    npm run build
    npm run release
    npm pack
    ```
    must run this step everytime if you change your code.

2. Install project dependencies by running(pwd：third_party_typescript/tests/arkTSTest):
    ```shell
    rm -r ./node_modules/ ./package-lock.json # must run everytime
    npm install # must run everytime
    ``` 
3. Place the test cases in the "testcase" folder. It is recommended to use the constraint name as the test case directory, such as "arkts-no-any-unknown".
4. Run the "run.js" script to perform the code testing.

    ```nodejs
    node run.js -v1.0
    node run.js -v1.1
    ```
Run with a specified test case folder:

```shell
node run.js -P:testcase/arkts-identifiers-as-prop-names  // You can modify the test case to the specified directory in the current path
```
To get more details,you can use the command:
```shell
node run.js --detail
```
Ignore a case directory or specific case:

```shell
node run.js --ignore-list:testcase/arkts-identifiers-as-prop-names/case1.ets,testcase/arkts-no-any-unknown  # Specify via --ignore-list or add to ignorecase.json 
```
Example of `ignorecase.json`:
```json
{
    "ignoreCase":["testcase/arkts-identifiers-as-prop-names/xxxx.ets", "testcase/arkts-no-any-unknown"]
}
```
Generate test result files:

```shell
node run.js -e
```
5. The generated test results are stored in the "test_results" directory, and basic test information is printed on the command line, such as:

```plain
Total number of test cases:2 Number of use cases passed:1 The number of use cases that failed:1 Total running time:371ms
Failed test cases：
testcase/arkts-no-any-unknown/test2.ets
```
## Usage Instructions

### Print details of failed test cases
Support printing specific details of failed cases by using the `--detail` or `-D` command, such as:

```shell
node run.js -D
```
Return details of failed cases:

```plain
==> Expect the error in Line null The null character. Expect exception rules:null  Actual error line 20  The 7character. Actual exception rules:Use explicit types instead of "any", "unknown" (arkts-no-any-unknown) Comparison Result:Fail!
Total number of test cases:2 Number of use cases passed:1 The number of use cases that failed:1 Total running time:371ms
Failed test cases：
testcase/arkts-no-any-unknown/test2.ets
```


### Block specific test cases
1. Support blocking test case directories or specific cases by using the --ignore-list parameter, such as:
```shell
# Ignore a single case
node run.js --ignore-list:testcase/arkts-no-any-unknown/test2.ets 
```

Return the test results:

```
Total number of test cases:44 Number of use cases passed:43 The number of use cases that failed:1 Total running time:6342ms
Ignored test cases：
testcase/arkts-no-any-unknown/test2.ets
```
2. Ignore multiple cases, separated by commas (support blocking directories):
```shell
node run.js --ignore-list:testcase/arkts-no-any-unknown/test2.ets,testcase/arkts-identifiers-as-prop-names
```
3. Support importing blocked cases through a configuration file:
Rename the "ignorecase.json.example" file in the root directory to "ignorecase.json" and configure the "ignoreCase" field for blocked cases, such as:

```json
# ignorecase.json
{
"ignoreCase":["testcase/arkts-no-any-unknown/test2.ets","testcase/arkts-identifiers-as-prop-names"]
}
```
Run the test case command:

```shell
node run.js -D
```
Running results:

```plain
// It can be observed that the configuration use case is properly masked
Total number of test cases:0 Number of use cases passed:0 The number of use cases that failed:0 Total running time:342ms
Ignored test cases：
testcase/arkts-no-any-unknown/test2.ets
testcase/arkts-identifiers-as-prop-names
```
#### Running Test Cases Script with Other Code
Taking Python code as an example, refer to the file `run_test.py`:

```python
import subprocess

p = subprocess.Popen("node run.js --detail", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = p.communicate()
print(out.decode('utf-8'), err.decode('utf-8'))

return_code = p.returncode
print(return_code)
```
If there are any failed cases, an exception with the status code 1 will be thrown. If all cases pass, the correct status code 0 will be returned.
