

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
// 
// create variable and get URL Search Params from URL 
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
const productId = getProductIdFromUrl();
console.log(productId);
// create variable and get ID param from those params 
// pass that variable into fetch product 
// use that variable in fetch URL 


// pulling the data from the API to use later in code
async function fetchProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        const product = await response.json();
        console.log(product);
        return product;

    } catch (error) {
        console.error("error fetching product", error.message);
        return null;
    }
}
fetchProduct(productId);

async function renderProductDetails() {
    const productId = getProductIdFromUrl();
    if (!productId) {
        console.error("No product ID found in URL.");
        return;
    }
    const product = await fetchProduct(productId);
    if (!product) return;
    console.log(product); // Render product details here
}

let productDescription = document.getElementbyId
// function render prouduct ()
//look into html for all variables you need 
// set each const equal to info from api 
// const product = await fetchProduct(productId);
// ex descritption getElement bY id desctiption.textContent = "alkdnaflknd";

//todo 1 
// async function renderProduct() {
//     const productContainer = document.getElementById('items');
//     const products = await fetchProducts();
//     console.log(products);  
//     products.forEach(product => {
//         console.log(product);
//         let productElement = document.createElement('div');
//         productElement.innerHTML = `
//         <a href="./product.html?id=${product._id}">
//             <article>
//               <img src="${product.imageUrl}" alt="${product.altTxt}">
//              <h3 class="productName">${product.name}</h3>
//              <p class="productDescription">${product.description}</p>
//             </article>
//           </a>
//         `;    
//         productContainer.appendChild(productElement);
//     });

// }

renderProducts();



// document.createElement
// appendChild 
// textContent
// for each loop
// select and modify img and src 

  
  
