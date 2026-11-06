---
title: '快速入门指南'
description: '制作支持EAUploader的扩展功能的方法'
---

# EAUploader扩展功能开发快速入门指南

本文档将介绍如何开发EAUploader的扩展功能。
扩展功能会添加到EAUploader编辑界面的"Edit tool"中，可以对用户所选的物品执行任意处理。

作为注册示例，也请参阅EAUploader内置的扩展功能"视点位置编辑器（Viewpoint Position Editor）"。
其代码位于`Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor`目录下。

本文档基于EAUploader v1.6.2编写。

## 扩展功能的工作原理
* * *
1. 启动时（Unity启动或脚本重新编译后），EAUploader会查找带有`EAUPlugin`特性的静态方法并调用。
2. 扩展功能在该方法中调用`EAUploaderEditorManager.RegisterEditor`，注册自身的信息（编辑器注册信息）。
3. EAUploader会在编辑界面的"Edit tool"中列出已注册的扩展功能。
4. 用户按下扩展功能的按钮后，会执行编辑器注册信息的`MenuName`中指定的Unity菜单。扩展功能通过该菜单打开自己的窗口。

:::note
EAUploader内置的编辑工具会叠加显示在EAUploader窗口内，但该机制属于内部实现，扩展功能无法使用。扩展功能请以普通`EditorWindow`的形式打开自己的窗口。
:::

## 1. 创建用于存放包的文件夹
* * *
创建一个文件夹，用于存放接下来步骤中创建的源代码等文件。

请在项目的Assets文件夹内或Packages文件夹正下方创建。
名称可以任意指定。

## 2. 添加源代码
* * *
### 让EAUploader识别扩展功能

要让EAUploader识别扩展功能，需要编写如下代码。
以下代码摘录自ViewpointPositionEditor.cs中的注册部分。
*LanguageUtility.T7eFromJsonFile的作用将在后面详细说明。*

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

            // 创建编辑器注册信息
            var editorRegistration = new EditorRegistration
            {
                // Unity中显示的菜单路径
                // 必须与后面介绍的MenuItem特性的字符串一致。
                MenuName = "EAUploader/ViewpointPositionEditor",
                // EAUploader中显示的编辑器名称
                EditorName = editorName,
                // EAUploader中显示的编辑器说明
                Description = description,
                // 扩展功能的版本
                Version = "0.1.0",
                // 扩展功能的作者
                Author = "USLOG",
                // 如果有扩展功能的支持URL，可以写在这里。
                Url = "https://uslog.tech/eauploader",
                // 指定判断扩展功能是否可用的方法。
                // 该方法以所选预制体的路径为参数，
                // 必须返回表示扩展功能是否可用的bool值。
                // True：可用，False：不可用
                Requirement = CheckAvatarHasVRCAvatarDescriptor,

                // 扩展功能不可用时向用户显示的消息。
                RequirementDescription = requirementDescription
            };

            // 注册编辑器
            EAUploaderEditorManager.RegisterEditor(editorRegistration);
        }

        private static bool CheckAvatarHasVRCAvatarDescriptor(string prefabPath)
        {
            GameObject gameObject = PrefabManager.GetPrefab(prefabPath);
            return Utility.CheckAvatarHasVRCAvatarDescriptor(gameObject);
        }
```

1. 为任意静态方法添加EAUPlugin特性。
   - 在本示例中，为Initialize方法添加了EAUPlugin特性。带有该特性的方法会在EAUploader启动时被自动调用。
   - 该方法必须是没有参数的静态方法。也可以是private方法。
2. 在带有特性的方法中创建编辑器注册信息，并以其为参数调用EAUploaderEditorManager.RegisterEditor。
   - 调用EAUploaderEditorManager.RegisterEditor后，扩展功能就会添加到EAUploader中。
   - 编辑器注册信息的详细内容请参阅上方源代码中的注释或下表。

| 属性 | 类型 | 必填 | 内容 |
| ---- | ---- | ---- | ---- |
| `MenuName` | `string` | ○ | 按下扩展功能按钮时执行的菜单路径。必须与`MenuItem`特性的字符串一致。 |
| `EditorName` | `string` | ○ | 编辑工具列表中显示的名称 |
| `Description` | `string` | | 说明（按下▼时显示） |
| `Version` | `string` | | 版本（按下▼时显示） |
| `Author` | `string` | | 作者（按下▼时显示） |
| `Url` | `string` | | 支持页面等的URL。指定后会显示"Open the link"按钮。 |
| `Requirement` | `Func<string, bool>` | | 判断扩展功能是否可用的方法。参数为所选预制体的路径。为`null`时始终可用。 |
| `RequirementDescription` | `string` | | 扩展功能不可用时显示的消息 |

:::caution[关于EAUPlugin特性]
`EAUPlugin`特性请使用`EAUploader`命名空间中的`EAUploader.EAUPluginAttribute`。
截至v1.6.2，带有公开API中`EAUploader.Editor.Plugin.API.PluginAPI.EAUPluginAttribute`的方法不会在EAUploader启动时被调用。
注册编辑器注册信息时，也可以使用`PluginAPI.RegisterEditor`代替`EAUploaderEditorManager.RegisterEditor`。
:::

:::note
`EditorName`、`Description`、`RequirementDescription`在显示列表时会使用EAUploader自身的翻译文件进行翻译。EAUploader翻译文件中没有的字符串会原样显示，因此请先使用后面介绍的`LanguageUtility.T7eFromJsonFile`翻译扩展功能自己的字符串，再进行注册。

另外，请为`EditorName`指定一个不与其他扩展功能重复的名称。EAUploader根据`EditorName`管理列表中▼的展开状态，如果存在同名的扩展功能，将无法正确切换显示。
:::

### 实现从EAUploader调用的方法

如下所示，为任意方法添加MenuItem特性。
这是用户按下扩展编辑器按钮时调用的方法。

```csharp
        [MenuItem("Tools/My Avatar Tool")]
        public static void Open()
        {
            var window = EditorWindow.GetWindow<MyAvatarTool>();
            window.titleContent = new GUIContent("My Avatar Tool");
            window.minSize = new Vector2(800, 600);
        }
```

完成以上步骤后，EAUploader的界面中就会显示扩展功能的按钮。

### 获取所选物品

用户在EAUploader中所选物品（预制体）的路径，可以通过`EAUploaderCore.selectedPrefabPath`（公开API中为`CoreAPI.SelectedPrefabPath`）获取。
预制体的`GameObject`可以通过`PrefabManager.GetPrefab`（公开API中为`PrefabAPI.GetPrefab`）获取。

要检测所选物品的变化，请使用`CoreAPI.SelectedPrefabPathChanged`事件。

### 修改所选物品

所选物品的路径是EAUploader管理的Prefab Variant的路径（`Assets/EAUploader/Prefabs/<物品名称>/<物品名称>.prefab`）。
EAUploader的设计原则是绝不修改用户导入的原始Prefab，只修改这个Prefab Variant。扩展功能也请只修改所选路径的Prefab。

* 修改Prefab时，建议使用`PrefabUtility.LoadPrefabContents`打开，再使用`PrefabUtility.SaveAsPrefabAsset`保存到同一路径。更改会作为Prefab Variant的覆盖（Override）保存。
* 保存后，EAUploader会检测到导入，并自动更新列表信息和预览图。
* 扩展功能创建的纹理、网格等素材，建议保存在物品的文件夹（`Assets/EAUploader/Prefabs/<物品名称>/`）中。删除物品时，仅被该物品使用的素材会被一并删除。

### 根据需要实现CreateGUI、OnEnable等方法

请根据需要实现CreateGUI、OnEnable等方法。
如果想制作与EAUploader外观相同的UI，请参阅"[UI组件](/zh-cn/for_tooldev/ui_components/)"。

## 3. 创建程序集
* * *
右键单击步骤1中创建的文件夹，然后点击"Create - Assembly Definition"。
文件夹中会创建.asmdef文件。

请按如下方式设置创建的.asmdef文件。

1. 取消勾选Auto Referenced。
2. 在Assembly Definition References中添加EAUploader.Editor。
   * 如果使用`VRCAvatarDescriptor`等VRChat SDK的类型，还需要添加VRChat SDK的程序集（如`VRC.SDK3A`）。
3. 根据源代码的存放位置设置Platforms。（扩展功能是编辑器扩展，因此通常只勾选`Editor`。）
4. 使用以下值添加Version Defines。请根据需要更改Define和Expression的值。
   * Resource: tech.uslog.eauploader
   * Define: EAUploader
   * Expression: 1.6.0

步骤4可以实现条件编译。
例如，按如下方式编写，代码只有在存在EAUploader 1.6.0及以上版本时才会生效。

```csharp
#if EAUploader
    using EAUploader;
#endif
```

如果希望扩展功能在没有EAUploader的项目中也能运行，请用`#if EAUploader` ... `#endif`包裹与EAUploader相关的代码。

## 最小示例
* * *
可以直接运行的最小扩展功能示例。显示所选物品的名称和视点高度。

```csharp
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;
#if EAUploader
using EAUploader;
using EAUploader.Editor.API;
using EAUploader.Editor.Prefab.API;
#endif

namespace MyTool.Editor
{
    public class MyAvatarTool : EditorWindow
    {
        private const string MENU_NAME = "Tools/My Avatar Tool";

#if EAUploader
        [EAUPlugin]
        private static void RegisterToEAUploader()
        {
            EAUploaderEditorManager.RegisterEditor(new EditorRegistration
            {
                MenuName = MENU_NAME,
                EditorName = "My Avatar Tool",
                Description = "Shows information about the selected avatar.",
                Version = "0.1.0",
                Author = "Your Name",
                Url = "https://example.com",
                Requirement = prefabPath => PrefabUtilityAPI.CheckAvatarHasVRCAvatarDescriptor(PrefabAPI.GetPrefab(prefabPath)),
                RequirementDescription = "Please select an avatar that has a VRCAvatarDescriptor."
            });
        }
#endif

        [MenuItem(MENU_NAME)]
        public static void Open()
        {
            GetWindow<MyAvatarTool>("My Avatar Tool");
        }

        public void CreateGUI()
        {
#if EAUploader
            var prefabPath = CoreAPI.SelectedPrefabPath;
            var avatar = string.IsNullOrEmpty(prefabPath) ? null : PrefabAPI.GetPrefab(prefabPath);
            if (avatar == null)
            {
                rootVisualElement.Add(new Label("No avatar is selected."));
                return;
            }

            rootVisualElement.Add(new Label("Avatar: " + avatar.name));
            rootVisualElement.Add(new Label("Viewpoint height: " + PrefabUtilityAPI.GetAvatarHeight(avatar) + "m"));
#else
            rootVisualElement.Add(new Label("EAUploader is required."));
#endif
        }
    }
}
```

程序集请按照"3. 创建程序集"进行设置。

## 4. 发布扩展功能
* * *
将创建的文件夹（源代码和.asmdef文件）导出为`.unitypackage`，或作为VPM包发布。

* 如果是`.unitypackage`，用户可以通过Unity菜单"Assets"→"Import Package"→"Custom Package..."导入。
* 如果是VPM包，可以在`package.json`的`vpmDependencies`中指定`tech.uslog.eauploader`来声明对EAUploader的依赖。

:::note
自v1.6.0起，编辑界面中的"Import extentions"和"Find extentions"按钮暂时处于隐藏状态。
:::

发布的扩展功能，欢迎在[Project EAUploader的Discord服务器](https://discord.gg/yYFru7brra)中告诉我们。

## EAUploader API快速参考
* * *
### 多语言支持

EAUploader通过创建将英语字符串与任意语言字符串对应起来的JSON文件，并在适当的时机读取这些JSON文件来实现多语言支持。始终可以以英语为键获取任意语言的字符串。

### JSON文件格式

JSON文件必须按以下格式存放。需要为每种支持的语言添加一个JSON文件。

- （任意文件夹）
  - ja.json
  - ko.json
  - [语言代码].json

各JSON文件的内容如下所示。

```json
{
  "name": "日本語",
  "items": [
    {
      "key": "Apply",
      "value": "適用"
    },
    {
      "key": "Close",
      "value": "閉じる"
    },
    {
      "key": "Actual View",
      "value": "実際のビュー"
    },
    {
      "key": "Viewpoint Position Editor",
      "value": "ビューポイント位置エディタ"
    },
    {
      "key": "A powerful viewpoint position editor for Unity.",
      "value": "Unity用の強力なビューポイント位置エディタ"
    },
    {
      "key": "The selected model must have a VRCAvatarDescriptor component.",
      "value": "選択したモデルにはVRCAvatarDescriptorコンポーネントが必要です。"
    }
  ]
}
```

:::caution
请为EAUploader支持的所有语言（截至v1.6.2为`ja`和`ko`）准备JSON文件。
只要有任何一种语言的JSON文件不存在，`LanguageUtility.LocalizationFromJsonFile`就会报错。对于无法翻译的语言，请放置`"items": []`这样的空文件。（将直接显示英语字符串。）
:::

### 直接应用到rootVisualElement

可以将创建的JSON文件直接应用到rootVisualElement。
应用时使用LanguageUtility.LocalizationFromJsonFile方法。
第一个参数指定要应用的rootVisualElement，第二个参数指定存放上面创建的JSON文件的文件夹路径。
该方法会根据JSON文件中的值，替换rootVisualElement中所有继承自TextElement的组件（如Label、Button）的Text值。例如，当语言设置为日语时，以下UXML中的`text="Actual View"`会像以`text="実際のビュー"`读取一样工作。

```xml
<ui:Label text="Actual View" class="self-center text-lg font-bold" />
```

请注意，上述说明只是一种示意，UXML文件中的字符串实际上并不会被改写。LanguageUtility.LocalizationFromJsonFile只会替换rootVisualElement中的值。

```csharp
        public void CreateGUI()
        {
            var visualTree = Resources.Load<VisualTreeAsset>("MyAvatarTool");
            visualTree.CloneTree(rootVisualElement);

            // 本地化文件路径
            var localizationFolderPath = "Assets/MyAvatarTool/Localization";
            LanguageUtility.LocalizationFromJsonFile(rootVisualElement, localizationFolderPath);
        }
```

公开API中的`LanguageAPI.LocalizeFromJsonFile`具有相同的功能。

### 直接从JSON文件获取任意语言的字符串

使用LanguageUtility.T7eFromJsonFile方法，可以指定英语字符串，获取当前所设语言的字符串。
示例代码中在Initialize方法中使用了该方法。

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

```

第一个参数指定英语字符串，第二个参数指定存放JSON文件的文件夹路径。
返回当前所设语言的字符串。找不到对应的字符串时，会原样返回第一个参数的英语字符串。

公开API中的`LanguageAPI.GetLocalizedTextFromJsonFile`具有相同的功能。

:::note
`EditorName`等编辑器注册信息是在EAUploader启动时注册的。因此，即使更改了语言，使用`T7eFromJsonFile`翻译的字符串在EAUploader重新启动之前仍会以之前的语言显示。
:::

### 获取当前语言

使用LanguageUtility.GetCurrentLanguage方法。
示例：

```csharp
string language = LanguageUtility.GetCurrentLanguage();

```

返回表示当前语言的字符串。

- ja：显示语言设置为日语。
- ko：显示语言设置为韩语。
- en：显示语言设置为英语。

### UI

EAUploader的自定义UI组件位于Editor/Resources/UI/Components下。
使用方法请参阅"[UI组件](/zh-cn/for_tooldev/ui_components/)"。

### 其他API

EAUploader提供了供外部工具使用的公开API（如`EAUploader.Editor.API`）。
详情请参阅"API参考"。
