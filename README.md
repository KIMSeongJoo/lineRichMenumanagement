# Line-Richmenu Management System

라인 공식 아카운트 운용시에 주로 사용하는 리치메뉴 설정 관련 매니지먼트 시스템

기본적으로 아카운트 매니지먼트 화면이 별도로 존재하고 있지만, 리치메뉴와 공식 아카운트 운용시에 불편한 점이 어느정도 존재하고 있다.  
이 부분을 서포팅 하기 위해 해당 웹페이지 제작에 돌입하였다.

## 설치

1. Github 로 부터 코드를 clone
2. `yarn install` 을 통해 모듈 설치
3. `touch .env` 를 통해 환경 변수 파일 설치
4. 아래 내용을 참고하여 `access token` 을 설정해둘 것 5. access token 은 LINE 채널 설정 페이지로 부터 습득 가능함

```dotenv
## develop 환경
API_KEY_DEV=asdf

## production 환경
API_KEY_PROD=qwer
```

## 주요기술

- Nuxt.js
- Vue.js
- Vuetify
- line API

## 기능

- 리치메뉴 관련
  - 리스트업,
  - 신규 작성
  - 메뉴 삭제
  - 유저 연동(구현 예정)
  - 기본 리치메뉴 설정(구현 예정)
- 메시지 관련
  - 유저에게 메시지 PUSH (구현 예정)
- 채널 관련
  - 다양한 통계지표 제공 (아카운트 매니저 에선 확인하기 어려운 내용들)(구현 예정)
