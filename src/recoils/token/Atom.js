import { atom } from "recoil";

const tokenAtom = atom({
  key: "tokenAtom",
  default: {
    user_id: 1,
    token: "",
  }
})

export { tokenAtom };