import axios from "axios";

const uploadImage = async (image) => {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  try {
    return await axios.post(
      "https://api.cloudinary.com/v1_1/djgwh7h0h/image/upload",
      formData
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export default uploadImage;
