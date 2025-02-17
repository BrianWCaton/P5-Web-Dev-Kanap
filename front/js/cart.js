


const cartDisplay = document.getElementById()
const cartColor = document.getElementById()
const cartPrice = document.getElementById()

function getCartFromLocalStorage() {

    const cartData = localStorage.getItem('cart');
 
    return cartData ? JSON.parse(cartData) : [];
  }
  

  function saveCartToLocalStorage() {

    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  

  function displayCart() {
    const cartContainer = document.getElementById('cart__items');
    cartContainer.innerHTML = ''; 
  
    let totalQuantity = 0;
    let totalPrice = 0;
  
    cartItems.forEach(item => {
      const article = document.createElement('article');
      article.classList.add('cart__item');
      article.dataset.id = item.id;
      article.dataset.color = item.color;
  
      article.innerHTML = `
        <div class="cart__item__img">
          <img src="${item.imgSrc}" alt="Photo of a ${item.name}">
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
              <p class="deleteItem">Delete</p>
            </div>
          </div>
        </div>
      `;
  
      article.querySelector('.deleteItem').addEventListener('click', () => {
        deleteItem(item.id);
      });
  
    
      cartContainer.appendChild(article);
  
     
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
 
    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
  }
  

  function deleteItem(itemId) {

    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCartToLocalStorage();
    displayCart(); 
  }
  

  function updateQuantity(itemId, quantity) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
      saveCartToLocalStorage(); 
      displayCart(); 
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    cartItems = getCartFromLocalStorage();
    displayCart();
  });