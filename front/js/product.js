document.addEventListener('DOMContentLoaded', async function () {
  
const quantityInput = document.getElementById('quantity');
const itemImg = document.querySelector(".item__img img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colorSelect = document.getElementById("colors");
const itemQuantity = document.getElementById('quantity');
  
  // Get product ID from URL
  function getProductIdFromUrl() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
    }
    
    // Fetch product from API
    async function fetchProduct(productId) {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const product = await response.json();
        return product;
      } catch (error) {
        console.error("Error fetching product:", error.message);
        return null;
      }
    }
    
    
    // Render product details
    const productId = getProductIdFromUrl();
    async function renderProductDetails() {
      if (!productId) {
        console.error("No product ID found in URL.");
        return;
      }
    
      const product = await fetchProduct(productId);
      if (!product) {
        console.error("Product data could not be retrieved.");
        return;
      }
    
      // Update DOM with product details
      const itemImg = document.querySelector(".item__img img");
      const title = document.getElementById("title");
      const price = document.getElementById("price");
      const description = document.getElementById("description");

    
      // Set product details
      itemImg.src = product.imageUrl;
      itemImg.alt = product.altTxt;
      title.textContent = product.name;
      price.textContent = product.price;
      description.textContent = product.description;
    
      // Populate color dropdown
      // const defaultOption = document.createElement("option");
      // defaultOption.value = "";
      // defaultOption.textContent = "--Please, select a color--";
      // colorSelect.appendChild(defaultOption);
    
      product.colors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        colorSelect.appendChild(option);
        
      });
    
      console.log("Product details rendered successfully.");
    }
    
    // Initialize rendering
    renderProductDetails();
    

  

    function addToCart(product, quantity, selectedColor) {   
        // Retrieve the current cart from local storage or create a blank array 
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex((item) => item.id === product._id && item.color === selectedColor);
    console.log('existing product' + existingProductIndex);
        if (existingProductIndex !== -1) {
          // If the product exists, increase the quantity
          cart[existingProductIndex].quantity += quantity;
          console.log("product exists in cart " + quantity );
        } else {
          // If the product does not exist, add it to the cart id, price, color, quantity, name
          cart.push({
            id: product._id,
            name: product.name,
            price: product.price, 
            color: selectedColor,
            quantity: quantity,
            image: product.imageUrl
          });
          console.log("cart " + JSON.stringify(cart));
        }
    
        // Save the updated cart back to local storage
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // // Update the cart count (assuming you have a way to display this)
        // const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
        // localStorage.setItem("cartCount", cartCount + 1);
    
        console.log(`Product "${product.name}" added to the cart successfully.`);

    }
    const addCartButton = document.getElementById('addToCart');
    const product = await fetchProduct(productId);
    addCartButton.addEventListener('click', function(){
      const selectedColor = colorSelect.value;
      const quantity = parseInt(quantityInput.value);
      addToCart(product, quantity, selectedColor);    
    }); 

 function updateCartTotal() {
  let cartPrice = document.getElementById('####')
  
  

 }   
  });

  

  //how to get value of input elements inside the add to cart function to place the information in the cart
  // color and quantity check if id and color match 
  //wrap cart.push in logic check same color and product id if same color and same ID increase quantity if not same color create new item in cart 
  // array method to loop through array to check cart if id matches find ways to filter in arrays 