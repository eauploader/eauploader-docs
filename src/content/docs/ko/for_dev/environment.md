---
title: '환경 구성'
description: 'EAUploader 개발 환경 구성 방법'
---
# 개발에 관심이 있으신가요?
Project EAUploader는 개발 멤버를 항상 모집하고 있습니다!
이야기만 들어 보셔도 괜찮습니다!
꼭 프로젝트의 Discord 서버에 와 주세요.
[참여하기](https://discord.gg/yYFru7brra)
* * *
* * *
이 페이지·카테고리는 'EAUploader' 개발에 관한 문서입니다.
EAUploader에 대응하는 도구 제작에 관한 레퍼런스는 '도구 제작자용' 카테고리를 확인하세요.
* * *
## 필요한 것
* Unity 2022.3(VRChat이 권장하는 버전)
* VRChat Creator Companion(VCC) 또는 ALCOM
* Git

EAUploader는 VRChat SDK - Avatars 3.7.0 이상에 의존합니다. VCC로 만든 아바타 프로젝트에는 자동으로 추가되어 있습니다.

## 개발 환경 구성
다음 방법으로 개발 환경을 구성할 수 있습니다.

1. VCC(VRChat Creator Companion)에서 빈 Avatar 프로젝트를 만듭니다.
   * 주의! 이미 일반 사용자용 방법으로 EAUploader를 VCC에 설치한 경우, Manage Packages에서 Easy Avatar Uploader for VRChat이 **Not Installed**인지 확인하세요.
2. 만든 Unity 프로젝트 안의 `Packages` 폴더 아래에 `tech.uslog.eauploader`라는 이름의 폴더를 만드세요.
3. 앞 단계에서 만든 폴더에서 다음 명령을 입력하세요.
   * `git clone https://github.com/eauploader/EAUploader-for-VRChat.git .`
   * 주의! 점(.)을 잊지 마세요. 점을 빠뜨리면 `tech.uslog.eauploader` 폴더 아래에 폴더가 하나 더 만들어져 EAUploader가 제대로 동작하지 않습니다.
4. Unity 프로젝트를 다시 시작하고, EAUploader 창이 자동으로 표시되면 개발 환경 구성이 완료된 것입니다.

Unity 확장 개발에는 특별한 빌드 절차가 필요하지 않습니다. 소스 코드를 바꾸면 Unity가 자동으로 빌드합니다. Unity 에디터 확장의 세계에 오신 것을 환영합니다!

:::caution
EAUploader는 내부에서 `Packages/tech.uslog.eauploader` 경로를 직접 참조합니다. 폴더 이름은 반드시 `tech.uslog.eauploader`로 하세요.
:::

## 연계 기능을 개발·확인하는 경우
VRM Converter for VRChat, AvatarOptimizer, Modular Avatar와의 연계 기능은 각 패키지가 프로젝트에 설치되어 있을 때만 활성화됩니다.
이 기능들을 개발·확인하려면 VCC 등에서 대상 패키지를 프로젝트에 추가하세요.

| 연계 대상 | 패키지 이름 | 활성화 조건 | 심볼 |
| ---- | ---- | ---- | ---- |
| VRM Converter for VRChat | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0 이상 | `HAS_VRM` |
| AAO: Avatar Optimizer | `com.anatawa12.avatar-optimizer` | 1.7.0 이상 | `HAS_AAO` |
| Modular Avatar | `nadena.dev.modular-avatar` | 1.9.0 이상 | `HAS_MA` |

심볼은 `EAUploader.Editor.asmdef`의 Version Defines에 정의되어 있으며, `#if HAS_VRM`처럼 조건부 컴파일에 사용합니다.
또한 실행 시 판정(`EAUploaderCore.HasVRM`, `EAUploaderCore.HasAAO`, `EAUploaderCore.HasMA`)은 `Packages/packages-lock.json`의 내용을 바탕으로 합니다. VRM 판정에는 VRM Converter for VRChat 외에 UniVRM(`com.vrmc.univrm`)도 필요합니다.

## 동작 확인 포인트
* EAUploader의 초기화 처리는 Unity 시작 시나 스크립트 재컴파일 후에 실행됩니다. 초기화 처리를 다시 실행하려면 메뉴의 'EAUploader' → 'Reload'를 사용하세요.
* Unity Console에 출력된 로그는 프로젝트 폴더 바로 아래의 `EAUploaderLog` 폴더에도 출력됩니다. 자세한 내용은 '[로그 출력 기능 사양서](/ko/for_dev/logging/)'를 참조하세요.
* 메뉴의 'Window' → 'Error Report'를 실행하면 테스트용 오류 로그를 출력하여 오류 보고 표시를 확인할 수 있습니다.

## 저장소의 사양서
EAUploader 저장소의 `Docs/` 폴더에는 영어로 작성된 사양서(Architecture.md, PrefabManagement.md, UI.md, Upload.md, EditTools.md, PluginAPI.md, Conventions.md)가 있습니다. 동작을 바꿀 때는 같은 변경에서 해당 사양서도 업데이트하세요.

코딩 규약(`Docs/Conventions.md`)의 주요 내용은 다음과 같습니다.

* Unity 2022.3이므로 C# 9로 컴파일됩니다. 파일 범위 네임스페이스 등 C# 10 이후의 기능은 사용하지 마세요.
* 공개 형식은 파일 하나에 하나만 둡니다.
* Unity 오브젝트의 null 검사에 `?.`, `??` 등을 사용하지 마세요(파괴된 오브젝트 판정이 올바르게 되지 않기 때문입니다).
* UI 문자열은 영어로 작성하고 `ja.json`, `ko.json`에 번역을 추가합니다. 사용자가 입력한 문자열(이름, 태그)에는 USS 클래스 `no-translate`를 붙입니다.
* 사용자가 가져온 원본 Prefab은 변경하지 않고 관리용 Prefab Variant를 편집합니다. 생성한 에셋은 아이템 폴더에 저장합니다.

## 기여하기
프로젝트에 참여하는 방법은 두 가지가 있습니다.

* [Discord](https://discord.gg/yYFru7brra)에 참여하여 GitHub 조직(eauploader)의 멤버로 상의하면서 작업을 맡기
* 프로젝트를 포크하여 수정이나 기능 추가의 풀 리퀘스트 보내기(사전 선언 불필요)

어느 쪽이든 괜찮습니다. 단, 작업을 시작하기 전에 프로젝트 일정과 진행 중인 작업을 [여기](https://github.com/orgs/eauploader/projects/1)에서 확인하는 것을 잊지 마세요.
