const apiBlog = "http://localhost:8120/api/blog";

async function start() {
  await getBlogTitle(function (DSBlog) {
    renderBlogTitle(DSBlog);
  });
  await getBlog(function (DSBlog) {
    renderBlog(DSBlog);
  });
}
start();
filterLuanVan();

function getBlogTitle(callback) {
  fetch(apiBlog)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderBlogTitle(DSBlog) {
  var listBlog = document.querySelector("#list-blog");
  var htmls = DSBlog.map(function (Blog) {
    return `
            <li>
                <a class="blog" data-code="${Blog.id}" style="cursor: pointer">${Blog.title}</a>
                <div class="append"></div>
            </li>`;
  });
  var html = htmls.join("");
  listBlog.innerHTML = html;
}
function getBlog(callback) {
  fetch(apiBlog)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderBlog(DSBlog) {
  var listBlog = document.querySelector("#blog-all");
  const lv = document.querySelectorAll("a.blog");
//   console.log();
  var htmls = 
     `
            <div class="" style="padding: 10px;">
                <h5>${DSBlog[0].title}</h5>
                <p>${DSBlog[0].date}</p>
                <div class="item-page">
                    <article class="art-post">
                        <div class="art-postcontent clearfix">
                            <div class="art-article">
                                <p align="justify"><span style="font-size: small;" size="2"
                                        face="Arial">${DSBlog[0].desc}<br><br></span></p>
                            </div>
                            <p align="justify">&nbsp;</p>
                        </div>
                </div>
            </div>
            `;
//   });
//   var html = htmls.join("");
  listBlog.innerHTML = htmls;
  lv.forEach((ele) => {
    ele.addEventListener("click", async function (e) {
      e.preventDefault();
      const code = e.target.dataset.code;
      const lvBlog = await fetch("http://localhost:8120/api/blog");
      const data = await lvBlog.json();
      const dataRender = data.filter(function (lv) {
        return lv.id === Number(code);
      });
      var htmls = dataRender.map(function (Blog) {
        return `
                    <div class="" style="padding: 10px;">
                    <h5>${Blog.title}</h5>
                    <p>${Blog.date}</p>
                    <div class="item-page">
                        <article class="art-post">
                            <div class="art-postcontent clearfix">
                                <div class="art-article">
                                    <p align="justify"><span style="font-size: small;" size="2"
                                            face="Arial">${Blog.desc}<br><br></span></p>
                                </div>
                                <p align="justify">&nbsp;</p>
                            </div>
                    </div>
                </div>
                `;
      });
      var html = htmls.join("");
      listBlog.innerHTML = html;
    });
  });
}
