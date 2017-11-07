var express = require('express');
var router = express.Router();
var UserModel = require('../models/user-model');
var FriendModel = require('../models/friend-model');

var userModel = new UserModel();
var friendModel = new FriendModel();

function checkForSession(req) {
    var sessionId = req.session.userId;
    if (!sessionId) {
        return false;
    }
    return sessionId;
}

router.get('/add/:friendId', function (req, res) {
    var id = checkForSession(req);
    var friendId = req.params.friendId;
    if (id) {
        friendModel.addFriend(id, friendId).then(function (data) {
            res.json({ message: 'The friend was added!' });
        });
    } else {
        res.status(400).json({ message: 'Something went wrong!' });
    }
});

router.get('/list', function (req, res) {
    var id = checkForSession(req);
    if (id) {
        friendModel.listFriends(id).then(function (data) {
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
                                res.json({ data: friendsList });
                            }
                        }).catch(function (err) {
                            responded++;
                            if (responded === dataLength) {
                                res.json({ data: friendsList });
                            }
                        });
                } else {
                    responded++;
                    if (responded === dataLength) {
                        res.json({ data: friendsList });
                    }
                }
            }, this);
        });
    } else {
        res.status(400).json({ message: 'Something went wrong!' });
    }
});

router.get('/requestList', function (req, res) {
    var id = checkForSession(req);
    if (id) {
        friendModel.listRequests(id).then(function (data) {
            var dataLength = data.length;
            var responded = 0;
            var requests = [];
            data.forEach(function (element) {
                userModel.findUser({ _id: element.userId })
                    .then(function (data) {
                        responded++;
                        requests.push(data[0]);
                        if (responded === dataLength) {
                            res.json({ data: requests });
                        }
                    }).catch(function (err) {
                            responded++;
                            if (responded === dataLength) {
                                res.json({ data: requests });
                            }
                        });
            }, this);
        })
    } else {
        res.status(400).json({ message: 'Something went wrong!' });
    }
});

router.delete('/removeRequest/:requestId', function (req, res) {
    var requestId = req.params.requestId;
    if (requestId) {
        friendModel.deleteFriendRequest(requestId).then(function () {
            res.json({ message: 'The request was removed!' });
        });
    } else {
        res.status(400).json({ message: 'No id!' });
    }
});

router.post('/sendRequest/:friendId', function (req, res) {
    var id = checkForSession(req);
    var friendId = req.params.friendId;
    if (id) {
        friendModel.sendRequest(id, friendId, 1).then(function (data) {
            res.json({ message: 'Friend reqiest sent!' });
        });
    } else {
        res.status(400).json({ message: 'Something went wrong!' });
    }
});

module.exports = router;