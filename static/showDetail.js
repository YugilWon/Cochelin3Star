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

  // 영화 데이터 가져오기.
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options)
    .then((response) => response.json())
    .then((data) => {
      const title = data.title;
      const overview = data.overview;
      const releaseDate = data.release_date;
      const averageVote = data.vote_average;
      // data.backdrop_path
      const posterPath = data.poster_path;
      const poster = `https://image.tmdb.org/t/p/w300${posterPath}`;
      const runtime = data.runtime;
      const genres = data.genres;

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
      card2.classList.add("card-text");

      // 영화 제목
      const titleElement = document.createElement("h1");
      titleElement.textContent = title;
      card2.appendChild(titleElement);

      // 영화 내용
      const overviewElement = document.createElement("h3");
      overviewElement.textContent = overview;
      card2.appendChild(overviewElement);

      // 영화 개봉일
      const releaseDateElement = document.createElement("p");
      releaseDateElement.textContent = "개봉일 : " + releaseDate;
      card2.appendChild(releaseDateElement);

      // 영화 장르
      const genresElement = document.createElement("p");
      genresElement.textContent = "장르 : ";
      genres.forEach((a) => {
        const genresName = a["name"];
        genresElement.textContent += genresName + " ";
        card2.appendChild(genresElement);
      });

      // 영화 평점
      const averageVoteElement = document.createElement("p");
      averageVoteElement.textContent = "평점 : " + averageVote;
      card2.appendChild(averageVoteElement);

      // 영화 런타임
      const runtimeElement = document.createElement("p");
      runtimeElement.textContent = "러닝타임 : " + runtime + "분";
      card2.appendChild(runtimeElement);

      // 컨테이너에 두 번째 카드 추가
      container.appendChild(card2);

      document.querySelector(
        "#similar-movie-recommend"
      ).innerHTML = `${title}와(과) 비슷한 장르의 영화`;
    })
    .catch((err) => console.error(err));

  //비슷한 영화 추천 (수아)
  fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=ko-KR&page=1`,
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
        const movieInfo = document.createElement("li");
        movieInfo.innerHTML = `<div class= "wrap" onclick="viewDetails('${id}')">
			                              <img src=${poster} alt="Movie Poster">
                                    <h3>${rank}</h3>
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>
			                            <p>개봉 ${date} 평점 ${average}</p>`;

        //만약 개봉예정작인 영화 표시 x 구현해야함.
        document.querySelector("#similar-container").appendChild(movieInfo);
      });
    });
});
