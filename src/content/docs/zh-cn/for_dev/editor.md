---
title: '编辑器'
description: '关于EAUploader编辑器的说明'
---
# 对开发感兴趣吗？
Project EAUploader一直在招募开发成员！
只是想聊聊也非常欢迎！
请访问本项目的Discord服务器。
[点击这里加入](https://discord.gg/yYFru7brra)
* * *
* * *
本页介绍EAUploader本体`EAUploader.Editor`程序集的处理流程。
更详细的规范请同时参阅仓库`Docs/`文件夹中的规范文档（英语）。

本文档基于EAUploader v1.6.2编写。

## 启动
* * *
EAUploader的启动由`EAUploaderCore`（`Editor/Scripts/EAUploaderCore.cs`）负责。

### 1. 静态构造函数
`EAUploaderCore`带有`[InitializeOnLoad]`特性，因此每次Unity启动或脚本重新编译（域重新加载）时都会执行静态构造函数。

1. 在`Application.logMessageReceived`中注册日志输出处理。
2. 确定日志文件名，并在日志中记录环境信息（日期、日志文件GUID、EAUploader版本、Unity版本、平台、VPM包列表）。
3. 在`EditorApplication.update`中注册等待初始化的处理。

### 2. 初始化
当Unity不处于编译中或进入播放模式时，`PerformInitialization`只会执行一次。

1. `InitializeEAUploader` ― 如果不存在，则创建`Assets/EAUploader`文件夹和`PrefabManager.json`。
2. `AvatarUploader.CleanupLeftoverBuildInstances` ― 删除因多平台构建中断而残留在场景中的临时上传实例。
3. `EAUploaderEditorManager.OnEditorManagerLoad` ― 初始化编辑工具的注册信息（`EditorsManage.json`）。
4. `ShaderChecker.CheckShaders` ― 检查是否有缺少着色器的预制体。
5. `PrefabManager.Initialize` ― 准备管理用文件夹，执行从旧版本的迁移（后述），并生成缺少的预览图。
6. `CheckAvailablePackages` ― 读取`Packages/packages-lock.json`，设置`HasVRM`、`HasAAO`、`HasMA`。
7. 在所有程序集中查找带有`[EAUPlugin]`特性的静态方法并调用。（编辑工具和扩展功能的注册）
8. 通过`EditorApplication.delayCall`打开EAUploader窗口。

如果初始化过程中发生异常，会显示提示重新启动EAUploader的对话框。按下"Restart"会重新导入`Packages/tech.uslog.eauploader`。

菜单中的"EAUploader"→"Reload"（`EAUploaderCore.ReloadSDK`）会清除选择，并重新执行上述第3～6步。

### 全局状态
| 成员 | 内容 |
| ---- | ---- |
| `EAUploaderCore.selectedPrefabPath` | 所选物品的路径。更改时会触发`SelectedPrefabPathChanged`。所有界面和编辑工具都以该物品为对象。 |
| `EAUploaderCore.HasVRM` / `HasAAO` / `HasMA` | 是否安装了联动对象的包 |
| `EAUploaderCore.GetVersion()` | 从`package.json`获取版本 |

## 数据的保存位置
* * *
| 路径 | 内容 | 类 |
| ---- | ---- | ---- |
| `Assets/EAUploader/settings.json` | `language`、`isLibraryOpen`、`showErrorReportWindow`、`managedPrefabsMigrated` | `Config` |
| `Assets/EAUploader/PrefabManager.json` | 用于与旧版本兼容（创建为空文件） | `EAUploaderCore` |
| `Assets/EAUploader/EditorsManage.json` | 已注册的编辑工具（每次启动时重建） | `EAUploaderEditorManager` |
| `Assets/EAUploader/tags.json` | 标签名和标签分组 | `TagManager` |
| `Assets/EAUploader/Prefabs/<物品>/<Variant>.prefab` | 管理用Prefab Variant | `ManagedPrefabs` |
| `Assets/EAUploader/Prefabs/<物品>/Textures/`、`Materials/` | 纹理编辑生成的素材 | 纹理编辑 |
| `Assets/EAUploader/PrefabPreviews/<GUID>.png` | 预览图（1200×900）。以Prefab的GUID命名，因此改名后也会保留 | `PrefabPreview` |
| `EAUploaderLog/`（项目根目录） | 日志文件（合计最多100MB） | `UI.Windows.Logger` |
| EditorPrefs `EAUploader.Theme` | 主题（`white` / `dark` / `pastel`） | `ThemeUtility` |
| EditorPrefs `EAUploader.CardWidth` | Avatar列表的卡片宽度 | Avatar列表 |

## 物品管理
* * *
### 管理用Prefab Variant
EAUploader不会更改用户导入的Prefab。它会为所有导入的Prefab创建**Prefab Variant**，并且只管理和编辑该Variant。

```
Assets/EAUploader/Prefabs/<物品名称>/<Variant名称>.prefab
```

* `ManagedPrefabs.ROOT`为`Assets/EAUploader/Prefabs`。每个导入的物品创建一个文件夹。
* Variant的创建方式是：在临时预览场景中实例化原始Prefab，添加`EAUploaderMeta`，然后使用`PrefabUtility.SaveAsPrefabAsset`保存。不会触碰已打开的场景。
* `EAUploaderMeta`只添加到Variant上。
* 编辑工具等生成的素材保存在物品的文件夹中。

| `ManagedPrefabs`的方法 | 内容 |
| ---- | ---- |
| `IsManaged(path)` | 路径是否在`ROOT/`下 |
| `IsInEAUploaderFolder(path)` | 路径是否在`Assets/EAUploader/`下（不作为导入对象） |
| `CreateVariant(sourcePath, configure)` | 在新的物品文件夹中创建Variant |
| `DuplicateVariant(variantPath)` | 在同一物品文件夹中复制Variant |
| `GetSourcePath(variantPath)` | 获取Variant的原始Prefab |
| `RenameItemFolder(variantPath, name)` | 文件夹中只有该Prefab时，重命名文件夹 |

### 元数据（`EAUploaderMeta`）
添加在Variant根节点上的`EAUploaderMeta`中保存着列表中的显示状态（`status`）、种类（`type`）、类型（`genre`）、最后修改时间（`lastModifiedTicks`）、备注（`memo`）、标签（`tags`）等。详情请参阅"[运行时](/zh-cn/for_dev/runtime/)"。

`PrefabInfo`是面向UI的管理用Prefab快照（路径、名称、最后修改时间、种类、状态、类型、标签、备注、预览图）。

### 导入时的处理
`AssetImportProcessor`（`Editor/Scripts/AssetProcessor.cs`）会对每个导入的`.prefab`执行以下处理。

1. `ShaderChecker.CheckShadersInPrefabs` ― 缺少着色器时显示对话框。对话框中的"Why am I seeing this?"按钮会打开本文档的"[找不到着色器的错误](/zh-cn/faq/missing_shader/)"（`https://eauploader-docs.uslog.tech/faq/missing_shader`）。
2. `PrefabManager.ImportPrefab` ― 创建或更新管理用Variant。
3. 收集需要决定类型的非Avatar物品，在下一次`delayCall`中统一通过`ClothSettingModal`显示（仅在主窗口打开时）。

:::danger
由于着色器对话框中有链接指向`faq/missing_shader`页面，请不要更改该页面的URL。
:::

`PrefabManager.ImportPrefab(path)`的行为如下。

* **未管理的Prefab**（在`Assets/`外、在`Assets/EAUploader/`内、已存在Variant、或设置了`SuppressAutoVariantCreation`时跳过）
  * 创建Variant，并设置`type`和`lastModifiedTicks`。
  * Avatar（带有`VRC_AvatarDescriptor`）设为`genre = Avatar`、`genreConfirmed = true`。
  * 其他物品设为`genre = Cloth`、`genreConfirmed = false`，作为类型选择模态窗口的对象。
  * 保存预览图并刷新列表。
* **已管理的Prefab**
  * 重新判断`type`。Avatar设为`genre = Avatar`。
  * 只有当记录的时间早于5秒以上时才更新`lastModifiedTicks`（防止由此触发的保存再次经过导入处理而形成循环）。
  * 有变化时保存预览图。

### 获取列表
`PrefabManager.GetAllPrefabs()`会扫描带有`EAUploaderMeta`的管理用Variant，并将结果缓存2秒。`InvalidateCache()`可以强制重新扫描。
`GetAllPrefabsWithPreview()`不包含隐藏的物品，`GetAllPrefabsIncludingHidden()`包含隐藏的物品。两者都会将置顶的物品排在前面，然后按从新到旧的顺序排列。

### 标签（`TagManager`）
* 标签名和分组在整个项目范围内保存在`Assets/EAUploader/tags.json`中，物品上添加的标签保存在`EAUploaderMeta.tags`中。
* 比较时不区分大小写。仅大小写不同的新标签会沿用已有的写法。
* 标签名和分组名最多32个字符（`MAX_TAG_LENGTH`）。
* 一个标签最多属于一个分组。删除标签会将其从所有Prefab上移除；删除分组时，其中的标签会保留。

### 删除
`PrefabManager.ShowDeletePrefabDialog(path, completed)`会打开窗口内的删除确认模态窗口。

1. 搜索Variant的原始Prefab、材质和纹理。引用检查以`Assets/`下的`.prefab/.unity/.controller/.overridecontroller/.anim/.asset/.mat`文件为对象，被其他素材使用的素材不会被删除。
2. 以只读列表显示要删除的内容。搜索完成后即可确认删除。
3. 在素材数据库没有变化期间会重用搜索结果。素材有变化时，会在删除前重新搜索，如果删除对象发生了变化，会再次请求确认。
4. 删除后，如果物品文件夹为空则将其删除，必要时清除选择，并调用`completed(true)`。取消时调用`completed(false)`。

### 从旧版本迁移（`LegacyPrefabMigration`）
旧版本会将`EAUploaderMeta`直接添加到导入的Prefab上。启动时，如果未设置`managedPrefabsMigrated`，且管理用文件夹外存在这样的Prefab，会询问用户是否迁移。

1. 从原始Prefab读取元数据。
2. 从原始Prefab上移除`EAUploaderMeta`（在创建Variant之前进行，以免被继承）。
3. 创建带有元数据的Variant，并将旧的基于名称的预览图移动到基于GUID的路径。

创建失败时，会恢复原始Prefab的数据。只有所有物品都成功时才会标记迁移完成，选择"Later"时会在下次启动时再次询问。

## UI
* * *
EAUploader的UI使用UI Toolkit（UXML / USS）制作。

* 主窗口只有一个`UI.EAUploader`（菜单"EAUploader"→"Open EAUploader"，默认大小1280×640，最小1080×640）。
* `CreateGUI()`会加载`UI/styles.uss`和`UI/tailwind.uss`，克隆`MainWindow.uxml`（仅`contentRoot`），添加通用的`Modal`和通知（`ToastManager`），并应用主题。
* 界面不是标签页形式，而是在`contentRoot`中每次构建一个界面。`EAUploader.Navigate(screen)`用于切换界面，`EAUploader.RefreshCurrentScreen()`用于重建当前界面。

| `EAUploaderScreen` | 构建方法 | 内容 |
| ---- | ---- | ---- |
| `AvatarList` | `UI.AvatarList.Main.ShowContent` | Avatar列表 |
| `Setup` | `UI.Setup.Main.ShowContent` | 编辑界面 |
| `Upload` | `UI.Setup.Main.ShowContent`（打开上传面板的状态） | 上传 |

* 上传不是单独的界面，`UI.Upload.UploadForm`以面板的形式显示在编辑界面中。
* 自定义UI组件位于`Editor/Resources/UI/Components`，模态窗口位于`Editor/Resources/UI/Modals`。在UXML中声明`xmlns:eau="EAUploader.UI.Components"`即可使用。详情请参阅"[UI组件](/zh-cn/for_tooldev/ui_components/)"。

### 多语言支持
主窗口每100ms执行一次`LanguageUtility.Localization`，翻译窗口内`TextElement`的字符串。带有USS类`no-translate`的元素（名称、标签等用户内容）和文本输入框的内容不会被翻译。
请在UXML中直接编写英语字符串，在C#中设置字符串时使用`T7e.Get("英语文本")`。详情请参阅"[多语言支持与资源](/zh-cn/for_dev/localization/)"。

## 上传
* * *
构建和上传由`AvatarUploader`（`Editor/Scripts/AvatarUploader.cs`）负责，使用VRChat SDK的构建器API（`IVRCSdkAvatarBuilderApi`）。只有类型为`Avatar`的物品才能上传。

### 构建实例
测试和上传都会通过`CreateBuildInstance(prefabPath)`创建构建实例。

1. 加载管理用Prefab，如果没有Blueprint ID，则分配一个并保存到Prefab中（以便在平台切换引起的域重新加载后仍保持关联）。
2. 在当前场景中实例化，并**完全解包**。这样Modular Avatar、AvatarOptimizer（NDMF）等非破坏性工具可以在构建时对其进行处理，构建时的更改也不会写回Prefab素材。
3. 命名为`<名称> (EAUploader Upload)`。

构建结束后实例会被销毁。在VRChat SDK的多平台构建中，由于SDK会继续使用该实例，因此会保留，并在下次启动时由`CleanupLeftoverBuildInstances`删除。

### 测试（`BuildAndTestAsync`）
打开VRChat SDK的控制面板，使用`builder.BuildAndTest`构建，并通过`DialogPro`显示结果。同一时间只能执行一个构建或上传。

### 上传（`UploadAvatarAsync`）
1. 确定要构建的平台（先是Windows，然后是已选择且安装了构建支持的平台）。
2. 创建构建实例，并通过Blueprint ID获取已有的`VRCAvatar`。不存在时创建新记录。
3. 单个平台时调用`builder.BuildAndUpload`。多个平台时，设置SDK的多平台目标并调用`builder.BuildAndUploadMultiPlatform`（Windows → 追加的平台 → 恢复原平台；期间可能发生域重新加载）。
4. 将SDK分配的Blueprint ID写回Prefab素材。
5. 显示成功、取消或失败，并触发`OnComplete`。

进度会从SDK的事件（`OnSdkBuildProgress`、`OnSdkUploadProgress`）转发到`AvatarUploader.ProgressChanged`。`CancelUpload()`可以中止上传。

### Avatar性能
上传面板中的Avatar性能由`PerformanceInfoComputer`（`Editor/Scripts/VRCSDK/PerformanceInfo.cs`）使用VRChat SDK的`AvatarPerformance`计算。目前使用PC（Windows）的标准。

### 自动优化
安装了AvatarOptimizer时（`HAS_AAO`），开启"Automatic avatar optimizing"会在Avatar根节点上添加`TraceAndOptimize`组件。关闭则删除该组件。

## 编辑工具
* * *
`EAUploaderEditorManager`会保存通过`RegisterEditor`注册的`EditorRegistration`，同时也写入`Assets/EAUploader/EditorsManage.json`。编辑界面的"Edit tool"根据`GetRegisteredEditors`获取的列表显示，按下按钮后会通过`EditorApplication.ExecuteMenuItem`执行`EditorRegistration.MenuName`中的菜单。

内置编辑工具使用`Editor/Resources/UI/TabContents/Setup/Editor/Common/`中的通用基础（命名空间`EAUploader.UI.Setup.EditTools`）。

| 类型 | 职责 |
| ---- | ---- |
| `EditToolSession` | 使用`PrefabUtility.LoadPrefabContents`在隔离的预览场景中打开管理用Prefab，跟踪是否有更改，使用`PrefabUtility.SaveAsPrefabAsset`保存（Variant仍保持为Variant），重新加载（还原），以及切换对象。 |
| `EditToolModal` | 内置编辑工具的抽象基类。以通用布局将工具作为模态窗口显示在EAUploader窗口内：标题栏（工具名称、物品名称、"Unsaved changes"、Back）、侧面板、实时预览、底栏（Revert、Apply）。同一时间只能打开一个工具。 |
| `ToolModalFrame` | 包括视点位置编辑器在内所有工具共用的模态框架。 |
| `EditToolUtility` | 生成素材的文件夹、文件名清理、保存后的刷新（`OnPrefabSaved`）、通用UI部件、使用条件判断。 |

* 工具有未保存的更改时，EAUploader窗口会报告`hasUnsavedChanges`，并在关闭窗口时询问是否保存。
* 保存后，`EditToolUtility.OnPrefabSaved`会使`PrefabManager`的缓存失效，重新生成预览图，并刷新列表和编辑界面。
* 工具的预览使用通用`Preview`组件的实时模式（`new Preview(container, session.Root)`）。

内置编辑工具的工作原理详情，请参阅仓库中的`Docs/EditTools.md`。扩展功能的制作方法请参阅"[快速入门指南](/zh-cn/for_tooldev/extension/)"。

## 日志输出
* * *
关于日志输出和错误报告，请参阅"[日志输出功能规范](/zh-cn/for_dev/logging/)"。
