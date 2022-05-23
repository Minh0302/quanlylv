async function start() {
    await getLuanVan(function (DSLuanVan) {
        pagination(DSLuanVan);
      });
}
start();

function getLuanVan(callback) {
    fetch(apiLuanVan)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }

async function pagination(DSLuanVan) {
  const dataSet = await fetch("http://localhost:8120/api/luanvan");
  const data = await dataSet.json();
  const datalv = data.luavan;
  //console.log(data.totalItems);

  const displayPageNav = perPage => {
    
    let pagination =``
    const totalItemsLV = data.totalItems
    perPage = perPage ? perPage : 1
    //console.log(perPage);
    const pages = Math.ceil(totalItemsLV/perPage)
    
    for(let i = 1; i <= pages; i++) {
      pagination += `<a href="#" onClick="displayItems(${i},${perPage})" >${i}</a>`
    }
  
    document.getElementById('pagination').innerHTML = pagination
    
  }
  
  const displayItems = ( page = 1, perPage = 2 ) => {
    
   let index, offSet
    
    if(page == 1 || page <=0)  {
      index = 0
      offSet = perPage
    } else if(page > dataSet.length) {
      index = page - 1
      offSet = dataSet.length
    } else {
      index = page * perPage - perPage
      offSet = index + perPage
    }
    
    const slicedItems = dataSet.slice(index, offSet)
    
    const html = slicedItems.map(function(LuanVan){
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
                                    <a href="" class="btn btn-sm btn-outline-secondary"><i
                                            class="fas fa-eye">100</i></a>
                                </div>
                                <small class="text-muted">9 mins ago</small>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
            `;
    })
    
    document.querySelector('#list-luanvan').innerHTML = html.join('')
   
  }
  
  let perPage = 6
  displayPageNav(perPage)
  displayItems(1, perPage)
}
  
  