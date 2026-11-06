---
title: 'VRM 아바타 사용하기'
description: 'VRM 아바타를 VRChat용으로 변환하여 업로드하는 방법'
---

## VRM이란
* * *
VRM은 아바타에 특화된 3D 모델 파일 형식의 하나입니다. 인간형 아바타 규격의 하나로, VRoid Studio 등으로 쉽게 만들 수 있습니다.
VRM 아바타는 [VRoid Hub](https://hub.vroid.com/) 등에서 구할 수 있으며, [VRoid Studio](https://vroid.com/studio)를 사용하면 게임 캐릭터를 만들듯이 쉽게 만들 수 있습니다.

VRM 그대로는 VRChat에 업로드할 수 없으므로 변환해야 합니다.
EAUploader에서는 **VRM Converter for VRChat**을 추가로 설치하면 VRM 아바타를 변환하여 업로드할 수 있습니다.

:::caution[지원하는 VRM 버전]
VRM은 **VRM 0.x**와 **VRM 1.x**의 사양이 크게 다릅니다.
VRM Converter for VRChat은 **VRM 0.x만 지원하며 VRM 1.x는 지원하지 않습니다.** 주의하세요.
:::

## VRM Converter for VRChat 설치하기
* * *
VRM Converter for VRChat을 VCC(또는 ALCOM)에서 프로젝트에 추가하거나, [배포 페이지](https://booth.pm/ja/items/1025226)에서 다운로드하여 가져오세요.
EAUploader에서 VRM을 다루려면 VRM Converter for VRChat과 VRM을 읽기 위한 패키지(UniVRM)가 모두 프로젝트에 설치되어 있어야 합니다.

설치가 끝나면 인포트 창의 <span style="color: #00b0f0">VRM을 인포트</span> 버튼을 누를 수 있게 됩니다.

:::note
설치해도 버튼을 누를 수 없으면 Unity 상단 메뉴의 'EAUploader' → 'Reload'를 실행하거나 Unity를 다시 시작하세요.
:::

## VRM 가져오기
* * *
아바타 목록의 <span style="color: #00b0f0">인포트</span>를 눌러 인포트 창을 열고, <span style="color: #00b0f0">VRM을 인포트</span> 버튼에서 `.vrm` 파일을 선택하세요.
아바타 목록에 `.vrm` 파일을 드래그 앤 드롭하여 가져올 수도 있습니다.

가져온 VRM은 프로젝트의 `Assets/VRM` 폴더에 프리팹으로 저장되고, 아바타 목록에도 추가됩니다. 가져오기가 끝나면 변환 창이 열립니다.

가져온 직후 '의상 · 액세서리 설정' 창이 표시될 수 있지만, VRM 아바타는 변환하면 자동으로 장르가 '아바타'가 됩니다.

:::caution
프로젝트의 `Assets` 폴더 안에 있는 `.vrm` 파일은 선택할 수 없습니다. 프로젝트 밖에 있는 파일을 선택하세요.
:::

## VRChat용 아바타로 변환하기
* * *
변환 창에서 각 항목을 설정하고 <span style="color: #00b0f0">변환</span> 버튼을 누르세요.

| 항목 | 설명 |
| ---- | ---- |
| 어깨 높이 | 어깨 높이를 조정할 수 있습니다. 변환한 아바타의 어깨가 처지거나 너무 올라가면 조정하세요. |
| Armature 높이 | Armature(아바타 골격)의 높이를 바꿉니다. |
| 메쉬를 결합 | 메시를 결합하여 변환합니다. 이를 통해 메시가 최적화됩니다. |
| 쉐이프키 키의 법선과 접선을 사용 | 셰이프 키(표정 등)의 법선과 접선 정보를 사용합니다. |
| Osc Components | 변환할 때 추가할 OSC 관련 컴포넌트를 고릅니다. |
| 흔들림(PC용 설정) | VRM의 흔들리는 오브젝트(SpringBone)를 VRChat용으로 변환하는 방법을 고릅니다. |
| 흔들림 매개변수를 유지합니다(PC용 설정) | VRM 흔들림 오브젝트의 매개변수를 변환 후에도 유지합니다. |
| Quest용(Quest용 설정) | Quest용 아바타로 설정합니다. |

각 항목의 자세한 내용은 VRM Converter for VRChat의 설명도 함께 확인하세요.

### 변환 창 다시 열기
아직 변환하지 않은 VRM 아바타는 아바타 목록에 '변환이 필요합니다'로 표시됩니다. 카드를 클릭하여 편집 화면을 열고, 왼쪽에 표시되는 <span style="color: #00b0f0">VRChat 아바타로 변환</span> 버튼으로 변환 창을 열 수 있습니다.

같은 아바타를 다시 변환해도 이미 업로드한 아바타의 Blueprint ID는 이어집니다.

## 시점 위치 설정하기
* * *
:::caution
변환한 VRM 아바타는 시점 위치를 설정해야 합니다.
:::

편집 화면을 열고 편집 도구에서 <span style="color: #00b0f0">뷰포인트 위치 에디터</span>를 열어 시점을 조정하세요.
사용 방법은 '[편집 도구](/ko/guides/edit_tools/#뷰포인트-위치-에디터)'를 참조하세요.

## 업로드하기
* * *
변환과 시점 위치 설정이 끝나면 일반 아바타와 같은 방법으로 업로드할 수 있습니다. '[아바타 업로드](/ko/guides/upload/)'를 참조하세요.

VRM 아바타에 사용된 셰이더(MToon 등)는 Android(Quest)를 지원하지 않을 수 있습니다. Quest(Android)용으로도 업로드한다면 변환할 때 'Quest용'을 켜세요.
