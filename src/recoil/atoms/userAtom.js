import {atom} from "recoil";

export const userAtom = atom({
  key: 'userAtom',
  default: {
    jwt: localStorage.getItem('jwt'),
    data: null,
  },
})