/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PositionIncreases', function ($resource) {
    return $resource('api/positionIncreases/', {}, {
        getYears: { url: 'api/positionIncreases/years', method: 'GET', isArray: true },
        query: { url: 'api/positionIncreases/:year/:direction', method: 'GET', isArray: false },
        savePositions: { url: 'api/positionIncreases/:direction', method: 'POST' }
    });
}).factory('WageBandService', function ($resource) {
    return $resource('api/wageBand', {}, {
        query: { method: 'GET', isArray: true }
    });
}).factory('WageBandPositionService', function ($resource) {
    return $resource('api/wageBandPositions', {}, {
        query: { method: 'GET', isArray: true }
    });
}).factory('EvaluationMarkService', function ($resource) {
    return $resource('api/evaluationMarks', {}, {
        query: { method: 'GET', isArray: true }
    });
});
//# sourceMappingURL=increments.service.js.map
