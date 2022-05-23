const apiBoMon = "http://localhost:8120/api/bomon";
const apiLuanVan = "http://localhost:8120/api/luanvan";
const apiChuDe = "http://localhost:8120/api/chude";
const apiNgonNgu = "http://localhost:8120/api/ngonngu";
const apiCongNghe = "http://localhost:8120/api/congnghe";

async function start() {
  await getLuanVan(function (DSLuanVan) {
    renderChiTietLuanVan(DSLuanVan);
  });
}
start();

function getLuanVan(id, callback) {
    fetch(apiLuanVan + "/" + id)
      .then(function (response) {
        return response.json();
        console.log(response.json());
      })
      .then(callback);
  }
function renderChiTietLuanVan(DSLuanVan){

}