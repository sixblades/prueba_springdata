/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp')
	/* Configuracion del decorator del servicio $log */
	.config(function ($provide) {
		$provide.decorator('$log', function ($delegate) {
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
				let auditObj = {
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
		});
	})

	/* Configuracion de estados, HTTP e idiomas */
	.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider, httpRequestInterceptorCacheBusterProvider) {
		/* Configuracion de CSRF, cookie y nombre cabecera*/
		$httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

		// alternatively, register the interceptor via an anonymous factory
		$httpProvider.interceptors.push(function ($q, $log) {
			return {
				'responseError': function (response) {
					if (window.location.href.indexOf('login') < 0) {
						$log.error(response.config.url +' - ' + response.status + ' ' + response.statusText + ': ' + response.data.msg);
					}
					return $q.reject(response);
				}
			};
		});

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
				translatePartialLoader: ['$translate', '$translatePartialLoader',
					function ($translate,
						$translatePartialLoader) {
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
				authorize: ['Auth',
					function (Auth) {
						return Auth.authorize();
					}],
				translatePartialLoader: ['$translate', '$translatePartialLoader',
					function ($translate,
						$translatePartialLoader) {
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
				mainTranslatePartialLoader: ['$translate', '$translatePartialLoader',
					function ($translate, $translatePartialLoader) {
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

	})
	/* Configuracion del locale dinamico */
	.config(function (tmhDynamicLocaleProvider) {
		tmhDynamicLocaleProvider
			.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
		tmhDynamicLocaleProvider
			.useCookieStorage('NG_TRANSLATE_LANG_KEY');
	});