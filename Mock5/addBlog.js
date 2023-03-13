let login = JSON.parse(localStorage.getItem("login"));

let username = document.getElementById("username");
username.value = login.name;

function onPost() {
  let objPost = {
    username: document.getElementById("username").value,
    title: document.getElementById("title").value,
    content: document.getElementById("Content").value,
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
    likes: 0,
    comments: [],
  };

  console.log(objPost);

  try {
    fetch("https://mock-api-xfgb.onrender.com/blog", {
      method: "POST",
      body: JSON.stringify(objPost),
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.log(e);
  }

  // location.replace("./blog.html");
}
