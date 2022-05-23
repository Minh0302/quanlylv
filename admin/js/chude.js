const ChuDeApi = "http://localhost:8120/api/chude";
function start(){
    getChuDe(function(DSChuDe){
        renderChuDe(DSChuDe);
    });

    handleCreateChuDe();
}

start();
function getChuDe(callback){
    fetch(ChuDeApi)
    .then(function(response){
        return response.json();
    })
    .then(callback)
}
function renderChuDe(DSChuDe){
    var listChuDe = document.querySelector('#list-chude');
    var i =1;
    var htmls = DSChuDe.map(function(ChuDe){
        return `<tr class="chude-${ChuDe.id}">
                    <td>${i++}</td>
                    <td class="ten">${ChuDe.ten}</td>
                    <td class="percent">${ChuDe.percent}</td>
                    <td class="createdDate">${ChuDe.createdDate}</td>
                    <td class="modifiedDate">${ChuDe.modifiedDate}</td>
                    <td>
                    <button class="btn" onclick="handleChuDe(${ChuDe.id})"  data-toggle="modal" data-target="#updatechude"><i class="fa fa-eye text-success text-active"></i></button>
                    
                    <button class="btn" onclick="handleDeleteChuDe(${ChuDe.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listChuDe.innerHTML = htmls.join('');
}
function createChuDe(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(ChuDeApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateChuDe(){
    var createBtnChuDe = document.querySelector('#create-chude');
    createBtnChuDe.onclick = function(){
        var ten = document.querySelector('input[name="ten"]').value;
        var createdDate = document.querySelector('input[name="createdDate"]').value;
        var modifiedDate= document.querySelector('input[name="modifiedDate"]').value;
        
        var formData = {
            ten: ten,
            createdDate: createdDate,
            modifiedDate: modifiedDate
        }
        createChuDe(formData);

    }   
}



function handleDeleteChuDe(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(ChuDeApi + '/' +id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            getChuDe(function(DSChuDe){
                renderChuDe(DSChuDe);
            });
        })
}

function UpdateChuDe(id,data,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(ChuDeApi + "/"+id,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleChuDe(id){
    var chudeItem = document.querySelector('.chude-'+id);
    var getten=chudeItem.querySelector(".ten").innerText;
    var getpercent=chudeItem.querySelector(".percent").innerText;
    var getcreatedDate=chudeItem.querySelector(".createdDate").innerText;
    var getmodifiedDate=chudeItem.querySelector(".modifiedDate").innerText;

    var ten = document.querySelector('input[name="ten"]');
    var percent = document.querySelector('input[name="percent"]');
    var createdDate = document.querySelector('input[name="createdDate"]');
    var modifiedDate = document.querySelector('input[name="modifiedDate"]');

    ten.value=getten;
    percent.value=getpercent;
    createdDate.value=getcreatedDate;
    modifiedDate.value=getmodifiedDate;

    // console.log(getTen);
    // console.log(getPercent);
    // console.log(getCreatedDate);
    // console.log(getModifiedDate);
    
    var btnUpdate=document.querySelector("#update-chude")
    btnUpdate.onclick=function(){
        var formData={
            ten:ten.value,
            percent: percent.value,
            createdDate: createdDate.value,
            modifiedDate: modifiedDate.value
        };
        // if(ten.value != "" && percent.value !="" && createdDate.value !="" && modifiedDate.value !=""){
            UpdateChuDe(id,formData,function(){
                getChuDe(renderChuDe);
            })
        // }
        // else{
        //     alert("Bạn hãy nhập đầy đủ thông tin");
        // }
    } 
}
