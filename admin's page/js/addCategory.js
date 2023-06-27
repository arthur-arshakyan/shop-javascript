if(!sessionStorage.getItem('administrator')){
    location.href = 'login.html'
}

function addCategory(){
    let categoryTitle = document.querySelector('input').value
    let categoryId = localStorage.getItem('categoryId') ? JSON.parse(localStorage.getItem('categoryId')) + 1 : 1

    let lastCategory = {
        id: categoryId,
        title: categoryTitle
    }

    let categoryList = localStorage.getItem('categoryList') ? JSON.parse(localStorage.getItem('categoryList')) : []
    if(categoryList.find(category => category.title == categoryTitle)){
        alert('Already exists!')
    }else{
    categoryList = [...categoryList, lastCategory]
    localStorage.setItem('categoryList', JSON.stringify(categoryList))
    localStorage.setItem('categoryId', JSON.stringify(categoryId))
    
    location.href = 'admin.html'
    }
}

window.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        event.preventDefault()
        addCategory()
    }
})