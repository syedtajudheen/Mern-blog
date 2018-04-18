var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var Post = require('../models/posts')
var postController = require('../controllers/postsController')
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /posts
// ----------------------------------------------------
router.route('/posts')
    // create a post (accessed at POST http://localhost:3000/api/posts)
    .post( postController.post_content )
        // get all the posts (accessed at GET http://localhost:8080/api/bears)
    .get(postController.getAll_posts);

 // on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/posts/:post_id')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
.get(postController.getPostBy_id)
 // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
 .put(postController.updatePostBy_id)
 // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
 .delete(postController.deletePostBy_id);

module.exports = router;