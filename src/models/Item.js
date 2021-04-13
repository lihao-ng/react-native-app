import AddOn from './AddOn';

class Item {
  constructor(id, title, description, price, quantity, totalPrice, note, thumb, spicy, vegetarian, addOns) {
    this.id = id; 
    this.title = title;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
    this.note = note;
    this.thumb = thumb;
    this.spicy = spicy;
    this.vegetarian = vegetarian;

    if(addOns != null) {
      this._addOns = addOns;       
    } else {
      this._addOns = null;
    }
  }

  set _addOns(addOns) {
    this.addOns = addOns.map((addOn, index) => {
      return new AddOn(addOn.id, addOn.name, addOn.limit, addOn.required, addOn.choices);
    });
  }
}

export default Item;