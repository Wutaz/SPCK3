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
  div.classList.add("product");
  productList.appendChild(div);

  div.innerHTML = `
 <div>
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
      <a type="button" class="btn add-btn ">Thêm vào giỏ hàng</a>
      <!-- gia goc -->
      <!-- <s>500.000đ</s> -->
      <!-- phan tram giam gia -->
      <!-- <span>-14%</span>  -->
    </div>
    <div>
    
    </div>
  </div>
  `;
  const addBtn = document.getElementsByClassName("add-btn")[product.order - 1];
  addBtn.onclick = function () {
    addToCart(product);
  };
}

async function addToCart(product) {
  //kiểm tra trạng thái đăng nhập của người dùng
  if (!userId) {
    alert("bạn cần đăng nhập");
    window.location.href = "/login";
  }

  //Kiểm tra sản phẩm đã có sản phẩm hay chx
  let existId = null;

  const q = query(collection(db, "cart"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (cartDoc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = { ...cartDoc.data() };
    data.id = cartDoc.id;

    if (data.productId === product.id) {
      existId = data.id;
    }
  });

  if (!existId) {
    //chưa có trg giỏ hàng
    //them moi
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cart"), {
      userId,
      productId: product.id,
      quantity: 1,
    });
    console.log("Document written with ID: ", docRef.id);
  } else {
    //đẵ có trg giỏ
    const cartRef = doc(db, "cart", existId);

    // Atomically increment the population of the city by 50.
    await updateDoc(cartRef, {
      quantity: increment(1),
    });
  }
  alert("Sản phẩm đã được thêm vào giỏ hàng");
}
