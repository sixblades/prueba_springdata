/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';

angular.module('mentoringApp').factory('EmployeesEvaluationService', function ($resource) {
	return $resource('api/employeesEvaluation/:areaId/:year', {}, {
		'get': {method: 'GET', isArray: true},
		'getAllEvaluations' : {url:'api/employeesEvaluationAll/:year', method:'GET', isArray: true}
	});
})