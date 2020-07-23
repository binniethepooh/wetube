import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delBtn = document.querySelectorAll(".delete_comment");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = (id, target) => {
  const span = target.parentElement;
  const li = span.parentElement;
  commentList.removeChild(li);
  decreaseNumber();
};

const handleRemoveComment = async (event) => {
  event.preventDefault();
  const { target } = event;
  console.log(target);
  const commentId = target.id;
  console.log(commentId);
  const response = await axios({
    url: `/api/comment/${commentId}/delete`,
    method: "POST",
    data: { commentId },
  });
  if (response.status === 200) {
    delComment(commentId, target);
  }
};

const addEvent = () => {
  delBtn.forEach((btn) => {
    const Btn = btn;
    Btn.addEventListener("click", handleRemoveComment);
  });
};

function init() {
  addEvent();
}

if (delBtn) {
  init();
}
