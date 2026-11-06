---
title: '다국어 지원과 리소스'
description: 'EAUploader의 번역 파일, 도움말 메시지, EA Library 기사 사양'
---
# 개발에 관심이 있으신가요?
Project EAUploader는 개발 멤버를 항상 모집하고 있습니다!
이야기만 들어 보셔도 괜찮습니다!
꼭 프로젝트의 Discord 서버에 와 주세요.
[참여하기](https://discord.gg/yYFru7brra)
* * *
* * *
이 페이지에서는 EAUploader의 다국어 지원 구조와 도움말 메시지·EA Library 기사 작성 방법을 설명합니다.
번역에 협력해 주실 분도 꼭 읽어 주세요.

이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## 다국어 지원 구조
* * *
EAUploader에서는 **영어 문자열을 키**로 하여 각 언어의 문자열을 가져옵니다. 영어는 번역 파일이 없으며 키가 그대로 표시됩니다.

| 언어 | 언어 코드 | 번역 파일 |
| ---- | ---- | ---- |
| English | `en` | 없음(키를 그대로 표시) |
| 日本語 | `ja` | `Editor/Resources/Localization/ja.json` |
| 한국어 | `ko` | `Editor/Resources/Localization/ko.json` |

현재 언어는 `Assets/EAUploader/settings.json`의 `language`에 저장됩니다. 초기값은 `ja`입니다.

:::note
`ko.json`에는 `ja.json`보다 항목이 적어, 번역이 없는 문자열은 영어로 표시됩니다. 번역에 협력해 주실 분을 모집하고 있습니다.
:::

### 번역 파일 형식
번역 파일은 다음 형식의 JSON 파일입니다. `name`에는 언어 선택 드롭다운에 표시할 이름을 적습니다.

```json
{
  "name": "한국어",
  "items": [
    {
      "key": "Import",
      "value": "인포트"
    },
    {
      "key": "Version: ",
      "value": "버전:"
    }
  ]
}
```

* `key`가 중복되면 오류가 발생합니다.
* `value`에는 `string.Format` 서식(`{0}` 등)을 사용할 수 있습니다.

### UXML 문자열 번역하기
UXML에는 영어 문자열을 그대로 작성합니다.

```xml
<ui:Label text="Import Avatars" class="text-lg pb-2 font-bold" />
```

메인 창은 100ms마다 `LanguageUtility.Localization`을 실행하여 창 안의 모든 `TextElement`(`Label`, `Button` 등)의 `text`가 번역 파일의 `key`와 완전히 일치하면 `value`로 바꿉니다.
메인 창 이외의 창에서는 `CreateGUI` 등에서 `LanguageUtility.Localization(rootVisualElement)`를 호출하세요.

다음 요소는 번역되지 않습니다.

* USS 클래스 `no-translate`를 가진 요소. 아이템 이름이나 태그 등 사용자가 입력한 문자열에 붙이세요.
* 텍스트 입력란의 내용(레이블 부분은 번역됩니다).

### C# 문자열 번역하기
C#에서 문자열을 설정할 때는 `T7e.Get`을 사용합니다.

```csharp
var label = new Label(T7e.Get("Ready to upload"));

// 서식을 사용하는 경우
T7e.Get("Avatar bundle size is too large. The maximum size is {0} MB, but the current size is {1} MB", limit, fileSize);
```

해당하는 번역이 없으면 키가 그대로 반환됩니다.

`T7e`는 번역을 캐시합니다. `Resources/Localization/`의 파일이 다시 가져와지면 캐시가 지워지므로, 번역 파일을 편집하면 도메인 리로드 없이 반영됩니다.

## 언어 추가하기
* * *
새 언어를 추가하려면 다음 파일을 모두 준비하세요. 언어 코드(예: `zh-cn`)를 파일 이름·폴더 이름으로 사용합니다.

| 추가할 것 | 위치 |
| ---- | ---- |
| UI 번역 파일 | `Editor/Resources/Localization/{언어 코드}.json` |
| 도움말 메시지 | `Editor/Resources/Message/{언어 코드}/{메시지 번호}.txt` |
| EA Library 기사 | `Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/{언어 코드}/` |
| 뷰포인트 위치 에디터 번역 파일 | `Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization/{언어 코드}.json` |

:::caution
사용할 수 있는 언어는 `Editor/Resources/Localization`에 있는 JSON 파일로 자동 판정됩니다.
UI 번역 파일만 추가하고 다른 파일을 준비하지 않으면 도움말이나 뷰포인트 위치 에디터를 열 때 오류가 발생합니다.
:::

## 도움말 메시지
* * *
화면 곳곳의 '도움말' 버튼(`HelpButton`)을 누르면 도움말 메시지(`EAUploaderMessageWindow`)가 EAUploader 창 안의 모달로 표시됩니다.
메시지는 `Editor/Resources/Message/{언어 코드}/{메시지 번호}.txt`에서 현재 언어의 것을 불러옵니다.

UXML에서는 `msg-id`에 메시지 번호를 지정합니다.

```xml
<eau:HelpButton msg-id="100" class="pb-2" />
```

C#에서는 `EAUploaderMessageWindow.ShowMsg(100)`(공개 API에서는 `HelpButtonAPI.ShowMessage(100)`)로 표시할 수 있습니다.

### 사용 중인 메시지 번호
| 번호 | 표시 위치 |
| ---- | ---- |
| 100 | 인포트 창: 아바타를 인포트 |
| 101 | 인포트 창: VRM을 인포트 |
| 102 | 인포트 창: 쉐이더를 인포트 |
| 103 | 편집 화면: 편집 도구 |
| 104 | 편집 화면: 확장 기능 가져오기(현재 숨김) |
| 108 | 3D 미리보기 조작 설명 |
| 109 | 업로드: VRChat에서의 표시 |
| 113 | 업로드: 아바타 성능 |
| 114 | 업로드: 플랫폼 |
| 116 | 아바타 목록 |
| 117 | 업로드: Blueprint |
| 200 | VRM 변환 창 |
| 201 | 뷰포인트 위치 에디터 |
| 202 | 업로드: 아바타 최적화 |
| 203 | AvatarOptimizer 설치 안내 |

105, 107, 111, 112, 115 파일도 남아 있지만 v1.6.2 화면에서는 사용하지 않습니다.

새 메시지를 추가할 때는 사용하지 않는 번호를 사용하고 모든 언어 폴더에 파일을 추가하세요.

## 기사 서식
* * *
도움말 메시지와 EA Library 기사는 `ArticleRenderer`로 그려집니다. 기사는 다음 태그로 작성합니다.

| 태그 | 서식 | 내용 |
| ---- | ---- | ---- |
| `<t>` | `<t>제목</t>` | 제목을 표시합니다. |
| `<txt>` | `<txt>본문</txt>` | 본문을 표시합니다. Unity 리치 텍스트(`<size=16>`, `<color=red>`, `<b>`, `<i>`, `<u>` 등)를 사용할 수 있습니다. |
| `<image>` | `<image>파일 이름, 너비</image>` | 이미지를 표시합니다. 파일 이름은 기사 파일 기준 상대 경로입니다. 너비는 생략할 수 있습니다. |
| `<button>` | `<button>레이블, 스타일, URL</button>` | 누르면 URL을 여는 버튼을 표시합니다. 스타일에는 `Main`, `Sub`, `Link` 중 하나를 적습니다.(현재 구현에서는 스타일에 따른 표시 차이가 없습니다) |
| `<hr>` | `<hr>색, 여백</hr>` | 구분선을 표시합니다. 색에는 `black`이나 `#RRGGBB`를 지정할 수 있습니다. |
| `<section>` | `<section>이미지, 너비, 본문</section>` | 이미지와 본문을 나란히 표시합니다. 이미지 높이는 200px로 표시됩니다.(현재 구현에서는 너비 지정을 사용하지 않습니다) |

작성 예:

```
<t>셰이더 오류</t>
<txt>
<size=14>적용된 셰이더가 프로젝트 안에 없습니다.
필요한 셰이더를 배포처에서 확인하고 프로젝트에 가져오세요.</size>
</txt>
<button>Discord에 참여하기, Main, https://discord.gg/yYFru7brra</button>
```

:::caution
`<button>`과 `<section>`은 `,`로 항목을 구분하므로 레이블이나 본문에 `,`를 넣을 수 없습니다.
:::

## EA Library 기사
* * *
:::note
v1.6.0 이후 EA Library는 EAUploader 화면에 표시되지 않습니다. 기사 파일은 패키지에 남아 있습니다.
:::

EA Library 기사는 언어별로 다음 폴더에 저장합니다. 기사 하나당 폴더를 하나 만듭니다.

```
Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/
└── ko/
    ├── 001_tutorial1/
    │   ├── tutorial1.json   기사 정보
    │   ├── Content.txt      기사 본문
    │   ├── thumbnail.png    썸네일
    │   └── image1.png       본문에서 사용하는 이미지
    └── 002_tutorial2/
        └── ...
```

기사 정보는 다음 형식의 JSON 파일로 작성합니다. 폴더 안의 `.json` 파일을 기사 정보로 읽으므로 한 폴더에 `.json` 파일을 여러 개 두지 마세요.

```json
{
  "title": "소개",
  "date": "2023-12-07",
  "tags": ["튜토리얼"],
  "keywords": ["튜토리얼", "시작", "가이드", "소개", "사용법"],
  "contentFile": "Content.txt",
  "thumbnail": "thumbnail.png"
}
```

| 항목 | 내용 |
| ---- | ---- |
| `title` | 기사 제목. 목록에 표시됩니다. `\n`으로 줄을 바꿀 수 있습니다. |
| `date` | 기사 작성일 |
| `tags` | 태그. EA Library의 태그 필터에 사용됩니다. |
| `keywords` | 검색에 사용하는 키워드 |
| `contentFile` | 본문 파일 이름(JSON 파일 기준 상대 경로) |
| `thumbnail` | 썸네일 파일 이름(JSON 파일 기준 상대 경로) |

본문은 '기사 서식'으로 작성합니다.

:::note
현재 구현에서는 검색어가 **제목과 키워드 모두**에 포함된 기사만 검색 결과에 표시됩니다. 키워드에는 제목에 포함된 단어도 추가해 두는 것을 추천합니다.
:::
