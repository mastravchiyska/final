app.factory('HeaderService', function ($http, $rootScope) {
    
    function User() { }
    
    User.prototype.login = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/login', data).then(function(response) {
                resolve(response);
            });
        });
    }

    User.prototype.logout = function() {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/logout').then(function(response) {
                resolve(response);
            });
        }); 
    }
    return new User();
});