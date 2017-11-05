var DbConnect = require('../models/db-connection');
var UserModel = require('../models/user-model');

function PostModel() {
    db = new DbConnect();
    postCollection = db.get('userPosts');
}

PostModel.prototype.createPost = function (userId, postContent) {
    return new Promise(function (resolve, reject) {
        this.postCollection.insert({ userId: userId, postContent: postContent })
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

PostModel.prototype.listPosts = function () {
    return new Promise(function (resolve, reject) {
        this.postCollection.find()
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

module.exports = PostModel;