const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const invoiceBtn = document.getElementById('invoiceBtn');

invoiceBtn.addEventListener('click', ()=> {

    window.open("list.html", "_blank");
});

submitBtn.addEventListener('click',()=>{

    const productType=document.getElementById('productType').value;
    const effectiveDate=document.getElementById('effectiveDate').value;
    const currency=document.getElementById('currency').value;
    const amount=document.getElementById('amount').value;
    const goodsCode=document.getElementById('goodsCode').value;
 
    const localGoods=document.getElementById('localgoodsyes').checked;
    let local = "";
    if (localGoods == true) {
        local = "Yes";
    }
    else {
        local = "No";
   }
    // const customerID=document.getElementById('customerID').value;
    // const referenceNumber=document.getElementById('referenceNumber');

    //This is the data that we are going to send to the server
    // It should follow the format of JSON that we test in Postman
    const data={
        "master":{
            "ourreference":"",
            "referencenumber":"",
            "customerid":90000001001,
            "effectivedate":effectiveDate,
            "currency":currency,
            "amount":amount,
            "goodscode":goodsCode,
            "localgoods":local,
            "producttype":productType,
            "status":"pending"
            
        }
    }
    
        fetch("https://api.sheety.co/d792aa63534fe576fcacb7d43382021f/mockData/master",
        {
            "method":"POST",
            "body":JSON.stringify(data),
            "headers":{"Authorization":"Bearer dcelz1secretkey",
            "Content-Type":"application/json" //We pass data in JSON 
            }
        })
        .then(response =>response.json())
        .then(data =>{
            alert("Data successfully added!")
        }).catch(err =>{
            alert("There was an error!")
            console.log(err);
        });
           
})
