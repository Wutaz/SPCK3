import getUser from "../helper/getUser.js";
function displayOnNavbar() {
  const loginBlock = document.getElementById("login-block");
  const notLoginBlock = document.getElementById("not-login-block");

  const user = getUser();
  if (user) {
    loginBlock.classList.remove("d-none");
    const navbarUsername = document.getElementById("navbar-username");
    navbarUsername.innerHTML = user.username;
  } else {
    notLoginBlock.classList.remove("d-none");
  }
}
export default displayOnNavbar;
