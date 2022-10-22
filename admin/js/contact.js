const contactApi = "http://127.0.0.1:8120/api/contact";

function start() {
  getContact(function (DSContact) {
    renderContact(DSContact);
  });
}

start();

function getContact(callback) {
  fetch(contactApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}



function renderContact(DSContact) {
  var listCongNghe = document.querySelector("#list-contact");
  var i = 1;
  var htmls = DSContact.map(function (Contact) {
    return `<tr class="congnghe-${Contact.id}">
                    <td>${i++}</td>
                    <td class="ten">${Contact.ten}</td>
                    <td class="ten">${Contact.phone}</td>
                    <td class="ten">${Contact.email}</td>
                    <td class="ten">${Contact.note}</td>
                </tr>`;
  });
  listCongNghe.innerHTML = htmls.join("");
}
