---
title: 'Runtime'
description: 'EAUploaderのランタイムについて'
---
# 開発に興味がありますか？
Project EAUploaderでは開発メンバーを常に募集しています！！
話を聞くだけでもOK！
是非当プロジェクトのDiscordサーバーへお越しください。
[参加はこちら](https://discord.gg/yYFru7brra)
* * *
* * *
本ページでは、`Runtime`フォルダにある`EAUploader`アセンブリについて解説します。

本ドキュメントは、EAUploader v1.6.2 の内容に準拠しています。

## 概要
* * *
`EAUploader`アセンブリには、アバター（プレハブ）に付与するコンポーネントが含まれています。
コンポーネントはシーンやプレハブに保存されるため、エディタ専用の`EAUploader.Editor`アセンブリとは分けて、全プラットフォーム向けのアセンブリとして定義しています。

| ファイル | クラス | 内容 |
| ---- | ---- | ---- |
| `Runtime/Components/AvatarTagComponent.cs` | `EAUploader.Components.AvatarTagComponent` | アバターに付与するコンポーネントの基底クラス |
| `Runtime/Components/EAUploaderMeta.cs` | `EAUploader.Components.EAUploaderMeta` | EAUploaderがプレハブを管理するための情報 |
| `Runtime/Components/EAUploaderOutfit.cs` | `EAUploader.Components.EAUploaderOutfit` | 着せ替え（対応衣装）で着せた衣装の情報 |

## AvatarTagComponent
* * *
EAUploaderがアバターに付与するコンポーネントの抽象基底クラスです。[Modular Avatar](https://github.com/bdunderscore/modular-avatar)の`AvatarTagComponent`をもとにしています（MIT License）。

* VRChat SDK - Avatars が導入されている場合（`VRC_SDK3A`が定義されている場合）、`VRC.SDKBase.IEditorOnly`を実装します。これにより、コンポーネントはVRChat SDKのホワイトリストのチェック対象外となり、アップロード時のビルドではアバターから取り除かれます。
* `[ExecuteAlways]`、`[DefaultExecutionOrder(-9990)]`が付与されています。

## EAUploaderMeta
* * *
EAUploaderが管理用Prefab Variantのルートに付与するコンポーネントです。`[DisallowMultipleComponent]`のため、１つのプレハブに１つだけ付与されます。

```csharp
namespace EAUploader.Components
{
    [DisallowMultipleComponent]
    public class EAUploaderMeta : AvatarTagComponent
    {
        public enum PrefabStatus { Show , Hidden, Pinned }
        public enum PrefabType { VRChat, VRM, Other }
        public enum PrefabGenre { Avatar, Cloth, Accessory, Other }

        public PrefabStatus status;
        public PrefabType type;
        public PrefabGenre genre;

        public long lastModifiedTicks;

        public bool genreConfirmed;

        [TextArea(3, 10)]
        public string memo;

        public List<string> tags = new List<string>();
    }
}
```

| フィールド | 内容 |
| ---- | ---- |
| `status` | 一覧での表示状態。`Show`（表示）、`Hidden`（非表示）、`Pinned`（ピン留め） |
| `type` | プレハブの種類。コンポーネントから判定する（`VRC_AvatarDescriptor` → `VRChat`、`VRMMeta` → `VRM`、それ以外 → `Other`） |
| `genre` | ユーザー向けの分類。`Avatar`、`Cloth`、`Accessory`、`Other` |
| `lastModifiedTicks` | EAUploaderがインポート・更新した日時（UTCのTicks）。`0`の場合はファイルのタイムスタンプを使う |
| `genreConfirmed` | インポート時にジャンルが確定したか |
| `memo` | メモ |
| `tags` | アイテムに付けたタグ |

`EAUploaderMeta`は管理用Prefab（`Assets/EAUploader/Prefabs/`以下）のルートにだけ付与され、ルートのものだけが読み込まれます。

:::note
v1.4以前と比べて`PrefabStatus`の並びが変更され、`Other`が削除されています。旧バージョンで元のPrefabに付与されていた`EAUploaderMeta`は、起動時の移行処理で管理用Prefab Variantに移されます。
:::

## EAUploaderOutfit
* * *
着せ替え（対応衣装）でアバターに着せた衣装のルートに付与されるコンポーネントです。

```csharp
namespace EAUploader.Components
{
    [DisallowMultipleComponent]
    public class EAUploaderOutfit : AvatarTagComponent
    {
        public enum SetupMode { ModularAvatar, BoneMerge, AttachToBone }

        public string sourcePrefabGuid;
        public SetupMode mode;
    }
}
```

| フィールド | 内容 |
| ---- | ---- |
| `sourcePrefabGuid` | 着せた衣装（管理用Prefab）のGUID |
| `mode` | 衣装のセットアップ方法。`ModularAvatar`（Modular Avatarでボーンを統合）、`BoneMerge`（アップロード時にEAUploaderがボーンを統合）、`AttachToBone`（ボーンに取り付け） |

`BoneMerge`の衣装は、VRChat SDKのビルド前処理（`OutfitBuildHook`、`IVRCSDKPreprocessAvatarCallback`、order −12000、NDMFより前）で、アップロードされるコピーの中でだけアバターのボーンに統合されます。

## 他ツールとの共存
* * *
### AAO: Avatar Optimizer
AvatarOptimizerは、アバターのコンポーネントがどのプロパティを参照・変更するかの情報をもとに最適化を行います。
EAUploaderは`Editor/Scripts/Coexistence/`で、AvatarOptimizerのAPI（`ComponentInformation`）を使用して`EAUploaderMeta`と`EAUploaderOutfit`の情報を登録しています。このコードは`HAS_AAO`が定義されている場合のみ有効になります。

ランタイムコンポーネントを追加・変更する場合は、AvatarOptimizerなどの非破壊ツールとの共存についても確認してください。
