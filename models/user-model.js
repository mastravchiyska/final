var DbConnect = require('../models/db-connection');

function UserModel() {
    db = new DbConnect();
    userCollecion = db.get('users');
    friendCollecion = db.get('friends');
    requestCollection = db.get('friendsRequests');
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
                this.requestCollection.findOneAndUpdate({ userId: friendId, friendId: userId }, { $set: { status: 0 } })
                    .then(function () {
                        resolve(true);
                    });
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

UserModel.prototype.sendRequest = function (userId, friendId, status) {
    return new Promise(function (resolve, reject) {
        this.requestCollection.insert({ userId: userId, friendId: friendId, status: 1 })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.listRequests = function (userId) {
    return new Promise(function (resolve, reject) {
        this.requestCollection.find({ friendId: userId, status: 1 })
            .then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.deleteFriendRequest = function (requestId) {
    return new Promise(function (resolve, reject) {
        this.requestCollection.remove({ _id: requestId })
            .then(function () {
                resolve(true);
            }).catch(function (err) {
                reject(err);
            });
    });
};

UserModel.prototype.search = function (stringList) {
    var self = this;
    var results = [];
    var wordResults = 0;

    stringList.forEach(function (word) {
        self.searchByWord(word).then(function (result) {
            wordResults++
            results = results.concat(result);
            if (stringList.length == wordResults) {
                resolve(results);
            }
        });
    });
};

UserModel.prototype.searchByWord = function (word) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var searchFields = ['name', 'lastname', 'email'];
        var findedCounter = 0;
        var results = [];

        searchFields.forEach(function (field) {
            var searchParams = {};
            var pattern = new RegExp(word, 'i');
            searchParams[field] = { $regex: pattern };
            this.userCollecion.find(searchParams).then(function (result) {
                findedCounter++;
                results = results.concat(result);
                if (searchFields.length == findedCounter) {
                    resolve(self.getUniqueArray(results));
                }
            });
        });
    });
};

UserModel.prototype.getUniqueArray = function (fullCollection) {
    var filteredCollection = fullCollection.map(item => item._id)
        .filter((value, index, self) => self.indexOf(value) === index);
    return filteredCollection;
}

module.exports = UserModel;