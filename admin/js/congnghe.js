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
                    <td class="percent">${CongNghe.percent}</td>
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
    var percent = document.querySelector('input[name="percent"]').value;

    var formData = {
      ten: ten,
      percent: percent,
    };
    if (ten != "" && percent != "") {
      ten = "";
      percent = "";
      createCongNghe(formData);
      alert("Thêm thành công!!!");
      window.location.reload();
    } else {
      alert("Bạn hãy nhập đầy đủ thông tin");
    }
  };
}
function handleDeleteCongNghe(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  if (confirm("Are you sure you want to delete?")) {
    fetch(CongNgheApi+'/'+id, options)
      .then(function (response) {
        return response.json();
      })
      .then(function () {
        var congngheItem = document.querySelector('.congnghe-'+id);
        if (congngheItem) {
          congngheItem.remove();
          alert("Đã xoá thành công!!!");
        }
      });
    //  window.location.reload();
  }
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
function handleCongNghe(id) {
  var congngheItem = document.querySelector('.congnghe-' + id);
  var getTen = congngheItem.querySelector('.ten').innerText;
  var getPercent = congngheItem.querySelector('.percent').innerText;

  var ten = document.querySelector('input[name="ten"]');
  var percent = document.querySelector('input[name="percent"]');

  ten.value = getTen;
  percent.value = getPercent;

  // console.log(getTen);
  // console.log(getPercent);
  // console.log(getCreatedDate);
  // console.log(getModifiedDate);

  var btnUpdate = document.querySelector("#update-congnghe");
  btnUpdate.onclick = function () {
    var formData = {
      ten: ten.value,
      percent: percent.value,
    };
    UpdateCongNghe(id, formData, function () {
      getCongNghe(renderCongNghe);
      alert("Cập nhật thành công");
    });
  };
}
