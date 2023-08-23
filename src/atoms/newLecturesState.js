import { atom } from "recoil";

const newLecturesState = atom({
  key: "newLecturesState",
  default: [],
});

export default newLecturesState;
