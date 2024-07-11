import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import formatCurrency from "/utils/formatCurrency.js";

const auth = getAuth();
let userId;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    userId = user.uid;
    fetchProducts();
  } else {
    // User is signed out
    return;
  }
});

const tbody = document.getElementById("tbody");
const SHIPPING_FEE = 30000;
let subtotal = 0;

async function fetchProducts() {
  // console.log(userId);
  tbody.innerHTML = "";
  if (!userId) return;
  const q = query(collection(db, "cart"), where("userId", "==", userId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (cartDoc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = { ...cartDoc.data() };
    data.id = cartDoc.id;
    const docRef = doc(db, "products", data.productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      data.product = { ...docSnap.data() };
      console.log("Document data:", docSnap.data());
      renderProduct(data);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    const subtotalEl = document.getElementById("subtotal");
    const shippngEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    subtotalEl.innerHTML = `${formatCurrency(subtotal)} `;
    shippngEl.innerHTML = `${formatCurrency(SHIPPING_FEE)} `;
    totalEl.innerHTML = `${formatCurrency(subtotal + SHIPPING_FEE)} `;
    // console.log(doc.id, " => ", doc.data());
  });

  // const querySnapshot = await getDocs(collection(db, "products"));
  // let i = 1;
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   //   console.log(doc.id, " => ", doc.data());
  //   const product = { ...doc.data(), id: doc.id, order: i };
  //   renderProduct(product);
  //   i++;
  // });
}

fetchProducts();

function renderProduct(item) {
  console.log(item);
  const singleTotal = Number(item.product.price) * Number(item.quantity);
  subtotal += singleTotal;
  const tr = document.createElement("tr");
  tbody.appendChild(tr);

  tr.innerHTML = `<td>
                    <img
                      src="${item.product.image}"
                      alt=""
                      class="product-img"
                    />
                  </td>
                  <td>
                    <a href="" class="text-decoration-none text-black">
                      ${item.product.name}</td>
                    </a>
                  <td class="price">${formatCurrency(item.product.price)}</td>
                  </td>

                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button type="button" class="btn btn-light">-</button>
                      <button
                        type="button"
                        class="btn btn-light select-text"
                        disabled
                      >
                        ${item.quantity}
                      </button>
                      <button type="button" class="btn btn-light">+</button>
                    </div>
                  </td>
                  <td>
                    <button class="btn btn-del btn-sm btn-outline-danger">
                      <i class="fa-regular fa-trash-can"></i>
                    </button>
                  </td>`;

  // const deleteBBtn =
  //   document.getElementsByClassName("delete-btn")[product.order - 1];
  // deleteBBtn.onclick = function () {
  //   deleteProduct(product);
  // };
}
