---
title: '常见问题与故障排除'
description: '关于EAUploader的常见问题和问题的解决方法'
---

## EAUploader的启动和显示
* * *
### 不显示EAUploader窗口
请从Unity的菜单中选择"EAUploader"→"Open EAUploader"。

如果菜单中没有"EAUploader"，请确认以下几点。

* 是否已在VCC的Manage Packages中将**Easy Avatar Uploader for VRChat**添加到项目中。
* Unity版本是否为2022.3。
* Unity的Console中是否显示了红色错误（编译错误）。其他工具的错误可能导致EAUploader无法启动。请更新或删除导致错误的工具。

### 显示"EAUploader Error"对话框
EAUploader启动时发生了问题。请按下<span style="color: #00b0f0">Restart</span>重新启动EAUploader。
如果重新启动仍无法解决，请在VCC中将EAUploader从项目中删除一次，然后重新添加。

### 显示"Error Report"（错误报告）
Unity中发生错误时，EAUploader窗口内会显示"Error Report"。EAUploader以外的工具或Unity本身发生的错误也会显示。

| 按钮 | 内容 |
| ---- | ---- |
| Restart | 重新加载EAUploader。 |
| Copy | 复制错误内容和环境信息（EAUploader和Unity的版本、已安装的包）。 |
| OK | 关闭错误报告。 |

请根据错误内容尝试解决，或在社区中寻求帮助。寻求帮助时，粘贴通过<span style="color: #00b0f0">Copy</span>复制的文本会更容易找到原因。
如果认为是EAUploader导致的错误，请在[官方Discord服务器](https://discord.gg/yYFru7brra)中报告。

不希望自动显示错误报告时，请勾选"Do not show this window again"。可以通过Avatar列表"Settings"中的"Show error report window"重新开启。

### 显示异常 / 列表未更新
请从Unity的菜单中选择"EAUploader"→"Reload"，重新加载EAUploader。

### 更新后显示"EAUploader now manages prefabs as variants"
这是从旧版本更新时显示的、确认是否迁移到新管理方式的消息。请按下<span style="color: #00b0f0">Migrate</span>。详情请参阅"[导入和管理Avatar](/zh-cn/guides/import/#eauploader的物品管理方式)"。

## 导入
* * *
### 导入的Avatar没有显示在列表中
* 请确认`.unitypackage`中是否包含Avatar的Prefab。
* 请开启Avatar列表的"Show hidden items"，确认是否被隐藏。
* 请确认是否正在按类别或标签进行筛选。
* 项目中原有的Prefab不会自动添加到列表中。请在"Import"窗口中通过<span style="color: #00b0f0">Import</span>选择Prefab。
* 请执行菜单中的"EAUploader"→"Reload"。

### 显示"Cannot import prefab"
选择`.prefab`时，请选择本项目`Assets`文件夹中的文件。无法选择项目外或EAUploader内部文件夹（`Assets/EAUploader`）中的`.prefab`。要导入其他项目的素材，请使用`.unitypackage`。

### Avatar变成粉色 / 显示着色器错误
项目中缺少Avatar所需的着色器。请参阅"[找不到着色器的错误](/zh-cn/faq/missing_shader/)"。

### 导入时显示"Outfit Settings"
导入了Avatar以外的Prefab（服装、饰品等），因此会要求设置类型。请为每个物品选择类型，然后按下<span style="color: #00b0f0">Save</span>。类型之后也可以在编辑界面中更改。

### 无法使用"Import VRM"按钮
未安装VRM Converter for VRChat。安装方法请参阅"[使用VRM Avatar](/zh-cn/guides/vrm/)"。
安装后仍无法使用时，请执行菜单中的"EAUploader"→"Reload"，或重新启动Unity。

### 无法导入VRM文件
不支持VRM 1.x的文件。请准备VRM 0.x的文件。
另外，无法选择项目`Assets`文件夹中的`.vrm`文件。

## 编辑
* * *
### 无法按下编辑工具的按钮
该工具无法用于所选的物品。原因会显示在按钮下方。
例如，"Dress Up (Compatible Outfits)"只能用于类型为"Avatar"且拥有VRCAvatarDescriptor的物品。

### "Dress Up (Compatible Outfits)"中不显示服装
"Dress Up (Compatible Outfits)"的列表中显示的是类型为"Cloth"或"Accessory"的物品。请将服装导入到Avatar列表中，并在编辑界面中确认其类型。

### 想撤销编辑工具所做的更改
保存前，按下<span style="color: #00b0f0">Revert</span>即可恢复到上次保存的状态。
即使已经保存，导入的原始Prefab也不会被更改。如果想保留改装前的状态，建议在编辑前通过编辑界面的<span style="color: #00b0f0">Duplicate</span>复制物品。

## 上传
* * *
### 不显示上传按钮
只有类型为"Avatar"的物品才能上传。请在编辑界面的"Item Info"中确认类型。

### 无法上传
上传面板中显示"This avatar can't be uploaded for the following reasons:"时，请确认显示的原因。

* **No VRCAvatarDescriptor** ― 不是VRChat用Avatar，或者是Avatar以外的Prefab。
* **No Shader** ― 请安装所需的着色器。
* **Avatar is a VRM model** ― 请在编辑界面中将其转换为VRChat用Avatar。

### 显示"You cannot upload an avatar with your current trust rank"
要上传Avatar，VRChat的信任等级需要为New User以上。
可以通过在VRChat中度过时间、增加好友来提升等级。或者加入VRChat+（付费）可以立即提升等级。

### 无法使用"Test"
仅当Unity的构建目标为Windows时才能使用测试。

### 无法开启Quest (Android)
Unity中未安装Android Build Support模块。请通过显示的消息中的<span style="color: #00b0f0">Download</span>，或Unity Hub的"安装"，为正在使用的Unity版本添加"Android Build Support"模块。

### 上传失败
* 项目名称或文件夹名称中包含全角（非ASCII）字符时，可能导致上传失败。请只使用英文字母、数字和符号。
* 请确认"Upload Failed"消息中显示的原因。Avatar文件过大时，请对Avatar进行轻量化。
* 请确认VRChat SDK的控制面板（菜单"VRChat SDK"→"Show Control Panel"）中是否显示了错误。

### 想将同一个Avatar作为另一个Avatar上传
请按下上传面板"Blueprint"中的<span style="color: #00b0f0">Unlink from VRChat</span>。下次上传时会作为另一个Avatar上传。详情请参阅"[上传Avatar](/zh-cn/guides/upload/#blueprint)"。

如果想将通过"Dress Up (Compatible Outfits)"换装后的Avatar作为另一个Avatar上传，请使用<span style="color: #00b0f0">Save as new avatar</span>，在保留原Avatar的同时另存为新的Avatar。

### 无法开启自动优化（AvatarOptimizer）
未安装AAO: Avatar Optimizer。请从[Booth](https://booth.pm/ja/items/4885109)或VCC安装，然后执行菜单中的"EAUploader"→"Reload"。

## 其他
* * *
### 想更改显示语言
可以通过Avatar列表"Settings"中的"Language"更改。目前支持English（英语）、日本語（日语）、한국어（韩语）。尚不支持中文。

### 想恢复已删除的物品
已删除的物品无法恢复。删除时原始Prefab和相关素材也会被删除，请重新导入Avatar。
请养成备份项目的习惯。

### 日志文件在哪里？
保存在项目文件夹正下方的`EAUploaderLog`文件夹中。按下Avatar列表"Settings"中的<span style="color: #00b0f0">Open log report</span>按钮即可打开该文件夹。

每次启动EAUploader都会创建日志文件，并以`2024-04-22-3.log`（2024年4月22日第3次启动）这样的名称保存。文件夹超过100MB时，旧文件会被自动删除。

### 出现问题时
如果以上内容无法解决问题，请加入EAUploader的官方Discord服务器。▷ [https://discord.gg/yYFru7brra](https://discord.gg/yYFru7brra)

Unity或VRChat SDK的问题，以及购买的Avatar、机关、工具相关的问题，请向各自的发布方寻求支持。
