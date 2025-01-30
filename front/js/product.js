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
  async function renderProductDetails() {
    const productId = getProductIdFromUrl();
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
    const colorSelect = document.getElementById("colors");
  
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
  

  const addCartButton = document.querySelector;
  addCartButton.addEventListener('click') =>{

  }
  async function addToCart(product) {
    try {
      // Fetch the product data from the API
      const response = await fetch(`http://localhost:3000/api/products/${product.id}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`);
      }
  
      const productData = await response.json();
  
      // Retrieve the current cart from local storage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the product is already in the cart
      const existingProduct = cart.find(item => item.id === product.id);
  
      if (existingProduct) {
        // If the product exists, increase the quantity
        existingProduct.quantity += 1;
      } else {
        // If the product does not exist, add it to the cart
        cart.push({ ...productData, quantity: 1 });
      }
  
      // Save the updated cart back to local storage
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Update the cart count (assuming you have a way to display this)
      const cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
      localStorage.setItem("cartCount", cartCount + 1);
  
      console.log(`Product "${productData.name}" added to the cart successfully.`);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  }
