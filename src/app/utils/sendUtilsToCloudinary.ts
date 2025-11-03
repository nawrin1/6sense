import { v2 as cloudinary } from 'cloudinary';

import multer from 'multer';
import fs from "fs"
import config from '../config';
import path from 'path';

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}



cloudinary.config({ 

    cloud_name: config.cloudinary_cloud_name, 
    api_key: config.cloudinary_api_key, 
    api_secret: config.cloudinary_api_secret 
});
export const sendImageToCloudinary=(imageName:string,path:string)=>{

return new Promise((resolve, reject) => {
    console.log("inside")
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      (error, result) => {
        if (error) {
         
          reject(error); 
          return;
        }
        
        resolve(result);
           
        fs.unlink(path, (err) => {
            if (err) {
              reject(err);
          }else{
              console.log('File deleted successfully');}
      });	
        });
      }
    );

}


//from multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+"/uploads/")//make changes here
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export const upload = multer({ storage: storage }) //write export here