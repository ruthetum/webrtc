# WebRTC(Web Real-Time Communications)화상채팅 구현

### WebRTC?
웹 어플리케이션 및 사이트들이 별도의 소프트웨어 없이 음성, 영상, 텍스트, 파일 데이터를 브라우져끼리 주고 받을 수 있게 만든 기술(API)

### WebRTC 통신 원리
크게 3가지 클래스에 의해 실시간 데이터 교환이 이루어짐
* MediaStream - 카메라/마이크 등 데이터 스트림 접근
* RTCPeerConnection - 암호화 및 대역폭 관리 및 오디오 또는 비디오 연결
* RTCDataChannel - 일반적인 데이터 P2P통신

![webrtc원리](https://user-images.githubusercontent.com/59307414/87234899-84843880-c410-11ea-9529-607ae5c8f0bb.PNG)
(시그널링 과정)

* 시그널링 : RTCPeerConnection의 데이터 교환 처리 과정

### 결과
![캡처](https://user-images.githubusercontent.com/59307414/87236695-46deda00-c427-11ea-95c9-430303ac10b0.PNG)



참고 사이트 : https://velog.io/@ehdrms2034/WebRTC-%EC%9B%B9%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EB%A1%9C-%ED%99%94%EC%83%81-%EC%B1%84%ED%8C%85%EC%9D%84-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8B%A4%EA%B3%A0
