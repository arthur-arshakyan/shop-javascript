function signIn() {
    let usernameInput = document.querySelector('#usernameInput')
    let passwordInput = document.querySelector('#passwordInput')
    
    if(usernameInput.value == 'administrator' && passwordInput.value == '1111'){
        sessionStorage.setItem('administrator' , 'online')
        location.href = 'admin.html'
    }else{
        alert("The username you entered with this password isn't connected to an account.")
        const form = document.getElementById("form")
        form.reset()
    }
}

window.addEventListener('keydown', function(event) {
    if(event.key == 'Enter'){
        signIn()
    }
})