/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('password', {
        parent: 'account',
        url: '/password',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'global.menu.account.password'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/account/password/password.html',
                controller: 'PasswordController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('password');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=password.js.map
