/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp')
    .controller('LogoutController', function ($state, Auth) {
        Auth.logout();
        $state.go('login');
    });