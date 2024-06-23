import { app, db } from "/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
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
const params = new URLSearchParams(document.location.search);
const productId = params.get("id");
if (productId) {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    //hiển thị sp ra trang chi tiết sp
    const name = document.getElementById("name");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const image = document.getElementById("image");
    //...
    const product = { ...docSnap.data(), id: productId };
    name.innerHTML = docSnap.data().name;
    price.innerHTML = docSnap.data().price + "đ";
    description.innerHTML = docSnap.data().description;
    image.setAttribute("src", docSnap.data().image);
    // category.innerHTML = docSnap.data().category;
    const addBtn = document.getElementById("add-btn");
    addBtn.onclick = function () {
      addToCart(product);
    };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
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
