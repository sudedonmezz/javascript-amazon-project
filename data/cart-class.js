class Cart{
cartItems;
#localStorageKey;

constructor(localStorageKey)
{
  this.#localStorageKey=localStorageKey;
  this.#loadFromStorage();
}

#loadFromStorage()
    {
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
    if(!this.cartItems)
    {
    this.cartItems=[
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
    }];}}

  saveTheStorage()
  {
  localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems)); 
  }

  addToCart(productId)
  {
  let matchingItem;

  this.cartItems.forEach((item)=>{  
  if(productId===item.productId){
    matchingItem=item;
  }
  })
  
    if(matchingItem){

      matchingItem.quantity++;
        }
    else {
      this.cartItems.push({
       productId:productId,
       quantity :1,
       deliveryOptionId:'1'
      });
     }


    this.saveTheStorage();
  }

  deleteFromCart(productId)
  {
    let newCart=[];
    this.cartItems.forEach((item)=>{
    if(item.productId!==productId){
      newCart.push(item);
    }
  });
  this.cartItems=newCart;

  this.saveTheStorage();
}

updateDeliveryOption(productId,deliveryOptionId)
{
    let matchingItem;
    this.cartItems.forEach((item)=>{
        if(productId===item.productId)
        {
        matchingItem=item;
        }
    });
    
    
     matchingItem.deliveryOptionId=deliveryOptionId;
    

    this.saveTheStorage();
}
}


const cart=new Cart("cart-oop");
const businessCart=new Cart("cart-business");



console.log(businessCart instanceof Cart);





