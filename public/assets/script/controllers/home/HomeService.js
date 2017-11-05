app.factory('HomeService', function ($http, $rootScope) {
    
    function User() { }
    
    User.prototype.register = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/register', data).then(function(response) {
                resolve(response);
            });
        });
    }

    return new User();
});