var {NikhilMohanBlog} = require('./../model/NikhilMohanBlog');


var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
//calling find by token method which is in user
//as this is callback we get some reult here that is user and using promisses
  NikhilMohanBlog.findByToken(token).then((user) => {  
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};