/* jshint -W097 */
/* globals angular*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('manualCompetencias', {
        name: 'manualCompetencias',
        parent: 'site',
        url: '/manualCompetencias',
        data: {},
        views: {
            'content@': {
                templateUrl: 'scripts/information/manualCompetencias.html',
                controller: 'InformationController',
                controllerAs: 'InformationCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('information/competences');
                return $translate.refresh();
            }]
        }
    }).state('mapasCarrera', {
        name: 'mapasCarrera',
        parent: 'site',
        url: '/mapasCarrera',
        data: {},
        views: {
            'content@': {
                templateUrl: 'scripts/information/mapasCarrera.html',
                controller: 'InformationController',
                controllerAs: 'InformationCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('information/maps');
                return $translate.refresh();
            }]
        }
    }).state('modeloCT', {
        name: 'modeloCT',
        parent: 'site',
        url: '/modeloCT/:employeeId/:leaderId',
        data: {},
        views: {
            'content@': {
                templateUrl: 'scripts/information/CTModel/modeloCt.html',
                controller: 'CTModelController',
                controllerAs: 'CTModelCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('information/ctModel');
                return $translate.refresh();
            }]
        }
    }).state('assignCompetences', {
        name: 'assignCompetences',
        parent: 'site',
        url: '/assignCompetences',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'evaluation.autoevaluation.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/information/competences/assignCompetenceValues.html',
                controller: 'AssignCompetencesController',
                controllerAs: 'assignCompetencesCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('evaluation');
                $translatePartialLoader.addPart('positions');
                $translatePartialLoader.addPart('assignCompetences');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=information.state.js.map
