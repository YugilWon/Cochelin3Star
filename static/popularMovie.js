// 다른 파일에서 이미 정의되어 있어서 필요없음
// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTRlNjI1NzM4ZTljNTA3YTlkNDUxODQ3MjZjYTBiNCIsInN1YiI6IjY0NzIxOWRhYTE5OWE2MDEzMzI3ZTBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QGHS5mD2MAGc3NCZSUL5r86mKqr3aOreb0U0_4p0eNE",
//   },
// };
const sliders = document.querySelector("#popular-movie-list");

var scrollPerClick;
var ImagePadding = 20;
var scrollAmount = 0;

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let movies = response["results"];

    movies.map((a, i) => {
      let title = a["title"];
      let id = a["id"];
      let poster_path = a["poster_path"];
      let poster = `https://image.tmdb.org/t/p/w300${poster_path}`;
      let rank = i + 1;

      let temp_html = ``;
      temp_html = `<li id="popular-movie-item">
                  <img src="${poster}" art=${title} onclick="viewDetails('${id}')" />
                  <span id="popular-movie-rank">${rank}</span>
                  </li>`;

      document.querySelector("#popular-movie-list").innerHTML += temp_html;
    });

    scrollPerClick =
      document.querySelector("#popular-movie-item").clientWidth + ImagePadding;
    // console.log(scrollPerClick);
  })
  .catch((err) => console.error(err));

//페이지를 로드할 때 id값으로 불러오기
function viewDetails(movieId) {
  window.location.href = `Detail.html?id=${movieId}`;
}

function sliderScrollLeft() {
  sliders.scrollTo({
    top: 0,
    left: (scrollAmount -= scrollPerClick),
    behavior: "smooth",
  });

  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
}

function sliderScrollRight() {
  if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
    sliders.scrollTo({
      top: 0,
      left: (scrollAmount += scrollPerClick),
      behavior: "smooth",
    });
  }
}

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

leftBtn.addEventListener("click", sliderScrollLeft);
rightBtn.addEventListener("click", sliderScrollRight);
