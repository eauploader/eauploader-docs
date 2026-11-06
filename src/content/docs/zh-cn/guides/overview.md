---
title: '界面构成'
description: 'EAUploader的界面构成和基本操作'
---

## 打开EAUploader
* * *
如果EAUploader已添加到项目中，Unity启动时会自动打开其窗口。

如果关闭了窗口，可以从Unity顶部菜单选择<span style="color: #00b0f0">EAUploader</span> → <span style="color: #00b0f0">Open EAUploader</span>重新打开。

:::note
刚启动Unity或正在加载脚本时，窗口打开需要一点时间。
请等待Unity右下角的加载指示消失。
:::

## 三个界面
* * *
EAUploader由"Avatar List"（Avatar列表）、"编辑界面"和"上传"三个界面构成。

```
Avatar列表 ──(点击卡片)──▶ 编辑界面 ──(Go to upload)──▶ 上传
     ▲                       │ ▲                          │
     └─────(Back to list)────┘ └──────(Back to edit)──────┘
```

| 界面 | 可以做什么 |
| ---- | ---- |
| **Avatar列表** | 最先显示的界面。以卡片形式列出Avatar、服装和饰品。导入、搜索与筛选、标签管理、设置都在这里进行。 |
| **编辑界面** | 一边以3D方式查看所选物品，一边编辑名称、标签等信息，或使用编辑工具进行改装。 |
| **上传** | 以面板形式在编辑界面右侧打开。登录VRChat、设置Avatar信息、测试、上传。只有类型为"Avatar"的物品才能上传。 |

各界面的详细使用方法请参阅以下页面。

- [导入和管理Avatar](/zh-cn/guides/import/)（Avatar列表）
- [编辑界面](/zh-cn/guides/setup/)
- [编辑工具](/zh-cn/guides/edit_tools/)
- [上传Avatar](/zh-cn/guides/upload/)

## 基本操作流程
* * *
1. 通过**Avatar列表**的<span style="color: #00b0f0">Import</span>导入Avatar。
2. 如果显示找不到着色器的错误，请安装所需的着色器。（[找不到着色器的错误](/zh-cn/faq/missing_shader/)）
3. 点击Avatar的卡片打开**编辑界面**，确认显示"Ready to upload"。根据需要使用编辑工具进行调整。
4. 通过<span style="color: #00b0f0">Go to upload</span>打开**上传**面板，登录VRChat后上传。

## 帮助按钮
* * *
按下界面各处的<span style="color: #00b0f0">Help</span>按钮，会显示该项目的说明。
遇到不明白的项目时，请先查看帮助。

## 窗口内的消息
* * *
确认消息、设置、帮助等会叠加显示在EAUploader窗口内（模态框）。
复制或保存完成时，界面边缘会显示简短的通知。

## Unity菜单
* * *
通过Unity顶部的"EAUploader"菜单可以进行以下操作。

| 菜单 | 内容 |
| ---- | ---- |
| Open EAUploader | 打开EAUploader窗口。 |
| Reload | 重新加载物品列表、编辑工具，以及配合工具（VRM Converter、AvatarOptimizer、Modular Avatar）的安装状态。显示异常或安装配合工具后请尝试此操作。 |
| ViewpointPositionEditor | 打开所选Avatar的视点位置编辑器。 |
| Edit Tools | 打开Shape Key Editor、Texture Editor、Dress Up (Compatible Outfits)。（通常从编辑界面打开） |

## 关于保存工作
* * *
EAUploader中的操作会对Unity进行更改。Unity通常会保持工作状态，因此退出时无需保存。

但是，在EAUploader中删除的物品也会从Unity中删除。删除时请务必注意。
