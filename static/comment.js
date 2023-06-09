//전역변수 comments를 전역으로 설정 시 삭제할 때 어디서든 참조가 가능해서 기능에 오류가 발생
// let comments = JSON.parse(localStorage.getItem("comments")) || [];

// 입력폼 이벤트 리스너
const commentForm = document.getElementById("comment-form");
const commentFormBtn = document.getElementById("comment-form-btn");
commentFormBtn.addEventListener("click", handleFormSubmit);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let comments = [];

//기존에 Local Storage에 존재하던 코멘트 불러오기
loadComments();

//코멘트 세이브 브라우저의 LocalStorage에 저장
function saveComments() {
  localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
}

// 코멘트 로컬 변수에 Local Storage에서 로드
function loadComments() {
  const storedComments = localStorage.getItem(`comments_${id}`);
  if (storedComments) {
    comments = JSON.parse(storedComments);
  }
}

//코멘트 Local Storage에서 삭제
function deleteCommentsFromLocalStorage() {
  localStorage.removeItem(`comments_${id}`);
}

//코멘트 디스플레이 부분
function displayComments(movieId) {
  const commentContainer = document.getElementById("comment-container");

  //코멘트 부분 동적으로 생성을 위해 초기화
  commentContainer.innerHTML = "";

  //여기서 comment 배열을 순회하며 값을 가져와서 디스플레이
  //해당 코멘트가 현재 페이지의 영화 id값과 id값이 일치하는지 확인
  comments.forEach((comment) => {
    if (comment.movieId === movieId) {
      const { author, text } = comment;
      const commentId = comment.commentId;

      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const authorElement = document.createElement("span");
      authorElement.classList.add("comment-author");
      authorElement.textContent = author;

      const textElement = document.createElement("p");
      textElement.classList.add("comment-text");
      textElement.textContent = text;

      const editButton = createEditButton(commentId);
      const deleteButton = createDeleteButton(commentId);

      commentElement.appendChild(authorElement);
      commentElement.appendChild(textElement);
      commentElement.appendChild(editButton);
      commentElement.appendChild(deleteButton);

      commentContainer.appendChild(commentElement);
    }
  });
}

// 작성버튼을 눌렀을 때 일어나는 이벤트 제어 함수
function handleFormSubmit(event) {
  event.preventDefault();

  const authorInput = document.getElementById("author");
  const passwordInput = document.getElementById("password");
  const commentInput = document.getElementById("comment");

  const author = authorInput.value;
  const password = passwordInput.value;
  const text = commentInput.value;
  const cid = Math.random();

  //새로운 코멘트 배열 생성
  const newComment = {
    movieId: id,
    commentId: cid,
    password: password,
    author,
    text,
  };

  //새로운 코멘트를 comments 배열에 푸쉬
  comments.push(newComment);

  //저장 없으면 저장 안돼요
  saveComments();

  //입력 필드 초기화
  authorInput.value = "";
  passwordInput.value = "";
  commentInput.value = "";

  //새로 입력되면 바로 적용을 위해
  displayComments(id);

  alert("댓글 작성완료");
  commentForm.style.display = "none";
}

//삭제버튼 commentId값을 매개변수로 버튼 생성
function createDeleteButton(commentId) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제"; //이미지 넣으려면 .innerHTML로 변경 필요
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (confirm("댓글을 삭제하시겠습니까?")) {
      const password = prompt("비밀번호를 입력하세요:");
      if (password === null || password === "") {
        alert("비밀번호를 입력해주세요!");
        return;
      }

      //삭제하려는 댓글 찾기
      const commentToDelete = comments.find(
        (comment) => comment.movieId === id && comment.commentId === commentId
      );

      //비밀번호 검증
      if (commentToDelete && commentToDelete.password === password) {
        const deletedComments = comments.filter(
          (comment) => comment.movieId === id && comment.commentId !== commentId
        );

        alert("댓글 삭제 완료!");
        comments = deletedComments;

        deleteCommentsFromLocalStorage();

        // 저장
        saveComments();

        // 댓글 재표시
        displayComments(id);
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    }
  });
  return deleteButton;
}

// 수정 버튼 commentId값을 매개변수로 버튼 생성
function createEditButton(commentId) {
  const editButton = document.createElement("button");
  editButton.textContent = "수정";
  editButton.classList.add("edit-button");
  editButton.addEventListener("click", function (event) {
    event.preventDefault();

    const commentToEdit = comments.find(
      (comment) => comment.movieId === id && comment.commentId === commentId
    );

    if (commentToEdit) {
      const newText = prompt("댓글을 수정하세요:", commentToEdit.text);
      if (newText === null) {
        return;
      }
      alert("댓글 수정 완료!");
      // 댓글 수정
      commentToEdit.text = newText;

      // 저장
      saveComments();

      // 댓글 재표시
      displayComments(id);
    }
  });
  return editButton;
}

//댓글 작성하기 버튼 클릭 시 댓글 작성 폼 디스플레이
const showCommentFormButton = document.getElementById(
  "show-comment-form-button"
);
showCommentFormButton.addEventListener("click", toggleCommentForm);

function toggleCommentForm() {
  const commentForm = document.getElementById("comment-form");
  if (commentForm.style.display === "none") {
    commentForm.style.display = "block";
    // showCommentFormButton.innerText = "댓글 작성완료";
  } else {
    commentForm.style.display = "none";
    // showCommentFormButton.innerText = "댓글 작성하기";
  }
}

//페이지 로드 시 디스플레이
displayComments(id);

//페이지 로드 시 코멘트폼 안보이게
toggleCommentForm();
