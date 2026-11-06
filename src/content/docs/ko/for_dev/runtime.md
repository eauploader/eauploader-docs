---
title: 'Runtime'
description: 'EAUploader의 런타임에 대해'
---
# 개발에 관심이 있으신가요?
Project EAUploader는 개발 멤버를 항상 모집하고 있습니다!
이야기만 들어 보셔도 괜찮습니다!
꼭 프로젝트의 Discord 서버에 와 주세요.
[참여하기](https://discord.gg/yYFru7brra)
* * *
* * *
이 페이지에서는 `Runtime` 폴더에 있는 `EAUploader` 어셈블리를 설명합니다.

이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## 개요
* * *
`EAUploader` 어셈블리에는 아바타(프리팹)에 붙이는 컴포넌트가 들어 있습니다.
컴포넌트는 씬이나 프리팹에 저장되므로 에디터 전용인 `EAUploader.Editor` 어셈블리와 분리하여 모든 플랫폼용 어셈블리로 정의합니다.

| 파일 | 클래스 | 내용 |
| ---- | ---- | ---- |
| `Runtime/Components/AvatarTagComponent.cs` | `EAUploader.Components.AvatarTagComponent` | 아바타에 붙이는 컴포넌트의 기본 클래스 |
| `Runtime/Components/EAUploaderMeta.cs` | `EAUploader.Components.EAUploaderMeta` | EAUploader가 프리팹을 관리하기 위한 정보 |
| `Runtime/Components/EAUploaderOutfit.cs` | `EAUploader.Components.EAUploaderOutfit` | 옷 갈아입히기(대응 의상)로 입힌 의상의 정보 |

## AvatarTagComponent
* * *
EAUploader가 아바타에 붙이는 컴포넌트의 추상 기본 클래스입니다. [Modular Avatar](https://github.com/bdunderscore/modular-avatar)의 `AvatarTagComponent`를 바탕으로 합니다(MIT License).

* VRChat SDK - Avatars가 설치된 경우(`VRC_SDK3A`가 정의된 경우) `VRC.SDKBase.IEditorOnly`를 구현합니다. 이로써 컴포넌트는 VRChat SDK의 허용 목록 검사 대상에서 제외되며, 업로드용 빌드에서는 아바타에서 제거됩니다.
* `[ExecuteAlways]`, `[DefaultExecutionOrder(-9990)]`이 붙어 있습니다.

## EAUploaderMeta
* * *
EAUploader가 관리용 Prefab Variant의 루트에 붙이는 컴포넌트입니다. `[DisallowMultipleComponent]`이므로 하나의 프리팹에 하나만 붙습니다.

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

| 필드 | 내용 |
| ---- | ---- |
| `status` | 목록 표시 상태. `Show`(표시), `Hidden`(숨김), `Pinned`(고정) |
| `type` | 프리팹 종류. 컴포넌트로 판정합니다(`VRC_AvatarDescriptor` → `VRChat`, `VRMMeta` → `VRM`, 그 외 → `Other`) |
| `genre` | 사용자용 분류. `Avatar`, `Cloth`, `Accessory`, `Other` |
| `lastModifiedTicks` | EAUploader가 가져오기·업데이트한 시각(UTC Ticks). `0`이면 파일 타임스탬프를 사용 |
| `genreConfirmed` | 가져올 때 장르가 확정되었는지 |
| `memo` | 메모 |
| `tags` | 아이템에 붙인 태그 |

`EAUploaderMeta`는 관리용 Prefab(`Assets/EAUploader/Prefabs/` 아래)의 루트에만 붙으며, 루트의 것만 읽힙니다.

:::note
v1.4 이전과 비교해 `PrefabStatus`의 순서가 바뀌었고 `Other`가 삭제되었습니다. 이전 버전에서 원본 Prefab에 붙어 있던 `EAUploaderMeta`는 시작 시 이전 처리로 관리용 Prefab Variant로 옮겨집니다.
:::

## EAUploaderOutfit
* * *
옷 갈아입히기(대응 의상)로 아바타에 입힌 의상의 루트에 붙는 컴포넌트입니다.

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

| 필드 | 내용 |
| ---- | ---- |
| `sourcePrefabGuid` | 입힌 의상(관리용 Prefab)의 GUID |
| `mode` | 의상 설정 방법. `ModularAvatar`(Modular Avatar로 본 통합), `BoneMerge`(업로드 시 EAUploader가 본 통합), `AttachToBone`(본에 부착) |

`BoneMerge` 의상은 VRChat SDK의 빌드 전처리(`OutfitBuildHook`, `IVRCSDKPreprocessAvatarCallback`, order −12000, NDMF보다 앞)에서 업로드되는 복사본 안에서만 아바타의 본에 통합됩니다.

## 다른 도구와의 공존
* * *
### AAO: Avatar Optimizer
AvatarOptimizer는 아바타의 컴포넌트가 어떤 속성을 참조·변경하는지에 대한 정보를 바탕으로 최적화합니다.
EAUploader는 `Editor/Scripts/Coexistence/`에서 AvatarOptimizer의 API(`ComponentInformation`)를 사용해 `EAUploaderMeta`와 `EAUploaderOutfit`의 정보를 등록합니다. 이 코드는 `HAS_AAO`가 정의된 경우에만 활성화됩니다.

런타임 컴포넌트를 추가·변경할 때는 AvatarOptimizer 같은 비파괴 도구와의 공존도 확인하세요.
