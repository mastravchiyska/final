app.factory('adService', function ($http, $rootScope) {
    
    function getInfo() { }
    
    getInfo.prototype.showDetails = function (data) {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/user/profile', data).then(function(response) {
                resolve(response);
            });
        });
    }
    
    return new getInfo();
});