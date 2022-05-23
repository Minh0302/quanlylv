const apiBoMon = "http://localhost:8120/api/bomon";
const apiGiaoVien = "http://localhost:8120/api/giaovien";

async function start() {
  await getBoMon(function (DSBoMon) {
    renderBoMon(DSBoMon);
  });
  await getGiaoVien(function (DSGiaoVien) {
    renderGiaoVien(DSGiaoVien);
   });
}
start();

function getBoMon(callback) {
  fetch(apiBoMon)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderBoMon(DSBoMon) {
  var listBoMon = document.querySelector("#list-bomon");
  var htmls = DSBoMon.map(function (BoMon) {
    return `
            <li>
                <a class="giaovien" data-code="${BoMon.code}">${BoMon.tenBoMon}</a>
                <div class="append"></div>
            </li>`;
  });
  var html = htmls.join("");
  listBoMon.innerHTML = html;
}
function getGiaoVien(callback) {
  fetch(apiGiaoVien)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderGiaoVien(DSGiaoVien) {
  var listGiaoVien = document.querySelector("#list-giaovien");
  const gv = document.querySelectorAll("a.giaovien");
  // console.log(gv);
  i=1;
  var htmls = DSGiaoVien.map(function (GiaoVien) {
    return `
            <tr>
                <th scope="row">${i++}</th>
                <td><a style="color: #4396ca;"
                          href="https://qldiem.ctu.edu.vn/htql/canbo/llkh/codes/LyLichKhoaHoc_in.php?macb=001229">${GiaoVien.hoTen}</a></td>
                <td><a style="color: #4396ca;" href="https://mail.google.com/">${GiaoVien.email}</a>
                </td>
            </tr>
            `;
  });
  var html = htmls.join("");
  listGiaoVien.innerHTML = html;
  gv.forEach((ele) => {
    ele.addEventListener("click", async function(e){
      // alert("jbojd");
      e.preventDefault();
      const code = ele.dataset.code;
      const gvBM = await fetch('http://localhost:8120/api/giaovien');
      const data = await gvBM.json();
      console.log(data);
      const dataRender = data.filter(function(gv){
        // console.log(gv.bomonCode)
        console.log(code)
        return gv.bomonCode === code;
      });
      // console.log(dataRender);
      var htmls = dataRender.map(function (GiaoVien, key) {
        return `
                <tr>
                    <th scope="row">${key+1}</th>
                    <td><a style="color: #4396ca;"
                              href="https://qldiem.ctu.edu.vn/htql/canbo/llkh/codes/LyLichKhoaHoc_in.php?macb=001229">${GiaoVien.hoTen}</a></td>
                    <td><a style="color: #4396ca;" href="https://mail.google.com/">${GiaoVien.email}</a>
                    </td>
                </tr>
                `;
      });
      var html = htmls.join("");
      listGiaoVien.innerHTML = html;
    });
  })
}

