import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const querySnapshot = await getDocs(collection(db, "products"));
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
  <div class="sp-container">
  <div class="product-list">
    <div class="product-imgs">
      <a href="">
        <img
          class="product-img"
          src="${product.image}"
          alt=""
        />
      </a>
    </div>
    <div class="product-texts mx-2">
      <h1 class="product-name" href=""
          >${product.name}
    </h1>
        <div class="product-prices">
          <span class="new-price">${product.price}đ</span>
          
          <span href="">${product.description}</span>
        </div> 
        <div>  
          <button class="btn-sp" type="submit">Mua ngay</button>
          <button class="btn-sp" type="submit">
          <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      
    </div>
  </div>
</div>`;
}
// xu ly dang xuat
// const logoutBtn = document.getElementById("logout-btn");
// logoutBtn.onclick = function () {
//   localStorage.removeItem("user");
//   window.location.href = "/index.html";
// };
