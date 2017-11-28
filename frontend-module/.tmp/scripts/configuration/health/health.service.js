/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('HealthService', function ($http) {
    return {
        getMetrics: function getMetrics() {
            return $http.get('metrics').then(function (response) {
                return response.data;
            });
        },

        checkHealth: function checkHealth() {
            return $http.get('health').then(function (response) {
                return response.data;
            });
        },

        threadDump: function threadDump() {
            return $http.get('dump').then(function (response) {
                return response.data;
            });
        }
    };
});
//# sourceMappingURL=health.service.js.map
