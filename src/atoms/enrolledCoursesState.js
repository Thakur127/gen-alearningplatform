import { atom } from "recoil";

const enrolledCoursesState = atom({
  key: "enrollCoursesState",
  default: null,
});

export default enrolledCoursesState;
