import { products, getProduct } from "../data/products.js";
import { cart } from "../data/cart.js";

function renderProducts() {
    let html = '';
    cart.forEach(product => {
        let matchingProduct = getProduct(product.productId);
        html += `
                <div class="product">
                    <div class="img-container">
                        <img src="${matchingProduct.image}" alt="product image">
                    </div>
                    <div class="description">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${(matchingProduct.priceCents / 100)}$
                    </div>
                    <div class="product-quantity">
                        <div><strong>Quantity:</strong> ${product.quantity}</div>
                    </div>
                </div>
                </div>

                   
                `


    });
    document.querySelector('.checkout-container').innerHTML = html;
}
renderProducts();
