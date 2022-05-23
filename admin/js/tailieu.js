const chuDeApi = "http://127.0.0.1:8120/api/chude";
const ngonNguApi = "http://127.0.0.1:8120/api/ngonngu";
const congNgheApi = "http://127.0.0.1:8120/api/congnghe";
const BoMonApi = 'http://127.0.0.1:8120/api/bomon';
const LuanVanApi = 'http://127.0.0.1:8120/api/luanvan';

function start() {
    getChuDe(function (DSChuDe){
        renderChuDe(DSChuDe);
    })
    getNgonNgu(function (DSNgonNgu){
        renderNgonNgu(DSNgonNgu);
    })
    getCongNghe(function (DsCongNghe){
        renderCongNghe(DsCongNghe);
    })
    getBoMon(function(DSBoMon){
        renderBoMon(DSBoMon);
    })
    getLuanVan(function(DSLuanVan){
        renderLuanVan(DSLuanVan);
    })
    // handleCreateTaiLieu();
    // handleLuanVan(id);
}

start();

function getChuDe(callback) {
    fetch(chuDeApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function renderChuDe(DSChuDe){
    var listChuDe = document.querySelector("#chude_id");
    var htmls = DSChuDe.map(function (ChuDe){
        return `
        <input type="checkbox" id="${ChuDe.ten}" name="chude_id" value="${ChuDe.id}">
        <label for="${ChuDe.ten}"> ${ChuDe.ten}</label><br>
        `;
    });
    listChuDe.innerHTML= htmls.join("");
}

function getNgonNgu(callback) {
    fetch(ngonNguApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function renderNgonNgu(DSNgonNgu){
    var listNgonNgu = document.querySelector("#ngonngu_id");
    var htmls = DSNgonNgu.ngonNgu.map(function (NgonNgu){
        return `
        <input type="checkbox" id="${NgonNgu.ten}" name="ngonngu_id" value="${NgonNgu.id}">
        <label for="${NgonNgu.ten}"> ${NgonNgu.ten}</label><br>
        `;
    });
    listNgonNgu.innerHTML= htmls.join("");
}
function getCongNghe(callback) {
    fetch(congNgheApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function renderCongNghe(DSCongNghe){
    var listCongNghe = document.querySelector("#congnghe_id");
    var htmls = DSCongNghe.map(function (CongNghe){
        return `
        <input type="checkbox" id="${CongNghe.ten}" name="congnghe_id" value="${CongNghe.id}">
        <label for="${CongNghe.ten}"> ${CongNghe.ten}</label><br>
        `;
    });
    listCongNghe.innerHTML= htmls.join("");
}
function getBoMon(callback){
    fetch(BoMonApi)
        .then(function (response){
            return response.json();
        })
        .then(callback)
}
function renderBoMon(DSBoMon){
    var listBoMon = document.querySelector("#bomon_id");
    var htmls = DSBoMon.map(function (BoMon) {
        return `<option selected value="${BoMon.id}">${BoMon.tenBoMon}</option>`;
    });
    listBoMon.innerHTML = htmls.join("");
}
function getLuanVan(callback){
    fetch(LuanVanApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderLuanVan(DSLuanVan){
    var listLuanVan = document.querySelector("#list-tailieu");
    var i = 1;
    var htmls = DSLuanVan.luavan.map(function(LuanVan){
        return `
                <tr class="luanvan-${LuanVan.id}">
                    <td>${i++}</td>
                    <td class="tuaDe">${LuanVan.tuaDe}</td>
                    <td class="mssv">${LuanVan.mssv}</td>
                    <td class="hoTen">${LuanVan.hoTen}</td>
                    <td class="msgv">${LuanVan.giaoVienHDid}</td>
                    <td class="giaoVienHDname">${LuanVan.giaoVienHDname}</td>
                    <td class="file">${LuanVan.fileName}</td>
                    <td class="moTa">${LuanVan.moTa}</td>
                    <td class="tomTat">${LuanVan.tomTat}</td>
                    <td class="viTri">${LuanVan.viTri}</td>
                    <td class="bomon_id">${LuanVan.boMonId}</td>
                    <td class="boMonTen">${LuanVan.boMonTen}</td>
                    <td class="chude_id">Chủ đề : ${LuanVan.chuDe}</td>
                    <td class="ngonngu_id"> Ngôn ngữ: ${LuanVan.ngonNgu}</td>
                    <td class="congnghe_id"> Công nghệ: ${LuanVan.congNghe}</td>
                    <td>
                        <button class="btn" onclick="handleLuanVan(${
                            LuanVan.id
                        })" data-toggle="modal" data-target="#updateLuanVan"><i class="fa fa-eye text-success text-active"></i></button>
                        <button class="btn" onclick="handleDeleteLuanVan(${
                            LuanVan.id
                        })"><i class="fa fa-times text-danger text"></i></button>
                    </td>
                </tr>`;
    });
    listLuanVan.innerHTML = htmls.join("");
}
function handleDeleteLuanVan(id){
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };
    if(confirm("Bạn có chắc chắn muốn xoá không?")){
        fetch(LuanVanApi + '/' + id, options)
            .then(function(response){
                return response.json();
            })
            .then(function(){
                var luanvanItem = document.querySelector(".luanvan-"+id);
                if(luanvanItem){
                    luanvanItem.remove();
                    alert("Đã xoá thành công!");
                }
            });
            // window.location.reload();
    }
}
// function UpdateLuanVan(id, data, callback){
//     var options = {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     };
//     fetch(LuanVanApi + "/" + id, options)
//         .then(function (response){
//             return response.json();
//         })
//         .then(callback)
// }
