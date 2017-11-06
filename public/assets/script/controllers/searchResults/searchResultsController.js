app.controller('searchResultsController', ['$scope', '$rootScope', 'searchResultsService',
    function ($scope, $rootScope, searchResultsService) {

        this.$onInit = function () {
            $scope.founded = $rootScope.searchResults;
        };

    }]);