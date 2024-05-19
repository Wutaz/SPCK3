import { app, db } from "/firebase.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

const addForm = document.getElementById("add-form");

addForm.onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const descrition = document.getElementById("descrition");
  const image = document.getElementById("image");
  const category = document.getElementById("category");
  //up anh
  const storage = getStorage();
  const imagePath = "products/" + new Date().valueOf();
  const storageRef = ref(storage, imagePath);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, image.files[0]).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    console.log(snapshot);
  });
};
