const SinhVienApi = 'http://localhost:8120/api/sinhvien';

function start() {
    getSinhVien(function(DSSinhVien){
        renderSinhVien(DSSinhVien);
    });
    handleCreateSinhVien();

    handleSinhVien(id);
}
start();

function getSinhVien(callback){
    fetch(SinhVienApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderSinhVien(DSSinhVien){
    var listSinhVien = document.querySelector('#list-sinhvien');
    var i = 1;
    var htmls = DSSinhVien.map(function (SinhVien){
        return `<tr class="sinhvien-${SinhVien.id}">
                    <td>${i++}</td>
                    <td class="mssv">${SinhVien.mssv}</td>
                    <td class="username">${SinhVien.username}</td>
                    <td class="hoTen">${SinhVien.hoTen}</td>
                    <td class="gioitinh">${SinhVien.gioitinh}</td>
                    <td class="email">${SinhVien.email}</td>
                    <td class="ngaysinh">${SinhVien.ngaysinh}</td>
                    <td class="sdt">${SinhVien.sdt}</td>
                    <td class="nienKhoa">${SinhVien.nienKhoa}</td>
                    <td class="chuyenNganh">${SinhVien.chuyenNganh}</td>
                    <td>
                    <button class="btn" onclick="handleDeleteSinhVien(${SinhVien.id})"><i class="fa fa-times text-danger text"></i></button></td>
                </tr>`;
    });
    listSinhVien.innerHTML = htmls.join('');
}
function createSinhVien(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(SinhVienApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateSinhVien(){
    var createBtnSinhVien = document.querySelector('#create-sinhvien');
    createBtnSinhVien.onclick = function(){
        var mssv = document.querySelector('input[name="mssv"]').value;
        var username = document.querySelector('input[name="username"]').value;
        var hoTen = document.querySelector('input[name="hoTen"]').value;
        var gioitinh = document.querySelector('input[name="gioitinh"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var ngaysinh = document.querySelector('input[name="ngaysinh"]').value;
        var sdt = document.querySelector('input[name="sdt"]').value;
        var chuyenNganh = document.querySelector('input[name="chuyenNganh"]').value;
        var nienKhoa = document.querySelector('input[name="nienKhoa"]').value;
        
        var formData = {
            mssv: mssv,
            username: username,
            hoTen: hoTen,
            gioitinh: gioitinh,
            email: email,
            ngaysinh: ngaysinh,
            sdt: sdt,
            chuyenNganh: chuyenNganh,
            nienKhoa: nienKhoa
        }
        if(mssv != "" && username != "" && hoTen != "" && gioitinh != "" && email != "" && ngaysinh != "" && sdt != "" && chuyenNganh != "" && nienKhoa != ""){
            mssv = "";
            username = "";
            hoTen = "";
            gioitinh = "";
            email = "";
            ngaysinh = "";
            sdt = "";
            chuyenNganh = "";
            nienKhoa = "";
            createSinhVien(formData);
            alert("Thêm thành công!!!");
        } else {
          alert("Bạn hãy nhập đầy đủ thông tin");
        }
    }   
}
function handleDeleteSinhVien(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    if (confirm("Are you sure you want to delete?")) {
        fetch(SinhVienApi + '/' +id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var sinhVienItem = document.querySelector('.sinhvien-'+id);
            if(sinhVienItem){
                sinhVienItem.remove();
                alert("Đã xoá thành công!!!");
            }
        })
    }
}
function UpdateSinhVien(id, data, callback) {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(SinhVienApi + "/" + id, options)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }
function handleSinhVien(id) {
    var sinhvienItem = document.querySelector(".sinhvien-" + id);
    var getMssv = sinhvienItem.querySelector(".mssv").innerText;
    var getUsername = sinhvienItem.querySelector(".username").innerText;
    var getTen = sinhvienItem.querySelector(".hoTen").innerText;
    var getGioitinh = sinhvienItem.querySelector(".gioitinh").innerText;
    var getEmail = sinhvienItem.querySelector(".email").innerText;
    var getNgaysinh = sinhvienItem.querySelector(".ngaysinh").innerText;
    var getsdt = sinhvienItem.querySelector(".sdt").innerText;
    var getChuyennganh = sinhvienItem.querySelector(".chuyenNganh").innerText;
    var getNienhoa = sinhvienItem.querySelector(".nienKhoa").innerText;
  
    var mssv = document.querySelector('input[name="mssv"]');
    var username = document.querySelector('input[name="username"]');
    var hoTen = document.querySelector('input[name="hoTen"]');
    var gioitinh = document.querySelector('input[name="gioitinh"]');
    var email = document.querySelector('input[name="email"]');
    var ngaysinh = document.querySelector('input[name="ngaysinh"]');
    var sdt = document.querySelector('input[name="sdt"]');
    var chuyenNganh = document.querySelector('input[name="chuyenNganh"]');
    var nienKhoa = document.querySelector('input[name="nienKhoa"]');
  
    mssv.value = getMssv;
    username.value = getUsername;
    hoTen.value = getTen;
    gioitinh.value = getGioitinh;
    email.value = getEmail;
    ngaysinh.value = getNgaysinh;
    sdt.value = getsdt;
    chuyenNganh.value = getChuyennganh;
    nienKhoa.value = getNienhoa;
  
    // console.log(getTen);
    // console.log(getPercent);
    // console.log(getCreatedDate);
    // console.log(getModifiedDate);
  
    var btnUpdate = document.querySelector("#update-sinhvien");
    btnUpdate.onclick = function () {
      var formData = {
        ten: mssv.value,
        username: username.value,
        hoTen: hoTen.value,
        gioitinh: gioitinh.value,
        email: email.value,
        ngaysinh: ngaysinh.value,
        sdt: sdt.value,
        chuyenNganh: chuyenNganh.value,
        nienKhoa: nienKhoa.value,
      };
      UpdateSinhVien(id, formData, function () {
        getSinhVien(renderSinhVien);
      });
    };
  }

