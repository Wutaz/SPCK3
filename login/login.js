// Lấy ra phần tử (element)
const loginForm = document.getElementById("login-Form");
// console.log(registerForm);
const userList = JSON.parse(localStorage.getItem("userList")) || [];

// loginBtn.innerHTML = 'Dang xuat abc xyz'
// console.log(loginBtnText)

// Xu ly khi nguoi dung bam nut Dang nhap

loginForm.onsubmit = function (event) {
  event.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const usernameError = document.getElementById("username-error");
  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");
  // console.log(usernameError, passwordError, loginError)

  // kiem tra

  if (username.value === "") {
    usernameError.innerHTML = "Vui lòng nhập tên đăng nhập";
  } else {
    usernameError.innerHTML = "";
  }
  if (password.value === "") {
    passwordError.innerHTML = "Vui lòng nhập mật khẩu";
  } else {
    passwordError.innerHTML = "";
  }
  if (username.value !== "phong" || password.value !== "123456") {
    loginError.innerHTML = "Sai tên đăng nhập hoặc mật khẩu";
  }
  // else {
  //   loginError.innerHTML = "";
  //   window.location.href = "../index.html";
  // }
  const existingUser = userList.find(function (user) {
    return user.username === username.value && user.password === password.value;
  });
  if (!existingUser) {
    loginError.innerHTML = "Sai tên đăng nhập hoặc mật khẩu";
  } else {
    loginError.innerHTML = "";
    //Dang ky thanh cong
    const user = {
      username: username.value,
      password: password.value,
    };
    localStorage.setItem("user", JSON.stringify(user));
    loginError.innerHTML = "";
    //chuyen den trang dang nhap
    window.location.href = " ../index.html";
  }
};

//local storage
// localStorage.setItem("message", "hello");

// const value = localStorage.getItem("message");
// console.log(value)
