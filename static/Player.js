// import { showMovieList } from "./script.js";

// showMovieList("")
//   .then((data) => {
//     // 가져온 데이터를 사용하는 작업 수행
//     console.log(data);
//   })
//   .catch((err) => console.error(err));

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmQ2OTNjYzEwNjdhNGI1NzcxYzJjOGI0YTJlNzJjOCIsInN1YiI6IjY0NzA4ZWExYzVhZGE1MDBmYjcyYTE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jmSIWUTekJ4ECS8onLQDDKlfcYm6kDJbtxgwVEsrAZA",
  },
};

fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then((response) => response.json())
  .then((response) => {
    // 영화 비디오 정보를 가져온 후 videoVal에 할당
    const videoVal = response.results[0].key;

    // YouTube 플레이어 초기화
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        height: 720,
        width: "100%",
        videoId: videoVal,
        playerVars: {
          autoplay: 1,
          loop: 1,
          controls: 0, // 플레이어 컨트롤러 숨김
          showinfo: 0, // 동영상 정보 (로고, 제목 등) 숨김
          disablekb: 1, //키보드 입력 비활성화
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    }
    function onPlayerReady(event) {
      event.target.playVideo();
    }
    var done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
      }
    }
    function stopVideo() {
      player.stopVideo();
    }

    // onYouTubeIframeAPIReady();
    // YouTube Iframe API 스크립트 로드 완료 시점에서 onYouTubeIframeAPIReady 함수 호출
    tag.onload = onYouTubeIframeAPIReady;
  })
  .catch((err) => console.error(err));

var clickBlocker = document.getElementById("click-blocker");
clickBlocker.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
});
