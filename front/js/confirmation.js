
const orderId = getParameterByName('orderId'); 

function getParameterByName(name) {
    const url = new URL(window.location.href); 
    return url.searchParams.get(name); 
}


function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

if (orderId) {
    const orderIdElement = document.getElementById('orderId'); 
    orderIdElement.textContent = orderId; 
} else {
    console.error('Order ID not found in URL'); 
}