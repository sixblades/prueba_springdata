/* jshint -W097 */
/* globals angular, $, Mentoring*/
    'use strict';
    
    angular.module('mentoringApp').config(function ($stateProvider) {
        $stateProvider.state('evaluation', {
            name: 'evaluation',
            parent: 'site',
            url: '/evaluation',
            data: {
                roles: ['ROLE_USER'],
                pageTitle: 'evaluation.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/evaluation/evaluation.html',
                    controller: 'EvaluationController',
                    controllerAs: 'evaluationCtrl'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('evaluation');
                    return $translate.refresh();
                }]
            }
        }).state('evaluationleader', {
            name: 'evaluationleader',
            parent: 'site',
            url: '/evaluationleader',
            data: {
                roles: ['ROLE_USER'],
                pageTitle: 'evaluationLeader.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/evaluation/evaluationleader.html',
                    controller: 'EvaluationleaderController',
                    controllerAs: 'evalLeaderCtrl'
                },
                'header@' : {
                    templateUrl : 'scripts/components/header/header.html',
                    controller : 'HeaderController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('evaluationLeader');
                    return $translate.refresh();
                }]
            }
        }).state('consultEvaluationByLeader', {
            name: 'consultEvaluationByLeader',
            parent: 'site',
            url: '/consultEvaluationByLeader',
            data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTOR', 'ROLE_DIRECTORG'],
                pageTitle: 'leadersEvaluation.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/evaluation/leadersEvaluations.html',
                    controller: 'LeadersEvaluationsController',
                    controllerAs: 'leadersEvalCtrl'
                },
                'header@' : {
                    templateUrl : 'scripts/components/header/header.html',
                    controller : 'HeaderController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', ($translate, $translatePartialLoader) => {
                    $translatePartialLoader.addPart('leaderEvaluations');
                    return $translate.refresh();
                }]
            }
        }).state('consultEvaluationByEmployee', {
            name: 'consultEvaluationByEmployee',
            parent: 'site',
            url: '/consultEvaluationByEmployee',
            data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTOR', 'ROLE_DIRECTORG'],
                pageTitle: 'leadersEvaluation.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/evaluation/employeesEvaluation.html',
                    controller: 'EmployeesEvaluationsController',
                    controllerAs: 'employeesEvalCtrl'
                },
                'header@' : {
                    templateUrl : 'scripts/components/header/header.html',
                    controller : 'HeaderController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', ($translate, $translatePartialLoader) => {
                    $translatePartialLoader.addPart('employeesEvaluation');
                    return $translate.refresh();
                }]
            }
        }).state('consultEvaluationAll', {
            name: 'consultEvaluationAll',
            parent: 'site',
            url: '/consultEvaluationAll',
            data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG'],
                pageTitle: 'evaluationAll.title'
            },
            views: {
                'content@': {
                    templateUrl: 'scripts/evaluation/allEvaluations.html',
                    controller: 'AllEvaluationsController',
                    controllerAs: 'allEvaluationsCtrl'
                },
                'header@' : {
                    templateUrl : 'scripts/components/header/header.html',
                    controller : 'HeaderController'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', ($translate, $translatePartialLoader) => {
                    $translatePartialLoader.addPart('evaluationAll');
                    return $translate.refresh();
                }]
            }
        });
    });