/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('CTModelService', function ($resource) {
	return $resource('api/CTResults', {}, {
        getQuestions: {url: 'api/CTResults/questions', method: 'GET', isArray: true},
        getByEmployeeId: {url: 'api/CTResults/:employeeId', method: 'GET', isArray: true},
        getLeaderEvaluations: {url: 'api/CTResults/leader/:leaderId', method: 'GET', isArray: true},
        saveCTResult: {method: 'POST'},
        getCTAnswers: {url: 'api/CTAnswers/:employeeId/:answersId', method: 'GET', isArray: true},
        obtainResult: {url: 'api/CTResults/calculate', method: 'POST'}
    });
});