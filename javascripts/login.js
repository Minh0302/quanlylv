const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitForm = document.querySelector('#submit-form');
const signinForm = document.querySelector('#form-login');
const userBar = document.querySelector('#ulUserBar');

const apiLogin = "http://localhost:8120/api/auth/signin";
var nextUrl;

signinForm.onsubmit = function (event) {
    event.preventDefault();
}

submitForm.onclick = () => {
    login(handleToken);
}

function login(callback) {
    fetch(apiLogin, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
        .then(response => response.json())
        .then(callback)
}

function handleToken(result) {

    if(result.nextUrl!=null){
        console.log(result.nextUrl);
        location.href = "./admin/index.html";
    }
    htmls = `<a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" class="dropdown-toggle" href="#"> 
                <i class="fa fa-user"> ${result.fullname}</i>  
            </a>  
            <ul class="dropdown-menu">  
                <li><a href="#">Thông tin cá nhân</a></li>  
                <li><a href="#">Thoát</a></li>  
            </ul>`;
            
    let accessToken = result.type +' ' + result.token;
    localStorage.setItem('accessToken', accessToken);

    $('#login').modal('hide');
    userBar.classList.add('dropdown');
    userBar.innerHTML = htmls;
}

