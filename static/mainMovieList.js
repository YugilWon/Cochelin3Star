const sliders = document.querySelector("#popular-movie-list");
const CochelinSliders = document.querySelector("#Cochelin-movie-list");

// Cochelin's pick 영화 id와 name 배열 변수에 할당
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

// popular movie fetch
fetch("https://api.themoviedb.org/3/movie/popular?language=ko&page=1", options)
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
                  <img src="${poster}" alt=${title} onclick="viewDetails('${id}')" />
                  <span id="popular-movie-rank">${rank}</span>
                  </li>`;

      sliders.innerHTML += temp_html;
      CochelinMoivesId.push(id);
    });
  })
  .catch((err) => console.error(err));

let slides,
  slide,
  currentIdx = 0,
  slideCount,
  slideWidth = 200,
  slideMargin = 30;

// 슬라이드의 복사본을 만들어 앞또는 뒤에 추가
function makeClone() {
  // 뒷부분의 복사본
  for (let i = 0; i < slideCount; i++) {
    // a.cloneNode() => a 요소를 그대로 복사
    // a.cloneNode(true) => a 뿐만 아니라 a 의 자식 모두 복사
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    // slides (ul) 태그에 복사본을 넣어줌
    slides.appendChild(cloneSlide);
  }
  // 앞부분의 복사본 5,4,3,2,1 순서
  for (let i = slideCount - 1; i >= 0; i--) {
    let cloneSlide = slide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    slides.prepend(cloneSlide);
  }
  updateWidth();
  setInitialPos();
  setTimeout(function () {
    slides.classList.add("animated");
  }, 100);
}

// 요소가 일렬로 서있도록 요소를 감싼 너비를 모든요소값+마진값으로 변경
function updateWidth() {
  let currentSlides = document.querySelectorAll("#popular-movie-list li");
  let newSlideCount = currentSlides.length;
  let newWidth =
    (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
  slides.style.width = newWidth;
}

//초기 위치를 slide 0번 인덱스 부터
function setInitialPos() {
  let initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
  // slides {transform:translateX(-1000px);}
  slides.style.transform = `translateX(${initialTranslateValue}px)`;
}

document.getElementById("rightBtn").addEventListener("click", function () {
  moveSlide(currentIdx + 4);
});

document.getElementById("leftBtn").addEventListener("click", function () {
  moveSlide(currentIdx - 4);
});

// 좌우로 움직임
function moveSlide(num) {
  slides.style.left = -num * (slideWidth + slideMargin) + "px";
  currentIdx = num;
  if (Math.abs(currentIdx) == slideCount) {
    setTimeout(function () {
      slides.classList.remove("animated");
      slides.style.left = "0px";
      currentIdx = 0;
    }, 600);
    setTimeout(function () {
      slides.classList.add("animated");
    }, 800);
  }
}

// Cochelin movie fetch
for (let i = 0; i < CochelinMoivesId.length; i++) {
  fetch(
    "https://api.themoviedb.org/3/movie/" +
      CochelinMoivesId[i] +
      "?language=ko",
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
                <img src="${poster}" alt=${title} onclick="viewDetails('${id}')" />
                <span id="name">${name}'s pick</span>
                </li>`;

      CochelinSliders.innerHTML += temp_html;
    })
    .catch((err) => console.error(err));
}

let Cslides,
  Cslide,
  CcurrentIdx = 0,
  CslideCount,
  CslideWidth = 200,
  CslideMargin = 30;

window.onload = function () {
  slides = document.querySelector("#popular-movie-list");
  slide = document.querySelectorAll("#popular-movie-list li");
  slideCount = slide.length;
  makeClone();
  Cslides = document.querySelector("#Cochelin-movie-list");
  Cslide = document.querySelectorAll("#Cochelin-movie-list li");
  CslideCount = Cslide.length;
  CmakeClone();
};

// 슬라이드의 복사본을 만들어 앞또는 뒤에 추가
function CmakeClone() {
  // 뒷부분의 복사본
  for (let i = 0; i < CslideCount; i++) {
    // a.cloneNode() => a 요소를 그대로 복사
    // a.cloneNode(true) => a 뿐만 아니라 a 의 자식 모두 복사
    let CcloneSlide = Cslide[i].cloneNode(true);
    CcloneSlide.classList.add("clone");
    // slides (ul) 태그에 복사본을 넣어줌
    Cslides.appendChild(CcloneSlide);
  }
  // 앞부분의 복사본 5,4,3,2,1 순서
  for (let i = CslideCount - 1; i >= 0; i--) {
    let CcloneSlide = Cslide[i].cloneNode(true);
    CcloneSlide.classList.add("clone");
    Cslides.prepend(CcloneSlide);
  }
  CupdateWidth();
  CsetInitialPos();
  setTimeout(function () {
    Cslides.classList.add("animated");
  }, 100);
}

// 요소가 일렬로 서있도록 요소를 감싼 너비를 모든요소값+마진값으로 변경
function CupdateWidth() {
  let CcurrentSlides = document.querySelectorAll("#Cochelin-movie-list li");
  let CnewSlideCount = CcurrentSlides.length;
  let CnewWidth =
    (CslideWidth + CslideMargin) * CnewSlideCount - CslideMargin + "px";
  Cslides.style.width = CnewWidth;
}

//초기 위치를 slide 0번 인덱스 부터
function CsetInitialPos() {
  let CinitialTranslateValue = -(CslideWidth + CslideMargin) * CslideCount;
  // slides {transform:translateX(-1000px);}
  Cslides.style.transform = `translateX(${CinitialTranslateValue}px)`;
}

document
  .getElementById("CochelinrightBtn")
  .addEventListener("click", function () {
    CmoveSlide(CcurrentIdx + 5);
  });

document
  .getElementById("CochelinleftBtn")
  .addEventListener("click", function () {
    CmoveSlide(CcurrentIdx - 5);
  });

// 좌우로 움직임
function CmoveSlide(num) {
  Cslides.style.left = -num * (CslideWidth + CslideMargin) + "px";
  CcurrentIdx = num;
  if (Math.abs(CcurrentIdx) == CslideCount) {
    setTimeout(function () {
      Cslides.classList.remove("animated");
      Cslides.style.left = "0px";
      CcurrentIdx = 0;
    }, 600);
    setTimeout(function () {
      Cslides.classList.add("animated");
    }, 800);
  }
}

//페이지를 로드할 때 id값으로 불러오기
function viewDetails(movieId) {
  window.location.href = `Detail.html?id=${movieId}`;
}
