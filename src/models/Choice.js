class Choice {
  constructor(id, name, price, selected = null) {
    this.id = id; 
    this.name = name;
    this.price = price;
    this.selected = selected;
  }
}

export default Choice;