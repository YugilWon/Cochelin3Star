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
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmVjM2U3MzdhYzIyZDQxOGExZTBmNGRmZTEzNTY3ZiIsInN1YiI6IjY0NzFiZjQ0YmUyZDQ5MDExNmM4YTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JvZ2uXWJg9pC1AfqkJeUENhOZIGdg7e9flH1BDoX6ME",
    },
  };

  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((data) => {
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
          movieInfo.innerHTML = ` <div class= "wrap">
			                              <img src=${poster} alt="Movie Poster">
                                    <h3>${rank}</h3>
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>
			                            <p>개봉 ${date} 평점 ${average}</p>
                                  <button onclick="viewDetails('${id}')">자세히 보기</button>`;

          document.querySelector("#movieList").appendChild(movieInfo);

          fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
          )
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

          // var clickBlocker = document.getElementById("click-blocker");
          // clickBlocker.addEventListener("click", function (event) {
          //   event.stopPropagation();
          //   event.preventDefault();
          // });
        }
      });
    })

    .catch((err) => console.error(err));
}
//페이지를 로드할 때 id값으로 불러오기
function viewDetails(movieId) {
  window.location.href = `Detail.html?id=${movieId}`;
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const val = searchInput.value;

// 검색 결과를 다른 페이지에서 로드하기
function viewSearchMovie() {
  // 영화 검색기능
  // searchBtn.addEventListener("click", showSearchList);
  showSearchList();
}

function showSearchList(e) {
  // movieList.innerHTML = ""; // 빈 여백값으로 만듬
  e.preventDefault(); // 브라우저의 기본동작 제한, 폼 제출시 페이지가 새로고침 되는 것을 막음
  showMovieList(val);
  window.location.href = `search.html?searchinput=${val}`;
}

// "" 가 입력된 상태로 함수 실행 --> 영화 전체목록 보여줌
// showMovieList("");

// id 조회기능
const movieList = document.getElementById("movieList");
function showMovieInfo(e) {
  const wrapElement = e.target.closest(".wrap");
  if (wrapElement) {
    const title = wrapElement.nextElementSibling.textContent;
    const id = wrapElement.querySelector("p").textContent;

    alert(`"${title}" 의 id는 "${id}" 입니다.`);
  }
}
movieList.addEventListener("click", showMovieInfo);

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

function moreMoiveList() {
  // "" 가 입력된 상태로 함수 실행 --> 영화 전체목록 보여줌
  showMovieList("");
}

clickMovieListBtn.addEventListener("click", moreMoiveList);
