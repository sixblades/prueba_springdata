/* jshint -W097 */
/* globals angular, $ */
'use strict';
angular.module('mentoringApp').factory('EmployeesCategoryByYear', function ($resource) {
	return $resource('api/employeeCatYear/:dateFrom', {}, Mentoring.resourceHandlerGET);
})
.factory('Directions', ($resource) => {
    return $resource('api/directions', {}, {
		query: { method: 'GET', isArray: true}
    });
})
.factory('EmployeeMultiple', ($resource) => {
    return $resource('api/employeeCatYear', {}, {
        getMultipleData: {method: 'POST', isArray: true},
        saveConfirmedData: {url:'api/employeeCatYear/confirmed/:directionId', method: 'POST'},
        saveIncreases: {url:'api/employeeCatYear/increases', method:'POST'}
    });
})
.factory('Areas', ($resource) => {
    return $resource('api/area', {}, {
		query: { method: 'GET', isArray: true },
        getArea: {url: 'api/area/:areaId'},
        getDirectionAreas: {url: 'api/area/direction/:directionId', isArray: true}
    })
});