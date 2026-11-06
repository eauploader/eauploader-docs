---
title: 'クイックスタートガイダンス'
description: 'EAUploaderに対応した拡張機能を制作する方法'
---

# EAUploader拡張機能開発クイックスタートガイダンス

本文書では、EAUploaderの拡張機能を開発する方法を解説します。
拡張機能は、EAUploaderの編集画面の「編集ツール」に追加され、ユーザーが選択したアイテムに対して任意の処理を行うことができます。

登録の実装例として、EAUploaderにデフォルトで搭載されている拡張機能である「ビューポイント位置エディタ」もご覧ください。
`Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor`配下に実装のコードが存在します。

本ドキュメントは、EAUploader v1.6.2の内容に準拠しています。

## 拡張機能の仕組み
* * *
1. EAUploaderは起動時（Unityの起動時やスクリプトの再コンパイル後）に、`EAUPlugin`属性が付与されたstaticメソッドを探して呼び出します。
2. 拡張機能は、そのメソッドの中で`EAUploaderEditorManager.RegisterEditor`を呼び出して、自身の情報（エディタ登録情報）を登録します。
3. EAUploaderは、登録された拡張機能を編集画面の「編集ツール」に一覧で表示します。
4. ユーザーが拡張機能のボタンを押すと、エディタ登録情報の`MenuName`に指定されたUnityのメニューが実行されます。拡張機能は、そのメニューで自身のウィンドウを開きます。

:::note
EAUploaderに標準搭載されている編集ツールは、EAUploaderのウィンドウの中に重なって表示されますが、この仕組みは内部用（internal）のため、拡張機能からは利用できません。拡張機能は、通常の`EditorWindow`として独自のウィンドウを開いてください。
:::

## 1. パッケージをつくるためのフォルダを作成する
* * *
以降の手順で作成する、ソースコード等を格納するフォルダを作成します。

プロジェクトのAssets内またはPackages直下に作成します。
名前は任意の名前で構いません。

## 2. ソースコードを追加する
* * *
### 拡張機能をEAUploader側に認識させる

拡張機能をEAUploader側に認識させるために、下記のようなコードを書く必要があります。
次のコードは、ViewpointPositionEditor.csから登録に関する部分を抜粋したものです。
※LanguageUtility.T7eFromJsonFileの役割については、後ほど詳細に解説します。

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

            // エディタ登録情報の生成
            var editorRegistration = new EditorRegistration
            {
                // Unity上で表示されるメニューの文字列
                // 後述のMenuItem属性の文字列と一致させる必要があります。
                MenuName = "EAUploader/ViewpointPositionEditor",
                // EAUploader上で表示されるエディタの名前
                EditorName = editorName,
                // EAUploader上で表示されるエディタの説明
                Description = description,
                // 拡張機能のバージョン
                Version = "0.1.0",
                // 拡張機能の作者
                Author = "USLOG",
                // 拡張機能のサポートURL等あれば、ここに記述できます。
                Url = "https://uslog.tech/eauploader",
                // 拡張機能を使用できるかどうか判断するメソッドを指定します。
                // 指定するメソッドは、選択中のプレハブのパスを引数に受け取り、
                // 拡張機能の使用可否を表すbool型の変数を返す必要があります。
                // True:使用できる、False:使用できない
                Requirement = CheckAvatarHasVRCAvatarDescriptor,

                // 拡張機能を使用できない場合に、ユーザーに表示するメッセージを指定します。
                RequirementDescription = requirementDescription
            };

            // エディタ登録情報の追加
            EAUploaderEditorManager.RegisterEditor(editorRegistration);
        }

        private static bool CheckAvatarHasVRCAvatarDescriptor(string prefabPath)
        {
            GameObject gameObject = PrefabManager.GetPrefab(prefabPath);
            return Utility.CheckAvatarHasVRCAvatarDescriptor(gameObject);
        }
```

1. 任意のstaticメソッドにEAUPlugin属性を付与する。
   - 本サンプルコードでは、Initializeメソッドに対しEAUPlugin属性を付与しています。この属性を付与したメソッドは、EAUploader起動時に自動的に呼び出されます。
   - メソッドは引数なしのstaticメソッドである必要があります。アクセス修飾子はprivateでも構いません。
2. 前手順で属性を付与したメソッド内でエディタ登録情報を生成しそれを引数として、EAUploaderEditorManager.RegisterEditorメソッドを呼び出す。
   - EAUploaderEditorManager.RegisterEditorを呼び出すことで、EAUploader側に拡張機能が追加されます。
   - エディタ登録情報の詳細は上記ソースコードのコメント、又は下記の表をご覧ください。

| プロパティ | 型 | 必須 | 内容 |
| ---- | ---- | ---- | ---- |
| `MenuName` | `string` | ○ | 拡張機能の起動ボタンを押したときに実行するメニューのパス。`MenuItem`属性の文字列と一致させる。 |
| `EditorName` | `string` | ○ | 編集ツールの一覧に表示する名前 |
| `Description` | `string` | | 説明（▼を押すと表示） |
| `Version` | `string` | | バージョン（▼を押すと表示） |
| `Author` | `string` | | 作者（▼を押すと表示） |
| `Url` | `string` | | サポートページ等のURL。指定すると「リンクを開く」ボタンが表示されます。 |
| `Requirement` | `Func<string, bool>` | | 使用可否を判定するメソッド。引数には選択中のプレハブのパスが渡されます。`null`の場合は常に使用できます。 |
| `RequirementDescription` | `string` | | 使用できない場合に表示するメッセージ |

:::caution[EAUPlugin属性について]
`EAUPlugin`属性は、`EAUploader`名前空間の`EAUploader.EAUPluginAttribute`を使用してください。
v1.6.2時点では、公開APIの`EAUploader.Editor.Plugin.API.PluginAPI.EAUPluginAttribute`を付与したメソッドは、EAUploaderの起動時に呼び出されません。
なお、エディタ登録情報の登録には、`EAUploaderEditorManager.RegisterEditor`の代わりに`PluginAPI.RegisterEditor`を使用することもできます。
:::

:::note
`EditorName`、`Description`、`RequirementDescription`は、一覧に表示するときにEAUploader本体の翻訳ファイルで翻訳されます。EAUploader本体の翻訳ファイルに無い文字列はそのまま表示されるため、拡張機能独自の文字列は後述の`LanguageUtility.T7eFromJsonFile`で翻訳してから登録してください。

また、`EditorName`は、他の拡張機能と重複しない名前を付けてください。EAUploaderは`EditorName`をもとに一覧の▼の開閉状態を管理しているため、同じ名前の拡張機能があると表示が正しく切り替わりません。
:::

### EAUploader側から呼び出すメソッドを実装する

下記のようにMenuItem属性を任意のメソッドに指定します。
ユーザーが拡張エディタの起動ボタンを押した際、呼び出されるメソッドとなります。

```csharp
        [MenuItem("Tools/My Avatar Tool")]
        public static void Open()
        {
            var window = EditorWindow.GetWindow<MyAvatarTool>();
            window.titleContent = new GUIContent("My Avatar Tool");
            window.minSize = new Vector2(800, 600);
        }
```

以上の手順を踏むことで、EAUploaderの画面に拡張機能起動ボタンが表示されるようになります。

### 選択中のアイテムを取得する

ユーザーがEAUploaderで選択しているアイテム（プレハブ）のパスは、`EAUploaderCore.selectedPrefabPath`（公開APIでは`CoreAPI.SelectedPrefabPath`）で取得できます。
プレハブの`GameObject`は、`PrefabManager.GetPrefab`（公開APIでは`PrefabAPI.GetPrefab`）で取得できます。

選択中のアイテムが変更されたことを検知したい場合は、`CoreAPI.SelectedPrefabPathChanged`イベントを使用します。

### 選択中のアイテムを変更する

選択中のアイテムのパスは、EAUploaderが管理しているPrefab Variant（`Assets/EAUploader/Prefabs/<アイテム名>/<アイテム名>.prefab`）のパスです。
EAUploaderは、ユーザーがインポートした元のPrefabを変更せず、このPrefab Variantだけを変更する方針で作られています。拡張機能でも、選択中のパスのPrefabだけを変更するようにしてください。

* Prefabを変更するときは、`PrefabUtility.LoadPrefabContents`で開き、`PrefabUtility.SaveAsPrefabAsset`で同じパスに保存することをおすすめします。変更はPrefab Variantのオーバーライドとして保存されます。
* 保存すると、EAUploaderがインポートを検知して、一覧の情報やプレビュー画像を自動で更新します。
* 拡張機能で作成したテクスチャやメッシュなどのアセットは、アイテムのフォルダ（`Assets/EAUploader/Prefabs/<アイテム名>/`）の中に保存することをおすすめします。アイテムを削除したときに、そのアイテムでしか使われていないアセットは一緒に削除されます。

### 他必要に応じてCreateGUI,OnEnableメソッド等を実装する

必要に応じてCreateGUIメソッドやOnEnableメソッドを実装してください。
EAUploaderと同じ見た目のUIを作成したい場合は「[UIコンポーネント](/for_tooldev/ui_components/)」をご覧ください。

## 3. アセンブリの作成
* * *
1で作成したフォルダを右クリックし、「Create - Assembly Definition」をクリックしてください。
フォルダ内に.asmdefファイルが作成されます。

作成した.asmdefファイルに対し、次の設定を行ってください。

1. Auto Referencedのチェックを外す
2. Assembly Definition ReferencesにEAUploader.Editorを追加する
   * `VRCAvatarDescriptor`など、VRChat SDKの型を使用する場合は、VRChat SDKのアセンブリ（`VRC.SDK3A`など）も追加してください。
3. ソースコードが置かれている場所によって、Platformを設定する。（拡張機能はエディタ拡張のため、通常は`Editor`のみにチェックを入れます）
4. Version Definesを追加する。設定値は下記である。Define、Expressionの値は、適宜変更して適用すること。
   * Resource:tech.uslog.eauploader
   * Define:EAUploader
   * Expression:1.6.0

上記手順4によって、条件付きコンパイルを行えるようになります。
例えば、次のように記述することで、Ver1.6.0以上のEAUploaderが存在する場合にのみ、コードを有効にするといった動作が可能になります。

```csharp
#if EAUploader
    using EAUploader;
#endif
```

EAUploaderが導入されていないプロジェクトでも拡張機能を使えるようにする場合は、EAUploaderに関係するコードを`#if EAUploader`～`#endif`で囲んでください。

## 最小構成のサンプル
* * *
そのまま動作する、最小構成の拡張機能のサンプルです。選択中のアイテムの名前と視点の高さを表示します。

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
                Description = "選択中のアバターの情報を表示します。",
                Version = "0.1.0",
                Author = "Your Name",
                Url = "https://example.com",
                Requirement = prefabPath => PrefabUtilityAPI.CheckAvatarHasVRCAvatarDescriptor(PrefabAPI.GetPrefab(prefabPath)),
                RequirementDescription = "VRCAvatarDescriptorを持つアバターを選択してください。"
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
                rootVisualElement.Add(new Label("アバターが選択されていません。"));
                return;
            }

            rootVisualElement.Add(new Label("アバター: " + avatar.name));
            rootVisualElement.Add(new Label("視点の高さ: " + PrefabUtilityAPI.GetAvatarHeight(avatar) + "m"));
#else
            rootVisualElement.Add(new Label("EAUploaderが必要です。"));
#endif
        }
    }
}
```

アセンブリは「3. アセンブリの作成」の通りに設定してください。

## 4. 拡張機能を配布する
* * *
作成したフォルダ（ソースコードと.asmdefファイル）を`.unitypackage`としてエクスポートするか、VPMパッケージとして配布してください。

* `.unitypackage`の場合、ユーザーはUnityのメニュー「Assets」→「Import Package」→「Custom Package...」からインポートできます。
* VPMパッケージの場合、`package.json`の`vpmDependencies`に`tech.uslog.eauploader`を指定することで、EAUploaderへの依存を明示できます。

:::note
v1.6.0以降、編集画面の「拡張機能をインポート」「他の拡張機能を探す」ボタンは一時的に非表示になっています。
:::

配布した拡張機能は、是非[Project EAUploaderのDiscordサーバー](https://discord.gg/yYFru7brra)でお知らせください。

## EAUploaderAPI簡易リファレンス
* * *
### 多言語対応

EAUploaderでは、英語の文字列と、任意の言語文字列の対応が記述されたJSONファイルを作成し、そのJSONファイルを適当なタイミングで読み込むことによって、多言語対応を実現しています。任意の言語文字列は、すべて英語をキーとして取得できます。

### 作成するJSONファイルの形式

JSONファイルは次の形式で格納する必要があります。対応する言語ごとに一つのJSONファイルを追加する必要があります。

- (任意のフォルダ)
  - ja.json
  - ko.json
  - [言語を表す文字列].json

各JSONファイルは、例えば次のような内容になります。

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
EAUploaderが対応しているすべての言語（v1.6.2時点では`ja`、`ko`）のJSONファイルを用意してください。
`LanguageUtility.LocalizationFromJsonFile`は、いずれかの言語のJSONファイルが存在しない場合にエラーになります。翻訳が用意できない言語は、`"items": []`のように空のファイルを置いてください。（英語の文字列がそのまま表示されます）
:::

### rootVisualElementに直接適用

作成したJSONファイルをrootVisualElementに直接適用できます。
適用するには、LanguageUtility.LocalizationFromJsonFileメソッドを使用します。
第一引数に適用したいrootVisualElement、第二引数に前手順で作成したJSONファイルが格納されているフォルダパスを指定します。
本メソッドは、rootVisualElement中にあるTextElementクラスを親に持つコンポーネント（例：Label,Button）のText属性の値を、JSONファイルに記述された値にしたがって、すべて置換します。例えば次のUXML中の`text="Actual View"`は、言語設定が日本語である場合、`text="実際のビュー"`に置き換えられて読み込まれるのと同等の働きをします。

```xml
<ui:Label text="Actual View" class="self-center text-lg font-bold" />
```

もっとも、前文の説明はイメージであり、実際にUXMLファイルの文字列を書き換えているわけではない点に注意してください。LanguageUtility.LocalizationFromJsonFileメソッドが置き換えるのは、あくまでもrootVisualElement中の値です。

```csharp
        public void CreateGUI()
        {
            var visualTree = Resources.Load<VisualTreeAsset>("MyAvatarTool");
            visualTree.CloneTree(rootVisualElement);

            // Localization file path
            var localizationFolderPath = "Assets/MyAvatarTool/Localization";
            LanguageUtility.LocalizationFromJsonFile(rootVisualElement, localizationFolderPath);
        }
```

公開APIでは`LanguageAPI.LocalizeFromJsonFile`が同じ働きをします。

### 直接任意言語文字列をJSONファイルから取得する

LanguageUtility.T7eFromJsonFileメソッドを使用すると、英語の文字列を指定して、現在設定されている言語に応じた文字列を取得出来ます。
サンプルコードでは、Initializeメソッド内で使用されています。

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

```

第一引数には、英語の文字列を指定します。第二引数には、JSONファイルが格納されたフォルダへのパスを指定します。
戻り値として、現在設定されている言語に応じた文字列を返します。対応する文字列が見つからない場合は、第一引数の英語の文字列をそのまま返します。

公開APIでは`LanguageAPI.GetLocalizedTextFromJsonFile`が同じ働きをします。

:::note
`EditorName`などのエディタ登録情報は、EAUploaderの起動時に登録されます。そのため、`T7eFromJsonFile`で翻訳した文字列は、言語を変更してもEAUploaderが再起動されるまで以前の言語で表示されます。
:::

### 現在設定されている言語を取得する

LanguageUtility.GetCurrentLanguageメソッドを使用します。
使用例。

```csharp
string language = LanguageUtility.GetCurrentLanguage();

```

戻り値として、現在設定されている言語を表す文字列を返します。

- ja:表示言語として、日本語が設定されている。
- ko:表示言語として、韓国語が設定されている。
- en:表示言語として、英語が設定されている。

### UI関連

Editor/Resources/UI/Components配下に、EAUploaderで独自に実装されているUIコンポーネントが存在します。
使い方は「[UIコンポーネント](/for_tooldev/ui_components/)」をご覧ください。

### その他のAPI

EAUploaderは、外部のツールから利用されることを想定した公開API（`EAUploader.Editor.API`など）を提供しています。
詳細は「API Reference」をご覧ください。
