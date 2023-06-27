if(!sessionStorage.getItem('administrator')){
    location.href = 'login.html'
}

let id = window.location.hash.split('#')[1]
let productList = JSON.parse(localStorage.getItem('productList'))
let product = productList.find(product => product.id == id)

titleInput.value = product.title
priceInput.value = product.price
descriptionInput.value = product.description
img.src = `./images/${product.image}`

let select = document.querySelector('select')

function setCategory() {
    select.innerHTML = ''
    categoryList = JSON.parse(localStorage.getItem('categoryList'))
    categoryList.forEach(category => {
        select.innerHTML += `
        <option>${category.title}</option>
        `
    })
    select.value = product.category
}
setCategory()

function editProduct() {

    product.title = titleInput.value 
    product.price = priceInput.value 
    product.description = descriptionInput.value 
    product.category = select.value

    if(imageInput.files.length > 0){
        product.image = imageInput.files[0]['name']
    }

    let inputs = document.querySelectorAll('.inputs')
    if(Array.from(inputs).every(input => input.value)){``
        localStorage.setItem('productList' , JSON.stringify(productList))
        location.href = 'admin.html'
    }else{
        alert('All fields are required!')
    }
}

window.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        event.preventDefault()
        editProduct()
    }
})