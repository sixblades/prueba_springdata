/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('configuration', {
        name: 'configuration',
        parent: 'admin',
        url: '/configuration',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'configuration.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/configurationApp/configuration.html',
                controller: 'ConfigurationController',
                controllerAs: 'cfgCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('configuration');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=configuration.state.js.map
