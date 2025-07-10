import axios from "axios";

// upload imge and return the image url
export const imageUpload = async (imageData) => {
  const imageFromData = new FormData();
  imageFromData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_api_key}`,
    imageFromData
  );

  return data?.data?.display_url;
};