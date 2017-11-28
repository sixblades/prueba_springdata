/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('roles', {
        name: 'roles',
        parent: 'site',
        url: '/roles',
        data: {
            roles: ['ROLE_ADMIN']
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/roles/roles.html',
                controller: 'RolesController',
                controllerAs: 'rolCtrl'
            }
        },
        resolve: {
            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('roles');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=roles.state.js.map
