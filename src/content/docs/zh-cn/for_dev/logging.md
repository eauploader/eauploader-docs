---
title: '日志输出功能规范'
description: 'EAUploader的日志输出功能规范'
---
# 对开发感兴趣吗？
Project EAUploader一直在招募开发成员！
只是想聊聊也非常欢迎！
请访问本项目的Discord服务器。
[点击这里加入](https://discord.gg/yYFru7brra)
* * *
* * *
# 概述
* * *
本日志输出功能将EAUploader的一系列内部操作输出到日志文件中，为开发人员提供方便查看的功能。该功能旨在帮助开发人员更快速地进行故障分析。

该功能实现在`EAUploader.UI.Windows.Logger`（`Editor/Resources/UI/Windows/Logger.cs`）中。本文档基于EAUploader v1.6.2编写。

# 术语
* * *
1. 日志文件GUID：由EAUploader分配给每个日志文件的GUID，用于开发人员识别提交的日志文件。
2. EAU日志：指EAU类型的日志。
3. EAU日志输出方法：用于输出EAU日志的方法。

该功能提供以下功能。

# 日志输出功能
* * *
## 日志输出功能的开始和结束时机

在EAUploader运行期间，始终输出日志。

## 日志输出范围

将Unity的Console中显示的所有日志都输出到日志文件中。此外，调用EAU日志输出方法时也会输出日志。

## 日志文件格式和保存位置

由该功能输出的日志文件全部保存在Unity项目文件夹正下方的`EAUploaderLog`文件夹中。

`EAUploaderLog`文件夹中保存的日志文件容量上限为100MB。当日志文件容量超过100MB并尝试追加日志时，将删除最旧的日志文件。

*实现上，每次追加日志时都会检查文件夹中`*.log`文件的合计大小，超过100MB时，删除一个创建时间最早的日志文件。由于每次追加都会进行检查，实际上旧的日志文件会被依次删除，直到容量低于100MB为止。*

日志文件的输出单位是从EAUploader启动到EAUploader结束。日志文件的命名格式为`YYYY-MM-DD-1.log`。其中，YYYY-MM-DD表示生成日志文件的年月日（UTC），-[数字]表示在同一天内启动EAUploader的次数。例如，名为2024-04-22-3.log的日志文件表示在2024年4月22日第3次启动EAUploader时生成的日志文件。

*实现上，会使用同一天的日志文件中尚未使用的最小编号。"EAUploader启动"指的是Unity启动时和脚本重新编译（域重新加载）时。*

## EAUploader启动时输出的日志

EAUploader启动时，会输出环境信息、日期（UTC）和日志文件GUID。输出内容如下。

```
EAUploader is starting...
*** Environment Details ***
Date: 2024-04-22
Log GUID: 0123456789abcdef0123456789abcdef
Application-Version: 1.6.2
Unity-Version: 2022.3.22f1
Editor-Platform: WindowsEditor
Vpm-Dependency: 
com.vrchat.avatars@3.7.0
com.vrchat.base@3.7.0
...
*** Environment Details ***
```

Vpm-Dependency中列出`Packages/vpm-manifest.json`的`locked`中记载的包及其版本。

## 日志输出格式

日志的输出格式如下所示。

> 02:42:42.345 [LOG_TYPE] [LOG_MESSAGE] [LOG_TRACELOG]

各项之间以半角空格分隔，`[ ]`不会被输出。

1. 时间戳
   1. 以hh:mm:ss.fff的格式输出日志的生成时间（UTC）。
2. LOG_TYPE
   1. 表示日志类型。类型如下：
      1. LOG：普通日志，一般的日志级别。
      2. WNG：警告日志。
      3. ERR：错误日志。
      4. EXP：异常日志。
      5. AST：断言日志。
      6. EAU：EAU日志。
      7. OTHER：其他日志。
3. LOG_MESSAGE
   1. 日志消息正文。
4. LOG_TRACELOG
   1. 日志的输出位置。对于ERR和EXP，显示跟踪日志。
   2. 对于ERR和EXP，输出完整的跟踪日志。从第二行开始，为便于阅读，会添加与时间戳等项目长度相同的缩进。
   3. 对于EAU，输出跟踪日志的第三行（EAU日志输出方法的调用者）。
   4. 其他情况下，输出跟踪日志的第二行（日志的调用者）。

## EAU日志输出方法

调用EAU日志输出方法时，会输出EAU日志。EAU日志用于将EAUploader的操作记录到日志文件中。

EAU日志输出方法为`EAUploader.UI.Windows.Logger.writeEAULog`。

```csharp
using EAULogger = EAUploader.UI.Windows.Logger;

EAULogger.writeEAULog("Selected setup tab.");
```

该方法会在消息前加上表示EAU日志的标识符，然后调用`Debug.Log`。日志输出处理通过该标识符识别EAU日志，并在去除标识符后将消息写入日志文件。
目前，标签页的切换操作会作为EAU日志输出。

# 错误报告窗口
* * *
收到ERR或EXP类型的日志，且设置文件中的`showErrorReportWindow`为启用状态时，会显示错误报告窗口。它以模态窗口的形式显示在EAUploader的主窗口内。

错误报告窗口中显示以下内容。

1. EAUploader启动后发生的错误日志（日期时间、消息、跟踪日志）
2. 环境信息（EAUploader版本、Unity版本、平台、VPM包列表）

为了保持UI Toolkit文字渲染的稳定，错误日志最多保留200,000个字符，并且只显示最新的40,000个字符。显示被截断时会显示提示。
显示错误报告期间发生的错误不会再次显示错误报告（防止递归）。

错误报告窗口包含以下项目。

1. "Do not show this window again"：勾选后会禁用`showErrorReportWindow`。可以通过Avatar列表"Settings"中的"Show error report window"重新启用。
2. Restart：重新导入`Packages/tech.uslog.eauploader`并重新启动EAUploader。
3. Copy：将错误报告的内容复制到剪贴板。
4. OK：关闭错误报告窗口。

请注意，EAUploader以外输出的错误日志也会显示错误报告窗口。要确认其行为，可以使用菜单中的"Window"→"Error Report"（输出测试用的错误日志）。

# 日志报告显示功能
* * *
用户可以通过Avatar列表"Settings"中显示的"Open log report"按钮，打开日志文件的保存文件夹（`EAUploaderLog`）。

按下"Open log report"按钮后，会显示一个对话框，提示已打开日志文件的保存文件夹，并在操作系统的文件浏览器中打开该文件夹。

# 日志报告发送功能（暂停中）
* * *
**目前无法发送。**以下为发送功能的规范。

## 发送功能的启动时机

~用户可以通过主界面上的"显示日志报告"按钮向开发人员发送日志文件。该功能将发送日志文件夹中最新的日志文件。~

## 发送功能界面转换

按下"显示日志报告"按钮后，会显示一个对话框，询问用户是否要发送日志文件。

如果用户在上述对话框中按下发送按钮，将执行日志文件发送处理。如果按下×按钮关闭对话框，则不执行日志文件发送处理，并返回主界面。

如果日志文件发送处理成功，将向用户显示发送完成消息和日志文件GUID。如果日志文件发送处理失败，将向用户显示发送失败的消息。
