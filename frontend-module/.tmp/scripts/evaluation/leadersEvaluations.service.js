/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('LeadersEvaluationsService', function ($resource) {
			return $resource('api/leadersEvaluation/:leaderId/:year', {}, {
						'getLeadersEvaluations': { method: 'GET', isArray: true }
			});
});
//# sourceMappingURL=leadersEvaluations.service.js.map
