app.factory('adService', function ($http, $rootScope) {
    
    function getInfo() { }
    
    getInfo.prototype.getAccInfo = function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/user/profile', data).then(function(response) {
                resolve(response);
            });
        });
    }
    
    return new getInfo();
});