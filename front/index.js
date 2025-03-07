window.onload = async () => {
  const email = sessionStorage.getItem("email");
  if (email) {
    document.getElementById("loginSpan").innerHTML =
      email + ` <button id="logout">logout</button>`;
  }
  // axios.defaults.withCredentials = true;
  console.log(axios);
  let productList = await fetch("getAllProducts", { method: "GET" });
  console.log(productList);
  productList = await productList.json();
  console.log(productList);

  let productListDiv = ``;
  productList.forEach((item) => {
    productListDiv += `<div class="card m-3" style="width: 10rem;">
                  <img src="img/${item.pimg}" class="card-img-top" alt="...">
                  <div class="card-body">
                    <b class="card-title">${item.prodname}</b>
                    <p class="card-text text-danger">${item.price}원</p>
                    <a href="#" class="btn btn-outline-info" id="addCart">장바구니 담기</a>
                  </div>
                </div>`;
  });
  document.getElementById("productListDiv").innerHTML = productListDiv;
};

document.getElementById("signupBtn").addEventListener("click", async () => {
  const nickname = document.getElementById("nickname").value;
  const email = document.getElementById("email").value;
  const pwd = document.getElementById("pwd").value;
  const data = { nickname, email, pwd };
  let response = await fetch("insertMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });
  response = await response.json();
  console.log(response);
  if (response.msg === "ok") {
    console.log("ok");
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("signupModal")
    );
    modal.hide();
    //hero icons
    //     document.getElementById("loginSpan").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" width="24" height="24">
    //   <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    // </svg>`;
    document.getElementById("signupLi").remove();
  } else {
    alert(response.msg);
  }
});

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const pwd = document.getElementById("loginPwd").value;
  const data = { email, pwd };
  let response = await axios.post("login", data);
  //response = await response.json();
  console.log(response);
  alert(response.data.msg);
  if (response.data.msg === "ok") {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("loginModal")
    );
    modal.hide();
    document.getElementById("loginSpan").innerHTML =
      email + ` <button id="logout">logout</button>`;
    window.sessionStorage.setItem("email", email);
  }
});

document.getElementById("productListDiv").addEventListener("click", (event) => {
  if (event.target.id == "addCart") {
    axios.post("addCart", {});
  }
});

document.getElementById("loginSpan").addEventListener("click", (event) => {
  if (event.target.id == "logout") {
    sessionStorage.removeItem("email");
    window.location.reload();
  }
});
