export const deliveryOptions=[{
  
    id:'1',
    delieveryDays:7,
    priceCents:0
},
{
    id:'2',
    delieveryDays:3,
    priceCents:499
},
{
    id:'3',
    delieveryDays:1,
    priceCents:999
}
];

export function getDeliveryOptions(matchingDeliveryOptionId)
{
  let matchingTimes;
  deliveryOptions.forEach((option)=>{
    if(matchingDeliveryOptionId===option.id)
    {
      matchingTimes=option;
     
    }

    
  });

  return matchingTimes || deliveryOptions[0];
}