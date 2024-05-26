import { app, db } from "/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

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

    name.innerHTML = docSnap.data().name;
    price.innerHTML = docSnap.data().price + "đ";
    description.innerHTML = docSnap.data().description;
    image.setAttribute("src", docSnap.data().image);
    // category.innerHTML = docSnap.data().category;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
