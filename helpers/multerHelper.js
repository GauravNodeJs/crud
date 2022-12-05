import { error } from 'console';
import multer from 'multer';
import Helper from './message'


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `/public-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  const myFile=file.mimetype.split("/")[1]
  if (myFile === "doc" || myFile === "pdf" || myFile === "ppt") {
    cb(null,true);
  } else {
    cb(new Error("invalid---"),false);
  }
};    

const upload =  multer({
  storage: multerStorage,
  fileFilter:multerFilter,
  limits : {fileSize : 1000000}
}).any('uploadedImages', 300);


export default upload;