/* jshint -W097 */
/* globals angular*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
	$stateProvider
		.state('individualMatrix', {
			name:'individualMatrix',
			parent:'site',
			url:'/individual', 
			data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG'],
                pageTitle: 'increments.title'
            },
			views: {
				'content@': {
                    templateUrl: 'scripts/increments/individual.html',
                    controller: 'IndividualController',
                    controllerAs: 'IndividualCtrl'
				}
			},
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('increments/individual');
                    return $translate.refresh();
                }]
            }
		})
		.state('multipleMatrix', {
			name: 'multipleMatrix',
			parent: 'site',
			url: '/multiple',
			data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG']
            },
			views: {
				'content@': {
					templateUrl: 'scripts/increments/multiple.html',
					controller: 'MultipleController',
					controllerAs: 'MultipleCtrl'
				}
			},
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('increments/multiple');
                    return $translate.refresh();
                }]
            }
		})
		.state('tableIncrements', {
			name: 'incrementsTable',
			parent: 'site',
			url: '/tables',
			data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG']
            },
			views: {
				'content@' : {
					templateUrl : 'scripts/increments/incrementsTable.html',
					controller: 'IncrementsController',
					controllerAs: 'IncrementsCtrl'
				}
			},
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('increments/increments');
                    return $translate.refresh();
                }]
            }
		})
		.state('wageLimits', {
			name: 'wageLimits',
			parent: 'site',
			url: '/limits',
			data: {
                roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG']
            },
			views: {
				'content@' : {
					templateUrl : 'scripts/increments/limits.html',
					controller: 'WageLimitsController',
					controllerAs: 'WageLimitsCtrl'
				}
			},
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('increments/limits');
                    return $translate.refresh();
                }]
            }
		})
});