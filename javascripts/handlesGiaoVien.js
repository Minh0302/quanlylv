const apiGiaoVien = "http://localhost:8122/api/giaovien";

function start() {
  getGiaoVien(function (DSGiaoVien) {
   renderGiaoVien(DSGiaoVien);
  });
  // handleGiaoVien();
}
start();

function getGiaoVien(callback) {
  fetch(apiGiaoVien)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderGiaoVien(DSGiaoVien) {
  var listGiaoVien = document.querySelector("#list-giaovien");
  i=1;
  var htmls = DSGiaoVien.map(function (GiaoVien) {
    return `
            <tr>
                <th scope="row">${i++}</th>
                <td><a style="color: #4396ca;"
                          href="https://qldiem.ctu.edu.vn/htql/canbo/llkh/codes/LyLichKhoaHoc_in.php?macb=001229">${GiaoVien.hoTen}</a> - Trưởng bộ môn</td>
                <td><a style="color: #4396ca;" href="https://mail.google.com/">${GiaoVien.email}</a>
                </td>
            </tr>
            `;
  });
  var html = htmls.join("");
  listGiaoVien.innerHTML = html;
}

// function handleGiaoVien(bomonCode,data,callback) {
//   var options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data)
//   };
//   fetch(apiGiaoVien + "/" + bomonCode, options)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (DSGiaoVien) {
//       var listBoMon = document.querySelector("#list-giaovien");
//       var htmls = DSGiaoVien.map(function (GiaoVien) {
//         return `
//             <tr>
//               <th scope="row">1</th>
//               <td><a style="color: #4396ca;"
//                       href="https://qldiem.ctu.edu.vn/htql/canbo/llkh/codes/LyLichKhoaHoc_in.php?macb=001229">${GiaoVien.hoTen}</a> - Trưởng bộ môn</td>
//               <td><a style="color: #4396ca;" href="https://mail.google.com/">${GiaoVien.email}</a>
//               </td>
//             </tr>
//           `;
//       });
//       var html = htmls.join("");
//       listBoMon.innerHTML = html;
//     });
// }
