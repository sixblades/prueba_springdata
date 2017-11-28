/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PrintService', function ($http) {
	return {
		print: function print(datos) {
			$http.post('api/logs', datos, {}).success(function (response) {
				return response;
			});
		}
	};
}).factory('LogsService', function ($resource) {
	return $resource('api/logs', {}, {
		'findAll': { method: 'GET', isArray: true },
		'changeLevel': { method: 'PUT' }
	});
});
//# sourceMappingURL=logs.service.js.map
