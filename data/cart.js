
export let cart;

loadFromStorage();


export function loadFromStorage()
{
cart=JSON.parse(localStorage.getItem("cart"));
if(!cart)
{
cart=[
{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2,
  deliveryOptionId:'1'
},
{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryOptionId:'2'
},
{
  productId:"19c6a64a-5463-4d45-9af8-e41140a4100c",
  quantity:1,
  deliveryOptionId:'3'
}
];
}

}

export function saveTheStorage()
{
  localStorage.setItem("cart",JSON.stringify(cart)); 
}

export function addToCart(productId)
{
let matchingItem;

cart.forEach((item)=>{  
if(productId===item.productId){
  matchingItem=item;
}
})
     
    
  if(matchingItem){

        matchingItem.quantity++;
      }
      else {
        cart.push({
          productId:productId,
          quantity :1,
          deliveryOptionId:'1'
        });
      }


      saveTheStorage();
}

export function deleteFromCart(productId)
{
  let newCart=[];
  cart.forEach((item)=>{
    if(item.productId!==productId){
      newCart.push(item);
    }
  });
  cart=newCart;

  saveTheStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId)
{
    let matchingItem;
    cart.forEach((item)=>{
        if(productId===item.productId)
        {
        matchingItem=item;
        }
    });
    
    
     matchingItem.deliveryOptionId=deliveryOptionId;
    

    saveTheStorage();
}

