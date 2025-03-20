

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
function validateForm(){
    inputs.forEach(function (input){
        if (!input.value){
            const 
        }
    });
}
renderProducts();


// async function displaySingleProduct(id) {
//     const singleProduct = fetch singleProduct();
//     console.log(singleProduct)}


// # 3 add to cart function 

  
