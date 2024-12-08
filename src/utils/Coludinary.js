import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uplodeOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // uplod file on cloudnary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploded succesfully

    console.log(response.url);
    return response;

    console.log("file uploded succesfully");
  } catch (error) {
    fs.unlinkSync(localFilePath); // removed saved tempory file uploded operation faild
    return null;
  }
};




cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);


export { uplodeOnCloudinary };
