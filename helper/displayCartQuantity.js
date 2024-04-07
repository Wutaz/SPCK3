import getUser from "./getUser.js";

function displayCartQuantity() {
  const CartQuantity = document.getElementById("cart-quantity");
  const userList = JSON.parse(localStorage.getItem("userList"));
  const currentUser = getUser();

  if (!currentUser) {
    CartQuantity.innerHTML = 0;
  } else {
    const userWithCart = userList.find(function (u) {
      return u.username === currentUser.username;
    });

    const cart = userWithCart.cart || [];

    CartQuantity.innerHTML = cart.length;
  }
}

export default displayCartQuantity;
