import products from "../data/productsmn.js";
import formatCurrency from "../utils/formatCurrency.js";
import displayOnNavbar from "../helper/displayOnNavbar.js";
import getUser from "../helper/getUser.js";
import displayCartQuantity from "../helper/displayCartQuantity.js";

displayOnNavbar();
displayCartQuantity();

function renderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    //tao anh
    const productImage = document.createElement("img");
    productImage.classList.add("product-img");
    productImage.setAttribute("src", product.image);
    //tao a boc anh
    const productImageLink = document.createElement("a");
    productImageLink.setAttribute(
      "href",
      "../detail/index.html?id=" + product.id
    );
    productImageLink.appendChild(productImage);
    //tao ten
    const productName = document.createElement("a");
    productName.setAttribute("href", "../detail/index.html?id=" + product.id);
    productName.classList.add("product-name");
    productName.innerHTML = product.name;
    //tao gia ban
    const newPrice = document.createElement("span");
    newPrice.classList.add("new-spwice");
    newPrice.innerHTML = formatCurrency(product.price);
    //tao the div boc cac gia ban
    const productPrices = document.createElement("div");
    productPrices.classList.add("product-pricec");
    productPrices.appendChild(newPrice);

    //tao nut them vao gio hang
    const appToCartBtn = document.createElement("button");
    appToCartBtn.innerHTML = "thêm vào giỏ hàng";
    appToCartBtn.classList.add("btn", "btn-primary", "w-100", "mt-3");

    // Gọi hàm xư lý thêm vào giỏ hàng
    appToCartBtn.onclick = function () {
      appToCart(product);
    };
    //taoj the product
    const productTag = document.createElement("div");
    productTag.classList.add("product");
    productTag.appendChild(productImageLink);
    productTag.appendChild(productName);
    productTag.appendChild(productPrices);
    productTag.appendChild(appToCartBtn);

    //tao te product wrapper
    const productWrpper = document.createElement("div");
    productWrpper.classList.add(
      "col-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-3",
      "p-3"
    );
    productWrpper.appendChild(productTag);

    //gan nhung sp tao dong vao trong product list
    productList.appendChild(productWrpper);
  }
}
renderProducts(products);
// tìm kiếm sane phẩm\
const searchInput = document.getElementById("search-input");
searchInput.oninput = function (event) {
  const text = event.target.value;
  searchProducts(text);
};

function searchProducts(text) {
  const productCopy = [...products];
  const searchText = text.toLowerCase().trim();
  if (searchText === "") {
    renderProducts(productCopy);
  } else {
    const result = productCopy.filter(function (p) {
      const productName = p.name;
      const productNameLowwer = productName.toLowerCase();
      return productNameLowwer.includes(searchText);
    });
    renderProducts(result);
  }
}

const navbarSearchForm = document.getElementById("navbar-search-form");
const navbarSearchInput = document.getElementById("navbar-search");

navbarSearchForm.onsubmit = function (event) {
  event.preventDefault();
  const text = navbarSearchInput.value;
  searchProducts(text);
};

const userList = JSON.parse(localStorage.getItem("userList")) || [];
console.log(userList);

// xu lyu them vao gio hang
function appToCart(product) {
  const currentUser = getUser();
  if (!currentUser) {
    alert("Bạn phải đăng nhập đã");
    window.location.href = "/login";
  } else {
    const userWithCart = userList.find(function (u) {
      return u.username === currentUser.username;
    });
    const userIndex = userList.indexOf(userWithCart);

    const cart = userWithCart.cart || [];

    //kiem tra sp da co trong gio hang chx
    const cartItem = cart.find(function (item) {
      return item.product.id === product.id;
    });

    if (cartItem) {
      //sp da co trong gio
      const itemIndex = cart.indexOf(cartItem); //vi tri cua sp trong gio
      cartItem.quantity++; // tang so luong len 1

      cart[itemIndex] = cartItem;
    } else {
      //sp chua co trong gio hang
      const newItem = {
        product: product,
        quantity: 1,
      };
      cart.unshift(newItem);
    }
    userWithCart.cart = cart;
    userList[userIndex] = userWithCart;

    //cap nhat len local strage
    localStorage.setItem("userList", JSON.stringify(userList));
  }
}
// xu ly dang xuat
const logoutBtn = document.getElementById("logout-btn");
logoutBtn.onclick = function () {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
};
