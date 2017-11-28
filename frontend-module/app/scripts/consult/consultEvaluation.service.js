/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp')
.factory('EmpleadosAE', function ($resource) {
	return $resource('api/allocationLeaderDate/:leaderId', {}, Mentoring.resourceHandler);
})
.factory('SharingEvaluationService', function() {
	return {
		setId: function(id) {
			this.id = id;
		},
		getId: function() {
			return this.id;
		},
		setModification: function(esModificable) {
			this.esModificable = esModificable;
		},
		getModification: function() {
			return this.esModificable;
		},
		setEvaluado: function(evaluado) {
			this.evaluado = evaluado;
		},
		getEvaluado: function() {
			return this.evaluado;
		}
	};
});