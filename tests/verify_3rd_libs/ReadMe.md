
[toc]

# 1. 平台说明

当前仅支持在如下平台运行：
- Windows

# 2. 准备工作

## 2.1 下载所有三方库（如已下载请忽略）
```shell
./clone_all_libs.bat
```

## 2.2 安装python包
本工具依赖下列python包，需要提前安装：
- datetime
- json5
- os
- pandas
- shutil
- subprocess
- sys
- xlsxwriter

## 2.3 配置local.properties
修改本工具提供的`local.properties`模板文件

## 2.4 配置project_list.txt
修改本工具提供的`project_list.txt`文件到自己执行`clone_all_libs.bat`下载的文件夹路径

## 2.5 配置用户目录下的.npmrc文件
```
registry=https://repo.huaweicloud.com/repository/npm/
strict-ssl=false
```

## 2.6 xts测试需要JavaJDK依赖
可从华为镜像源下载https://repo.huaweicloud.com/java/jdk/8u202-b08/

## 2.7 获取hvigor-wrapper.js
创建或者打开一个DevEco工程，配置hvigor-config.json5为`4.0.0`以上，执行完整sync。
将`hvigor/hvigor-wrapper.js`路径下的该文件复制到该脚本的当前目录中。

# 3. 执行脚本

## 3.1 命令

以`project_list.txt`为例，测试该列表中所有的工程编译命令为：

```shell
python verify_3rd_libs.py project_list.txt
```

## 3.2 效果

执行完成后，会生成以当前时间命名的`xlsx`表格。