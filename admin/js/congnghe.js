const CongNgheApi = "http://127.0.0.1:8120/api/congnghe";

function start() {
  getCongNghe(function (DSCongNghe) {
    renderCongNghe(DSCongNghe);
  });

  handleCreateCongNghe();

  handleCongNghe(id);
}

start();

function getCongNghe(callback) {
  fetch(CongNgheApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}



function renderCongNghe(DSCongNghe) {
  var listCongNghe = document.querySelector("#list-congnghe");
  var i = 1;
  var htmls = DSCongNghe.map(function (CongNghe) {
    return `<tr class="congnghe-${CongNghe.id}">
                    <td>${i++}</td>
                    <td class="ten">${CongNghe.ten}</td>
                    <td>
                    <button class="btn" onclick="handleCongNghe(${CongNghe.id})" data-toggle="modal" data-target="#updateCongNghe"><i class="fa fa-eye text-success text-active"></i></button>
                    </td>
                    <td>
                    <button class="btn" onclick="handleDeleteCongNghe(${CongNghe.id})"><i class="fa fa-times text-danger text"></i></button>
                    </td>
                </tr>`;
  });
  listCongNghe.innerHTML = htmls.join("");
}
function createCongNghe(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(CongNgheApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleCreateCongNghe() {
  var createBtnCongNghe = document.querySelector("#create-congnghe");
  createBtnCongNghe.onclick = function () {
    var ten = document.querySelector('input[name="ten"]').value;
   

    var formData = {
      ten: ten,
    
    };
    if (ten != "") {
      ten = "";
      createCongNghe(formData);
      alert("Thêm thành công!!!");
      window.location.reload();
    } else {
      alert("Bạn hãy nhập đầy đủ thông tin");
    }
  };
}
function handleDeleteCongNghe(id){
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    };


    if (confirm("Are you sure you want to delete?")) {
    fetch(CongNgheApi + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var congngheItem = document.querySelector('.congnghe-'+id);
            if(congngheItem){
                congngheItem.remove();
                alert("Đã xoá thành công!!!");
            }
        });
        window.location.reload();
    };
}
function UpdateCongNghe(id, data, callback) {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(CongNgheApi + "/" + id, options)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }
function handleCongNghe(id){
    var congngheItem = document.querySelector('.congnghe-'+id);
    var getTen=congngheItem.querySelector(".ten").innerText;
   

    var ten = document.querySelector('input[name="ten"]');
 

    ten.value=getTen;
   

    console.log(ten.value);


    var btnUpdate = document.querySelector("#update-congnghe");
    btnUpdate.onclick = function () {
      var formData = {
        ten: ten.value
      };
      UpdateCongNghe(id, formData, function () {
        getCongNghe(renderCongNghe);
        alert("Cập nhật thành công");
      });
    };
  }