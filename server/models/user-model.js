var DbConnect = require('../models/db-connection');

function UserModel() {
    db = new DbConnect();
    userCollecion = db.get('users');
}

UserModel.prototype.findUser = function (email, password) {
    var userData = { email: email };
    if(password) {
        userData.password = password;
    }

    return new Promise(function (resolve, reject) {
        this.userCollecion.find(userData)
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

module.exports = UserModel;