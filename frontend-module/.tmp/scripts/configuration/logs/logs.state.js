/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('logs', {
        name: 'logs',
        parent: 'admin',
        url: '/logs',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'logs.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/logs/logs.html',
                controller: 'LogsController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('logs');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=logs.state.js.map
