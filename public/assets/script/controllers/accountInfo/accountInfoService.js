app.factory('accountInfoService', function ($http, $rootScope) {
    
    function AccountInfo() { }
    
    AccountInfo.prototype.showAccountInfo = function (id) {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/user/profile/' + id).then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        });
    };

    AccountInfo.prototype.getUserPosts = function (id) {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/post/list/'+id).then(function(response) {
                resolve(response);
            }).catch(function(err) { reject(err); });
        });
    };
    
    return new AccountInfo();
    
});