const ContactApi = "http://127.0.0.1:8120/api/contact";

function start() {
  handleCreateContact();
}

start();


function createContact(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(ContactApi, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function handleCreateContact() {
  var createBtnContact = document.querySelector("#create-contact");
  createBtnContact.onclick = function () {
    var ten = document.querySelector('input[name="ten"]').value;
    var phone = document.querySelector('input[name="phone"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var note = $('#note').val();

    var formData = {
      ten: ten,
      phone: phone,
      email: email,
      note: note,
    };
    if (ten != "" && phone != "" && email != "" && note != "") {
      ten = "";
      phone = "";
      email = "";
      note = "";
      createContact(formData);
      alert("Thêm thành công!!!");
      window.location.reload();
    } else {
      alert("Bạn hãy nhập đầy đủ thông tin");
    }
  };
}
