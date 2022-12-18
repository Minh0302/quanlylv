const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submitForm = document.querySelector('#submit-form');
const signinForm = document.querySelector('#form-login');

const apiLogin = "http://localhost:8120/api/auth/signin";

signinForm.onsubmit = function (event) {
    event.preventDefault();
}

submitForm.onclick = () => {

    if(username.value == "" || password.value == "") {
        return;
    } 
    login();
}

function login() {
    fetch(apiLogin, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
        .then(response => {
            if(response.status == 200){
                return response.json();
            } else {
                window.alert("username or password inccorect!");
                return "error";
            }
        })
        .then((json) => {
            if(json != "error") {
                localStorage.setItem("auth", JSON.stringify(json));
                if (json.admin) {
                    if(localStorage.getItem('previousUrlAdmin')) {
                        window.location.href = localStorage.getItem('previousUrlAdmin');
                    } else {
                        window.location.href = "admin/index.html";
                    }
                } else {
                    if(localStorage.getItem('previousUrl')) {
                        window.location.href = localStorage.getItem('previousUrl');
                    } else {
                        window.location.href = "index.html";
                    }
                }
            }
        })
}

// function handleToken(result) {

//     htmls = `<a aria-expanded="false" aria-haspopup="true" role="button" data-toggle="dropdown" class="dropdown-toggle" href="#"> 
//                 <i class="fa fa-user"> ${result.fullname}</i>  
//             </a>  
//             <ul class="dropdown-menu">  
//                 <li><a href="#">Thông tin cá nhân</a></li>  
//                 <li><a href="#">Thoát</a></li>  
//             </ul>`;

//     let accessToken = result.type +' ' + result.token;
//     localStorage.setItem('accessToken', accessToken);
// }

// function logout() {
//     localStorage.clear();
// }
