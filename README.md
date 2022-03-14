esp8266과 heroku를 이용한 데이터 취득 및 저장

heroku를 이용해 데이터를 받고 정리하는 웹앱을 호스팅한다.

view를 위해 express와 ejs를 사용한다.
socket.io를 이용하여 frontend와 backend 사이에 이벤트와 데이터를 전달한다.

esp8266에서 http post로 데이터를 받는다.

문제
1. mongoDB Atlas 접속 불안정
2. 

최우선 목표
1. 센서에서 데이터를 보내고 이를 웹페이지에서 볼 수 있도록 한다. ->해결
2. mongoDB Atlas 대체 DBaaS 찾기 혹은 local DB 구축

Heroku CLI 사용법
1. heroku login
2. heroku remote로 git push -> 빌드 후 서비스 시작됨
3. heroku open - 서비스되고 있는 페이지의 주소 알려줌
4. 