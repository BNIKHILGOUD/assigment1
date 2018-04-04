var mongoose = require('mongoose');

// const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({


	title: {
		type: String,
		required: true
	},
	tags: {
		type: String
		// default:'ff'
	},
	body: {
		type: String,
		// default:'body'
	},
	author: {
		type: String,
		// default:'Nikhil'
	},
	creationdate: {
		type: String,
		default: "30-3-18",
		required: true
	},
	updatedate: {
		type: Number,
		default: 29
	},
	status: {
		type: String,
		default: 'ok'
	},
	tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]


});

//end

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc423').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};




UserSchema.statics.findByToken = function (token) {
  var NikhilMohanBlog = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc423');
  } catch (e) {
  	console.log('catch');
    return Promise.reject();
  }
console.log('iam in foar');
  return NikhilMohanBlog.findOneAndRemove({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};






var NikhilMohanBlog = mongoose.model('NikhilMohanBlog', UserSchema);

// var NikhilMohanBlog = mongoose.model('NikhilMohanBlog', );

module.exports.NikhilMohanBlog=NikhilMohanBlog;