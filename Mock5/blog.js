const container = document.querySelector(".container");
let login = JSON.parse(localStorage.getItem("login"));

const fetchData = async () => {
  try {
    let res = await fetch("https://mock-api-xfgb.onrender.com/blog");
    let data = await res.json();
    console.log(data);
    showData(data);
  } catch (e) {
    console.log(e);
  }
};

fetchData();

const showData = (data) => {
  data.forEach((ele) => {
    let miniDiv = document.createElement("div");
    miniDiv.setAttribute("class", "miniDiv");

    let imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDiv");

    let textDiv = document.createElement("div");
    textDiv.setAttribute("class", "textDiv");

    let btnDiv = document.createElement("div");
    btnDiv.setAttribute("class", "btnDiv");

    let image = document.createElement("img");
    image.src = login.avtar;

    let username = document.createElement("p");
    username.innerText = login.name;

    let category = document.createElement("p");
    category.innerText = ele.category;

    let date = document.createElement("p");
    date.innerText = ele.date;

    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.addEventListener("click", function () {
      showEditModal(ele);
    });

    let delet = document.createElement("button");
    delet.innerText = "Delete";
    delet.addEventListener("click", function () {
      deleteBtn(ele.id);
    });

    let title = document.createElement("h1");
    title.innerText = ele.title;

    let content = document.createElement("p");
    content.innerText = ele.content;
    content.setAttribute("class", "content");

    let likeDiv = document.createElement("div");
    likeDiv.setAttribute("class", "likeDiv");

    let likeImage = document.createElement("img");
    likeImage.src =
      "https://www.freepnglogos.com/uploads/like-png/like-icon-line-iconset-iconsmind-35.png";
    likeImage.addEventListener("click", function () {
      increaseLike(ele);
    });

    let likes = document.createElement("p");
    likes.innerText = ele.likes;
    likes.setAttribute("id", "likes");

    let commentsImage = document.createElement("img");
    commentsImage.src =
      "https://cdn-icons-png.flaticon.com/512/1380/1380338.png";
    let comentLen = document.createElement("p");
    comentLen.innerText = ele.comments.length;

    let addComBtn = document.createElement("button");
    addComBtn.innerText = "Add Comment";

    let commDiv = document.createElement("div");
    commDiv.setAttribute("class", "commDiv");
    for (let i = 0; i < ele.comments.length; i++) {
      let miniComDiv = document.createElement("div");
      miniComDiv.setAttribute("class", "miniComDiv");

      let nameInCom = document.createElement("p");
      nameInCom.innerText = ele.comments[i].username;

      let content = document.createElement("p");
      content.innerText = ele.comments[i].content;

      miniComDiv.append(nameInCom, content);
      commDiv.append(miniComDiv);
    }

    textDiv.append(username, date);
    btnDiv.append(edit, delet);
    likeDiv.append(likeImage, likes, commentsImage, comentLen);
    imgDiv.append(image, textDiv, btnDiv);
    miniDiv.append(imgDiv, title, content, likeDiv, addComBtn, commDiv);
    container.append(miniDiv);
  });
};

function increaseLike(ele) {
  let likes = document.getElementById("likes");

  fetch(`https://mock-api-xfgb.onrender.com/blog/${ele.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      likes: Number(ele.likes) + 1,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      likes.innerText = data.likes;
      console.log(data);
    });

  window.location.reload();
}

const fetchDataForCat = async () => {
  try {
    let res = await fetch("https://mock-api-xfgb.onrender.com/blog");
    let data = await res.json();
    console.log(data);
    flterCat(data);
  } catch (e) {
    console.log(e);
  }
};

function flterCat(data) {
  container.innerHTML = "";
  console.log("f", data);
  let value = document.getElementById("category").value;
  console.log(value);
  let fdata = data.filter((ele) => {
    return ele.category === value;
  });

  if (fdata.length === 0) {
    let heading1 = document.createElement("h1");
    heading1.innerText = "No category found.";
    container.append(heading1);
  } else {
    showData(fdata);
  }
}

const sortData = async () => {
  let value = document.getElementById("sort").value;
  try {
    let res = await fetch(
      `https://mock-api-xfgb.onrender.com/blog/?_sort=date&_order=${value}`
    );
    let data = await res.json();
    console.log(data);
    container.innerHTML = "";
    showData(data);
  } catch (e) {
    console.log(e);
  }
};

const deleteBtn = async (id) => {
  try {
    let res = await fetch(`https://mock-api-xfgb.onrender.com/blog/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();
    console.log(data);
    window.location.reload();
  } catch (e) {
    console.log(e);
  }
};

function debounce(func, delay) {
  let time;
  clearTimeout(time);
  time = setTimeout(() => {
    func.apply(this, arguments);
  }, delay);
}

async function showChange() {
  container.innerHTML = "";
  let title = document.getElementById("searchBar").value;
  try {
    let res = await fetch("https://mock-api-xfgb.onrender.com/blog");
    let data = await res.json();
    let sData = data.filter((ele) => {
      return ele.title.includes(title);
    });
    showData(sData);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

function goToAdd() {
  window.location.href = "./AddBlog.html";
}

function showEditModal(ele) {
  console.log(ele);
  let div = document.createElement("div");
  div.setAttribute("class", "modal");

  let input1 = document.createElement("input");
  // input1.value = ele.title;
  input1.setAttribute("id", "title1");
  input1.style.width = "80%";
  input1.style.height = "40px";
  input1.setAttribute("value", input1.value);
  let inputVal = input1.value;

  let txtArea = document.createElement("textarea");
  txtArea.value = ele.content;
  txtArea.setAttribute("id", "content1");
  txtArea.value = ele.content;
  txtArea.style.width = "80%";
  txtArea.style.marginTop = "10px";

  // txtArea.style.height = "40px";

  let btn = document.createElement("button");
  btn.innerText = "Update";
  btn.addEventListener("click", function () {
    console.log("Hi", inputVal);
  });

  div.append(input1, txtArea, btn);
  container.append(div);
}

// function updateData(data) {
//   console.log(data);
// }
