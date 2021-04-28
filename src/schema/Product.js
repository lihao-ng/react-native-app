import { normalize, schema } from 'normalizr';

const choice = new schema.Entity('choices');

const addOns = new schema.Entity('addOns', {
  choices: [choice]
});

const product = new schema.Entity('product', {
  add_ons: [addOns]
});

export const productSchema = (data) => {
  return normalize(data, product);
}

