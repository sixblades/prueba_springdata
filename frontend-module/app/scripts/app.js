/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp', 
	['LocalStorageModule', 'tmh.dynamicLocale', 'ngResource', 'ui.router', 'ngCookies', 'pascalprecht.translate',
		'ngCacheBuster', 'infinite-scroll', 'tc.chartjs', 'ct.ui.router.extras', 'ngSanitize']);