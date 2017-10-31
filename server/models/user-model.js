var DbConnect = require('../models/db-connection');

function UserModel() {
    db = new DbConnect();
    userCollecion = db.get('users');
    friendCollecion = db.get('friends');
}

UserModel.prototype.findUser = function (obj) {
    return new Promise(function (resolve, reject) {
        this.userCollecion.find(obj)
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.createUser = function (name, lastname, email, birthday, sex, password) {
    return new Promise(function (resolve, reject) {
        this.userCollecion.insert({ name: name, lastname: lastname, email: email, birthday: birthday, sex: sex, password: password })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.updateUserInfo = function (userId, name, lastname, email, birthday, sex, password) {
    return new Promise(function (resolve, reject) {
        this.userCollecion.findOneAndUpdate({ _id: userId }, { $set: { name: name, lastname: lastname, email: email, birthday: birthday, sex: sex, password: password } },
            { upsert: true, returnNewDocument: true })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.addFriend = function (userId, friendId) {
    return new Promise(function (resolve, reject) {
        this.friendCollecion.insert({ userId: userId, friendId: friendId })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.listFriends = function (userId) {
    return new Promise(function (resolve, reject) {
        this.friendCollecion.find({ userId: userId })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

module.exports = UserModel;