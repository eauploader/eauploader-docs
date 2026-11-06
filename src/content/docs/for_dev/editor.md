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
より詳しい仕様は、リポジトリの`Docs/`フォルダにある仕様書（英語）もご覧ください。

本ドキュメントは、EAUploader v1.6.2 の内容に準拠しています。

## 起動処理
* * *
EAUploaderの起動処理は`EAUploaderCore`（`Editor/Scripts/EAUploaderCore.cs`）が担当します。

### 1. 静的コンストラクタ
`EAUploaderCore`には`[InitializeOnLoad]`属性が付与されており、Unityの起動時やスクリプトの再コンパイル（ドメインリロード）のたびに静的コンストラクタが実行されます。

1. `Application.logMessageReceived`にログ出力処理を登録する。
2. 出力するログファイル名を決定し、環境情報（日付、ログファイルGUID、EAUploaderのバージョン、Unityのバージョン、プラットフォーム、VPMパッケージの一覧）をログに出力する。
3. `EditorApplication.update`に初期化処理の待機を登録する。

### 2. 初期化処理
Unityがコンパイル中でもプレイモードへの移行中でもない状態になると、`PerformInitialization`が一度だけ実行されます。

1. `InitializeEAUploader` ― `Assets/EAUploader`フォルダと`PrefabManager.json`が無ければ作成する。
2. `AvatarUploader.CleanupLeftoverBuildInstances` ― 中断されたマルチプラットフォームビルドでシーンに残った、アップロード用の一時インスタンスを削除する。
3. `EAUploaderEditorManager.OnEditorManagerLoad` ― 編集ツールの登録情報（`EditorsManage.json`）を初期化する。
4. `ShaderChecker.CheckShaders` ― シェーダーが不足しているプレハブを確認する。
5. `PrefabManager.Initialize` ― 管理フォルダを用意し、旧バージョンからの移行（後述）を行い、不足しているプレビュー画像を生成する。
6. `CheckAvailablePackages` ― `Packages/packages-lock.json`を読み込み、`HasVRM`、`HasAAO`、`HasMA`を設定する。
7. `[EAUPlugin]`属性が付与されたstaticメソッドをすべてのアセンブリから探し、呼び出す。（編集ツール・拡張機能の登録）
8. `EditorApplication.delayCall`でEAUploaderのウィンドウを開く。

初期化中に例外が発生した場合は、EAUploaderの再起動を促すダイアログを表示します。「再起動」を押すと、`Packages/tech.uslog.eauploader`を再インポートします。

メニューの「EAUploader」→「Reload」（`EAUploaderCore.ReloadSDK`）では、選択の解除と、上記の手順3〜6を再度行います。

### グローバルな状態
| メンバー | 内容 |
| ---- | ---- |
| `EAUploaderCore.selectedPrefabPath` | 選択中のアイテムのパス。変更すると`SelectedPrefabPathChanged`が発生する。すべての画面と編集ツールはこのアイテムに対して動作する。 |
| `EAUploaderCore.HasVRM` / `HasAAO` / `HasMA` | 連携パッケージが導入されているか |
| `EAUploaderCore.GetVersion()` | `package.json`からバージョンを取得する |

## データの保存
* * *
| パス | 内容 | 担当クラス |
| ---- | ---- | ---- |
| `Assets/EAUploader/settings.json` | `language`、`isLibraryOpen`、`showErrorReportWindow`、`managedPrefabsMigrated` | `Config` |
| `Assets/EAUploader/PrefabManager.json` | 旧バージョンとの互換用（空のファイルを作成する） | `EAUploaderCore` |
| `Assets/EAUploader/EditorsManage.json` | 登録されている編集ツール（起動のたびに作り直す） | `EAUploaderEditorManager` |
| `Assets/EAUploader/tags.json` | タグ名とタググループ | `TagManager` |
| `Assets/EAUploader/Prefabs/<アイテム>/<Variant>.prefab` | 管理用Prefab Variant | `ManagedPrefabs` |
| `Assets/EAUploader/Prefabs/<アイテム>/Textures/`、`Materials/` | テクスチャ編集で生成したアセット | テクスチャ編集 |
| `Assets/EAUploader/PrefabPreviews/<GUID>.png` | プレビュー画像（1200×900）。ファイル名はPrefabのGUIDのため、名前を変えても引き継がれる | `PrefabPreview` |
| `EAUploaderLog/`（プロジェクト直下） | ログファイル（合計100MBまで） | `UI.Windows.Logger` |
| EditorPrefs `EAUploader.Theme` | テーマ（`white` / `dark` / `pastel`） | `ThemeUtility` |
| EditorPrefs `EAUploader.CardWidth` | アバター一覧のカードの幅 | アバター一覧 |

## アイテムの管理
* * *
### 管理用Prefab Variant
EAUploaderは、ユーザーがインポートしたPrefabを変更しません。インポートしたPrefabごとに**Prefab Variant**を作成し、そのVariantだけを管理・編集します。

```
Assets/EAUploader/Prefabs/<アイテム名>/<Variant名>.prefab
```

* `ManagedPrefabs.ROOT`は`Assets/EAUploader/Prefabs`です。インポートしたアイテムごとにフォルダを作ります。
* Variantは、元のPrefabを一時的なプレビューシーンでインスタンス化し、`EAUploaderMeta`を追加して`PrefabUtility.SaveAsPrefabAsset`で保存して作成します。開いているシーンには影響しません。
* `EAUploaderMeta`はVariantにだけ追加されます。
* 編集ツールなどで生成したアセットは、アイテムのフォルダに保存します。

| `ManagedPrefabs`のメソッド | 内容 |
| ---- | ---- |
| `IsManaged(path)` | `ROOT/`以下のパスか |
| `IsInEAUploaderFolder(path)` | `Assets/EAUploader/`以下のパスか（インポートの対象外） |
| `CreateVariant(sourcePath, configure)` | 新しいアイテムフォルダにVariantを作成する |
| `DuplicateVariant(variantPath)` | 同じアイテムフォルダ内にVariantを複製する |
| `GetSourcePath(variantPath)` | Variantの元のPrefabを取得する |
| `RenameItemFolder(variantPath, name)` | フォルダ内がそのPrefabだけの場合に、フォルダ名を変更する |

### メタデータ（`EAUploaderMeta`）
Variantのルートに追加される`EAUploaderMeta`に、一覧での表示状態（`status`）、種類（`type`）、ジャンル（`genre`）、最終更新日時（`lastModifiedTicks`）、メモ（`memo`）、タグ（`tags`）などを保存します。詳しくは「[Runtime](/for_dev/runtime/)」をご覧ください。

`PrefabInfo`は、管理用Prefabの情報をUI向けにまとめたスナップショット（パス、名前、最終更新日時、種類、状態、ジャンル、タグ、メモ、プレビュー画像）です。

### インポート時の処理
`AssetImportProcessor`（`Editor/Scripts/AssetProcessor.cs`）が、インポートされた`.prefab`ごとに次の処理を行います。

1. `ShaderChecker.CheckShadersInPrefabs` ― シェーダーが不足している場合、ダイアログを表示する。ダイアログの「なぜこれを見ているのですか？」ボタンは、本ドキュメントの「[シェーダーが見つからないエラー](/faq/missing_shader/)」（`https://eauploader-docs.uslog.tech/faq/missing_shader`）を開く。
2. `PrefabManager.ImportPrefab` ― 管理用Variantを作成又は更新する。
3. ジャンルの決定が必要なアバター以外のアイテムをまとめて、次の`delayCall`で`ClothSettingModal`を表示する（メインウィンドウが開いている場合のみ）。

:::danger
シェーダーのダイアログからリンクされているため、`faq/missing_shader`のページのURLは変更しないでください。
:::

`PrefabManager.ImportPrefab(path)`の動作は次の通りです。

* **管理されていないPrefab**（`Assets/`の外、`Assets/EAUploader/`の中、既にVariantがあるもの、`SuppressAutoVariantCreation`が設定されている間は対象外）
  * Variantを作成し、`type`と`lastModifiedTicks`を設定する。
  * アバター（`VRC_AvatarDescriptor`を持つ）は`genre = Avatar`、`genreConfirmed = true`にする。
  * それ以外は`genre = Cloth`、`genreConfirmed = false`にし、ジャンル選択のモーダルの対象にする。
  * プレビュー画像を保存し、一覧を更新する。
* **管理されているPrefab**
  * `type`を判定し直す。アバターは`genre = Avatar`にする。
  * 記録されている時刻が5秒以上前の場合だけ`lastModifiedTicks`を更新する（保存が再びインポート処理を呼んでループしないようにするため）。
  * 変更があればプレビュー画像を保存する。

### 一覧
`PrefabManager.GetAllPrefabs()`は、`EAUploaderMeta`を持つ管理用Variantを走査し、結果を2秒間キャッシュします。`InvalidateCache()`で強制的に再走査します。
`GetAllPrefabsWithPreview()`は非表示のアイテムを除き、`GetAllPrefabsIncludingHidden()`は含めます。どちらもピン留めを先頭に、新しい順に並べます。

### タグ（`TagManager`）
* タグ名とグループはプロジェクト全体で`Assets/EAUploader/tags.json`に保存し、アイテムへの付与は`EAUploaderMeta.tags`に保存します。
* 大文字と小文字を区別せずに比較します。大文字・小文字だけが違う新しいタグは、既存のタグの表記を使います。
* タグ名とグループ名は32文字まで（`MAX_TAG_LENGTH`）です。
* １つのタグは１つのグループにだけ所属します。タグを削除するとすべてのPrefabから外れ、グループを削除してもタグは残ります。

### 削除
`PrefabManager.ShowDeletePrefabDialog(path, completed)`は、ウィンドウ内の削除確認モーダルを開きます。

1. Variantの元のPrefab、マテリアル、テクスチャを検索する。参照の確認は`Assets/`以下の`.prefab/.unity/.controller/.overridecontroller/.anim/.asset/.mat`を対象に行い、他のアセットから使われているものは削除の対象外にする。
2. 削除される内容を、読み取り専用の一覧で表示する。検索が終わると削除を確定できる。
3. 検索結果は、アセットデータベースが変わらない間は再利用する。アセットが変更された場合は削除の前に検索し直し、対象が変わった場合は再度確認を求める。
4. 削除後、空になったアイテムフォルダを削除し、必要に応じて選択を解除して`completed(true)`を呼ぶ。キャンセルした場合は`completed(false)`を呼ぶ。

### 旧バージョンからの移行（`LegacyPrefabMigration`）
旧バージョンでは、インポートしたPrefabに直接`EAUploaderMeta`を追加していました。起動時に`managedPrefabsMigrated`が設定されておらず、管理フォルダの外にそのようなPrefabがある場合、ユーザーに移行を確認します。

1. 元のPrefabからメタデータを読み込む。
2. 元のPrefabから`EAUploaderMeta`を削除する（Variantに継承されないよう、Variantの作成前に行う）。
3. メタデータを持つVariantを作成し、旧形式（名前ベース）のプレビュー画像をGUIDベースのパスに移動する。

作成に失敗した場合は元のPrefabのデータを復元します。すべてのアイテムが成功した場合だけ移行完了とし、「あとで」を選んだ場合は次回の起動時に再度確認します。

## UI
* * *
EAUploaderのUIは、UI Toolkit（UXML / USS）で作成されています。

* メインウィンドウは`UI.EAUploader`（メニュー「EAUploader」→「Open EAUploader」、既定の大きさ 1280×640、最小 1080×640）の１つだけです。
* `CreateGUI()`で`UI/styles.uss`と`UI/tailwind.uss`を読み込み、`MainWindow.uxml`（`contentRoot`のみ）を複製し、共通の`Modal`と通知（`ToastManager`）を追加し、テーマを適用します。
* 画面はタブではなく、`contentRoot`に１つずつ組み立てます。`EAUploader.Navigate(screen)`で切り替え、`EAUploader.RefreshCurrentScreen()`で現在の画面を作り直します。

| `EAUploaderScreen` | 組み立て | 内容 |
| ---- | ---- | ---- |
| `AvatarList` | `UI.AvatarList.Main.ShowContent` | アバター一覧 |
| `Setup` | `UI.Setup.Main.ShowContent` | 編集画面 |
| `Upload` | `UI.Setup.Main.ShowContent`（アップロードのシートを開いた状態） | アップロード |

* アップロードは独立した画面ではなく、編集画面のシートとして`UI.Upload.UploadForm`を表示します。
* 独自のUIコンポーネントは`Editor/Resources/UI/Components`、モーダルは`Editor/Resources/UI/Modals`にあります。UXMLでは`xmlns:eau="EAUploader.UI.Components"`を宣言して使用します。詳しくは「[UIコンポーネント](/for_tooldev/ui_components/)」をご覧ください。

### 多言語対応
メインウィンドウは100msごとに`LanguageUtility.Localization`を実行し、ウィンドウ内の`TextElement`の文字列を翻訳します。USSクラス`no-translate`を持つ要素（名前やタグなどユーザーが入力した文字列）と、テキスト入力欄の中身は翻訳しません。
UXMLには英語の文字列をそのまま記述し、C#から文字列を設定する場合は`T7e.Get("English text")`を使用します。詳しくは「[多言語対応とリソース](/for_dev/localization/)」をご覧ください。

## アップロード処理
* * *
ビルドとアップロードは`AvatarUploader`（`Editor/Scripts/AvatarUploader.cs`）が担当します。VRChat SDKのビルダーAPI（`IVRCSdkAvatarBuilderApi`）を使用します。アップロードできるのはジャンルが`Avatar`のアイテムだけです。

### ビルド用インスタンス
テストとアップロードのどちらも`CreateBuildInstance(prefabPath)`でビルド用のインスタンスを作成します。

1. 管理用Prefabを読み込み、Blueprint IDが無ければ割り当ててPrefabに保存する（プラットフォームの切り替えによるドメインリロードをまたいでも紐づけを保つため）。
2. アクティブなシーンにインスタンス化し、**Prefabとの接続を完全に解除**する。これにより、Modular AvatarやAvatarOptimizer（NDMF）などの非破壊ツールがビルド時に処理でき、ビルド時の変更がPrefabアセットに書き戻されない。
3. 名前を`<名前> (EAUploader Upload)`にする。

インスタンスはビルド後に削除されます。VRChat SDKのマルチプラットフォームビルド中は使い続けるため残し、次回の起動時に`CleanupLeftoverBuildInstances`で削除します。

### テスト（`BuildAndTestAsync`）
VRChat SDKのコントロールパネルを開き、`builder.BuildAndTest`でビルドして、結果を`DialogPro`で表示します。ビルドとアップロードは同時に１つだけ実行できます。

### アップロード（`UploadAvatarAsync`）
1. ビルドするプラットフォームを決める（Windowsを先頭に、選択されていてビルドサポートが導入されているプラットフォーム）。
2. ビルド用インスタンスを作成し、Blueprint IDで既存の`VRCAvatar`を取得する。無ければ新規に作成する。
3. プラットフォームが１つの場合は`builder.BuildAndUpload`、複数の場合はSDKのマルチプラットフォームのターゲットを設定して`builder.BuildAndUploadMultiPlatform`を呼ぶ（Windows → 追加のプラットフォーム → 元のプラットフォームの順。途中でドメインリロードが発生する場合がある）。
4. SDKが割り当てたBlueprint IDをPrefabアセットに書き戻す。
5. 成功・キャンセル・失敗を表示し、`OnComplete`を発生させる。

進捗はSDKのイベント（`OnSdkBuildProgress`、`OnSdkUploadProgress`）から`AvatarUploader.ProgressChanged`に転送されます。`CancelUpload()`でアップロードを中止します。

### アバターパフォーマンス
アップロードのシートのアバターパフォーマンスは、`PerformanceInfoComputer`（`Editor/Scripts/VRCSDK/PerformanceInfo.cs`）がVRChat SDKの`AvatarPerformance`を使用して計算しています。現在はPC（Windows）用の基準で計算しています。

### 自動最適化
AvatarOptimizerが導入されている場合（`HAS_AAO`）、「自動最適化」をオンにすると、アバターのルートに`TraceAndOptimize`コンポーネントを追加します。オフにすると削除します。

## 編集ツール
* * *
`EAUploaderEditorManager`は、`RegisterEditor`で登録された`EditorRegistration`を保持し、`Assets/EAUploader/EditorsManage.json`にも書き出します。編集画面の「編集ツール」は`GetRegisteredEditors`で取得した一覧をもとに表示し、ボタンを押すと`EditorRegistration.MenuName`のメニューを`EditorApplication.ExecuteMenuItem`で実行します。

標準の編集ツールは、`Editor/Resources/UI/TabContents/Setup/Editor/Common/`の共通基盤（namespace `EAUploader.UI.Setup.EditTools`）を使用しています。

| 型 | 役割 |
| ---- | ---- |
| `EditToolSession` | 管理用Prefabを`PrefabUtility.LoadPrefabContents`で独立したプレビューシーンに開き、変更の有無を管理し、`PrefabUtility.SaveAsPrefabAsset`で保存（VariantはVariantのまま）、再読み込み（元に戻す）、対象の切り替えを行う。 |
| `EditToolModal` | 標準の編集ツールの抽象基底クラス。ヘッダー（ツール名、アイテム名、「未保存の変更あり」、戻る）、サイドパネル、ライブプレビュー、フッター（元に戻す、適用）の共通レイアウトで、ツールをEAUploaderのウィンドウ内のモーダルとして表示する。同時に開けるツールは１つだけ。 |
| `ToolModalFrame` | ビューポイント位置エディタを含むすべてのツールで共通のモーダルの枠。 |
| `EditToolUtility` | 生成アセットのフォルダ、ファイル名の整形、保存後の更新（`OnPrefabSaved`）、共通のUI部品、使用条件の判定。 |

* ツールに未保存の変更があると、EAUploaderのウィンドウは`hasUnsavedChanges`を報告し、ウィンドウを閉じるときに保存を確認します。
* 保存すると、`EditToolUtility.OnPrefabSaved`が`PrefabManager`のキャッシュを無効化し、プレビュー画像を作り直し、一覧と編集画面を更新します。
* ツールのプレビューは、共通の`Preview`コンポーネントのライブモード（`new Preview(container, session.Root)`）を使用します。

標準の編集ツールの動作の詳細は、リポジトリの`Docs/EditTools.md`をご覧ください。拡張機能の作り方は「[クイックスタートガイダンス](/for_tooldev/extension/)」をご覧ください。

## ログ出力
* * *
ログ出力とエラーレポートについては「[ログ出力機能仕様書](/for_dev/logging/)」をご覧ください。
