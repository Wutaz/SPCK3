import { app, db } from "/firebase.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

const querySnapshot = await getDocs(collection(db, "products"));
let i = 1;
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  const product = { ...doc.data(), id: doc.id, order: i };
  renderProduct(product);
  i++;
});

function renderProduct(product) {
  const tbody = document.getElementById("tbody");
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
  <td>${product.descrition}</td>
  <td>${product.category}</td>

  <td>
    <a href="./edit/index.html?id=${product.id}" class="btn btn-sm btn-secondary me-2">Chỉnh sửa</a>
    <button class="btn btn-sm btn-danger">Xóa</button>
  </td>
</tr>`;
}
