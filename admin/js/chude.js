const ChuDeApi = "http://127.0.0.1:8120/api/chude";

function start() {
  getChuDe(function (DSChuDe) {
    renderChuDe(DSChuDe);
  });

  handleCreateChuDe();

  handleChuDe(id);
}

start();

function getChuDe(callback) {
  fetch(ChuDeApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}



function renderChuDe(DSChuDe) {
  var listChuDe = document.querySelector("#list-chude");
  var i = 1;
  var htmls = DSChuDe.map(function (ChuDe) {
    return `<tr class="chude-${ChuDe.id}">
                    <td>${i++}</td>
                    <td class="ten">${ChuDe.ten}</td>
                    <td>
                    <button class="btn" onclick="handleChuDe(${ChuDe.id})" data-toggle="modal" data-target="#updateChuDe"><i class="fa fa-eye text-success text-active"></i></button>
                    </td>
                    <td>
                    <button class="btn" onclick="handleDeleteChuDe(${ChuDe.id})"><i class="fa fa-times text-danger text"></i></button>
                    </td>
                </tr>`;
  });
  listChuDe.innerHTML = htmls.join("");
}
function createChuDe(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(ChuDeApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleCreateChuDe() {
  var createBtnChuDe = document.querySelector("#create-chude");
  createBtnChuDe.onclick = function () {
    var ten = document.querySelector('input[name="ten"]').value;
   

    var formData = {
      ten: ten,
    
    };
    if (ten != "") {
      ten = "";
      createChuDe(formData);
      alert("Thêm thành công!!!");
      window.location.reload();
    } else {
      alert("Bạn hãy nhập đầy đủ thông tin");
    }
  };
}
function handleDeleteChuDe(id){
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
        },
    };


    if (confirm("Are you sure you want to delete?")) {
    fetch(ChuDeApi + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var chudeItem = document.querySelector('.chude-'+id);
            if(chudeItem){
                chudeItem.remove();
                alert("Đã xoá thành công!!!");
            }
        });
        window.location.reload();
    };
}
function UpdateChuDe(id, data, callback) {
    var options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(ChuDeApi + "/" + id, options)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }
function handleChuDe(id){
    var chudeItem = document.querySelector('.chude-'+id);
    var getTen=chudeItem.querySelector(".ten").innerText;
   

    var ten = document.querySelector('input[name="ten"]');
 

    ten.value=getTen;
   

    console.log(ten.value);


    var btnUpdate = document.querySelector("#update-chude");
    btnUpdate.onclick = function () {
      var formData = {
        ten: ten.value
      };
      UpdateChuDe(id, formData, function () {
        getChuDe(renderChuDe);
        alert("Cập nhật thành công1");
      });
    };
  }