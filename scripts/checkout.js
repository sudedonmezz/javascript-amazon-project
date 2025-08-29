import {cart,deleteFromCart,updateDeliveryOption} from "/data/cart.js";
import {products} from "/data/products.js";
import { formatCurrency } from "./utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";

hello(); 

function renderOrderSummary()
{

let checkoutHTML=``;
cart.forEach((cartItem) => {
  const productId=cartItem.productId;

  let matchingProducts;



  products.forEach((product) => {
    if (product.id === productId) {
      matchingProducts = product;
    }
  });

  let matchingDeliveryOption=cartItem.deliveryOptionId;
   let matchingTimes;
  deliveryOptions.forEach((option)=>{
    if(matchingDeliveryOption===option.id)
    {
      matchingTimes=option;
     
    }
  });
 
  let today=dayjs();
let deliveryDate=today.add(matchingTimes.delieveryDays,'days');
console.log(deliveryDate);  

let dateString=deliveryDate.format('dddd, MMMM D');



   checkoutHTML += `<div class="cart-item-container js-cart-item-containter-${matchingProducts.id}">
            <div class="delivery-date">
             Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProducts.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProducts.name}
                </div>
                <div class="product-price">
                  ${formatCurrency(matchingProducts.priceCents)} $
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProducts.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryHTML(matchingProducts.id,cartItem.deliveryOptionId)}
              </div>
            </div>
          </div>`



});



function deliveryHTML(matchingProducts,cartItem)
{
let html='';

deliveryOptions.forEach((option)=>{

let today=dayjs();
console.log(today);
let deliveryDate=today.add(option.delieveryDays,'days');
console.log(deliveryDate);  

let dateString=deliveryDate.format('dddd, MMMM D');
let priceString=option.priceCents===0 ? 'FREE Shipping' : formatCurrency(option.priceCents) + ' - Shipping';

let isChecked =cartItem===option.id;


  html += ` <div class="delivery-option js-delivery-option" data-product-id="${matchingProducts}" data-delivery-option-id="${option.id}">
                  <input type="radio"  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="${matchingProducts}"> 
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} 
                    </div>
                  </div>
                </div>




    `

});

  return html;

}


deliveryHTML();
document.querySelector(".order-summary").innerHTML = checkoutHTML;
document.querySelectorAll(".js-delete-link").forEach((link)=>{
link.addEventListener('click',()=>{

  let productId=link.dataset.productId;
 
  deleteFromCart(productId);

let container= document.querySelector(`.js-cart-item-containter-${productId}`)

container.remove();

console.log(container);
 
})
});


document.querySelectorAll(".js-delivery-option").forEach((option)=>{
option.addEventListener('click',()=>{
  const {productId, deliveryOptionId}=option.dataset;
updateDeliveryOption(productId,deliveryOptionId);
renderOrderSummary();

});
});
}

renderOrderSummary();