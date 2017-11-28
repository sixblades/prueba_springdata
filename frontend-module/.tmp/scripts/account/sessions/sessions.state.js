/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('sessions', {
        parent: 'account',
        url: '/sessions',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'global.menu.account.sessions'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/account/sessions/sessions.html',
                controller: 'SessionsController'
            },
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('sessions');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=sessions.state.js.map
