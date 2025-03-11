function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem('cart')) || []; 
}

function displayCart() {
  const cartItems = getCartFromLocalStorage();
  console.log(cartItems);
  const cartContainer = document.getElementById('cart__items');
  cartContainer.innerHTML = ''; 

  let totalQuantity = 0;
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
      const article = document.createElement('article');
      article.classList.add('cart__item');
      article.dataset.id = item.id;
      article.dataset.color = item.color;

      article.innerHTML = `
          <div class="cart__item__img">
              <img src="${item.image}" alt="Photo of a ${item.name}">
          </div>
          <div class="cart__item__content">
              <div class="cart__item__content__description">
                  <h2>${item.name}</h2>
                  <p>${item.color}</p>
                  <p>€${item.price.toFixed(2)}</p>
              </div>
              <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                      <p>Quantity: </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-index="${index}">Delete</p>
                  </div>
              </div>
          </div>
      `;

      article.querySelector('.deleteItem').addEventListener('click', function () {
          removeFromCart(index);
      });

      cartContainer.appendChild(article);

      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
  });

  document.getElementById('totalQuantity').textContent = totalQuantity;
  document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); 
  localStorage.setItem("cart", JSON.stringify(cart)); 
  displayCart(); 
}

function updateQuantity(itemId, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(item => item.id === itemId);
  if (item) {
      item.quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(cart)); 
      displayCart(); 
  }
} 

document.addEventListener('DOMContentLoaded', () => {
  displayCart();
});

function productExistsInCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.some(item => item.id === productId);
}
const orderForm = document.querySelector("#order-form");
orderForm.addEventListener ('submit', async function(event){
  event.preventDefault();
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');
  
  const customer = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value
  }
  const cart = JSON.parse(localStorage.getItem('cart'));
		
		const cartProducts = [];
		
		if (cart.length === 0) {
			return alert('Nothing in the cart.');
		}
		// for (let i = 0; i < cart.length; i++) {
		// 	cartProducts.push(cart[i].productId);
		// }

cart.forEach(function(cartItem){
  cartProducts.push(cartItem.productId);

});

  const order = {
    contact: customer,
    products: cartProducts,
  }

  try {
    const response = await fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data));
    // window.location.href=`./confirmation.html?orderId=${data.orderId}`; 
    // clear local storage// 
    // return true;
  } catch (error) {
    
  }

});

