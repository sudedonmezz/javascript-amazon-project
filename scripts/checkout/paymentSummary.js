import {cart} from "../../data/cart.js";
import { products,getProducts} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  console.log("render payment summary");
  console.log(cart);



  let paymentSummary="";

  let productTotalCents=0;
  let productTotalQuantity=0;
  let shippingCosts=0;
  let total=0;

  cart.forEach((item)=>{
  let product=getProducts(item.productId);
  let price=product.priceCents * item.quantity;
  productTotalCents+=price;
  productTotalQuantity+=item.quantity;
  let deliveryOption=getDeliveryOptions(item.deliveryOptionId).priceCents;
  shippingCosts+=deliveryOption;
  total=productTotalCents+shippingCosts;

  });


    paymentSummary+=  `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${productTotalQuantity}):</div>
            <div class="payment-summary-money">${formatCurrency(productTotalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingCosts)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(total)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(total * 0.1)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(total + (total * 0.1))}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
      </div>
   `;
  console.log(paymentSummary);

  document.querySelector(".payment-summary").innerHTML = paymentSummary;



}