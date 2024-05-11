import { app, db } from "/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Lấy ra phần tử (element)
const loginForm = document.getElementById("login-Form");
const loginGoogleBtn = document.getElementById("google");
// console.log(registerForm);
// const userList = JSON.parse(localStorage.getItem("userList")) || [];

// loginBtn.innerHTML = 'Dang xuat abc xyz'
// console.log(loginBtnText)

// Xu ly khi nguoi dung bam nut Dang nhap
const auth = getAuth();

loginForm.onsubmit = function (event) {
  event.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");
  // console.log(usernameError, passwordError, loginError)

  // kiem tra

  if (email.value === "") {
    emailError.innerHTML = "Vui lòng nhập tên đăng nhập";
  } else {
    emailError.innerHTML = "";
  }
  if (password.value === "") {
    passwordError.innerHTML = "Vui lòng nhập mật khẩu";
  } else {
    passwordError.innerHTML = "";
  }

  // else {
  //   loginError.innerHTML = "";
  //   window.location.href = "../index.html";
  // }
  //   const existingUser = userList.find(function (user) {
  //     return user.username === username.value && user.password === password.value;
  //   });
  //   if (!existingUser) {
  //     loginError.innerHTML = "Sai tên đăng nhập hoặc mật khẩu";
  //   } else {
  //     loginError.innerHTML = "";
  //     //Dang ky thanh cong
  //     const user = {
  //       username: username.value,
  //       password: password.value,
  //     };
  //     localStorage.setItem("user", JSON.stringify(user));
  //     loginError.innerHTML = "";
  //     //chuyen den trang dang nhap
  //     window.location.href = " ../index.html";
  //   }
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Đăng nhập thành công");
      window.location.href = "/index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

//local storage
// localStorage.setItem("message", "hello");

// const value = localStorage.getItem("message");
// console.log(value)

//xử lý đăng nhập Google
loginGoogleBtn.onclick = function () {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      alert("tc");
      window.location.href = "/admin";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
};
