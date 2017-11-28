/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('Employees', function ($resource) {
  return $resource('api/employee', {}, Mentoring.resourceHandlerGET);
}).factory('EmployeesCategory', function ($resource) {
  return $resource('api/employeeCatId/:employeeId', {}, Mentoring.resourceHandlerGET);
}).factory('Retribution', function ($resource) {
  return $resource('api/retributions', {}, {
    get: { method: 'GET', url: 'api/retributions/:retributionId', params: {}, isArray: false },
    getEmployeeInfo: { method: 'GET', url: 'api/retributions/employeeInfo/:employeeId/:categoryId/:year', isArray: false }
  });
});
//# sourceMappingURL=individual.service.js.map
