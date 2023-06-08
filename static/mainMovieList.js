const sliders = document.querySelector("#popular-movie-list");
const CochelinSliders = document.querySelector("#Cochelin-movie-list");
const CochelinMoivesId = [
  350, 122906, 11324, 361743, 152601, 443129, 2062, 673, 4960, 76,
];
const nameArr = [
  "현수",
  "현수",
  "유길",
  "유길",
  "우정",
  "우정",
  "혜진",
  "혜진",
  "수아",
  "수아",
];

let scrollPerClick;
let ImagePadding = 20;
let scrollAmount = 0;

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
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

      sliders.innerHTML += temp_html;

      CochelinMoivesId.push(id); // CochelinMoivesId 배열에 id 값을 추가
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

// ========================================================

for (let i = 0; i < CochelinMoivesId.length; i++) {
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      CochelinMoivesId[i] +
      "?language=ko-KR",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      let title = response["title"];
      let id = response["id"];
      let poster_path = response["poster_path"];
      let poster = `https://image.tmdb.org/t/p/w300${poster_path}`;
      let name = nameArr[i];

      let temp_html = ``;
      temp_html = `<li id="Cochelin-movie-item">
                <img src="${poster}" art=${title} onclick="viewDetails('${id}')" />
                <span id="name">${name}'s pick</span>
                </li>`;

      CochelinSliders.innerHTML += temp_html;

      CochelinscrollPerClick =
        document.querySelector("#Cochelin-movie-item").clientWidth +
        ImagePadding;
    })
    .catch((err) => console.error(err));
}

function CochelinsliderScrollLeft() {
  CochelinSliders.scrollTo({
    top: 0,
    left: (scrollAmount -= CochelinscrollPerClick),
    behavior: "smooth",
  });

  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
}

function CochelinsliderScrollRight() {
  if (
    scrollAmount <=
    CochelinSliders.scrollWidth - CochelinSliders.clientWidth
  ) {
    CochelinSliders.scrollTo({
      top: 0,
      left: (scrollAmount += CochelinscrollPerClick),
      behavior: "smooth",
    });
  }
}

const CochelinleftBtn = document.getElementById("CochelinleftBtn");
const CochelinrightBtn = document.getElementById("CochelinrightBtn");

CochelinleftBtn.addEventListener("click", CochelinsliderScrollLeft);
CochelinrightBtn.addEventListener("click", CochelinsliderScrollRight);
