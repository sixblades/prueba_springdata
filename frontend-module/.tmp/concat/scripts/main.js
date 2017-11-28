/**
 * Modulo Mentoring de la aplicacion
 */
'use strict';

LanguageController.$inject = ['$translate', 'Language'];
LoginController.$inject = ['$cookies', '$state', 'Auth', 'Activate', 'AuditService'];
AllocationController.$inject = ['$rootScope', '$filter', '$translate', 'EmployeeEvaluableIdResource', 'EmployeeLeaderResource', 'Allocation', 'Allocations', 'AllocationsLeader', 'AllocationSave', 'AllocationsLE'];
AuditsController.$inject = ['$rootScope', '$filter', 'AuditsService'];
ConfigurationController.$inject = ['$rootScope', 'ConfigurationService'];
HealthController.$inject = ['$rootScope', 'HealthService'];
MetricsController.$inject = ['$rootScope', '$scope', 'HealthService'];
RolesController.$inject = ['$rootScope', 'EmpleadosRL', 'Roles', 'RolesUsuario', 'Guardar', 'Borrar'];
ConsultController.$inject = ['$rootScope', '$state', '$q', '$previousState', '$stateParams', 'Principal', 'EvaluationsCn', 'EmpleadosCn', 'EvaluationsAllEmployees', 'isEvaluationDate', 'isFinalEvaluationDate', 'EvaluationYear', 'EvaluationsMandoCn', 'EvaluationsConsultLeader', 'EmployeeEvaluationResource', 'EvaluationEmployeeLeaderResource', 'EmployeeEvaluableIdResource', 'EmployeeLeaderResource', 'EmployeesDIRECTOR', 'LeadersDIRECTOR', 'EmployeesGERENTE', 'LeadersGERENTE', 'EmployeesRRHH', 'LeadersRRHH', 'SharingEvaluationService', 'IsModificableService'];
ConsultEvaluationController.$inject = ['$scope', '$timeout', '$sce', '$state', '$stateParams', '$window', '$previousState', 'Principal', '$translate', 'QuestionsResource', 'StatesResource', 'AnswersResource', 'CompetencesResource', 'PillarsResource', 'SharingEvaluationService', 'EvaluationId', 'EmployeeIsLeaderResource', 'AnswersSelect', 'AnswersEval', 'isEvaluationDate', 'isFinalEvaluationDate', 'CurrentAllocation', 'CalculateEvaluationResult'];
ConsultEvaluationAutoevaluationController.$inject = ['$scope', '$timeout', '$state', '$q', '$sce', '$translate', 'StatesResource', 'CompetencesResource', 'PillarsResource', 'QuestionsResource', 'AnswersResource', 'AnswersSelect', 'Principal', 'EvaluationsCn', 'EmpleadosCn', 'EvaluationsMandoCn', 'EvaluationsConsultLeader', 'AllocationsLeader', 'EmployeeEvaluableIdResource', 'EmployeeLeaderResource', 'EmployeesDIRECTOR', 'LeadersDIRECTOR', 'EmployeesGERENTE', 'ConsultEvaluationAutoevaluationService', 'LeadersGERENTE', 'EmployeesRRHH', 'LeadersRRHH', 'IsModificableService'];
EvaluationController.$inject = ['$rootScope', '$sce', '$state', 'Principal', '$translate', 'QuestionsResource', 'LastEvaluationAssigned', 'GetLastAutoEvalByEmployeeId', 'LastEvaluationAssignedWithEvalType', 'StatesResource', 'AnswersSelect', 'AnswersEval', 'EmpleadosEvaluables', 'EvaluationEmployeeLeaderResource', 'AnswersResource', 'EmpleadosAE', 'EmployeeEvaluationResource', 'CompetencesResource', 'PillarsResource', 'isEvaluationDate', 'isFinalEvaluationDate', 'EmployeeIsLeaderResource', 'EmployeesRRHH', 'EmpleadosCn', 'EmployeesDIRECTOR', 'PrintService'];
EvaluationleaderController.$inject = ['QuestionsResource', 'StatesResource', 'AnswersResourceEL', 'AnswersResource', 'Empleados', 'EmployeeEvaluationResource', 'CompetencesResource', 'PillarsResource'];
LeadersEvaluationsController.$inject = ['$rootScope', '$state', '$translate', 'Principal', 'EmployeeLeaderResource', 'LeadersEvaluationsService'];
EmployeesEvaluationsController.$inject = ['$rootScope', '$state', '$translate', 'Principal', 'Directions', 'Areas', 'EmployeesEvaluationService'];
AllEvaluationsController.$inject = ['$rootScope', '$state', '$translate', 'Principal', 'EmployeesEvaluationService'];
MainController.$inject = ['$state', 'Principal'];
IndividualController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$q', '$translatePartialLoader', '$translate', '$filter', 'SharingEvaluationService', 'EmpleadosCn', 'EmployeesCategory', 'Employees', 'EmployeeEvaluationResource', 'EvaluationsCn', 'Retribution'];
MultipleController.$inject = ['$rootScope', '$window', '$filter', 'EmployeesCategoryByYear', 'EmployeeMultiple', 'Directions', 'Areas'];
IncrementsController.$inject = ['$rootScope', 'PositionIncreases', 'EvaluationMarkService', 'WageBandService', 'WageBandPositionService', 'DirectionsService', '$window'];
WageLimitsController.$inject = ['$rootScope', '$window', 'WageBandLimitsService', 'DirectionsService'];
InformationController.$inject = ['$rootScope', '$translate', 'Principal', 'Directions'];
CTModelController.$inject = ['$rootScope', '$log', '$state', '$stateParams', '$q', '$translate', '$window', 'Principal', 'EvaluationsConsultLeader', 'EmployeeEvaluableIdResource', 'EmployeeLeaderResource', 'EmployeesDIRECTOR', 'LeadersDIRECTOR', 'EmployeesGERENTE', 'LeadersGERENTE', 'EmployeesRRHH', 'LeadersRRHH', 'EmpleadosCn', 'AllocationsLeader', 'CTModelService'];
AssignCompetencesValues.$inject = ['$rootScope', '$filter', '$log', '$sce', '$state', '$translate', 'Principal', 'PositionService', 'WageBandService', 'WeightQuestionService', 'StatesResource'];
var Mentoring = (function () {
	// Private variables
	var currentDate = new Date();

	/** Manejador de resource general para la aplicacion */
	var resHandler = {
		query: { method: 'GET', isArray: true },
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' }
	};
	var resHandlerGET = {
		query: { method: 'GET', isArray: true },
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		}
	};
	var resHandlerGETNoTransform = {
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				return data;
			}
		}
	};

	// Common functions
	var readCookie = function readCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	};

	var undefinedOrNull = function undefinedOrNull(obj) {
		return obj === undefined || obj === null;
	};

	var isEmpty = function isEmpty(obj) {
		var res = undefinedOrNull(obj);
		if (typeof obj === 'string' && obj === '') {
			res = true;
		}
		return res;
	};

	var getCurrentYear = function getCurrentYear() {
		return currentDate.getFullYear();
	};

	return {
		resourceHandler: resHandler,
		resourceHandlerGET: resHandlerGET,
		resourceHandlerGETNoTransform: resHandlerGETNoTransform,
		getCookie: readCookie,
		isUndefinedOrNull: undefinedOrNull,
		isEmpty: isEmpty,
		getCurrentYear: getCurrentYear
	};
})();
//# sourceMappingURL=Mentoring.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp', ['LocalStorageModule', 'tmh.dynamicLocale', 'ngResource', 'ui.router', 'ngCookies', 'pascalprecht.translate', 'ngCacheBuster', 'infinite-scroll', 'tc.chartjs', 'ct.ui.router.extras', 'ngSanitize']);
//# sourceMappingURL=app.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp')
/* Configuracion del decorator del servicio $log */
.config(['$provide', function ($provide) {
	$provide.decorator('$log', ['$delegate', function ($delegate) {
		/* Guardamos la funcion original */
		var errorFn = $delegate.error;
		$delegate.error = function () {
			/* Guardamos los argumentos de llamada a la funcion */
			var args = [].slice.call(arguments);
			var msg = typeof args[0] === 'string' ? args[0] : '';
			var errorObj = {
				msg: msg,
				level: 'ERROR'
			};
			var header = Mentoring.getCookie('CSRF-TOKEN');
			$.ajax({
				url: 'api/sendLog',
				method: 'POST',
				data: JSON.stringify(errorObj),
				contentType: 'application/json; charset=utf-8',
				headers: { 'X-CSRF-TOKEN': header }
			});
			// Audit request
			var auditObj = {
				type: 'XHR-Error',
				msg: msg
			};
			$.ajax({
				url: 'api/webaudit',
				method: 'POST',
				data: JSON.stringify(auditObj),
				contentType: 'application/json; charset=utf-8',
				headers: { 'X-CSRF-TOKEN': header }
			});
			/* Llamamos a la funcion original */
			errorFn.apply(null, args);
		};
		return $delegate;
	}]);
}])

/* Configuracion de estados, HTTP e idiomas */
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$translateProvider', 'httpRequestInterceptorCacheBusterProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, httpRequestInterceptorCacheBusterProvider) {
	/* Configuracion de CSRF, cookie y nombre cabecera*/
	$httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

	// alternatively, register the interceptor via an anonymous factory
	$httpProvider.interceptors.push(['$q', '$log', function ($q, $log) {
		return {
			'responseError': function responseError(response) {
				if (window.location.href.indexOf('login') < 0) {
					$log.error(response.config.url + ' - ' + response.status + ' ' + response.statusText + ': ' + response.data.msg);
				}
				return $q.reject(response);
			}
		};
	}]);

	/* Cache everything except rest api requests*/
	httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/], true);

	$urlRouterProvider.otherwise(function ($injector, $location) {
		var Principal = $injector.get('Principal');
		if (Principal.isAuthenticated()) {
			$location.url('/home');
		} else {
			$location.url('/login');
		}
	});
	$stateProvider.state('public', {
		abstract: true,
		views: {
			'header@': {
				templateUrl: 'scripts/components/header/header.html'
			}
		},
		resolve: {
			translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
				$translatePartialLoader.addPart('global');
				$translatePartialLoader.addPart('language');
				return $translate.refresh();
			}]
		}
	}).state('site', {
		abstract: true,
		views: {
			'header@': {
				templateUrl: 'scripts/components/header/header.html'
			}
		},
		resolve: {
			authorize: ['Auth', function (Auth) {
				return Auth.authorize();
			}],
			translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
				$translatePartialLoader.addPart('global');
				$translatePartialLoader.addPart('language');
				$translatePartialLoader.addPart('positions');
				$translatePartialLoader.addPart('states');
				return $translate.refresh();
			}]
		}
	}).state('main', {
		parent: 'site',
		name: 'main',
		url: '/',
		data: { roles: [] },
		views: {
			'content@': {
				controller: 'MainController'
			}
		},
		resolve: {
			mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
				$translatePartialLoader.addPart('main');
				return $translate.refresh();
			}]
		}
	});

	/* Configuracion de angular-translate */
	$translateProvider.useLoader('$translatePartialLoader', {
		urlTemplate: 'i18n/{part}/{lang}.json'
	});
	$translateProvider.preferredLanguage('es');
	$translateProvider.useCookieStorage();
}])
/* Configuracion del locale dinamico */
.config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
	tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
	tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
}]);
//# sourceMappingURL=app.config.js.map

"use strict";
// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE
angular.module('mentoringApp').constant('ENV', 'dev').constant('VERSION', '1.0.0-SNAPSHOT');
//# sourceMappingURL=app.constants.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/* globals angular */
angular.module('mentoringApp').run(['$rootScope', '$window', '$state', '$translate', 'Auth', 'Principal', 'Language', 'AuditService', 'ENV', 'VERSION', function ($rootScope, $window, $state, $translate, Auth, Principal, Language, AuditService, ENV, VERSION) {
	$rootScope.ENV = ENV;
	$rootScope.VERSION = VERSION;

	$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
		$rootScope.toState = toState;
		$rootScope.toStateParams = toStateParams;

		if ($state.current.name !== "" && $state.current.name !== "login" && Principal.isIdentityResolved()) {
			Auth.authorize();
		}
		// Update the language
		Language.getCurrent().then(function (language) {
			$translate.use(language);
		});
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		var titleKey = 'global.title';
		$rootScope.previousStateName = fromState.name;
		$rootScope.previousStateParams = fromParams;

		// If we aren't on Login state, audit the current state
		if (toState.name !== 'login') {
			AuditService.audit({ type: 'State-Change', element: toState.url });
		}
		$translate(titleKey).then(function (title) {
			// Change window title with translated one
			$window.document.title = title;
		});
	});

	$rootScope.$on('$viewContentLoaded', function () {
		// Check show header
		if ($state.current.name !== '' && $state.current.name !== 'login' && $state.current.name !== 'logout') {
			Principal.identity().then(function (account) {
				if (account) {
					// First, config Audit Logging
					// By using MutationObserver, we will add events to all the new elements that will appear on the page.
					// This is mandatory because ngIf elements aren't on the DOM until their boolean condition is true,
					// so if we look for them before the true condition, they will not be found.
					var target = document.querySelector('#content');
					if (window.MutationObserver) {
						var observer = new MutationObserver(function (mutations) {
							var auditElement = false;
							mutations.forEach(function (mutation) {
								angular.forEach(mutation.addedNodes, function (node) {
									if (!auditElement) {
										var nodeElement = $(node);
										auditElement = nodeElement.find('a, select, button').length > 0;
									}
								});
							});
							if (auditElement) {
								handleAuditEvents();
							}
						});
						var config = { childList: true, subtree: true };
						observer.observe(target, config);

						handleAuditEvents();
					}
					$rootScope.account = account;
					$rootScope.bodylayout = 'vass';
					if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.organization)) {
						if (account.organization === 'Serbatic') {
							$rootScope.bodylayout = 'serbatic';
						} else if (account.organization === 'VASSDigital') {
							$rootScope.bodylayout = 'vassdigital';
						}
					}
					$rootScope.isAuthenticated = Principal.isAuthenticated();
					$rootScope.isLeader = account.isLeader == 1 ? true : false;
					$rootScope.roleAdmin = Principal.isInRole('ROLE_ADMIN');
					$rootScope.roleRRHH = Principal.isInRole('ROLE_RRHH') || Principal.isInRole('ROLE_ADMIN') || Principal.isInRole('ROLE_DIRECTORG');
				}
			});
		}
	});

	$rootScope.back = function () {
		// If previous state is 'activate' or do not exist go to 'home'
		if ($rootScope.previousStateName === 'authenticate' || $state.get($rootScope.previousStateName) === null) {
			$state.go('main');
		} else {
			$state.go($rootScope.previousStateName, $rootScope.previousStateParams);
		}
	};

	// Handles audit events
	var handleAuditEvents = function handleAuditEvents() {
		var content = $('#content');
		// First unbind the events, in case there had been a reload, and the bind them again	
		content.find('form button[type="submit"]').unbind('click.submit').bind('click.submit', function (ev) {
			$(ev.target).parents('form').addClass('ng-sent');
		});
		content.find('a').unbind('click.webaudit').bind('click.webaudit', function (event) {
			AuditService.audit({ location: $state.$current.url.source, type: 'Click', element: event.target.toString() });
		});
		content.find('button').unbind('click.webaudit').bind('click.webaudit', function (event) {
			var target = event.target;
			var ngClick = target.attributes['ng-click'] != null ? target.attributes['ng-click'] : target.attributes['data-ng-click'];
			var msg = ngClick != undefined ? ngClick.value : 'Default Click';
			AuditService.audit({ location: $state.$current.url.source, type: 'Click', element: event.target.toString(), msg: msg });
		});
		content.find('select').unbind('change.webaudit').bind('change.webaudit', function (event) {
			var target = event.target;
			var ngModel = target.attributes['ng-model'] != null ? target.attributes['ng-model'] : target.attributes['data-ng-model'];
			var selection = ngModel != undefined ? ngModel.value + '=' : 'Selection: ';
			AuditService.audit({ location: $state.$current.url.source, type: 'Change', element: event.target.toString(), msg: selection + event.target.value });
		});
	};
}]);
//# sourceMappingURL=app.run.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
	$stateProvider.state('account', {
		abstract: true,
		parent: 'site'
	});
}]);
//# sourceMappingURL=account.state.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').factory('Language', ["$q", "$translate", "LANGUAGES", function ($q, $translate, LANGUAGES) {
    return {
        getCurrent: function getCurrent() {
            var deferred = $q.defer();
            var language = $translate.storage().get('NG_TRANSLATE_LANG_KEY');

            if (angular.isUndefined(language)) {
                language = 'es';
            }

            deferred.resolve(language);
            return deferred.promise;
        },
        getAll: function getAll() {
            var deferred = $q.defer();
            deferred.resolve(LANGUAGES);
            return deferred.promise;
        }
    };
}]).constant('LANGUAGES', [
/*
Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
They are written in English to avoid character encoding issues (not a perfect solution)
*/
'es', 'en']);
//# sourceMappingURL=language.service.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
/*@ngInject*/
function LanguageController($translate, Language) {
    var vm = this;

    Language.getCurrent().then(function (lang) {
        vm.selected = lang;
    });

    vm.changeLanguage = function (languageKey) {
        $translate.use(languageKey).then(function () {
            vm.selected = languageKey;
        });
        // Cambiamos el idioma del calendario
        $.datepicker.setDefaults($.datepicker.regional[languageKey]);
    };

    Language.getAll().then(function (languages) {
        vm.languages = languages;
    });
}
angular.module('mentoringApp').controller('LanguageController', LanguageController);
//# sourceMappingURL=language.controller.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        parent: 'public',
        url: '/login',
        data: {
            roles: []
        },
        views: {
            'header@': {
                template: '<div></div>'
            },
            'content@': {
                templateUrl: 'scripts/account/login/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('login');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=login.state.js.map

/* jshint -W097 */
/*jshint -W030 */
/* globals angular, $, document */
'use strict';
/*@ngInject*/
function LoginController($cookies, $state, Auth, Activate, AuditService) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.companies = ['VASS', 'VASSDigital', 'Serbatic'];
    vm.company = vm.companies[0];
    vm.rememberMe = true;

    /* Obtencion del token CRSF */
    Activate.get({ key: "KEY" });

    // Recuperamos el valor de la organización de la cookie si existe
    var organization = $cookies.organization;
    if (organization !== null && organization !== undefined) {
        vm.company = organization;
    }

    vm.login = function () {
        // Comprobamos si los valores de los campos requeridos son correctos
        if (vm.username !== undefined && vm.password !== undefined && vm.company !== undefined) {
            Auth.login({
                username: vm.username,
                password: vm.password,
                company: vm.company
            }).then(function () {
                vm.authenticationError = false;
                var now = new Date();
                var time = now.getTime();
                time += 24 * 60 * 60 * 1000 * 9999;
                now.setTime(time);
                document.cookie = 'organization' + '=' + vm.company + ';expires=' + now.toGMTString() + ';path=/';
                $state.go('home');
            })['catch'](function () {
                vm.authenticationError = true;
                showLoginError('login.messages.error.authentication');
            });
        } else {
            vm.authenticationError = true;
            showLoginError('login.messages.error.form');
        }
    };
    vm.cancelarEvento = function (event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
    };

    var showLoginError = function showLoginError(msg) {
        vm.Modal = {
            msg: msg,
            title: 'login.messages.error.title',
            button: 'login.messages.error.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
}
angular.module('mentoringApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
}]);
//# sourceMappingURL=logout.state.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').controller('LogoutController', ['$state', 'Auth', function ($state, Auth) {
    Auth.logout();
    $state.go('login');
}]);
//# sourceMappingURL=logout.controller.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('sessions', {
        parent: 'account',
        url: '/sessions',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'global.menu.account.sessions'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/account/sessions/sessions.html',
                controller: 'SessionsController'
            },
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('sessions');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=sessions.state.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').controller('SessionsController', ['$scope', 'Sessions', 'Principal', function ($scope, Sessions, Principal) {
    Principal.identity().then(function (account) {
        $scope.account = account;
    });

    $scope.success = null;
    $scope.error = null;
    $scope.sessions = Sessions.getAll();
    $scope.invalidate = function (series) {
        Sessions['delete']({ series: encodeURIComponent(series) }, function () {
            $scope.error = null;
            $scope.success = 'OK';
            $scope.sessions = Sessions.getAll();
        }, function () {
            $scope.success = null;
            $scope.error = 'ERROR';
        });
    };
}]);
//# sourceMappingURL=sessions.controller.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('settings', {
        parent: 'account',
        url: '/settings',
        data: {
            roles: ['ROLE_USER'],
            pageTitle: 'global.menu.account.settings'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/account/settings/settings.html',
                controller: 'SettingsController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('settings');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=settings.state.js.map

/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').controller('SettingsController', ['$scope', 'Principal', 'Auth', function ($scope, Principal, Auth) {
    $scope.success = null;
    $scope.error = null;
    Principal.identity().then(function (account) {
        $scope.settingsAccount = account;
    });

    $scope.save = function () {
        Auth.updateAccount($scope.settingsAccount).then(function () {
            $scope.error = null;
            $scope.success = 'OK';
            Principal.identity().then(function (account) {
                $scope.settingsAccount = account;
            });
        })['catch'](function () {
            $scope.success = null;
            $scope.error = 'ERROR';
        });
    };
}]);
//# sourceMappingURL=settings.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
"use strict";
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('allocation', {
        name: 'allocation',
        parent: 'site',
        url: '/allocation',
        data: {
            roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG'],
            pageTitle: 'allocations.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/allocation/allocation.html',
                controller: 'AllocationController',
                controllerAs: 'allocationCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('allocation');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=allocation.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring */
'use strict';
/*@ngInject*/
function AllocationController($rootScope, $filter, $translate, EmployeeEvaluableIdResource, EmployeeLeaderResource, Allocation, Allocations, AllocationsLeader, AllocationSave, AllocationsLE) {

    var vm = this;

    vm.onNgInit = function () {
        // Activamos la opción de menú Consulta de Evaluación
        $rootScope.activeOption = 'allocation';

        vm.empleado = {};
        vm.leader = {};
        vm.asignacion = [];
        vm.fecha2 = null;

        //Obtenemos empleados y mandos
        EmployeeEvaluableIdResource.query(function (res) {
            vm.empleados = res;
        });
        EmployeeLeaderResource.query(function (res) {
            vm.leaders = res;
        });
    };

    vm.change = function () {
        var idEmployee = vm.empleado.id;
        if (Mentoring.isUndefinedOrNull(vm.leader) || Mentoring.isUndefinedOrNull(vm.leader.id)) {
            if (!Mentoring.isUndefinedOrNull(idEmployee)) {
                Allocations.query({ employeeId: idEmployee }, function (res) {
                    vm.asignaciones = res;
                });
            } else {
                vm.asignaciones = [];
            }
        } else {
            if (Mentoring.isUndefinedOrNull(idEmployee)) {
                AllocationsLeader.query({ leaderId: vm.leader.id }, function (res) {
                    vm.asignaciones = res;
                });
            } else {
                AllocationsLE.query({ leaderId: vm.leader.id, employeeId: idEmployee }, function (res) {
                    vm.asignaciones = res;
                });
            }
        }
    };

    vm.changeMando = function () {
        // If no employee selected, check if there is leader selected also
        if (Mentoring.isUndefinedOrNull(vm.empleado) || Mentoring.isUndefinedOrNull(vm.empleado.id)) {
            if (!Mentoring.isUndefinedOrNull(vm.leader) && !Mentoring.isUndefinedOrNull(vm.leader.id)) {
                AllocationsLeader.query({ leaderId: vm.leader.id }, function (res) {
                    vm.asignaciones = res;
                });
            } else {
                vm.asignaciones = [];
            }

            // Else, if employee selected, check if there is leader selected to search for thier common allocations
        } else {
                if (!Mentoring.isUndefinedOrNull(vm.leader) && !Mentoring.isUndefinedOrNull(vm.leader.id)) {
                    AllocationsLE.query({ leaderId: vm.leader.id, employeeId: vm.empleado.id }, function (res) {
                        vm.asignaciones = res;
                    });
                    // If no leader selected, search employee alocations only
                } else {
                        Allocations.query({ employeeId: vm.empleado.id }, function (res) {
                            vm.asignaciones = res;
                        });
                    }
            }
    };

    // Handles the click on New button
    vm.showNewAllocation = function () {
        vm.newAllocation = {};
        $('form').removeClass('ng-sent');

        // If there is an employee selected, preselect it on the new dialog
        if (vm.empleado) {
            vm.newAllocation.employeeId = vm.empleado.id;
        }
        // Shows the new dialog
        $('#myModalNew').modal('show');
        var d = new Date();
        vm.fecha = $filter('date')(d, $translate.instant('dateFormat'));
        vm.today = new Date();
    };

    // Saves an allocation
    vm.saveAllocation = function () {
        // First of all, check if the form is valid
        if (Mentoring.isUndefinedOrNull(vm.newAllocation.employeeId) || Mentoring.isUndefinedOrNull(vm.newAllocation.leaderId) || Mentoring.isUndefinedOrNull(vm.newAllocation.dateFrom)) {
            showModal({ msg: 'allocation.modal.new.invalid', title: 'allocation.modal.new.warning' });
            return;
        }
        AllocationSave.guardar(vm.newAllocation, function () {
            $('#myModalNew').modal('hide');
            showModal({ msg: 'allocation.modal.new.modify', title: 'allocation.modal.new.title' });
            vm.change();
        }, function (err) {
            showModal({ msg: err.data.msg });
        });
    };

    // Handles the modification of an allocation
    vm.modificar = function () {
        // Creates the object to be sent to the server
        var allocMod = vm.allocationToMod;
        var dateFrom = $filter('date')(allocMod.dateFrom, 'dd/MM/yyyy');
        var dateUntil = allocMod.dateUntil ? $filter('date')(allocMod.dateUntil, 'dd/MM/yyyy') : null;
        var allocationToSave = {
            id: allocMod.id,
            employeeId: allocMod.employeeId,
            leaderId: allocMod.leaderId,
            dateFrom: dateFrom,
            dateUntil: dateUntil
        };
        // Dispath server request
        AllocationSave.update(allocationToSave, function () {
            $('#myModalModify').modal('hide');
            showModal({ msg: 'allocation.modal.success.modify', title: 'allocation.modal.success.title' });
            vm.change();
        }, function (err) {
            var msg = 'allocation.modal.error.modify';
            if (err.data && err.data.msg) {
                msg = err.data.msg;
            }
            showModal({ msg: msg });
        });
    };

    // Handles the click on the modify icon.
    vm.obtenerId = function (allocation) {
        // Flag to show or not the select date input
        vm.showInputDate = false;
        if (Mentoring.isUndefinedOrNull(allocation.dateUntil)) {
            vm.showInputDate = true;
        }

        // Gets a copy of the allocation to mod
        vm.allocationToMod = angular.copy(allocation);
        // Shows the modify dialog
        $('#myModalModify').modal('show');
    };

    vm.cancelar = function () {
        vm.fecha = null;
    };

    var showModal = function showModal(opts) {
        vm.Modal = {
            msg: opts.msg || 'allocation.modal.error.default',
            title: opts.title || 'allocation.modal.error.title',
            button: 'allocation.modal.ok',
            action: opts.action || function () {
                $('#myModal').modal('hide');
            }
        };
        $('#myModal').modal('show');
    };
}
angular.module('mentoringApp').controller('AllocationController', AllocationController);
//# sourceMappingURL=allocation.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('Allocations', ["$resource", function ($resource) {
	return $resource('api/allocation/:employeeId', {}, Mentoring.resourceHandler);
}]).factory('CurrentAllocation', ["$resource", function ($resource) {
	return $resource('api/allocation/current/:employeeId', {}, Mentoring.resourceHandler);
}]).factory('AllocationsLeader', ["$resource", function ($resource) {
	return $resource('api/allocationLeader/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('AllocationsLE', ["$resource", function ($resource) {
	return $resource('api/allocationLE/:leaderId/:employeeId', {}, Mentoring.resourceHandler);
}]).factory('AllocationSave', ["$resource", function ($resource) {
	return $resource('api/allocation', {}, {
		'guardar': { method: 'POST' },
		'update': { url: 'api/updallocation', method: 'PUT' }
	});
}]).factory('Allocation', function () {
	return {
		agrupar: function agrupar(id, empleado, mando, fecha) {
			var respuestaJSON = {
				id: id,
				employeeId: empleado,
				leaderId: mando,
				dateFrom: fecha
			};
			return angular.toJson(respuestaJSON);
		},
		actualizarFecha: function actualizarFecha(date) {
			$('#dateFrom').datepicker('option', 'minDate', new Date(date));
		}
	};
});
//# sourceMappingURL=allocation.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('Auth', ['$rootScope', '$state', '$q', '$translate', 'Activate', 'Principal', 'AuthServerProvider', '$log', function ($rootScope, $state, $q, $translate, Activate, Principal, AuthServerProvider, $log) {
    return {
        login: function login(credentials, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            AuthServerProvider.login(credentials).then(function (data) {
                // retrieve the logged account information
                Principal.identity(true).then(function () {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    $log.log('Usuario identificado correctamente');
                });
                deferred.resolve(data);

                return cb();
            })['catch']((function (err) {
                this.logout();
                Activate.get({ key: "KEY" });
                deferred.reject(err);
                return cb(err);
            }).bind(this));

            return deferred.promise;
        },

        logout: function logout() {
            AuthServerProvider.logout();
            Principal.authenticate(null);
        },

        authorize: function authorize(force) {
            return Principal.identity(force).then(function () {
                var isAuthenticated = Principal.isAuthenticated();
                if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {
                    if (isAuthenticated) {
                        // user is signed in but not authorized for desired state
                        $state.go('accessdenied');
                    } else {
                        // user is not authenticated. stow the state they wanted before you
                        // send them to the signin state, so you can return them when you're done
                        $rootScope.returnToState = $rootScope.toState;
                        $rootScope.returnToStateParams = $rootScope.toStateParams;

                        // now, send them to the signin state so they can log in
                        $state.go('login');
                    }
                }
            });
        }
    };
}]);
//# sourceMappingURL=auth.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('Principal', ['$q', 'Account', function ($q, Account) {
    var _identity,
        _authenticated = false;

    return {
        isIdentityResolved: function isIdentityResolved() {
            return angular.isDefined(_identity);
        },
        isAuthenticated: function isAuthenticated() {
            return _authenticated;
        },
        isInRole: function isInRole(role) {
            if (!_authenticated || !_identity || !_identity.roles) {
                return false;
            }

            return _identity.roles.indexOf(role) !== -1;
        },
        isInAnyRole: function isInAnyRole(roles) {
            if (!_authenticated || !_identity.roles) {
                return false;
            }

            for (var i = 0; i < roles.length; i++) {
                if (this.isInRole(roles[i])) {
                    return true;
                }
            }

            return false;
        },
        authenticate: function authenticate(identity) {
            _identity = identity;
            _authenticated = identity !== null;
        },
        identity: function identity(force) {
            var deferred = $q.defer();

            if (force === true) {
                _identity = undefined;
            }

            // check and see if we have retrieved the identity data from the server.
            // if we have, reuse it by immediately resolving
            if (angular.isDefined(_identity)) {
                deferred.resolve(_identity);

                return deferred.promise;
            }

            // retrieve the identity data from the server, update the identity object, and then resolve.
            Account.get().$promise.then(function (account) {
                _identity = account.data;
                _authenticated = true;
                deferred.resolve(_identity);
            })['catch'](function () {
                _identity = null;
                _authenticated = false;
                deferred.resolve(_identity);
            });
            return deferred.promise;
        }
    };
}]);
//# sourceMappingURL=principal.service.js.map

'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Account', ['$resource', function ($resource) {
        return $resource('api/account', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function response(_response) {
                        // expose response
                        return _response;
                    }
                }
            }
        });
    }]);
})();
//# sourceMappingURL=account.service.js.map

'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Activate', ['$resource', function ($resource) {
        return $resource('api/activate', {}, {
            'get': { method: 'GET', params: {}, isArray: false }
        });
    }]);
})();
//# sourceMappingURL=activate.service.js.map

'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Password', ['$resource', function ($resource) {
        return $resource('api/account/change_password', {}, {});
    }]);
})();
//# sourceMappingURL=password.service.js.map

'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Register', ['$resource', function ($resource) {
        return $resource('api/register', {}, {});
    }]);
})();
//# sourceMappingURL=register.service.js.map

'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Sessions', ['$resource', function ($resource) {
        return $resource('api/account/sessions/:series', {}, {
            'getAll': { method: 'GET', isArray: true }
        });
    }]);
})();
//# sourceMappingURL=sessions.service.js.map

'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('User', ['$resource', function ($resource) {
        return $resource('api/users/:login', {}, {
            'query': { method: 'GET', isArray: true },
            'get': {
                method: 'GET',
                transformResponse: function transformResponse(data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }]);
})();
//# sourceMappingURL=user.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('AuthServerProvider', ['$log', '$http', 'localStorageService', '$window', function ($log, $http, localStorageService, $window) {
    return {
        login: function login(credentials) {
            var data = 'j_username=' + credentials.company + ':' + encodeURIComponent(credentials.username) + '&j_password=' + encodeURIComponent(credentials.password) + '&submit=Login';
            return $http.post('api/authentication', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                localStorageService.set('token', $window.btoa(credentials.username + ':' + credentials.password));
                return response;
            }).error(function () {
                $log.error("Login error");
            });
        },
        logout: function logout() {
            // logout from the server
            $http.post('api/logout').success(function (response) {
                localStorageService.clearAll();
                return response;
            });
        },
        getToken: function getToken() {
            var token = localStorageService.get('token');
            return token;
        },
        hasValidToken: function hasValidToken() {
            var token = this.getToken();
            return !!token;
        }
    };
}]);
//# sourceMappingURL=auth.session.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('admin', {
        abstract: true,
        parent: 'site'
    });
}]);
//# sourceMappingURL=admin.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('audits', {
        name: 'audits',
        parent: 'admin',
        url: '/audits',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'audits.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/audits/audits.html',
                controller: 'AuditsController',
                controllerAs: 'auditsCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('audits');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=audits.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function AuditsController($rootScope, $filter, AuditsService) {

    var vm = this;

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    vm.onChangeDate = function () {
        var dateFormat = 'yyyy-MM-dd';
        var fromDate = $filter('date')(vm.fromDate, dateFormat);
        var toDate = $filter('date')(vm.toDate, dateFormat);

        AuditsService.findByDates(fromDate, toDate).then(function (data) {
            vm.audits = data;
        });
    };

    // Date picker configuration
    vm.today = function () {
        // Today + 1 day - needed if the current day must be included
        var today = new Date();
        vm.toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    };

    vm.previousMonth = function () {
        var fromDate = new Date();
        if (fromDate.getMonth() === 0) {
            fromDate = new Date(fromDate.getFullYear() - 1, 0, fromDate.getDate());
        } else {
            fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
        }

        vm.fromDate = fromDate;
    };

    vm.today();
    vm.previousMonth();
    vm.onChangeDate();
}
angular.module('mentoringApp').controller('AuditsController', AuditsController);
//# sourceMappingURL=audits.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('AuditsService', ['$http', function ($http) {
    return {
        findAll: function findAll() {
            return $http.get('api/audits/all').then(function (response) {
                return response.data;
            });
        },
        findByDates: function findByDates(fromDate, toDate) {
            var formatDate = function formatDate(dateToFormat) {
                if (dateToFormat !== undefined && !angular.isString(dateToFormat)) {
                    return dateToFormat.getYear() + '-' + dateToFormat.getMonth() + '-' + dateToFormat.getDay();
                }
                return dateToFormat;
            };
            return $http.get('api/audits/byDates', { params: { fromDate: formatDate(fromDate), toDate: formatDate(toDate) } }).then(function (response) {
                return response.data;
            });
        }
    };
}]);
//# sourceMappingURL=audits.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
}]);
//# sourceMappingURL=configuration.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConfigurationController($rootScope, ConfigurationService) {

    var vm = this;

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = 'configuration';

    ConfigurationService.get().then(function (configuration) {
        vm.configuration = configuration;
    });
}
angular.module('mentoringApp').controller('ConfigurationController', ConfigurationController);
//# sourceMappingURL=configuration.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('ConfigurationService', ['$rootScope', '$filter', '$http', function ($rootScope, $filter, $http) {
    return {
        get: function get() {
            return $http.get('configprops').then(function (response) {
                var properties = [];
                angular.forEach(response.data, function (data) {
                    properties.push(data);
                });
                var orderBy = $filter('orderBy');
                return orderBy(properties, 'prefix');
            });
        }
    };
}]);
//# sourceMappingURL=configuration.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
}]);
//# sourceMappingURL=docs.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').controller('DocsController', ['$rootScope', function ($rootScope) {
	// Activamos la opción de menú Configuración
	$rootScope.activeOption = "configuration";
}]);
//# sourceMappingURL=docs.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('health', {
        name: 'health',
        parent: 'admin',
        url: '/health',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'health.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/health/health.html',
                controller: 'HealthController',
                controllerAs: 'healthCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('health');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=health.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function HealthController($rootScope, HealthService) {
    var vm = this;

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    vm.updatingHealth = true;
    vm.separator = '.';

    vm.refresh = function () {
        vm.updatingHealth = true;
        HealthService.checkHealth().then(function (response) {
            vm.healthData = vm.transformHealthData(response);
            vm.updatingHealth = false;
        }, function (response) {
            vm.healthData = vm.transformHealthData(response.data);
            vm.updatingHealth = false;
        });
    };

    vm.refresh();

    vm.getLabelClass = function (statusState) {
        if (statusState === 'UP') {
            return 'label-success';
        } else {
            return 'label-danger';
        }
    };

    vm.transformHealthData = function (data) {
        var response = [];
        vm.flattenHealthData(response, null, data);
        return response;
    };

    vm.flattenHealthData = function (result, path, data) {
        angular.forEach(data, function (value, key) {
            if (vm.isHealthObject(value)) {
                if (vm.hasSubSystem(value)) {
                    vm.addHealthObject(result, false, value, vm.getModuleName(path, key));
                    vm.flattenHealthData(result, vm.getModuleName(path, key), value);
                } else {
                    vm.addHealthObject(result, true, value, vm.getModuleName(path, key));
                }
            }
        });
        return result;
    };

    vm.getModuleName = function (path, name) {
        var result;
        if (path && name) {
            result = path + vm.separator + name;
        } else if (path) {
            result = path;
        } else if (name) {
            result = name;
        } else {
            result = '';
        }
        return result;
    };

    vm.showHealth = function (health) {
        vm.currentHealth = health;
        $('#showHealthModal').modal('show');
    };

    vm.addHealthObject = function (result, isLeaf, healthObject, name) {

        var healthData = {
            'name': name
        };
        var details = {};
        var hasDetails = false;

        angular.forEach(healthObject, function (value, key) {
            if (key === 'status' || key === 'error') {
                healthData[key] = value;
            } else {
                if (!vm.isHealthObject(value)) {
                    details[key] = value;
                    hasDetails = true;
                }
            }
        });

        // Add the of the details
        if (hasDetails) {
            angular.extend(healthData, { 'details': details });
        }

        // Only add nodes if they provide additional information
        if (isLeaf || hasDetails || healthData.error) {
            result.push(healthData);
        }
        return healthData;
    };

    vm.hasSubSystem = function (healthObject) {
        var result = false;
        angular.forEach(healthObject, function (value) {
            if (value && value.status) {
                result = true;
            }
        });
        return result;
    };

    vm.isHealthObject = function (healthObject) {
        var result = false;
        angular.forEach(healthObject, function (value, key) {
            if (key === 'status') {
                result = true;
            }
        });
        return result;
    };

    vm.baseName = function (name) {
        if (name) {
            var split = name.split('.');
            return split[0];
        }
    };

    vm.subSystemName = function (name) {
        if (name) {
            var split = name.split('.');
            split.splice(0, 1);
            var remainder = split.join('.');
            return remainder ? ' - ' + remainder : '';
        }
    };
}
angular.module('mentoringApp').controller('HealthController', HealthController);
//# sourceMappingURL=health.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('HealthService', ['$http', function ($http) {
    return {
        getMetrics: function getMetrics() {
            return $http.get('metrics').then(function (response) {
                return response.data;
            });
        },

        checkHealth: function checkHealth() {
            return $http.get('health').then(function (response) {
                return response.data;
            });
        },

        threadDump: function threadDump() {
            return $http.get('dump').then(function (response) {
                return response.data;
            });
        }
    };
}]);
//# sourceMappingURL=health.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('logs', {
        name: 'logs',
        parent: 'admin',
        url: '/logs',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'logs.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/logs/logs.html',
                controller: 'LogsController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('logs');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=logs.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
angular.module('mentoringApp').controller('LogsController', ['$rootScope', '$scope', 'LogsService', function ($rootScope, $scope, LogsService) {

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    $scope.loggers = LogsService.findAll();

    $scope.changeLevel = function (name, level) {
        LogsService.changeLevel({ name: name, level: level }, function () {
            $scope.loggers = LogsService.findAll();
        });
    };
}]);
//# sourceMappingURL=logs.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PrintService', ['$http', function ($http) {
	return {
		print: function print(datos) {
			$http.post('api/logs', datos, {}).success(function (response) {
				return response;
			});
		}
	};
}]).factory('LogsService', ['$resource', function ($resource) {
	return $resource('api/logs', {}, {
		'findAll': { method: 'GET', isArray: true },
		'changeLevel': { method: 'PUT' }
	});
}]);
//# sourceMappingURL=logs.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('metrics', {
        parent: 'admin',
        url: '/metrics',
        data: {
            roles: ['ROLE_ADMIN'],
            pageTitle: 'metrics.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/configuration/metrics/metrics.html',
                controller: 'MetricsController',
                controllerAs: 'metricsCtrl'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('metrics');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=metrics.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function MetricsController($rootScope, $scope, HealthService) {
    var vm = this;

    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    vm.metrics = {};
    vm.updatingMetrics = true;

    vm.refresh = function () {
        vm.updatingMetrics = true;
        HealthService.getMetrics().then(function (promise) {
            vm.metrics = promise;
            vm.updatingMetrics = false;
        }, function (promise) {
            vm.metrics = promise.data;
            vm.updatingMetrics = false;
        });
    };

    $scope.$watch('metrics', function (newValue) {
        vm.servicesStats = {};
        vm.cachesStats = {};
        angular.forEach(newValue.timers, function (value, key) {
            if (key.indexOf('web.rest') !== -1 || key.indexOf('service') !== -1) {
                vm.servicesStats[key] = value;
            }

            if (key.indexOf('net.sf.ehcache.Cache') !== -1) {
                // remove gets or puts
                var index = key.lastIndexOf('.');
                var newKey = key.substr(0, index);

                // Keep the name of the domain
                index = newKey.lastIndexOf('.');
                vm.cachesStats[newKey] = {
                    'name': newKey.substr(index + 1),
                    'value': value
                };
            }
        });
    });

    vm.refresh();

    vm.refreshThreadDumpData = function () {
        HealthService.threadDump().then(function (data) {
            vm.threadDump = data;

            vm.threadDumpRunnable = 0;
            vm.threadDumpWaiting = 0;
            vm.threadDumpTimedWaiting = 0;
            vm.threadDumpBlocked = 0;

            angular.forEach(data, function (value) {
                if (value.threadState === 'RUNNABLE') {
                    vm.threadDumpRunnable += 1;
                } else if (value.threadState === 'WAITING') {
                    vm.threadDumpWaiting += 1;
                } else if (value.threadState === 'TIMED_WAITING') {
                    vm.threadDumpTimedWaiting += 1;
                } else if (value.threadState === 'BLOCKED') {
                    vm.threadDumpBlocked += 1;
                }
            });

            vm.threadDumpAll = vm.threadDumpRunnable + vm.threadDumpWaiting + vm.threadDumpTimedWaiting + vm.threadDumpBlocked;
        });
    };

    vm.getLabelClass = function (threadState) {
        if (threadState === 'RUNNABLE') {
            return 'label-success';
        } else if (threadState === 'WAITING') {
            return 'label-info';
        } else if (threadState === 'TIMED_WAITING') {
            return 'label-warning';
        } else if (threadState === 'BLOCKED') {
            return 'label-danger';
        }
    };
}
angular.module('mentoringApp').controller('MetricsController', MetricsController);
//# sourceMappingURL=metrics.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
}]);
//# sourceMappingURL=roles.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function RolesController($rootScope, EmpleadosRL, Roles, RolesUsuario, Guardar, Borrar) {
        var vm = this;

        vm.empleado = [];
        vm.roles = [];
        vm.rol = '';
        vm.correcto = false;
        vm.habilitado = false;

        // Activamos la opción de menú Configuración
        $rootScope.activeOption = "configuration";

        vm.loadAll = function () {
                EmpleadosRL.query(function (result1) {
                        vm.empleados = result1;
                });
                Roles.query(function (result2) {
                        vm.roles = result2;
                });
        };
        vm.loadAll();

        vm.change = function () {
                if ($('#role').hasClass('ng-dirty')) {
                        vm.habilitado = false;
                }
                RolesUsuario.query({ userId: vm.empleado.id }, function (result3) {
                        if (result3.length > 0) {
                                vm.rol = result3[0].authorityName;
                                if (vm.rol === 'ROLE_ADMIN') {
                                        vm.habilitado = false;
                                } else {
                                        vm.habilitado = true;
                                }
                        } else {
                                vm.rol = 'ROLE_USER';
                                vm.habilitado = true;
                        }
                });
        };

        vm.guardar = function (userId, authorityName, valido) {
                if (valido) {
                        vm.correcto = true;
                        if (authorityName === 'ROLE_USER') {
                                Borrar.borrar({ id: userId });
                        } else {
                                var respuestaJSON = Guardar.agrupar(userId, authorityName);
                                Guardar.guardar(respuestaJSON);
                        }
                }
        };
}
angular.module('mentoringApp').controller('RolesController', RolesController);
//# sourceMappingURL=roles.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('EmpleadosRL', ['$resource', function ($resource) {
	return $resource('api/employeeRol/:id', {}, Mentoring.resourceHandler);
}]).factory('Roles', ['$resource', function ($resource) {
	return $resource('api/tAuthority/:id', {}, Mentoring.resourceHandler);
}]).factory('Guardar', ['$http', function ($http) {
	return {
		guardar: function guardar(datos) {
			return $http.post('api/userauth', datos, {}).success(function (response) {
				return response;
			});
		},
		agrupar: function agrupar(userId, authorityName) {
			var respuestaJSON = {
				userId: userId,
				authorityName: authorityName
			};
			return angular.toJson(respuestaJSON);
		}
	};
}]).factory('Borrar', ['$resource', function ($resource) {
	return $resource('api/userauthDelete/:id', {}, {
		'query': { method: 'GET', isArray: true },
		'get': {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		'borrar': { method: 'DELETE' }
	});
}]).factory('RolesUsuario', ['$resource', function ($resource) {
	return $resource('api/userauth/:userId', {}, Mentoring.resourceHandler);
}]);
//# sourceMappingURL=roles.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/**
 * Configuracion para los estados #consult de la aplicacion
 */
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
}]);
//# sourceMappingURL=consult.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConsultController($rootScope, $state, $q, $previousState, $stateParams, Principal, EvaluationsCn, EmpleadosCn, EvaluationsAllEmployees, isEvaluationDate, isFinalEvaluationDate, EvaluationYear, EvaluationsMandoCn, EvaluationsConsultLeader, EmployeeEvaluationResource, EvaluationEmployeeLeaderResource, EmployeeEvaluableIdResource, EmployeeLeaderResource, EmployeesDIRECTOR, LeadersDIRECTOR, EmployeesGERENTE, LeadersGERENTE, EmployeesRRHH, LeadersRRHH, SharingEvaluationService, IsModificableService) {

    var vm = this;

    var prevState = $previousState.get('consult');
    if ($state.current.name != 'login') {
        Principal.identity().then(function (account) {
            // Activamos la opción de menú Consulta de Evaluación
            $rootScope.activeOption = "consult";
            vm.account = account;
            vm.user = {
                firstName: account.firstName,
                lastName: account.lastName
            };
            vm.esModificable = true;

            if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles)) {
                vm.leader = {};
                vm.evaluation = {};
                vm.empleado = {};
                vm.empleadoLeaderUser = {};
                vm.isLeader = account.isLeader;
                vm.roleUSER = account.roles.indexOf('ROLE_USER') > -1;
                vm.roleRRHH = account.roles.indexOf('ROLE_RRHH') > -1;
                vm.roleGERENTE = account.roles.indexOf('ROLE_GERENTE') > -1;
                vm.roleDIRECTOR = account.roles.indexOf('ROLE_DIRECTOR') > -1;
                vm.roleDIRECTORG = account.roles.indexOf('ROLE_DIRECTORG') > -1;
                vm.roleADMIN = account.roles.indexOf('ROLE_ADMIN') > -1;

                isEvaluationDate.get(function (isDate) {
                    vm.isEvaluationDate = isDate.value;
                });
                isFinalEvaluationDate.get(function (isDate) {
                    vm.isFinalEvaluationDate = isDate.value;
                });

                // Obtains the evaluation's period year
                EvaluationYear.get(function (res) {
                    vm.evaluationYear = res.value;
                });

                vm.isVisibleEvaluator = !(vm.roleGERENTE || vm.roleDIRECTOR);

                if (vm.isLeader || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
                    if (vm.isLeader && !(vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
                        vm.isVisibleLeader = false;
                    } else {
                        vm.isVisibleLeader = true;
                    }
                    vm.isVisible = true;
                } else {
                    vm.isVisible = false;
                    vm.isVisibleLeader = false;
                }

                if (vm.roleUSER && !(vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
                    if (vm.isLeader === 0) {
                        vm.evaluations = EvaluationsAllEmployees.query({
                            employeeId: account.employeeId
                        });
                    } else {
                        vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                            leaderId: account.employeeId
                        }, function (result) {

                            // Once we have the users, check if there is a previously selected employee
                            if (prevState && prevState.params.empleado) {
                                // Obtains the employee from the list of employees
                                var employeeLeader = result.filter(function (ev) {
                                    if (ev.employeeId === prevState.params.empleado) {
                                        return ev;
                                    }
                                });
                                if (employeeLeader.length > 0) {
                                    vm.empleadoLeaderUser.info = employeeLeader[0];
                                }
                                // If no employee has been found, it's because the leader has selected its own evaluation
                                // so we call the combo's change value method anyway
                                vm.changeLeaderUser();
                                return;
                            }
                            // If there is no previous employee, obtains all
                            vm.evaluations = EvaluationsAllEmployees.query({
                                employeeId: account.employeeId
                            });
                        });
                    }
                    vm.esModificable = false;
                }

                if (vm.roleADMIN || vm.roleDIRECTORG) {
                    var promises = [];
                    promises.push(EmployeeEvaluableIdResource.query({}, function (result) {
                        vm.empleados = result;
                        // Once we have the users, check if there is a previously selected employee
                        if (prevState && prevState.params.empleado) {
                            // Obtains the employee from the list of employees
                            var employee = result.filter(function (ev) {
                                if (ev.id === prevState.params.empleado) {
                                    return ev;
                                }
                            });
                            // Set the employee as the combo value
                            if (employee.length > 0) {
                                vm.empleado.info = employee[0];
                            }
                        }
                    }).$promise);
                    promises.push(EmployeeLeaderResource.query({}, function (result) {
                        vm.leaders = result;
                        // Once we have the users, check if there is a previously selected employee
                        if (prevState && prevState.params.leader) {
                            // Obtains the employee from the list of employees
                            var employee = result.filter(function (ev) {
                                if (ev.id === prevState.params.leader.id) {
                                    return ev;
                                }
                            });
                            // Set the employee as the combo value
                            if (employee.length > 0) {
                                vm.leader.info = employee[0];
                            }
                        }
                    }).$promise);

                    // Once all the request have finished, do the combo selection
                    $q.all(promises).then(function () {
                        // If there is a selected employee, only when we come back for consultEvaluation state
                        if (vm.empleado.info) {
                            vm.change(vm.empleado.info.id);
                        }
                    });
                }

                if (vm.roleDIRECTOR) {
                    vm.empleados = EmployeesDIRECTOR.query({
                        directionId: account.employeeId
                    });
                    vm.leaders = LeadersDIRECTOR.query({
                        directionId: account.employeeId
                    });
                    vm.esModificable = false;
                }

                if (vm.roleGERENTE) {
                    vm.empleados = EmployeesGERENTE.query({ managerId: account.employeeId
                    }, function (result) {
                        // Once we have the users, check if there is a previously selected employee
                        if (prevState && prevState.params.empleado) {
                            // Obtains the employee from the list of employees
                            var employee = result.filter(function (ev) {
                                if (ev.id === prevState.params.empleado) {
                                    return ev;
                                }
                            });
                            // Set the employee as the combo value
                            if (employee.length > 0) {
                                vm.empleado.info = employee[0];
                            }
                        }
                    });
                    vm.leaders = LeadersGERENTE.query({
                        managerId: account.employeeId
                    });

                    // Now checks if there is a previously selected employee and search for its evaluations
                    if (prevState && prevState.params !== undefined) {
                        vm.change(prevState.params.empleado);
                    }
                    vm.esModificable = false;
                }

                if (vm.roleRRHH) {
                    EmployeesRRHH.query(function (result) {
                        //busca y recupera el propio usuario para añadirlo a la lista de empleados
                        //los empleados con rol rrhh no ven a los otros de rrhh y asi puede verse a si mismo
                        result.splice(0, 0, {
                            id: vm.account.employeeId,
                            employeeId: vm.account.employeeId,
                            firstSurname: vm.account.lastName,
                            name: vm.account.firstName
                        });
                        vm.empleados = result;
                    });
                    LeadersRRHH.query(function (result5) {
                        vm.leaders = result5;
                    });
                }
                $previousState.forget('consult');
            }
            if ($state.current.name !== 'login') {
                vm.isAuthenticated = Principal.isAuthenticated();
            }
        });
    }

    vm.showEvaluatorInput = function (evaluacion) {
        var showInput = true;
        // Leaders, HR, Managers, Directors and Admin can see this input.
        if (vm.isLeader || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
            showInput = true;
        }
        // Only case when the user cant see the input is when the user is the evaluated employee.
        if (evaluacion.employeeId == vm.account.employeeId) {
            showInput = false;
        }
        return showInput;
    };

    vm.isEvaluador = function (evaluacion) {
        return evaluacion.leaderId == vm.account.employeeId;
    };

    vm.modificable = function (evaluacion) {
        return IsModificableService.modificable(vm.account, evaluacion, vm.evaluationYear, vm.isEvaluationDate, vm.isFinalEvaluationDate, vm.roleRRHH, vm.roleDIRECTORG, vm.roleADMIN);
    };

    vm.mostrarEvaluacion = function (evaluacion) {
        SharingEvaluationService.setId(evaluacion.id);
        SharingEvaluationService.setModification(vm.modificable(evaluacion));
        SharingEvaluationService.setEvaluado(evaluacion);
        $stateParams.empleado = evaluacion.employeeId;
        $stateParams.leader = vm.leader.info;
        $stateParams.evaluation = evaluacion;
        $stateParams.showInput = vm.showEvaluatorInput(evaluacion);
        $state.go('consultEvaluation');
    };

    vm.changeLeaderUser = function (idEmpleado) {
        if (Mentoring.isUndefinedOrNull(vm.empleadoLeaderUser.info)) {
            EvaluationsAllEmployees.query({
                employeeId: vm.account.employeeId
            }, function (evaluaciones) {
                vm.evaluations = evaluaciones;
            });
        } else {
            EmployeeEvaluationResource.query({
                employeeId: vm.empleadoLeaderUser.info.employeeId
            }, function (evaluaciones) {
                vm.evaluations = evaluaciones;
            });
        }
    };

    vm.change = function (dato1) {
        if (Mentoring.isUndefinedOrNull(dato1)) {
            if (Mentoring.isUndefinedOrNull(vm.leader.info) || Mentoring.isUndefinedOrNull(vm.leader.info.id)) {
                vm.evaluations = [];
            } else {
                vm.evaluations = EvaluationsMandoCn.query({
                    leaderId: vm.leader.info.id
                });
            }
        } else {
            if (Mentoring.isUndefinedOrNull(vm.leader.info) || Mentoring.isUndefinedOrNull(vm.leader.info.id)) {
                vm.evaluations = EmployeeEvaluationResource.query({
                    employeeId: dato1
                });
            } else {
                vm.evaluations = EvaluationEmployeeLeaderResource.query({
                    employeeId: dato1,
                    leaderId: vm.leader.info.id
                });
            }
        }
    };

    vm.changeMando = function (dato2) {
        vm.dato2 = dato2;
        if (Mentoring.isUndefinedOrNull(dato2)) {
            if (Mentoring.isUndefinedOrNull(vm.empleado.info) || Mentoring.isUndefinedOrNull(vm.empleado.info.id)) {
                vm.evaluations = [];
            } else {
                vm.evaluations = EmployeeEvaluationResource.query({
                    employeeId: vm.empleado.info.id
                });
            }
        } else {
            if (Mentoring.isUndefinedOrNull(vm.empleado.info) || Mentoring.isUndefinedOrNull(vm.empleado.info.id)) {
                vm.evaluations = EvaluationsMandoCn.query({
                    leaderId: dato2
                });
            } else {
                vm.evaluations = EvaluationEmployeeLeaderResource.query({
                    employeeId: vm.empleado.info.id,
                    leaderId: dato2
                });
            }
        }
    };
}
angular.module('mentoringApp').controller('ConsultController', ConsultController);
//# sourceMappingURL=consult.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('EmpleadosCn', ['$resource', function ($resource) {
	return $resource('api/employee/:id', {}, { query: { method: 'GET', isArray: true },
		getEmployeeInfo: { isArray: false },
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' } });
}]).factory('EmployeesDirector', ['$resource', function ($resource) {
	return $resource('api/employeesDirector/:directionId', {}, Mentoring.resourceHandler);
}]).factory('AnswersResource', ['$resource', function ($resource) {
	return $resource('api/answerss/:id', {}, Mentoring.resourceHandler);
}]).factory('CompetencesResource', ['$resource', function ($resource) {
	return $resource('api/competences/:id', {}, Mentoring.resourceHandler);
}]).factory('EmployeeEvaluableIdResource', ['$resource', function ($resource) {
	return $resource('api/employeeEvaluable/:id', {}, Mentoring.resourceHandler);
}]).factory('EmployeeLeaderResource', ['$resource', function ($resource) {
	return $resource('api/employeeLeader/', {}, Mentoring.resourceHandler);
}]).factory('EmployeeIsLeaderResource', ['$resource', function ($resource) {
	return $resource('api/isleader/:employeeId', {}, Mentoring.resourceHandlerGETNoTransform);
}]).factory('EmployeeEvaluationResource', ['$resource', function ($resource) {
	return $resource('api/evaluation/:employeeId', {}, { query: { method: 'GET', isArray: true },
		getEvaluation: { url: 'api/evaluation/:employeeId/:evaluationId', isArray: false },
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' } });
}]).factory('EvaluationEmployeeLeaderResource', ['$resource', function ($resource) {
	return $resource('api/evaluationEmpLea/:employeeId/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('PillarsResource', ['$resource', function ($resource) {
	return $resource('api/pillars/:id', {}, Mentoring.resourceHandler);
}]).factory('QuestionsResource', ['$resource', function ($resource) {
	return $resource('api/questionss/:id', {}, {
		query: { method: 'GET', isArray: true },
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' }
	});
}]).factory('StatesResource', ['$resource', function ($resource) {
	return $resource('api/statess/:id', {}, Mentoring.resourceHandler);
}]).factory('EvaluationsAllEmployees', ['$resource', function ($resource) {
	return $resource('api/allEvaluations/:employeeId/', {}, Mentoring.resourceHandler);
}]).factory('EvaluationsCn', ['$resource', function ($resource) {
	return $resource('api/autoevaluation/:employeeId/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('EvaluationsMandoCn', ['$resource', function ($resource) {
	return $resource('api/evaluationLeader/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('EvaluationsConsultLeader', ['$resource', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('EmployeesDIRECTOR', ['$resource', function ($resource) {
	return $resource('api/employeesDirector/:directionId', {}, Mentoring.resourceHandler);
}]).factory('LeadersDIRECTOR', ['$resource', function ($resource) {
	return $resource('api/leadersDirector/:directionId', {}, Mentoring.resourceHandler);
}]).factory('EmployeesGERENTE', ['$resource', function ($resource) {
	return $resource('api/employeesGerente/:managerId', {}, Mentoring.resourceHandler);
}]).factory('LeadersGERENTE', ['$resource', function ($resource) {
	return $resource('api/leadersGerente/:managerId', {}, Mentoring.resourceHandler);
}]).factory('EmployeesRRHH', ['$resource', function ($resource) {
	return $resource('api/employeesRrhh/:id', {}, Mentoring.resourceHandler);
}]).factory('LeadersRRHH', ['$resource', function ($resource) {
	return $resource('api/leadersRrhh/:id', {}, Mentoring.resourceHandler);
}]).factory('IsModificableService', function () {
	return {
		modificable: function modificable(account, evaluation, currentYear, IsAutoEvaluationDate, IsFinalDate, roleRRHH, roleDIRECTORG, roleADMIN) {
			/// If the current employee is the same as the evaluation's employee..
			if (account.employeeId === evaluation.employeeId) {
				var date = new Date(evaluation.creationDate);
				// Can only modify its autoevaluation if it's auto evaluation period and the autoevaluation its of the current year
				if (IsAutoEvaluationDate && evaluation.evaluationType === 'auto' && currentYear === date.getFullYear()) {
					return true;
					// If it's final evaluation or the evaluation is final, he/she cannot modify any
				} else if (IsFinalDate || evaluation.evaluationType === 'final') {
						return false;
					}
				return false;
			} else if (roleADMIN || roleDIRECTORG || roleRRHH) {
				return true;
			} else {
				// First, check if the evaluation's year is the same as the current evaluation year
				var evalDate = new Date(evaluation.creationDate);
				var evalYear = evalDate.getFullYear();
				if (evalYear !== currentYear) {
					return false;

					// Otherwise, do the usual process
				} else if (IsAutoEvaluationDate && evaluation.evaluationType == "auto") {
						return evaluation.employeeId == account.employeeId;
					} else if (IsFinalDate && evaluation.evaluationType == "final") {
						return account.employeeId == evaluation.leaderId;
					} else if (evaluation.evaluationType == "eval" && !IsFinalDate) {
						// no modificable en periodo final
						return account.employeeId == evaluation.leaderId;
					} else {
						return false;
					}
			}
		}
	};
});
//# sourceMappingURL=consult.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConsultEvaluationController($scope, $timeout, $sce, $state, $stateParams, $window, $previousState, Principal, $translate, QuestionsResource, StatesResource, AnswersResource, CompetencesResource, PillarsResource, SharingEvaluationService, EvaluationId, EmployeeIsLeaderResource, AnswersSelect, AnswersEval, isEvaluationDate, isFinalEvaluationDate, CurrentAllocation, CalculateEvaluationResult) {

	$previousState.memo('consult');
	var vm = this;
	$scope.chart;

	// Check if we come from consult state, otherwise redirect to it.
	var prevState = $previousState.get('consult');
	if (prevState.state === null) {
		$state.go('consult');
	}
	vm.evaluation = prevState.params.evaluation;
	vm.showInput = prevState.params.showInput;

	if ($state.current.name != 'login') {
		Principal.identity().then(function (account) {
			vm.account = account;

			vm.showPrint = false;
			if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles) && !Mentoring.isUndefinedOrNull(account.isLeader)) {
				vm.isLeader = account.isLeader;
				vm.employeeId = account.employeeId;
				vm.user = {
					firstName: account.firstName,
					lastName: account.lastName
				};
				vm.finalEvaluation = false;

				prepareChart();
				vm.questions = [];
				vm.states = [];
				vm.empleado = [];
				vm.competence = [];
				vm.pillar = [];
				vm.correcto = false;
				vm.evaluable = [];
				vm.consult = false;
				vm.esModificable = false;
				vm.evaluable.info = [];
				vm.destacados = [];
				vm.mejorar = [];
				vm.selected = [];
				vm.respuesta = [];

				isEvaluationDate.get(function (isDate) {
					vm.isEvaluationDate = isDate.value;
				});
				isFinalEvaluationDate.get(function (isDate) {
					vm.isFinalEvaluationDate = isDate.value;
				});

				var id = SharingEvaluationService.getId();
				var esModificable = SharingEvaluationService.getModification();

				// Check if the user can modify the evaluation type. This will be possible if the evaluation can be modified
				// and the user has one of this roles : ADMIN, DIRECTOR_GENERAL or HR.
				vm.userCanModifyType = false;
				if (esModificable && account.roles.length > 1) {
					var userRoles = account.roles;
					if (userRoles.indexOf('ROLE_ADMIN') > -1 || userRoles.indexOf('ROLE_RRHH') > -1 || userRoles.indexOf('ROLE_DIRECTORG') > -1) {
						vm.userCanModifyType = true;
						// Creates array of options for combo
						vm.evaluationTypes = [{ id: 'auto', value: $translate.instant('consult.evaluation.auto') }, { id: 'eval', value: $translate.instant('consult.evaluation.eval') }, { id: 'final', value: $translate.instant('consult.evaluation.final') }];
					}
				}

				vm.evaluadoo = SharingEvaluationService.getEvaluado();
				vm.esModificable = esModificable;

				var year_evaluation;
				if (!Mentoring.isUndefinedOrNull(vm.evaluadoo)) {
					vm.date = vm.evaluadoo.creationDate;
					year_evaluation = new Date(vm.evaluadoo.creationDate).getFullYear();
				}

				vm.getQuestionCode = function (questionCode) {
					vm.codePregunta = questionCode;
					vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
				};

				vm.evaluationId = [];

				EvaluationId.get({ id: id }, function (result) {
					if (!Mentoring.isUndefinedOrNull(result)) {
						vm.evaluationId = result;

						// Check if we need to show the print button. The first to check is if it's a final evaluation
						if (result.evaluationType === 'final') {
							// If the user has only one role and it's ROLE_USER, check whether if the employee
							// is checking his own evaluation, or if it's the actual employee's evaluator
							if (account.roles.length == 1 && account.roles.indexOf('ROLE_USER') == 0) {
								if (account.employeeId == result.employeeId) {
									vm.showPrint = true;
								} else {
									// Obtain actual employee's evaluator
									CurrentAllocation.get({ employeeId: result.employeeId }, function (res) {
										if (res.leaderId != undefined && account.employeeId === res.leaderId) {
											vm.showPrint = true;
										}
									});
								}
							} else {
								vm.showPrint = true;
							}
						}
						var finalEvaluationNum = vm.evaluationId.evaluationType;
						if (finalEvaluationNum == 'final') {
							vm.finalEvaluation = true;
						}

						EmployeeIsLeaderResource.get({ employeeId: vm.evaluationId.employeeId }, function (result2) {
							vm.isLeader = parseInt(result2[0]);
							if (!Mentoring.isUndefinedOrNull(result2[0])) {
								vm.loadAll = function () {
									StatesResource.query(function (result) {
										vm.statess = result;
									});
									CompetencesResource.query(function (result) {
										var aux = [];
										var j = 0;
										if (vm.isLeader === 0) {
											for (var i in result) {
												if (result[i].competenceCode != 'mando') {
													aux[j] = result[i];
													j++;
												}
											}
											vm.competences = aux;
										} else {
											vm.competences = result;
										}
									});
									PillarsResource.query(function (result) {
										vm.pillars = result;
										if (vm.isLeader === 0) {
											QuestionsResource.query({ id: 0 }, function (result) {
												vm.questionss = result;
											});
										} else {
											QuestionsResource.query(function (result) {
												vm.questionss = result;
											});
										}

										vm.select = function (index, idPregunta) {
											vm.selected[idPregunta] = index;
										};

										if (vm.evaluationId.employeeId == vm.evaluationId.leaderId) {
											vm.employeeId = vm.evaluationId.employeeId;
										} else {
											vm.evaluable.info.employeeId = vm.evaluationId.employeeId;
											vm.employeeId = vm.evaluationId.leaderId;
										}
										vm.observaciones = vm.evaluationId.observaciones;
										vm.observacionesEvaluador = vm.evaluationId.observacionesEvaluador;

										AnswersResource.query({ id: id }, function (result) {
											var seleccionados = [];
											for (var i in result) {
												seleccionados[result[i].questionId] = result[i].statesId;
												vm.selected[result[i].questionId] = result[i].statesId - 1;
											}
											vm.respuesta = seleccionados;
											AnswersSelect.query({ id: id }, function (result22) {
												if (result22.length > 0) {
													if (result22.length > 0) {
														vm.destacados[0] = result22[0].questionCode;
														vm.listSelect.push(vm.destacados[0]);
														vm.destacados[1] = result22[1].questionCode;
														vm.listSelect.push(vm.destacados[1]);
														vm.destacados[2] = result22[2].questionCode;
														vm.listSelect.push(vm.destacados[2]);
														vm.mejorar[0] = result22[3].questionCode;
														vm.listSelect.push(vm.mejorar[0]);
														vm.mejorar[1] = result22[4].questionCode;
														vm.listSelect.push(vm.mejorar[1]);
														vm.mejorar[2] = result22[5].questionCode;
														vm.listSelect.push(vm.mejorar[2]);
													}
												}
											});
										});
										StatesResource.query(function (result) {
											vm.statess = result;
										});
									});
								};
								vm.loadAll();
							}
						});
					}
				});

				var getEvaluationType = function getEvaluationType() {
					if (vm.userCanModifyType) {
						return;
					}
				};
				vm.submitForm = function (valido, datos, observaciones, observacionesEvaluador) {
					if (valido) {
						if (validarNoSeObserva(datos)) {
							vm.correcto = true;
							var employee, evaluationType, evaluationToSave, evaluator;
							if (Mentoring.isUndefinedOrNull(vm.evaluable.info.employeeId)) {
								employee = vm.employeeId;
								evaluationType = 'auto';

								evaluationToSave = AnswersEval.agrupar2(datos, employee, employee, observaciones, observacionesEvaluador, evaluationType, vm.isFinalEvaluationDate, id);
							} else {

								if (!(vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
									employee = vm.evaluable.info.employeeId;
								} else {
									employee = vm.evaluable.info.id;
								}
								evaluator = vm.employeeId;
								evaluationType = vm.isFinalEvaluationDate ? 'final' : 'eval';

								evaluationToSave = AnswersEval.agrupar2(datos, evaluator, employee, observaciones, observacionesEvaluador, evaluationType, vm.isFinalEvaluationDate, id);
							}
							// If the user can modify the evaluation type, override it
							if (vm.userCanModifyType) {
								evaluationToSave.evaluationType = vm.evaluation.evaluationType;
							}

							var numDes = 1;
							var numMej = 4;
							var answer = AnswersEval.agrupar(datos, 0, vm.isFinalEvaluationDate);
							var answerOutstanding = AnswersEval.agrupar3(0, numDes, vm.destacados, vm.isFinalEvaluationDate);
							var answerImprovable = AnswersEval.agrupar3(0, numMej, vm.mejorar, vm.isFinalEvaluationDate);

							var obj = {
								evaluation: evaluationToSave,
								answers: answer,
								outstanding: answerOutstanding,
								improvable: answerImprovable
							};
							vm.disableButton = true;
							//despues de guardar la evaluacion y recuperar el id , se guardan y se relacionan sus respuestas	     		
							AnswersEval.guardar2(obj).then(function (obj) {
								var msgModal = '';
								if (obj.data.msg == 'save.evaluation.no.mark') {
									msgModal = 'guardarCorrectoNoNota';
								} else {
									msgModal = 'guardarCorrecto';
								}
								vm.Modal = {
									msg: msgModal,
									title: 'consult.modal.ok.title',
									button: 'consult.modal.ok',
									action: function action() {
										$('#myModal').on('hidden.bs.modal', function () {
											$('#myModal').unbind('hidden.bs.modal');
											$stateParams.empleado = vm.employeeId;
											$state.go('consult');
										});
										$('#myModal').modal('hide');
									}
								};
								$('#myModal').modal('show');
							}, function (err) {
								var msg = err.data.msg || 'guardarFalla';
								vm.Modal = {
									msg: msg,
									title: 'consult.modal.error.title',
									button: 'consult.modal.ok',
									action: function action() {
										$('#myModal').modal('hide');
									}
								};
								$('#myModal').modal('show');
								vm.disableButton = false;
							});
						}
					} else {
						vm.Modal = {
							msg: 'guardarNoSeObserva',
							title: 'consult.modal.error.title',
							button: 'consult.modal.ok',
							action: function action() {
								$('#myModal').modal('hide');
							}
						};
						$('#myModal').modal('show');
						vm.disableButton = false;
					}
				};

				vm.listSelect = [];
				vm.add = function () {
					vm.listSelect = [];
					for (var i = 0; i < 3; i++) {
						if (!Mentoring.isUndefinedOrNull(vm.destacados[i])) {
							vm.listSelect.push(vm.destacados[i]);
						}
						if (!Mentoring.isUndefinedOrNull(vm.mejorar[i])) {
							vm.listSelect.push(vm.mejorar[i]);
						}
					}
				};
			}
			if ($state.current.name != 'login') {
				vm.isAuthenticated = Principal.isAuthenticated();
			}
		});
	}

	var prepareChart = function prepareChart() {
		$scope.options = {
			responsive: true,
			scaleShowLine: true,
			scaleOverride: true,
			scaleSteps: 5,
			scaleStepWidth: 20,
			scaleStartValue: 0,
			angleShowLineOut: true,
			scaleBeginAtZero: true,
			angleLineColor: 'rgba(0,0,0,.1)',
			angleLineWidth: 1,
			pointLabelFontFamily: '"Arial"',
			pointLabelFontStyle: 'normal',
			pointLabelFontSize: 10,
			pointLabelFontColor: '#666',
			pointDot: true,
			pointDotRadius: 3,
			pointDotStrokeWidth: 1,
			pointHitDetectionRadius: 20,
			datasetStroke: true,
			datasetStrokeWidth: 2,
			datasetFill: true,
			legend: {
				display: false
			}
		};

		// If there is evaluation result coming from the server, typical case
		if (vm.evaluation.evaluationResult) {
			handleEvaluationResult(vm.evaluation.evaluationResult);
		} else {
			// If not, case when the evaluation results weren't saved into db
			CalculateEvaluationResult.get({
				employeeId: vm.evaluadoo.employeeId,
				evaluationId: vm.evaluadoo.id,
				year: year_evaluation
			}, handleEvaluationResult);
		}
	};

	var handleEvaluationResult = function handleEvaluationResult(result) {
		var labelsCompetences = null;
		var dataCompetences = null;

		if (result.resultCompetences.length == 3) {
			labelsCompetences = ['Talent', 'Attitude', 'Business', 'Talent/Attitude', 'Business', 'VASS'];
			var compByPillarScore_0 = result.resultCompetences[0].scoreByPillar;
			var compByPillarScore_1 = result.resultCompetences[1].scoreByPillar;
			var compByPillarScore_2 = result.resultCompetences[2].scoreByPillar;
			dataCompetences = [compByPillarScore_0[1], compByPillarScore_0[2], compByPillarScore_0[3], compByPillarScore_1[4], compByPillarScore_1[5], compByPillarScore_2[6]];
		} else if (result.resultCompetences.length == 2) {
			labelsCompetences = ['Talent', 'Attitude', 'Business', 'VASS'];
			var compByPillarScore_0 = result.resultCompetences[0].scoreByPillar;
			var compByPillarScore_1 = result.resultCompetences[1].scoreByPillar;
			dataCompetences = [compByPillarScore_0[1], compByPillarScore_0[2], compByPillarScore_0[3], compByPillarScore_1[6]];
		}

		// Chart.js Data
		$scope.data = {
			update: false,
			labels: labelsCompetences,
			datasets: [{
				fillColor: 'rgba(151,187,205,0.2)',
				strokeColor: 'rgba(151,187,205,1)',
				pointColor: 'rgba(151,187,205,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: dataCompetences
			}]
		};
		vm.noteEvaluation = result.note;
	};

	var validarNoSeObserva = function validarNoSeObserva(datos) {
		var pillars = '';
		var pillar;
		for (var i in datos) {
			if (datos[i] === 6) {
				pillar = getPillar('preg' + i);
				// Comprobamos si existe el pillar
				if (pillar !== 0) {
					if (pillars.indexOf(pillar) < 0) {
						pillars += pillar;
					} else {
						return false;
					}
				}
			}
		}
		return true;
	};

	var getPillar = function getPillar(questionId) {
		var questions = vm.questionss;
		if (!Mentoring.isUndefinedOrNull(questions)) {
			for (var i = 0, len = questions.length; i < len; i++) {
				if (questions[i].questionsCode === questionId) {
					return questions[i].pillarId;
				}
			}
		}
		return 0;
	};

	vm.printEvaluation = function () {
		var loc = window.location;
		var printUrl = loc.origin + loc.pathname;
		printUrl = 'api/evaluation/evaluation.pdf?evaluationId=' + vm.evaluationId.id;
		window.open(printUrl);
	};

	// Check if the chartdiv is on scroll, to fire resize event.
	// It's the only way to repaint the chart...
	$(window).on('scroll', function (el, callback) {
		if ($(window).scrollTop() + window.innerHeight >= $('canvas').offset().top - $('canvas').innerHeight()) {
			window.dispatchEvent(new Event('resize'));
			// Once the event has been fired, it's not necessary anymore
			$(window).unbind('scroll');
		}
	});
}
angular.module('mentoringApp').controller('ConsultEvaluationController', ConsultEvaluationController);
//# sourceMappingURL=consultEvaluation.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('EmpleadosAE', ['$resource', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('SharingEvaluationService', function () {
	return {
		setId: function setId(id) {
			this.id = id;
		},
		getId: function getId() {
			return this.id;
		},
		setModification: function setModification(esModificable) {
			this.esModificable = esModificable;
		},
		getModification: function getModification() {
			return this.esModificable;
		},
		setEvaluado: function setEvaluado(evaluado) {
			this.evaluado = evaluado;
		},
		getEvaluado: function getEvaluado() {
			return this.evaluado;
		}
	};
});
//# sourceMappingURL=consultEvaluation.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConsultEvaluationAutoevaluationController($scope, $timeout, $state, $q, $sce, $translate, StatesResource, CompetencesResource, PillarsResource, QuestionsResource, AnswersResource, AnswersSelect, Principal, EvaluationsCn, EmpleadosCn, EvaluationsMandoCn, EvaluationsConsultLeader, AllocationsLeader, EmployeeEvaluableIdResource, EmployeeLeaderResource, EmployeesDIRECTOR, LeadersDIRECTOR, EmployeesGERENTE, ConsultEvaluationAutoevaluationService, LeadersGERENTE, EmployeesRRHH, LeadersRRHH, IsModificableService) {

    var vm = this;

    // Populate years combo
    vm.years = [];
    var currentYear = new Date().getFullYear();
    for (var firstYear = 2015; firstYear <= currentYear; firstYear++) {
        vm.years.push(firstYear);
    }

    if ($state.current.name != 'login') {
        Principal.identity().then(function (account) {
            // Activamos la opción de menú Consulta de Evaluación
            $scope.$root.activeOption = "consult";
            vm.account = account;
            vm.user = {
                firstName: account.firstName,
                lastName: account.lastName
            };
            vm.esModificable = true;

            if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles)) {
                vm.leader = {};
                vm.evaluation = {};
                vm.empleado = {};
                vm.empleadoLeaderUser = {};
                vm.isLeader = account.isLeader;
                vm.roleUSER = account.roles.indexOf('ROLE_USER') > -1;
                vm.roleRRHH = account.roles.indexOf('ROLE_RRHH') > -1;
                vm.roleGERENTE = account.roles.indexOf('ROLE_GERENTE') > -1;
                vm.roleDIRECTOR = account.roles.indexOf('ROLE_DIRECTOR') > -1;
                vm.roleDIRECTORG = account.roles.indexOf('ROLE_DIRECTORG') > -1;
                vm.roleADMIN = account.roles.indexOf('ROLE_ADMIN') > -1;

                // Handle the visibility permissions
                if (vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
                    vm.isVisibleMando = true;
                } else if (vm.isLeader) {
                    vm.isVisibleLeader = true;
                }

                if (vm.roleUSER && !(vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
                    if (vm.isLeader === 0) {
                        vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                            leaderId: account.employeeId
                        });
                    } else {
                        vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                            leaderId: account.employeeId
                        });
                    }
                    vm.esModificable = false;
                }

                if (vm.roleADMIN || vm.roleDIRECTORG) {
                    var promises = [];
                    promises.push(EmployeeEvaluableIdResource.query({}, function (result) {
                        vm.empleados = result;
                    }).$promise);
                    promises.push(EmployeeLeaderResource.query({}, function (result) {
                        vm.leaders = result;
                    }).$promise);

                    // Once all the request have finished, do the combo selection
                    $q.all(promises).then(function () {
                        // If there is a selected employee, only when we come back for consultEvaluation state
                        if (vm.empleado.info) {
                            vm.change(vm.empleado.info.id);
                        }
                    });
                }

                if (vm.roleDIRECTOR) {
                    vm.empleados = EmployeesDIRECTOR.query({
                        directionId: account.employeeId
                    });
                    vm.leaders = LeadersDIRECTOR.query({
                        directionId: account.employeeId
                    });
                    vm.esModificable = false;
                }

                if (vm.roleGERENTE) {
                    vm.empleados = EmployeesGERENTE.query({
                        managerId: account.employeeId
                    });
                    vm.leaders = LeadersGERENTE.query({
                        managerId: account.employeeId
                    });
                }

                if (vm.roleRRHH) {
                    EmployeesRRHH.query(function (result4) {
                        vm.empleados = result4;
                        //busca y recupera el propio usuario para añadirlo a la lista de empleados
                        //los empleados con rol rrhh no ven a los otros de rrhh y asi puede verse a si mismo
                        EmpleadosCn.query({
                            employeeId: account.employeeId
                        }, function (result) {
                            angular.forEach(result, function (current) {
                                if (current.id == account.employeeId) {
                                    vm.empleados.push(current);
                                }
                            });
                        });
                    });
                    LeadersRRHH.query(function (result5) {
                        vm.leaders = result5;
                    });
                }
            }
            if ($state.current.name !== 'login') {
                vm.isAuthenticated = Principal.isAuthenticated();
            }
        });
    }

    vm.isEvaluador = function (evaluacion) {
        return evaluacion.leaderId == vm.account.employeeId;
    };

    vm.modificable = function (evaluacion) {
        return IsModificableService.modificable(vm.account, evaluacion, vm.isEvaluationDate, vm.isFinalEvaluationDate, vm.roleRRHH, vm.roleDIRECTORG, vm.roleADMIN);
    };

    // Get the employee self evaluation and his/her final evaluation.
    vm.getEvaluationsEmployee = function (employeeId) {
        if (!Mentoring.isUndefinedOrNull(employeeId)) {
            vm.autoEvaluation = null;
            vm.finalEvaluation = null;

            if (Mentoring.isUndefinedOrNull(vm.year)) {
                vm.year = vm.years[vm.years.length - 1];
            }
            // Get employee evaluations
            ConsultEvaluationAutoevaluationService.get({ employeeId: employeeId, year: vm.year }, function (result) {
                // If there is no auto evaluation or no autoevaluation
                if (result.finalEvaluation === null || result.autoEvaluation === null) {
                    var msg = result.finalEvaluation == null ? 'consult.evalauto.modal.final.evaluation.error' : 'consult.evalauto.modal.auto.evaluation.error';
                    vm.Modal = {
                        msg: msg,
                        title: 'consult.evalauto.modal.error.title',
                        button: 'consult.evalauto.modal.ok',
                        action: function action() {
                            $('#myModal').modal('hide');
                        }
                    };
                    $('#myModal').modal('show');
                    return;
                }

                vm.metadata = {};
                vm.autoEvaluation = {
                    respuesta: [], destacados: [], mejorar: [], listSelect: []
                };
                vm.finalEvaluation = {
                    respuesta: [], destacados: [], mejorar: [], listSelect: []
                };

                var finalEv = result.finalEvaluation;
                var autoEv = result.autoEvaluation;
                $translate('consult.evalauto.evaluation.' + autoEv.evaluationType).then(function (value) {
                    vm.metadata.autoEvaluation = {
                        creationDate: autoEv.creationDate,
                        employeeName: autoEv.employee.firstSurname + ' ' + autoEv.employee.secondSurname + ', ' + autoEv.employee.name,
                        leaderName: autoEv.leader.firstSurname + ' ' + autoEv.leader.secondSurname + ', ' + autoEv.leader.name,
                        evaluationType: value
                    };
                });
                $translate('consult.evalauto.evaluation.' + finalEv.evaluationType).then(function (value) {
                    vm.metadata.finalEvaluation = {
                        creationDate: finalEv.creationDate,
                        employeeName: finalEv.employee.firstSurname + ' ' + finalEv.employee.secondSurname + ', ' + finalEv.employee.name,
                        leaderName: finalEv.leader.firstSurname + ' ' + finalEv.leader.secondSurname + ', ' + finalEv.leader.name,
                        evaluationType: value
                    };
                });

                CompetencesResource.query({}, function (result) {
                    vm.competences = result;
                });
                PillarsResource.query(function (result) {
                    vm.pillars = result;
                });

                var promise = undefined;
                if (vm.isLeader === 0) {
                    promise = QuestionsResource.query({ leader: 0 }, function (result) {
                        vm.questionss = result;
                    }).$promise;
                } else {
                    promise = QuestionsResource.query(function (result) {
                        vm.questionss = result;
                    }).$promise;
                }
                promise.then(function () {
                    handleAnswersResponse(result.autoEvaluation.id, vm.autoEvaluation, result.weightQuestions);
                    handleAnswersResponse(result.finalEvaluation.id, vm.finalEvaluation, result.weightQuestions);
                });
            }, function (err) {
                var msg = err.data.msg || 'consult.evalauto.modal.error';
                vm.Modal = {
                    msg: msg,
                    title: 'consult.evalauto.modal.error.title',
                    button: 'consult.evalauto.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                $('#myModal').modal('show');
                return;
            });
        }
    };

    // Handles the changes on the evaluator combo
    vm.changeEvaluator = function (leaderId) {
        vm.autoEvaluation = null;
        vm.finalEvaluation = null;
        if (Mentoring.isUndefinedOrNull(vm.empleadosCopy)) {
            vm.empleadosCopy = angular.copy(vm.empleados);
        }
        if (Mentoring.isUndefinedOrNull(leaderId)) {
            vm.empleados = vm.empleadosCopy;
        } else {
            AllocationsLeader.query({ leaderId: leaderId }, function (result) {
                var emps = [];
                for (var i = 0, len = result.length; i < len; i++) {
                    emps.push(result[i].employeeId);
                }
                vm.empleados = vm.empleadosCopy.filter(function (emp) {
                    return emps.indexOf(emp.id) >= 0;
                });
            });
        }
    };

    // Handles the changes on the years combo
    vm.changeYear = function () {
        // Only do something if the others combos have value.
        if (!Mentoring.isUndefinedOrNull(vm.empleado.info) && !Mentoring.isUndefinedOrNull(vm.leader.info)) {
            vm.getEvaluationsEmployee(vm.empleado.info.id);
        }
    };

    var handleAnswersResponse = function handleAnswersResponse(id, evaluation, weightQuestions) {
        var promises = [];
        // Obtains the evaluation answers
        promises.push(AnswersResource.query({ id: id }, function (result) {
            var seleccionados = [];
            var competences = { 1: false, 2: false, 3: false };

            var _loop = function (a, len) {
                var item = result[a];

                // Obtains the question relative to the answer
                var question = vm.questionss.filter(function (q) {
                    return q.id == item.questionId;
                });

                // Adds the competenceId to the map
                competences[question[0].competenceId] = true;

                // Creates the answer object containing the question code, competence, pillar and value
                var sel = {
                    'class': '',
                    questionId: question[0].questionsCode,
                    pillarId: question[0].pillarId,
                    value: item.statesId,
                    competenceId: question[0].competenceId
                };
                seleccionados[a] = sel;
            };

            for (var a = 0, len = result.length; a < len; a++) {
                _loop(a, len);
            }

            // Now trim the competence array to show only the competences which apply
            var competencesTrim = [];
            for (var o = 0, len = vm.competences.length; o < len; o++) {
                var item = vm.competences[o];
                if (competences[item.competenceId]) {
                    competencesTrim.push(item);
                }
            }
            vm.competences = competencesTrim;

            evaluation.respuesta = seleccionados;
        }).$promise);

        promises.push(AnswersSelect.query({ id: id }, function (result22) {
            if (result22.length > 0) {
                evaluation.destacados = [result22[0].questionCode, result22[1].questionCode, result22[2].questionCode];

                evaluation.mejorar = [result22[3].questionCode, result22[4].questionCode, result22[5].questionCode];

                evaluation.listSelect = [evaluation.destacados[0], evaluation.destacados[1], evaluation.destacados[2], evaluation.mejorar[0], evaluation.mejorar[1], evaluation.mejorar[2]];
            }
        }).$promise);

        $q.all(promises).then(function () {
            var _loop2 = function (a, l) {
                var item = evaluation.respuesta[a];

                // First obtains the question weight
                var weightQuestion = weightQuestions.filter(function (wq) {
                    return wq.question.questionsCode === item.questionId;
                });
                var wq = weightQuestion[0];

                // If the current competence, is key and is on the competences to improve and the score is medium-low,
                // mark the competence as critical
                if (item.value <= 3 && wq.value === 5) {
                    if (evaluation.mejorar.indexOf(item.questionId) > -1) {
                        item['class'] = 'critical';
                    }
                }

                // If there are no colour yet, search the question weight to obtain its colour.
                if (item['class'] === '') {
                    switch (wq.value) {
                        case 3:
                            item['class'] = 'medium';break;
                        case 5:
                            item['class'] = 'high';break;
                    }
                }

                // Finally, get the item translation
                var key = 'Estado' + item.value;
                item.label = $translate.instant(key);
            };

            for (var a = 0, l = evaluation.respuesta.length; a < l; a++) {
                _loop2(a, l);
            }
        });
    };

    vm.getQuestionCode = function (questionCode) {
        vm.codePregunta = questionCode;
        vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
    };
}
angular.module('mentoringApp').controller('ConsultEvaluationAutoevaluationController', ConsultEvaluationAutoevaluationController);
//# sourceMappingURL=consultEvaluationAutoevaluation.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('ConsultEvaluationAutoevaluationService', ['$resource', function ($resource) {
	return $resource('api/consultEvaluationAutoevaluation/:employeeId/:year', {}, Mentoring.resourceHandler);
}]);
//# sourceMappingURL=consultEvaluationAutoevaluation.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('error', {
        parent: 'site',
        url: '/error',
        data: {
            roles: [],
            pageTitle: 'errors.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/error/error.html'
            },
            'header@': {
                templateUrl: 'scripts/components/header/header.html'
            }
        },
        resolve: {
            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('error');
                return $translate.refresh();
            }]
        }
    }).state('unauthorized', {
        parent: 'site',
        url: '/unauthorized',
        data: {
            roles: [],
            pageTitle: 'errors.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/error/unauthorized.html'
            },
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('error');
                return $translate.refresh();
            }]
        }
    }).state('notfound', {
        parent: 'site',
        url: '/notfound',
        data: {
            roles: [],
            pageTitle: 'errors.title'
        },
        views: {
            'content@': {
                templateUrl: 'scripts/error/notfound.html'
            },
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('error');
                return $translate.refresh();
            }]
        }
    }).state('accessdenied', {
        parent: 'site',
        url: '/accessdenied',
        data: {
            roles: []
        },
        views: {
            'content@': {
                templateUrl: 'scripts/error/accessdenied.html'
            },
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('error');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=error.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';

angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
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
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
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
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
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
            'header@': {
                templateUrl: 'scripts/components/header/header.html',
                controller: 'HeaderController'
            }
        },
        resolve: {
            translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('evaluationAll');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=evaluation.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function EvaluationController($rootScope, $sce, $state, Principal, $translate, QuestionsResource, LastEvaluationAssigned, GetLastAutoEvalByEmployeeId, LastEvaluationAssignedWithEvalType, StatesResource, AnswersSelect, AnswersEval, EmpleadosEvaluables, EvaluationEmployeeLeaderResource, AnswersResource, EmpleadosAE, EmployeeEvaluationResource, CompetencesResource, PillarsResource, isEvaluationDate, isFinalEvaluationDate, EmployeeIsLeaderResource, EmployeesRRHH, EmpleadosCn, EmployeesDIRECTOR, PrintService) {

	var vm = this;
	var idToModify; //en caso de que en el alta se cargue una evaluacion existente, se almacenara su id por si se quiere modificar.

	// Comprobamos si el estado es diferente al login
	if ($state.current.name != 'login') {

		vm.questions = [];vm.states = [];vm.empleado = {};vm.competence = [];vm.pillar = [];
		vm.evaluable = {};vm.destacados = [];vm.mejorar = [];vm.selected = [];vm.respuesta = [];

		Principal.identity().then(function (account) {
			// Activamos la opción de menú Alta de Evaluación
			$rootScope.activeOption = "evaluation";
			// Recuperamos la información del usuario
			vm.account = account;
			// Asignamos los permisos del usuario a partir de su role.
			if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles) && !Mentoring.isUndefinedOrNull(account.isLeader)) {

				vm.isLeader = account.isLeader;
				vm.employeeId = account.employeeId;
				//permite al usuario dar de alta una evaluacion
				vm.evaluableByUser = account.isLeader == 1 || account.roles.indexOf('ROLE_RRHH') > -1 || account.roles.indexOf('ROLE_DIRECTORG') > -1 ? true : false;
				vm.user = {
					firstName: account.firstName,
					lastName: account.lastName
				};
				vm.roleDIRECTOR = account.roles.indexOf('ROLE_DIRECTOR') > -1;
				vm.roleDIRECTORG = account.roles.indexOf('ROLE_DIRECTORG') > -1;
				vm.roleGERENTE = account.roles.indexOf('ROLE_GERENTE') > -1;
				vm.roleADMIN = account.roles.indexOf('ROLE_ADMIN') > -1;
				vm.roleRRHH = account.roles.indexOf('ROLE_RRHH') > -1;
				vm.isEvaluation = false;

				// El usuario puede autoevaluarse en funcion de su rol
				vm.isAutoEvaluation = vm.roleDIRECTOR || vm.roleGERENTE || vm.roleDIRECTORG ? false : true;
				vm.listSelect = [];

				// Chart.js Data
				vm.data = {
					labels: ['Gestión: Talent', 'Gestión: Attitude', 'Gestión: Business', 'Mando: Talent Attitude', 'Mando: Business', 'VASS'],
					datasets: [{
						label: 'Evaluación', fillColor: 'rgba(151,187,205,0.2)', strokeColor: 'rgba(151,187,205,1)',
						pointColor: 'rgba(151,187,205,1)', pointStrokeColor: '#fff', pointHighlightFill: '#fff',
						pointHighlightStroke: 'rgba(220,220,220,1)', data: [70, 88, 87, 70, 75, 85]
					}]
				};

				// Chart.js Options
				vm.options = {
					responsive: true, scaleShowLine: true, angleShowLineOut: true, scaleShowLabels: false,
					scaleBeginAtZero: true, angleLineColor: 'rgba(0,0,0,.1)', angleLineWidth: 1, pointLabelFontFamily: '"Arial"',
					pointLabelFontStyle: 'normal', pointLabelFontSize: 10, pointLabelFontColor: '#666', pointDot: true,
					pointDotRadius: 3, pointDotStrokeWidth: 1, pointHitDetectionRadius: 20,
					datasetStroke: true, datasetStrokeWidth: 2, datasetFill: true,
					legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
				};

				// Recuperamos si estamos o no en periodo de evaluacion
				isEvaluationDate.get(function (isDate) {
					vm.isEvaluationDate = isDate.value;
				});

				// Recuperamos si estamos en evaluacion final o no
				isFinalEvaluationDate.get(function (isDate) {
					vm.isFinalEvaluationDate = isDate.value;
					populateAndShowEvaluations();
				});

				var populateAndShowEvaluations = function populateAndShowEvaluations() {
					var classStr = 'panel panel-info evaluacion_forms';
					// if the employee is admin, hr, general director or leader
					if ($rootScope.roleRRHH || account.isLeader == 1) {
						vm.empleado = [];
						// If the employee is leader
						if (!(vm.roleDIRECTORG || vm.roleADMIN || vm.roleDIRECTOR)) {
							EmpleadosAE.query({ leaderId: vm.employeeId }, function (result) {
								// If it's not final evaluation period, add the employee itself to the list
								// so he can do his own self assessment
								if (!vm.isFinalEvaluation && vm.isEvaluationDate) {
									result.splice(0, 0, {
										id: vm.account.employeeId,
										employeeId: vm.account.employeeId,
										firstSurnameEmployee: vm.account.lastName,
										nameEmployee: vm.account.firstName
									});
								}
								vm.evaluables = result;
								if (vm.isEvaluationDate) {
									vm.classEval = classStr;
								}
							});
						}
						if (vm.roleDIRECTORG || vm.roleADMIN) {
							EmpleadosEvaluables.query({ leaderId: vm.employeeId }, function (result) {
								// If we are in final evaluation period, the DIRECTORG nor the ADMIN can't evaluate themselves
								if (vm.isFinalEvaluation) {
									vm.evaluables = result.filter(function (e) {
										return e.id != vm.account.employeeId;
									});
								} else {
									vm.evaluables = result;
								}
							});
						}
						if (vm.roleRRHH) {
							EmployeesRRHH.query(function (result) {
								// If it's not final evaluation period, add the employee itself to the list
								// so he can do his own self assessment
								if (!vm.isFinalEvaluation && vm.isEvaluationDate) {
									result.splice(0, 0, {
										id: vm.account.employeeId,
										employeeId: vm.account.employeeId,
										firstSurname: vm.account.lastName,
										name: vm.account.firstName
									});
								}
								vm.evaluables = result;
							});
						}
						if (vm.roleDIRECTOR) {
							EmployeesDIRECTOR.query({ directionId: account.employeeId }, function (res) {
								// If we are in final evaluation period, the DIRECTOR nor the ADMIN can't evaluate himself
								if (vm.isFinalEvaluation) {
									vm.evaluables = res.filter(function (e) {
										return e.id != vm.account.employeeId;
									});
								} else {
									vm.evaluables = res;
								}
							});
						}
					} else {
						if (vm.isEvaluationDate) {
							vm.classEval = classStr;
						} else {
							vm.classEval = classStr;
						}
					}

					vm.isFinalEvaluation = vm.isFinalEvaluationDate;
					vm.classEval = vm.isFinalEvaluation ? classStr + ' final' : classStr;

					// Consultamos los valores para cargar las preguntas y respuestas
					vm.msgModal = 'incorrecto';
					vm.loadAll();

					// En periodo de autoevaluacion renderizamos la ultima, si la hay
					// Chequeamos la evaluacion final tb pq esta prevalece siempre
					if (!(vm.roleDIRECTORG || vm.roleDIRECTOR || vm.roleADMIN || vm.roleRRHH) && !vm.isFinalEvaluation && vm.isEvaluationDate) {
						getAndRenderLastEvaluation(vm.employeeId, vm.employeeId, 'auto');

						GetLastAutoEvalByEmployeeId.query({ employeeId: vm.employeeId }, function (result) {
							if (result.length > 0) {
								idToModify = result[0].id;
								vm.observaciones = result[0].observations;
								var codigoResp = result[0].id;
								if (codigoResp != undefined) {
									AnswersResource.query({ id: codigoResp }, answersResourceCb);
									AnswersSelect.query({ id: codigoResp }, function (result22) {
										if (result22.length > 0) {
											vm.destacados[0] = result22[0].questionCode;
											vm.destacados[1] = result22[1].questionCode;
											vm.destacados[2] = result22[2].questionCode;
											vm.mejorar[0] = result22[3].questionCode;
											vm.mejorar[1] = result22[4].questionCode;
											vm.mejorar[2] = result22[5].questionCode;
										}
									});
								}
							}
						});
					}

					// Comprobamos si el usuario está autenticado.
					if ($state.current.name != 'login') {
						vm.isAuthenticated = Principal.isAuthenticated();
					}
				};
			}
		});
	}

	vm.showEvaluatorInput = function () {
		var showInput = true;
		// Leaders, HR, Managers, Directors and Admin can see this input.
		if (vm.isLeader || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
			showInput = true;
		}
		// Only case when the user cant see the input is when the user is the evaluated employee.
		if (vm.evaluable.info == null || vm.evaluable.info.id == vm.account.employeeId) {
			showInput = false;
		}
		return showInput;
	};

	/* Muestra o no el formulario de auto evaluacion */
	vm.showEvaluationForm = function () {
		return vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH || vm.isLeader || vm.isEvaluationDate;
	};

	vm.getQuestionCode = function (questionCode) {
		vm.codePregunta = questionCode;
		vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
	};

	// Función para cargar los valores del controlador
	vm.loadAll = function () {
		if (Mentoring.isUndefinedOrNull(vm.evaluable.info)) {
			if (vm.isLeader === 0) {
				QuestionsResource.query({ id: 0 }, function (result) {
					vm.questionss = result;
				});
			} else {
				QuestionsResource.query(function (result) {
					vm.questionss = result;
				});
			}
		}
		CompetencesResource.query(function (result) {
			var aux = [];
			var j = 0;
			if (vm.isLeader === 0) {
				for (var aa in result) {
					if (result[aa].competenceCode != 'mando') {
						aux[j] = result[aa];
						j++;
					}
				}
				vm.competences = aux;
			} else {
				vm.competences = result;
			}
		});
		loadPillarsAndStates();
	};

	vm.select = function (index, idPregunta) {
		vm.selected[idPregunta] = index;
	};

	vm.change = function () {
		idToModify = null;
		vm.observaciones = '';
		vm.selected = [];
		vm.respuesta = [];
		vm.destacados = [];
		vm.mejorar = [];

		// Comprobamos que hay seleccionado uno (evaluamos a alguien)
		if (!Mentoring.isUndefinedOrNull(vm.evaluable.info)) {
			// Pondremos las preguntas en funcion de si el evaluado es o no lider
			EmployeeIsLeaderResource.get({ employeeId: vm.evaluable.info.employeeId || vm.evaluable.info.id }, function (isLeaderResult) {
				buildQuestions4Evaluation(parseInt(isLeaderResult[0]));
				// Solo recuperamos en caso de autoevaluaciones o evaluaciones finales
				if (vm.isFinalEvaluationDate || vm.isEvaluationDate) {
					var employeeId = vm.evaluable.info.employeeId || vm.evaluable.info.id;
					getAndRenderLastEvaluation(employeeId, vm.employeeId, getEvaluationType());
				}
			});
		}
	};

	function getEvaluationType() {
		var result = 'eval';

		if (vm.isFinalEvaluationDate) {
			result = 'final';
		} else if (vm.isEvaluationDate) {
			result = 'auto';
		}
		return result;
	}

	// creo que no esta bien, hace consulta de las evaluaciones (empleado, lider) y renderiza la primera posicion del resultado
	function heredado(employeeIdVal, leaderIdVal) {
		EvaluationEmployeeLeaderResource.query({ employeeId: employeeIdVal, leaderId: leaderIdVal }, function (result) {
			if (result.length > 0) {
				idToModify = result[0].id;
				var codigoResp = result[0].id;
				var observaciones = result[0].observations;
				vm.observaciones = observaciones;
				if (!Mentoring.isUndefinedOrNull(codigoResp)) {
					getAnswersCodigo(codigoResp, true);
				}
			}
		});
	}

	function getAndRenderAllEvaluationByEmployee(employeeId) {
		EmployeeEvaluationResource.query({ employeeId: employeeId }, obtainEvaluationEmployeeCb);
	}

	function isDirectorOrDirectorGOrAdminIrRRHHRol() {
		return vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH;
	}

	function getAndRenderLastEvaluation(employeeIdVal, leaderIdVal, evaluationTypeVal) {
		LastEvaluationAssignedWithEvalType.get({
			employeeId: employeeIdVal,
			leaderId: leaderIdVal,
			evaluationType: evaluationTypeVal
		}, lastEvaluationCb);
	}

	function buildQuestions4Evaluation(isLeaderResult) {
		vm.loadAll = function () {
			if (isLeaderResult === 0) {
				QuestionsResource.query({ id: 0 }, function (result) {
					vm.questionss = result;
				});
			} else {
				QuestionsResource.query(function (result) {
					vm.questionss = result;
				});
			}
		};
		CompetencesResource.query(function (result) {
			var aux = [];
			var j = 0;
			if (isLeaderResult === 0) {
				for (var aa in result) {
					if (result[aa].competenceCode != 'mando') {
						aux[j] = result[aa];
						j++;
					}
				}
				vm.competences = aux;
			} else {
				vm.competences = result;
			}
		});
		loadPillarsAndStates();
		vm.loadAll();
	}

	/** Función que se lanza al realizar un cambio en alguno de los selectores. */
	vm.changeoLD = function (dato) {
		idToModify = undefined;
		vm.observaciones = '';
		vm.selected = [];
		vm.respuesta = [];
		vm.observaciones = '';
		vm.destacados = [];
		vm.mejorar = [];

		if (!(vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH)) {
			if (Mentoring.insUndefinedOrNull(vm.evaluable.info)) {
				vm.isAutoEvaluation = vm.isEvaluation ? true : false;
				EmployeeEvaluationResource.query({ employeeId: vm.employeeId }, obtainEvaluationEmployeeCb);
			} else {
				vm.isEvaluation = true;
				EmployeeIsLeaderResource.get({ employeeId: vm.evaluable.info.employeeId }, obtainEmployeeLeaderCb);
				LastEvaluationAssigned.get({
					employeeId: vm.evaluable.info.employeeId, leaderId: vm.employeeId
				}, lastEvaluationCb);
			}
		} else {
			if (Mentoring.insUndefinedOrNull(vm.evaluable.info)) {
				vm.isAutoEvaluation = vm.isEvaluation ? true : false;
				EmployeeEvaluationResource.query({ employeeId: vm.employeeId }, obtainEvaluationEmployeeCb);
			} else {
				vm.isEvaluation = true;
				EmployeeIsLeaderResource.get({ employeeId: vm.evaluable.info.id }, obtainEmployeeLeaderCb);
				EvaluationEmployeeLeaderResource.query({ employeeId: vm.evaluable.info.id,
					leaderId: vm.employeeId
				}, obtainEvaluationEmployeeCb);
			}
		}
	};

	var lastEvaluationCb = function lastEvaluationCb(lastEvaluation) {
		if (!Mentoring.isUndefinedOrNull(lastEvaluation)) {
			idToModify = lastEvaluation.id;
			var codigoResp = lastEvaluation.id;
			vm.observaciones = lastEvaluation.observations;
			if (!Mentoring.isUndefinedOrNull(codigoResp)) {
				getAnswersCodigo(codigoResp, true);
			}
		}
	};
	var obtainEvaluationEmployeeCb = function obtainEvaluationEmployeeCb(result) {
		if (result.length > 0) {
			idToModify = result[0].id;
			var codigoResp = result[0].id;
			vm.observaciones = result[0].observations;
			if (!Mentoring.isUndefinedOrNull(codigoResp)) {
				getAnswersCodigo(codigoResp, true);
			}
		}
	};
	var obtainEmployeeLeaderCb = function obtainEmployeeLeaderCb(result2) {
		vm.evaluadoLider = parseInt(result2[0]);
		vm.loadAll = function () {
			if (vm.evaluadoLider === 0) {
				QuestionsResource.query({ id: 0 }, function (result) {
					vm.questionss = result;
				});
			} else {
				QuestionsResource.query(function (result) {
					vm.questionss = result;
				});
			}
		};
		CompetencesResource.query(function (result) {
			var aux = [];
			var j = 0;
			if (vm.evaluadoLider === 0) {
				for (var aa in result) {
					if (result[aa].competenceCode != 'mando') {
						aux[j] = result[aa];
						j++;
					}
				}
				vm.competences = aux;
			} else {
				vm.competences = result;
			}
		});
		loadPillarsAndStates();
		vm.loadAll();
	};

	/* Loads the pillars and states */
	var loadPillarsAndStates = function loadPillarsAndStates() {
		StatesResource.query(function (result) {
			vm.statess = result;
		});
		PillarsResource.query(function (result) {
			vm.pillars = result;
		});
	};

	/** Función para enviar la evaluación. */
	vm.submitForm = function (valido, datos, observaciones) {
		observaciones = observaciones || '';
		/*if (!vm.account.isLeader && vm.roleRRHH && !vm.roleADMIN) {
  	// Dialogo de error al guardar un alta nueva siendo RRHH y no siendo leader
  	vm.msgModal = 'errorRRHHAlta';
            $('#myModalGuardado12345').modal('show');
  }*/
		// Intenta autoevaluarse alguien no evaluable
		if (Mentoring.isUndefinedOrNull(vm.evaluable.info) && !vm.account.isEvaluable) {
			vm.msgModal = 'errorNoEvaluable';
			$('#myModalGuardado12345').modal('show');
		}
		// Empleado se intenta autoevaluar cuando no es periodo de autoevaluacion
		else if (Mentoring.isUndefinedOrNull(vm.evaluable.info) && !vm.isEvaluationDate) {
				vm.msgModal = 'errorNoAutoEvaluable';
				$('#myModalGuardado12345').modal('show');
			} else if (valido) {
				if (vm.validarNoSeObserva(datos)) {
					vm.msgModal = 'correcto';
					var evaluationToSave = null;
					var evaluationType = null;
					var employee = null;

					if ((Mentoring.isUndefinedOrNull(vm.evaluable.info) || vm.evaluable.info.id === vm.employeeId) && vm.isEvaluationDate) {
						employee = vm.employeeId;
						evaluationType = 'auto';
						evaluationToSave = AnswersEval.agrupar2(datos, employee, employee, observaciones, vm.observacionesEvaluador, evaluationType, vm.isFinalEvaluationDate, idToModify);
					} else {
						if (!(vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN || vm.roleRRHH)) {
							employee = vm.evaluable.info.employeeId;
						} else {
							employee = vm.evaluable.info.id;
						}
						var evaluator = vm.employeeId;
						evaluationType = vm.isFinalEvaluationDate ? 'final' : 'eval';
						evaluationToSave = AnswersEval.agrupar2(datos, evaluator, employee, observaciones, vm.observacionesEvaluador, evaluationType, vm.isFinalEvaluationDate, idToModify);
					}
					var numDes = 1;
					var numMej = 4;

					var answer = AnswersEval.agrupar(datos, 0, vm.isFinalEvaluationDate);
					var answerOutstanding = AnswersEval.agrupar3(0, numDes, vm.destacados, vm.isFinalEvaluationDate);
					var answerImprovable = AnswersEval.agrupar3(0, numMej, vm.mejorar, vm.isFinalEvaluationDate);
					var obj = {
						evaluation: evaluationToSave,
						answers: answer,
						outstanding: answerOutstanding,
						improvable: answerImprovable
					};
					vm.disableButton = true;
					AnswersEval.guardar2(obj).then(function (obj) {
						if (obj.data.msg == 'save.evaluation.no.mark') {
							vm.msgModal = 'correctoNoNota';
						} else {
							vm.msgModal = 'correcto';
						}
						$('#myModalGuardado12345').modal({
							keyboard: false,
							backdrop: 'static',
							show: true
						});
					}, function (reason) {
						vm.msgModal = 'guardarFalla';
						$('#myModalGuardado12345').modal('show');
						PrintService.print(reason.stack);
						vm.disableButton = false;
					});
				} else {
					vm.msgModal = 'noSeObserva';
					$('#myModalGuardado12345').modal('show');
					vm.disableButton = false;
				}
			}
	};

	vm.closeDialog = function () {
		$('#myModalGuardado12345').on('hidden.bs.modal', function (e) {
			$state.go('home');
		});
		$('#myModalGuardado12345').modal('hide');
	};

	/**
 * Método que comprueba si sólo existe una respuesta "No se Observa" por pilar.
 * @param datos
 * 			Datos que ha contestado el usuario.
 * @return boolean
 * 			Booleano que indica si e
 */
	vm.validarNoSeObserva = function (datos) {
		var pillars = '';
		var pillar;
		for (var i in datos) {
			if (datos[i] === 6) {
				pillar = vm.getPillar('preg' + i);
				// Comprobamos si existe el pillar
				if (pillar !== 0) {
					if (pillars.indexOf(pillar) < 0) {
						pillars += pillar;
					} else {
						return false;
					}
				}
			}
		}
		return true;
	};

	/**
 * Método que recupera del listado de competencias el código del pilar al que pertenece a partir del código de la competencia.
 * 
 * @param questionId
 * 			Identificador de la pregunta.
 * @return pillarId 
 * 			indentificador del pilar al que pertenece la competencia
 */
	vm.getPillar = function (questionId) {
		var questions = vm.questionss;
		if (!Mentoring.isUndefinedOrNull(questions)) {
			for (var i = 0, len = questions.length; i < len; i++) {
				if (questions[i].questionsCode === questionId) {
					return questions[i].pillarId;
				}
			}
		}
		return 0;
	};

	vm.add = function () {
		vm.listSelect = [];
		for (var i = 0; i < 3; i++) {
			if (!Mentoring.isUndefinedOrNull(vm.destacados[i])) {
				vm.listSelect.push(vm.destacados[i]);
			}
			if (!Mentoring.isUndefinedOrNull(vm.mejorar[i])) {
				vm.listSelect.push(vm.mejorar[i]);
			}
		}
	};

	function getAnswersCodigo(codigoResp, push) {
		AnswersResource.query({ id: codigoResp }, answersResourceCb);

		AnswersSelect.query({ id: codigoResp }, function (result) {
			var destIndex = 0;
			var mejIndex = 0;
			for (var i = 0, len = result.length; i < len; i++) {
				if (i < 3) {
					vm.destacados[destIndex] = result[i].questionCode;
					destIndex++;
				} else {
					vm.mejorar[mejIndex] = result[i].questionCode;
					mejIndex++;
				}
				if (push) {
					vm.listSelect.push(result[i].questionCode);
				}
			}
		});
	}

	var answersResourceCb = function answersResourceCb(result) {
		vm.respuesta = [];
		for (var i in result) {
			var item = result[i];
			vm.respuesta[item.questionId] = item.statesId;
			vm.selected[item.questionId] = item.statesId - 1;
		}
	};
}
angular.module('mentoringApp').controller('EvaluationController', EvaluationController);
//# sourceMappingURL=evaluation.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';

angular.module('mentoringApp').factory('CalculateEvaluationResult', ['$resource', function ($resource) {
	return $resource('api/calculateEvaluationResult/:employeeId/:evaluationId/:year', {}, {
		'get': { method: 'GET' }
	});
}]).factory('EmpleadosAE', ['$resource', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
}]).factory('EmpleadosEvaluables', ['$resource', function ($resource) {
	return $resource('api/employeeEvaluable', {}, Mentoring.resourceHandler);
}]).factory('LastEvaluationAssigned', ['$resource', function ($resource) {
	return $resource('api/lastEvalAssigned/:employeeId/:leaderId', {}, {
		'get': { method: 'GET' }
	});
}]).factory('LastEvaluationAssignedWithEvalType', ['$resource', function ($resource) {
	return $resource('api/lastEvalAssignedWithEvalType/:employeeId/:leaderId/:evaluationType', {}, {
		'get': { method: 'GET' }
	});
}]).factory('AnswersSelect', ['$resource', function ($resource) {
	return $resource('api/answersSelect/:id', {}, Mentoring.resourceHandler);
}]).factory('EvaluationId', ['$resource', function ($resource) {
	return $resource('api/evaluationId/:id', {}, Mentoring.resourceHandler);
}]).factory('isEvaluationDate', ['$resource', function ($resource) {
	return $resource('api/isEvaluationDate', {}, Mentoring.resourceHandlerGET);
}]).factory('EvaluationYear', ['$resource', function ($resource) {
	return $resource('api/evaluationYear', {}, Mentoring.resourceHandlerGET);
}]).factory('isFinalEvaluationDate', ['$resource', function ($resource) {
	return $resource('api/isFinalEvaluationDate', {}, Mentoring.resourceHandlerGET);
}]).factory('getFinalEvaluationDate', ['$resource', function ($resource) {
	return $resource('api/isEvaluationDate', {}, {
		getDateFinalEvaluationFrom: { url: 'api/evaluationFinalDateFrom', method: 'get' },
		getDateFinalEvaluationTo: { url: 'api/evaluationFinalDateTo', method: 'get' },
		isFinalEvaluationDate: { url: 'api/isFinalEvaluationDate', method: 'get' }
	});
}]).factory('GetLastAutoEvalByEmployeeId', ['$resource', function ($resource) {
	return $resource('api/getLastAutoEvalByEmployeeId/:employeeId', {}, Mentoring.resourceHandler);
}]).factory('AnswersEval', ['$http', function ($http) {
	return {
		guardar: function guardar(datos) {
			return $http.post('api/answerss', datos, {}).success(function (response) {
				return response;
			});
		},
		guardar2: function guardar2(datos) {
			return $http.post('api/evaluation', datos, {}).success(function (response) {
				return response;
			});
		},
		guardar3: function guardar3(datos) {
			return $http.post('api/answersSelect', datos, {}).success(function (response) {
				return response;
			});
		},
		//SET ANSWERS TO SEND
		agrupar: function agrupar(datos, id, finalEvaluation) {
			var respuestaJSON = {
				id: id,
				respuestas: []
			};
			for (var i in datos) {
				if (typeof datos[i] != "undefined") {
					var element = {
						questionId: i,
						statesId: datos[i]
					};
					respuestaJSON.respuestas.push(element);
				}
			}
			//return angular.toJson(respuestaJSON);
			return respuestaJSON;
		},
		//SET EVALUATION TO SEND
		agrupar2: function agrupar2(datos, evaluator, employee, observaciones, observacionesEvaluador, evaluationType, finalEvaluation, idEvaluation) {
			// firfox undefined fix
			observaciones = observaciones || '';
			observacionesEvaluador = observacionesEvaluador || '';

			var fecha = new Date();
			var year = fecha.getFullYear();
			var idUser2 = null;
			if (finalEvaluation) {
				idUser2 = "Final-" + employee.toString() + "-" + evaluator.toString() + "-" + year.toString();
			} else {
				idUser2 = "Eval-" + employee.toString() + "-" + evaluator.toString() + "-" + year.toString();
			}
			var answerId = idUser2;
			var employeeId = employee;
			var leaderId = evaluator;
			var userAdd = evaluator;
			var respuestaJSON2 = {
				answerId: answerId,
				employeeId: employeeId,
				leaderId: leaderId,
				userAdd: userAdd,
				observaciones: observaciones,
				observacionesEvaluador: observacionesEvaluador,
				evaluationType: evaluationType
			};
			if (!Mentoring.isUndefinedOrNull(idEvaluation)) {
				respuestaJSON2.id = idEvaluation;
			}
			return respuestaJSON2;
		},
		//SET ANSWERS FROM COMBOS TO SEND
		agrupar3: function agrupar3(id, selectNum, questionCod, finalEvaluation) {
			var esFinal = 0;
			var respuestaJSONarray = [];
			if (finalEvaluation) {
				esFinal = 1;
			}
			for (var a in questionCod) {
				var respuestaJSON2 = {
					id: {
						id: id,
						selectNum: selectNum
					},
					questionCode: questionCod[a]
				};
				selectNum++;
				respuestaJSONarray.push(respuestaJSON2);
			}
			return respuestaJSONarray;
		}
	};
}]).factory('SharingEvaluationService', function () {
	this.id = null;
	this.esModifiable = null;
	this.evaluado = null;

	var getId = function getId() {
		return this.id;
	};
	var setId = function setId(id) {
		this.id = id;
	};

	return {
		setId: setId,
		getId: getId,
		setModification: function setModification(esModificable) {
			this.esModificable = esModificable;
		},
		getModification: function getModification() {
			return this.esModificable;
		},
		getEvaluado: function getEvaluado() {
			return this.evaluado;
		},
		setEvaluado: function setEvaluado(evaluado) {
			this.evaluado = evaluado;
		}
	};
});
//# sourceMappingURL=evaluation.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring, dato*/
'use strict';
/*@ngInject*/
function EvaluationleaderController(QuestionsResource, StatesResource, AnswersResourceEL, AnswersResource, Empleados, EmployeeEvaluationResource, CompetencesResource, PillarsResource) {

    var vm = this;
    vm.states = [];
    vm.empleado = [];
    vm.question = [];
    vm.competence = [];
    vm.pillar = [];

    vm.loadAll = function () {
        QuestionsResource.query(function (result) {
            vm.questionss = result;
        });
        StatesResource.query(function (result) {
            vm.statess = result;
        });
        CompetencesResource.query(function (result) {
            vm.competences = result;
        });
        PillarsResource.query(function (result) {
            vm.pillars = result;
        });
    };
    vm.loadAll();

    vm.empleado = [];
    vm.empleados = [];
    vm.mando = [];
    vm.mandos = [];
    Empleados.query(function (result) {
        var empleados = [];
        var mandos = [];
        var k = 0;
        var j = 0;
        for (var i in result) {
            if (result[i].leaderId == dato) {
                empleados[k] = result[i];
                k++;
            }
            if (result[i].leader == 1) {
                mandos[j] = result[i];
                j++;
            }
        }
        vm.empleados = empleados;
        vm.mandos = mandos;
    });

    vm.changeMando = function (dato) {
        vm.loadAll();
        vm.empleado = [];
        vm.empleados = [];
        var empleados = [];
        Empleados.query(function (result) {
            var k = 0;
            for (var i in result) {
                if (result[i].leaderId == dato.employeeId) {
                    empleados[k] = result[i];
                    k++;
                }
            }
            vm.empleados = empleados;
        });
    };

    vm.change = function (dato) {
        vm.loadAll();

        vm.submitForm = function (datos, observaciones) {
            var usuario = dato.employeeId;
            var leader = vm.mando.employeeId;
            var respuestaJSON = AnswersResourceEL.agrupar(datos, usuario);
            AnswersResourceEL.guardar(respuestaJSON);

            var respuestaJSON2 = AnswersResourceEL.agrupar2(datos, usuario, observaciones, leader);
            AnswersResourceEL.guardar2(respuestaJSON2);
        };

        vm.respuesta = [];
        vm.observaciones = "Escriba aquí las observaciones";

        EmployeeEvaluationResource.query({ employeeId: dato.employeeId }, function (result) {
            var observaciones = null;
            var codigoResp = null;
            for (var j in result) {
                if (result[j].leaderId == vm.mando.employeeId.employeeId) {
                    codigoResp = result[j].answerId;
                    observaciones = result[j].observaciones;
                }
            }

            vm.observaciones = observaciones;
            if (codigoResp !== undefined) {
                AnswersResource.query({ id: codigoResp }, function (result) {
                    var seleccionados = [];
                    for (var i in result) {
                        seleccionados[result[i].questionId] = result[i].statesId;
                    }
                    vm.respuesta = seleccionados;
                });
            }
            vm.observaciones = result[0].observaciones;
        });
    };
}
angular.module('mentoringApp').controller('EvaluationleaderController', EvaluationleaderController);
//# sourceMappingURL=evaluationleader.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('AnswersResourceEL', ['$http', function ($http) {
	return {
		guardar: function guardar(datos) {
			return $http.post('api/answerss', datos, {}).success(function (response) {
				return response;
			});
		},
		guardar2: function guardar2(datos) {
			return $http.post('api/evaluation', datos, {}).success(function (response) {
				return response;
			});
		},
		agrupar: function agrupar(datos, usuario) {
			var fecha = new Date();
			var year = fecha.getFullYear();
			var idUser = "Eval-" + usuario.toString() + "-" + year.toString();
			var id = idUser;
			var respuestaJSON = {
				id: id,
				respuestas: []
			};
			for (var i in datos) {
				if (typeof datos[i] != "undefined") {
					var element = {
						questionId: i,
						statesId: datos[i]
					};
					respuestaJSON.respuestas.push(element);
				}
			}
			return angular.toJson(respuestaJSON);
		},
		agrupar2: function agrupar2(datos, usuario, observaciones, leader) {
			// firefox undefined fix
			observaciones = observaciones || '';
			var fecha = new Date();
			var year = fecha.getFullYear();
			var idUser = "Eval-" + usuario.toString() + "-" + year.toString();
			var answerId = idUser;
			var employeeId = usuario;
			var leaderId = leader.employeeId;
			var userAdd = usuario;
			var respuestaJSON2 = {
				answerId: answerId,
				employeeId: employeeId,
				leaderId: leaderId,
				userAdd: userAdd,
				observaciones: observaciones
			};
			return angular.toJson(respuestaJSON2);
		}
	};
}]);
//# sourceMappingURL=evaluationleader.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function LeadersEvaluationsController($rootScope, $state, $translate, Principal, EmployeeLeaderResource, LeadersEvaluationsService) {
    var vm = this;

    $rootScope.activeOption = 'consult';

    vm.onNgInit = function () {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(function () {
                if (!Principal.isAuthenticated) {
                    $state.go('login');
                }
                // Obtains all the leaders employees
                EmployeeLeaderResource.query({}, function (res) {
                    vm.leaders = res;
                });

                vm.years = [];
                var date = new Date();
                var firstYear = 2015;
                var thisYear = date.getFullYear();
                while (firstYear <= thisYear) {
                    vm.years.push(firstYear);
                    firstYear++;
                }
            },
            // If not authenticated, forward to login page
            function (err) {
                $state.go('login');
            });
        }
    };

    // Handles the changes on the years combo
    vm.changeYear = function () {
        vm.changeEvaluator();
    };

    // Handles the changes on the evaluator combo
    vm.changeEvaluator = function () {
        // If there is no year selected, force the selection of the current year
        if (Mentoring.isUndefinedOrNull(vm.year)) {
            var date = new Date();
            vm.year = date.getFullYear();
        }
        // If there is leader selected...
        if (!Mentoring.isUndefinedOrNull(vm.leader)) {
            // Dispatch the server request
            LeadersEvaluationsService.getLeadersEvaluations({ leaderId: vm.leader.id, year: vm.year }, function (res) {
                // if there are results
                if (res.length > 0) {
                    vm.showTable = true;
                    // Iterate over all the result to do some process
                    res.map(function (r) {
                        var employee = r.employee;
                        r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;

                        // Obtains the self evaluation label text and its class
                        var selfEvalKey = 'leadersEvaluation.tabla.';
                        if (r.selfEvaluation) {
                            selfEvalKey += 'si';
                            r.selfEvaluationClass = 'circle-green';
                        } else {
                            selfEvalKey += 'no';
                            r.selfEvaluationClass = 'circle-red';
                        }
                        r.selfEvaluation = $translate.instant(selfEvalKey);

                        // Same for final evaluation
                        var finalEvalKey = 'leadersEvaluation.tabla.';
                        if (r.finalEvaluation) {
                            finalEvalKey += 'si';
                            r.finalEvaluationClass = 'circle-green';
                        } else {
                            finalEvalKey += 'no';
                            r.finalEvaluationClass = 'circle-red';
                        }
                        r.finalEvaluation = $translate.instant(finalEvalKey);
                    });
                    vm.leadersEvaluations = res;
                } else {
                    // If there are no results, don't show the table
                    vm.showTable = false;
                }
            }, function (err) {
                vm.Modal = {
                    msg: 'leadersEvaluation.modal.error',
                    title: 'leadersEvaluation.modal.error.title',
                    button: 'leadersEvaluation.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                $('#myModal').modal('show');
            });
        } else {
            vm.showTable = false;
        }
    };

    // Init the controller
    vm.onNgInit();
};
angular.module('mentoringApp').controller('LeadersEvaluationsController', LeadersEvaluationsController);
//# sourceMappingURL=leadersEvaluations.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('LeadersEvaluationsService', ['$resource', function ($resource) {
			return $resource('api/leadersEvaluation/:leaderId/:year', {}, {
						'getLeadersEvaluations': { method: 'GET', isArray: true }
			});
}]);
//# sourceMappingURL=leadersEvaluations.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function EmployeesEvaluationsController($rootScope, $state, $translate, Principal, Directions, Areas, EmployeesEvaluationService) {
    var vm = this;
    $rootScope.activeOption = 'consult';

    vm.onNgInit = function () {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(function () {
                if (!Principal.isAuthenticated) {
                    $state.go('login');
                }
                // Obtains all the directions
                Directions.query({}, function (res) {
                    vm.directions = res;
                }, function (err) {
                    showModal(function () {
                        $state.go('home');
                    });
                });

                // Creates the year array. The first year will always be 2015.
                var firstYear = 2015;
                var date = new Date();
                vm.years = [];
                while (firstYear <= date.getFullYear()) {
                    vm.years.push(firstYear);
                    firstYear++;
                }
            },
            // If not authenticated, forward to login page
            function (err) {
                $state.go('login');
            });
        }
    };

    // Handles the changes on direction combo
    vm.changeDirection = function () {
        vm.showTable = false;
        // First check if it's not an empty value
        if (!Mentoring.isUndefinedOrNull(vm.direction)) {
            // Then, obtain the direction's areas
            Areas.getDirectionAreas({ directionId: vm.direction }, function (res) {
                vm.areas = res;
            }, function (err) {
                showModal(function () {
                    $('#myModal').modal('hide');
                });
            });
        }
    };

    // Handles the changes on years combo
    vm.changeYear = function () {
        vm.showTable = false;
        if (!Mentoring.isUndefinedOrNull(vm.year) && !Mentoring.isUndefinedOrNull(vm.area)) {
            // Dispatch server request
            getResults();
        }
    };

    // Handles the changes on area combo
    vm.changeArea = function () {
        vm.showTable = false;
        // First check if it's not an empty value
        if (!Mentoring.isUndefinedOrNull(vm.area)) {
            // If there is no year selected, autoselect current year
            if (Mentoring.isUndefinedOrNull(vm.year)) {
                var date = new Date();
                vm.year = date.getFullYear();
            }
            // Dispatch the server request
            getResults();
        }
    };

    // Dispatch server request to obtain the data
    var getResults = function getResults() {
        EmployeesEvaluationService.get({ areaId: vm.area, year: vm.year }, function (res) {
            vm.showTable = true;
            res.map(processResults);
            vm.evaluations = res;
        }, function (err) {
            showModal(function () {
                $('#myModal').modal('hide');
            });
        });
    };

    // Handles the visualization of the controller Modal
    var showModal = function showModal(action) {
        vm.Modal = {
            msg: 'employeesEvaluation.modal.error',
            title: 'employeesEvaluation.modal.error.title',
            button: 'employeesEvaluation.modal.ok',
            action: action
        };
        $('#myModal').modal('show');
    };

    // Handles each result of the server request. This function do some process on each result before they are shown
    // to the user
    var processResults = function processResults(r) {
        // First, obtain the emplyee's full name
        var employee = r.employee;
        r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;

        // Obtains the self evaluation label text and its class
        var selfEvalKey = 'employeesEvaluation.tabla.';
        if (r.selfEvaluation) {
            selfEvalKey += 'si';
            r.selfEvaluationClass = 'circle-green';
        } else {
            selfEvalKey += 'no';
            r.selfEvaluationClass = 'circle-red';
        }
        r.selfEvaluation = $translate.instant(selfEvalKey);

        // Same for final evaluation
        var finalEvalKey = 'employeesEvaluation.tabla.';
        if (r.finalEvaluation) {
            finalEvalKey += 'si';
            r.finalEvaluationClass = 'circle-green';
        } else {
            finalEvalKey += 'no';
            r.finalEvaluationClass = 'circle-red';
        }
        r.finalEvaluation = $translate.instant(finalEvalKey);
    };

    vm.onNgInit();
};
angular.module('mentoringApp').controller('EmployeesEvaluationsController', EmployeesEvaluationsController);
//# sourceMappingURL=employeesEvaluation.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';

angular.module('mentoringApp').factory('EmployeesEvaluationService', ['$resource', function ($resource) {
	return $resource('api/employeesEvaluation/:areaId/:year', {}, {
		'get': { method: 'GET', isArray: true },
		'getAllEvaluations': { url: 'api/employeesEvaluationAll/:year', method: 'GET', isArray: true }
	});
}]);
//# sourceMappingURL=employeesEvaluation.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function AllEvaluationsController($rootScope, $state, $translate, Principal, EmployeesEvaluationService) {
    var vm = this;
    $rootScope.activeOption = 'consult';

    vm.onNgInit = function () {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(function () {
                if (!Principal.isAuthenticated) {
                    $state.go('login');
                }

                // Creates the year array. The first year will always be 2015.
                var firstYear = 2015;
                var date = new Date();
                vm.years = [];
                while (firstYear <= date.getFullYear()) {
                    vm.years.push(firstYear);
                    firstYear++;
                }
            },

            // If not authenticated, forward to login page
            function (err) {
                $state.go('login');
            });
        }
    };

    /** Handles the change on year combo */
    vm.changeYear = function () {
        vm.showTable = false;
        vm.excelDownloading = false;
        vm.excelButtonDisabled = false;
        if (!Mentoring.isUndefinedOrNull(vm.year)) {
            $('#pleaseWaitDialog').modal({ backdrop: 'static', show: true });

            EmployeesEvaluationService.getAllEvaluations({ year: vm.year }, function (res) {
                vm.evaluations = res;
                res.map(function (r) {
                    // First, obtain the emplyee's full name
                    var employee = r.employee;
                    r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;

                    // Then, obtains the evaluator name
                    if (r.evaluator) {
                        var evaluator = r.evaluator;
                        r.evaluator.name = evaluator.firstSurname + ' ' + evaluator.secondSurname + ', ' + evaluator.name;
                    }

                    // Obtains the self evaluation label text and its class
                    var selfEvalKey = 'evaluationAll.tabla.';
                    if (r.selfEvaluation) {
                        selfEvalKey += 'si';
                        r.selfEvaluationClass = 'circle-green';
                    } else {
                        selfEvalKey += 'no';
                        r.selfEvaluationClass = 'circle-red';
                    }
                    r.selfEvaluation = $translate.instant(selfEvalKey);

                    // Same for final evaluation
                    var finalEvalKey = 'evaluationAll.tabla.';
                    if (r.finalEvaluation) {
                        finalEvalKey += 'si';
                        r.finalEvaluationClass = 'circle-green';
                    } else {
                        finalEvalKey += 'no';
                        r.finalEvaluationClass = 'circle-red';
                    }
                    r.finalEvaluation = $translate.instant(finalEvalKey);
                });
                vm.showTable = true;

                $('#pleaseWaitDialog').modal('hide');
            }, function (err) {
                $('#pleaseWaitDialog').modal('hide');
                vm.Modal = {
                    msg: 'evaluationAll.modal.msg',
                    title: 'evaluationAll.modal.title',
                    button: 'evaluationAll.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                $('#myModal').modal('show');
            });
        }
    };

    vm.getExcel = function () {
        var url = 'api/employeesEvaluationAll.xls?year=' + vm.year;
        window.open(url, '_self');
        vm.excelDownloading = true;
        vm.excelButtonDisabled = true;
    };

    vm.onNgInit();
};
angular.module('mentoringApp').controller('AllEvaluationsController', AllEvaluationsController);
//# sourceMappingURL=allEvaluations.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
            mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                $translatePartialLoader.addPart('home');
                return $translate.refresh();
            }]
        }
    });
}]);
//# sourceMappingURL=home.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').controller('HomeController', ['$rootScope', function ($rootScope) {
	$rootScope.activeOption = "";
}]);
//# sourceMappingURL=home.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function MainController($state, Principal) {
	if (Principal.isAuthenticated()) {
		$state.go('home');
	} else {
		$state.go('login');
	}
}
angular.module('mentoringApp').controller('MainController', MainController);
//# sourceMappingURL=main.controller.js.map

/* jshint -W097 */
/* globals angular*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
	$stateProvider.state('individualMatrix', {
		name: 'individualMatrix',
		parent: 'site',
		url: '/individual',
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
	}).state('multipleMatrix', {
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
	}).state('tableIncrements', {
		name: 'incrementsTable',
		parent: 'site',
		url: '/tables',
		data: {
			roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG']
		},
		views: {
			'content@': {
				templateUrl: 'scripts/increments/incrementsTable.html',
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
	}).state('wageLimits', {
		name: 'wageLimits',
		parent: 'site',
		url: '/limits',
		data: {
			roles: ['ROLE_ADMIN', 'ROLE_RRHH', 'ROLE_DIRECTORG']
		},
		views: {
			'content@': {
				templateUrl: 'scripts/increments/limits.html',
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
	});
}]);
//# sourceMappingURL=increments.state.js.map

/* jshint -W097 */
/* Controller for Individual Matrix funcionality */
'use strict';
/*@ngInject*/
function IndividualController($rootScope, $scope, $state, $stateParams, $q, $translatePartialLoader, $translate, $filter, SharingEvaluationService, EmpleadosCn, EmployeesCategory, Employees, EmployeeEvaluationResource, EvaluationsCn, Retribution) {
    var vm = this;
    vm.showInfo = false;
    $rootScope.activeOption = 'increments';

    /* Obtains the employee list */
    Employees.query({}, function (result) {
        vm.employees = result;
    });

    // Chart.js Data
    vm.ChartConf = {
        labels: ["", "", ""],
        datasets: [{
            label: 'Maximo',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'red',
            pointColor: 'rgba(0,0,0,0)', pointStrokeColor: 'rgba(0,0,0,0)',
            pointHighlightFill: 'rgba(0,0,0,0)', pointHighlightStroke: 'rgba(0,0,0,0)',
            data: [30000, 30000, 30000]
        }, {
            label: 'Media',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'green',
            pointColor: 'rgba(0,0,0,0)', pointStrokeColor: 'rgba(0,0,0,0)',
            pointHighlightFill: 'rgba(0,0,0,0)', pointHighlightStroke: 'rgba(0,0,0,0)',
            data: [25000, 25000, 25000]
        }, {
            label: 'Minimo',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'black',
            pointColor: 'rgba(0,0,0,0)', pointStrokeColor: 'rgba(0,0,0,0)',
            pointHighlightFill: 'rgba(0,0,0,0)', pointHighlightStroke: 'rgba(0,0,0,0)',
            data: [20000, 20000, 20000]
        }, {
            label: 'Salario',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'rgba(0,0,0,0)',
            pointColor: 'blue', pointStrokeColor: 'blue',
            pointHighlightFill: 'blue', pointHighlightStroke: 'blue',
            data: [0, 23000, 0]
        }]
    };
    // Chart.js Options
    vm.ChartOptions = {
        responsive: true, showTooltips: false,
        scaleShowGridLines: true, scaleGridLineColor: "rgba(0,0,0,.05)", scaleGridLineWidth: 1,
        bezierCurve: true, bezierCurveTension: 0.4,
        pointDot: true, pointDotRadius: 3,
        pointDotStrokeWidth: 1, pointHitDetectionRadius: 20,
        datasetStroke: false, datasetStrokeWidth: 2, datasetFill: true,
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><%if(datasets[i].label){%><li><%=datasets[i].label%></li><%}%><%}%></ul>'
    };

    /** Obtains the employee categories when an employee is selected on the combo. */
    vm.changeEmployeeCombo = function () {
        /* Hides the info divs while loading */
        vm.showInfo = false;
        if (vm.employeeId !== '') {
            EmployeesCategory.query({ employeeId: vm.employeeId }, function (result) {
                vm.retributions = result.filter(function (item) {
                    return item.retribution !== null;
                }).map(function (retribution) {
                    var date = new Date(retribution.dateFrom);
                    return { id: retribution.retribution.id, positionId: retribution.positionId, year: date.getFullYear() };
                });
                vm.retribution = '';
            });
        } else {
            vm.employeeCategories = null;
        }
    };

    /** Obtains the retribution for a given year */
    vm.changeYearsCombo = function () {
        if (vm.retribution !== '') {
            /* Hides the info divs while loading */
            vm.showInfo = false;

            /* Retribution info request */
            Retribution.get({ retributionId: vm.retribution.id }, function (result) {
                vm.retributionInfo = result;
                vm.retributionInfo.annualTotalIncome = vm.retributionInfo.annualGrossIncome + vm.retributionInfo.annualSocialProfits;

                /* Employee info request. WageBand, Area, Job... */
                Retribution.getEmployeeInfo({ employeeId: vm.employeeId,
                    categoryId: vm.retribution.positionId,
                    year: vm.retribution.year }, function (result) {
                    /* Hows the info div */
                    vm.showInfo = true;

                    vm.employeeInfo = result;
                    /* In case there are no wage band limits... */
                    if (result.wageBandLimits === null) {
                        result.wageBandLimits = {
                            minValue: 0, medValue: 0, maxValue: 0
                        };
                    }
                    var min = result.wageBandLimits.minValue;
                    var avg = result.wageBandLimits.medValue;
                    var max = result.wageBandLimits.maxValue;
                    var salary = vm.retributionInfo.annualGrossIncome;

                    /* Checks if there are position increases info */
                    /* Otherwise, default values */
                    if (vm.employeeInfo.positionIncreases.P1.length === 0) {
                        vm.employeeInfo.positionIncreases.P1 = [0, 0, 0, 0, 0];
                        vm.employeeInfo.positionIncreases.P2 = [0, 0, 0, 0, 0];
                        vm.employeeInfo.positionIncreases.P3 = [0, 0, 0, 0, 0];
                        vm.employeeInfo.positionIncreases.P4 = [0, 0, 0, 0, 0];
                    }

                    // Calculate current P
                    var actualP = 'P4';
                    if (salary <= (min + avg) / 2) {
                        actualP = 'P1';
                    } else if (salary <= avg) {
                        actualP = 'P2';
                    } else if (salary <= (max + avg) / 2) {
                        actualP = 'P3';
                    }
                    vm.P = {
                        actual: actualP,
                        msg: 'increments.position.' + actualP
                    };

                    /* Calculate Salary Increases */
                    var percentIncrease = 0.0;
                    /* Obtains current P values for the correpondent P percent */
                    var PValues = vm.employeeInfo.positionIncreases[actualP];
                    switch (vm.employeeInfo.evaluationMark) {
                        case 'F':
                            percentIncrease = PValues[0];break;
                        case 'B':
                            percentIncrease = PValues[1];break;
                        case 'A':
                            percentIncrease = PValues[2];break;
                        case 'A+':
                            percentIncrease = PValues[3];break;
                        case 'A++':
                            percentIncrease = PValues[4];break;
                    }
                    vm.percentIncrease = (percentIncrease + vm.employeeInfo.generalIncrease).toFixed(1);
                    vm.totalIncrease = (vm.retributionInfo.annualGrossIncome * vm.percentIncrease / 100).toFixed(2);
                    vm.newGrossIncome = (vm.retributionInfo.annualGrossIncome * (1 + vm.percentIncrease / 100)).toFixed(2);
                    vm.fixedPercentIncrease = (percentIncrease + vm.employeeInfo.generalIncrease).toFixed(1);
                    vm.fixedTotalIncrease = (vm.retributionInfo.annualGrossIncome * vm.fixedPercentIncrease / 100).toFixed(2);

                    // Format the numeric values to show on the first table
                    var currency = ' ' + vm.retributionInfo.currencyName;
                    vm.retributionInfo.annualGrossIncome = $filter('NumericFilter')(vm.retributionInfo.annualGrossIncome) + currency;
                    vm.retributionInfo.annualSocialProfits = $filter('NumericFilter')(vm.retributionInfo.annualSocialProfits) + currency;
                    vm.retributionInfo.annualTotalIncome = $filter('NumericFilter')(vm.retributionInfo.annualTotalIncome) + currency;

                    // Update Chart info
                    vm.ChartConf.datasets[0].data = [min, min, min];
                    vm.ChartConf.datasets[1].data = [avg, avg, avg];
                    vm.ChartConf.datasets[2].data = [max, max, max];
                    vm.ChartConf.datasets[3].data = [salary, salary, salary];
                }, function (error) {
                    var msg = error.data.msg || 'increments.individual.modal.error';
                    vm.Modal = {
                        msg: msg,
                        title: 'increments.individual.modal.error.title',
                        button: 'increments.individual.modal.ok',
                        action: function action() {
                            $('#myModal').modal('hide');
                        }
                    };
                    /* Now show the modal */
                    $('#myModal').modal('show');
                });
            });
        } else {
            vm.retribution = null;
        }
    };

    /* Redirects to the current evaluation page */
    vm.goToEvaluation = function () {
        /* Set some info needed before going to consultEvaluation state */
        SharingEvaluationService.setId(vm.employeeInfo.evaluationId);
        SharingEvaluationService.setModification(false);
        SharingEvaluationService.setEvaluado({
            employeeId: vm.employeeId,
            id: vm.employeeInfo.evaluationId,
            creationDate: vm.employeeInfo.evaluationCreationDate
        });

        /* Obtains info needed to go to the evaluation state */
        var promiseArray = [];
        /* Add to the promiseArray all the request to server */
        promiseArray.push(EmpleadosCn.getEmployeeInfo({ id: vm.employeeId }, function (emp) {
            vm.employeeData = emp;
        }).$promise);
        promiseArray.push(EmployeeEvaluationResource.getEvaluation({ employeeId: vm.employeeId, evaluationId: vm.employeeInfo.evaluationId }, function (eva) {
            vm.evaluationData = eva;
        }).$promise);

        /* Loads the json i18n files for consult */
        /* There are props loaded by consult state, which is before going to consultEvaluation.
        Since we are going directly to consultEvaluation, we need to load these props, just in case we were there before */
        $translatePartialLoader.addPart('consult');
        promiseArray.push($translate.refresh());

        /* When all the requests are finished, then go to consultEvaluation state */
        $q.all(promiseArray).then(function () {
            $stateParams.empleado = { info: vm.employeeData };
            $stateParams.leader = [];
            $stateParams.evaluation = vm.evaluationData;
            $state.go('consultEvaluation', {}, { location: true });
        });
    };
}
angular.module('mentoringApp').controller('IndividualController', IndividualController);
//# sourceMappingURL=individual.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('Employees', ['$resource', function ($resource) {
  return $resource('api/employee', {}, Mentoring.resourceHandlerGET);
}]).factory('EmployeesCategory', ['$resource', function ($resource) {
  return $resource('api/employeeCatId/:employeeId', {}, Mentoring.resourceHandlerGET);
}]).factory('Retribution', ['$resource', function ($resource) {
  return $resource('api/retributions', {}, {
    get: { method: 'GET', url: 'api/retributions/:retributionId', params: {}, isArray: false },
    getEmployeeInfo: { method: 'GET', url: 'api/retributions/employeeInfo/:employeeId/:categoryId/:year', isArray: false }
  });
}]);
//# sourceMappingURL=individual.service.js.map

/* jshint -W097 */
/* Controller for Multiple Matrix funcionality */
'use strict';
/*@ngInject*/
function MultipleController($rootScope, $window, $filter, EmployeesCategoryByYear, EmployeeMultiple, Directions, Areas) {
    var vm = this;
    $rootScope.activeOption = 'increments';
    vm.direction = '';
    vm.area = '';
    vm.year;
    vm.confirmedServer = false;
    vm.showTables = false;
    vm.listDate = [];
    vm.confirmedList = [];

    var dateFinal = new Date();
    for (var i = 2015; i <= dateFinal.getFullYear(); i++) {
        vm.listDate.push(i);
    }

    /* Obtains the directions */
    Directions.query({}, function (result) {
        vm.directions = result;
    });

    /* Function executed when a value change has happened on Direction Combo */
    vm.changeDirectionCombo = function () {
        if (vm.direction !== '') {
            vm.areas = [];
            /* Obtains the direction areas */
            Areas.getDirectionAreas({ directionId: vm.direction.id }, function (res) {
                vm.areas = res;
            }, function (err) {
                errorHandler(err.data.msg);
            });
        };
    };

    /* Function that calls to the server to obtain the data */
    vm.searchIncreases = function () {
        /* If no direction nor year are selected, show error modal */
        if (Mentoring.isEmpty(vm.direction) || Mentoring.isUndefinedOrNull(vm.year)) {
            vm.Modal = {
                msg: 'increments.multiple.modal.error.search',
                title: 'increments.multiple.modal.error.title',
                button: 'increments.multiple.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
            return;
        }

        /* Else, search for increases */
        $('#pleaseWaitDialog').modal({ backdrop: 'static', show: true });
        vm.showTables = false;
        vm.confirmedServer = false;
        var obj = {
            directionId: vm.direction.id,
            areaId: vm.area,
            year: vm.year,
            confirmed: vm.confirmed
        };
        EmployeeMultiple.getMultipleData(obj, function (result) {
            vm.showTables = true;
            vm.employeesInfo = result;
            // Iterate over the response, to know if any result it's a confirmed increase.
            result.filter(function (i) {
                if (i.confirmed === true) {
                    vm.confirmedServer = true;
                    // Format the increases to something bonny
                    i.customSalaryIncrease = $filter('NumericFilter')(i.customSalaryIncrease, 2);
                    i.customSalaryIncreasePercent = $filter('NumericFilter')(i.customSalaryIncreasePercent, 2);
                }
            });
            $('#pleaseWaitDialog').modal('hide');
        }, function (err) {
            $('#pleaseWaitDialog').modal('hide');
            errorHandler(err.data.msg);
        });
    };

    /* Handles the change of percent values on the table inputs */
    vm.changeValuePercent = function (obj) {
        var actualIncome = parseFloat(obj.actualIncome);
        var customSalaryIncreasePercent = parseFloat(obj.customSalaryIncreasePercent);
        var fixedIncrease = parseFloat(obj.salaryIncreasePercent) + customSalaryIncreasePercent;

        /* Checks if the increment is a number */
        if (isNaN(fixedIncrease)) {
            customSalaryIncreasePercent = 0.0;
            fixedIncrease = 0.0;
            errorHandler('increments.multiple.modal.error.percent.nan');
        }

        /* Calculates the values */
        var customSalaryIncrease = actualIncome * customSalaryIncreasePercent / 100;
        var finalSalaryIncrease = actualIncome * fixedIncrease / 100;
        var finalIncome = actualIncome + finalSalaryIncrease;

        /* Assigns the formatted values */
        obj.customSalaryIncrease = $filter('NumericFilter')(customSalaryIncrease, 2);
        obj.customSalaryIncreasePercent = $filter('NumericFilter')(customSalaryIncreasePercent, 2);
        obj.finalSalaryIncreasePercent = fixedIncrease;
        obj.finalSalaryIncrease = finalSalaryIncrease;
        obj.finalIncome = finalIncome;
    };

    /* Handles the change of a numeric vlaue on the inputs table */
    vm.changeValueNumeric = function (obj) {
        /* Obtains the obj values */
        var actualIncome = parseFloat(obj.actualIncome);
        var customIncrease = parseFloat(obj.customSalaryIncrease);
        /* Calculates the custom increase */
        var customIncreasePercent = customIncrease * 100 / actualIncome;
        /* Calcualtes the final increase percent. P-increment+User Defined. */
        var finalSalaryPercent = parseFloat(obj.salaryIncreasePercent) + customIncreasePercent;

        /* Checks if the increment is a number */
        if (isNaN(customIncrease)) {
            customIncrease = 0.0;
            customIncreasePercent = 0.0;
            finalSalaryPercent = 0.0;
            errorHandler('increments.multiple.modal.error.salary.nan');
        }
        /* Checks if the salary increase is lower than 0 */
        if (customIncrease < 0) {
            customIncrease = 0.0;
            customIncreasePercent = 0.0;
            finalSalaryPercent = 0.0;
            errorHandler('increments.multiple.modal.error.salary');
        }

        var finalSalaryIncrease = actualIncome * finalSalaryPercent / 100;
        var finalIncome = actualIncome + finalSalaryIncrease;

        /* Set the object values */
        obj.customSalaryIncrease = $filter('NumericFilter')(customIncrease, 2);
        obj.customSalaryIncreasePercent = $filter('NumericFilter')(customIncreasePercent, 2);
        obj.finalSalaryIncreasePercent = finalSalaryPercent;
        obj.finalSalaryIncrease = finalSalaryIncrease;
        obj.finalIncome = finalIncome;
    };

    /* Handles the check of a confirmed checkbox on the inputs table */
    vm.changeConfirmed = function (obj) {
        /* If the obj is confirmed, add it to the list */
        if (obj.confirmed) {
            vm.confirmedList.push(obj);

            /* If not, search the list for it and delete it. It should be have added first... */
        } else {
                var index = 0;
                for (index = 0, length = vm.confirmedList.length; index < length; index++) {
                    var item = vm.confirmedList[index];
                    if (item.categoryId === obj.categoryId) {
                        break;
                    }
                }
                vm.confirmedList.splice(index, 1);
            }
    };

    /* Save into BD the confirmed rows. This method will NOT save the increases. To save the increases they must be confirmed first. */
    vm.saveConfirmed = function () {
        /* If there are confirmed increases... */
        if (vm.confirmedList.length > 0) {
            EmployeeMultiple.saveConfirmedData({ directionId: vm.direction.id }, vm.confirmedList, function (result) {
                vm.Modal = {
                    msg: 'increments.multiple.modal.confirmed.success',
                    title: 'increments.multiple.modal.confirmed.title',
                    button: 'increments.multiple.modal.ok',
                    action: function action() {
                        $window.location.reload();
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            }, function (error) {
                errorHandler(error.data.msg);
            });
        }
    };

    /* Saves the increases. */
    vm.confirmIncrements = function () {
        var increasesList = vm.employeesInfo.filter(function (item) {
            return item.confirmed;
        });
        EmployeeMultiple.saveIncreases(increasesList, function (result) {
            vm.Modal = {
                msg: 'increments.multiple.modal.confirmed.successb',
                title: 'increments.multiple.modal.confirmed.title',
                button: 'increments.multiple.modal.ok',
                action: function action() {
                    $window.location.reload();
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
        }, function (error) {
            errorHandler(error.data.msg);
        });
    };

    /* Obtains a PDF Export file */
    vm.getPDFFile = function () {
        var url = getURLExport('pdf');
        window.open(url, '_self');
    };

    /* Obtains a XLS Export file */
    vm.getXLSFile = function () {
        var url = getURLExport('excel');
        window.open(url, '_self');
    };

    /* Builds the export URL based on the combo selections and format passed by parameter */
    var getURLExport = function getURLExport(format) {
        var url = 'api/employeeCatYear.' + format + '?directionId=' + vm.direction.id + '&year=' + vm.year;
        if (!Mentoring.isEmpty(vm.area)) {
            url += '&areaId=' + vm.area;
        }
        if (!Mentoring.isEmpty(vm.confirmed)) {
            url += '&confirmed=' + vm.confirmed;
        }
        return url;
    };

    var errorHandler = function errorHandler(msg) {
        msg = msg || 'increments.multiple.modal.error';
        vm.Modal = {
            msg: msg,
            title: 'increments.multiple.modal.error.title',
            button: 'increments.multiple.modal.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
};
angular.module('mentoringApp').controller('MultipleController', MultipleController);
//# sourceMappingURL=multiple.controller.js.map

/* jshint -W097 */
/* globals angular, $ */
'use strict';
angular.module('mentoringApp').factory('EmployeesCategoryByYear', ['$resource', function ($resource) {
    return $resource('api/employeeCatYear/:dateFrom', {}, Mentoring.resourceHandlerGET);
}]).factory('Directions', ['$resource', function ($resource) {
    return $resource('api/directions', {}, {
        query: { method: 'GET', isArray: true }
    });
}]).factory('EmployeeMultiple', ['$resource', function ($resource) {
    return $resource('api/employeeCatYear', {}, {
        getMultipleData: { method: 'POST', isArray: true },
        saveConfirmedData: { url: 'api/employeeCatYear/confirmed/:directionId', method: 'POST' },
        saveIncreases: { url: 'api/employeeCatYear/increases', method: 'POST' }
    });
}]).factory('Areas', ['$resource', function ($resource) {
    return $resource('api/area', {}, {
        query: { method: 'GET', isArray: true },
        getArea: { url: 'api/area/:areaId' },
        getDirectionAreas: { url: 'api/area/direction/:directionId', isArray: true }
    });
}]);
//# sourceMappingURL=multiple.service.js.map

/* jshint -W097 */
/* Controller for Increments Table functionality */
'use strict';
/*@ngInject*/
function IncrementsController($rootScope, PositionIncreases, EvaluationMarkService, WageBandService, WageBandPositionService, DirectionsService, $window) {
    var vm = this;
    /* Controller variables */
    vm.direction = null;
    vm.year = null;
    vm.showTables = false;
    vm.saveChanges = false;
    vm.generalIncrease = 0.0;

    $rootScope.activeOption = 'increments';
    var defaults = {};

    /* Obtains the years */
    PositionIncreases.getYears({}, function (result) {
        vm.years = result;
    });

    /* Obtains the directions */
    DirectionsService.query({}, function (result) {
        vm.directions = result;
    });

    /* Obtains from DB the IDs for marks, wage bands and wage band positions for the default object */
    EvaluationMarkService.query({}, function (result) {
        defaults.evaluationMarks = result;
    });
    WageBandService.query({}, function (result) {
        defaults.wageBands = result;
    });
    WageBandPositionService.query({}, function (result) {
        defaults.wageBandPositions = result;
    });

    /* Search for the positions */
    vm.searchPositions = function () {
        /* If both direction and year are selected, do it */
        if (vm.direction !== null && vm.year !== null) {
            /* Reset view flags to default */
            vm.showTables = false;
            vm.saveChanges = false;
            vm.generalIncrease = 0.0;

            /* Reset vm.positions to default */
            vm.positions = getDefaultPositions();
            /* At first, we can save changes always */
            vm.saveChanges = true;

            PositionIncreases.query({ year: vm.year, direction: vm.direction.id }, function (result) {
                /* If there is no result for the given year, we search the year before.
                Only if year is current year, so this way we can add new year positions starting from the last year positions. */
                if (result.noPositionIncreases && vm.year === Mentoring.getCurrentYear()) {
                    /* Request to year before */
                    PositionIncreases.query({ year: vm.year - 1, direction: vm.direction.id }, function (result) {
                        handleSearchPositions(result, true);
                    });
                } else {
                    handleSearchPositions(result, false);
                }
                vm.saveChanges = result.canSave;
            });
            /* Othewise, show a warning modal */
        } else {
                vm.Modal = {
                    msg: 'increments.increments.modal.warning.select',
                    title: 'increments.increments.modal.warning.title',
                    button: 'increments.increments.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            }
    };

    /* Send a save request to server */
    vm.savePositions = function () {
        /* Creates object to send */
        var buss = vm.positions.business;
        var staff = vm.positions.staff;
        var object = {
            v1: [], v2: [], v3: [], v4: []
        };
        for (var V in buss) {
            var vName = V.toLowerCase();
            for (var p in buss[V]) {
                buss[V][p].map(function (pos) {
                    object[vName].push(pos);
                });
            }
        };
        for (var V in staff) {
            var vName = V.toLowerCase();
            for (var p in buss[V]) {
                staff[V][p].map(function (pos) {
                    object[vName].push(pos);
                });
            }
        };
        object.generalIncrease = vm.generalIncrease;

        /* Send request */
        PositionIncreases.savePositions({ direction: vm.direction.id }, object,
        /* If successful request... */
        function (result) {
            /* Creates a the object which contains the modal info to show */
            vm.Modal = {
                msg: 'increments.increments.modal.success',
                title: 'increments.increments.modal.success.title',
                button: 'increments.increments.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                    $window.location.reload();
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
            /* If error... */
        }, function (error) {
            vm.Modal = {
                msg: 'increments.increments.modal.error',
                title: 'increments.increments.modal.error.title',
                button: 'increments.increments.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                }
            };
            $('#myModal').modal('show');
        });
    };

    /* Handles the positionIncreases response object to render the tables */
    var handleSearchPositions = function handleSearchPositions(result, removeId) {
        /* If there arent result, leave vm.positions as default */
        if (!result.noPositionIncreases) {
            /* First, reset the item's P arrays. This its easier to add the obtained values from server. */
            vm.positions = getEmptyPositions();

            /* Sets the general increase */
            vm.generalIncrease = result.generalIncrease;

            /* Iterate over the result properties looking for the arrays which contains the P values. */
            for (var item in result) {
                var V = result[item];
                /* If the item is array, iterate it. */
                if (Array.isArray(V)) {
                    V.map(function (i) {
                        /* Check isBusiness flag to know is whether is business position or not. */
                        var dest = vm.positions.staff[item];
                        if (i.isBusiness) {
                            dest = vm.positions.business[item];
                        }
                        /* Push the position to destination object */
                        if (removeId) {
                            i.id = null;
                        }
                        dest[i.name].push(i);
                    });
                }
            }
        }
        vm.showTables = true;
    };

    /* Returns a Postions object with empty P arrays. */
    var getEmptyPositions = function getEmptyPositions() {
        return {
            business: {
                v1: { P1: [], P2: [], P3: [], P4: [] },
                v2: { P1: [], P2: [], P3: [], P4: [] },
                v3: { P1: [], P2: [], P3: [], P4: [] },
                v4: { P1: [], P2: [], P3: [], P4: [] }
            },
            staff: {
                v1: { P1: [], P2: [], P3: [], P4: [] },
                v2: { P1: [], P2: [], P3: [], P4: [] },
                v3: { P1: [], P2: [], P3: [], P4: [] },
                v4: { P1: [], P2: [], P3: [], P4: [] }
            }
        };
    };

    /* Returns a default object representing an empty position increases */
    var getDefaultPositions = function getDefaultPositions() {
        var obj = {
            business: {},
            staff: {}
        };
        /* Obtains the code for each evaluation mark */
        var fId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'F';
        }).map(function (m) {
            return m.id;
        });
        var dId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'B';
        }).map(function (m) {
            return m.id;
        });
        var cId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'A';
        }).map(function (m) {
            return m.id;
        });
        var bId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'A+';
        }).map(function (m) {
            return m.id;
        });
        var aId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'A++';
        }).map(function (m) {
            return m.id;
        });

        for (var i = 1; i < 5; i++) {
            var v = 'V' + i;
            var vName = 'V' + i;
            obj.business[v] = {};
            obj.staff[v] = {};
            /* Obtains the list of wage band ids which corresponds */
            var wageBandId = {};
            defaults.wageBands.filter(function (w) {
                return w.name === vName;
            }).map(function (p) {
                if (p.business) {
                    wageBandId.business = p.id;
                } else {
                    wageBandId.staff = p.id;
                }
            });

            /* Creates the object */
            for (var z = 1; z < 5; z++) {
                var p = 'P' + z;
                var pId = defaults.wageBandPositions.filter(function (pos) {
                    return pos.name === p;
                });
                obj.business[v][p] = [{ positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: fId[0], markCode: 'F', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: dId[0], markCode: 'B', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: cId[0], markCode: 'A', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: bId[0], markCode: 'A+', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: aId[0], markCode: 'A++', value: 0.0 }];
                obj.staff[v][p] = [{ positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: fId[0], markCode: 'F', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: dId[0], markCode: 'B', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: cId[0], markCode: 'A', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: bId[0], markCode: 'A+', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: aId[0], markCode: 'A++', value: 0.0 }];
            }
        }
        return obj;
    };
};
angular.module('mentoringApp').controller('IncrementsController', IncrementsController);
//# sourceMappingURL=increments.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PositionIncreases', ['$resource', function ($resource) {
    return $resource('api/positionIncreases/', {}, {
        getYears: { url: 'api/positionIncreases/years', method: 'GET', isArray: true },
        query: { url: 'api/positionIncreases/:year/:direction', method: 'GET', isArray: false },
        savePositions: { url: 'api/positionIncreases/:direction', method: 'POST' }
    });
}]).factory('WageBandService', ['$resource', function ($resource) {
    return $resource('api/wageBand', {}, {
        query: { method: 'GET', isArray: true }
    });
}]).factory('WageBandPositionService', ['$resource', function ($resource) {
    return $resource('api/wageBandPositions', {}, {
        query: { method: 'GET', isArray: true }
    });
}]).factory('EvaluationMarkService', ['$resource', function ($resource) {
    return $resource('api/evaluationMarks', {}, {
        query: { method: 'GET', isArray: true }
    });
}]);
//# sourceMappingURL=increments.service.js.map

/* jshint -W097 */
/* Controller for Wage Bands Limits funcionality */
'use strict';
/*@ngInject*/
function WageLimitsController($rootScope, $window, WageBandLimitsService, DirectionsService) {
    var vm = this;
    $rootScope.activeOption = 'increments';
    vm.canSave = true;
    vm.direction = null;
    vm.directions = [];
    vm.limits = [];
    vm.currency = '';
    vm.yearHTML = Mentoring.getCurrentYear();
    vm.showTables = false;

    /* Obtains directions */
    DirectionsService.query({}, function (result) {
        vm.directions = result;
    });

    /* Function executed when there is a change on direction combo */
    vm.selectDirection = function () {
        /* If no directions selected, set showTables flag to flase and show modal */
        if (vm.direction === null) {
            vm.showTables = false;
            vm.Modal = {
                msg: 'increments.limits.modal.warning.select',
                title: 'increments.limits.modal.warning.title',
                button: 'increments.limits.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
        } else {
            (function () {
                /* Set flags to default */
                vm.showTables = false;
                vm.canSave = false;

                /* Obtains current year */
                var year = Mentoring.getCurrentYear();

                /* Wage Band Limits request by year and direction. */
                WageBandLimitsService.query({ year: year, direction: vm.direction.id }, function (result) {
                    /* Sets the currency symbol for the selected direction */
                    vm.currency = vm.direction.currencySymbol;

                    /* If there are no result, request last year info */
                    if (result.limits.length == 0) {
                        WageBandLimitsService.query({ year: year - 1, direction: vm.direction.id }, function (result) {
                            handleResult(result, true);
                        }, errorHandler);
                    } else {
                        handleResult(result, false);
                    }
                    vm.canSave = result.canSave;
                }, errorHandler);
            })();
        }
    };

    /* Function that saves limits on server */
    vm.saveLimits = function () {
        /* If limits are valid, process them */
        if (validateLimits(vm.limits)) {
            var limits = [];
            var business = vm.limits.business;
            for (var item in business) {
                limits.push(business[item]);
            }
            var staff = vm.limits.staff;
            for (var item in staff) {
                limits.push(staff[item]);
            }

            /* Request to server */
            WageBandLimitsService.saveLimits(limits,
            /* Success Handler */
            function (result) {
                /* Shows a success modal */
                vm.Modal = {
                    msg: 'increments.limits.modal.success',
                    title: 'increments.limits.modal.success.title',
                    button: 'increments.limits.modal.ok',
                    action: function action() {
                        $window.location.reload();
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            },
            /* Error Handler */
            function (error) {
                /* Shows a modal error */
                vm.Modal = {
                    msg: 'increments.limits.modal.error',
                    title: 'increments.limits.modal.error.title',
                    button: 'increments.limits.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            });

            // Else, show an error modal
        } else {
                /* Shows a modal error */
                vm.Modal = {
                    msg: 'increments.limits.modal.form.error',
                    title: 'increments.limits.modal.error.title',
                    button: 'increments.limits.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            }
    };

    /* Validates the limits */
    var validateLimits = function validateLimits(limits) {
        var ok = true;
        var scopeForm = $('form').scope().LimitsForm;
        var business = limits.business;
        var staff = limits.staff;
        for (var V in business) {
            var okValue = true;
            var item = business[V];
            // If minValue is equal or greater than medValue and medValue is equal or greater than maxValue, error
            if (item.minValue >= item.medValue || item.medValue >= item.maxValue) {
                ok = false;
                okValue = false;
            }
            var errorField = 'Business.' + V + '.';
            scopeForm[errorField + 'minValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'medValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'maxValue'].$setValidity('business', okValue);
        }
        for (var V in staff) {
            var okValue = true;
            var item = staff[V];
            // If minValue is equal or greater than medValue and medValue is equal or greater than maxValue, error
            if (item.minValue >= item.medValue && item.medValue >= item.maxValue) {
                ok = false;
                okValue = false;
            }
            var errorField = 'Staff.' + V + '.';
            scopeForm[errorField + 'minValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'medValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'maxValue'].$setValidity('business', okValue);
        }
        return ok;
    };

    /** Handles the result of the AJAX request */
    var handleResult = function handleResult(result, removeId) {
        var limits = result.limits;

        vm.positions = { business: {}, staff: {} };
        vm.limits = { business: {}, staff: {} };

        var limitsToSet;
        /* If there are no limits, get the default limits from server */
        if (limits.length === 0) {
            limitsToSet = result.defaultLimits;
            /* If there are limits, creates the objects to show the tables */
        } else {
                limitsToSet = limits;
            }

        // Set the limits on view
        limitsToSet.forEach(function (l) {
            var dest = l.isBusiness ? vm.limits.business : vm.limits.staff;
            dest[l.bandName] = l;
            if (removeId) {
                dest[l.bandName].id = null;
            }
        });
        /* Set showTables to true */
        vm.showTables = true;
    };

    /* Handles an error on WageBandLimitsService request */
    var errorHandler = function errorHandler(error) {
        /* Shows a modal error */
        vm.Modal = {
            msg: 'increments.limits.modal.error',
            title: 'increments.limits.modal.error.title',
            button: 'increments.limits.modal.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
};
angular.module('mentoringApp').controller('WageLimitsController', WageLimitsController);
//# sourceMappingURL=limits.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('WageBandLimitsService', ['$resource', function ($resource) {
	return $resource('api/wageBandLimits/', {}, {
		query: { url: 'api/wageBandLimits/:year/:direction', method: 'GET', isArray: false },
		saveLimits: { method: 'POST' }
	});
}]).factory('DirectionsService', ['$resource', function ($resource) {
	return $resource('api/directions', {}, Mentoring.resourceHandlerGET);
}]);
//# sourceMappingURL=limits.service.js.map

/* jshint -W097 */
/* globals angular*/
'use strict';
angular.module('mentoringApp').config(['$stateProvider', function ($stateProvider) {
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
}]);
//# sourceMappingURL=information.state.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function InformationController($rootScope, $translate, Principal, Directions) {

    var PREFFIX = 'InfoV&Y/';
    var textBusiness = 'information.maps.business.';
    var textStaff = 'information.maps.staff.';
    var vm = this;
    $rootScope.activeOption = 'information';

    vm.imgUrl = [];

    vm.getCompetencesUrl = function (doc) {
        var file = '';
        var lang = $translate.use();
        switch (doc) {
            case 1:
                file = lang === 'es' ? 'COMPETENCIAS_GESTION.PDF' : 'MANAGEMENT-COMPETENCES-VASSIT.PDF';break;
            case 2:
                file = lang === 'es' ? 'COMPETENCIAS_MANDO.PDF' : 'MANAGEMENT&LEADERSHIP-COMPETENCES-VASSIT.PDF';break;
        }
        return PREFFIX + 'PDFs/' + file;
    };

    /** Populates the imgUrl array with the URL of the imgs to show to the employee */
    vm.getMapImgs = function () {
        Principal.identity().then(function (account) {
            // Check the employee organization to add one or another urls
            var organization = account.organization;
            switch (organization) {
                case 'Serbatic':
                    vm.imgUrl.push({ text: $translate.instant(textBusiness + 'Serbatic'), url: PREFFIX + 'IMGs/MapaSerbatic.png' });break;
                case 'VASSDigital':
                    vm.imgUrl.push({ text: $translate.instant(textBusiness + 'VASSDigital'), url: PREFFIX + 'IMGs/MapaVASSDigital.png' });break;
                case 'VASS':
                    vm.imgUrl.push({ text: $translate.instant(textBusiness + 'VASS'), url: PREFFIX + 'IMGs/MapaNegocio_es.png' }, { text: $translate.instant(textStaff + 'VASS'), url: PREFFIX + 'IMGs/MapaStaff_es.png' }, { text: $translate.instant(textBusiness + 'VASSIT'), url: PREFFIX + 'IMGs/MapaNegocio_en.png' }, { text: $translate.instant(textBusiness + 'LATAM'), url: PREFFIX + 'IMGs/MapaNegocio_latam.png' });
            }
        });
    };

    vm.initPopup = function () {
        $('.popup_image').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: false,
            fixedContentPos: true,
            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    };
};
angular.module('mentoringApp').controller('InformationController', InformationController);
//# sourceMappingURL=information.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function CTModelController($rootScope, $log, $state, $stateParams, $q, $translate, $window, Principal, EvaluationsConsultLeader, EmployeeEvaluableIdResource, EmployeeLeaderResource, EmployeesDIRECTOR, LeadersDIRECTOR, EmployeesGERENTE, LeadersGERENTE, EmployeesRRHH, LeadersRRHH, EmpleadosCn, AllocationsLeader, CTModelService) {

    var vm = this;
    $rootScope.activeOption = 'information';

    // Function that inits the values of the controller.
    vm.initCtrl = function () {
        if ($state.current.name !== 'login') {
            $rootScope.activeOption = 'information';
            Principal.identity().then(function (account) {
                if (account == null) {
                    $state.go('login');
                }
                // If the employee is authorized to see the page...
                if (handleRoles(account.roles) || account.isLeader) {
                    vm.linkPDF = 'InfoV&Y/PDFs/COMPONENTES-TEMPERAMENTALES.pdf';
                    if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles)) {
                        vm.leader = {};
                        vm.evaluation = {};
                        vm.empleado = {};
                        vm.empleadoLeaderUser = {};
                        vm.isLeader = account.isLeader;

                        // Handle the visibility permissions
                        if (vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN) {
                            vm.isVisibleMando = true;
                        } else if (vm.roleUSER) {
                            vm.isVisibleLeader = true;
                            vm.empleadosLeaderUser = EvaluationsConsultLeader.query({
                                leaderId: account.employeeId
                            });
                        }

                        if (vm.roleADMIN || vm.roleDIRECTORG) {
                            var promises = [];
                            promises.push(EmployeeEvaluableIdResource.query({}, function (result) {
                                vm.empleados = result;
                            }).$promise);

                            promises.push(EmployeeLeaderResource.query({}, function (result) {
                                vm.leaders = result;
                            }).$promise);

                            // Once all the request have finished, do the combo selection
                            $q.all(promises).then(function () {
                                // If there is a selected employee, only when we come back for consultEvaluation state
                                if (vm.empleado.info) {
                                    vm.change(vm.empleado.info.id);
                                }
                            });
                        }

                        if (vm.roleDIRECTOR) {
                            vm.empleados = EmployeesDIRECTOR.query({
                                directionId: account.employeeId
                            });
                            vm.leaders = LeadersDIRECTOR.query({
                                directionId: account.employeeId
                            });
                        }

                        if (vm.roleGERENTE) {
                            vm.empleados = EmployeesGERENTE.query({
                                managerId: account.employeeId
                            });
                            vm.leaders = LeadersGERENTE.query({
                                managerId: account.employeeId
                            });
                        }

                        if (vm.roleRRHH) {
                            EmployeesRRHH.query(function (result4) {
                                vm.empleados = result4;
                                //busca y recupera el propio usuario para añadirlo a la lista de empleados
                                //los empleados con rol rrhh no ven a los otros de rrhh y asi puede verse a si mismo
                                EmpleadosCn.query({
                                    employeeId: account.employeeId
                                }, function (result) {
                                    angular.forEach(result, function (current) {
                                        if (current.id === account.employeeId) {
                                            vm.empleados.push(current);
                                        }
                                    });
                                });
                            });
                            LeadersRRHH.query(function (result5) {
                                vm.leaders = result5;
                            });
                        }
                    }

                    // Finally, handles the possible state params
                    if ($stateParams.leaderId !== '' && $stateParams.employeeId !== '') {
                        // Obtains both employee and leader ids from the $state params
                        vm.employeeId = parseInt($stateParams.employeeId);
                        vm.leaderId = parseInt($stateParams.leaderId);

                        // Load init information from those values
                        vm.getCTModelsEmployee(vm.employeeId);
                    }
                } else {
                    $log.error('Usuario intentado acceder a un area donde no tiene autorizacion -> ' + $state.current.name);
                    $state.go('home');
                }
            });
        }
    };

    // Handles the change on employees combo.
    vm.getCTModelsEmployee = function (employeeId) {
        // If there is an employee selected, obtains the CT Results.
        if (employeeId) {
            // Stores the employeeId, we can use it later when reloading the page after a ct result save
            vm.employeeId = employeeId;
            CTModelService.getByEmployeeId({ employeeId: employeeId }, handleCTResultsResponse);
            // If there is no employee selected, first check if there was a leader selected.
            // In this case do the same as if the user has selected that leader id.
        } else if (!Mentoring.isUndefinedOrNull(vm.leaderId)) {
                vm.changeEvaluator(vm.leaderId);
                // Otherwise, empty the resuts table.
            } else {
                    vm.CTResults = null;
                }
    };

    // Handles the changes on the evaluator combo
    vm.changeEvaluator = function (leaderId) {
        // Stores the selected leader id because we may need it later, in the case that the user selects an empty
        // option on employees combo.
        vm.leaderId = leaderId;

        vm.autoEvaluation = null;
        vm.finalEvaluation = null;
        // Check if we have a copy of all the employee combo list before doing nothing
        if (Mentoring.isUndefinedOrNull(vm.empleadosCopy)) {
            vm.empleadosCopy = angular.copy(vm.empleados);
        }
        // If there is no leaderId selected, the employees combo should be filled with all the employees
        if (Mentoring.isUndefinedOrNull(leaderId)) {
            vm.empleados = vm.empleadosCopy;
        } else {
            // Obtains leader CT evaluations to be shown in the table
            CTModelService.getLeaderEvaluations({ leaderId: leaderId }, handleCTResultsResponse);

            // Obtains the leader allocation to handle the employee combo
            AllocationsLeader.query({ leaderId: leaderId }, function (result) {
                var emps = [];
                for (var i = 0, len = result.length; i < len; i++) {
                    emps.push(result[i].employeeId);
                }
                vm.empleados = vm.empleadosCopy.filter(function (emp) {
                    return emps.indexOf(emp.id) >= 0;
                });
            });
        }
    };

    // Handles the click event on a CTResult
    vm.showResult = function (result) {
        // Initialize variables
        vm.newCtResult = false;
        vm.CTResult = result;
        prepareShowCTResult();

        // Delete previous selected rows§
        vm.CTResults.map(function (r) {
            delete r.selected;
        });
        // Select the current row
        result.selected = true;

        // Obtains the answers
        CTModelService.getCTAnswers({ employeeId: result.employeeId, answersId: result.answersId }, function (result) {
            var _loop = function (r, l) {
                var res = result[r];
                // Iterate over vm.Questions to obtain the question object of the current answer
                vm.Questions.filter(function (q) {
                    return q.id === res.ctQuestion.id;
                }).map(function (q) {
                    // Once we have the Question, iterate over vm.Answers to know which label it should have§
                    for (var a = 0, la = vm.Answers.length; a < la; a++) {
                        var ans = vm.Answers[a];
                        // If the Answer defind value it's the same as the iterated answer,
                        // assign Answer label to Question Object
                        if (ans.value === res.value) {
                            q.value = ans.label;
                            break;
                        }
                    }
                });
            };

            // Iterate over all the answers to obtain its question from vm.Questions
            for (var r = 0, l = result.length; r < l; r++) {
                _loop(r, l);
            }
        });
    };

    // Handles the neccesary steps to create a new CT Result evaluation.
    vm.newCTResult = function () {
        // Flag to mark the CTResult as new.
        vm.newCtResult = true;
        vm.ResultEvaluation = null;
        vm.CTResults.map(function (r) {
            delete r.selected;
        });
        prepareShowCTResult();

        // Creates the object that will hold the CT Result values
        vm.CTResult = {
            employeeId: vm.empleado.info.employeeId
        };
    };

    // Calculates the result of a CT Evaluation
    vm.calculateCTResult = function () {
        // Calculate the result
        var result = prepareInputObject();
        if (!result) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.combo';
            $('#myModal').modal('show');
            return;
        }

        CTModelService.obtainResult(vm.CTResult, function (result) {
            // Creates the ResultEvaluation object
            vm.ResultEvaluation = {
                principal: result.principal,
                second: result.second,
                third: result.third,
                control: result.control
            };

            // Get the styles
            vm.ResultEvaluation.principal['class'] = getStyle(vm.ResultEvaluation.principal.key);
            vm.ResultEvaluation.second['class'] = getStyle(vm.ResultEvaluation.second.key);
            vm.ResultEvaluation.third['class'] = getStyle(vm.ResultEvaluation.third.key);

            // Calculates Control label
            var control = vm.ResultEvaluation.control;
            if (control <= 3) {
                control = 'information.ct.control.muybajo';
            } else if (control >= 4 && control <= 6) {
                control = 'information.ct.control.mediobajo';
            } else if (control >= 7 && control <= 9) {
                control = 'information.ct.control.medio';
            } else if (control >= 10 && control <= 13) {
                control = 'information.ct.control.medioalto';
            } else {
                control = 'information.ct.control.alto';
            }
        }, function (error) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.calculate';
            $('#myModal').modal('show');
        });
    };

    // Saves a CT Result
    vm.saveCTResult = function () {
        // First, prepare the input object
        var result = prepareInputObject();
        if (!result) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.combo';
            $('#myModal').modal('show');
            return;
        }

        // Finally, dispatch the request
        CTModelService.saveCTResult(vm.CTResult, function (result) {
            defaultMsgModal();
            vm.Modal.title = 'information.ct.modal.success.title';
            vm.Modal.msg = 'information.ct.modal.success.save';
            vm.Modal.action = function () {
                $state.go($state.current, { leaderId: vm.leaderId, employeeId: vm.employeeId }, { reload: true, notify: true });
            };
            $('#myModal').modal('show');
        }, function (error) {
            defaultMsgModal();
            vm.Modal.msg = 'information.ct.modal.error.save';
            $('#myModal').modal('show');
        });
    };

    // Prepares an object ready to be sent to the server
    var prepareInputObject = function prepareInputObject() {
        var questionsAux = angular.copy(vm.Questions);

        // Validates the form
        var error = false;
        vm.Questions.map(function (q) {
            if (Mentoring.isUndefinedOrNull(q.value) || q.value === '?') {
                q.styleClass = 'ct-model-error';
                error = true;
            } else {
                q.styleClass = '';
            }
        });
        // If there is a validation error, return false
        if (error) {
            return false;
        }

        // Otherwise, process the object
        vm.CTResult.answers = [];
        // First, adds the answer values to the object
        vm.Questions.map(function (q) {
            var value = q.value;
            delete q.value;
            vm.CTResult.answers.push({
                ctQuestion: {
                    id: q.id,
                    ctModel: {
                        id: q.ctModel.id
                    } },
                value: value
            });
        });

        vm.Questions = angular.copy(questionsAux);
        return true;
    };

    // Handles a server response containing CTResults.
    var handleCTResultsResponse = function handleCTResultsResponse(result) {
        vm.CTResults = [];
        result.map(function (r) {
            var employee = r.employee.firstSurname + ' ' + r.employee.secondSurname + ', ' + r.employee.name;
            var leader = r.leader.firstSurname + ' ' + r.leader.secondSurname + ', ' + r.leader.name;

            // Calculates Control label
            var control = r.control;
            if (control <= 3) {
                control = 'information.ct.control.muybajo';
            } else if (control >= 4 && control <= 6) {
                control = 'information.ct.control.mediobajo';
            } else if (control >= 7 && control <= 9) {
                control = 'information.ct.control.medio';
            } else if (control >= 10 && control <= 13) {
                control = 'information.ct.control.medioalto';
            } else {
                control = 'information.ct.control.alto';
            }

            // Push the result in the results array
            vm.CTResults.push({
                employeeId: r.employee.id, answersId: r.answersId,
                principal: r.principal.key, second: r.second.key, third: r.third.key, control: control,
                principalClass: getStyle(r.principal.key),
                secondClass: getStyle(r.second.key),
                thirdClass: getStyle(r.third.key),
                date: r.dateAdd, employee: employee, leader: leader
            });
        });
    };

    // Prepares the controller for show a CTResult, wheter is a new one or a saved one.
    var prepareShowCTResult = function prepareShowCTResult() {
        // Creates the Answers object that will contain the combo options.
        if (vm.Answers === undefined) {
            vm.Answers = [{ value: 2, label: $translate.instant('information.ct.answer.yes') }, { value: 0, label: $translate.instant('information.ct.answer.no') }, { value: 1, label: $translate.instant('information.ct.answer.na') }];
        }

        // Obtains the questions
        vm.Questions = [];
        vm.Models = {};
        // If the questions hasn't been obtained before, get them!
        if (vm.Questions.length === 0) {
            CTModelService.getQuestions({}, function (result) {
                vm.Questions = result;
                result.map(function (q) {
                    switch (q.ctModel.id) {
                        case 1:
                            vm.Models.red = q.ctModel;break;
                        case 2:
                            vm.Models.yellow = q.ctModel;break;
                        case 3:
                            vm.Models.blue = q.ctModel;break;
                        case 4:
                            vm.Models.green = q.ctModel;break;
                        case 5:
                            vm.Models.orange = q.ctModel;break;
                        case 6:
                            vm.Models.pink = q.ctModel;break;
                        case 7:
                            vm.Models.grey = q.ctModel;break;
                    }
                });
            });
        };
    };

    /* Prepares Model object with default variables */
    var defaultMsgModal = function defaultMsgModal() {
        vm.Modal = {
            title: 'information.ct.modal.error.title',
            button: 'information.ct.modal.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
    };

    /* Creates the roles values for the controller and returns if the role is valid for access the page */
    var handleRoles = function handleRoles(roles) {
        vm.roleUSER = roles.indexOf('ROLE_USER') > -1;
        vm.roleRRHH = roles.indexOf('ROLE_RRHH') > -1;
        vm.roleGERENTE = roles.indexOf('ROLE_GERENTE') > -1;
        vm.roleDIRECTOR = roles.indexOf('ROLE_DIRECTOR') > -1;
        vm.roleDIRECTORG = roles.indexOf('ROLE_DIRECTORG') > -1;
        vm.roleADMIN = roles.indexOf('ROLE_ADMIN') > -1;

        return vm.roleADMIN || vm.roleRRHH || vm.roleGERENTE || vm.roleDIRECTOR || vm.roleDIRECTORG;
    };

    // Returns the correpondant css class for a given component key
    var getStyle = function getStyle(item) {
        if (item.indexOf('red') > -1) {
            return 'circle-red';
        } else if (item.indexOf('yellow') > -1) {
            return 'circle-yellow';
        } else if (item.indexOf('blue') > -1) {
            return 'circle-blue';
        } else if (item.indexOf('green') > -1) {
            return 'circle-green';
        } else if (item.indexOf('orange') > -1) {
            return 'circle-orange';
        } else if (item.indexOf('pink') > -1) {
            return 'circle-pink';
        } else if (item.indexOf('grey') > -1) {
            return 'circle-grey';
        }
    };

    /* Inits the controller */
    vm.initCtrl();
};
angular.module('mentoringApp').controller('CTModelController', CTModelController);
//# sourceMappingURL=CTModel.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('CTModelService', ['$resource', function ($resource) {
       return $resource('api/CTResults', {}, {
              getQuestions: { url: 'api/CTResults/questions', method: 'GET', isArray: true },
              getByEmployeeId: { url: 'api/CTResults/:employeeId', method: 'GET', isArray: true },
              getLeaderEvaluations: { url: 'api/CTResults/leader/:leaderId', method: 'GET', isArray: true },
              saveCTResult: { method: 'POST' },
              getCTAnswers: { url: 'api/CTAnswers/:employeeId/:answersId', method: 'GET', isArray: true },
              obtainResult: { url: 'api/CTResults/calculate', method: 'POST' }
       });
}]);
//# sourceMappingURL=CTModel.service.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function AssignCompetencesValues($rootScope, $filter, $log, $sce, $state, $translate, Principal, PositionService, WageBandService, WeightQuestionService, StatesResource) {

    var vm = this;
    var positionsCopy;

    // Function that inits the values of the controller.
    vm.initCtrl = function () {
        if ($state.current.name != 'login') {
            Principal.identity().then(function (account) {
                if ($rootScope.roleRRHH || $rootScope.roleAdmin) {
                    vm.wageBand = null;
                    vm.position = null;

                    // Obtains the values for the positions combo and wageBands combo.
                    PositionService.query({}, function (result) {
                        // Iterate over all the positions to add the description to its name
                        // We do this instead of using a filter on the combo because this way there is less watchers
                        // on the page, thus the performance it's better
                        vm.positions = result.map(function (res) {
                            var name = $translate.instant(res.description) + ' - ' + $translate.instant(res.nameKey);
                            res.name = name;
                            return res;
                        });
                    });
                    WageBandService.query({}, function (result) {
                        // Iterate over all the wageBands to obtain all the wageBands which are not outsourcing and to
                        // mark the staff wage bands. We do this for the same reason as above.
                        vm.wageBands = result.filter(function (wb) {
                            return wb.outsourcing === 0;
                        }).map(function (wb) {
                            if (wb.business === 0) {
                                wb.name = wb.name + ' Staff';
                            }
                            return wb;
                        });
                    });
                } else {
                    $log.error('Usuario intentado acceder a un area donde no tiene autorizacion -> ' + $state.current.name);
                    $state.go('home');
                }
            });
            vm.Modal = {};
        }
    };

    // Handles the value change on the wageBand combo
    vm.changeWageBandCombo = function () {
        // First check is there is a copy of all the positions in memory
        if (Mentoring.isUndefinedOrNull(positionsCopy)) {
            positionsCopy = angular.copy(vm.positions);
        }

        // If no wageBand selected, show all the positions
        if (Mentoring.isUndefinedOrNull(vm.wageBand)) {
            vm.positions = angular.copy(positionsCopy);
        } else {
            vm.positions = positionsCopy.filter(function (pos) {
                return pos.wageBandId === vm.wageBand.id;
            });
        }
    };

    // Handles the value change on the position combo
    vm.changePositionCombo = function () {
        if (!Mentoring.isUndefinedOrNull(vm.position)) {
            // Obtains the values for the weight questions combo
            if (Mentoring.isUndefinedOrNull(vm.states)) {
                StatesResource.query({}, function (result) {
                    vm.states = result;
                    // Iterate over the states to get its tranlation
                    vm.states.map(function (s) {
                        var key = 'Estado' + s.id;
                        s.text = $translate.instant(key);
                    });
                    // Once we have the states we could request the weightQuestions
                    getWeightQuestions();
                });
            } else {
                getWeightQuestions();
            }
        }
    };

    // Saves the weight question values for a given position
    vm.saveWeightQuestions = function () {
        // First of all, make a copy of all questions to recover them later
        var wqAux = angular.copy(vm.weightQuestions);

        // Obtains the total sum of the values
        var totalSum = 0;
        vm.weightQuestions.map(function (wq) {
            // As we are iterating over the weight questions, we also delete the statedId variable which is
            // not present on the Java bean.
            delete wq.stateId;
            totalSum += wq.value;
        });

        // Validate the answers first
        if (vm.weightQuestions.length === 25 && totalSum !== 57 || vm.weightQuestions.length === 18 && totalSum !== 42) {
            showModal({ msg: 'assign.competences.modal.error.sum',
                title: 'assign.competences.modal.error.form.title' });

            // Finally, recover the question weights
            vm.weightQuestions = angular.copy(wqAux);
            return;
        }

        // Save the answers
        WeightQuestionService.saveWeightQuestions(vm.weightQuestions, function (result) {
            showModal({ msg: 'assign.competences.modal.save.ok',
                title: 'assign.competences.modal.save.ok.title' });
        }, function (error) {
            showModal({ msg: 'assign.competences.modal.save.error',
                title: 'assign.competences.modal.save.error' });
        });

        // Finally, recover the question weights
        vm.weightQuestions = angular.copy(wqAux);
    };

    vm.getQuestionCode = function (questionCode) {
        vm.codePregunta = questionCode;
        vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
    };

    var getWeightQuestions = function getWeightQuestions() {
        WeightQuestionService.getByPositionId({ positionId: vm.position.id }, function (result) {
            // Iterate over the weight questions to obtain its competence and pillar name
            var competenceId = 0;
            var pillarId = 0;
            var year = undefined;
            result.map(function (wq) {
                vm.locked = wq.locked === 1 ? true : false;
                year = wq.year;
                if (competenceId !== wq.question.competence.competenceCode) {
                    var competenceStr = 'evaluation.' + wq.question.competence.competenceCode;
                    competenceId = wq.question.competence.competenceCode;
                    wq.competence = $filter('translate')(competenceStr);
                }
                if (pillarId !== wq.question.pillar.pillarCode) {
                    pillarId = wq.question.pillar.pillarCode;
                    var pillarStr = 'evaluation.' + wq.question.pillar.pillarCode;
                    wq.pillar = $filter('translate')(pillarStr);
                }
                wq.stateId = '' + wq.value;
            });
            vm.weightQuestions = result;

            // Now check, if the year of the position is the same as the current year
            var now = new Date();
            vm.sameYear = year === now.getFullYear();
        });
    };

    vm.changeState = function (wq) {
        wq.value = parseInt(wq.stateId);
    };

    var showModal = function showModal(opts) {
        if (Mentoring.isUndefinedOrNull(vm.Modal)) {
            vm.Modal = {};
        }
        vm.Modal.msg = opts.msg;
        vm.Modal.title = opts.title;
        vm.Modal.button = opts.button || 'assign.competences.modal.ok', vm.Modal.action = opts.action || function () {
            $('#myModal').modal('hide');
        };
        $('#myModal').modal('show');
    };

    // Init the controller
    vm.initCtrl();
}

// Custom filter to show only specific competences values on the combos
function CustomCompetencesFilter() {
    return function (items, n, question) {
        // Array which will contains the filter values
        var filtered = [];

        // Iterate over all items to process it
        items.map(function (item) {
            // Obtains the competence id
            var compId = question.question.competenceId;
            // If competence = Etica, show only 4 and 6
            if (compId === 3) {
                if (item.id === 4 || item.id === 6) {
                    filtered.push(item);
                }
                // Otherwise, show 1, 3 and 5
            } else {
                    if (item.id === 1 || item.id === 3 || item.id === 5) {
                        filtered.push(item);
                    }
                }
        });
        // Return the filteres list of values
        return filtered;
    };
};
angular.module('mentoringApp').controller('AssignCompetencesController', AssignCompetencesValues);
angular.module('mentoringApp').filter('customCompetencesFilter', CustomCompetencesFilter);
//# sourceMappingURL=assignCompetenceValues.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PositionService', ['$resource', function ($resource) {
  return $resource('api/positions', {}, { query: { method: 'GET', isArray: true }
  });
}]).factory('WeightQuestionService', ['$resource', function ($resource) {
  return $resource('api/weightQuestions', {}, { getByPositionId: { url: 'api/weightQuestions/:positionId', isArray: true },
    saveWeightQuestions: { method: 'POST' }
  });
}]);
//# sourceMappingURL=assignCompetenceValues.service.js.map
