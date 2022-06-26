const GiaoVienApi = 'http://127.0.0.1:8120/api/giaovien';
const BoMonApi = 'http://127.0.0.1:8120/api/bomon';


function start(){
    getGiaoVien(function (DSGiaoVien){
        renderGiaoVien(DSGiaoVien);
    });
    getTenBoMon(function(DSTenBoMon){
        renderTenBoMon(DSTenBoMon);
    });
    handleCreateGiaoVien();
}
start();

function getGiaoVien(callback){
    fetch(GiaoVienApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderGiaoVien(DSGiaoVien){
    var listGiaoVien = document.querySelector('#list-giaovien');
    var i = 1;
    var htmls = DSGiaoVien.map(function (GiaoVien) {
        return `<tr class="giaovien-${GiaoVien.id}">
                    <td>${i++}</td>
                    <td>${GiaoVien.msgv}</td>
                    <td>${GiaoVien.username}</td>
                    <td>${GiaoVien.hoTen}</td>
                    <td>${GiaoVien.gioitinh}</td>
                    <td>${GiaoVien.email}</td>
                    <td>${GiaoVien.ngaysinh}</td>
                    <td>${GiaoVien.sdt}</td>
                    <td>${GiaoVien.bomonCode}</td>
                    <td>${GiaoVien.tenBoMon}</td>
                    <td>
                    <button class="btn" onclick="handleDeleteGiaoVien(${GiaoVien.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listGiaoVien.innerHTML = htmls.join('');
}

function getTenBoMon(callback){
    fetch(BoMonApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderTenBoMon(DSTenBoMon){
    var listTenBoMon = document.querySelector('#list-tenbomon');
    var htmls = DSTenBoMon.map(function (TenBoMon) {
        return `<option value="${TenBoMon.code}">${TenBoMon.tenBoMon}</option>`;
    });
    listTenBoMon.innerHTML = htmls.join('');
}

function createGiaoVien(data,callback){
    var options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };
    fetch(GiaoVienApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateGiaoVien(){
    var createBtnGiaoVien = document.querySelector('#create-giaovien');
    createBtnGiaoVien.onclick = function(){
        var msgv = document.querySelector('input[name="msgv"]').value;
        var username = document.querySelector('input[name="username"]').value;
        var hoTen = document.querySelector('input[name="hoTen"]').value;
        var gioitinh = document.querySelector('input[name="gioitinh"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var ngaysinh = document.querySelector('input[name="ngaysinh"]').value;
        var sdt = document.querySelector('input[name="sdt"]').value;
        var tenBoMon = document.querySelector('select[name="tenBoMon"]').value;

        var formData = {
            msgv: msgv,
            username: username,
            hoTen: hoTen,
            gioitinh: gioitinh,
            email: email,
            ngaysinh: ngaysinh,
            sdt: sdt,
            tenBoMon: tenBoMon
        }
        if(msgv != "" && username != "" && hoTen !="" && gioitinh != "" && email != "" && ngaysinh != "" && sdt != "" && tenBoMon != ""){
            msgv = "";
            username = "";
            hoTen = "";
            email = "";
            ngaysinh = "";
            sdt = "";
            tenBoMon = "";
            gioitinh = "";
            createGiaoVien(formData);
            alert("Thêm thành công!!!");
        } else {
        alert("Bạn hãy nhập đầy đủ thông tin");
        }
    }
}
function handleDeleteGiaoVien(id){
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }
    if (confirm("Are you sure you want to delete?")) {
    fetch(GiaoVienApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var bomonItem = document.querySelector('.giaovien-'+id);
            if(bomonItem){
                bomonItem.remove();
                alert("Đã xoá thành công!!!");
            }
        })
    }
}
