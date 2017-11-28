/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('docs', {
        name: 'docs',
        parent: 'admin',
        url: '/docs',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'global.menu.admin.apidocs'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/docs/docs.html',
                controller: 'DocsController'
            }
        }
    });
});
//# sourceMappingURL=docs.state.js.map
