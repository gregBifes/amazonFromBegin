import { products } from "../data/products.js";
import { addToCart, updateCartQuantity, cart, cartQuantityItems } from "../data/cart.js";
JSON.parse(localStorage.getItem('cart'));
JSON.parse(localStorage.getItem('cartQuantityItems'));

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
                                <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="product image">
                                ${product.rating.count}
                            </div>
                        </div>
                        <div class="product-price">
                            ${(product.priceCents / 100)}$
                        </div>
                        <div class="product-quantity">
                                <select name="quantity" id="quantity-${product.id}">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </div>
                        <div>
                            <p class="added-text added-text-${product.id}" >
                                Added <span class="fa-solid fa-circle-check"></span>
                            </p>
                        </div>
                        <div class="button-container">
                            <button data-product-id="${product.id}" class="js-add-btn add-to-cart-btn">Add To Cart</button>
                        </div>
                </div>`;

    });

    document.querySelector('.grid-container').innerHTML = html;
    const buttons = document.querySelectorAll('.js-add-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
            addToCart(productId, quantity);
            updateCartQuantity();
            renderProducts();

            const displayText = document.querySelector(`.added-text-${productId}`);
            displayText.style.visibility = "visible";
            setTimeout(() => {
                displayText.style.visibility = 'hidden';
            }, 1500)

        })
    });
    localStorage.setItem('cartQuantityItems', JSON.stringify(cartQuantityItems));
    document.querySelector('.centered').innerHTML = cartQuantityItems;
    console.log('karta: ', cart);

}
renderProducts();
