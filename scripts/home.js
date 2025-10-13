import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

function renderProducts() {
    let html = '';
    products.forEach(product => {
        html += `<div class="product">
                        <div class="img-container">
                            <img src="${product.image}" alt="product image">
                        </div>
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-review">
                            <div class="rating-container">
                                <img src="/images/ratings/rating-${product.rating.stars * 10}.png" alt="product image">
                                ${product.rating.count}
                            </div>
                        </div>
                        <div class="product-price">
                            ${(product.priceCents / 100)}$
                        </div>
                        <div class="product-quantity">
                        </div>
                        <button class="add-to-cart-btn">Add To Cart</button>
            </div>`;

    });
    document.querySelector('.grid-container').innerHTML = html;
    console.log(html);
}
renderProducts();
