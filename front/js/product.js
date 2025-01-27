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
    colorSelect.innerHTML = ""; // Clear existing options
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Please, select a color--";
    colorSelect.appendChild(defaultOption);
  
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
  

  function addToCart(productId, productName, productPrice, selectedColor, quantity) {
    if (!selectedColor || quantity <= 0) {
        console.error("Invalid color or quantity. Please select a color and specify a valid quantity.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const existingItem = cart.find(item => item.productId === productId && item.selectedColor === selectedColor);

    if (existingItem) {
      
        existingItem.quantity += quantity;
    } else {
     
        cart.push({
            productId,
            productName,
            productPrice,
            selectedColor,
            quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    
    calculateTotal(cart);

    console.log("Item added to cart successfully!");
}


function calculateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    console.log(`Total Price: €${total.toFixed(2)}`);
    return total;
}