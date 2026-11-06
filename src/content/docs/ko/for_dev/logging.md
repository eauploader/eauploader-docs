---
title: '로그 출력 기능 사양서'
description: 'EAUploader의 로그 출력 기능 사양서'
---
# 개발에 관심이 있으신가요?
Project EAUploader는 개발 멤버를 항상 모집하고 있습니다!
이야기만 들어 보셔도 괜찮습니다!
꼭 프로젝트의 Discord 서버에 와 주세요.
[참여하기](https://discord.gg/yYFru7brra)
* * *
* * *
# 개요
* * *
이 로그 출력 기능은 EAUploader의 일련의 내부 동작을 로그 파일로 출력하여 개발자가 쉽게 볼 수 있는 기능을 제공한다. 이 기능은 개발자가 더 빠르게 버그를 분석할 수 있도록 제공한다.

이 기능은 `EAUploader.UI.Windows.Logger`(`Editor/Resources/UI/Windows/Logger.cs`)에 구현되어 있다. 이 문서는 EAUploader v1.6.2의 내용을 기준으로 한다.

# 용어
* * *
1. 로그 파일 GUID: 로그 파일마다 EAUploader가 할당하는 GUID를 가리킨다. 개발자가 전송된 로그 파일을 식별하는 데 사용한다.
2. EAU 로그: 로그 종류가 EAU인 로그를 가리킨다.
3. EAU 로그 출력 메서드: EAU 로그를 출력할 때 사용하는 메서드를 가리킨다.

이 기능은 다음 기능을 제공한다.

# 로그 출력 기능
* * *
## 로그 출력 기능의 시작과 종료 시점

EAUploader가 실행 중인 동안 항상 로그를 출력한다.

## 로그 출력 범위

Unity Console에 출력되는 로그를 모두 로그 파일에 출력한다. 또한 EAU 로그 출력 메서드가 호출된 경우에도 로그를 출력한다.

## 로그 파일 형식과 저장 위치

이 기능이 출력하는 로그 파일은 Unity 프로젝트 폴더 바로 아래의 `EAUploaderLog` 폴더에 모두 저장한다.

`EAUploaderLog` 폴더에 보관하는 로그 파일 용량은 100MB까지로 한다. 로그 파일 용량이 100MB를 넘은 상태에서 로그를 추가하려고 하면 가장 오래된 로그 파일부터 삭제한다.

※구현에서는 로그를 추가할 때마다 폴더 안의 `*.log` 파일 합계 용량을 확인하고, 100MB를 넘으면 생성 시각이 가장 오래된 로그 파일을 하나 삭제한다. 추가할 때마다 판정하므로 결과적으로 용량이 100MB 아래가 될 때까지 오래된 로그 파일부터 삭제된다.

로그 파일 출력 단위는 EAUploader 시작부터 EAUploader 종료까지이다. 로그 파일 이름 형식은 `YYYY-MM-DD-1.log`로 한다. YYYY-MM-DD는 로그 파일이 생성된 날짜(UTC), -[number]는 같은 날 EAUploader가 시작된 횟수를 나타낸다. 2024-04-22-3.log라는 로그 파일은 2024년 4월 22일 EAUploader 세 번째 시작 때 출력된 로그 파일임을 나타낸다.

※구현에서는 같은 날의 로그 파일 중 존재하지 않는 가장 작은 번호를 사용한다. 또한 EAUploader의 시작이란 Unity 시작 시와 스크립트 재컴파일(도메인 리로드) 시를 가리킨다.

## EAUploader 시작 시 출력하는 로그

EAUploader 시작 시에는 환경 정보와 날짜(UTC), 로그 파일 GUID를 출력한다. 출력하는 내용은 다음과 같다.

```
EAUploader is starting...
*** Environment Details ***
Date: 2024-04-22
Log GUID: 0123456789abcdef0123456789abcdef
Application-Version: 1.6.2
Unity-Version: 2022.3.22f1
Editor-Platform: WindowsEditor
Vpm-Dependency: 
com.vrchat.avatars@3.7.0
com.vrchat.base@3.7.0
...
*** Environment Details ***
```

Vpm-Dependency에는 `Packages/vpm-manifest.json`의 `locked`에 적힌 패키지와 버전을 출력한다.

## 로그 출력 형식

로그는 다음 형식으로 출력한다.

> 02:42:42.345 [LOG_TYPE] [LOG_MESSAGE] [LOG_TRACELOG]

각 항목은 반각 공백으로 구분하며 `[ ]`는 출력하지 않는다.

1. 타임스탬프
   1. hh:mm:ss.fff 형식으로 로그가 출력된 시각(UTC)을 출력한다.
2. LOG_TYPE
   1. 로그 종류를 나타낸다. 종류는 다음과 같다.
      1. LOG: 일반 로그. 일반적인 로그 레벨.
      2. WNG: 경고 로그.
      3. ERR: 오류 로그.
      4. EXP: Exception 로그.
      5. AST: Assert 로그.
      6. EAU: EAU 로그.
      7. OTHER: 그 외의 로그.
3. LOG_MESSAGE
   1. 로그 메시지 본문.
4. LOG_TRACELOG
   1. 로그 출력 위치. ERR, EXP의 경우 트레이스 로그를 표시한다.
   2. ERR, EXP의 경우 트레이스 로그 전체를 출력한다. 두 번째 줄부터는 읽기 쉽도록 타임스탬프 등의 길이만큼 들여쓴다.
   3. EAU의 경우 트레이스 로그의 세 번째 줄(EAU 로그 출력 메서드를 호출한 곳)을 출력한다.
   4. 그 외의 경우 트레이스 로그의 두 번째 줄(로그를 호출한 곳)을 출력한다.

## EAU 로그 출력 메서드

EAU 로그 출력 메서드를 호출하면 EAU 로그를 출력한다. EAU 로그는 EAUploader의 조작을 로그 파일에 기록하고 싶을 때 사용한다.

EAU 로그 출력 메서드는 `EAUploader.UI.Windows.Logger.writeEAULog`이다.

```csharp
using EAULogger = EAUploader.UI.Windows.Logger;

EAULogger.writeEAULog("Selected setup tab.");
```

이 메서드는 메시지 앞에 EAU 로그임을 나타내는 식별자를 붙여 `Debug.Log`를 호출한다. 로그 출력 처리는 식별자로 EAU 로그를 판별하고, 로그 파일에는 식별자를 제거한 메시지를 출력한다.

# 오류 보고 화면
* * *
로그 종류가 ERR 또는 EXP인 로그를 받았고 설정 파일의 `showErrorReportWindow`가 활성화되어 있으면 오류 보고 화면을 표시한다. 오류 보고 화면은 EAUploader 메인 창 안의 모달로 표시한다.

오류 보고 화면에는 다음 내용을 표시한다.

1. EAUploader 시작 후 발생한 오류 로그(일시, 메시지, 트레이스 로그)
2. 환경 정보(EAUploader 버전, Unity 버전, 플랫폼, VPM 패키지 목록)

UI Toolkit의 텍스트 렌더링을 안정시키기 위해 보관하는 오류 로그는 20만 자까지, 화면에 표시하는 내용은 최신 4만 자까지로 한다. 표시를 생략한 경우에는 그 사실을 표시한다.
오류 보고를 표시하는 도중 발생한 오류에서는 오류 보고 화면을 다시 표시하지 않는다(재귀 방지).

오류 보고 화면에는 다음 항목을 배치한다.

1. '이 창을 다시 표시하지 않기': 체크하면 `showErrorReportWindow`를 비활성화한다. 아바타 목록 '설정'의 '오류 보고 창 표시'에서 다시 활성화할 수 있다.
2. 다시 시작: `Packages/tech.uslog.eauploader`를 다시 가져와 EAUploader를 다시 시작한다.
3. 복사: 오류 보고 내용을 클립보드에 복사한다.
4. OK: 오류 보고 화면을 닫는다.

또한 오류 보고 화면은 EAUploader 이외에서 출력한 오류 로그에도 표시한다. 동작 확인에는 메뉴의 'Window' → 'Error Report'(테스트용 오류 로그를 출력)를 사용할 수 있다.

# 로그 보고서 표시 기능
* * *
사용자는 아바타 목록 '설정'에 표시한 '로그 보고서 열기' 버튼으로 로그 파일 저장 폴더(`EAUploaderLog`)를 열 수 있다.

'로그 보고서 열기' 버튼을 누르면 로그 파일이 저장된 폴더를 열었다는 대화상자를 표시하고, 로그 파일 저장 폴더를 OS의 파일 브라우저로 연다.

# 로그 보고서 전송 기능(중단됨)
* * *
**현재 전송할 수 없습니다.** 다음은 전송 기능의 사양이다.

## 전송 기능 시작 시점

~사용자는 첫 화면에 표시한 '로그 보고서 표시' 버튼으로 개발자에게 로그 파일을 보낼 수 있다.~

## 전송 기능 화면 전환

'로그 보고서 표시' 버튼을 누른 후 사용자에게 로그 파일을 정말 보낼지 확인하는 대화상자를 표시한다.

사용자가 대화상자에서 보낸다는 버튼을 누르면 로그 파일 전송 처리를 실행한다. × 버튼으로 대화상자를 닫으면 로그 파일 전송 처리를 실행하지 않고 첫 화면으로 돌아간다.

로그 파일 전송 처리가 성공하면 사용자에게 전송 완료 메시지와 로그 파일 GUID를 표시한다.
로그 파일 전송 처리가 실패하면 사용자에게 전송에 실패했다는 메시지를 표시한다.
