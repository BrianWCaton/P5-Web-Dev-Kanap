console.log('hello mom');

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
async function fetchProducts() {
    // debugger;
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

async function renderProducts() {
    const products = await fetchProducts();
    console.log(products);  

}

// document.createElement
// appendChild 
// textContent
// for each loop
// select and modify img and src 
