

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
// create variable and get ID param from those params 
// pass that variable into fetch product 
// use that variable in fetch URL 


// pulling the data from the API to use later in code
async function fetchProduct() {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${product._id}`);

        //console.log(response);
        const product = await response.json();
        console.log(product);
        return product;

    } catch (error) {
        console.error("error fetching product", error.message);
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



// document.createElement
// appendChild 
// textContent
// for each loop
// select and modify img and src 

  
  
