import { atom } from "recoil";

const authenticatedState = atom({
  key: "authenticatedState",
  default: false,
});

export default authenticatedState;
