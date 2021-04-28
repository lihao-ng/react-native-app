import { selector, selectorFamily, useRecoilCallback } from 'recoil';
import { addOnIds, addOnState, amountButtonState, choiceIds, choiceState, productState } from './Atom';

import _ from 'lodash';

export const addOnSelector = selectorFamily({
  key: 'addOnSelector',
  get: (id) => ({ get }) => {
    return get(addOnState(id));
  },
  set: (id) => ({set, reset}, addOn) => {
    if(addOn == null) {
      reset(addOnIds);
      reset(addOnState(id));

      return;
    }

    set(addOnState(id), addOn);
  }
});

export const allAddOnSelector = selectorFamily({
  key: 'allAddOnSelector',
  get: (ids) => ({ get }) => { 
    return ids.map(id => get(addOnState(id)));
  },
  set: (ids) => ({ set, get, reset }, addOn) => {
    reset(addOnIds);
    ids.forEach(id => reset(addOnState(id)));

    return;
  }
});

export const choiceSelector = selectorFamily({
  key: 'choiceSelector',
  get: (id) => ({ get }) => {
    return get(choiceState(id));
  },
  set: (id) => ({set, reset}, choice) => {
    if(choice == null) {
      reset(choiceState(id));

      return;
    }

    set(choiceState(id), choice);
  }
});

export const allChoiceSelector = selectorFamily({
  key: 'allChoiceSelector',
  get: (ids) => ({ get }) => { 
    return ids.map(id => get(choiceState(id)));
  },
  set: (ids) => ({ set, get, reset }, choice) => {
    ids.forEach(id => reset(choiceState(id)));

    return;
  }
});

export const totalProductPrice = selector({
  key: 'totalProductPrice',
  get: ({ get }) => { 
    const product = get(productState);
    const quantity = get(amountButtonState);
    const addOns = get(allAddOnSelector(get(addOnIds))); 
    const choices = get(allChoiceSelector(get(choiceIds))); 

    let calcTotal = 0;

    calcTotal += product.entities.product[1].price * quantity;

    addOns.forEach((addOn) => {
      if(addOn.required == 1) {
        let selectedChoice = addOn.choices[addOn.selected];
        
        selectedChoice = _.find(choices, (choice) => {
          if(choice.id == selectedChoice) {
            return choice;
          }
        });

        console.log(selectedChoice);
        
        calcTotal += selectedChoice.price;
      } else {
        const filteredChoices = get(allChoiceSelector(addOn.choices));

        filteredChoices.forEach((choice) => {
          if(choice.selected == 1) {
            calcTotal += choice.price;
          }
        })
      }
    });

    return calcTotal;
  }
});