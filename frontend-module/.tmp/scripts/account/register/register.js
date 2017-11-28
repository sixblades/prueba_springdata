/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('register', {
        parent: 'account',
        url: '/register',
        data: {
            roles: [],
            pageTitle: 'register.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/account/register/register.html',
                controller: 'RegisterController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('register');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=register.js.map
