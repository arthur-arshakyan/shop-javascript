function openCart() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    const animation = document.getElementById('cartModalContainer').animate(
        [{
                opacity: '0',
                zIndex: '0',
            },
            {
                opacity: '1',
                zIndex: '3',
            }
        ],
        {
            duration: 500
        }
    )

    animation.onfinish = () => {
        document.getElementById('cartModalContainer').style.opacity = '1'
        document.getElementById('cartModalContainer').style.zIndex = '3'
    }

    cartUpdate()
}


function removeCartModal(event) {
    if (!cartModal.contains(event.target)) {
        document.getElementsByTagName('body')[0].style.overflow = 'unset'
        const animation = document.getElementById('cartModalContainer').animate(
            [
                {
                    opacity: '1',
                    zIndex: '3',
                },
                {
                    opacity: '0',
                    zIndex: '0',
                }
            ],
            {
                duration: 500
            }
        )

        animation.onfinish = () => {
            document.getElementById('cartModalContainer').style.opacity = '0'
            document.getElementById('cartModalContainer').style.zIndex = '0'
        }

        // cartModal.innerHTML = ''
    }
    // cartUpdate()
}

function addToCart(id) {
    let products = JSON.parse(localStorage.getItem('productList'))
    let cartProducts

    if(localStorage.getItem('cartProducts')) {
        cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    }
    else {
        cartProducts = []
    }
    
    let product
    
    if(cartProducts.find(cartProduct => cartProduct.id == id)) {
        product = cartProducts.find(cartProduct => cartProduct.id == id)
    }
    else {
        product = products.find(cartProduct => cartProduct.id == id)
    }
    
    product.productCount = product.productCount ? ++product.productCount : 1 
    product.cartPrice = product.productCount * product.price

    cartProducts.some(cartProduct => cartProduct.id == product.id) || cartProducts.push(product)
    
    localStorage.setItem('cartProducts' , JSON.stringify(cartProducts))
    cartUpdate()
}

function cartUpdate() {

    let totalCount = 0
    cartItems.innerHTML = ``
    total.innerText = `Cart is empty`

    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    productCount.innerHTML = cartProducts.length 

    if(cartProducts) {
        cartProducts.forEach(product => {
            totalCount += product.cartPrice
            total.innerHTML = `Total : <span class="totalPrice">${totalCount} $</span>` 

                cartItems.innerHTML += `
            <div id="cartItem">
                <div class="image">
                    <img src="../admin's page/images/${product.image}">
                </div>

                <div class='cartItemRight'>
                    <div class="textPart">
                        <h3>${product.title}</h3>
                        <p>${product.cartPrice} $</p>
                        <div class="countBox">
                            <span onclick ="changeProductCount(event, ${product.id})">-</span>
                            <span>${product.productCount}</span>
                            <span onclick ="changeProductCount(event, ${product.id},true)">+</span>
                        </div>
                    </div>
                    <i class="fa fa-times" onclick="removeProduct(event, ${product.id})"></i>
                </div>

                
            </div>  
                `
            })
}
}


function changeProductCount(event, id, value) {
    event.stopPropagation()
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    let product = cartProducts.find(cartProduct => cartProduct.id == id)

   value ? ++product.productCount : --product.productCount
   product.cartPrice = product.price * product.productCount

   localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
   if(!product.productCount){
        removeProduct(event, id)
   }
   cartUpdate()
}


function removeProduct(event, id) {
    event.stopPropagation()
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts'))
    let i = cartProducts.findIndex(product => product.id == id)
    cartProducts.splice(i, 1)
    localStorage.setItem('cartProducts',JSON.stringify(cartProducts))
    cartUpdate()
}
cartUpdate()