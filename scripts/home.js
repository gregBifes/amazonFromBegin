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
                        <div>
                            <select name="quantity" id="">
                                <option value="1" id="">1</option>
                                <option value="2" id="">2</option>
                                <option value="3" id="">3</option>
                                <option value="4" id="">4</option>
                                <option value="5" id="">5</option>
                                <option value="6" id="">6</option>
                                <option value="7" id="">7</option>
                                <option value="8" id="">8</option>
                                <option value="9" id="">9</option>
                            </select>
                        </div>
                        <button class="add-to-cart-btn">Add To Cart</button>
            </div>`;

    });
    document.querySelector('.grid-container').innerHTML = html;
    console.log(html);
}
renderProducts();
