/*
 * Copyright (c) 2012-2019 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

/*eslint-env node*/

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var pdf=require("./routes/pdf.js");
var image=require("./routes/image.js")
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+'/Public'));
app.use(pdf);
app.use(image)

app.get('/', function (req, res) {
  res.render("index.ejs")
});
   var documents=new Object();
   var indexes=new Object();
   var words= new Set();
   var counter=0;
app.post("/indexing",function(req,res)
{
  

   var paragraphs=req.body.paragraph.split("\r\n\r\n");
   for(var i=0;i<paragraphs.length;i++)
   {
       documents[counter]=paragraphs[i].toLowerCase().trim();
       documents[counter].split(" ").forEach(function(word)
       {
           if(word in indexes) // if the word is already present in the index 
           {
               if(!(counter in indexes[word]))
               {
                 
                   // if there are multiple same words in the paragraph then don't add the index of the paragraph again
                   indexes[word]=indexes[word].concat(counter);
           }
       }
        else // if the word is not present in the index then add the word to index and set the index of the paragraph
           {
             
               indexes[word]=[counter];
           }

   });

    
       counter++;
   }

   res.send("PDF are indexed");
});

app.get("/clear",function(req,res)
{
    console.log("inside clear")
    documents=new Object()
    indexes={};
    counter=0;
    words.clear();
    res.send("Indexes and documents cleared");
   // console.log(indexes);
   // res.send(documents);
    
});

app.post("/search",function(req,res)
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
              results.push(documents[index]);
               
            }
            tens++;

             
        });
        res.render("show_pgf.ejs",{pgfs:results,key:key});
    }else
    {
        res.send("key not found in any document");
    }
    //console.log(key,indexes[key],tens);
    
});

app.get("*",function(req,res)
{
   res.send("Not found"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("friendsKart Server has started");
    
});
