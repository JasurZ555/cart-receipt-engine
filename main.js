const products = [
    {
        id: 1,
        name: "Espresso",
        price: 3,
        discount: 20,
        available: true
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 4,
        discount: 10,
        available: true
    },
    {
        id: 3,
        name: "Mocha",
        price: 5,
        discount: 0,
        available: true
    }
]

const cart = [
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 }
]

const cart2 = []


function validateQuantity(quantity) {
    if (Number.isInteger(quantity) && quantity >= 1){
        return true
    }else{
        return "Invalid quantity!"
    }
}

function validateProduct(product) {
    if (typeof product !== "object" || product === null) {
        return "It is not an object!"
    }else if(typeof(product.name) !== "string" || product.name.trim() === ""){
        return "Invalid name"
    }else if(!Number.isFinite(product.price) || product.price < 0){
        return "Invalid price!"
    }else if(!Number.isFinite(product.discount) || product.discount < 0 || product.discount > 100){
        return "Invalid discount!"
    }else if (typeof product.available !== "boolean") {
        return "Invalid availability value!"
    }else if (product.available === false) {
        return "Product is unavailable!"
    }

    return true
}

function calculateItem(product, quantity) {
    const productResult = validateProduct(product)
    const quantResult = validateQuantity(quantity)
    if (productResult !== true) {
        return productResult
    }else if (quantResult !== true) {
        return quantResult
    }
    const subtotal = product.price * quantity
    const discountAmount = subtotal*product.discount/100
    const finalPrice = subtotal - discountAmount
    const productObject = {
        name: product.name,
        quantity: quantity,
        originalPrice: product.price,
        subtotal: subtotal,
        discountPercent: product.discount,
        discountAmount: discountAmount,
        finalPrice: finalPrice
    }
    return productObject
}

function calculateCart(cart){

    const receiptItems = cart.map(cartItem =>{
        return calculateItem(cartItem.product, cartItem.quantity)
    })

    const error = receiptItems.find(result => {
        return typeof result === "string"
    })

    if (error !== undefined) {
        return error
    }
    return receiptItems

    // const newCart = []
    // let i = 0
    // while (i < cart.length){
    //     const result = calculateItem(cart[i].product, cart[i].quantity) 
    //     if (typeof(result) === "string"){
    //         return result 
    //     }
    //     newCart.push(result)
    //     i++
    // }
    // return newCart
}

function getCartTotal(cart) {
    const receipt = calculateCart(cart)

    if (typeof receipt === "string"){
        return receipt
    }
    const total = receipt.reduce((accumulator,receiptItem) => {
        return accumulator + receiptItem.finalPrice
    },0)
    
    return total

}

console.log(getCartTotal(cart))




