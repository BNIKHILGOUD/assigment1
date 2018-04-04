
var express = require('express');
var bodyParser = require('body-parser');
const {MongoClient,ObjectID}=require('mongodb');
var app = express(),id;

app.use(bodyParser.json());

MongoClient.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo',
 (err,client)=>{
 if(err){
   return console.log(err);
 }
 console.log('connected to MongoDB server');
 const db=client.db('nodemongo');
 app.post('/NikhilMohanBlog', (req, res) => {


    id=req.body.id;

    
    db.collection('nikhilmohanblogs').findOneAndUpdate({
   _id:new ObjectID(id)
 },{
     
     $set:{
         title:"5555"
        }
 }).then((result)=>{
   console.log(result);
   
 },(err)=>{
   console.log("===>"+err);
 });
  
});

  
});

app.listen(3000, () => {
 console.log('Started on port 3000');
});

module.exports={app};




