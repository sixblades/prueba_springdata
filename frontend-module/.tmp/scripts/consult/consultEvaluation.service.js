/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('EmpleadosAE', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
}).factory('SharingEvaluationService', function () {
	return {
		setId: function setId(id) {
			this.id = id;
		},
		getId: function getId() {
			return this.id;
		},
		setModification: function setModification(esModificable) {
			this.esModificable = esModificable;
		},
		getModification: function getModification() {
			return this.esModificable;
		},
		setEvaluado: function setEvaluado(evaluado) {
			this.evaluado = evaluado;
		},
		getEvaluado: function getEvaluado() {
			return this.evaluado;
		}
	};
});
//# sourceMappingURL=consultEvaluation.service.js.map
