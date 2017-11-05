app.factory('accountInfoService', function ($http, $rootScope) {
    
    function AccountInfo() { }
    
    AccountInfo.prototype.showAccountInfo= function (data) {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/user/profile', data).then(function(response) {
                resolve(response);
            });
        });
    }
    
    return new AccountInfo();
});