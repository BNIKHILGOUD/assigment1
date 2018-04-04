var express = require('express');
var bodyParser = require('body-parser');
const {
  MongoClient,
  ObjectId
} = require('mongodb');
const {
  ObjectID
} = require('mongodb');
var {
  mongoose
} = require('./db/mongoose');
var {
  NikhilMohanBlog
} = require('./model/NikhilMohanBlog');
var {
  authenticate
} = require('./middleware/authenticate');
const _ = require('lodash');
var app = express();
app.use(bodyParser.json());

//start
app.post('/NikhilMohanBlog', (req, res) => {
  var model46 = new NikhilMohanBlog({
    title: req.body.title,
    tags: req.body.tags,
    body: req.body.body,
    author: req.body.author
  });

  model46.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });

});



app.delete('/users/me/token', (req, res) => {
  var token = req.header('x-auth');
  NikhilMohanBlog.findByToken(token).then((blog) => {
    if (!blog) {
      // console.log('404=1');
      return res.status(404).send();
    }
    res.send({
      blog
    });
  }).catch((e) => {
    console.log('400=1');
    res.status(400).send();
  });
});



app.patch('/NikhilMohanBlog/:id', (req, res) => {
  console.log('1');
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'author']);
  NikhilMohanBlog.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({
      todo
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/NikhilMohanBlog/users', (req, res) => {
  // var body = _.pick(req.body, ['title', 'body']);
  var user = new NikhilMohanBlog({
    title: req.body.title,
    tags: req.body.tags,
    body: req.body.body,
    author: req.body.author
  });

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.listen(3000, () => {
  console.log('starting on port 3000');
});
module.exports = {
  app
};


//end


//dont touch this no use
// var newmodel=new NikhilMohanBlog({
//  title:'rich',
//  tags:'the life truth',
//  body:'it is the best ',
//  author:'nikhil',
//  creationdate:29 ,
//  updatedate:23,
//  status:'ok',
// });

// newmodel.save().then((doc)=>{
//  console.log('model saved',doc);
// },(e)=>{
//  console.log('unable to connect');
// });



//added

// app.get('/NikhilMohanBlog/:id', (req, res) => {
//   var id = req.params.id;

//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Todo.findById(id).then((NikhilMohanBlog) => {
//     if (!nikhilmohanblogs) {
//       return res.status(404).send();
//     }

//     res.send({NikhilMohanBlog});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });

// app.get('/NikhilMohanBlog/:id',
//   (req,res)=>{
//     res.send(req.params);
//     var id=req.params.id;
//     console.log(id);
//   });

  // "title":"req",
  //   "tags":"tags",
  //   "body":"req",
  //   "author":"author"


//   {
//   "title":"updated",
//     "author":"aor"
// }