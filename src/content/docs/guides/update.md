---
title: 'EAUploaderの更新と削除'
description: 'EAUploaderをアップデートする方法とプロジェクトから削除する方法'
---

## EAUploaderを更新する
* * *
EAUploader は VCC（又は ALCOM）から更新できます。

1. VCC のプロジェクト一覧から、EAUploader を導入したプロジェクトの<span style="color: #00b0f0">Manage Project</span>を開きます。
2. Manage Packages の中から **Easy Avatar Uploader for VRChat** を探します。
3. 新しいバージョンがある場合は、更新ボタン（↑）を押すか、バージョンの一覧から最新のバージョンを選択してください。

更新したら、Unity でプロジェクトを開いてください。

:::caution
更新の前に、プロジェクトのバックアップをとるようにしてください。バックアップの取り方は「[初めての方向けガイド](/guides/getting_started/#バックアップの取り方)」を参照してください。
:::

現在導入されている EAUploader のバージョンは、インポート/設定タブの「設定」で確認できます。
更新内容は [GitHub のリリースページ](https://github.com/Project-EAUploader/EAUploader-for-VRChat/releases) や公式 Discord サーバーで告知しています。

## EAUploaderをプロジェクトから削除する
* * *
VCC の Manage Packages で **Easy Avatar Uploader for VRChat** の ⊖ ボタンを押すと、プロジェクトから EAUploader を削除できます。

EAUploader を削除しても、アバターやシェーダーなどのデータは削除されません。通常の Unity エディタとして、引き続きプロジェクトを使用できます。

### EAUploaderが作成するファイル
EAUploader は、プロジェクト内に以下のファイルやフォルダを作成します。EAUploader を削除した後、不要であれば削除しても問題ありません。

| 場所 | 内容 |
| ---- | ---- |
| `Assets/EAUploader/settings.json` | 言語などの設定 |
| `Assets/EAUploader/PrefabManager.json` | モデルの管理の情報（ピン留め、非表示など） |
| `Assets/EAUploader/EditorsManage.json` | 登録されている編集ツールの情報 |
| `Assets/EAUploader/PrefabPreviews/` | 一覧に表示するプレビュー画像 |
| `EAUploaderLog/`（プロジェクトフォルダ直下） | ログファイル |
| `Assets/VRM/` | VRM からインポートしたアバター（VRM を使用した場合のみ） |

:::caution
`Assets/VRM/` にはインポートした VRM アバターそのものが保存されています。VRM アバターを使用している場合は削除しないでください。
:::

### Missing Script と表示される場合
EAUploader は、アバターを管理するためにプレハブへ「EAUploaderMeta」というコンポーネントを追加します。
EAUploader を削除した後、このコンポーネントが「Missing Script」と表示される場合があります。このコンポーネントはアバターの見た目や動作には影響しません。不要な場合は、Inspector から削除してください。

## 問題が発生した場合
* * *
EAUploader に問題が発生した場合は、まず EAUploader の再起動をお試しください。それでも解決しない場合は、VCC にて EAUploader を一度プロジェクトから削除し、再度追加してください。

詳しくは「[よくある質問とトラブルシューティング](/faq/troubleshooting/)」を参照してください。
