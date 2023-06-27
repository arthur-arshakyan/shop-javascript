if(!sessionStorage.getItem('administrator')){
    location.href = 'login.html'
}

let select = document.querySelector('select')

function setCategory() {
    select.innerHTML = ''
    categoryList = JSON.parse(localStorage.getItem('categoryList'))
    categoryList.forEach(category => {
        select.innerHTML += `
        <option>${category.title}</option>
        `
    })
}
setCategory()

function addProduct(){
    let inputs = document.querySelectorAll('.inputs')

    if(Array.from(inputs).every(input => input.value)){
        let productList = localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : []
        let productId = localStorage.getItem('productId') ? JSON.parse(localStorage.getItem('productId')) + 1 : 1

        let lastProduct = {
            id: productId,
            category: select.value,
            title: titleInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            image: imageInput.files[0]['name']
        }

        productList = [...productList, lastProduct]
        localStorage.setItem('productList', JSON.stringify(productList))
        localStorage.setItem('productId', JSON.stringify(productId))
        location.href = 'admin.html'
    }else{
        alert('All fields are required!')
    }

    // let productList = localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : []
    // productList = [...productList, lastProduct]
    // localStorage.setItem('productList', JSON.stringify(productList))
    // localStorage.setItem('productId', JSON.stringify(productId))
    
    // location.href = 'admin.html'
}

window.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        event.preventDefault()
        addProduct()
    }
})