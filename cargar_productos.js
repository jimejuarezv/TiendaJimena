let cart = [];

function updateCartCount() {
    document.getElementById('cartCount').innerText = cart.length;
}

function updateCartTotal() {
    let total = cart.reduce((sum, product) => sum + product.price, 0);
    document.getElementById('cartTotal').innerText = `Total: Q${total.toFixed(2)}`;
}

function renderCartItems() {
    let cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    cart.forEach(product => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div class="cart-item-name">${product.title}</div>
            <div class="cart-item-price">Q${product.price}</div>
        `;
        cartItemsContainer.appendChild(div);
    });
}

function addToCart(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            cart.push(product);
            updateCartCount();
            updateCartTotal();
            renderCartItems();
        });
}

document.getElementById('cartButton').addEventListener('click', () => {
    let cartContainer = document.getElementById('cartContainer');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
});

async function fetchProducts() {
    try {
        let response = await fetch('https://fakestoreapi.com/products');
        let products = await response.json();
        let productContainer = document.getElementById('div_product_list');
        productContainer.innerHTML = '';

        products.forEach(product => {
            let div = document.createElement("div");
            div.className = "item_product";
            div.innerHTML = `
                <div class="box_img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product_details">
                    <span class="name">${product.title}</span>
                    <span class="price">Q${product.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchProducts);
