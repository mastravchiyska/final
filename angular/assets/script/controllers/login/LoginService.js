app.factory('LoginService', function ($http, $rootScope) {
    
    function User() { }
    
    User.prototype.login = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/login', data).then(function(response) {
                resolve(response);
            });
        });
    }
    
    return new User();
});