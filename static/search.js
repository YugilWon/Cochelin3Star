window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  console.log(query);
  filterMovies(query);

  function filterMovies(query) {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let movies = response["results"];
        filterArr = movies.filter(
          (item) => item.title.toLowerCase().includes(query) // movies의 title과 movieTitle 비교 후 filterArr 저장
        );

        // 새로고침
        document.querySelector("#movieList").innerHTML = "";

        document.querySelector(
          "#searchResult"
        ).innerHTML = `"${query}"에 대한 검색 결과입니다.`;

        filterArr.forEach((a) => {
          let title = a["title"];
          let id = a["id"];
          let overview = a["overview"];
          let date = a["release_date"];
          let average = a["vote_average"];
          let poster = `https://image.tmdb.org/t/p/w200` + a["poster_path"];

          const movieInfo = document.createElement("li");
          movieInfo.innerHTML = ` <div class= "wrap">
			                              <img src=${poster} alt="Movie Poster">
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>
			                            <p>개봉 ${date} 평점 ${average}</p>
                                  <button onclick="viewDetails('${id}')">자세히 보기</button>`;

          document.querySelector("#movieList").appendChild(movieInfo);
        });
      });
  }
});
