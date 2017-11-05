app.factory('friendProfileService', function ($http, $rootScope) {
    
    function Friend() { }

    Friend.prototype.viewProfile = function() {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:4000/').then(function(response) {
                resolve(response);
            });
        });
    };
    
    return new Friend();
});