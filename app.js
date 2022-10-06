
const lista_product = document.querySelector('#lista_product');
const btn_cart = document.querySelector('#btn-cart');
const container_shopping = document.querySelector('.desktop-menu');
const lista_carrito = document.querySelector('#lista-carrito tbody');
let array_product = [];

(() => {
    lista_product.addEventListener('click', addProduct);
    btn_cart.addEventListener('click', listCart);
    container_shopping.addEventListener('click',deleteProduct);
})()


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
            icon_heart: card.querySelector('.icon-heart').src,
            colors: [
                card.querySelector('.color_1'),
                card.querySelector('.color_2'),
                card.querySelector('.color_3'),
            ],
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
        <td><img src="${product.imagen}"/></td>
        <td>${product.nombre}</td>
        <td>${product.precio}</td>
        <td>${product.cantidad}</td>
        <td><a href="#" class="eliminar-product" data-id="${product.id}">X</a></td>
        `
        lista_carrito.append(row);
    });
}

function limpiar() {
    while (lista_carrito.firstChild) {
        lista_carrito.removeChild(lista_carrito.firstChild);
    }
}

