let oredredProducts = [];
let countOrders = 0;
let total = 0;
const tax = 8;

$('.add-to-cart').click(addToCart);

$('#user-cart').click(togleUserCart);


function addToCart(){     
   let prodauctName = $(this).siblings('.product-name').text();   
   let productDescription = $(this).siblings('.description').text();
   let productPrice = $(this).siblings('.price').text().match(/[+-]?([0-9]*[.])?[0-9]+/);
   let order = {
    name : prodauctName,
    description : productDescription,
    price : parseFloat(productPrice[0])
   };   
   oredredProducts.push(order);   
   sumItems(order.price);   
   uppendCounter();
}

function uppendCounter(){
    if (countOrders == 0) {
        $('.in-cart').fadeIn('300');
    }
    countOrders++;
    $('#in-cart-count').html(countOrders);    
}

function decendCounter(){
    countOrders--;
    if (countOrders == 0) {
        $('.in-cart').fadeOut('300');
    }    
    $('#in-cart-count').html(countOrders);  
}

function sumItems(price){
    total+= price;
}

function minusingItems(price){
    total-= price;
}

function apdateTotal(){  
    let priceWithTax = total * tax / 100;  
    $('.total-price').html(`<h5>In Total: $${total.toFixed(2)} + Tax $${priceWithTax.toFixed(2)}</h5>`);   
}

function showCart(){    
    for (const product of oredredProducts) {
        let html = `<div class="row">
                 <div class="product-in-cart col-sm-10">
                    <h5 class="chosen-product-name">${product.name}</h5>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>  
                </div>
                <div class="delete col-sm-2 align-middle"><i class="fas fa-times align-middle"></i></div>
                </div>`;
        $('#cart').append(html);         
    }
    $('#cart').append(`<div class="total-price row align-center"></div>
                        <div class="row align-center">
                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#exampleModalCenter">Process order</button>
                        </div>`);
    apdateTotal();        
    $('#cart').fadeIn("300");    
}

function togleUserCart(){
    if($('#cart').css('display') == 'none' && oredredProducts.length !== 0){
        showCart();
        $('.delete').click(deleteItem);
    }else{
        $('#cart').css('display', 'none').html(""); 
        $('.delete').off();
    }
}

function deleteItem(){
    let productName = $(this).siblings('.product-in-cart ').children('.chosen-product-name').text();     
    let price = 0;
    for (let i = 0; i < oredredProducts.length; i++) {
        if (oredredProducts[i].name === productName) {
            price = oredredProducts[i].price;
            oredredProducts.splice(i, 1);
        }
    } 
    minusingItems(price);
    decendCounter();   
    apdateTotal();
    $(this).parent().remove();
    if (oredredProducts.length == 0) {
        $('#cart').fadeOut("300");
    }
}
