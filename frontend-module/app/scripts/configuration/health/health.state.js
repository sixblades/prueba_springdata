/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('health', {
                name: 'health',
                parent: 'admin',
                url: '/health',
                data: {
                    roles: ['ROLE_ADMIN'],
                    pageTitle: 'health.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/configuration/health/health.html',
                        controller: 'HealthController',
                        controllerAs: 'healthCtrl'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('health');
                        return $translate.refresh();
                    }]
                }
            });
    });
