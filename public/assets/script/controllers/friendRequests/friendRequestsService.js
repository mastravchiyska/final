app.factory('friendRequestsService', function ($http, $rootScope) {

    function ListRequests() { }
    ListRequests.prototype.listRequests = function (data) {
        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:4000/friend/requestList', data).then(function (response) {
                resolve(response);
            });
        });
    }


    ListRequests.prototype.acceptRequest = function (data) {

        return new Promise(function (resolve, reject) {
            $http.get('http://localhost:4000/friend/add/'+id, data).then(function (response) {
                resolve(response);
            });
        });
    }
    return new ListRequests();
});