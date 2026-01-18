const commentsDiv = document.getElementById("comments");

let comments = [];

/* تعليق إداري */
function addAdminComment() {
  const name = document.getElementById("adminName").value;
  const text = document.getElementById("adminComment").value;

  if (!name || !text) return;

  comments.unshift({
    name,
    text,
    likes: randomLikes(),
    admin: true
  });

  renderComments();
}

/* تعليق عادي */
function addComment() {
  const name = document.getElementById("userName").value;
  const text = document.getElementById("userComment").value;

  if (!name || !text) return;

  comments.push({
    name,
    text,
    likes: randomLikes(),
    admin: false
  });

  renderComments();
}

/* رسم التعليقات */
function renderComments() {
  commentsDiv.innerHTML = "";

  comments.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = "comment" + (c.admin ? " gold" : "");

    div.innerHTML = `
      <div class="name">${c.admin ? "⭐ إداري: " : ""}${c.name}</div>
      <div class="text">${c.text}</div>
      <div class="actions">
        <span class="like" onclick="likeComment(${i})">👍 ${c.likes}</span>
        <span class="delete" onclick="deleteComment(${i})">🗑 حذف</span>
      </div>
    `;

    commentsDiv.appendChild(div);
  });
}

/* لايك */
function likeComment(index) {
  comments[index].likes++;
  renderComments();
}

/* حذف */
function deleteComment(index) {
  comments.splice(index, 1);
  renderComments();
}

/* لايكات محترمة */
function randomLikes() {
  return Math.floor(Math.random() * 500) + 50;
}
