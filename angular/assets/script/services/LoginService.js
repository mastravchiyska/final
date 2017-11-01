app.factory('LoginService', function ($http, $rootScope) {
    function User() {
        this.user = $http.post('http://localhost:4000/user/login')
    }
    User.prototype.login = function () {
        return this.user;
    }
    return User();
});