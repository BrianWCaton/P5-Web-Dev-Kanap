// todo 1: Fetch and display all products dynamically
async function displayAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();

    const productContainer = document.getElementById("items"); // Updated to match your HTML container ID
    productContainer.innerHTML = ""; // Clear any existing content

    products.forEach((product) => {
      const productElement = document.createElement("a");
      productElement.href = `./product.html?id=${product.id}`; // Link to the product page

      const article = document.createElement("article");
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.name;

      const name = document.createElement("h3");
      name.classList.add("productName");
      name.textContent = product.name;

      const description = document.createElement("p");
      description.classList.add("productDescription");
      description.textContent = product.description;

      article.appendChild(img);
      article.appendChild(name);
      article.appendChild(description);

      productElement.appendChild(article);
      productContainer.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to load products. Please try again later.");
  }
}

// todo 2: Display a single product (e.g., on product details page)
async function displaySingleProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`
    );
    const product = await response.json();

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-description").textContent =
      product.description;
    document.getElementById("product-price").textContent = `$${product.price}`;
  } catch (error) {
    console.error("Error fetching product:", error);
    alert("Failed to load product details. Please try again later.");
  }
}

// todo 3: Add product to cart (using localStorage)
function addToCart(productId) {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartNumber();
    alert("Product added to cart successfully!");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    alert("Failed to add product to cart. Please try again.");
  }
}

// todo 4: Display cart contents
async function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = ""; // Clear existing cart items

  for (const productId of cart) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`
      );
      const product = await response.json();

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="removeFromCart(${productId})">Remove</button>
            `;
      cartContainer.appendChild(cartItem);
    } catch (error) {
      console.error("Error fetching product for cart:", error);
      alert("Failed to load some cart items. Please try again later.");
    }
  }
}

// todo 5: Remove product from cart
function removeFromCart(productId) {
  try {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((id) => id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    alert("Product removed from cart successfully!");
  } catch (error) {
    console.error("Error removing product from cart:", error);
    alert("Failed to remove product from cart. Please try again.");
  }
}

// todo 6: Make an order
async function makeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderDetails = {
    products: cart,
    contact: {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
    },
  };

  try {
    const response = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    });

    if (response.ok) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart"); // Clear cart
    } else {
      alert("Failed to place order. Please try again.");
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("Failed to place order. Please try again later.");
  }
}

// todo 7: Update cart item count
function updateCartNumber() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-number").textContent = cart.length;
  } catch (error) {
    console.error("Error updating cart number:", error);
  }
}

// Run displayAllProducts when the page is ready
document.addEventListener("DOMContentLoaded", displayAllProducts);
