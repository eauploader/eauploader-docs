---
title: 'EAUploader 업데이트와 삭제'
description: 'EAUploader를 업데이트하는 방법과 프로젝트에서 삭제하는 방법'
---

## EAUploader 업데이트하기
* * *
EAUploader는 VCC(또는 ALCOM)에서 업데이트할 수 있습니다.

1. VCC의 프로젝트 목록에서 EAUploader를 설치한 프로젝트의 <span style="color: #00b0f0">Manage Project</span>를 엽니다.
2. Manage Packages에서 **Easy Avatar Uploader for VRChat**을 찾습니다.
3. 새 버전이 있으면 업데이트 버튼(↑)을 누르거나 버전 목록에서 최신 버전을 선택하세요.

업데이트한 후 Unity에서 프로젝트를 여세요.

:::note
오래된 버전에서 업데이트한 경우 처음 시작할 때 아이템을 새로운 관리 방식(Prefab Variant)으로 이전할지 확인하는 메시지가 표시됩니다. 자세한 내용은 '[아바타 가져오기와 관리](/ko/guides/import/#eauploader의-아이템-관리)'를 참조하세요.
:::

:::caution
업데이트하기 전에 프로젝트를 백업하세요. 백업 방법은 '[처음 사용하는 분을 위한 가이드](/ko/guides/getting_started/#백업-방법)'를 참조하세요.
:::

현재 설치된 EAUploader의 버전은 아바타 목록의 '설정'에서 확인할 수 있습니다.
업데이트 내용은 [GitHub 릴리스 페이지](https://github.com/eauploader/EAUploader-for-VRChat/releases)와 공식 Discord 서버에서 공지합니다.

## 프로젝트에서 EAUploader 삭제하기
* * *
VCC의 Manage Packages에서 **Easy Avatar Uploader for VRChat**의 ⊖ 버튼을 누르면 프로젝트에서 EAUploader를 삭제할 수 있습니다.

EAUploader를 삭제해도 아바타나 셰이더 등의 데이터는 삭제되지 않습니다. 일반 Unity 에디터로 계속 프로젝트를 사용할 수 있습니다.

### EAUploader가 만드는 파일
EAUploader는 프로젝트 안에 다음 파일과 폴더를 만듭니다.

| 위치 | 내용 |
| ---- | ---- |
| `Assets/EAUploader/Prefabs/` | EAUploader가 관리하는 아이템(관리용 복사본)과 편집 도구로 만든 텍스처·머티리얼 |
| `Assets/EAUploader/PrefabPreviews/` | 목록에 표시할 미리보기 이미지 |
| `Assets/EAUploader/settings.json` | 언어 등의 설정 |
| `Assets/EAUploader/tags.json` | 태그와 태그 그룹 |
| `Assets/EAUploader/EditorsManage.json` | 등록된 편집 도구의 정보 |
| `Assets/EAUploader/PrefabManager.json` | 이전 버전과의 호환용 파일 |
| `EAUploaderLog/`(프로젝트 폴더 바로 아래) | 로그 파일 |
| `Assets/VRM/` | VRM에서 가져온 아바타(VRM을 사용한 경우만) |

:::danger
`Assets/EAUploader/Prefabs/`에는 EAUploader에서 이름을 바꾸거나 편집 도구로 개변한 아바타가 저장되어 있습니다. EAUploader를 삭제한 후에도 이 아바타들을 사용하려면 삭제하지 마세요.
또한 `Assets/VRM/`에는 가져온 VRM 아바타 자체가 저장되어 있습니다. VRM 아바타를 사용 중이라면 삭제하지 마세요.
:::

### Missing Script로 표시되는 경우
EAUploader는 아이템을 관리하기 위해 관리용 복사본에 'EAUploaderMeta'라는 컴포넌트를 추가합니다. 옷 갈아입히기(대응 의상)로 입힌 의상에는 'EAUploaderOutfit'이라는 컴포넌트가 추가됩니다.
EAUploader를 삭제한 후 이 컴포넌트들이 'Missing Script'로 표시될 수 있습니다. 이 컴포넌트들은 업로드할 때 제거되며 아바타의 모습에는 영향을 주지 않습니다. 필요 없으면 Inspector에서 삭제하세요.

:::caution
Modular Avatar 없이 옷 갈아입히기(대응 의상)로 입힌 의상은 EAUploader가 업로드할 때 아바타의 본에 통합합니다. EAUploader를 삭제하면 이 통합이 이루어지지 않으므로 의상이 올바르게 표시되지 않습니다.
:::

## 문제가 발생한 경우
* * *
EAUploader에 문제가 발생하면 먼저 EAUploader를 다시 시작해 보세요. 그래도 해결되지 않으면 VCC에서 EAUploader를 프로젝트에서 한 번 삭제한 후 다시 추가하세요.

자세한 내용은 '[자주 묻는 질문과 문제 해결](/ko/faq/troubleshooting/)'을 참조하세요.
