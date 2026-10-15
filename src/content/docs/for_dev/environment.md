---
title: '環境構築'
description: 'EAUploaderの開発環境を構築する方法'
---
# 開発に興味がありますか？
Project EAUploaderでは開発メンバーを常に募集しています！！
話を聞くだけでもOK！
是非当プロジェクトのDiscordサーバーへお越しください。
[参加はこちら](https://discord.gg/yYFru7brra)
* * *
* * *
このページ・カテゴリは「EAUploader」の開発に関するドキュメントです。
EAUploaderに対応したツールの制作についてのリファレンスは「ツール製作者向け」カテゴリをご確認ください。
* * *
## 必要なもの
* Unity 2022.3（VRChatが推奨するバージョン）
* VRChat Creator Companion（VCC）又は ALCOM
* Git

EAUploaderは、VRChat SDK - Avatars 3.7.0以上に依存しています。VCCで作成したアバタープロジェクトには自動で追加されています。

## 開発環境の構築
下記の方法で、開発環境を構築できます。

1. VCC（VRChat Creator Companion）において空のAvatarプロジェクトを作成する
   * 注意！：既に一般ユーザー向けの方法でEAUploaderをVCCに導入している場合、Manage PackagesにおいてEasy Avatar Uploader for VRChatが**Not Installed**になっていることを確認してください。
2. 作成したUnityプロジェクト内に存在する、`Packages`フォルダ配下に`tech.uslog.eauploader`という名前のフォルダを作成してください。
3. 前手順で作成したフォルダにおいて、次のコマンドを入力してください。
   * `git clone https://github.com/Project-EAUploader/EAUploader-for-VRChat.git .`
   * 注意！：ドットを忘れないでください。ドットを忘れると、`tech.uslog.eauploader`フォルダの配下にさらにフォルダが作成され、EAUploaderが正常に動作しなくなります。
4. Unityプロジェクトを再起動し、自動的にEAUploaderのウィンドウが表示されれば、開発環境は構築できています。

Unity拡張開発において、特別なビルド手順は必要ありません。ソースコードを変更すると、Unity側で自動的にビルドが行われます。Unityエディタ拡張の世界へようこそ！

:::caution
EAUploaderは内部で`Packages/tech.uslog.eauploader`というパスを直接参照しています。フォルダ名は必ず`tech.uslog.eauploader`にしてください。
:::

## 連携機能を開発・確認する場合
VRM Converter for VRChat や AvatarOptimizer との連携機能は、それぞれのパッケージがプロジェクトに導入されている場合のみ有効になります。
これらの機能を開発・確認する場合は、VCC等から対象のパッケージをプロジェクトに追加してください。

| 連携先 | パッケージ名 | 有効になる条件 | シンボル |
| ---- | ---- | ---- | ---- |
| VRM Converter for VRChat | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0以上 | `HAS_VRM` |
| AAO: Avatar Optimizer | `com.anatawa12.avatar-optimizer` | 1.7.0以上 | `HAS_AAO` |

シンボルは`EAUploader.Editor.asmdef`のVersion Definesで定義されており、`#if HAS_VRM`のように条件付きコンパイルで使用します。
なお、実行時の判定（`EAUploaderCore.HasVRM`、`EAUploaderCore.HasAAO`）は`Packages/packages-lock.json`の内容をもとに行っています。VRMの判定には、VRM Converter for VRChatに加えてUniVRM（`com.vrmc.univrm`）も必要です。

## 動作確認のポイント
* EAUploaderの初期化処理は、Unityの起動時やスクリプトの再コンパイル後に実行されます。初期化処理を再度実行したい場合は、メニューの「EAUploader」→「Reload」を使用してください。
* Unityの Console に出力されたログは、プロジェクトフォルダ直下の`EAUploaderLog`フォルダにも出力されます。詳しくは「[ログ出力機能仕様書](/for_dev/logging/)」をご覧ください。
* メニューの「Window」→「Error Report」を実行すると、テスト用のエラーログを出力してエラーレポート画面の表示を確認できます。

## コントリビュート
プロジェクトに参加するには2つの方法があります。

* [Discord](https://discord.gg/yYFru7brra)に参加し、Github組織(Project-EAUploader)のメンバーとして相談しながらタスクを担当する
* プロジェクトをフォークし、修正や機能追加のプルリクエストを行う（宣言は不要）

どちらでも構いません。ただし、作業を開始する前に、プロジェクトのスケジュールと進行中のタスク [こちら](https://github.com/orgs/Project-EAUploader/projects/1) を確認することを忘れないでください。
