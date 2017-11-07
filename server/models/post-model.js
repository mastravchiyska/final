var DbConnect = require('../models/db-connection');
var FriendsModel = require('./friend-model');

function PostModel() {
    db = new DbConnect();
    friendsModel = new FriendsModel();
    postCollection = db.get('userPosts');
}

PostModel.prototype.createPost = function (userId, name, date, postContent) {
    return new Promise(function (resolve, reject) {
        this.postCollection.insert({ userId: userId, name: name, date: date, postContent: postContent })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

PostModel.prototype.deletePost = function (postId) {
    return new Promise(function (resolve, reject) {
        this.postCollection.remove({ _id: postId })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

PostModel.prototype.editPost = function (postId, userId, postContent) {
    return new Promise(function (resolve, reject) {
        this.postCollection.findOneAndUpdate({ _id: postId }, { $set: { userId: userId, postContent: postContent } },
            { upsert: true, returnNewDocument: true })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

PostModel.prototype.listPosts = function (userId) {
    return new Promise(function (resolve, reject) {
        this.postCollection.find({ userId: userId })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

PostModel.prototype.listFriendsPosts = function (userId) {
    return new Promise(function (resolve, reject) {
        this.friendsModel.listFriends(userId).then(function(result) {
            var friendsList = result;
            var friendNumber = friendsList.length;
            var returnedCounter = 0;
            var findedPost = [];
            if(friendNumber <= 0) {
                resolve(findedPost);
            }
            friendsList.forEach(function(friend) {
                this.postCollection.find({ userId: friend.friendId })
                    .then(function (data) {
                        returnedCounter++;
                        if(data.length > 0) {
                            findedPost = findedPost.concat(data);
                        }
                        if(friendNumber == returnedCounter) {
                            resolve(findedPost);
                        }
                    }).catch(function (err) {
                    returnedCounter++;
                    if(friendNumber == returnedCounter) {
                        resolve(findedPost);
                    }
                });
            });
        });
    });
};

module.exports = PostModel;