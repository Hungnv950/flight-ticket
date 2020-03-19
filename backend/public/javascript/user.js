/**
 * Created by vietlv on 6/3/2020.
 */

let userApp = angular.module('userApp', []).run(function ($rootScope) {
    $rootScope.typeOf = function (value) {
        return typeof value;
    };
}).directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
}).directive('format', ['$filter', function ($filter) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return;
            ctrl.$formatters.unshift(function (a) {
                return $filter(attrs.format)(ctrl.$modelValue)
            });

            elem.bind('blur', function (event) {
                let plainNumber = elem.val().replace(/[^\d|\-+|\.+]/g, '');
                elem.val($filter(attrs.format)(plainNumber));
            });
        }
    };
}]).directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

userApp.controller('userCtrl', ['$scope', '$http','$httpParamSerializer', function ($scope, $http,$httpParamSerializer) {

    $scope.responses = {};

    $scope.queries = {
        status:"all",
        userSearch:null,
        page:1
    };

    $scope.searching = false;

    $scope.pageLoading = true;

    $scope.getStatistical = function () {
        $scope.searching = true;

        $http.get('/api/user/?'+$httpParamSerializer($scope.queries)).success(function (response) {
            $scope.responses = response;

            $scope.searching = false;
            $scope.pageLoading = false;
        });
    };

    $scope.getStatistical();

    $scope.$watch('pageLoading', function () {
        if (!$scope.pageLoading) {
            $('#ui-view').css('display', 'block');
        }
    });

    $scope.changePageActive = function (page) {
        $scope.queries.page = page;

        $scope.getStatistical();
    };
}]);