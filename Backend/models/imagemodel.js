//Accessing mongoose package
const mongoose = require('mongoose');

//Database connection
mongoose.connect('mongodb://localhost:27017/Multer');

//Schema definition
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    
    fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number
})

//Model creation    
const Imagedata = mongoose.model('imagedata',ImageSchema);

module.exports = Imagedata;