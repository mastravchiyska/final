app.factory('updateAccountService', function ($http, $rootScope) {
    
    function Update() { }
    
    Update.prototype.updateInfo= function (data) {
        return new Promise(function(resolve, reject) {
            $http.post('http://localhost:4000/user/update', data).then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        });
    }
    
    return new Update();
});