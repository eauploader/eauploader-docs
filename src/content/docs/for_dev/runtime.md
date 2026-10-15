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

本ドキュメントは、EAUploader v1.4.6 の内容に準拠しています。

## 概要
* * *
`EAUploader`アセンブリには、アバター（プレハブ）に付与するコンポーネントが含まれています。
コンポーネントはシーンやプレハブに保存されるため、エディタ専用の`EAUploader.Editor`アセンブリとは分けて、全プラットフォーム向けのアセンブリとして定義しています。

| ファイル | クラス | 内容 |
| ---- | ---- | ---- |
| `Runtime/Components/AvatarTagComponent.cs` | `EAUploader.Components.AvatarTagComponent` | アバターに付与するコンポーネントの基底クラス |
| `Runtime/Components/EAUploaderMeta.cs` | `EAUploader.Components.EAUploaderMeta` | EAUploaderがプレハブを管理するための情報 |

## AvatarTagComponent
* * *
EAUploaderがアバターに付与するコンポーネントの抽象基底クラスです。[Modular Avatar](https://github.com/bdunderscore/modular-avatar)の`AvatarTagComponent`をもとにしています（MIT License）。

* VRChat SDK - Avatars が導入されている場合（`VRC_SDK3A`が定義されている場合）、`VRC.SDKBase.IEditorOnly`を実装します。これにより、コンポーネントはVRChat SDKのホワイトリストのチェック対象外となり、アップロード時のビルドではアバターから取り除かれます。
* `[ExecuteAlways]`、`[DefaultExecutionOrder(-9990)]`が付与されています。

## EAUploaderMeta
* * *
EAUploaderがプレハブに付与するコンポーネントです。`[DisallowMultipleComponent]`のため、１つのプレハブに１つだけ付与されます。

```csharp
namespace EAUploader.Components
{
    [DisallowMultipleComponent]
    public class EAUploaderMeta : AvatarTagComponent
    {
        public enum PrefabStatus { Pinned, Show, Hidden, Other }
        public enum PrefabType { VRChat, VRM, Other }

        public PrefabStatus status;
        public PrefabType type;
    }
}
```

| フィールド | 内容 |
| ---- | ---- |
| `type` | プレハブの種類。`VRChat`（VRChat用アバター）、`VRM`（VRMアバター、又はVRMから変換したアバター）、`Other` |
| `status` | プレハブの表示状態。`Pinned`（ピン留め）、`Show`（表示）、`Hidden`（非表示）、`Other` |

### 付与されるタイミング
* プレハブがインポートされたとき（`PrefabManager.ImportPrefab`）。`type`にはプレハブの内容から判定した種類が設定されます。
* セットアップタブで「アップロードできます」と判定されたアバターに、コンポーネントが無かったとき。`type`には`VRChat`が設定されます。
* VRMアバターをVRChat用アバターに変換したとき。`type`には`VRM`が設定されます。セットアップタブでは、`type`が`VRM`のアバターに「視点位置の調整が必要な場合がある」旨を表示します。

:::note
v1.4.6時点では、一覧での表示状態（ピン留め・非表示）は`Assets/EAUploader/PrefabManager.json`で管理しており、`EAUploaderMeta.status`は使用していません。
:::

## 他ツールとの共存
* * *
### AAO: Avatar Optimizer
AvatarOptimizerは、アバターのコンポーネントがどのプロパティを参照・変更するかの情報をもとに最適化を行います。
EAUploaderは`Editor/Scripts/Coexistence/EAUploaderMetaInformationforAAO.cs`で、AvatarOptimizerのAPI（`ComponentInformation`）を使用して`EAUploaderMeta`の情報を登録しています。このコードは`HAS_AAO`が定義されている場合のみ有効になります。

ランタイムコンポーネントを追加・変更する場合は、AvatarOptimizerなどの非破壊ツールとの共存についても確認してください。
