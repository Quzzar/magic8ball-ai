import { atom } from "recoil";
import { ResultState } from "..";

const resultState = atom({
  key: "result-state",
  default: 'QUESTION' as ResultState,
});

export {
  resultState,
};