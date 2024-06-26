import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  addDoc,
  updateDoc,
  increment,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const auth = getAuth();
let userId;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    userId = user.uid;
  } else {
    // User is signed out
    return;
  }
});

const querySnapshot = await getDocs(collection(db, "products"));
let i = 1;
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  const product = { ...doc.data(), id: doc.id, order: i };
  renderProduct(product);
});

function renderProduct(product) {
  const productList = document.getElementById("product-list");
  const div = document.createElement("div");
  productList.appendChild(div);

  div.innerHTML = `
 <div class="product">
    <a>
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
    <div>
    
    </div>
  
  </div>`;
}
