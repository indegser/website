AlleysWonrderLab makes video version of Google Street View called [AlleysMap](https://map.alleys.co/). I used NodeJS for web server to handle social login and server side rendering. In client, to project videos on curved screen I used [Three.js](https://threejs.org/) and [Mapbox](https://www.mapbox.com/) for manipulating maps. To calculate angles, distances and time frames with javascript I used [turf.js](https://turfjs.org/) and [big.js](http://mikemcl.github.io/big.js/).

# Performance debugging with Chrome devtools.

AlleysMap renders video and vector map every animation frame. When tested with 2015 MacBook Pro, fan roared and got hot quickly. Other sites using GPU to render screens went through same state. Our team concluded it was WebGL's inevitable flaw, however I wanted to test whether refactoring could reduce noise. I secured a one week period to look into this problem, and start debugging and refactoring.

With Chrome devtools I found out `getTimeByPoint` function was taking more than 70% of whole javascript call time.

[[ image s3Key="b0/7f2062d973db3340b4b0987cdb92be.jpeg" alt="`getTimeByPoint` function taking 70% of javascript total time. (2017)" title="null" ]]

`getTimeByPoint` calls `turf.js`'s inner function `getPointOnLine` and this function was calculating too accuratly. After replaing it with simple `for loop` I found in every aspect performance was far better than previous version.

[[ image s3Key="59/78f7e599a991294c037e42328dcd77.jpeg" alt="After update(left) and before update(right) performance comparison. (2017)" title="null" ]]

After a week of debugging memory leaks and removing unnecessary re-renders, I went through memory profiling on important user interactions like `Map zoom-in`. To remove profiling noises, all the test was processed on Chrome secret tab with manual garbage collecting between every phases.

[[ image s3Key="6b/33a36b0d2c11030e4d664ca02f97a5.jpeg" alt="Memory profiling comparison on important user interactions in AlleysMap. (2017)" title="null" ]]

Noticeable point is that initial memory was similar in both versions but after certain interactions memory difference was significantly lower from 13mb to 41mb.

# 둔촌주공프로젝트

서울은 인구밀도가 뉴욕의 8배, 도쿄의 3배에 해당하는 과잉 밀집도시입니다. 고층 아파트에 대한 수요와 공급이 끊이질 않고 낮은 빌라나 낡은 아파트는 끊임없이 철거되고 재개발됩니다. 서울 남동쪽에 위치한 둔촌 주공 아파트 단지는 한 달 후에 철거될 예정이었고, 그 곳에서 자라고 학교를 다녔던 청년들은 "안녕, 둔촌주공아파트"라는 대규모 아카이빙 프로젝트를 진행중이었습니다. 뉴스에서 이 소식을 듣고 저희는 사람들이 추억이 깃든 장소를 지도 위에 남기고 없어질 장소의 길을 걸으며 이를 지도 위에 새기는 프로젝트를 진행했습니다. [둔촌주공아파트 지도 보기](http://map.alleys.co/archive/@hibyedcapt?@=37.52356561054226,127.13778848178367,16.2z)

[[ youtube url="https://www.youtube.com/watch?v=AI3nIEaHx9c" alt="안녕, 둔촌주공아파트 소개 영상. (2017)" ]]

[[ image s3Key="2c/80e66b1b31cb296d2a2d5a79b26f89.png" alt="둔촌주공아파트를 위해 작업한 그룹 지도" title="null" ]]
