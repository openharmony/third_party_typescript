# 说明

这是tsc系统api测试套，用来确保每次在tsc的lib库中新增的接口被添加到混淆的预置语言白名单中，避免因为被混淆而出现功能问题

# 测试步骤

0. 环境准备：
    * node版本不低于6.0.0
    * 需要拉取typescript仓和arkguard仓的代码

1. 执行npm install

2. 如果在tsc的lib目录中新增了文件，需要将文件名添加到system_api_test.ts的scanFilesList数组中，其他情况则不需要

3. 执行npm run test:system-api或者执行npm run alltest

# 查看结果

命令行的结果中会打印如下信息：

```
----------------------------- System Api Test summary -----------------------------
Run result：success！
Scan file counts: 45
Number of missing system api: 0
Missing system api: []
```

上面的信息依次为扫描的lib库中的文件数量，混淆预置语言白名单中缺少的system api数量和具体名称，测试套执行结果

# 期望结果

缺少的system api的数量为零，测试套执行结果为success

# 测试套结果为fail时的处理方式

将缺少的system api名称同步添加到arkguard仓的es_reserved_properties.json和es_reserved_properties_optimized.json文件中
