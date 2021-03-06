# 동영상 구글 스트리트 뷰, 앨리스맵

[[ youtube url="https://youtu.be/7Qd2b_zONZA" alt="앨리스맵 영상 재생" ]]

앨리스원더랩은 동영상 버젼의 구글 스트리트 뷰를 만드는 회사입니다. iOS, Android 앱으로 사용자가 길을 걸어다니며 촬영한 영상이 GPS 기록과 함께 데이터 서버에 업로드됩니다. iOS, Android, Web 세 플랫폼에서 사용자는 자신의 GPS 기록이 지도 위에 그려진 것을 볼 수 있으며, 그 선을 클릭하면 그 순간의 영상이 재생됩니다.

NodeJS로 Web Server를 작성해 소셜 로그인과 서버 사이드 렌더링을 처리했습니다. 클라이언트에선 곡면에 영상을 프로젝션하기 위해 [Three.js](https://threejs.org/)를 사용했으며 지도에 GPS 기록을 그리기 위해 [Mapbox](https://www.mapbox.com/)를 활용했습니다. 각도, 거리, 시간 계산을 위해 [turf.js](https://turfjs.org/), [big.js](http://mikemcl.github.io/big.js/) 같은 수학 라이브러리를 활용했습니다.

[[ youtube url="https://www.youtube.com/watch?v=RmJmavFz2-4" alt="앨리스맵 투어 영상" ]]

# Chrome 개발자 도구를 활용한 성능 개선

AlleysMap는 애니메이션 프레임마다 GPU를 사용해 동영상과 지도를 렌더링을 합니다. 내장 그래픽을 사용하는 일반 노트북으로 테스트했을 때 팬이 열을 내며 종종 굉음을 냈습니다. GPU 렌더링을 사용하는 다른 사이트들도 비슷한 현상이 발생할 정도로 WebGL의 특성상 팬이 가열되는 것은 막을 수 없습니다. 그럼에도 소음을 최대한 줄여볼 수 있지 않을까하는 생각에 일주일 간 이 문제를 해결하는 기간을 확보해 디버깅과 코드 리팩토링을 시작했습니다.

Chrome 개발자 도구를 활용해 디버깅을 한 결과 자바스크립 실행 전체 시간의 70% 이상을 `getTimeByPoint` 함수가 차지하고 있음을 확인했습니다. 이 함수는 다시 `getPointOnLine` 함수를 부르는 데에 모든 시간을 쓰고 있었습니다.

![getTimeByPoint 함수가 전체 시간의 70% 이상을 차지하고 있다. (2017)](https://user-images.githubusercontent.com/12758512/82830398-96595d00-9ef0-11ea-94dd-43676b1f0931.jpg)

`getPointOnLine`은 GPS 선 보정 라이브러리인 `turf.js`의 함수로서 소스코드를 확인한 후, 이 함수가 서비스가 필요로 하는 수준 이상으로 정교한 값을 계산하고 있음을 알게 되었습니다. 단순한 `for loop` 함수로 대체한 후 메모리 및 퍼포먼스 테스트를 진행했습니다.

![업데이트 이전(왼쪽)과 이후(오른쪽)의 Performance 측정 비교 그래프. (2017)](https://user-images.githubusercontent.com/12758512/82830532-fa7c2100-9ef0-11ea-92a0-1e1cf4df75c0.jpg)

성능 개선 후에도 팬의 굉음은 여전했지만 데시벨을 측정해서 소음의 변화 정도를 제시할 수는 없었기에 서비스에서 이루어지는 주요 사용자 인터랙션을 중심으로 메모리 프로파일링을 진행했습니다. 프로파일링은 노이즈를 제외하기 위해 크롬 시크릿 탭에서 Garbage collecting을 시킨 후 다섯 차례 진행했습니다. 주목할 점은 서비스의 초기 메모리 값은 개선 전후 모두 34mb 정도로 유사했지만, 인터랙션 후 메모리를 측정했을 때 성능 개선 버전에서 메모리가 최소 13mb, 최대 41mb 줄어든 것을 확인할 수 있었습니다.

![성능 개선 전과 후를 테이블 형태로 정리한 결과. (2017)](https://user-images.githubusercontent.com/12758512/82830472-cdc80980-9ef0-11ea-999a-3f8b17dbce71.jpg)

# 둔촌주공프로젝트

서울은 인구밀도가 뉴욕의 8배, 도쿄의 3배에 해당하는 과잉 밀집도시입니다. 고층 아파트에 대한 수요와 공급이 끊이질 않고 낮은 빌라나 낡은 아파트는 끊임없이 철거되고 재개발됩니다. 서울 남동쪽에 위치한 둔촌 주공 아파트 단지는 한 달 후에 철거될 예정이었고, 그 곳에서 자라고 학교를 다녔던 청년들은 "안녕, 둔촌주공아파트"라는 대규모 아카이빙 프로젝트를 진행중이었습니다. 뉴스에서 이 소식을 듣고 저희는 사람들이 추억이 깃든 장소를 지도 위에 남기고 없어질 장소의 길을 걸으며 이를 지도 위에 새기는 프로젝트를 진행했습니다. [둔촌주공아파트 지도 보기](http://map.alleys.co/archive/@hibyedcapt?@=37.52356561054226,127.13778848178367,16.2z)

[[ youtube url="https://www.youtube.com/watch?v=AI3nIEaHx9c" alt="안녕, 둔촌주공아파트 소개 영상. (2017)" ]]

![둔촌주공아파트를 위해 작업한 그룹 지도](https://user-images.githubusercontent.com/12758512/82828338-ca7e4f00-9eeb-11ea-9228-8926e4cd12d0.png)

![둔촌주공아파트를 위해 작업한 그룹 지도](https://user-images.githubusercontent.com/12758512/82828262-9d31a100-9eeb-11ea-9806-b09c6baa838f.JPG)
