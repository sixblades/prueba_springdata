/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('PositionService', ($resource) => {
	return $resource('api/positions', {}, 
        {query: { method: 'GET', isArray: true }
	});
}).factory('WeightQuestionService', ($resource) => {
   return $resource('api/weightQuestions', {}, 
         {getByPositionId: {url: 'api/weightQuestions/:positionId', isArray: true},
         saveWeightQuestions: {method: 'POST'}        
    });
});