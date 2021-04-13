import { atom } from "recoil";

const cartAtom = atom({
  key: "cartAtom",
  default: {
    user_id: 1,
    items: []
  }
})

export { cartAtom };