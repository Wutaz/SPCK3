import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const q = query(collection(db, "products"), where("category", "==", "Gundam"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  const product = { ...doc.data(), id: doc.id };
  renderProduct(product);
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
// xu ly dang xuat
// const logoutBtn = document.getElementById("logout-btn");
// logoutBtn.onclick = function () {
//   localStorage.removeItem("user");
//   window.location.href = "/index.html";
// };
