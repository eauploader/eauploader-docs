---
title: 'ディレクトリとnamespaceの構造'
description: 'EAUploaderのディレクトリとnamespaceの構造について'
---
# 開発に興味がありますか？
Project EAUploaderでは開発メンバーを常に募集しています！！
話を聞くだけでもOK！
是非当プロジェクトのDiscordサーバーへお越しください。
[参加はこちら](https://discord.gg/yYFru7brra)
* * *
* * *
本ドキュメントは、EAUploader v1.4.6 の内容に準拠しています。

## ディレクトリ構造
* * *
EAUploaderは、VPMパッケージ`tech.uslog.eauploader`として配布されています。パッケージの主なディレクトリ構造は次の通りです。

```
tech.uslog.eauploader/
├── package.json                  パッケージ情報（バージョン、依存関係）
├── Editor/                       エディタ拡張（EAUploader.Editor アセンブリ）
│   ├── EAUploader.Editor.asmdef
│   ├── Public EAUploader API/    外部ツール向けの公開API
│   ├── Scripts/                  主要な処理
│   │   ├── EAUploaderCore.cs           起動・初期化処理
│   │   ├── EAUploaderEditorManager.cs  拡張機能（編集ツール）の登録管理
│   │   ├── EAUPluginAttribute.cs       拡張機能の初期化用属性
│   │   ├── AvatarUploader.cs           ビルド・アップロード処理
│   │   ├── AssetProcessor.cs           アセットインポート時の処理
│   │   ├── Config.cs                   設定ファイルの読み書き
│   │   ├── LanguageUtility.cs          多言語対応
│   │   ├── T7e.cs                      翻訳文字列の取得
│   │   ├── CustomPrefabUtility/        プレハブの管理・プレビュー・シェーダー確認・VRM変換
│   │   ├── Coexistence/                他ツールとの共存のためのコード
│   │   ├── Feedback/                   フィードバック送信（現在停止中）
│   │   ├── SubWindow/                  サブウィンドウ（現在未使用）
│   │   └── VRCSDK/                     アバターパフォーマンスの計算
│   └── Resources/
│       ├── Localization/         UIの翻訳ファイル（ja.json, ko.json）
│       ├── Message/              ヘルプメッセージ（言語別）
│       ├── Shaders/              EAUploaderが使用するシェーダー
│       └── UI/                   UI Toolkit の UXML・USS・C#
│           ├── EAUploader.cs           メインウィンドウ
│           ├── MainWindow.uxml
│           ├── styles.uss / tailwind.uss
│           ├── Components/             独自UIコンポーネント
│           ├── TabContents/            各タブの画面
│           │   ├── ImportSettings/     インポート/設定タブ（EA Libraryを含む）
│           │   ├── Setup/              セットアップタブ（ビューポイント位置エディタを含む）
│           │   └── Upload/             アップロードタブ
│           └── Windows/                ダイアログ・エラーレポート等のウィンドウ
├── Runtime/                      ランタイムコンポーネント（EAUploader アセンブリ）
│   ├── EAUploader.asmdef
│   └── Components/
└── .vpm/, .github/               VPMリポジトリの生成・配布用
```

## アセンブリ
* * *
| アセンブリ | 場所 | 対象プラットフォーム | 内容 |
| ---- | ---- | ---- | ---- |
| `EAUploader.Editor` | `Editor/` | Editor | EAUploaderの本体。UI、プレハブ管理、アップロード処理、公開API |
| `EAUploader` | `Runtime/` | すべて | アバターに付与するコンポーネント |

`EAUploader.Editor`は次のVersion Definesを定義しています。

| シンボル | パッケージ | 条件 |
| ---- | ---- | ---- |
| `HAS_VRM` | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0以上 |
| `HAS_AAO` | `com.anatawa12.avatar-optimizer` | 1.7.0以上 |

`EAUploader`（Runtime）は、VRChat SDK - Avatars（`com.vrchat.avatars`）が存在する場合に`VRC_SDK3A`を定義します。

## namespace
* * *
| namespace | 主なクラス | 内容 |
| ---- | ---- | ---- |
| `EAUploader` | `EAUploaderCore`, `EAUploaderEditorManager`, `EditorRegistration`, `EAUPluginAttribute`, `AvatarUploader`, `LanguageUtility`, `T7e`, `Config` | 起動処理、拡張機能の登録、アップロード、多言語対応などのコア機能 |
| `EAUploader.CustomPrefabUtility` | `PrefabManager`, `PrefabPreview`, `ShaderChecker`, `Utility`, `PrefabInfo`, `RenamePrefabWindow`, `VRMImporter` | プレハブの管理、プレビュー画像の生成、シェーダーの確認、VRMの変換 |
| `EAUploader.UI` | `EAUploader` | メインウィンドウ |
| `EAUploader.UI.ImportSettings` | `Main`, `Import`, `ManageModels`, `EALibrary` | インポート/設定タブ（internal） |
| `EAUploader.UI.Setup` | `Main`, `ViewpointPositionEditor` | セットアップタブと標準の編集ツール |
| `EAUploader.UI.Upload` | `Main`, `UploadForm` | アップロードタブ（internal） |
| `EAUploader.UI.Components` | `ShadowButton`, `MaterialIcon`, `HelpButton`, `SlideToggle`, `TextFieldPro`, `Preview` など | 独自UIコンポーネント |
| `EAUploader.UI.Windows` | `DialogPro`, `Logger`, `PrefabPreviewer` | ダイアログ、エラーレポート、ログ出力 |
| `EAUploader.Editor.API` | `CoreAPI`, `LanguageAPI`, `UploadAPI` | 公開API |
| `EAUploader.Editor.Plugin.API` | `PluginAPI` | 公開API（拡張機能の登録） |
| `EAUploader.Editor.Prefab.API` | `PrefabAPI`, `PrefabPreviewAPI`, `ShaderAPI`, `PrefabUtilityAPI`, `VRMAPI` | 公開API（プレハブの操作） |
| `EAUploader.Editor.Resource.API` | `EAUResourceAPI`, `HelpButtonAPI`, `LinkAPI`, `MaterialIconAPI` など | 公開API（スタイル、UIコンポーネント） |
| `EAUploader.Components` | `AvatarTagComponent`, `EAUploaderMeta` | ランタイムコンポーネント |

`EAUploader.Editor.*.API`は、外部のツールから利用されることを想定した公開APIです。内部の実装（`EAUploader`や`EAUploader.CustomPrefabUtility`）を薄くラップしています。詳細は「API Reference」をご覧ください。

## クラスの関係
* * *
主要なクラスの関係は次の通りです。

```
EAUploaderCore（[InitializeOnLoad]）
├── EAUploaderEditorManager …… 拡張機能（EditorRegistration）の登録・保持
├── ShaderChecker ………………… プレハブのシェーダー確認
├── PrefabManager ………………… プレハブ一覧（PrefabInfo）の管理
│   └── PrefabPreview ………… プレビュー画像の生成・保存
└── UI.EAUploader（メインウィンドウ）
    ├── UI.ImportSettings.Main …… Import / ManageModels / EALibrary
    ├── UI.Setup.Main …………… 編集ツール一覧（EAUploaderEditorManagerから取得）
    └── UI.Upload.Main ………… UploadForm → AvatarUploader → VRChat SDK
```

各タブは、`EAUploaderCore.selectedPrefabPath`（選択中のプレハブのパス）を共有しています。セットアップタブで選択したアバターは、アップロードタブでも選択された状態になります。

処理の流れの詳細は「[Editor](/for_dev/editor/)」をご覧ください。
