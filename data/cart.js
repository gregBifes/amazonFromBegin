export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export let cartQuantityItems = JSON.parse(localStorage.getItem('cartQuantityItems')) || 0;

export function addToCart(productId, quantity) {
    const index = cart.findIndex((element) => element.id === productId)
    if (index != -1) {
        cart[index].quantity += quantity;
    }
    else {
        cart.push({
            id: `${productId}`,
            quantity: quantity,
            deliveryOptionId: '0'
        })
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

export function deleteFromCart(productId) {
    const index = cart.findIndex((element) => element.id === productId)
    if (index != -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function updateCartQuantity() {
    cartQuantityItems = 0;
    cart.forEach(element => {
        cartQuantityItems += element.quantity;
    });
    return cartQuantityItems;
}



// if (!cart) {
//     cart = [{
//         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         quantity: 2,
//         deliveryOptionId: '1'
//     }, {
//         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//         quantity: 1,
//         deliveryOptionId: '2'
//     }];
// }
