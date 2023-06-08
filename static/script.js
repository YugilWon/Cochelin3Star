let videoKeys = [];
let currentVideoIndex = 0;
let isMuted = true;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZmQ2OTNjYzEwNjdhNGI1NzcxYzJjOGI0YTJlNzJjOCIsInN1YiI6IjY0NzA4ZWExYzVhZGE1MDBmYjcyYTE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jmSIWUTekJ4ECS8onLQDDKlfcYm6kDJbtxgwVEsrAZA",
  },
};

// 영화 리스트 보여주기
function showMovieList(val) {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let results = data["results"];
      results.map((a, i) => {
        let title = a["title"];
        let id = a["id"];
        let overview = a["overview"];
        let date = a["release_date"];
        let average = a["vote_average"];
        let poster = `https://image.tmdb.org/t/p/w200` + a["poster_path"];
        let rank = i + 1;
        // 대소문자 구분 없이 입력한 제목에 따른 영화 검색하기
        if (title.toLowerCase().includes(val.toLowerCase().trim())) {
          const movieInfo = document.createElement("li");
          movieInfo.innerHTML = ` <div class= "wrap" onclick="viewDetails('${id}')">
			                              <img src=${poster} alt="Movie Poster">
                                    <h3>${rank}</h3>
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>
			                            <p>개봉 ${date} 평점 ${average}</p>`;

          document.querySelector("#movieList").appendChild(movieInfo);

          CochelinMoivesId.push(id);
        }
      });

      CochelinMoivesId.forEach((id) => {
        // 영화 정보 가져오기
        fetchMovieInfo(id, options).then((videoVal) => {
          // YouTube 플레이어 초기화 후 loadVideoById 함수 호출
          onYouTubeIframeAPIReady();
          loadVideoById(videoVal);
        });
      });
    })
    .catch((err) => console.error(err));
}
// "" 가 입력된 상태로 함수 실행 --> 영화 전체목록 보여줌
showMovieList("");
// 영화 정보를 가져와서 YouTube 플레이어를 초기화하는 함수
function fetchMovieInfo(id, options) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // 영화 비디오 정보를 가져온 후 videoVal에 할당
      const videoVal = response.results[0].key;

      //랜덤 재생을 위해 Math 사용
      let currentVideoIndex = Math.floor(Math.random() * videoKeys.length);

      videoKeys.push(videoVal);

      var player;

      // YouTube 플레이어 초기화
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      function onYouTubeIframeAPIReady() {
        player = new YT.Player("player", {
          height: 600,
          width: "100%",
          videoId: videoVal,
          playerVars: {
            autoplay: 1,
            loop: 1,
            controls: 0, // 플레이어 컨트롤러 숨김
            showinfo: 0, // 동영상 정보 (로고, 제목 등) 숨김
            disablekb: 1, // 키보드 입력 비활성화
            mute: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
      }

      //음소거 상태를 토글하는 함수
      function toggleMute() {
        if (isMuted) {
          player.unMute(); // 소리 켜기
          document.getElementById(
            "muteButton"
          ).innerHTML = `<img src="img/mute.png" alt="음소거" />`; // 버튼 텍스트 변경
        } else {
          player.mute(); // 소리 끄기
          document.getElementById(
            "muteButton"
          ).innerHTML = `<img src="img/play.png" alt="음소거 해제" />`; // 버튼 텍스트 변경
        }
        isMuted = !isMuted; // 소리 상태 업데이트
      }

      // 이전 영상 재생 버튼 클릭 이벤트 처리
      const previousBtn = document.getElementById("previousBtn");
      previousBtn.addEventListener("click", playPreviousVideo);

      // 다음 영상 재생 버튼 클릭 이벤트 처리
      const nextBtn = document.getElementById("nextBtn");
      nextBtn.addEventListener("click", playNextVideo);

      // 이전 영상 재생 함수
      function playPreviousVideo() {
        if (currentVideoIndex > 0) {
          currentVideoIndex--;
          playVideoByIndex(currentVideoIndex);
        }
      }

      // 다음 영상 재생 함수
      function playNextVideo() {
        if (currentVideoIndex < videoKeys.length - 1) {
          currentVideoIndex++;
          playVideoByIndex(currentVideoIndex);
        } else {
          // 마지막 영상이 재생되면 처음 인덱스로 설정해서 다시 처음 영상 재생
          currentVideoIndex = 0;
          playVideoByIndex(currentVideoIndex);
        }
      }

      // 인덱스에 해당하는 영상 재생 함수
      function playVideoByIndex(index) {
        const videoKey = videoKeys[index];
        player.loadVideoById(videoKey);
      }

      function onPlayerReady(event) {
        document.getElementById("player").addEventListener("mousedown", (e) => {
          e.preventDefault(); // 마우스 올려서 영상 조작 등을 방지
        });

        // 음소거 버튼 클릭 이벤트 처리
        const muteButton = document.getElementById("muteButton");
        muteButton.addEventListener("click", toggleMute);

        event.target.playVideo();
        playVideoByIndex(currentVideoIndex);
      }

      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
        }
      }

      function stopVideo() {
        player.stopVideo();
      }
      tag.onload = function () {
        onYouTubeIframeAPIReady();
        player.addEventListener("onStateChange", onPlayerStateChange);
      };
    })
    .catch((err) => console.error(err));

  //마우스 이벤트를 막는 Blocker
  var clickBlocker = document.getElementById("click-blocker");
  clickBlocker.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
  });
}

//페이지를 로드할 때 id값으로 불러오기
function viewDetails(movieId) {
  window.location.href = `Detail.html?id=${movieId}`;
}

// 검색
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", showSearchList);

function showSearchList(e) {
  e.preventDefault(); // 브라우저의 기본동작 제한, 폼 제출시 페이지가 새로고침 되는 것을 막음
  // movieList.innerHTML = ""; // 빈 여백값으로 만듬
  const val = searchInput.value;
  window.location.href = `search.html?query=${val}`;
}

// id 조회기능
// function showMovieInfo(e) {
//   const wrapElement = e.target.closest(".wrap");
//   if (wrapElement) {
//     const title = wrapElement.nextElementSibling.textContent;
//     const id = wrapElement.querySelector("p").textContent;

//     alert(`"${title}" 의 id는 "${id}" 입니다.`);
//   }
// }
// movieList.addEventListener("click", showMovieInfo);

// 페이지 로드시 커서 입력창에 위치
window.onload = function () {
  searchInput.focus();
};

// topBtn 클릭시 페이지 최상단으로 이동 (화살표함수)
const topBtn = document.getElementById("topBtn");
const showTopPage = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

topBtn.addEventListener("click", showTopPage);

// 영화 리스트 더보기
const clickMovieListBtn = document.getElementById("movieListBtn");
const movieList = document.getElementById("movieList");

movieList.style.display = "none";

function moreMoiveList() {
  if (movieList.style.display === "none") {
    movieList.style.display = "block";
    clickMovieListBtn.innerText = "리스트 닫기";
  } else {
    movieList.style.display = "none";
    clickMovieListBtn.innerText = "영화 더보기";
  }
}

clickMovieListBtn.addEventListener("click", moreMoiveList);
