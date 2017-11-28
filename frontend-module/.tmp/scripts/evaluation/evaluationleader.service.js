/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('AnswersResourceEL', function ($http) {
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
});
//# sourceMappingURL=evaluationleader.service.js.map
