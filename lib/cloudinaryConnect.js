import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryConnect = () => {
	try {
		cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
        });
	} catch (error) {
		console.log(error);
	}
};
