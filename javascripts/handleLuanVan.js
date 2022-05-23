const apiBoMon = "http://localhost:8120/api/bomon";
const apiLuanVan = "http://localhost:8120/api/luanvan";
const apiChuDe = "http://localhost:8120/api/chude";
const apiNgonNgu = "http://localhost:8120/api/ngonngu";
const apiCongNghe = "http://localhost:8120/api/congnghe";

async function start() {
  await getBoMon(function (DSBoMon) {
    renderBoMon(DSBoMon);
  });
  await getLuanVan(function (DSLuanVan) {
    renderLuanVan(DSLuanVan);
  });
  await getChuDe(function (DSChuDe) {
    renderChuDe(DSChuDe);
  });
  //  await getLuanVanWithChuDe(function(DSLuanVan) {
  //   renderLuanVanWithChuDe(DSLuanVan);
  // })
  getNgonNgu(function (DSNgonNgu) {
    renderNgonNgu(DSNgonNgu);
  });
  getCongNghe(function (DSCongNghe) {
    renderCongNghe(DSCongNghe);
  });
  // filterLuanVan();
  // await getLuanVan(function (DSLuanVan) {
  //   filterLuanVan(DSLuanVan);
  // });
  //filterLuanVan(DSLuanVan);
  //  await getLuanVan(function(DSLuanVan) {
  //   filterLuanVan(DSLuanVan);
  // })
  // filterNgonNgu();
  // filterCongNghe();
  // await getLuanVan(function(DSLuanVan) {
  //   filterLuanVan(DSLuanVan);
  // })
}
start();
filterLuanVan();

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
                <a class="luanvan" data-code="${BoMon.id}">${BoMon.tenBoMon}</a>
                <div class="append"></div>
            </li>`;
  });
  var html = htmls.join("");
  listBoMon.innerHTML = html;
}
function getLuanVan(callback) {
  fetch(apiLuanVan)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderLuanVan(DSLuanVan) {
  var listLuanVan = document.querySelector("#list-luanvan");
  const lv = document.querySelectorAll("a.luanvan");
  var htmls = DSLuanVan.luavan.map(function (LuanVan) {
  const date = LuanVan.createdDate;
  let d = new Date(date);
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let day = d.getDate();
    return `
            <div class="col-sm-4" style="height: 450px; padding-bottom: 40px">
                <div class="card shadow-sm">
                    <img src="images/no-thumb/a1.png" class="card-img-top" width="100%" height="300">

                    <div class="card-body">
                        <h4>${LuanVan.tuaDe}</h4>
                        <center>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="details.html/${LuanVan.id}" class="btn btn-sm btn-outline-secondary">View</a>
                                </div>
                                <small class="text-muted">${day}-${month}-${year}</small>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
            `;
  });
  var html = htmls.join("");
  listLuanVan.innerHTML = html;
  lv.forEach((ele) => {
    ele.addEventListener("click", async function (e) {
      //   alert("jbojd");
      e.preventDefault();
      const code = e.target.dataset.code;
      const lvBM = await fetch("http://localhost:8120/api/luanvan");
      const data = await lvBM.json();
      const datalv = data.luavan;
      //console.log(datalv);
      const dataRender = datalv.filter(function (lv) {
        // console.log(lv.boMonId);
        return lv.boMonId === Number(code);
      });
      //console.log(dataRender);
      var htmls = dataRender.map(function (LuanVan) {
        const date = LuanVan.createdDate;
        let d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        return `
                <div class="col-sm-4" style="height: 450px; padding-bottom: 40px">
                    <div class="card shadow-sm">
                        <img src="images/no-thumb/a1.png" class="card-img-top" width="100%" height="300">

                        <div class="card-body">
                            <h4>${LuanVan.tuaDe}</h4>
                            <center>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="details.html?id=${LuanVan.id}" class="btn btn-sm btn-outline-secondary">View</a>
                                    </div>
                                    <small class="text-muted">${day}-${month}-${year}</small>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                `;
      });
      var html = htmls.join("");
      listLuanVan.innerHTML = html;
    });
  });
}
function getChuDe(callback) {
  fetch(apiChuDe)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderChuDe(DSChuDe) {
  var listChuDe = document.querySelector("#list-chude");
  var htmls = DSChuDe.map(function (ChuDe) {
    return `
          <option data-code="${ChuDe.id}" value="${ChuDe.ten}">${ChuDe.ten}</option>`;
  });
  var html = htmls.join("");
  listChuDe.innerHTML = html;
}
function getLuanVanWithChuDe(callback) {
  fetch(apiLuanVan)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

async function filterLuanVan(DSLuanVan) {
  const listLuanVan = document.querySelector("#list-luanvan");
  const selectChuDe = document.querySelector("#list-chude").value;
  const selectNgonNgu = document.querySelector("#list-ngonngu").value;
  const selectCongNghe = document.querySelector("#list-congnghe").value;
  const lvBM = await fetch("http://localhost:8120/api/luanvan");
  const data = await lvBM.json();
  const datalv = data.luavan;
  const dataRender = datalv.filter((elem) => {
    return (
      elem.chuDe.some(function (cd) {return cd === selectChuDe}) &&
      elem.ngonNgu.some(function (nn) {return nn === selectNgonNgu}) &&
      elem.congNghe.some(function(cn) {return cn === selectCongNghe})
    )
  });
  var htmls = dataRender.map(function (LuanVan) {
    const date = LuanVan.createdDate;
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    return `
            <div class="col-sm-4" style="height: 450px; padding-bottom: 40px">
            <div class="card shadow-sm">
                <img src="images/no-thumb/a1.png" class="card-img-top" width="100%" height="300">

                <div class="card-body">
                    <h4>${LuanVan.tuaDe}</h4>
                    <center>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="details.html?id=${LuanVan.id}" class="btn btn-sm btn-outline-secondary">View</a>
                            </div>
                            <small class="text-muted">${day}-${month}-${year}</small>
                        </div>
                    </center>
                </div>
            </div>
        </div>
                    `;
  });
  var html = htmls.join("");
  listLuanVan.innerHTML = html;
}


function renderLuanVanWithChuDe(DSLuanVan) {
  var listLuanVan = document.querySelector("#list-luanvan");
  const lv = document.querySelectorAll("select.chuDe");
  var htmls = DSLuanVan.luavan.map(function (LuanVan) {
    const date = LuanVan.createdDate;
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    return `
            <div class="col-sm-4" style="height: 450px; padding-bottom: 40px">
                <div class="card shadow-sm">
                    <img src="images/no-thumb/a1.png" class="card-img-top" width="100%" height="300">

                    <div class="card-body">
                        <h4>${LuanVan.tuaDe}</h4>
                        <center>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <a href="details.html?id=${LuanVan.id}" class="btn btn-sm btn-outline-secondary">View</a>
                                </div>
                                <small class="text-muted">${day}-${month}-${year}</small>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
            `;
  });
  var html = htmls.join("");
  listLuanVan.innerHTML = html;
  lv.forEach((ele) => {
    ele.addEventListener("change", async function (e) {
      // alert("đc r");
      e.preventDefault();
      const code = ele.options[ele.selectedIndex].value;
      // console.log(code);
      const lvBM = await fetch("http://localhost:8120/api/luanvan");
      const data = await lvBM.json();
      const datalv = data.luavan;
      // console.log(datalv);
      const dataRender = datalv.filter(function (lv) {
        // console.log(lv.chuDe);
        // console.log(code);
        return lv.chuDe === code;
      });
      console.log(dataRender);
      var htmls = dataRender.map(function (LuanVan) {
        const date = LuanVan.createdDate;
        let d = new Date(date);
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        return `
                <div class="col-sm-4" style="width: 600;height: 400; padding-bottom: 40px">
                    <div class="card shadow-sm">
                        <img src="images/no-thumb/a1.png" class="card-img-top" width="100%" height="300">

                        <div class="card-body">
                            <h4>${LuanVan.tuaDe}</h4>
                            <center>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <a href="details.html?id=${LuanVan.id}" class="btn btn-sm btn-outline-secondary">View</a>
                                    </div>
                                    <small class="text-muted">${day}-${month}-${year}</small>
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
                `;
      });
      var html = htmls.join("");
      listLuanVan.innerHTML = html;
    });
  });
}

function getNgonNgu(callback) {
  fetch(apiNgonNgu)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderNgonNgu(DSNgonNgu) {
  var listNgonNgu = document.querySelector("#list-ngonngu");
  var htmls = DSNgonNgu.ngonNgu.map(function (NgonNgu) {
    return `
          <option class="ngonNgu" data-code="${NgonNgu.id}" value="${NgonNgu.ten}">${NgonNgu.ten}</option>`;
  });
  var html = htmls.join("");
  listNgonNgu.innerHTML = html;
}
function getCongNghe(callback) {
  fetch(apiCongNghe)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderCongNghe(DSCongNghe) {
  var listCongNghe = document.querySelector("#list-congnghe");
  var htmls = DSCongNghe.map(function (CongNghe) {
    return `
          <option class="congNghe" data-code="${CongNghe.id}" value="${CongNghe.ten}">${CongNghe.ten}</option>`;
  });
  var html = htmls.join("");
  listCongNghe.innerHTML = html;
}
