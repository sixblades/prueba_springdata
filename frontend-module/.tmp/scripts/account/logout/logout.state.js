/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('logout', {
        parent: 'public',
        url: '/logout',
        data: {
            roles: []
        },
        views: {
            'content@': {
                controller: 'LogoutController'
            }
        }
    });
});
//# sourceMappingURL=logout.state.js.map
