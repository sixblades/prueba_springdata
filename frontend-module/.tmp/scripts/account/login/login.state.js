/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('login', {
        parent: 'public',
        url: '/login',
        data: {
            roles: []
        },
        views: {
            'header@': {
                template: '<div></div>'
            },
            'content@': {
                templateUrl: 'scripts/account/login/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('login');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=login.state.js.map
