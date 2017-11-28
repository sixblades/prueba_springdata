/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('EmpleadosRL', function ($resource) {
	return $resource('api/employeeRol/:id', {}, Mentoring.resourceHandler);
}).factory('Roles', function ($resource) {
	return $resource('api/tAuthority/:id', {}, Mentoring.resourceHandler);
}).factory('Guardar', function ($http) {
	return {
		guardar: function guardar(datos) {
			return $http.post('api/userauth', datos, {}).success(function (response) {
				return response;
			});
		},
		agrupar: function agrupar(userId, authorityName) {
			var respuestaJSON = {
				userId: userId,
				authorityName: authorityName
			};
			return angular.toJson(respuestaJSON);
		}
	};
}).factory('Borrar', function ($resource) {
	return $resource('api/userauthDelete/:id', {}, {
		'query': { method: 'GET', isArray: true },
		'get': {
			method: 'GET',
			transformResponse: function transformResponse(data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		'borrar': { method: 'DELETE' }
	});
}).factory('RolesUsuario', function ($resource) {
	return $resource('api/userauth/:userId', {}, Mentoring.resourceHandler);
});
//# sourceMappingURL=roles.service.js.map
