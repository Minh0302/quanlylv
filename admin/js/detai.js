const DeTaiApi = 'http://127.0.0.1:8120/api/detai';
const BoMonApi = 'http://127.0.0.1:8120/api/bomon';

function start(){
    getDeTai(function (DSDeTai){
        renderDeTai(DSDeTai);
    });
    getMaBoMon(function (DSMaBoMon){
        renderMaBoMon(DSMaBoMon);
    });
    getTenBoMon(function(DSTenBoMon){
        renderTenBoMon(DSTenBoMon);
    });
    handleCreateDeTai();
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
                    <td>${DeTai.ten}</td>
                    <td>${DeTai.mucDich}</td>
                    <td>${DeTai.nhiemVu}</td>
                    <td>${DeTai.tomTat}</td>
                    <td>${DeTai.modifiedDate}</td>
                    <td>${DeTai.createdDate}</td>
                    <td>
                    <a href="" class="active" ui-toggle-class=""><i class="fa fa-eye text-success text-active"></i></a>
                    <button class="btn" onclick="handleDeleteDeTai(${DeTai.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listDeTai.innerHTML = htmls.join('');
}

function getMaBoMon(callback){
    fetch(BoMonApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderMaBoMon(DSMaBoMon){
    var listMaBoMon = document.querySelector('#list-mabomon');
    var htmls = DSMaBoMon.map(function (MaBoMon) {
        return `<option value="${MaBoMon.code}">${MaBoMon.code}</option>`;
    });
    listMaBoMon.innerHTML = htmls.join('');
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
        var createdDate = document.querySelector('input[name="createdDate"]').value;
        var modifiedDate = document.querySelector('input[name="modifiedDate"]').value;
        var bomonCode = document.querySelector('input[name="bomonCode"]').value;
        var tenBoMon = document.querySelector('input[name="tenBoMon"]').value;

        var formData = {
            ten: ten,
            mucDich: mucDich,
            nhiemVu: nhiemVu,
            tomTat: tomTat,
            modifiedDate: modifiedDate,
            createdDate: createdDate,
            
            bomonCode: bomonCode,
            tenBoMon: tenBoMon
        }
        createDeTai(formData);
    }
}
function handleDeleteDeTai(id){
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }
    fetch(DeTaiApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var bomonItem = document.querySelector('.detai-'+id);
            if(bomonItem){
                bomonItem.remove();
            }
        })
}
