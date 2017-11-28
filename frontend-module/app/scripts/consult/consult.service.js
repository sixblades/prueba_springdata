/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('EmpleadosCn', function ($resource) {
	return $resource('api/employee/:id', {}, 
        {query: { method: 'GET', isArray: true },
        getEmployeeInfo: {isArray:false},
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' }});
})
.factory('EmployeesDirector', function ($resource) {
	return $resource('api/employeesDirector/:directionId', {}, Mentoring.resourceHandler);
})
.factory('AnswersResource', function ($resource) {
	return $resource('api/answerss/:id', {}, Mentoring.resourceHandler);
})
.factory('CompetencesResource', function ($resource) {
	return $resource('api/competences/:id', {}, Mentoring.resourceHandler);
})
.factory('EmployeeEvaluableIdResource', function ($resource) {
	return $resource('api/employeeEvaluable/:id', {}, Mentoring.resourceHandler);
})
.factory('EmployeeLeaderResource', function ($resource) {
	return $resource('api/employeeLeader/', {}, Mentoring.resourceHandler);
})
.factory('EmployeeIsLeaderResource', function ($resource) {
	return $resource('api/isleader/:employeeId', {}, Mentoring.resourceHandlerGETNoTransform);
})
.factory('EmployeeEvaluationResource', function ($resource) {
	return $resource('api/evaluation/:employeeId', {},
        {query: { method: 'GET', isArray: true },
        getEvaluation: {url:'api/evaluation/:employeeId/:evaluationId', isArray:false},
		get: {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' }});
})
.factory('EvaluationEmployeeLeaderResource', function ($resource) {
	return $resource('api/evaluationEmpLea/:employeeId/:leaderId', {}, Mentoring.resourceHandler);
})
.factory('PillarsResource', function ($resource) {
	return $resource('api/pillars/:id', {}, Mentoring.resourceHandler);
})
.factory('QuestionsResource', function ($resource) {
	return $resource('api/questionss/:id', {}, {
		query: { method: 'GET', isArray: true },
		get: {
			method: 'GET',
			transformResponse: function (data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' }
	});
})
.factory('StatesResource', function ($resource) {
	return $resource('api/statess/:id', {}, Mentoring.resourceHandler);
})
.factory('EvaluationsAllEmployees', function ($resource) {
	return $resource('api/allEvaluations/:employeeId/', {}, Mentoring.resourceHandler);
})
.factory('EvaluationsCn', function ($resource) {
	return $resource('api/autoevaluation/:employeeId/:leaderId', {}, Mentoring.resourceHandler);
})
.factory('EvaluationsMandoCn', function ($resource) {
	return $resource('api/evaluationLeader/:leaderId', {}, Mentoring.resourceHandler);
})
.factory('EvaluationsConsultLeader', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
})
.factory('EmployeesDIRECTOR', function ($resource) {
	return $resource('api/employeesDirector/:directionId', {}, Mentoring.resourceHandler);
})
.factory('LeadersDIRECTOR', function ($resource) {
	return $resource('api/leadersDirector/:directionId', {}, Mentoring.resourceHandler);
})
.factory('EmployeesGERENTE', function ($resource) {
	return $resource('api/employeesGerente/:managerId', {}, Mentoring.resourceHandler);
})
.factory('LeadersGERENTE', function ($resource) {
	return $resource('api/leadersGerente/:managerId', {}, Mentoring.resourceHandler);
})
.factory('EmployeesRRHH', function ($resource) {
	return $resource('api/employeesRrhh/:id', {}, Mentoring.resourceHandler);
})
.factory('LeadersRRHH', function ($resource) {
	return $resource('api/leadersRrhh/:id', {}, Mentoring.resourceHandler);
})
.factory('IsModificableService', function () {
	return {
		modificable: function (account, evaluation, currentYear, IsAutoEvaluationDate, IsFinalDate, roleRRHH, roleDIRECTORG, roleADMIN) {
			/// If the current employee is the same as the evaluation's employee.. 
			if (account.employeeId === evaluation.employeeId) {
				let date = new Date(evaluation.creationDate);
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
				let evalDate = new Date(evaluation.creationDate);
				let evalYear = evalDate.getFullYear();
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