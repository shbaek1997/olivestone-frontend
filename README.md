# **Project Upload and Download Olivestone Lab (Client)**

## 서비스 소개

- 어떤한 종류의 파일이든 상관 없이 파일을 서버 디렉토리에 업로드, 다운로드를 할 수 있게 하는 웹페이지
- 이러한 서비스의 Frontend 클라이언트 Repository
- 브라우저에서 뿐만 아니라, POST 요청으로 터미널에서도 파일 다운로드 가능 (curl command 활용)
- 서버 Repository는 이 [링크](http://swrnd.olivestonelab.com:32790/shbaek1997/project-upload-download-server/-/blob/develop/README.md)를 참조

## 서비스 설명

- 서버에 파일 업로드 시, 이미 가입된 유저네임과 비밀번호를 입력하여 로그인을 한 경우에만 업로드가 가능
- 유저 로그인 시, 서버와 API 통신으로 JWT token값 생성 및 sessionStorage에 토큰 저장
- 로그인 이후에는 sessionStorage의 토큰 값으로 api 통신하여 유저 인증 정보 확인
- 로그아웃 시, sessionStorage의 토큰 값 제거 (네비게이션의 로그아웃 버튼)
- 업로드 시, 유저 인증 확인 후, form으로 등록할 파일, 파일 비밀번호 확인. 이 후 API 통신으로 파일 서버 업로드
- 다운로드 시, 파일 아이디와 파일 비밀번호 값을 form으로 전달 받아서 API 통신 이 후, 파일 브라우저에서 다운로드
- 홈 화면은 다운로드 페이지이며, 로그인이 되어있지 않은 경우는 다운로드 페이지, 로그인 페이지만 접근 가능
- 로그인한 유저인 경우, 다운로드 페이지에서 네비게이션 버튼을 활용하여 업로드 페이지, 파일 리스트 페이지 등에 접근 가능
- 파일페이지 안에서 업로드되어 있는 파일들의 정보 확인 및, 파일 정렬 가능 (파일 종류, 파일명 알파벳 순서, 업로드 일자, 만료 일자)
- 파일페이지 안에서 파일 이름 클릭으로 파일 비밀번호 없이 파일 다운로드 가능 (로그인 한 유저는 관리자 취급)
- 파일페이지 change password 버튼으로 기존 파일의 비밀번호 변경 가능 (파일 페이지 모달)
- 파일페이지 share file 버튼으로 해당 파일의 아이디 값이 담긴 download 페이지 url을 클립보드에 복사 (파일 페이지 모달)
- 파일페이지 delete 버튼으로 파일의 DB에서의 만료 시간을 변경하여 만료 처리하고, 서버 디렉토리에서 삭제 가능 (파일 페이지 모달)

## 기술 스텍

- 프론트 프레임워크 : [Create React App](https://create-react-app.dev/)으로 생성한 [React App](https://ko.reactjs.org/docs/getting-started.html)
- CSS: [Styled Components](https://styled-components.com/)
- Api 통신: [Axios](https://axios-http.com/kr/docs/intro)
- 페이지 전환: [React-router-dom](https://reactrouter.com/en/main)
- state 상태 관리: [Redux-Toolkit](https://redux-toolkit.js.org/)
- pagination 기능: [react-js-pagination](https://github.com/wwwaiser/react-js-pagination)
- Data-validation: [yup](https://github.com/jquense/yup)

## 개발 환경

- React version: 18.2.0
- Styled-Components: 5.3.6
- React-router-dom: 6.4.3
- Axios: 1.1.3
- Redux-toolkit: 1.9.0
- React-redux: 8.0.5
- React-js-pagination: 3.0.3
- yup: 0.32.11

## Set Up & 실행 방법

- 이 server repository [링크](http://swrnd.olivestonelab.com:32790/shbaek1997/project-upload-download-server/-/blob/develop/README.md)를 참고하여 server 실행
- 정상적으로 서버가 실행되었다는 것이 확인되면 config의 variables.js의 BASE_URL을 서버 url과 동일하게 설정
- variables.js의 HOME_PAGE 변수를 http://localhost:3000 으로 설정
- terminal에 npm run start로 프로젝트 실행
- http://localhost:3000/ 접속/실행 여부 확인
- 서버에서 등록한 username, password를 사용하여 로그인
- 업로드, 다운로드, 로그인/로그아웃, 파일 페이지 기능들 test
- 빌드 시 필요에 따라 config의 variable값을 변경하고, npm run build로 빌드 진행
