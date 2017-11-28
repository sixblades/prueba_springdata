/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('WageBandLimitsService', function ($resource) {
	return $resource('api/wageBandLimits/', {}, {
		query: { url: 'api/wageBandLimits/:year/:direction', method: 'GET', isArray: false },
		saveLimits: { method: 'POST' }
	});
}).factory('DirectionsService', function ($resource) {
	return $resource('api/directions', {}, Mentoring.resourceHandlerGET);
});
//# sourceMappingURL=limits.service.js.map
