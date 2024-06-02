import { app, db } from "/firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

//kiểm tra uẻ đã đăng nhập chx
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    window.location.href = "/admin/products";
    // ...
  } else {
    // User is signed out
    window.location.href = "/login";
    // ...
  }
});
function renderProduct(product) {
  const productList = document.getElementById("product-list");
  const div = document.createElement("div");
  productList.appendChild(div);

  div.innerHTML = `
<div class="product" >
  <a href="/product details/index.html?id=${product.id}">
    <img
      class="product-img"
      src="${product.image}"
      alt=""
    />
  </a>
  <a>
  ${product.name}
  </a>
  <div class="product-prices">
    <span class="new-price">${product.price}đ</span>
    <!-- gia goc -->
    <!-- <s>500.000đ</s> -->
    <!-- phan tram giam gia -->
    <!-- <span>-14%</span>  -->
  </div>


</div>`;
}
