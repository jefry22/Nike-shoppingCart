
const lista_product = document.querySelector('#lista_product');
const btn_cart = document.querySelector('#btn-cart');
const container_shopping = document.querySelector('.desktop-menu');
const lista_carrito = document.querySelector('#lista-carrito tbody');
const icon_heart  =document.querySelectorAll('.icon-heart');
const add_list = document.querySelector('.submenu');

let array_product = [];


(() => {
    lista_product.addEventListener('click', addProduct);
    btn_cart.addEventListener('click', listCart);
    container_shopping.addEventListener('click',deleteProduct);
    iconheart();
    document.addEventListener('DOMContentLoaded',()=>{
        array_product = JSON.parse(localStorage.getItem('carrito')) || [];
        createHtml();
        calcProduct();
    });
    
})()

function iconheart(){
    icon_heart.forEach(action=>{
        action.addEventListener('click',function(e){
            e.target.classList.toggle('actived-color')
            console.log();
        })
    })
}

function deleteProduct(e){
    if(e.target.classList.contains('eliminar-product')){
        const id = e.target.getAttribute('data-id');
        const products = array_product.map(product=>{
            if(product.id == id){
                product.cantidad--;
                return product;
            }else{
                return product;
            }
        });

        products.forEach(products=>{
            if(products.cantidad==0){
                const filtrar = array_product.filter(e=>{
                    if(e.id !== products.id){
                        return e;
                    }
                });
                array_product = [...filtrar];
            }
            calcProduct();
            createHtml();
        });
       
    }
}

function listCart() {
    container_shopping.classList.toggle('actived');
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add')) {
        const card = e.target.parentElement.parentElement.parentElement;
        const obj_product = {
            id: card.querySelector('a').getAttribute('data-id'),
            imagen: card.querySelector('img').src,
            nombre: card.querySelector('.product-name').textContent,
            precio: card.querySelector('.price').textContent,
            cantidad: 1,
        }


        const existe_product = array_product.some(product => product.id == obj_product.id);
        if (existe_product) {
            const products = array_product.map(product => {
                if (product.id == obj_product.id) {
                    product.cantidad++;
                    return product
                } else {
                    return product;
                }
            });
            array_product = [...products];

        } else {
            array_product.push(obj_product);
        }
        calcProduct();
        createHtml();
       
    }
}

function calcProduct(){
    const total_product = array_product.map(e => {
        return e.cantidad;
    });

    let total = total_product.reduce(function(acc,item){
        return acc + item;
    },0);
    let cantidad_product = total;
    const icon_number = document.querySelector('.amount');
    icon_number.textContent = cantidad_product;
    
}

function createHtml() {
    limpiar()
    array_product.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML =
            `
        <td class="img_product"><img src="${product.imagen}"/></td>
        <td class="product_name">${product.nombre}</td>
        <td class="product_price">${product.precio}</td>
        <td class="product_count">${product.cantidad}</td>
        <td><a href="#" class="eliminar-product" data-id="${product.id}">X</a></td>
        `
        lista_carrito.append(row);
    });
    sicronizarLocalStorage();   
}

function sicronizarLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(array_product));
    // localStorage.removeItem('carrito')
}

function limpiar() {
    while (lista_carrito.firstChild) {
        lista_carrito.removeChild(lista_carrito.firstChild);    
    }
}