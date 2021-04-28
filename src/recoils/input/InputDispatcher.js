import { atomFamily, selector, selectorFamily, useRecoilCallback } from 'recoil';
import { inputsState } from './Atom';

export const createDispatcher = () => {
  const update = useRecoilCallback(
    ({ set }) => (id, text) => {      
      set(inputsState(id), (currentState) => {
        return {
          value: text
        }
      });
      
      console.log('update', text)
    }
  );

  const clear = useRecoilCallback(
    ({ set }) => (id) => {
      set(inputsState(id), (currentState) => {
        return {
          value: ''
        }
      });
    }
  );

  const clearAll = useRecoilCallback(({ reset }) => () => {
    reset(inputsState);
  });

  return {
    update,
    clear,
    clearAll
  };
};