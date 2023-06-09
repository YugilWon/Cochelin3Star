window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query").toLowerCase().trim();

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=522b26161abb921fd9153469e579ab9f&language=ko-KR&query=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      let movies = data["results"];

      // 새로고침
      document.querySelector("#movieList").innerHTML = "";

      document.querySelector(
        "#searchResult"
      ).innerHTML = `"${query}"에 대한 검색 결과입니다.`;

      movieList.style.display = "block";

      movies.forEach((a) => {
        let title = a["title"];
        let id = a["id"];
        let overview = a["overview"];
        let date = a["release_date"];
        let average = a["vote_average"];
        let poster = `https://image.tmdb.org/t/p/w200` + a["poster_path"];
        let adult = a["adult"];
        if (adult == false) {
          console.log(adult);
          const movieInfo = document.createElement("li");
          movieInfo.innerHTML = `<div class= "wrap" onclick="viewDetails('${id}')">
			                              <img src=${poster} alt="Movie Poster">
			                              <span>${overview}</span>
                                    <p>${id}</p>
			                            </div>
			                            <h2>${title}</h2>`;

          document.querySelector("#movieList").appendChild(movieInfo);
        }
      });
    })
    .catch((err) => console.error(err));
});
