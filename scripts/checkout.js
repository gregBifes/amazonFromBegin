import { products, getProduct } from "../data/products.js";
import { cart, updateCartQuantity, deleteFromCart, cartQuantityItems } from "../data/cart.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { deliveryOptions } from "../data/deliveryOptions.js";

JSON.parse(localStorage.getItem('cart'));
JSON.parse(localStorage.getItem('cartQuantityItems'));

function renderProducts() {
    let html = '';
    cart.forEach(productCart => {
        // let index = products.findIndex((element) => element.id === productCart.id);
        // let matchingProduct = products[index];
        let matchingProduct = getProduct(productCart.id);

        html += `
    <div class="product">
        <div class="img-container">
            <img src="${matchingProduct.image}" alt="product image">
        </div>
        <div class="description-container">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${(matchingProduct.priceCents / 100).toFixed(2)}$
            </div>
            <div class="product-quantity">
                <div><strong>Quantity:</strong> ${productCart.quantity}</div>
            </div>
            <div>
                <button data-product-Id="${productCart.id}" class="js-delete-btn">Delete</button>
            </div>
        </div>
            <div class="delivery-container">
                <p style="font-weight: bold; margin-bottom: 0.5rem">Termin dostawy:</p>
                ${deliveryOptionsHTML(matchingProduct)}
            </div>
    </div>
                `

    });

    function deliveryOptionsHTML(matchingProduct) {
        const now = dayjs();
        let html = '';
        deliveryOptions.forEach(element => {
            const dateString = now.add(element.deliveryDays, 'day');
            const priceString = element.priceCents === 0 ? 'FREE' : `${element.priceCents / 100}`;
            html += `
            <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString.format('dddd MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                        $${priceString} - Shipping
                    </div>
                </div>
            </div>

            `
        });
        return html;
    }
    document.querySelector('.checkout-container').innerHTML = html;

    //delteBtn
    document.querySelectorAll('.js-delete-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            deleteFromCart(productId);
            updateCartQuantity();
            renderProducts();
        })
    })
    //chosenDateInput
    localStorage.setItem('cartQuantityItems', JSON.stringify(cartQuantityItems));
    document.querySelector('.centered').innerHTML = cartQuantityItems;

}

renderProducts();
