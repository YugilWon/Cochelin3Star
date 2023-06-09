document.addEventListener("DOMContentLoaded", function () {
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

  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=ko`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response.results.length > 0) {
        // 한국어로 된 예고편이 있으면 해당 예고편을 가져옴
        const videoVal = response.results[0].key;
        initializePlayer(videoVal);
      } else {
        // 한국어로 된 예고편이 없을 경우 영어로 된 예고편을 가져옴
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            if (response.results.length > 0) {
              // 영어로 된 예고편이 있으면 해당 예고편을 가져옴
              const videoVal = response.results[0].key;
              initializePlayer(videoVal);
            } else {
              throw new Error("예고편을 찾을 수 없습니다.");
            }
          })
          .catch((error) => {
            console.error(error);
            // 예고편을 가져오지 못한 경우에는 오류 메시지를 출력합니다.
          });
      }
    })
    .catch((error) => {
      console.error(error);
      // 한국어 예고편을 가져오지 못한 경우에는 영어로 된 예고편을 가져옵니다.
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.results.length > 0) {
            // 영어로 된 예고편이 있으면 해당 예고편을 가져옴
            const videoVal = response.results[0].key;
            initializePlayer(videoVal);
          } else {
            console.error("예고편을 찾을 수 없습니다.");
          }
        })
        .catch((error) => {
          console.error(error);
          // 예고편을 가져오지 못한 경우에는 오류 메시지를 출력합니다.
        });
    });

  function initializePlayer(videoVal) {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    var isMuted = true;

    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        height: 600,
        width: "100%",
        videoId: videoVal,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          showinfo: 0,
          disablekb: 1,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    }

    function toggleMute() {
      if (isMuted) {
        player.unMute();
        document.getElementById(
          "muteButton"
        ).innerHTML = `<img src="img/mute.png" alt="음소거 해제" />`;
      } else {
        player.mute();
        document.getElementById(
          "muteButton"
        ).innerHTML = `<img src="img/play.png" alt="음소거 해제" />`;
      }
      isMuted = !isMuted;
    }

    function onPlayerReady(event) {
      document.getElementById("player").addEventListener("mousedown", (e) => {
        e.preventDefault();
      });

      const muteButton = document.getElementById("muteButton");
      muteButton.addEventListener("click", toggleMute);

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

    tag.onload = onYouTubeIframeAPIReady;
  }

  var clickBlocker = document.getElementById("click-blocker");
  clickBlocker.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
  });
});
