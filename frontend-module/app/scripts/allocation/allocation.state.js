/* jshint -W097 */
/* globals angular, $, Mentoring*/
"use strict";
angular.module('mentoringApp').config(function ($stateProvider) {
        $stateProvider.state('allocation', {
            name: 'allocation',
            parent: 'site',
            url: '/allocation',
            data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG'],
                pageTitle: 'allocations.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/allocation/allocation.html',
                    controller: 'AllocationController',
                    controllerAs: 'allocationCtrl'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('allocation');
                    return $translate.refresh();
                }]
            }
        });
});

