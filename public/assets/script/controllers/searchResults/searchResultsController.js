app.controller('searchResultsController', ['$scope', '$rootScope', 
    function ($scope, $rootScope) {

        this.$onInit = function () {
            $scope.founded = $rootScope.searchResults;
        };

    }]);