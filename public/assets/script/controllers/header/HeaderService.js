app.factory('HeaderService', function ($http, $rootScope) {
    
    function User() { }
    
    User.prototype.login = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/login', data).then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        });
    }

    User.prototype.logout = function() {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/logout').then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        }); 
    }

    User.prototype.search = function(searchString) {
         return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/search', searchString).then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        }); 
    }
    
    return new User();
});