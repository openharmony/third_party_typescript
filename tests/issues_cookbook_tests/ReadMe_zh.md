测试步骤：
1. 新建一个DevEco工程（工程建议命名：MyApplication），然后用pages目录替换DevEco工程中的`DevEco工程\entry\src\main\ets\pages`目录。
2. 打开MyApplication工程根目录下的oh-package.json5文件，`dependencies`添加字段`"js-md5": "^0.7.3"`,形如下：
```json
"dependencies": {
    "js-md5": "^0.7.3"
  },
```
3. 参考下方环境设置，修改相关设置。
4. 替换需要测试的SDK到工程配置的SDK路径中。
5. 执行`python main.py`，将输出执行结果。

环境设置（根据测试环境修改config.json）：
1. 使用IDE客户端
  1. 修改 `ide_enabled` 为 `true`
  2. 修改 `ide_path`、`project_path`、`expected_path`
  3. 根据需要修改 `tsimportsendable`
2. 使用command line tools
  1. 修改 `ide_enabled` 为 `false`
  2. 修改 `command_line_tools_path`、`java_home`、`project_path`、`expected_path`
  3. 根据需要修改 `tsimportsendable`
