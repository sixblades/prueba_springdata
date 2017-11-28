/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp')
    .factory('HealthService', function ($http) {
        return {
            getMetrics: function () {
                return $http.get('metrics').then(function (response) {
                    return response.data;
                });
            },

            checkHealth: function () {
                return $http.get('health').then(function (response) {
                    return response.data;
                });
            },

            threadDump: function () {
                return $http.get('dump').then(function (response) {
                    return response.data;
                });
            }
        };
    });
