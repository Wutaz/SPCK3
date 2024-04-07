// Lấy ra phần tử (element)
const registerForm = document.getElementById("register-form");
// console.log(registerForm);
const userList = JSON.parse(localStorage.getItem("userList")) || [];

// loginBtn.innerHTML = 'Dang xuat abc xyz'
// console.log(loginBtnText)

// Xu ly khi nguoi dung bam nut Dang nhap

registerForm.onsubmit = function (event) {
  event.preventDefault();
  console.log("preventDefault");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const repassword = document.getElementById("repassword");

  const usernameError = document.getElementById("username-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const repasswordError = document.getElementById("repassword-error");
  const registerError = document.getElementById("register-error");
  // console.log(usernameError, passwordError, loginError)

  // kiem tra

  if (username.value === "") {
    usernameError.innerHTML = "Vui lòng nhập tên đăng ký";
  } else {
    usernameError.innerHTML = "";
  }
  if (email.value === "") {
    emailError.innerHTML = "Vui lòng nhập email";
  } else {
    usernameError.innerHTML = "";
  }
  if (password.value === "") {
    passwordError.innerHTML = "Vui lòng nhập mật khẩu";
  } else {
    passwordError.innerHTML = "";
  }
  if (repassword.value === "") {
    repasswordError.innerHTML = "Vui lòng nhập lại Mật khẩu";
  } else if (repassword.value !== password.value) {
    repasswordError.innerHTML = "Mật khẩu không trùng";
  } else {
    repasswordError.innerHTML = "";
  }
  // const existingUser = userList.find(function (user) {
  //   return user.username === username.value;
  // });
  // if (existingUser) {
  //   registerError.innerHTML = "Tên đăng ký đã được sử dụng";
  // } else {
  //   //Dang ky thanh cong
  //   const newuser = {
  //     username: username.value,
  //     password: password.value,
  //   };
  //   userList.push(newuser);
  //   localStorage.setItem("userList", JSON.stringify(userList));
  //   registerError.innerHTML = "";
  //   //chuyen den trang dang nhap
  //   window.location.href = " ../login";
  // }
  console.log("thanh cong");
};

//local storage
// localStorage.setItem("message", "hello");

// const value = localStorage.getItem("message");
// console.log(value);
