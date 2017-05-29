class VendingMachine {
  constructor(data){
    this.data = data;
  }

  refillInventory(){

  }

  dispenseInventory(payment, product){
    let response;
    console.log(payment, product)
    if(isNaN(payment)) throw 'Sorry but only cash is accepted as payment';
    if(!payment && (!product.length || !product)) throw 'You accidently pressed a button';
    if(!payment) throw 'Please enter payment to receive product';
    if(!product.length || !product) throw 'Please enter the product you would like to purchase';
    if(product.length && payment){
      this.data.map(item => {
        if(item.productName === product){
          if(item.price === payment && item.numInStock > 0){
            response = 'Here is your '+ item.productName;
          }else{
            if(item.price > payment){
              response = 'You are short, please put in: '+(item.price-payment)+' dollar';
            }else{
              response = 'Here is your '+ item.productName +' and your change is '+(payment-item.price)+' dollar';
            }
          }
        };
        if(item.productNam === product && item.price === payment){
          response = 'Here is your '+ item.productName;
        };
      });
    }
    return response;
  }
}

module.exports = VendingMachine;
