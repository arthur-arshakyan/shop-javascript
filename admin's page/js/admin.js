if(!sessionStorage.getItem('administrator')){
    location.href = 'login.html'
}

let categoryTable = document.querySelector('#categoryTable')

function addingCategory() {
    categoryTable.innerHTML = ``
    let categoryList = JSON.parse(localStorage.getItem('categoryList'))

    if(categoryList){
        categoryList.forEach(category => {
            categoryTable.innerHTML += `
                <tr>
                    <td>${category.id}</td>
                    <td>${category.title}</td>
                    <td>
                        <a id='editCategory' class='hyperLink' href="editCategory.html#${category.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a onclick ="removeCategory(${category.id})" id="deleteCategory" class='hyperLink' href="#"><i class="fa-regular fa-trash-can"></i></a>
                    </td>
                </tr>
            `
        })
    }
}
addingCategory()

function removeCategory(id) {
    let categoryList = JSON.parse(localStorage.getItem('categoryList'))

    let i = categoryList.findIndex(e => e.id == id)
    categoryList.splice(i, 1)

    localStorage.setItem('categoryList', JSON.stringify(categoryList))
    if(categoryList.length == 0){
        let categoryId = JSON.parse(localStorage.getItem('categoryId'))
        console.log(categoryList.length);
        categoryId = 0
        localStorage.setItem('categoryId', JSON.stringify(categoryId))
    }
    addingCategory()
}

let productTable = document.querySelector('#productTable')

function addingProduct() {
    productTable.innerHTML = ``
    let productList = JSON.parse(localStorage.getItem('productList'))

    if(productList){
        productList.forEach(product => {
            productTable.innerHTML += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.category}</td>
                    <td>${product.title}</td>
                    <td>${product.price} $</td>
                    <td>${product.description}</td>
                    <td><img src="./images/${product.image}"></td>
                    <td>
                        <a id="editProduct" class='hyperLink' href="editProduct.html#${product.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                        <a onclick ="removeProduct(${product.id})" id="deleteProduct" class='hyperLink' href="#"><i class="fa-regular fa-trash-can"></i></a>
                    </td>
                </tr>
            `
        })
    }
}
addingProduct()

function removeProduct(id) {
    let productList = JSON.parse(localStorage.getItem('productList'))

    let i = productList.findIndex(e => e.id == id)
    productList.splice(i, 1)

    localStorage.setItem('productList', JSON.stringify(productList))
    addingProduct()
}
