import { atomFamily, selectorFamily } from 'recoil';
import { inputIds, inputState } from './Atom';

export const inputSelector = selectorFamily({
  key: 'inputSelector',
  get: (id) => ({ get }) => {
    return get(inputState(id));
  },
  set: (id) => ({set, reset}, input) => {
    if(input == null) {
      reset(inputIds);
      reset(inputState(id));

      return;
    }

    set(inputState(id), input);
  }
})

export const allInputSelector = selectorFamily({
  key: 'allInputSelector',
  get: (ids) => ({ get }) => { 
    return ids.map(id => get(inputState(id)));
  },
  set: (ids) => ({ set, get, reset }, input) => {
    reset(inputIds);
    ids.forEach(id => reset(inputState(id)));

    return;
  }
})