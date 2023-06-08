window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmVjM2U3MzdhYzIyZDQxOGExZTBmNGRmZTEzNTY3ZiIsInN1YiI6IjY0NzFiZjQ0YmUyZDQ5MDExNmM4YTk2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JvZ2uXWJg9pC1AfqkJeUENhOZIGdg7e9flH1BDoX6ME",
    },
  };

  // 영화 데이터 가져오기
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options)
    .then((response) => response.json())
    .then((data) => {
      const title = data.title;
      const overview = data.overview;
      const releaseDate = data.release_date;
      const averageVote = data.vote_average;
      // data.backdrop_path
      const posterPath = data.poster_path;
      const poster = `https://image.tmdb.org/t/p/w200${posterPath}`;

      // 영화 카드 생성
      const card1 = document.createElement("div");
      card1.classList.add("card");

      // 영화 포스터
      const posterImg = document.createElement("img");
      posterImg.src = poster;
      posterImg.classList.add("poster-image");
      card1.appendChild(posterImg);

      // 컨테이너에 카드 추가
      const container = document.getElementById("movie-container");
      container.appendChild(card1);

      // 두 번째 카드 (나머지 내용)
      const card2 = document.createElement("div");
      card2.classList.add("card");

      // 영화 제목
      const titleElement = document.createElement("h1");
      titleElement.textContent = title;
      card2.appendChild(titleElement);

      // 영화 내용
      const overviewElement = document.createElement("h2");
      overviewElement.textContent = overview;
      card2.appendChild(overviewElement);

      // 영화 개봉일
      const releaseDateElement = document.createElement("p");
      releaseDateElement.textContent = "개봉일 : " + releaseDate;
      card2.appendChild(releaseDateElement);

      // 영화 평점
      const averageVoteElement = document.createElement("p");
      averageVoteElement.textContent = "평점 : " + averageVote;
      card2.appendChild(averageVoteElement);

      // 컨테이너에 두 번째 카드 추가
      container.appendChild(card2);
    })
    .catch((err) => console.error(err));
});
