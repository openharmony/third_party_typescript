1. please create a new DevEco project，copy current pages dir to pages dir of DevEco project `DevEcoProject\entry\src\main\ets\pages`.
2. open DevecoProject, open oh-package.json5 file on root dir, `dependencies` add property `"js-md5": "latest"`, like this：
```json
"dependencies": {
    "js-md5": "latest"
  },
```
2. Replace the SDK to be tested with the SDK path in the project configuration.
3. run `python ./main.py --mode=sdk --project_path="C:\Users\xxx\third_party_typescript\tests\issues_cookbook_tests\MyApplication" --expected_path="C:\Users\xxx\third_party_typescript\tests\issues_cookbook_tests\expected" --verify`, will report result.