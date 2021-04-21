import { atom } from "recoil";

const cartAtom = atom({
  key: "cartAtom",
  default: {
    user_id: 1,
    coupon: '',
    subtotal: 0.00,
    delivery_option: '',
    shipping: 0.00,
    tax: 0.00,
    items: []
  }
})

export { cartAtom };