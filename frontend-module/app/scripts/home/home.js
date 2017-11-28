/* jshint -W097 */
/* globals angular, $, Mentoring*/
    'use strict';
    angular.module('mentoringApp').config(function ($stateProvider) {
        $stateProvider.state('home', {
            parent: 'site',
            url: '/home',
            data: {
                roles: ['ROLE_USER']
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/home/home.html',
                    controller: 'HomeController'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader',
                    function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('home');
                        return $translate.refresh();
                    }]
            }
        });
    });