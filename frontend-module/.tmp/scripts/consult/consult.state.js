/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/**
 * Configuracion para los estados #consult de la aplicacion
 */
angular.module('mentoringApp').config(function ($stateProvider) {
    $stateProvider.state('consult', {
        name: 'consult',
        parent: 'site',
        url: '/consult',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'consult.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/consult/consult.html',
                controller: 'ConsultController',
                controllerAs: 'consultCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('consult');
                return $translate.refresh();
            }]
        }
    }).state('consultEvaluation', {
        name: 'consultEvaluation',
        parent: 'site',
        url: '/consultEvaluation',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'evaluation.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/consult/consultEvaluation.html',
                controller: 'ConsultEvaluationController',
                controllerAs: 'consultEvalCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('evaluation');
                return $translate.refresh();
            }]
        }
    }).state('consultEvaluationAutoevaluation', {
        name: 'consultEvaluationAutoevaluation',
        parent: 'site',
        url: '/consultEvaluationAutoevaluation',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'evaluation.autoevaluation.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/consult/consultEvaluationAutoevaluation.html',
                controller: 'ConsultEvaluationAutoevaluationController',
                controllerAs: 'consultEvalAutoCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('evaluation');
                $translatePartialLoader.addPart('evaluationAutoevaluation');
                return $translate.refresh();
            }]
        }
    });
});
//# sourceMappingURL=consult.state.js.map
