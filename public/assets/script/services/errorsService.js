app.factory('ErrorService', ['$window', function ($window) {
    
    function Error() { }
    
    Error.prototype.processError = function (error) {
        if(error.status === 401) {
            this.redirect();
        }
        if(error.status === 400) {
            this.showError();
        }
    }

    Error.prototype.showError = function (error) {
       console.error(error);
    }

    Error.prototype.redirect = function () {
        localStorage.removeItem('user');
        $window.location.href = '/#/';
    }

    return new Error();
}]);