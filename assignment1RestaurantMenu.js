const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  TOPPINGS: Symbol("toppings"),
  DRINKS: Symbol("drinks"),
  ITEMS: Symbol("items"),
});

module.exports = class restaurantOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sToppings = "";
    this.sDrinks = "";
    this.sItem = "";
    this.sAmount = 0;
    this.sTax = 0.13;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.ITEMS;
        aReturn.push(
          "Welcome to Shadow Restaurant. What would you like to have today?"
        );
        aReturn.push(
          "Reply 1 for burger ($10) \n Reply 2 For Tacos ($8) \n Reply 3 For Wings($13)"
        );
        break;
      case OrderState.ITEMS:
        this.sItem = sInput;
        if (this.sItem == "1") {
          this.sAmount += 10;
          this.sItem = "Burger";
        } else if (this.sItem == "2") {
          this.sItem = "Tacos";
          this.sAmount += 8;
        } else if (this.sItem == "3") {
          this.sItem = "Wings";
          this.sAmount += 13;
        }
        this.stateCur = OrderState.SIZE;
        aReturn.push(
          "What size would you like? \n Reply 1 for Large (+$2) \n Reply 2 for medium (+$1) \n Reply 3 for small"
        );

        break;

      case OrderState.SIZE:
        this.sSize = sInput;
        if (this.sSize == "1") {
          this.sSize = "Large";
          this.sAmount += 2;
        } else if (this.sSize == "2") {
          this.sSize = "Medium";
          this.sAmount += 1;
        } else if (this.sSize == "3") {
          this.sSize = "Small";
        }
        this.stateCur = OrderState.TOPPINGS;
        aReturn.push(
          "What toppings would you like?\n Reply 1 for Garlic (+$2) \n Reply 2 for Beef (+$1) \n Reply 3 for Chicken"
        );
        break;
      case OrderState.TOPPINGS:
        this.sToppings = sInput;
        if (this.sToppings == "1") {
          this.sToppings = "Garlic";
          this.sAmount += 2;
        } else if (this.sToppings == "2") {
          this.sToppings = "Beef";
          this.sAmount += 1;
        } else if (this.sToppings == "3") {
          this.sToppings = "Chicken";
        }
        this.stateCur = OrderState.DRINKS;
        aReturn.push(
          "Would you like drinks with that? \n Reply 1 for Fanta (+$2) \n Reply 2 for Pepsi (+$1) \n Reply 3 for water"
        );
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        this.sDrinks = sInput;
        if (sInput.toLowerCase() != "no") {
          if (this.sDrinks == "1") {
            this.sDrinks = "Fanta";
            this.sAmount += 2;
          } else if (this.sDrinks == "2") {
            this.sDrinks = "Pepsi";
            this.sAmount += 1;
          } else if (this.sDrinks == "3") {
            this.sDrinks = "Water";
          }
        }

        aReturn.push("Thank-you for your order of");
        aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
        if (this.sDrinks.toLowerCase() != "no") {
          aReturn.push(this.sDrinks);
        }
        aReturn.push(`Sub Total = $${this.sAmount}`);
        aReturn.push(`Tax = ${this.sTax * 100}%`);
        this.sAmount += this.sAmount * this.sTax;
        aReturn.push(`Total = $${this.sAmount}`);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
