

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

// function render prouduct ()
 

const itemImgDiv = document.querySelector('.item__img'); // Div for the image
const title = document.getElementById('title'); // Product title
const price = document.getElementById('price'); // Product price
const description = document.getElementById('description'); // Product description
const colorSelect = document.getElementById('colors'); // Dropdown for color selection
const descriptionTitle = document.querySelector('.item__content__description__title'); // Description title
const itemContent = document.querySelector('.item__content'); // Main content div
let product = {
    altTxt: "Photo of a blue sofa, two seats",
    colors: ["Blue", "White", "Black"],
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "http://localhost:3000/images/kanap01.jpeg",
    name: "Kanap Sinopé",
    price: 1849,
    _id: "107fb5b75607497b96722bda5b504926",
  };

let productName = product.name; // "Kanap Sinopé"
let productPrice = product.price; // 1849
let productDescription = product.description; // Description text
let productImageUrl = product.imageUrl; // Image URL
let productAltText = product.altTxt; // Alt text for the image
let productColors = product.colors;

console.log("Name:", productName);
console.log("Price:", productPrice);
console.log("Description:", productDescription);
console.log("Image URL:", productImageUrl);
console.log("Alt Text:", productAltText);
console.log("Colors:", productColors);






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





// document.createElement
// appendChild 
// textContent
// for each loop
// select and modify img and src 

  
  
