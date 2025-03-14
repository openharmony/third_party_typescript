Steps:
1. Create a new DevEco project (suggested name: MyApplication), then replace the `DevEcoProject\entry\src\main\ets\pages` directory with current pages directory.
2. open DevecoProject, open oh-package.json5 file on root dir, `dependencies` add property `"js-md5": "^0.7.3"`, like this：
```json
"dependencies": {
    "js-md5": "^0.7.3"
  },
```
3. Modify settings based on `Environment Configuration` below.
4. Replace the SDK to be tested with the SDK path in the project configuration.
5. run `python main.py`, will report result.

Environment Configuration (Modify config.json according to the testing environment):
1. Using IDE Client
   1. Set `ide_enabled` to `true`
   2. Modify `ide_path`, `project_path`, and `expected_path`
   3. Modify `tsimportsendable` as needed
2. Using Command Line Tools
   1. Set `ide_enabled` to `false`
   2. Modify `command_line_tools_path`, `java_home`, `project_path`, and `expected_path`
   3. Modify `tsimportsendable` as needed
