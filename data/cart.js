export const cart = [
{
  productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity:2
},
{
  productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1
},
{
  productId:"19c6a64a-5463-4d45-9af8-e41140a4100c",
  quantity:1
}
];


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
          quantity :1
        });
      }
}

