const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');
  const mongoose = require('mongoose')
//const { callbackify } = require('../Frontend/src/app/uploads');
require("dotenv").config();
// const connection = require('./models/imagemodel')
// connection();
const Imagedata = require('./models/imagemodel');






const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
//app.use('/uploads',express.static('Backend/uploads'));

app.listen(3000,()=>{
    console.log("The server started on port 3000");
});

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../Frontend/src/uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})
var upload= multer({storage:storage})

app.get('/',(req,res)=>{
    res.send("image uploa");
})
app.post('/file',upload.single('file'),(req,res,next)=>{
    const file= req.file;
    console.log(file);
    if(!file){
        const error=    new Error('Please upload a file')
        error.httpStatusCode =400
        return next(error)
    }
    var image = new Imagedata(file);
    console.log(image);
    image.save();

    //res.send(file);
})

app.get('/getimage',(req,res)=>{
    Imagedata.find()
    .then(function(images){
        //console.log(images);
        res.send(images);
    });
});
   

// ======================================================================


// const {GridFsStorage} = require("multer-gridfs-storage");

// const storage_db = new GridFsStorage({
//     url: process.env.DB,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-any-name-${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-any-name-${file.originalname}`,
//         };
//     },
// });

// module.exports = multer({ storage_db });