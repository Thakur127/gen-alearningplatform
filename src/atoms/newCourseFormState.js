import { atom } from "recoil";

const newCourseFormState = atom({
  key: "newCourseFormState",
  default: {
    title: "",
    description: "",
    category: "",
    price: "",
    currency: "",
    outcomes: "",
    cover_img: "",
    prerequisites: "",
    languages: "",
    captions: "",
  },
});

export default newCourseFormState;
