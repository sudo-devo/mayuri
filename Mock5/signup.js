function submi() {
  let userObj = {
    name: document.getElementById("Username").value,
    avtar: document.getElementById("Avatar").value,
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  };

  let flag = false;

  try {
    fetch("https://mock-api-xfgb.onrender.com/user", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: { "Content-Type": "application/json" },
    });
    flag = true;
    navigate(flag);
  } catch (e) {
    console.log(e);
  }
}

function navigate(flag) {
  if (flag === true) {
    alert("Click On Login button to redirect to the login page");
    let log = document.getElementById("log");
    log.style.display = "block";

    let sign = document.getElementById("sign");
    sign.style.display = "none";
  }
}
