import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

const uploadOnCloudinary = async(filePath) => {
    try{
        if(!filePath) return null
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto"
        })
        fs.unlinkSync(filePath)
        return response
    }
    catch(error){
        fs.unlinkSync(filePath)
        return null
    }
}

export default uploadOnCloudinary