var express = require('express');
var UserModel = require('../models/user-model');
var PostModel = require('../models/post-model');
var router = express.Router();

var userModel = new UserModel();
var postModel = new PostModel();

function checkForSession(req) {
    sessionId = req.session.userId;
    if (!sessionId) {
        return false;
    }
    return sessionId;
}

router.get('/profile', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        userModel.findUser(id).then(function (data) {
            res.json({ status: 1, data: data[0] });
        });
    } else {
        res.json({ status: 0, message: 'You are not logged in!' });
    }
});

router.post('/update', function (req, res, next) {
    var name = req.body.name;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var birthday = req.body.birthday;
    var sex = req.body.sex;
    var password = req.body.password;
    id = checkForSession(req);
    if (id) {
        userModel.updateUserInfo(id, name, lastname, email, birthday, sex, password).then(function (data) {
            res.json({ status: 1, data: data });
        });
    } else {
        res.json({ status: 0, message: 'Something went wrong!' });
    }
});

router.get('/addFriend/:id', function (req, res, next) {
    id = checkForSession(req);
    var friendId = req.params.id;
    if (id) {
        userModel.addFriend(id, friendId).then(function (data) {
            res.json({ status: 1 });
        });
    } else {
        res.json({ status: 0, message: 'You cannot add this person!' });
    }
});

router.get('/friends', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        userModel.listFriends(id).then(function (data) {
            var dataLength = data.length;
            var responded = 0;
            var friendsList = [];
            data.forEach(function (element) {
                if (element.friendId !== null) {
                    userModel.findUser({ _id: element.friendId })
                        .then(function (data) {
                            responded++;
                            friendsList.push(data[0]);
                            if (responded === dataLength) {
                                res.json({ status: 1, data: friendsList });
                            }
                        });
                } else {
                    responded++;
                    if (responded === dataLength) {
                        res.json({ status: 1, data: friendsList });
                    }
                }
            }, this);
        });
    } else {
        res.json({ status: 0, message: 'Something went wrong!' });
    }
});

router.get('/requests', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        userModel.listRequests(id).then(function (data) {
            var dataLength = data.length;
            var responded = 0;
            var requests = [];
            data.forEach(function (element) {
                userModel.findUser({ _id: element.userId })
                    .then(function (data) {
                        responded++;
                        requests.push(data[0]);
                        if (responded === dataLength) {
                            res.json({ status: 1, data: requests });
                        }
                    })
            }, this);
        });
    } else {
        res.json({ status: 0, message: 'You cannot add this person!' });
    }
});

router.delete('/deleteFriendRequest/:requestId', function (req, res, next) {
    var requestId = req.params.requestId;
    if (requestId) {
        userModel.deleteFriendRequest(requestId).then(function () {
            res.json({ status: 1 });
        });
    } else {
        res.json({ status: 0, message: 'No id!' });
    }
});

router.get('/search', function (req, res, next) {
    var word = 'do';
    userModel.searchByWord(word).then(function (data) {
        res.json({ data: data });
    });
});

router.post('/createPost', function (req, res, next) {
    var postContent = req.body.postContent;
    id = checkForSession(req);
    if (id) {
        postModel.createPost(id, postContent).then(function (data) {
            res.json({ status: 1, data: data });
        });
    } else {
        res.json({ status: 0, message: 'Do not have session!' });
    }
});

router.delete('/deletePost/:postId', function (req, res, next) {
    var postId = req.params.postId;
    if (postId) {
        postModel.deletePost(postId).then(function () {
            res.json({ status: 1 });
        });
    } else {
        res.json({ status: 0, message: 'No id!' });
    }
});

router.post('/editPost/:postId', function (req, res, next) {
    var postId = req.params.postId;
    var postContent = req.body.postContent;
    id = checkForSession(req);
    if (id && postId) {
        postModel.editPost(postId, id, postContent).then(function (data) {
            res.json({ data: data });
        });
    } else {
        res.json({ status: 0, message: 'No id!' });
    }
});

router.get('/listPosts/', function (req, res, next) {
    id = checkForSession(req);
    if (id) {
        postModel.listPosts(id).then(function (data) {
            res.json({ data: data });
        });
    } else {
        res.json({ status: 0, message: 'No session!' });
    }
});

module.exports = router;