var express = require('express');
var bodyParser = require('body-parser');
const {
	MongoClient,
	ObjectID
} = require('mongodb');
var app = express(),
	id;

app.use(bodyParser.json());

MongoClient.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo',
	(err, client) => {
		if (err) {
			return console.log(err);
		}
		console.log('connected to MongoDB server');
		const db = client.db('nodemongo');
		

		app.post('/NikhilMohanBlog/delet', (req, res) => {


			title = req.body.title;
			id = req.body.id;



			db.collection('nikhilmohanblogs').findOneAndDelete({
				_id: new ObjectID(id)
			}).then((result) => {
				console.log(result);
			});


		});


	});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {
	app
};

// db.collection('nikhilmohanblogs').deleteMany({title:'ram'}).then((result)=>{
// 	// 	console.log(result);
// 	// });

// 	db.collection('nikhilmohanblogs').findOneAndDelete({_id:new ObjectId("5abb62f1734d1d268cda6291")}).then((result)=>{
// 		console.log(result);
// 	});

// 	// db.collection('nikhilmohanblogs').findOneAndDelete({completed:false}).then((result)=>{
// 	// 	console.log(result);
// 	// });