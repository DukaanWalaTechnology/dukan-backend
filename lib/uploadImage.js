import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});
export const uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
      const options = { folder };
      console.log(options,"options")
      if (height) options.height = height;
      if (quality) options.quality = quality;
      options.resource_type = "auto";
  
      const result = await cloudinary.uploader.upload(file.tempFilePath, options);
      return result;
      console.log(result,"result aftre upload")
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  };
  