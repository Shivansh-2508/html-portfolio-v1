let cart = [];
let total = 0;

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice;
    alert(itemName+' Added To Cart (Total '+cart.length+ " Items)");
    updateCart();
    
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - ₹${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.length;
}

function toggleCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
}
function clearCart() {
    cart = [];
    total = 0;
    updateCart();
}

function checkout() {
    // Add backend logic for handling the checkout process (e.g., submitting orders, processing payments).
    alert('paymet page in progress');
    clearCart()
}

