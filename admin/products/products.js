import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const tbody = document.getElementById("tbody");

async function fetchProducts() {
  tbody.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "products"));
  let i = 1;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    const product = { ...doc.data(), id: doc.id, order: i };
    renderProduct(product);
    i++;
  });
}

fetchProducts();
function renderProduct(product) {
  const tr = document.createElement("tr");
  tbody.appendChild(tr);

  tr.innerHTML = `<tr>
  <th scope="row">${product.order}</th>
  <td>
    <img
      width="100"
      height="100"
      style="object-fit: cover"
      src="${product.image}"
      alt=""
    />
  </td>
  <td>${product.name}</td>
  <td>${product.price}đ</td>
  <td>${product.description}</td>
  <td>${product.category}</td>

  <td>
    <a href="./edit/index.html?id=${product.id}" class="btn-edit btn btn-sm btn-secondary me-2">Chỉnh</a>
    <button class="btn-del btn btn-sm btn-danger delete-btn">Xóa</button>
  </td>
</tr>`;

  const deleteBBtn =
    document.getElementsByClassName("delete-btn")[product.order - 1];
  deleteBBtn.onclick = function () {
    deleteProduct(product);
  };
}
async function deleteProduct(product) {
  const isConfirm = confirm("Bạn Chắc Chưa" + product.name);
  if (!isConfirm) {
    return;
  }
  //xoa sp
  await deleteDoc(doc(db, "products", product.id));
  fetchProducts();
}
