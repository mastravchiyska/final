var DbConnect = require('./db-connection');

function FriendModel() {
    db = new DbConnect();
    friendCollecion = db.get('friends');
    requestCollection = db.get('friendsRequests');
}

FriendModel.prototype.addFriend = function (userId, friendId) {
    return new Promise(function (resolve, reject) {
        this.friendCollecion.insert({ userId: userId, friendId: friendId })
            .then(function () {
                this.requestCollection.findOneAndUpdate({ userId: friendId, friendId: userId }, { $set: { status: 0 } })
                    .then(function () {
                        resolve(true);
                    });
            }).catch(function (err) {
                reject(err);
            });
    });
};

FriendModel.prototype.removeFriend = function (friendId) {
    return new Promise(function (resolve, reject) {
        this.friendCollecion.remove({ friendId: friendId })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

FriendModel.prototype.listFriends = function (userId) {
    return new Promise(function (resolve, reject) {
        this.friendCollecion.find({ userId: userId })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

FriendModel.prototype.sendRequest = function (userId, friendId, status) {
    return new Promise(function (resolve, reject) {
        this.requestCollection.insert({ userId: userId, friendId: friendId, status: 1 })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

FriendModel.prototype.listRequests = function (userId) {
    return new Promise(function (resolve, reject) {
        this.requestCollection.find({ friendId: userId, status: 1 })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

FriendModel.prototype.deleteFriendRequest = function (requestId) {
    return new Promise(function (resolve, reject) {
        this.requestCollection.remove({ _id: requestId })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

module.exports = FriendModel;
