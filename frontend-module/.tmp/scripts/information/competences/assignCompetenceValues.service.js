/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PositionService', function ($resource) {
  return $resource('api/positions', {}, { query: { method: 'GET', isArray: true }
  });
}).factory('WeightQuestionService', function ($resource) {
  return $resource('api/weightQuestions', {}, { getByPositionId: { url: 'api/weightQuestions/:positionId', isArray: true },
    saveWeightQuestions: { method: 'POST' }
  });
});
//# sourceMappingURL=assignCompetenceValues.service.js.map
