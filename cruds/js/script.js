let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;


function getTotal(){
    if(price.value !=''){
        let result = ( +price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result ;
        total.style.background = '#040';
    }else{
        total.innerHTML = '' ;
        total.style.background = '#a00d02';
    }
}


// Create Products

let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}



submit.onclick = function(){
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value
    }

    if(title.value !='' && price.value !='' &&category.value !='' && ads.value !='' && taxes.value !='' && count.value !='' && newProduct.count< 1000){


    
    if(mood == 'create'){
        if(newProduct.count > 1){
            for(let i = 0 ; i < newProduct.count ; i++){
                dataPro.push(newProduct);
            }
        }else{
            dataPro.push(newProduct);
        }
    }else{
        dataPro[tmp] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block' ;
    }   
    clearInput();                                            
}
    localStorage.setItem('product' ,     JSON.stringify(dataPro)    );
    clearInput();
    showData()
}


// clear input

function clearInput(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read 

function showData(){
    getTotal()
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML =
        `
        <button onclick="deleteAllData()">Delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '' ;
    }
}

showData();

// delete


function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}



function deleteAllData(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}



// update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update' ;
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth',
    })
}

// search

let searchMood = 'title';

function getSearchMood(id){
    
    let search = document.getElementById('search');

    if(id == "searchTitle"){
        searchMood = 'title';
        search.placeholder = 'Search by Title';
    }else{
        searchMood = 'category';
        search.placeholder = 'Search by Category';
    }
    search.focus();
}

function searchData(value){
    
    let table = '';

    if(searchMood == 'title'){

        for(let i = 0; i < dataPro.length ; i++){
            if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
                
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;

            }
        }

    }
    
    else{
        for(let i = 0; i < dataPro.length ; i++){
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;

            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}