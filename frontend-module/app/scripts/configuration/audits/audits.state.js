/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider
        .state('audits', {
            name: 'audits',
            parent: 'admin',
            url: '/audits',
            data: {
                roles: ['ROLE_ADMIN'],
                pageTitle: 'audits.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/configuration/audits/audits.html',
                    controller: 'AuditsController',
                    controllerAs: 'auditsCtrl'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('audits');
                    return $translate.refresh();
                }]
            }
        });
});
