---
title: '소개'
description: 'EAUploader 문서에 대해'
---

## 이 문서에 대해
이 문서에서는 EAUploader의 사용 방법과 EAUploader에 대응하는 도구를 만드는 방법을 설명합니다.

이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## EAUploader란?
EAUploader(Easy Avatar Uploader for VRChat)는 VRChat에 아바타를 '쉽게' 업로드할 수 있도록 Unity를 간단하게 만들어 주는 도구입니다.
Unity의 확장 에디터로 동작하며, 아바타와 의상의 관리부터 간단한 개변, 업로드까지 하나의 창에서 할 수 있습니다.

### 이 도구로 할 수 있는 것
* **아바타·의상 관리** ― `.prefab`이나 `.unitypackage`로 배포되는 아바타, 의상, 액세서리를 가져와 미리보기 이미지가 있는 카드로 목록에 표시합니다. 태그, 메모, 고정으로 정리할 수 있습니다.
* **원본 데이터를 손상시키지 않는 관리** ― 가져온 아바타를 직접 변경하지 않고, EAUploader 전용 복사본(Prefab Variant)을 만들어 관리합니다.
* **셰이더 확인** ― 아바타에 필요한 셰이더가 부족한 경우 알려 줍니다.
* **간단한 개변** ― 기본 편집 도구로 시점 위치 설정, 셰이프 키(체형·표정) 조정, 텍스처 색상 변경, 대응 의상 갈아입히기를 할 수 있습니다.
* **VRM 아바타 변환** ― 별도 도구 'VRM Converter for VRChat'을 설치하면 VRM(0.x) 아바타를 VRChat용으로 변환할 수 있습니다.
* **아바타 최적화** ― 별도 도구 'AvatarOptimizer'를 설치하면 업로드할 때 자동으로 최적화할 수 있습니다.
* **아바타 업로드** ― 이름, 공개 설정, 썸네일을 설정하여 VRChat에 업로드할 수 있습니다. PC용뿐만 아니라 Quest(Android)용, iOS용으로도 한 번에 업로드할 수 있습니다.

### 이 도구로 할 수 없는 것
EAUploader는 이미 VRChat용으로 만들어져 완성된 아바타 또는 VRM을 대상으로 합니다.
기본 편집 도구로는 해당 아바타용으로 만들어진 의상(대응 의상) 갈아입히기나 색상·체형 조정 같은 간단한 개변을 할 수 있지만, 비대응 의상 갈아입히기나 기믹 도입 같은 본격적인 개변은 할 수 없습니다. 이 경우에는 일반 Unity 에디터를 사용하거나 EAUploader에 대응하는 확장 기능을 설치하세요.

## 동작 환경
| 항목 | 내용 |
| ---- | ---- |
| Unity | 2022.3 |
| VRChat SDK (Avatars) | 3.7.0 이상 |
| 프로젝트 관리 소프트웨어 | VRChat Creator Companion(VCC) 또는 ALCOM |

### 연계할 수 있는 도구(선택)
| 도구 | 설치하면 사용할 수 있는 기능 |
| ---- | ---- |
| [VRM Converter for VRChat](https://booth.pm/ja/items/1025226) | VRM(0.x) 아바타 가져오기와 변환 |
| [AAO: Avatar Optimizer](https://booth.pm/ja/items/4885109) | 업로드 시 자동 최적화 |
| [Modular Avatar](https://modular-avatar.nadena.dev/) | 옷 갈아입히기(대응 의상)에서 아바타의 본 구조를 바꾸지 않고 의상을 설정 |

## 문서 구성
| 카테고리 | 내용 |
| ---- | ---- |
| 가이드 | EAUploader 설치 방법과 각 화면의 사용 방법을 설명합니다. 처음 사용하는 분은 '[처음 사용하는 분을 위한 가이드](/ko/guides/getting_started/)'부터 읽어 주세요. |
| F&Q | 자주 묻는 질문과 오류 해결 방법을 정리했습니다. |
| 도구 제작자용 | EAUploader에 대응하는 확장 기능(플러그인)을 만드는 방법을 설명합니다. |
| 개발자용 | EAUploader 본체 개발에 참여하는 분을 위한 자료입니다. |
| API 레퍼런스 | EAUploader가 공개하는 API 목록입니다. |

## 편집 제안하기
이 문서에 개선, 추가, 삭제가 필요한 부분이 있다면 각 페이지 왼쪽 아래의 '페이지 편집'에서 GitHub로 수정하여 제안해 주세요.
