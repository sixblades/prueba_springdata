/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('ConsultEvaluationAutoevaluationService', function ($resource) {
	return $resource('api/consultEvaluationAutoevaluation/:employeeId/:year', {}, Mentoring.resourceHandler);
});
//# sourceMappingURL=consultEvaluationAutoevaluation.service.js.map
