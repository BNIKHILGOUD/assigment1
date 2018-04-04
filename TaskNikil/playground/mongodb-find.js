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
		app.post('/NikhilMohanBlog', (req, res) => {


			title = req.body.title;



			db.collection('nikhilmohanblogs').find({
				title
			}).toArray().then((docs) => {
				console.log(JSON.stringify(docs, undefined, 2));

			}, (err) => {
				console.log('unable to fetch', err);
			});

		});


	});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {
	app
};