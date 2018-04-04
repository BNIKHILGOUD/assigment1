var mongoose = require('mongoose');


//connecting to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo');






module.exports.mongoose = mongoose;