const Post = require('../models/posts')

exports.post_content = (req, res) => {
    var post = new Post();      // create a new instance of the post model
    post.title = req.body.title;  // set the post title (comes from the request)
    post.content = req.body.content;
    // save the bear and check for errors
    post.save((err) => {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.getAll_posts = (req, res) => {
    Post.find((err, posts) => {
        if (err)
            res.send(err);

        res.json(posts);
    });
}

exports.getPostBy_id = (req, res) => {
    Post.findById(req.params.post_id, (err, post) => {
        if (err)
            res.send(err);
        res.json(post);
    });
}

exports.updatePostBy_id = (req, res) => {

    // use our bear model to find the bear we want
    Post.findById(req.params.post_id, (err, post) => {

        if (err)
            res.send(err);

        post.title = req.body.title;  // update the bears info
        post.content = req.body.content;
        // save the bear
        post.save((err) => {
            if (err)
                res.send(err);
            res.json(post);
        });

    });
}

exports.deletePostBy_id = (req, res) => {
    Post.remove({
        _id: req.params.post_id
    }, (err, post) => {
        if (err)
            res.send(err);
        res.json({ message: 'Successfully deleted' });
    });
}