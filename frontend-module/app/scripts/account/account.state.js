/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp').config(function ($stateProvider) {
	$stateProvider
		.state('account', {
			abstract: true,
			parent: 'site'
		});
});