if(getAuth()==null) {
    localStorage.setItem('previousUrl', window.location.href);
    localStorage.setItem('previousUrlOrigin', window.location.origin);
    window.location.href = "login.html";
}
const fullname = document.querySelector('#fullname');
initAuth();

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
    let [resource, config] = args;

    config = config || {};
    const headers = config.headers || {};

    config.headers = {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: getAuth() ? "Bearer " + getAuth().token : ""
      };
    console.log(config);
    //config.headers.Authorization = "Bearer " + getAuth().token;
    let response = await originalFetch(resource, config);

    if (response.status == 404) {
        console.log(response.status);
    } else if (response.status == 401) {
        window.alert("Phiên đăng nhập hết hạn");
        window.location.href = "login.html";
    } else if (response.status == 403) {
        window.alert("Tài khoản không có quyền truy cập");
        window.location.href = "login.html";
    }
    return response;
};

function getAuth() {
    const auth = window.localStorage.getItem('auth');
    if(auth == null) {
        return null;
    }
    return JSON.parse(auth);
}

function logout() {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
}

function initAuth() {
    const auth = getAuth();
    console.log(auth.fullname);
    fullname.innerHTML = auth.fullname;
}