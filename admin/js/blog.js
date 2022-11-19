const BlogApi = "http://localhost:8120/api/blog";
function start(){
    getBlog(function(DSBlog){
        renderBlog(DSBlog);
    });

    handleCreateBlog();
}

start();
function getBlog(callback){
    fetch(BlogApi)
    .then(function(response){
        return response.json();
    })
    .then(callback)
}
function renderBlog(DSBlog){
    var listBlog = document.querySelector('#list-blog');
    var i =1;
    var htmls = DSBlog.map(function(Blog){
        return `<tr class="blog-${Blog.id}">
                    <td>${i++}</td>
                    <td class="title">${Blog.title}</td>
                    <td class="desc">${Blog.desc}</td>
                    <td class="date">${Blog.date}</td>
                    <td>
                    <button class="btn" onclick="handleBlog(${Blog.id})"  data-toggle="modal" data-target="#updateblog"><i class="fa fa-eye text-success text-active"></i></button>
                    
                    <button class="btn" onclick="handleDeleteBlog(${Blog.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listBlog.innerHTML = htmls.join('');
}
function createBlog(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(BlogApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateBlog(){
    var createBtnBlog = document.querySelector('#create-blog');
    createBtnBlog.onclick = function(){
        var title = document.querySelector('input[name="title"]').value;
        var desc = document.querySelector('textarea[name="desc"]').value;
        
        var formData = {
            title: title,
            desc: desc,
        }
        
        if (title != "" && desc != "") {
            ten = "";
            desc = "";
            createBlog(formData);
            alert("Thêm thành công!!!");
            window.location.reload();
          } else {
            alert("Bạn hãy nhập đầy đủ thông tin");
          }
    }   
}
function handleDeleteBlog(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    if (confirm("Are you sure you want to delete?")) {
        fetch(BlogApi + "/" + id, options)
          .then(function (response) {
            return response.json();
          })
          .then(function () {
            var blogItem = document.querySelector(".blog-" + id);
            if (blogItem) {
                blogItem.remove();
              alert("Đã xoá thành công!!!");
            }
          });
          window.location.reload();
      }
}

function UpdateBlog(id,data,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(BlogApi + "/"+id,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleBlog(id){
    var blogItem = document.querySelector('.blog-'+id);
    var gettitle=blogItem.querySelector(".title").innerText;
    var getdesc=blogItem.querySelector(".desc").innerText;

    var title = document.querySelector('input[name="title"]');
    var desc = document.querySelector('textarea[name="desc"]');

    title.value=gettitle;
    desc.value=getdesc;
    
    var btnUpdate=document.querySelector("#update-blog")
    btnUpdate.onclick=function(){
        var formData={
            title:title.value,
            desc: desc.value,
        };
        UpdateBlog(id,formData,function(){
            getBlog(renderBlog);
            alert("Cập nhật thành công");
        })
    } 
}
