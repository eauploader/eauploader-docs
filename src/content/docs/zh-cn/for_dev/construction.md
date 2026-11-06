---
title: '目录和命名空间结构'
description: '关于EAUploader的目录和命名空间结构'
---
# 对开发感兴趣吗？
Project EAUploader一直在招募开发成员！
只是想聊聊也非常欢迎！
请访问本项目的Discord服务器。
[点击这里加入](https://discord.gg/yYFru7brra)
* * *
* * *
本文档基于EAUploader v1.6.2编写。

## 目录结构
* * *
EAUploader作为VPM包`tech.uslog.eauploader`发布。包的主要目录结构如下。

```
tech.uslog.eauploader/
├── package.json                  包信息（版本、依赖关系）
├── CHANGELOG.md                  更新历史
├── Docs/                         规范文档（英语）
├── Editor/                       编辑器扩展（EAUploader.Editor程序集）
│   ├── EAUploader.Editor.asmdef
│   ├── Public EAUploader API/    面向外部工具的公开API（每个文件一个类）
│   ├── Scripts/
│   │   ├── EAUploaderCore.cs           启动、初始化、全局状态
│   │   ├── EAUploaderEditorManager.cs  编辑工具的注册
│   │   ├── EAUPluginAttribute.cs       [EAUPlugin]特性
│   │   ├── AvatarUploader.cs           构建和上传
│   │   ├── AssetProcessor.cs           素材导入时的处理
│   │   ├── Config.cs                   设置文件（settings.json）
│   │   ├── LanguageUtility.cs, T7e.cs  多语言支持
│   │   ├── ThemeUtility.cs             主题
│   │   ├── CustomPrefabUtility/        管理用Prefab Variant、标签、预览、着色器检查、VRM转换、迁移、删除
│   │   ├── Coexistence/                与AvatarOptimizer共存
│   │   ├── VRCSDK/                     Avatar性能计算
│   │   └── Feedback/, SubWindow/       反馈发送和欢迎窗口（目前未使用）
│   └── Resources/
│       ├── Localization/         UI翻译文件（ja.json、ko.json）
│       ├── Message/              帮助消息（按语言）
│       ├── Shaders/              AlwaysShow.shader（预览标记）、TextureAdjust.shader（纹理编辑）
│       └── UI/
│           ├── EAUploader.cs           主窗口
│           ├── MainWindow.uxml
│           ├── styles.uss / tailwind.uss
│           ├── Components/             自定义UI组件
│           ├── Modals/                 窗口内显示的模态窗口
│           ├── TabContents/
│           │   ├── AvatarList/         Avatar列表
│           │   ├── Setup/              编辑界面
│           │   │   └── Editor/         内置编辑工具（Common、ViewpointPositionEditor、ShapeKeyEditor、TextureEditor、OutfitTool）
│           │   ├── Upload/             上传表单
│           │   └── ImportSettings/     EA Library文章（目前未在界面中显示）
│           └── Windows/                对话框、错误报告、VRM转换窗口
├── Runtime/                      运行时组件（EAUploader程序集）
│   ├── EAUploader.asmdef
│   └── Components/               EAUploaderMeta、EAUploaderOutfit、AvatarTagComponent
└── .vpm/, .github/               用于生成和发布VPM仓库
```

## 程序集
* * *
| 程序集 | 位置 | 平台 | 内容 |
| ---- | ---- | ---- | ---- |
| `EAUploader.Editor` | `Editor/` | Editor | EAUploader本体。UI、物品管理、编辑工具、上传、公开API |
| `EAUploader` | `Runtime/` | 全部 | 添加到Avatar上的组件 |

`EAUploader.Editor`定义了以下Version Defines。

| 符号 | 包 | 条件 |
| ---- | ---- | ---- |
| `HAS_VRM` | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0及以上 |
| `HAS_AAO` | `com.anatawa12.avatar-optimizer` | 1.7.0及以上 |
| `HAS_MA` | `nadena.dev.modular-avatar` | 1.9.0及以上 |

`EAUploader`（Runtime）在存在VRChat SDK - Avatars（`com.vrchat.avatars`）时定义`VRC_SDK3A`。

## 命名空间
* * *
| 命名空间 | 主要类 | 内容 |
| ---- | ---- | ---- |
| `EAUploader` | `EAUploaderCore`、`EAUploaderEditorManager`、`EditorRegistration`、`EAUPluginAttribute`、`AvatarUploader`、`LanguageUtility`、`T7e`、`Config` | 启动、编辑工具注册、上传、多语言支持等核心功能 |
| `EAUploader.CustomPrefabUtility` | `ManagedPrefabs`、`PrefabManager`、`PrefabInfo`、`TagManager`、`PrefabPreview`、`ShaderChecker`、`Utility`、`VRMImporter` | 管理用Prefab Variant、元数据、标签、预览图、着色器检查、VRM转换、迁移、删除 |
| `EAUploader.UI` | `EAUploader`、`ThemeUtility` | 主窗口、界面切换、主题 |
| `EAUploader.UI.AvatarList` | `Main` | Avatar列表（内部） |
| `EAUploader.UI.Setup` | `Main`、`ViewpointPositionEditor` | 编辑界面和视点位置编辑器 |
| `EAUploader.UI.Setup.EditTools` | `EditToolModal`、`EditToolSession`、`ToolModalFrame`、`EditToolUtility`等 | 内置编辑工具及其通用基础（内部） |
| `EAUploader.UI.Upload` | `UploadForm` | 上传表单（内部） |
| `EAUploader.UI.Modals` | `ImportModal`、`SettingsModal`、`ClothSettingModal`、`TagFilterModal`、`TagSettingsModal`、`PrefabPreviewModal`等 | 窗口内显示的模态窗口 |
| `EAUploader.UI.Components` | `Modal`、`ToastManager`、`ShadowButton`、`MaterialIcon`、`HelpButton`、`DropdownFieldPro`、`Preview`等 | 自定义UI组件 |
| `EAUploader.UI.Windows` | `DialogPro`、`Logger` | 对话框、错误报告、日志输出 |
| `EAUploader.Editor.API` | `CoreAPI`、`LanguageAPI`、`UploadAPI` | 公开API |
| `EAUploader.Editor.Plugin.API` | `PluginAPI` | 公开API（扩展功能注册） |
| `EAUploader.Editor.Prefab.API` | `PrefabAPI`、`PrefabPreviewAPI`、`ShaderAPI`、`PrefabUtilityAPI`、`VRMAPI` | 公开API（预制体操作） |
| `EAUploader.Editor.Resource.API` | `EAUResourceAPI`、`HelpButtonAPI`、`LinkAPI`、`MaterialIconAPI`等 | 公开API（样式、UI组件） |
| `EAUploader.Components` | `AvatarTagComponent`、`EAUploaderMeta`、`EAUploaderOutfit` | 运行时组件 |

`EAUploader.Editor.*.API`是供外部工具使用的公开API。它是对内部实现（`EAUploader`、`EAUploader.CustomPrefabUtility`）的轻量封装。详情请参阅"API参考"。

## 类之间的关系
* * *
主要类之间的关系如下。

```
EAUploaderCore ([InitializeOnLoad])
├── EAUploaderEditorManager ...... 注册并保存编辑工具（EditorRegistration）
├── ShaderChecker ................ 检查预制体的着色器
├── PrefabManager ................ 管理用Prefab Variant的列表（PrefabInfo）和元数据
│   ├── ManagedPrefabs ........... 创建、复制、定位Variant
│   ├── TagManager ............... 标签和标签分组
│   └── PrefabPreview ............ 生成并保存预览图
└── UI.EAUploader（主窗口）
    ├── UI.AvatarList.Main ....... Avatar列表
    ├── UI.Setup.Main ............ 编辑界面（编辑工具列表、物品信息）
    │   └── UI.Upload.UploadForm → AvatarUploader → VRChat SDK
    └── modal / toasts ........... 通用模态窗口和通知
```

各界面共享`EAUploaderCore.selectedPrefabPath`（所选物品的路径）。

处理流程的详细内容请参阅"[编辑器](/zh-cn/for_dev/editor/)"。
