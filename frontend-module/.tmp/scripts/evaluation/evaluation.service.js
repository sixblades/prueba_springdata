/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';

angular.module('mentoringApp').factory('CalculateEvaluationResult', function ($resource) {
	return $resource('api/calculateEvaluationResult/:employeeId/:evaluationId/:year', {}, {
		'get': { method: 'GET' }
	});
}).factory('EmpleadosAE', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
}).factory('EmpleadosEvaluables', function ($resource) {
	return $resource('api/employeeEvaluable', {}, Mentoring.resourceHandler);
}).factory('LastEvaluationAssigned', function ($resource) {
	return $resource('api/lastEvalAssigned/:employeeId/:leaderId', {}, {
		'get': { method: 'GET' }
	});
}).factory('LastEvaluationAssignedWithEvalType', function ($resource) {
	return $resource('api/lastEvalAssignedWithEvalType/:employeeId/:leaderId/:evaluationType', {}, {
		'get': { method: 'GET' }
	});
}).factory('AnswersSelect', function ($resource) {
	return $resource('api/answersSelect/:id', {}, Mentoring.resourceHandler);
}).factory('EvaluationId', function ($resource) {
	return $resource('api/evaluationId/:id', {}, Mentoring.resourceHandler);
}).factory('isEvaluationDate', function ($resource) {
	return $resource('api/isEvaluationDate', {}, Mentoring.resourceHandlerGET);
}).factory('EvaluationYear', function ($resource) {
	return $resource('api/evaluationYear', {}, Mentoring.resourceHandlerGET);
}).factory('isFinalEvaluationDate', function ($resource) {
	return $resource('api/isFinalEvaluationDate', {}, Mentoring.resourceHandlerGET);
}).factory('getFinalEvaluationDate', function ($resource) {
	return $resource('api/isEvaluationDate', {}, {
		getDateFinalEvaluationFrom: { url: 'api/evaluationFinalDateFrom', method: 'get' },
		getDateFinalEvaluationTo: { url: 'api/evaluationFinalDateTo', method: 'get' },
		isFinalEvaluationDate: { url: 'api/isFinalEvaluationDate', method: 'get' }
	});
}).factory('GetLastAutoEvalByEmployeeId', function ($resource) {
	return $resource('api/getLastAutoEvalByEmployeeId/:employeeId', {}, Mentoring.resourceHandler);
}).factory('AnswersEval', function ($http) {
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
}).factory('SharingEvaluationService', function () {
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
