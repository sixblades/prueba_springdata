/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').controller('SessionsController', function ($scope, Sessions, Principal) {
    Principal.identity().then(function (account) {
        $scope.account = account;
    });

    $scope.success = null;
    $scope.error = null;
    $scope.sessions = Sessions.getAll();
    $scope.invalidate = function (series) {
        Sessions['delete']({ series: encodeURIComponent(series) }, function () {
            $scope.error = null;
            $scope.success = 'OK';
            $scope.sessions = Sessions.getAll();
        }, function () {
            $scope.success = null;
            $scope.error = 'ERROR';
        });
    };
});
//# sourceMappingURL=sessions.controller.js.map
