var DbConnect = require('./db-connection');

function UserModel() {
    db = new DbConnect();
    userCollecion = db.get('users');
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

module.exports = UserModel;