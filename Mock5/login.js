async function submi() {
  try {
    let res = await fetch("https://mock-api-xfgb.onrender.com/user");
    let data = await res.json();
    console.log(data);
    checkEmailAndPassword(data);
  } catch (e) {
    console.log(e);
  }
}

const checkEmailAndPassword = (data) => {
  let email = document.getElementById("Email").value;
  let password = document.getElementById("Password").value;
  let count = 0;

  data.map((ele) => {
    if (email === ele.email && password === ele.password) {
      count++;
      localStorage.setItem("login", JSON.stringify(ele));
    }
  });

  if (count === 0) {
    alert("Login failed");
  } else {
    alert("LOGIN SUCCESS");
    window.location.href = "./blog.html";
  }
};
