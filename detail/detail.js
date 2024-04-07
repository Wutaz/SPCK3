import products from "../data/productsmn.js";
import formatCurrency from "../utils/formatCurrency.js";

const name = document.getElementById("name");
const image = document.getElementById("image");
const price = document.getElementById("price");
const desc = document.getElementById("desc");

const params = new URL(document.location).searchParams;
const productTd = params.get("id");
console.log(productTd);

// ham call back
const product = products.find(function (p) {
  // if (p.id > 4){
  //     return true
  // } else {
  //     return false
  // }
  return p.id == productTd;
});
if (product) {
  name.innerHTML = product.name;
  price.innerHTML = formatCurrency(product.price);
  desc.innerHTML = product.desc;
  image.setAttribute("src", product.image);
}
