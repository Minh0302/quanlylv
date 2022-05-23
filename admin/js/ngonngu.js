const NgonNguApi = "http://localhost:8120/api/ngonngu";
function start(){
    getNgonNgu(function(DSNgonNgu){
        renderNgonNgu(DSNgonNgu);
    });

    handleCreateNgonNgu();
}

start();
function getNgonNgu(callback){
    fetch(NgonNguApi)
    .then(function(response){
        return response.json();
    })
    .then(callback)
}
function renderNgonNgu(DSNgonNgu){
    var listNgonNgu = document.querySelector('#list-ngonngu');
    var i =1;
    var htmls = DSNgonNgu.ngonNgu.map(function(NgonNgu){
        return `<tr class="ngonngu-${NgonNgu.id}">
                    <td>${i++}</td>
                    <td class="ten">${NgonNgu.ten}</td>
                    <td class="percent">${NgonNgu.percent}</td>
                    <td class="createdDate">${NgonNgu.createdDate}</td>
                    <td class="modifiedDate">${NgonNgu.modifiedDate}</td>
                    <td>
                    <button class="btn" onclick="handleNgonNgu(${NgonNgu.id})"  data-toggle="modal" data-target="#updatengonngu"><i class="fa fa-eye text-success text-active"></i></button>
                    
                    <button class="btn" onclick="handleDeleteNgonNgu(${NgonNgu.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listNgonNgu.innerHTML = htmls.join('');
}
function createNgonNgu(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(NgonNguApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateNgonNgu(){
    var createBtnNgonNgu = document.querySelector('#create-ngonngu');
    createBtnNgonNgu.onclick = function(){
        var ten = document.querySelector('input[name="ten"]').value;
        var percent = document.querySelector('input[name="percent"]').value;
        var createdDate = document.querySelector('input[name="createdDate"]').value;
        var modifiedDate= document.querySelector('input[name="modifiedDate"]').value;
        
        var formData = {
            ten: ten,
            percent: percent,
            createdDate: createdDate,
            modifiedDate: modifiedDate
        }
        createNgonNgu(formData);

    }   
}
function handleDeleteNgonNgu(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(NgonNguApi + '/' +id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            getNgonNgu(function(DSNgonNgu){
                renderNgonNgu(DSNgonNgu);
            });
        })
}

function UpdateNgonNgu(id,data,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(NgonNguApi + "/"+id,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleNgonNgu(id){
    var ngonnguItem = document.querySelector('.ngonngu-'+id);
    var getten=ngonnguItem.querySelector(".ten").innerText;
    var getpercent=ngonnguItem.querySelector(".percent").innerText;
    var getcreatedDate=ngonnguItem.querySelector(".createdDate").innerText;
    var getmodifiedDate=ngonnguItem.querySelector(".modifiedDate").innerText;

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
    
    var btnUpdate=document.querySelector("#update-ngonngu")
    btnUpdate.onclick=function(){
        var formData={
            ten:ten.value,
            percent: percent.value,
            createdDate: createdDate.value,
            modifiedDate: modifiedDate.value
        };
        // if(ten.value != "" && percent.value !="" && createdDate.value !="" && modifiedDate.value !=""){
            UpdateNgonNgu(id,formData,function(){
                getNgonNgu(renderNgonNgu);
            })
        // }
        // else{
        //     alert("Bạn hãy nhập đầy đủ thông tin");
        // }
    } 
}