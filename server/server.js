var path = require('path'),
express = require('express'),
app = express(),
webpackDevHelper = require('../index.dev.js')
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./api/routes/posts')

// connects to local mongodb
mongoose.connect(`mongodb://localhost:27017/blog`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...')
    webpackDevHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT')
    app.use('/js', express.static(__dirname + '/dist/js'))
}

// Setting up express to serve static files
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../assets')))
app.use(express.static(path.join(__dirname, '../node_modules')))

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', routes);

// we always want to serve the index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../assets/index.html'))
})

app.listen(3000)