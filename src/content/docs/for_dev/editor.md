---
title: 'Editor'
description: 'EAUploaderのエディターについて'
---
# 開発に興味がありますか？
Project EAUploaderでは開発メンバーを常に募集しています！！
話を聞くだけでもOK！
是非当プロジェクトのDiscordサーバーへお越しください。
[参加はこちら](https://discord.gg/yYFru7brra)
* * *
* * *
本ページでは、EAUploaderの本体である`EAUploader.Editor`アセンブリの処理の流れを解説します。

本ドキュメントは、EAUploader v1.4.6 の内容に準拠しています。

## 起動処理
* * *
EAUploaderの起動処理は`EAUploaderCore`（`Editor/Scripts/EAUploaderCore.cs`）が担当します。

### 1. 静的コンストラクタ
`EAUploaderCore`には`[InitializeOnLoad]`属性が付与されており、Unityの起動時やスクリプトの再コンパイル（ドメインリロード）のたびに静的コンストラクタが実行されます。

1. `Application.logMessageReceived`にログ出力処理を登録する。
2. 出力するログファイル名を決定する。
3. 環境情報（日付、ログファイルGUID、EAUploaderのバージョン、Unityのバージョン、プラットフォーム、VPMパッケージの一覧）をログに出力する。
4. `EditorApplication.update`に初期化処理の待機を登録する。

### 2. 初期化処理
Unityがコンパイル中でもプレイモードでもない状態になると、`PerformInitialization`が一度だけ実行されます。

1. `InitializeEAUploader` ― `Assets/EAUploader`フォルダと`PrefabManager.json`が無ければ作成する。
2. `EAUploaderEditorManager.OnEditorManagerLoad` ― 拡張機能の登録情報（`EditorsManage.json`）を初期化する。
3. `ShaderChecker.CheckShaders` ― `Assets`内のすべてのプレハブについて、シェーダーが不足していないか確認する。
4. `PrefabManager.Initialize` ― プレハブの一覧を更新し、プレビュー画像が無いプレハブのプレビュー画像を生成する。
5. `CheckAvailablePackages` ― `Packages/packages-lock.json`を読み込み、VRM Converter（`HasVRM`）とAvatarOptimizer（`HasAAO`）が導入されているか判定する。
6. `[EAUPlugin]`属性が付与されたstaticメソッドをすべてのアセンブリから探し、呼び出す。（拡張機能の登録）
7. `EditorApplication.delayCall`でEAUploaderのウィンドウを開く。既に開いている場合はフォーカスする。

初期化中に例外が発生した場合は、EAUploaderの再起動を促すダイアログを表示します。「再起動」を押すと、`Packages/tech.uslog.eauploader`を再インポートします。

### 再読み込み（Reload）
メニューの「EAUploader」→「Reload」（`EAUploaderCore.ReloadSDK`）では、選択中のプレハブの解除、拡張機能の登録情報の初期化、プレハブ一覧の更新、連携パッケージの判定を再度行います。

## データの保存
* * *
EAUploaderは、プロジェクト内の次の場所にデータを保存します。

| パス | 内容 | 担当クラス |
| ---- | ---- | ---- |
| `Assets/EAUploader/settings.json` | 表示言語（`language`）、EA Libraryの開閉状態（`isLibraryOpen`） | `Config`, `LanguageUtility` |
| `Assets/EAUploader/PrefabManager.json` | プレハブの一覧（`PrefabInfo`のリスト） | `PrefabManager` |
| `Assets/EAUploader/EditorsManage.json` | 登録されている拡張機能の情報 | `EAUploaderEditorManager` |
| `Assets/EAUploader/PrefabPreviews/{プレハブ名}.png` | プレビュー画像（1080×1080） | `PrefabPreview` |
| `EAUploaderLog/` | ログファイル | `UI.Windows.Logger` |
| EditorPrefs `EAUploader.Theme` | テーマ（`white` / `dark`） | `ThemeUtility` |

`PrefabInfo`は次の情報を保持します。

| フィールド | 内容 |
| ---- | ---- |
| `Path` | プレハブのパス |
| `Name` | プレハブの名前（拡張子を除くファイル名） |
| `LastModified` | 最終更新日時 |
| `Type` | `VRChat`（VRC_AvatarDescriptorあり）、`VRM`（VRMMetaあり）、`Other` |
| `Status` | `Pinned`（ピン留め）、`Show`、`Hidden`（非表示）、`Other` |

:::caution
プレビュー画像はプレハブのファイル名をもとに保存されるため、別のフォルダに同じ名前のプレハブがある場合、プレビュー画像が共有されます。
:::

## プレハブの管理
* * *
### インポート時の処理
`AssetImportProcessor`（`AssetPostprocessor`）が、`.prefab`のインポートを検知して次の処理を行います。

1. `ShaderChecker.CheckShadersInPrefabs` ― シェーダーが不足している場合、ダイアログを表示する。ダイアログの「なぜこれを見ているのですか？」ボタンは、本ドキュメントの「[シェーダーが見つからないエラー](/faq/missing_shader/)」（`https://eauploader-docs.uslog.tech/faq/missing_shader`）を開く。
2. `PrefabManager.ImportPrefab` ― プレハブに`EAUploaderMeta`コンポーネントが無ければ追加し、プレビュー画像を生成して、モデルの管理の一覧を更新する。

:::danger
シェーダーのダイアログからリンクされているため、`faq/missing_shader`のページのURLは変更しないでください。
:::

### シェーダーの確認
`ShaderChecker`は、プレハブ内のすべての`Renderer`のマテリアルについて、シェーダーが`Hidden/InternalErrorShader`である場合、又は`Shader.Find`でシェーダーが見つからない場合に、シェーダーが不足していると判定します。

「導入済みのシェーダーを確認」で表示するシェーダーの一覧は、シェーダー名の最初の`/`より前の部分（グループ名）をまとめたものです。`ShaderChecker.UNSUPPORTED_SHADERS`に含まれるグループは除外されます。

### アップロード可否の判定
各画面では、次の3つの条件でアバターをアップロードできるか判定しています。

| 判定 | メソッド |
| ---- | ---- |
| VRC_AvatarDescriptorを持っているか | `Utility.CheckAvatarHasVRCAvatarDescriptor` |
| シェーダーが不足していないか | `ShaderChecker.CheckAvatarHasShader` |
| VRMアバターでないか | `Utility.CheckAvatarIsVRM` |

## UI
* * *
EAUploaderのUIは、UI Toolkit（UXML / USS）で作成されています。

* メインウィンドウは`UI.EAUploader`（メニュー「EAUploader」→「Open EAUploader」）です。`MainWindow.uxml`を読み込み、タブのボタン（`settings` / `setup` / `upload`）に応じて各タブの`Main.ShowContent`を呼び出します。
* スタイルは`styles.uss`（EAUploader独自のスタイル）と`tailwind.uss`（Tailwind CSS風のユーティリティクラス。`flex-row`、`p-4`、`text-xl`、`font-bold`など）を使用しています。
* UXMLは`Resources.Load`で読み込むため、`Editor/Resources`配下に配置します。
* 独自のUIコンポーネントは`Editor/Resources/UI/Components`にあります。UXMLでは`xmlns:eau="EAUploader.UI.Components"`を宣言して使用します。詳しくは「[UIコンポーネント](/for_tooldev/ui_components/)」をご覧ください。

### 多言語対応
メインウィンドウは100msごとに`LanguageUtility.Localization`を実行し、ウィンドウ内のすべての`TextElement`の文字列を翻訳します。そのため、UXMLには英語の文字列をそのまま記述し、翻訳ファイルに対応する翻訳を追加してください。
C#から文字列を設定する場合は`T7e.Get("English text")`を使用します。詳しくは「[多言語対応とリソース](/for_dev/localization/)」をご覧ください。

## アップロード処理
* * *
ビルドとアップロードは`AvatarUploader`（`Editor/Scripts/AvatarUploader.cs`）が担当します。VRChat SDKのコントロールパネルから`IVRCSdkAvatarBuilderApi`を取得して使用します。

### テストとしてビルド（`BuildAndTestAsync`）
1. VRChat SDKのコントロールパネルを開く。
2. `AvatarValidation.FindIllegalComponents`で、VRChatで使用できないコンポーネントを削除する。
3. `builder.BuildAndTest`でビルドする。

### アップロード（`UploadAvatarAsync`）
1. VRChatで使用できないコンポーネントを削除する。
2. `GetVRCAvatar`で、`PipelineManager`の`blueprintId`をもとにVRChat上のアバター情報を取得する。
3. VRChat上にアバターが無い場合（新規）：
   1. `builder.Build`でビルドする。
   2. アセットバンドルのサイズが上限を超えていないか確認する。
   3. `blueprintId`が無ければ割り当てる。
   4. `VRCApi.CreateNewAvatar`でアップロードする。
4. VRChat上にアバターがある場合（更新）：
   1. `builder.Build`でビルドし、`VRCApi.UpdateAvatarBundle`でアセットバンドルを更新する。
   2. サムネイルが指定されていれば`VRCApi.UpdateAvatarImage`で更新する。
   3. 名前、説明、公開設定、タグに変更があれば`VRCApi.UpdateAvatarInfo`で更新する。

アップロードの進捗は`ProgressChanged`イベント、完了は`OnComplete`イベントで通知されます。
アバター情報だけを更新する場合は`UpdateVRCAvatar`を使用します。

### アバターパフォーマンス
アップロードタブのアバターパフォーマンスは、`PerformanceInfoComputer`（`Editor/Scripts/VRCSDK/PerformanceInfo.cs`）がVRChat SDKの`AvatarPerformance`を使用して計算しています。現在はPC（Windows）用の基準で計算しています。

### 自動最適化
AvatarOptimizerが導入されている場合（`HAS_AAO`）、アップロードタブの「自動最適化」をオンにすると、アバターのルートに`TraceAndOptimize`コンポーネントを追加します。オフにすると削除します。

## 拡張機能（編集ツール）の管理
* * *
`EAUploaderEditorManager`は、拡張機能から`RegisterEditor`で登録された`EditorRegistration`を保持します。
セットアップタブの「編集ツール」は、`GetRegisteredEditors`で取得した一覧をもとに表示しています。ボタンを押すと、`EditorRegistration.MenuName`のメニューを`EditorApplication.ExecuteMenuItem`で実行します。

拡張機能の作り方は「[クイックスタートガイダンス](/for_tooldev/extension/)」をご覧ください。

## ログ出力
* * *
ログ出力とエラーレポートについては「[ログ出力機能仕様書](/for_dev/logging/)」をご覧ください。
