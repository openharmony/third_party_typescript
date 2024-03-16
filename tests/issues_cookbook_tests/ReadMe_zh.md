1. 请新建一个DevEco工程，然后将pages目录复制到DevEco工程所在目录的`DevEco工程\entry\src\main\ets\pages`（工程建议命名：MyApplication），替换。
2. 替换需要测试的SDK到工程配置的SDK路径中。
3. 执行`python ./main.py --mode=sdk --project_path="C:\Users\xxx\third_party_typescript\tests\issues_cookbook_tests\MyApplication" --expected_path="C:\Users\xxx\third_party_typescript\tests\issues_cookbook_tests\expected" --verify`，将输出执行结果。