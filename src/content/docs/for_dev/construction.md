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
本ドキュメントは、EAUploader v1.6.2 の内容に準拠しています。

## ディレクトリ構造
* * *
EAUploaderは、VPMパッケージ`tech.uslog.eauploader`として配布されています。パッケージの主なディレクトリ構造は次の通りです。

```
tech.uslog.eauploader/
├── package.json                  パッケージ情報（バージョン、依存関係）
├── CHANGELOG.md                  変更履歴
├── Docs/                         仕様書（英語）
├── Editor/                       エディタ拡張（EAUploader.Editor アセンブリ）
│   ├── EAUploader.Editor.asmdef
│   ├── Public EAUploader API/    外部ツール向けの公開API（１クラス１ファイル）
│   ├── Scripts/
│   │   ├── EAUploaderCore.cs           起動・初期化処理、グローバルな状態
│   │   ├── EAUploaderEditorManager.cs  編集ツールの登録管理
│   │   ├── EAUPluginAttribute.cs       [EAUPlugin] 属性
│   │   ├── AvatarUploader.cs           ビルド・アップロード処理
│   │   ├── AssetProcessor.cs           アセットインポート時の処理
│   │   ├── Config.cs                   設定ファイル（settings.json）
│   │   ├── LanguageUtility.cs, T7e.cs  多言語対応
│   │   ├── ThemeUtility.cs             テーマ
│   │   ├── CustomPrefabUtility/        管理用Prefab Variant、タグ、プレビュー、シェーダー確認、VRM変換、移行、削除
│   │   ├── Coexistence/                AvatarOptimizer との共存
│   │   ├── VRCSDK/                     アバターパフォーマンスの計算
│   │   └── Feedback/, SubWindow/       フィードバック送信・ようこそ画面（現在未使用）
│   └── Resources/
│       ├── Localization/         UIの翻訳ファイル（ja.json, ko.json）
│       ├── Message/              ヘルプメッセージ（言語別）
│       ├── Shaders/              AlwaysShow.shader（プレビューのマーカー）、TextureAdjust.shader（テクスチャ編集）
│       └── UI/
│           ├── EAUploader.cs           メインウィンドウ
│           ├── MainWindow.uxml
│           ├── styles.uss / tailwind.uss
│           ├── Components/             独自UIコンポーネント
│           ├── Modals/                 ウィンドウ内に表示するモーダル
│           ├── TabContents/
│           │   ├── AvatarList/         アバター一覧
│           │   ├── Setup/              編集画面
│           │   │   └── Editor/         標準の編集ツール（Common, ViewpointPositionEditor, ShapeKeyEditor, TextureEditor, OutfitTool）
│           │   ├── Upload/             アップロードのフォーム
│           │   └── ImportSettings/     EA Library の記事（現在は画面に表示されません）
│           └── Windows/                ダイアログ、エラーレポート、VRM変換ウィンドウ
├── Runtime/                      ランタイムコンポーネント（EAUploader アセンブリ）
│   ├── EAUploader.asmdef
│   └── Components/               EAUploaderMeta, EAUploaderOutfit, AvatarTagComponent
└── .vpm/, .github/               VPMリポジトリの生成・配布用
```

## アセンブリ
* * *
| アセンブリ | 場所 | 対象プラットフォーム | 内容 |
| ---- | ---- | ---- | ---- |
| `EAUploader.Editor` | `Editor/` | Editor | EAUploaderの本体。UI、アイテム管理、編集ツール、アップロード処理、公開API |
| `EAUploader` | `Runtime/` | すべて | アバターに付与するコンポーネント |

`EAUploader.Editor`は次のVersion Definesを定義しています。

| シンボル | パッケージ | 条件 |
| ---- | ---- | ---- |
| `HAS_VRM` | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0以上 |
| `HAS_AAO` | `com.anatawa12.avatar-optimizer` | 1.7.0以上 |
| `HAS_MA` | `nadena.dev.modular-avatar` | 1.9.0以上 |

`EAUploader`（Runtime）は、VRChat SDK - Avatars（`com.vrchat.avatars`）が存在する場合に`VRC_SDK3A`を定義します。

## namespace
* * *
| namespace | 主なクラス | 内容 |
| ---- | ---- | ---- |
| `EAUploader` | `EAUploaderCore`, `EAUploaderEditorManager`, `EditorRegistration`, `EAUPluginAttribute`, `AvatarUploader`, `LanguageUtility`, `T7e`, `Config` | 起動処理、編集ツールの登録、アップロード、多言語対応などのコア機能 |
| `EAUploader.CustomPrefabUtility` | `ManagedPrefabs`, `PrefabManager`, `PrefabInfo`, `TagManager`, `PrefabPreview`, `ShaderChecker`, `Utility`, `VRMImporter` | 管理用Prefab Variant、メタデータ、タグ、プレビュー画像、シェーダーの確認、VRMの変換、移行、削除 |
| `EAUploader.UI` | `EAUploader`, `ThemeUtility` | メインウィンドウと画面の切り替え、テーマ |
| `EAUploader.UI.AvatarList` | `Main` | アバター一覧（internal） |
| `EAUploader.UI.Setup` | `Main`, `ViewpointPositionEditor` | 編集画面と、ビューポイント位置エディタ |
| `EAUploader.UI.Setup.EditTools` | `EditToolModal`, `EditToolSession`, `ToolModalFrame`, `EditToolUtility` など | 標準の編集ツールとその共通基盤（internal） |
| `EAUploader.UI.Upload` | `UploadForm` | アップロードのフォーム（internal） |
| `EAUploader.UI.Modals` | `ImportModal`, `SettingsModal`, `ClothSettingModal`, `TagFilterModal`, `TagSettingsModal`, `PrefabPreviewModal` など | ウィンドウ内に表示するモーダル |
| `EAUploader.UI.Components` | `Modal`, `ToastManager`, `ShadowButton`, `MaterialIcon`, `HelpButton`, `DropdownFieldPro`, `Preview` など | 独自UIコンポーネント |
| `EAUploader.UI.Windows` | `DialogPro`, `Logger` | ダイアログ、エラーレポート、ログ出力 |
| `EAUploader.Editor.API` | `CoreAPI`, `LanguageAPI`, `UploadAPI` | 公開API |
| `EAUploader.Editor.Plugin.API` | `PluginAPI` | 公開API（拡張機能の登録） |
| `EAUploader.Editor.Prefab.API` | `PrefabAPI`, `PrefabPreviewAPI`, `ShaderAPI`, `PrefabUtilityAPI`, `VRMAPI` | 公開API（プレハブの操作） |
| `EAUploader.Editor.Resource.API` | `EAUResourceAPI`, `HelpButtonAPI`, `LinkAPI`, `MaterialIconAPI` など | 公開API（スタイル、UIコンポーネント） |
| `EAUploader.Components` | `AvatarTagComponent`, `EAUploaderMeta`, `EAUploaderOutfit` | ランタイムコンポーネント |

`EAUploader.Editor.*.API`は、外部のツールから利用されることを想定した公開APIです。内部の実装（`EAUploader`や`EAUploader.CustomPrefabUtility`）を薄くラップしています。詳細は「API Reference」をご覧ください。

## クラスの関係
* * *
主要なクラスの関係は次の通りです。

```
EAUploaderCore（[InitializeOnLoad]）
├── EAUploaderEditorManager …… 編集ツール（EditorRegistration）の登録・保持
├── ShaderChecker ………………… プレハブのシェーダー確認
├── PrefabManager ………………… 管理用Prefab Variant の一覧（PrefabInfo）とメタデータ
│   ├── ManagedPrefabs ……… Variant の作成・複製・パスの管理
│   ├── TagManager ………… タグとタググループ
│   └── PrefabPreview ……… プレビュー画像の生成・保存
└── UI.EAUploader（メインウィンドウ）
    ├── UI.AvatarList.Main …… アバター一覧
    ├── UI.Setup.Main ……………… 編集画面（編集ツール一覧、アイテム情報）
    │   └── UI.Upload.UploadForm → AvatarUploader → VRChat SDK
    └── modal / toasts ……………… 共通のモーダルと通知
```

各画面は、`EAUploaderCore.selectedPrefabPath`（選択中のアイテムのパス）を共有しています。

処理の流れの詳細は「[Editor](/for_dev/editor/)」をご覧ください。
