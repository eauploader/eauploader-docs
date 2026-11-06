---
title: '多语言支持与资源'
description: 'EAUploader的翻译文件、帮助消息、EA Library文章的规范'
---
# 对开发感兴趣吗？
Project EAUploader一直在招募开发成员！
只是想聊聊也非常欢迎！
请访问本项目的Discord服务器。
[点击这里加入](https://discord.gg/yYFru7brra)
* * *
* * *
本页介绍EAUploader多语言支持的工作原理，以及帮助消息和EA Library文章的编写方法。
如果您愿意协助翻译，也请阅读本页。

本文档基于EAUploader v1.6.2编写。

## 多语言支持的工作原理
* * *
EAUploader**以英语字符串为键**获取各语言的字符串。英语没有翻译文件，键会原样显示。

| 语言 | 语言代码 | 翻译文件 |
| ---- | ---- | ---- |
| English（英语） | `en` | 无（键原样显示） |
| 日本語（日语） | `ja` | `Editor/Resources/Localization/ja.json` |
| 한국어（韩语） | `ko` | `Editor/Resources/Localization/ko.json` |

当前语言保存在`Assets/EAUploader/settings.json`的`language`中。默认为`ja`。

:::note
截至v1.6.2，EAUploader尚不支持中文。欢迎协助翻译。添加语言的方法请参阅"[添加语言](#添加语言)"。
:::

### 翻译文件的格式
翻译文件是以下格式的JSON文件。`name`是语言选择下拉菜单中显示的名称。

```json
{
  "name": "日本語",
  "items": [
    {
      "key": "Import",
      "value": "インポート"
    },
    {
      "key": "Version: ",
      "value": "バージョン: "
    }
  ]
}
```

* `key`重复时会报错。
* `value`中可以使用`string.Format`的格式项（如`{0}`）。

### 翻译UXML中的字符串
请在UXML中直接编写英语字符串。

```xml
<ui:Label text="Import Avatars" class="text-lg pb-2 font-bold" />
```

主窗口每100ms执行一次`LanguageUtility.Localization`，当窗口内所有`TextElement`（`Label`、`Button`等）的`text`与翻译文件中的`key`完全一致时，将其替换为`value`。
在主窗口以外的窗口中，请在`CreateGUI`等处调用`LanguageUtility.Localization(rootVisualElement)`。

以下元素不会被翻译。

* 带有USS类`no-translate`的元素。请为物品名称、标签等用户输入的文本添加该类。
* 文本输入框的内容（标签会被翻译）。

### 翻译C#中的字符串
在C#中设置字符串时，请使用`T7e.Get`。

```csharp
var label = new Label(T7e.Get("Ready to upload"));

// 带格式项
T7e.Get("Avatar bundle size is too large. The maximum size is {0} MB, but the current size is {1} MB", limit, fileSize);
```

没有对应的翻译时，会原样返回键。

`T7e`会缓存翻译。重新导入`Resources/Localization/`中的文件时会清除缓存，因此对翻译文件的编辑无需域重新加载即可生效。

## 添加语言
* * *
要添加新的语言，请准备以下所有文件。文件名和文件夹名请使用语言代码（如`zh-cn`）。

| 添加内容 | 位置 |
| ---- | ---- |
| UI翻译文件 | `Editor/Resources/Localization/{语言代码}.json` |
| 帮助消息 | `Editor/Resources/Message/{语言代码}/{消息编号}.txt` |
| EA Library文章 | `Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/{语言代码}/` |
| 视点位置编辑器的翻译文件 | `Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization/{语言代码}.json` |

:::caution
可用的语言由`Editor/Resources/Localization`中的JSON文件自动决定。
如果只添加UI翻译文件而没有其他文件，打开帮助、EA Library或视点位置编辑器时会发生错误。
:::

## 帮助消息
* * *
按下界面各处显示的"帮助"按钮（`HelpButton`）后，帮助消息（`EAUploaderMessageWindow`）会以模态窗口的形式显示在EAUploader窗口内。
消息会根据当前语言从`Editor/Resources/Message/{语言代码}/{消息编号}.txt`读取。

在UXML中，通过`msg-id`指定消息编号。

```xml
<eau:HelpButton msg-id="100" class="pb-2" />
```

在C#中，可以通过`EAUploaderMessageWindow.ShowMsg(100)`（公开API中为`HelpButtonAPI.ShowMessage(100)`）显示。

### 正在使用的消息编号
| 编号 | 显示位置 |
| ---- | ---- |
| 100 | 导入窗口：Import Avatars |
| 101 | 导入窗口：Import VRM |
| 102 | 导入窗口：Import Shaders |
| 103 | 编辑界面：Edit tool |
| 104 | 编辑界面：Import extentions（目前隐藏） |
| 108 | 3D预览的操作方法 |
| 109 | 上传：How it looks on VRChat |
| 113 | 上传：Avatar Performance |
| 114 | 上传：Platform |
| 116 | Avatar列表 |
| 117 | 上传：Blueprint |
| 200 | VRM转换窗口 |
| 201 | 视点位置编辑器 |
| 202 | 上传：Avatar优化 |
| 203 | AvatarOptimizer的安装引导 |

105、107、111、112、115的文件仍然存在，但v1.6.2的界面中没有使用。

添加新消息时，请使用未使用的编号，并在所有语言的文件夹中添加文件。

## 文章格式
* * *
帮助消息和EA Library文章由`ArticleRenderer`渲染。文章使用以下标签编写。

| 标签 | 格式 | 内容 |
| ---- | ---- | ---- |
| `<t>` | `<t>标题</t>` | 显示标题。 |
| `<txt>` | `<txt>正文</txt>` | 显示正文。可以使用Unity的富文本（`<size=16>`、`<color=red>`、`<b>`、`<i>`、`<u>`等）。 |
| `<image>` | `<image>文件名, 宽度</image>` | 显示图片。文件名为相对于文章文件的路径。宽度可以省略。 |
| `<button>` | `<button>标签, 样式, URL</button>` | 显示按下后打开URL的按钮。样式写`Main`、`Sub`或`Link`。（当前实现中，样式不会造成外观上的差异。） |
| `<hr>` | `<hr>颜色, 边距</hr>` | 显示水平线。颜色可以是`black`或`#RRGGBB`。 |
| `<section>` | `<section>图片, 宽度, 正文</section>` | 将图片和正文并排显示。图片以200px的高度显示。（当前实现中不使用宽度。） |

示例：

```
<t>着色器错误</t>
<txt>
<size=14>项目中不存在所应用的着色器。
请向发布方确认所需的着色器，并将其导入到项目中。</size>
</txt>
<button>加入Discord, Main, https://discord.gg/yYFru7brra</button>
```

:::caution
`<button>`和`<section>`以`,`分隔各项，因此标签和正文中不能包含`,`。
:::

## EA Library文章
* * *
:::note
自v1.6.0起，EAUploader的界面中不再显示EA Library。文章文件仍保留在包中。
:::

EA Library的文章按语言保存在以下文件夹中。每篇文章创建一个文件夹。

```
Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/
└── en/
    ├── 001_tutorial1/
    │   ├── tutorial1.json   文章信息
    │   ├── Content.txt      文章正文
    │   ├── thumbnail.png    缩略图
    │   └── image1.png       正文中使用的图片
    └── 002_tutorial2/
        └── ...
```

文章信息以如下格式写在JSON文件中。文件夹中的`.json`文件会作为文章信息读取，因此一个文件夹中请不要放置多个`.json`文件。

```json
{
  "title": "Introduction",
  "date": "2023-12-07",
  "tags": ["Tutorial"],
  "keywords": ["Tutorial", "Start", "Guide", "Introduction", "How to use"],
  "contentFile": "Content.txt",
  "thumbnail": "thumbnail.png"
}
```

| 项目 | 内容 |
| ---- | ---- |
| `title` | 文章标题。显示在列表中。可以用`\n`换行。 |
| `date` | 文章的创建日期 |
| `tags` | 标签。用于EA Library中按标签筛选。 |
| `keywords` | 搜索时使用的关键词 |
| `contentFile` | 正文的文件名（相对于JSON文件） |
| `thumbnail` | 缩略图的文件名（相对于JSON文件） |

正文请按"文章格式"编写。

:::note
当前实现中，只有**标题和关键词都**包含搜索词的文章才会显示在搜索结果中。建议也将标题中的词语添加到关键词中。
:::
