async function fetchCategories() {
    try {
        let response = await fetch('https://fakestoreapi.com/products/categories');
        let categories = await response.json();
        let categoriesContainer = document.getElementById('categories');
        categoriesContainer.innerHTML = '';

        categories.forEach(category => {
            let button = document.createElement("button");
            button.className = "category_btn";
            button.dataset.category = category;
            button.innerText = category;
            button.addEventListener('click', () => filterProductsByCategory(category));
            categoriesContainer.appendChild(button);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

async function filterProductsByCategory(category) {
    try {
        let response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
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
        console.error('Error filtering products by category:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchCategories);
