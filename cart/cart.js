import displayOnNavbar from '../helper/displayOnNavbar.js'
import displayCartQuantity from '../helper/displayCartQuantity.js'
import getUser from '../helper/getUser.js'
import formatCurrency from '../utils/formatCurrency.js'

displayOnNavbar()
displayCartQuantity()

const SHIPPING_FEE = 30000

const tbody = document.getElementById('tbody')

const userList = JSON.parse(localStorage.getItem('userList')) || []
const currentUser = getUser()

// Hien thi danh sach sp trong gio hang
function renderCartItems() {
  if (currentUser) {
    const userWithCart = userList.find(function (u) {
      return u.username === currentUser.username
    })

    const cart = userWithCart.cart || []

    tbody.innerHTML = ''
    let subtotalMoney = 0

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]

      // Tạo ra các thẻ và append vào
      const productImg = document.createElement('img')
      productImg.classList.add('product-img')
      productImg.setAttribute('src', item.product.image)

      const imgTd = document.createElement('td')
      imgTd.appendChild(productImg)

      const productName = document.createElement('a')
      productName.innerHTML = item.product.name
      productName.setAttribute(
        'href',
        '/detail/index.html?id=' + item.product.id
      )
      productName.classList.add('text-decoration-none', 'text-black')

      const nameTd = document.createElement('td')
      nameTd.appendChild(productName)

      const priceTd = document.createElement('td')
      priceTd.innerHTML = formatCurrency(item.product.price)

      const minusBtn = document.createElement('btn')
      minusBtn.innerHTML = '-'
      minusBtn.classList.add('btn', 'btn-light')

      const plusBtn = document.createElement('btn')
      plusBtn.innerHTML = '+'
      plusBtn.classList.add('btn', 'btn-light')

      const quantityBtn = document.createElement('btn')
      quantityBtn.classList.add('btn', 'btn-light', 'select-text')
      quantityBtn.disabled = true
      quantityBtn.innerHTML = item.quantity

      const btnGroup = document.createElement('div')
      btnGroup.classList.add('btn-group')
      btnGroup.appendChild(minusBtn)
      btnGroup.appendChild(quantityBtn)
      btnGroup.appendChild(plusBtn)

      const quantityTd = document.createElement('td')
      quantityTd.appendChild(btnGroup)

      const deleteBtn = document.createElement('btn')
      deleteBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
      deleteBtn.classList.add('btn', 'btn-sm', 'btn-outline-danger')

      // Xu ly khi nguoi dung click xoa item
      deleteBtn.onclick = function () {
        deleteCartItem(i)
      }

      const deleteTd = document.createElement('td')
      deleteTd.appendChild(deleteBtn)

      const tr = document.createElement('tr')
      tr.appendChild(imgTd)
      tr.appendChild(nameTd)
      tr.appendChild(priceTd)
      tr.appendChild(quantityTd)
      tr.appendChild(deleteTd)

      tbody.appendChild(tr)

      subtotalMoney += item.quantity * item.product.price
    }

    // Hiển thị thông tin tiền
    const subtotal = document.getElementById('subtotal')
    const shippingFee = document.getElementById('shipping-fee')
    const total = document.getElementById('total')

    shippingFee.innerHTML = formatCurrency(SHIPPING_FEE)
    subtotal.innerHTML = formatCurrency(subtotalMoney)
    total.innerHTML = formatCurrency(subtotalMoney + SHIPPING_FEE)
  }
}

renderCartItems()

function deleteCartItem(itemIndex) {
  const userWithCart = userList.find(function (u) {
    return u.username === currentUser.username
  })

  const cart = userWithCart.cart || []
  const userIndex = userList.indexOf(userWithCart)

  // Xoa item trong cart
  cart.splice(itemIndex, 1)

  userWithCart.cart = cart
  userList[userIndex] = userWithCart

  // Cap nhat len local storage
  localStorage.setItem('userList', JSON.stringify(userList))

  renderCartItems()
  displayCartQuantity()
}

// Xu ly dat hang
const checkoutBtn = document.getElementById('checkout-btn')
checkoutBtn.onclick = function () {
  if (currentUser) {
    const userWithCart = userList.find(function (u) {
      return u.username === currentUser.username
    })

    const userIndex = userList.indexOf(userWithCart)

    userWithCart.cart = []
    userList[userIndex] = userWithCart

    // Cap nhat len local storage
    localStorage.setItem('userList', JSON.stringify(userList))

    renderCartItems()
    displayCartQuantity()

    alert('Đặt hàng thành công')
  }
}
