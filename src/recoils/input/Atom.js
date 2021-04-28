import { atom, atomFamily } from 'recoil';

export const inputIds = atom({
  key: 'inputIds',
  default: [],
});

export const inputState = atomFamily({
  key: 'inputState',
  default: {
    value: ''
  }
})