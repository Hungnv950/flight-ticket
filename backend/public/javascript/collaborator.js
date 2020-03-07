/**
 * Created by vietlv on 6/3/2020.
 */

let collaboratorApp = angular.module('Application', []).run(function ($rootScope) {
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
}]);

collaboratorApp.controller('collaboratorCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.searching = false;

    $scope.pageLoading = true;

    $scope.supplierId = 0;

    $scope.suggestions = {};

    $scope.variants = [];

    $scope.modelQuantity = [];

    $scope.totalQuantity = 0;

    $scope.totalPrice = 0;

    $scope.keyword = '';

    $scope.getVariants = function ($supplier_id) {
        $scope.searching = true;

        let data = $supplier_id ? $supplier_id:$("select option:selected").val();

        $http.get('/admin/ajax/variant-by-supplier?supplier_id=' + data).success(function (response) {
            $scope.suggestions = response;

            angular.forEach($scope.suggestions, function (value) {
                value.show = true;
            });

            $scope.searching = false;
            $scope.pageLoading = false;
        });
    };

    $scope.itemClickedKeepCode = function (suggestion) {
        suggestion.quantity = 1;

        if (!(suggestion.id in $scope.modelQuantity)) {
            $scope.variants.push(suggestion);
            $scope.modelQuantity[suggestion.id] = 1;

            $scope.totalQuantity += 1;
        }
    };

    $scope.removeVariant = function (variant) {
        let index = $scope.variants.indexOf(variant);
        $scope.variants.splice(index, 1);

        $scope.modelQuantity.splice($scope.modelQuantity.indexOf(variant.id), 1);
    };

    $scope.changePrice = function (dataItem) {
        dataItem.price = parseFloat(dataItem.price.split(',').join(''));
    };

    $scope.submitForm = function () {
        document.querySelector('#variants').value = JSON.stringify($scope.variants);
    };

    $scope.$watch('variants', function () {
        $scope.totalPrice = 0;
        $scope.totalQuantity = 0;

        angular.forEach($scope.variants, function (value) {
            $scope.totalQuantity += parseInt(value.quantity);
            $scope.totalPrice += parseInt(value.quantity) * parseInt(value.price);
        });
    }, true);

    $scope.$watch('pageLoading', function () {
        if (!$scope.pageLoading) {
            $('#ui-view').css('display', 'block');
        }
    });
}]);