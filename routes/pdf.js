var express = require('express');
var app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
var pdfreader = require("pdfreader");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));



var rows = {}; // indexed by y-position
var docs = []; 
var document_index={};
var counter=-1;
var indexes={};
function printRows() {
  Object.keys(rows) // => array of y-positions (type: float)
    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    .forEach(y => docs.push((rows[y] || []).join("")));  
   // console.log(docs);
}
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null,Date.now()+"_"+file.originalname);
  }
});

var upload = multer({ storage : storage}).single('userPDF');

router.get("/pdfindexing",(req,res)=>
{
   res.render("pdfindexing.ejs");
   
});

router.post('/api/pdf',function(req,res){
   // res.send("pdf uploader");
    
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.render("make_index_pdf.ejs",{filename:req.file.filename});
      
      
    });
     
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
router.get("/index_pdf/:filename",async function(req,res)
{
    docs=[];
    console.log(req.params.filename);
   var file_path="./uploads/"+req.params.filename

  // pdfBuffer contains the file content
 new pdfreader.PdfReader().parseFileItems(file_path,function(err,item){
  if (!item || item.page) {
  
      printRows();
      rows = {}; // clear rows for next page
  } else if (item.text) {
    // accumulate text items into rows object, per line
    (rows[item.y] = rows[item.y] || []).push(item.text);
  }
 
});
await sleep(1000);
console.log("in index",counter);
document_index[counter+1]=file_path;
counter=counter+1
res.redirect("/docs");

//console.log(docs);
});
    
router.post("/search_pdf",(req,res)=>
{
    var key=req.body.search_key;
    var results=[];
    var tens=0;
    if(key in indexes)
    {
        var indices=new Set(indexes[key]);
        
        indices.forEach(function(index)
        {
            if(tens<=9)
            {
              results.push(document_index[index]);
               
            }
            tens++;

             
        });
        res.render("download.ejs",{pdfs:results,key:key});
    }else
    {
        res.send("key not found in any document");
    }
  
    
});

router.get('/download/:fname', function(req, res){

  var path = "./uploads/"+req.params.fname;
  fs.readFile(path , function (err,data){
            res.contentType("application/pdf");
            res.send(data);
    });

});


router.get("/docs",(req,res)=>
{
  console.log("in docs");
   var text=docs.join(" ").toLowerCase().trim();
   
       text.split(" ").forEach(function(word)
       {
           if(word in indexes) // if the word is already present in the index 
           {
               if(!(counter in indexes[word]))
               {
                  // console.log(word+"present");
                   // if there are multiple same words in the paragraph then don't add the index of the paragraph again
                   indexes[word]=indexes[word].concat(counter);
           }
       }
        else // if the word is not present in the index then add the word to index and set the index of the paragraph
           {
              // console.log("first time"+word);
               indexes[word]=[counter];
           }

   });

 
   //res.send({indexes,doc_index:document_index});
   res.redirect("/pdfindexing");
   
});

module.exports = router;