var express = require('express');
var router = express.Router();
var UserModel = require('../models/user-model');
var PostModel = require('../models/post-model');

var postModel = new PostModel();
var userModel = new UserModel();

function checkForSession(req) {
    var sessionId = req.session.userId;
    if (!sessionId) {
        return false;
    }
    return sessionId;
}

router.post('/create', function (req, res) {
    var id = checkForSession(req);
    var self = this;
    if (id) {
        var postContent = req.body.postContent;
        userModel.findUser(id).then(function(user) {
            var date = Date.now();
            postModel.createPost(id, user[0].name, date, postContent).then(function (data) {
                res.json({ data: data });
            });
        }).catch(function(e) {
            res.status(400).json({ data: e });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});

router.delete('/delete/:postId', function (req, res) {
    var postId = req.params.postId;
    var id = checkForSession(req);
    if (postId && id) {
        postModel.deletePost(postId).then(function () {
            res.json({ message: 'The post was deleted successfully!' });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});

router.post('/edit/:postId', function (req, res) {
    var postId = req.params.postId;
    var postContent = req.body.postContent;
    var id = checkForSession(req);
    if (id && postId) {
        postModel.editPost(postId, id, postContent).then(function (data) {
            res.json({ data: data });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});

router.get('/list/:userId', function (req, res) {
    var id = checkForSession(req);
    if (id) {
        var userId = req.params.userId;
        postModel.listPosts(userId).then(function (data) {
            res.json({ data: data });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});

router.get('/list', function (req, res) {
    var id = checkForSession(req);
    if (id) {
        postModel.listFriendsPosts(id).then(function (data) {
            res.json({ data: data });
        });
    } else {
        res.status(401).json({ message: 'You are not logged in!' });
    }
});

module.exports = router;