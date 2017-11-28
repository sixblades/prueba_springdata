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