let categories = document.querySelector('.categories')
let categoryList = JSON.parse(localStorage.getItem('categoryList'))

addCategory()

function addCategory() {
    categoryList.forEach(category => {
        categories.innerHTML += `
            <li onclick ="filterCategories('${category.title}')"><p>${category.title}</p></li>
        `
        console.log(category.title);
    })
}

let productCards = document.querySelector('.productCards')
let productList = JSON.parse(localStorage.getItem('productList'))

filterCategories()

function filterCategories(categoryTitle) {
    productCards.innerHTML = ''
    let filteredProductList = categoryTitle ? productList.filter(product => product.category == categoryTitle) : productList

    filteredProductList.forEach(product => {
        productCards.innerHTML += `
        <div class="productItem">
            <img class='productImage' src="../admin's page/images/${product.image}">
            <div>
                <div class='titlePrice'>
                    <h2 class="productTitle">${product.title}</h2>
                    <h3 class="productPrice">${product.price} $</h3>
                </div>
                <div class='cardFooter'>
                    <p class="addToCart" onclick='addToCart(${product.id})'>Add to Cart</p>
                    <p class="viewMore" onclick='viewMore(${product.id})'>View more</p>
                </div>
            </div>
        </div>
        `
    })
}

function viewMore(id) {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    const animation = document.getElementById('modalContainer').animate(
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
        document.getElementById('modalContainer').style.opacity = '1'
        document.getElementById('modalContainer').style.zIndex = '3'
    }

    let product = productList.find(product => product.id == id)

    modal.innerHTML = `
        <div class='top'>
            <div class='left'>
                <p>Store. The best way to buy the products you love.</p>
                <img src="../admin's page/images/${product.image}">
            </div>

            <div class='right'>
                <div class='rightTop'>
                    <div>
                        <h2>${product.title}</h2>
                        <p>${product.price} $</p>
                    </div>
                    <p id='modalAddToCart' onclick='addToCart(${product.id})'>Add to cart</p>
                </div>
                <div class='rightBottom'>
                    <p class='productDescription'>${product.description}</p>
                </div>
                
            </div>

        </div>
        



        <div class='bottom'>
            <p class='modalText'>
                <b>Apple Card Monthly Installments</b><br>
                Interest-free when you choose to check out with
                Apple Card Monthly Installments.
            </p>
            <p class='modalText'>
                <b>Trade in for credit</b><br>
                Trade in your eligible device for credit toward your next purchase.
            </p>
            <p class='modalText'>
                <b>Free delivery</b><br>
                And free returns. See checkout for delivery dates.
            </p>
        </div>
    `
}


function removeModal(event) {
    if (!modal.contains(event.target)) {
        document.getElementsByTagName('body')[0].style.overflow = 'unset'
        const animation = document.getElementById('modalContainer').animate(
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
            document.getElementById('modalContainer').style.opacity = '0'
            document.getElementById('modalContainer').style.zIndex = '0'
        }

        modal.innerHTML = ''
    }
}