const BoMonApi = 'http://127.0.0.1:8120/api/bomon';

function start(){
    getCategory(function(DSBoMon){
        renderCategory(DSBoMon);
    });

    handleCreateBoMon();
}

start();

function getCategory(callback){
    fetch(BoMonApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderCategory(DSBoMon){
    var listCategory = document.querySelector('#list-bomon');
    var i = 1;
    var htmls = DSBoMon.map(function(BoMon){
        return `<tr>
                    <td>${i++}</td>
                    <td>${BoMon.tenBoMon}</td>
                    <td>${BoMon.code}</td>
                    <td>${BoMon.soLuongGV}</td>
                    <td>
                    <a href="" class="active" ui-toggle-class=""><i class="fa fa-eye text-success text-active"></i></a>
                    <button class="btn" onclick="handleDeleteBoMon(${BoMon.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listCategory.innerHTML = htmls.join('');
}
function createBoMon(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(BoMonApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateBoMon(){
    var createBtnBoMon = document.querySelector('#create-bomon');
    createBtnBoMon.onclick = function(){
        var tenBoMon = document.querySelector('input[name="tenBoMon"]').value;
        var code = document.querySelector('input[name="code"]').value;
        var soLuongGV = document.querySelector('input[name="soLuongGV"]').value;
        var created_date = document.querySelector('input[name="created_date"]').value;
        var modified_date = document.querySelector('input[name="modified_date"]').value;
        
        var formData = {
            tenBoMon: tenBoMon,
            code: code,
            soLuongGV: soLuongGV,
            created_date: created_date,
            modified_date: modified_date
        }
        createBoMon(formData);

    }   
}
function handleDeleteBoMon(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(BoMonApi + '/' +id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            getCategory(function(DSBoMon){
                renderCategory(DSBoMon);
            });
        })
}