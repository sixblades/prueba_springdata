/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/* globals angular */
angular.module('mentoringApp').run(function ($rootScope, $window, $state, $translate, Auth, Principal, Language, AuditService, ENV, VERSION) {
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
});
//# sourceMappingURL=app.run.js.map
