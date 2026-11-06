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

:::note
古いバージョンから更新した場合は、初回起動時に、アイテムを新しい管理方法（Prefab Variant）へ移行するかどうかの確認が表示されます。詳しくは「[アバターのインポートと管理](/guides/import/#eauploaderでのアイテムの管理)」を参照してください。
:::

:::caution
更新の前に、プロジェクトのバックアップをとるようにしてください。バックアップの取り方は「[初めての方向けガイド](/guides/getting_started/#バックアップの取り方)」を参照してください。
:::

現在導入されている EAUploader のバージョンは、アバター一覧の「設定」で確認できます。
更新内容は [GitHub のリリースページ](https://github.com/eauploader/EAUploader-for-VRChat/releases) や公式 Discord サーバーで告知しています。

## EAUploaderをプロジェクトから削除する
* * *
VCC の Manage Packages で **Easy Avatar Uploader for VRChat** の ⊖ ボタンを押すと、プロジェクトから EAUploader を削除できます。

EAUploader を削除しても、アバターやシェーダーなどのデータは削除されません。通常の Unity エディタとして、引き続きプロジェクトを使用できます。

### EAUploaderが作成するファイル
EAUploader は、プロジェクト内に以下のファイルやフォルダを作成します。

| 場所 | 内容 |
| ---- | ---- |
| `Assets/EAUploader/Prefabs/` | EAUploader で管理しているアイテム（管理用コピー）と、編集ツールで作成したテクスチャ・マテリアル |
| `Assets/EAUploader/PrefabPreviews/` | 一覧に表示するプレビュー画像 |
| `Assets/EAUploader/settings.json` | 言語などの設定 |
| `Assets/EAUploader/tags.json` | タグとタググループ |
| `Assets/EAUploader/EditorsManage.json` | 登録されている編集ツールの情報 |
| `Assets/EAUploader/PrefabManager.json` | 以前のバージョンとの互換用のファイル |
| `EAUploaderLog/`（プロジェクトフォルダ直下） | ログファイル |
| `Assets/VRM/` | VRM からインポートしたアバター（VRM を使用した場合のみ） |

:::danger
`Assets/EAUploader/Prefabs/` には、EAUploader で名前を変えたり、編集ツールで改変したりしたアバターが保存されています。EAUploader を削除した後も、これらのアバターを使う場合は削除しないでください。
また、`Assets/VRM/` にはインポートした VRM アバターそのものが保存されています。VRM アバターを使用している場合は削除しないでください。
:::

### Missing Script と表示される場合
EAUploader は、アイテムを管理するために管理用コピーへ「EAUploaderMeta」というコンポーネントを追加します。着せ替え（対応衣装）で着せた衣装には「EAUploaderOutfit」というコンポーネントが追加されます。
EAUploader を削除した後、これらのコンポーネントが「Missing Script」と表示される場合があります。これらのコンポーネントはアップロード時に取り除かれ、アバターの見た目には影響しません。不要な場合は、Inspector から削除してください。

:::caution
Modular Avatar を使わずに着せ替え（対応衣装）で着せた衣装は、EAUploader がアップロード時にアバターのボーンへ統合しています。EAUploader を削除すると、この統合が行われなくなるため、衣装が正しく表示されなくなります。
:::

## 問題が発生した場合
* * *
EAUploader に問題が発生した場合は、まず EAUploader の再起動をお試しください。それでも解決しない場合は、VCC にて EAUploader を一度プロジェクトから削除し、再度追加してください。

詳しくは「[よくある質問とトラブルシューティング](/faq/troubleshooting/)」を参照してください。
