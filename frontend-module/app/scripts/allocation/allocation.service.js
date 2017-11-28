/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp')
.factory('Allocations', ["$resource", function ($resource) {
	return $resource('api/allocation/:employeeId', {}, Mentoring.resourceHandler);
}])
.factory('CurrentAllocation', ["$resource", function ($resource) {
	return $resource('api/allocation/current/:employeeId', {}, Mentoring.resourceHandler);
}])
.factory('AllocationsLeader', ["$resource", function ($resource) {
	return $resource('api/allocationLeader/:leaderId', {}, Mentoring.resourceHandler);
}])
.factory('AllocationsLE', ["$resource", function ($resource) {
	return $resource('api/allocationLE/:leaderId/:employeeId', {}, Mentoring.resourceHandler);
}])
.factory('AllocationSave', ["$resource", function ($resource) {
	return $resource('api/allocation', {}, {
		'guardar': { method: 'POST' },
		'update': {url: 'api/updallocation', method: 'PUT'}
	});
}])
.factory('Allocation', function () {
	return {
		agrupar: function (id, empleado, mando, fecha) {
			var respuestaJSON = {
				id: id,
				employeeId: empleado,
				leaderId: mando,
				dateFrom: fecha
			};
			return angular.toJson(respuestaJSON);
		},
		actualizarFecha: function (date) {
			$('#dateFrom').datepicker('option', 'minDate', new Date(date));
		}
	};
});	

