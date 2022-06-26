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
// function handleCreateBoMon(){
//     var createBtnBoMon = document.querySelector('#create-bomon');
//     createBtnBoMon.onclick = function(){
//         var tenBoMon = document.querySelector('input[name="tenBoMon"]').value;
//         var code = document.querySelector('input[name="code"]').value;
//         var soLuongGV = document.querySelector('input[name="soLuongGV"]').value;
//         var created_date = document.querySelector('input[name="created_date"]').value;
//         var modified_date = document.querySelector('input[name="modified_date"]').value;
        
//         var formData = {
//             tenBoMon: tenBoMon,
//             code: code,
//             soLuongGV: soLuongGV,
//             created_date: created_date,
//             modified_date: modified_date
//         }
//         createBoMon(formData);

//     }   
// }
