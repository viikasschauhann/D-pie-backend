import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import { extractPublicId } from 'cloudinary-build-url';
import { ApiError } from './ApiError.js';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        //upload the file on clodinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // file has been uploaded successfully
        // console.log("Cloudinary Response: ", response);
        // console.log("file is uploaded on cloundinary ", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteFromCloudinary = async (cloudinaryUrl) => {
    try {
        if(!cloudinaryUrl) return null;
        
        const publicId = extractPublicId(cloudinaryUrl);
        // delete the file from cloudinary
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        throw new ApiError(500, "Error while deleting the image from cloudinary.", error);
    }
}

export {uploadOnCloudinary, deleteFromCloudinary};