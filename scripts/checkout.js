import { products, getProduct } from "../data/products.js";
import { cart, updateCartQuantity, deleteFromCart, cartQuantityItems } from "../data/cart.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";

const now = dayjs();
const now3 = now.add(3, 'day');
const now7 = now.add(7, 'day');

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
                        <p class="delivery-text ">${now.format('YYYY MMM DD')} <input data-product-id="${productCart.id}0" class="chosen-delivery-date" type="radio" name="${productCart.id}"> </p>
                        <p class="delivery-text ">${now3.format('YYYY MMM DD')}<input data-product-id="${productCart.id}1" class="chosen-delivery-date" type="radio" name="${productCart.id}">  </p>
                        <p class="delivery-text ">${now7.format('YYYY MMM DD')}<input data-product-id="${productCart.id}2" class="chosen-delivery-date" type="radio" name="${productCart.id}"> </p>
                    </div>

                </div>
                `

    });
    document.querySelector('.checkout-container').innerHTML = html;
    cart.forEach(element => {
        for (let i = 0; i < 4; i++) {
            const id = element.id + `${i}`;
            // console.log('element.deliveryOptionId: ', element.deliveryOptionId);
            // console.log('id: ', id);
            if (Number(element.deliveryOptionId) === i) {
                console.log('cokolweik', i);

            }
        }
    });

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
    document.querySelectorAll('.chosen-delivery-date').forEach((radioInput) => {
        radioInput.addEventListener('change', () => {
            console.log('radio button: ', radioInput);
            const productId = radioInput.dataset.productId;
            console.log('radio id: ', productId);



            localStorage.setItem('cart', JSON.stringify(cart));
        })
    })

    localStorage.setItem('cartQuantityItems', JSON.stringify(cartQuantityItems));

    document.querySelector('.centered').innerHTML = cartQuantityItems;

}
renderProducts();
