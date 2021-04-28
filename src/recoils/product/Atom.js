import { atom, atomFamily, useRecoilCallback } from 'recoil';

// DEFAULT STATES

export const defaultProduct = {};
export const defaultAmountButton = 1;
export const defaultAddOnIds = [];
export const defaultChoiceIds = [];
export const defaultAddOn = {
  id: null,
  name: '',
  limit: 0,
  required: 0,
  choices: [],
  selected: 0
}; 
export const defaultChoice = {
  id: null,
  name: '',
  price: 0.00,
  selected: 0
}; 

// ATOMS

export const productState = atom({
  key: 'productState',
  default: defaultProduct
});

export const amountButtonState = atom({
  key: 'amountButtonState',
  default: defaultAmountButton
});

export const addOnIds = atom({
  key: 'addOnIds',
  default: defaultAddOnIds,
});

export const addOnState = atomFamily({
  key: 'addOnState',
  default: defaultAddOn
});

export const choiceIds = atom({
  key: 'choiceIds',
  default: defaultChoiceIds,
});

export const choiceState = atomFamily({
  key: 'choiceState',
  default: defaultChoice
});