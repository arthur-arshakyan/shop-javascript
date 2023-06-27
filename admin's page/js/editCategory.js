if(!sessionStorage.getItem('administrator')){
    location.href = 'login.html'
}

let id = window.location.hash.split('#')[1]

let categoryList = JSON.parse(localStorage.getItem('categoryList'))
let category = categoryList.find(category => category.id == id)

let oldCategory = category.title
titleInput.value = category.title

function editCategory(){
    if(categoryList.some(category => category.title == titleInput.value)){
        alert('Already exists!')
    }

    category.title = titleInput.value
    let productList = JSON.parse(localStorage.getItem('productList'))
    if(productList){
        productList.forEach(product => {
        if(product.category == oldCategory){
            product.category = category.title
            localStorage.setItem('productList' , JSON.stringify(productList))
        }
    })
    }
    
    localStorage.setItem('categoryList' , JSON.stringify(categoryList))
    
    location.href = 'admin.html'
}

window.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        event.preventDefault()
        editCategory()
    }
})