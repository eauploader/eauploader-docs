---
title: '多言語対応とリソース'
description: 'EAUploaderの翻訳ファイル、ヘルプメッセージ、EA Libraryの記事の仕様'
---
# 開発に興味がありますか？
Project EAUploaderでは開発メンバーを常に募集しています！！
話を聞くだけでもOK！
是非当プロジェクトのDiscordサーバーへお越しください。
[参加はこちら](https://discord.gg/yYFru7brra)
* * *
* * *
本ページでは、EAUploaderの多言語対応の仕組みと、ヘルプメッセージ・EA Libraryの記事の書き方を解説します。
翻訳にご協力いただける方も、是非ご覧ください。

本ドキュメントは、EAUploader v1.4.6 の内容に準拠しています。

## 多言語対応の仕組み
* * *
EAUploaderでは、**英語の文字列をキー**として、各言語の文字列を取得します。英語は翻訳ファイルを持たず、キーがそのまま表示されます。

| 言語 | 言語コード | 翻訳ファイル |
| ---- | ---- | ---- |
| English | `en` | なし（キーをそのまま表示） |
| 日本語 | `ja` | `Editor/Resources/Localization/ja.json` |
| 한국어 | `ko` | `Editor/Resources/Localization/ko.json` |

現在の言語は`Assets/EAUploader/settings.json`の`language`に保存されています。初期値は`ja`です。

### 翻訳ファイルの形式
翻訳ファイルは次の形式のJSONファイルです。`name`には言語選択のドロップダウンに表示する名前を記述します。

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

* `key`が重複しているとエラーになります。
* `value`には`string.Format`の書式（`{0}`など）を使用できます。

### UXMLの文字列を翻訳する
UXMLには英語の文字列をそのまま記述します。

```xml
<ui:Label text="Import Avatars" class="text-lg pb-2 font-bold" />
```

メインウィンドウは100msごとに`LanguageUtility.Localization`を実行し、ウィンドウ内のすべての`TextElement`（`Label`、`Button`など）の`text`を、翻訳ファイルの`key`と完全に一致する場合に`value`へ置き換えます。
メインウィンドウ以外のウィンドウでは、`CreateGUI`などで`LanguageUtility.Localization(rootVisualElement)`を呼び出してください。

### C#の文字列を翻訳する
C#で文字列を設定する場合は`T7e.Get`を使用します。

```csharp
var label = new Label(T7e.Get("Ready to upload"));

// 書式を使用する場合
T7e.Get("Avatar bundle size is too large. The maximum size is {0} MB, but the current size is {1} MB", limit, fileSize);
```

対応する翻訳が無い場合は、キーがそのまま返されます。

## 言語を追加する
* * *
新しい言語を追加する場合は、次のファイルをすべて用意してください。言語コード（例：`zh-cn`）をファイル名・フォルダ名に使用します。

| 追加するもの | 場所 |
| ---- | ---- |
| UIの翻訳ファイル | `Editor/Resources/Localization/{言語コード}.json` |
| ヘルプメッセージ | `Editor/Resources/Message/{言語コード}/{メッセージ番号}.txt` |
| EA Libraryの記事 | `Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/{言語コード}/` |
| ビューポイント位置エディタの翻訳ファイル | `Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization/{言語コード}.json` |

:::caution
利用可能な言語は、`Editor/Resources/Localization`にあるJSONファイルから自動で判定されます。
UIの翻訳ファイルだけを追加して他のファイルを用意しなかった場合、ヘルプやEA Library、ビューポイント位置エディタを開いた際にエラーが発生します。
:::

## ヘルプメッセージ
* * *
画面の各所にある「ヘルプ」ボタン（`HelpButton`）を押すと、ヘルプメッセージのウィンドウ（`EAUploaderMessageWindow`）が表示されます。
メッセージは`Editor/Resources/Message/{言語コード}/{メッセージ番号}.txt`から、現在の言語のものが読み込まれます。

UXMLでは、`msg-id`にメッセージ番号を指定します。

```xml
<eau:HelpButton msg-id="100" class="pb-2" />
```

C#からは`EAUploaderMessageWindow.ShowMsg(100)`（公開APIでは`HelpButtonAPI.ShowMessage(100)`）で表示できます。

### 使用されているメッセージ番号
| 番号 | 表示場所 |
| ---- | ---- |
| 100 | インポート/設定タブ：アバターをインポート |
| 101 | インポート/設定タブ：VRMをインポート |
| 102 | インポート/設定タブ：シェーダーをインポート |
| 103 | セットアップタブ：編集ツール |
| 104 | セットアップタブ：拡張機能をインポート |
| 105 | アップロードタブ：アップロードするアバターを選択 |
| 107 | シェーダーエラー |
| 108 | プレビューの操作説明 |
| 109 | アップロードタブ：アバター情報 |
| 111 | アップロードタブ：テストとしてビルド |
| 112 | アップロードタブ：アップロード |
| 113 | アップロードタブ：アバターパフォーマンス |
| 114 | アップロードタブ：プラットフォーム |
| 115 | アップロードタブ：サムネイル |
| 116 | インポート/設定タブ：モデルの管理 |
| 117 | アップロードタブ：Blueprint |
| 200 | VRM変換ウィンドウ |
| 201 | ビューポイント位置エディタ |
| 202 | アップロードタブ：アバターの最適化 |
| 203 | AvatarOptimizerの導入案内 |

新しいメッセージを追加する場合は、未使用の番号を使用し、すべての言語のフォルダにファイルを追加してください。

## 記事の書式
* * *
ヘルプメッセージとEA Libraryの記事は、`ArticleRenderer`で描画されます。記事は次のタグで記述します。

| タグ | 書式 | 内容 |
| ---- | ---- | ---- |
| `<t>` | `<t>見出し</t>` | 見出しを表示します。 |
| `<txt>` | `<txt>本文</txt>` | 本文を表示します。Unityのリッチテキスト（`<size=16>`、`<color=red>`、`<b>`、`<i>`、`<u>`など）を使用できます。 |
| `<image>` | `<image>ファイル名, 幅</image>` | 画像を表示します。ファイル名は記事ファイルからの相対パスです。幅は省略できます。 |
| `<button>` | `<button>ラベル, スタイル, URL</button>` | 押すとURLを開くボタンを表示します。スタイルには`Main`、`Sub`、`Link`のいずれかを記述します。（現在の実装では、スタイルによる表示の違いはありません） |
| `<hr>` | `<hr>色, 余白</hr>` | 区切り線を表示します。色には`black`や`#RRGGBB`を指定できます。 |
| `<section>` | `<section>画像, 幅, 本文</section>` | 画像と本文を並べて表示します。画像の高さは200pxで表示されます。（現在の実装では、幅の指定は使用されていません） |

記述例：

```
<t>シェーダーエラー</t>
<txt>
<size=14>適用されているシェーダーがプロジェクト内に存在しません。
必要なシェーダーを配布元で確認し、プロジェクトにインポートしてください。</size>
</txt>
<button>Discordへ参加する, Main, https://discord.gg/yYFru7brra</button>
```

:::caution
`<button>`と`<section>`は`,`で項目を区切っているため、ラベルや本文に`,`を含めることはできません。
:::

## EA Libraryの記事
* * *
EA Libraryの記事は、言語ごとに次のフォルダに格納します。記事１つにつき１つのフォルダを作成します。

```
Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/
└── ja/
    ├── 001_tutorial1/
    │   ├── tutorial1.json   記事の情報
    │   ├── Content.txt      記事の本文
    │   ├── thumbnail.png    サムネイル
    │   └── image1.png       本文で使用する画像
    └── 002_tutorial2/
        └── ...
```

記事の情報は次の形式のJSONファイルで記述します。フォルダ内の`.json`ファイルが記事の情報として読み込まれるため、１つのフォルダに複数の`.json`ファイルを置かないでください。

```json
{
  "title": "はじめに",
  "date": "2023-12-07",
  "tags": ["チュートリアル"],
  "keywords": ["チュートリアル", "スタート", "ガイド", "はじめに", "使い方"],
  "contentFile": "Content.txt",
  "thumbnail": "thumbnail.png"
}
```

| 項目 | 内容 |
| ---- | ---- |
| `title` | 記事のタイトル。一覧に表示されます。`\n`で改行できます。 |
| `date` | 記事の作成日 |
| `tags` | タグ。EA Libraryのタグの絞り込みに使用されます。 |
| `keywords` | 検索に使用するキーワード |
| `contentFile` | 本文のファイル名（JSONファイルからの相対パス） |
| `thumbnail` | サムネイルのファイル名（JSONファイルからの相対パス） |

本文は「記事の書式」で記述します。

:::note
現在の実装では、検索語が**タイトルとキーワードの両方**に含まれている記事のみが検索結果に表示されます。キーワードには、タイトルに含まれる語も追加しておくことを推奨します。
:::
