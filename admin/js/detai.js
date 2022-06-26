const DeTaiApi = 'http://127.0.0.1:8120/api/detai';

const GiaoVienApi = 'http://127.0.0.1:8120/api/giaovien';

function start(){
    getDeTai(function (DSDeTai){
        renderDeTai(DSDeTai);
    });

    getGiaoVien(function (DSGiaoVien){
        renderGiaoVien(DSGiaoVien);
    });
    getTenGiaoVien(function (DSGiaoVien){
        renderTenGiaoVien(DSGiaoVien);
    });

    handleCreateDeTai();
    handleDeTai(id);
}
start();

function getDeTai(callback){
    fetch(DeTaiApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderDeTai(DSDeTai){
    var listDeTai = document.querySelector('#list-detai');
    var i = 1;
    var htmls = DSDeTai.map(function (DeTai) {
        return `<tr class="detai-${DeTai.id}">
                    <td>${i++}</td>
                    <td class="ten">${DeTai.ten}</td>
                    <td class="mucDich">${DeTai.mucDich}</td>
                    <td class="nhiemVu">${DeTai.nhiemVu}</td>
                    <td class="tomTat">${DeTai.tomTat}</td>
                    <td class="idGiaoVien">${DeTai.idGiaoVien}</td>
                    <td class="tenGiaoVien">${DeTai.tenGiaoVien}</td>
                    <td>
                    <td>
                    <button class="btn" onclick="handleDeTai(${DeTai.id})" data-toggle="modal" data-target="#updateDeTai"><i class="fa fa-eye text-success text-active"></i></button>
                    <button class="btn" onclick="handleDeleteDeTai(${DeTai.id})"><i class="fa fa-times text-danger text"></i></button>
                    </td>
                </tr>`;
    });
    listDeTai.innerHTML = htmls.join('');
}


function getGiaoVien(callback){
    fetch(GiaoVienApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function getTenGiaoVien(callback){
    fetch(GiaoVienApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderGiaoVien(DSGiaoVien){
    var listGiaoVien = document.querySelector('#list-GiaoVien');
    var htmls = DSGiaoVien.map(function (tenGiaoVien) {
        return `<option selected value="${tenGiaoVien.id}">${tenGiaoVien.hoTen}</option>`;
    });
    listGiaoVien.innerHTML = htmls.join('');
}
function renderTenGiaoVien(DSGiaoVien){
    var listGiaoVien = document.querySelector('#list-tenGiaoVien');
    var htmls = DSGiaoVien.map(function (tenGiaoVien) {
        return `<option selected value="${tenGiaoVien.hoTen}">${tenGiaoVien.hoTen}</option>`;
    });
    listGiaoVien.innerHTML = htmls.join('');
}


function createDeTai(data,callback){
    var options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };
    fetch(DeTaiApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateDeTai(){
    var createBtnDeTai = document.querySelector('#create-detai');
    createBtnDeTai.onclick = function(){
        var ten = document.querySelector('input[name="ten"]').value;
        var mucDich = document.querySelector('input[name="mucDich"]').value;
        var nhiemVu = document.querySelector('input[name="nhiemVu"]').value;
        var tomTat = document.querySelector('input[name="tomTat"]').value;
        var idGiaoVien = document.querySelector('select[name="idGiaoVien"]').value;


        var formData = {
            ten: ten,
            mucDich: mucDich,
            nhiemVu: nhiemVu,
            tomTat: tomTat,
            idGiaoVien: idGiaoVien
        }
        if(ten != "" && mucDich !="" && nhiemVu !="" && tomTat !="" && idGiaoVien !="" ){
            ten = "";
            mucDich = "";
            nhiemVu = "";
            tomTat = "";
            idGiaoVien = "";
        
            createDeTai(formData);
            alert("Thêm thành công!!!");
          window.location.reload();
        }else{
            alert("Bạn hãy nhập đầy đủ thông tin");

        }
    }
}
function handleDeleteDeTai(id){
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    };


    if (confirm("Are you sure you want to delete?")) {
    fetch(DeTaiApi + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var detaiItem = document.querySelector('.detai-'+id);
            if(detaiItem){
                detaiItem.remove();
                alert("Đã xoá thành công!!!");
            }
        });
        window.location.reload();
    };
}
function UpdateDeTai(id, data, callback) {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(DeTaiApi + "/" + id, options)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }
function handleDeTai(id){
    var detaiItem = document.querySelector('.detai-'+id);
    var getTen=detaiItem.querySelector(".ten").innerText;
    var getMucDich=detaiItem.querySelector(".mucDich").innerText;
    var getNhiemVu=detaiItem.querySelector(".nhiemVu").innerText;
    var getTomTat=detaiItem.querySelector(".tomTat").innerText;
    var getidGiaoVien=detaiItem.querySelector(".idGiaoVien").innerText;
    var getTenGiaoVien=detaiItem.querySelector(".tenGiaoVien").innerText;


    var ten = document.querySelector('input[name="ten"]');
    var mucdich = document.querySelector('input[name="mucDich"]');
    var nhiemvu = document.querySelector('input[name="nhiemVu"]');
    var tomtat = document.querySelector('input[name="tomTat"]');
    var idgiaovien = document.querySelector('select[name="idGiaoVien"]');
    var tengiaovien = document.querySelector('select[name="tenGiaoVien"]');

    ten.value=getTen;
    mucdich.value=getMucDich;
    nhiemvu.value=getNhiemVu;
    tomtat.value=getTomTat;
    idgiaovien.value=getidGiaoVien;
    tengiaovien.value=getTenGiaoVien;

    console.log(ten.value);
    console.log(getMucDich);
    console.log(getNhiemVu);
    console.log(getTomTat);
    console.log(getidGiaoVien);
    console.log(getTenGiaoVien);

    var btnUpdate = document.querySelector("#update-detai");
    btnUpdate.onclick = function () {
      var formData = {
        ten: ten.value,
        mucDich: mucdich.value,
        nhiemVu: nhiemvu.value,
        tomTat: tomtat.value,
        idGiaoVien: idgiaovien.value,
        tenGiaoVien: tengiaovien.value
      };
      UpdateDeTai(id, formData, function () {
        getDeTai(renderDeTai);
        alert("Cập nhật thành công");
      });
    };
  }