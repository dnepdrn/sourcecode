#자산관리 공통개발v1.3
본 문서는 공통개발 사용법을 정의하고자 제작되었으며, 공통화면구현 및 공통기능개발, 랜더링 향상, co-work 향상 등이 가능하며, 공통부분이지만 동적으로 커스텀 해야 할 부분끼지 기능개발이 되어있습니다.

##사용법
본 소스는 js디렉토리 내 components.js, layout.js, controller.js로 3가지 자바스크립트 파일로 구성되어 있습니다. 기본형 HTML template을 제공합니다.

##HTML
기본형 HTML template는 다음과 같습니다. 예) index.html
```html
<html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width" initial-scale="1.0">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <!-- 로컬이 아닌 dev web-page 또는 ftp(sftp)를 활용한 개발일 경우 루트상대경로로 ./나 ../가 /로 변경가능합니다. -->
        <link rel="stylesheet" href="./css/default.css"/>  
        <link rel="stylesheet" href="./css/main.css"/>
        <script src="./js/components.js"></script>
        <script src="./js/layout.js"></script>
        <script src="./js/controller.js"></script>
        <script src="./js/main.js"></script>
        <title>page-title</title>
    </head>
    <body>
        <div class="main-basic">
            <div>html 내용이 들어가는 부분입니다.</div>
        </div>
    </body>
</html>
```
meta tag, link tag 또는 script tag는 추가하여 사용가능합니다.\
공통을 제외한 커스텀 페이지 작업은 body > div.main-basic 안에서 작업이 가능합니다.\
기타 공통사항은 아래 스크립트를 활용하여 구현이 가능합니다.


##components.js
components.js 는 필요한 이미지, 아이콘, UI 등 필요한 element를 생성합니다.\
UI구성은 다음과 같습니다.
```javascript
UI.headerMainType()      // 메인타입 공통헤더
UI.bodyTop()             // 상단영역 공통바디
UI.bodyBottom()          // 바텀영역 공통바디
UI.footerButtonType()    // 버튼타입 공통푸터
```

아이콘 구성은 다음과 같습니다.
```javascript
ICON.back()     // 뒤로가기 
ICON.home()     // 홈
ICON.menu()     // 메뉴
```

배너 구성은 다음과 같습니다.
```javascript
BANNER.type1()     // "나의 금융자산은 얼마나 될까" 배너
```

##layout.js
layout.js 는 components.js에서 생성된 element를 배치 및 content를 수정합니다.\
함수는 다음과 같습니다.
```javascript
// LAYOUT.function(where, target)    * where요소에 target을 끼워넣는다.
LAYOUT.prepend(where, target)        // where 내부 맨 앞에 끼워넣기
LAYOUT.append(where, target)         // where 내부 맨 뒤에 끼워넣기
LAYOUT.after(where, target)          // where 뒤에 끼워넣기
LAYOUT.before(where, target)         // where 앞에 끼워넣기

// LAYOUT.function(target, content)  * target요소에 content내용을 넣는다.
LAYOUT.innerHTML(target, content)    // target안에 HTML 넣기
LAYOUT.innerText(target, content)    // target안에 text 넣기
```
layout.js는 async await 기능을 활용하여 우선 렌더링 구분을 하였으며 이에 따른 controller 함수를 뒤따르도록 하였습니다. 공통 레이아웃 이후 들어가야할 커스텀 레이아웃도 async await 처리를 하였습니다.

##controller.js
controller.js는 components.js에서 생성된 element가 layout.js에 의해 배치 및 content 수정 후 기능적인 부분이 추가되거나 공통 함수가 추가되었습니다.

## Version Control
v1.3 - laout.js async await기능 추가 및 이에따른 controller.js가 동기화되도록 수정(20.6.8)\
v1.0 - 베타버전 코드 커밋(20.6.5)

## License
[이용우](https://github.com/dnepdrn/sourcecode)