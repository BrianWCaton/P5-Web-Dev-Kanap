

// function fetchProducts() {
//     fetch('http://localhost:3000/api/products')
//         .then(function(response){
//             return response.json();
//         })
//         .then(function(data){
//             console.log(data);
//         })
//         .catch(function(error){
//             console.error(error);
//         })
// }


// pulling the data from the API to use later in code
async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products");

        //console.log(response);
        const products = await response.json();
        //console.log(products);
        return products;

    } catch (error) {
        console.error("error fetching products", error.message);
        return [];
    }
}
//todo 1 
async function renderProducts() {
    const productContainer = document.getElementById('items');
    const products = await fetchProducts();
    console.log(products);  
    products.forEach(product => {
        console.log(product);
        let productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
        <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
             <h3 class="productName">${product.name}</h3>
             <p class="productDescription">${product.description}</p>
            </article>
          </a>
        `;    
        productContainer.appendChild(productElement);
    });

}

renderProducts();


// async function displaySingleProduct(id) {
//     const singleProduct = fetch singleProduct();
//     console.log(singleProduct)

// }
// document.createElement
// appendChild 
// textContent
// for each loop
// select and modify img and src 

// # 3 add to cart function 
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
  
