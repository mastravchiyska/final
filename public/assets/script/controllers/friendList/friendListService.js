app.factory('friendListService', function ($http, $rootScope) {
    
    function ListFriends() { }
    
    ListFriends.prototype.listFriends= function (data) {
        
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/user/friends', data).then(function(response) {
                resolve(response);
            });
        });
    }
    
    return new ListFriends();
});