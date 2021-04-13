import Choice from './Choice';

class AddOn {
  constructor(id, name, limit, required, choices) {
    this.id = id; 
    this.name = name;
    this.limit = limit;
    this.required = required;
    this._choices = choices;
    this.selected = 0;
  }

  set _choices(choices) {
    const type = this.getType();
    
    this.choices = choices.map((choice, index) => {
      if(type == "CheckBox") {
        return new Choice(choice.id, choice.name, choice.price, false);
      }

      return new Choice(choice.id, choice.name, choice.price);
    });
  }

  getType() {
    return this.required == 1 ? "Radio" : "CheckBox";
  }
}

export default AddOn;
