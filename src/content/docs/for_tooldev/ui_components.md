---
title: 'UIコンポーネント'
description: 'EAUploaderのスタイルと独自UIコンポーネントを拡張機能で使用する方法'
---

本文書では、EAUploaderと同じ見た目のUIを拡張機能で作成するために、EAUploaderのスタイルシートと独自UIコンポーネントを使用する方法を解説します。

EAUploaderのUIは、UI Toolkit（UXML / USS）で作成されています。独自UIコンポーネントは`Packages/tech.uslog.eauploader/Editor/Resources/UI/Components`配下に実装されています。

本ドキュメントは、EAUploader v1.4.6の内容に準拠しています。

## スタイルシートを適用する
* * *
EAUploaderでは、次の2つのスタイルシートを使用しています。

| スタイルシート | 内容 |
| ---- | ---- |
| `UI/styles` | EAUploader独自のスタイル。ボタンやタブ、Material Iconsのフォントなどを定義しています。 |
| `UI/tailwind` | Tailwind CSS風のユーティリティクラス。`flex-row`、`p-4`、`text-xl`、`font-bold`、`border-zinc-300`などのクラスを使用できます。 |

ウィンドウの`rootVisualElement`にスタイルシートを追加してください。

```csharp
public void CreateGUI()
{
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/styles"));
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/tailwind"));
}
```

公開APIの`EAUResourceAPI.EAUStyles`、`EAUResourceAPI.EAUTailwind`からも取得できます。ただし、これらはEAUploaderのメインウィンドウが表示されたときに読み込まれるため、メインウィンドウが一度も表示されていない場合は`null`になります。

:::note
`MaterialIcon`は`UI/styles`で定義されているフォントを使用します。`MaterialIcon`を使用する場合は、必ず`UI/styles`を適用してください。
:::

### よく使用するユーティリティクラス
| クラス | 内容 |
| ---- | ---- |
| `flex-row` / `flex-col` | 子要素を横 / 縦に並べる |
| `flex-1` | 残りの領域を埋める |
| `items-center` / `justify-between` / `self-center` | 子要素や自身の配置 |
| `p-4` / `px-4` / `pb-2` / `m-4` / `mb-2` | 余白（数値は4px単位） |
| `w-one-quarter` / `w-one-half` | 幅を25% / 50%にする |
| `text-lg` / `text-xl` / `text-2xl` | 文字の大きさ |
| `font-bold` | 太字 |
| `text-red-600` などの色 | 文字の色（Tailwind CSSの色の名前） |
| `border-r` / `border-b` / `border-zinc-300` | 枠線 |
| `hidden` | 非表示にする |

## UXMLで使用する
* * *
UXMLで独自UIコンポーネントを使用する場合は、`EAUploader.UI.Components`名前空間を`eau`として宣言します。

```xml
<ui:UXML
    xmlns:ui="UnityEngine.UIElements"
    xmlns:uie="UnityEditor.UIElements"
    xmlns:eau="EAUploader.UI.Components"
    editor-extension-mode="True">
    <ui:VisualElement class="p-4">
        <ui:Label text="My Tool" class="text-xl font-bold pb-2" />
        <eau:ShadowButton name="apply" class="button-with-icons">
            <eau:MaterialIcon icon="check" />
            <ui:Label text="Apply" />
        </eau:ShadowButton>
        <eau:SlideToggle label="Enable" name="enable" />
        <eau:TextFieldPro name="name" label="Name" placeholder="Please enter a name" required="true" />
        <eau:Link text="Open the website" href="https://example.com" />
    </ui:VisualElement>
</ui:UXML>
```

## コンポーネント一覧
* * *
以下のコンポーネントは、すべて`EAUploader.UI.Components`名前空間にあります。

### ShadowButton
影付きのボタンです。EAUploaderの主要なボタンで使用されています。

| メンバー | 内容 |
| ---- | ---- |
| `text` | ボタンの文字列（UXMLでは`text`属性） |
| `clicked` | クリック時に呼び出される`Action` |

子要素として`MaterialIcon`や`Label`を追加すると、ボタンの中に表示されます。

```csharp
var button = new ShadowButton { text = "Apply" };
button.clicked += () => Debug.Log("clicked");
rootVisualElement.Add(button);
```

公開APIでは`ShadowButtonAPI.CreateShadowButton(text, clickAction)`で作成できます。

### MaterialIcon
[Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)のアイコンを表示します。

| メンバー | 内容 |
| ---- | ---- |
| `icon` | アイコンの名前（例：`settings`、`upload`、`help`、`warning`）。UXMLでは`icon`属性 |

```csharp
var icon = new MaterialIcon("warning");
```

使用できるアイコンの名前は`UI/Components/codepoints.txt`に記載されています。公開APIでは`MaterialIconAPI.CreateMaterialIcon(iconName)`で作成できます。

### SlideToggle
スライド式のトグルスイッチです。`BaseField<bool>`を継承しています。

```csharp
var toggle = new SlideToggle("Enable");
toggle.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### TextFieldPro
プレースホルダーと必須入力に対応したテキストフィールドです。`TextField`を継承しています。

| メンバー | 内容 |
| ---- | ---- |
| `placeholder` | 未入力時に表示する文字列（UXMLでは`placeholder`属性）。UXMLで指定した場合は、EAUploaderの翻訳ファイルで翻訳されます。 |
| `required` | 必須入力にするか（UXMLでは`required`属性）。未入力の場合、枠が赤く表示されます。 |
| `GetValue()` | 入力された文字列を取得します。未入力（プレースホルダーが表示されている）の場合は`null`を返します。 |
| `ClearValue()` | 入力を消去してプレースホルダーを表示します。 |

:::caution
`TextFieldPro`はプレースホルダーを`value`として表示しています。入力値を取得する場合は`value`ではなく`GetValue()`を使用してください。
:::

### Link
クリックするとURLを開くラベルです。`Label`を継承しています。

```csharp
var link = new Link("Open the website") { href = "https://example.com" };
```

公開APIでは`LinkAPI.CreateLink(text, url)`で作成できます。

### HelpButton
「ヘルプ」ボタンです。押すと、`msg-id`で指定した番号のヘルプメッセージを表示します。

```xml
<eau:HelpButton msg-id="113" />
```

:::note
ヘルプメッセージは、EAUploader本体の`Editor/Resources/Message`から読み込まれます。v1.4.6時点では、拡張機能から独自のヘルプメッセージを追加することはできません。
:::

### Preview
アバターのプレビューを表示します。マウスで回転、移動、拡大縮小ができます。EAUploaderのセットアップタブやアップロードタブのプレビューで使用されています。

```csharp
var preview = new Preview(previewRoot, CoreAPI.SelectedPrefabPath);
preview.ShowContent();

// 表示するプレハブを変更する
preview.UpdatePreview(otherPrefabPath);
```

| メソッド | 内容 |
| ---- | ---- |
| `ShowContent()` | プレビューを表示します。プレハブが見つからない場合はメッセージを表示します。 |
| `UpdatePreview(prefabPath)` | 表示するプレハブを変更します。 |
| `ResetPreview()` | 拡大率と位置をリセットします。 |

公開APIでは`PreviewAPI`から同じ操作ができます。

### PrefabItemButton
プレハブのプレビュー画像と名前を表示するボタンです。EAUploaderのアバター一覧で使用されています。
アップロードできないアバターの場合は警告を表示し、`disabled`が`true`の場合はボタンを押せない状態にします。

```csharp
foreach (var prefab in PrefabManager.GetAllPrefabsWithPreview())
{
    var item = new PrefabItemButton(prefab, () => Debug.Log(prefab.Path), disabled: true);
    list.Add(item);
}
```

公開APIでは`PrefabItemButtonAPI.CreatePrefabItemButton(prefab, clickAction, disabled)`で作成できます。

### ContentWarningsField
VRChatのコンテンツ警告（Content Warnings）のタグを選択するフィールドです。

| メンバー | 内容 |
| ---- | ---- |
| `Tags` | 選択されているタグのリスト（`content_sex`、`content_adult`、`content_violence`、`content_gore`、`content_horror`） |
| `SetTags(tags)` | 選択するタグを設定します。 |
| `OnToggleTag` | タグの選択が変更されたときに発生するイベント |

## ダイアログを表示する
* * *
`EAUploader.UI.Windows.DialogPro`を使用すると、EAUploaderと同じ見た目のダイアログを表示できます。

```csharp
using EAUploader.UI.Windows;

DialogPro.Show(DialogPro.DialogType.Success, "Done", "The process has been completed.");

// OKボタンの文字列と押下時の処理を指定する
DialogPro.Show(DialogPro.DialogType.Info, "Confirm", "Do you want to continue?", "Continue", () =>
{
    Debug.Log("continue");
});
```

`DialogType`には`Info`、`Warning`、`Error`、`Success`を指定できます。
既にダイアログが表示されている場合、新しいダイアログは表示されません。

## 多言語対応
* * *
作成したUIの文字列は、`LanguageAPI.LocalizeFromJsonFile`（又は`LanguageUtility.LocalizationFromJsonFile`）で翻訳できます。詳しくは「[クイックスタートガイダンス](/for_tooldev/extension/#多言語対応)」をご覧ください。
