/*eslint-disable no-unreachable, semi, no-undef, no-unused-vars, no-unused-params*/
var express = require('express');
var app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const math=require("mathjs")
const router = express.Router();
const mobilenet = require('@tensorflow-models/mobilenet')
global.fetch = require('node-fetch')
const tf = require('@tensorflow/tfjs')
//const tfjsnode=require('@tensorflow/tfjs-node')
const jpeg = require('jpeg-js');
var Jimp = require('jimp');
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));


var indexes={}
var q_image=[]
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './Public/Images');
  },
  filename: function (req, file, callback) {
    callback(null,Date.now()+"_"+file.originalname);
  }
});

var upload = multer({ storage : storage}).single('userImage');


router.get("/imageindexing",(req,res)=>
{
    res.render("image_index.ejs");
    
});

const readImage = path => {
    console.log("readimage");
  const buf = fs.readFileSync(path)
  const pixels = jpeg.decode(buf, true)
  return pixels
}

const imageByteArray = (image, numChannels) => {
        console.log("image byte array");
  const pixels = image.data
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values
}

var result;
const imageToInput = (image, numChannels) => {
        console.log("image to input");
  const values = imageByteArray(image, numChannels)
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, 'int32');

  return input
}

var counter=-1;
var docs={}
router.get("/index_image/:imagename",function(req,res)
{
    var path="./Public/Images/"+req.params.imagename;
    console.log("classifying",path);
    async function app() {
    console.log('Loading mobilenet..');
   let net;
  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');
  const image = readImage(path);
  const input = imageToInput(image,3)
  console.log("inn");
  
    const activations = await net.infer(input, 'conv_preds');
    docs[counter]=req.params.imagename;
    activations.array().then(array => indexes[counter]=array[0]);
    res.redirect("/imageindexing");
    //console.log("act,",result);
    // Pass the intermediate activation to the classifier.
  

    // Dispose the tensor to release the memory.
  
  
  
  
 
 // res.send(result); 
/*Jimp.read(path)
  .then(image => {
   i = tf.node.decodeImage(image);
   const result = net.infer(i);
   console.log(result);
  })
  .catch(err => {
    // Handle an exception.
    console.log(err);
  });*/
 
 
 
 
}

app();


});

router.get("/tensor",(req,res)=>
{
    res.send({indexes,docs});
    
});
var related=[]    
router.get("/search",(req,res)=>
{
    related=[]

    var len=Object.keys(indexes).length;
        console.log("in search",len);
    for(var i=0;i<len;i++)
    {
        //console.log("index",indexes[i],"q",q_image[0]);
        
        var diff=math.norm(math.subtract(indexes[i],q_image[0]));
        console.log(diff,i);
        if (diff<30)
        {
         related.push(docs[i]);   
        }
    }
   
   res.render("show_related.ejs",{images:related}); 
});

router.get("/q",(req,res)=>
{
    res.send(q_image);
    
});
router.post("/api/index_image",function(req,res){
    counter++;
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.render("make_index_image.ejs",{filename:req.file.filename});
         //console.log(req.file);
      
    });
   
});
router.post("/api/query_image",(req,res)=>
{
     upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
       // res.render("make_index_image.ejs",{filename:req.file.filename});
         //console.log(req.file);
         
    var path="./Public/Images/"+req.file.filename;
    console.log("classifying",path);
    async function app() {
    console.log('Loading mobilenet..');
   let net;
  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');
  const image = readImage(path);
  const input = imageToInput(image,3)
  console.log("inn");
  
    const activations = await net.infer(input, 'conv_preds');
    activations.array().then(array => q_image=array);
    res.render("search.ejs");
      
    };
    app();
});

});


module.exports = router;