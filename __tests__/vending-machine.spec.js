const VendingMachine = require('../src/vending-machine');

describe('VendingMachine', () => {

  let test;

  beforeEach(() => {
    test={};
    test.data= [
        {
          productName: 'BBQ',
          numInStock: 2,
          price: 3,
          type: 'Chips'
        },
        {
          productName: 'Plain',
          numInStock: 1,
          price: 2,
          type: 'Chips'
        },
        {
          productName: 'Cheese',
          numInStock: 0,
          price: 2,
          type: 'Chips'
        },
        {
          productName: 'Water',
          numInStock: 4,
          price: 3,
          type: 'Pop'
        },
        {
          productName: 'Coke',
          numInStock: 1,
          price: 2,
          type: 'Pop'
        },
        {
          productName: 'Mars',
          numInStock: 2,
          price: 1,
          type: 'Chocolate'
        }
    ];
    test.vendingMachine = new VendingMachine(test.data);
  });

  describe('When money is put into machine', () => {

    describe('When perfect amount entered and product is in stock', () => {
      beforeEach(() => {
        test.subject = test.vendingMachine.dispenseInventory(1,'Mars');
      });
      it('Should return the requested product',() => {
        expect(test.subject)
          .toEqual('Here is your Mars');
      });
    });

    describe('When the requested product is out of stock', () => {
      beforeEach(() => {
        test.subject = test.vendingMachine.dispenseInventory(2,'Cheese');
      });
      it('Should return error message and alternate product at same price', () => {
        expect(test.subject).toEqual('Sorry, this product is out of stock. Why not try: Plain Chips');
      });
    });

    describe('When the requested product does not exist', () => {
      beforeEach(() => {
        test.subject = test.vendingMachine.dispenseInventory(3,'Apple Slices');
      });
      it('Should return error message and alternate product at same price', () => {
        expect(test.subject).toEqual('Sorry, this product is not available. Why not try: BBQ Chips');
      });
    });

    describe('When not enough money is put in for requested product', () => {
      beforeEach(() => {
        test.subject = test.vendingMachine.dispenseInventory(1,'Plain');
      });
      it('Should return an error message with the amount still needed', () => {
        expect(test.subject).toEqual('You are short, please put in: 1 dollar');
      });
    });

    describe('When too much money is put in for requested product', () => {
      beforeEach(() => {
        test.subject = test.vendingMachine.dispenseInventory(4,'Water');
      });
      it('Should return the requested product with the amount difference of price', () => {
        expect(test.subject)
          .toEqual('Here is your Water and your change is 1 dollar');
      });
    });

    describe('When no product is requested', () => {
      beforeEach(() => {
        test.subject = () => test.vendingMachine.dispenseInventory(3,'');
      });
      it('Should return error message that no product was requested', () => {
        expect(test.subject)
          .toThrow('Please enter the product you would like to purchase');
      });
    });
  });

  describe('When no money is put in', () => {
    describe('When a product is requested', () => {
      beforeEach(() => {
        test.subject = () => test.vendingMachine.dispenseInventory(0,'BBQ');
      });
      it('Should return an error message that no money was inserted', () => {
        expect(test.subject)
          .toThrow('Please enter payment to receive product');
      });
    });

    describe('When no product is requested', () => {
      beforeEach(() => {
        test.subject = () => test.vendingMachine.dispenseInventory(0,'');
      });
      it('Should return an error message', () => {
        expect(test.subject)
          .toThrow('You accidently pressed a button');
      });
    });
  });

  describe('Something other than money is put in', () => {
    beforeEach(() => {
      test.subject = () => test.vendingMachine.dispenseInventory('Ham Sandwich','BBQ');
    });
    it('Should return an error message saying that non valid input', () => {
      expect(test.subject)
        .toThrow('Sorry but only cash is accepted as payment');
    });
  });
});
