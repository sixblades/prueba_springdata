/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('metrics', {
        parent: 'admin',
        url: '/metrics',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'metrics.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/metrics/metrics.html',
                controller: 'MetricsController',
                controllerAs: 'metricsCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('metrics');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=metrics.state.js.map
