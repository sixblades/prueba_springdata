/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function HealthController($rootScope, HealthService) {
    var vm = this;
    
    // Activamos la opción de menú Configuración
    $rootScope.activeOption = "configuration";

    vm.updatingHealth = true;
    vm.separator = '.';

    vm.refresh = function () {
        vm.updatingHealth = true;
        HealthService.checkHealth().then(function (response) {
            vm.healthData = vm.transformHealthData(response);
            vm.updatingHealth = false;
        }, function (response) {
            vm.healthData = vm.transformHealthData(response.data);
            vm.updatingHealth = false;
        });
    };

    vm.refresh();

    vm.getLabelClass = function (statusState) {
        if (statusState === 'UP') {
            return 'label-success';
        } else {
            return 'label-danger';
        }
    };

    vm.transformHealthData = function (data) {
        var response = [];
        vm.flattenHealthData(response, null, data);
        return response;
    };

    vm.flattenHealthData = function (result, path, data) {
        angular.forEach(data, function (value, key) {
            if (vm.isHealthObject(value)) {
                if (vm.hasSubSystem(value)) {
                    vm.addHealthObject(result, false, value, vm.getModuleName(path, key));
                    vm.flattenHealthData(result, vm.getModuleName(path, key), value);
                } else {
                    vm.addHealthObject(result, true, value, vm.getModuleName(path, key));
                }
            }
        });
        return result;
    };

    vm.getModuleName = function (path, name) {
        var result;
        if (path && name) {
            result = path + vm.separator + name;
        } else if (path) {
            result = path;
        } else if (name) {
            result = name;
        } else {
            result = '';
        }
        return result;
    };


    vm.showHealth = function (health) {
        vm.currentHealth = health;
        $('#showHealthModal').modal('show');
    };

    vm.addHealthObject = function (result, isLeaf, healthObject, name) {

        var healthData = {
            'name': name
        };
        var details = {};
        var hasDetails = false;

        angular.forEach(healthObject, function (value, key) {
            if (key === 'status' || key === 'error') {
                healthData[key] = value;
            } else {
                if (!vm.isHealthObject(value)) {
                    details[key] = value;
                    hasDetails = true;
                }
            }
        });

        // Add the of the details
        if (hasDetails) {
            angular.extend(healthData, { 'details': details });
        }

        // Only add nodes if they provide additional information
        if (isLeaf || hasDetails || healthData.error) {
            result.push(healthData);
        }
        return healthData;
    };

    vm.hasSubSystem = function (healthObject) {
        var result = false;
        angular.forEach(healthObject, function (value) {
            if (value && value.status) {
                result = true;
            }
        });
        return result;
    };

    vm.isHealthObject = function (healthObject) {
        var result = false;
        angular.forEach(healthObject, function (value, key) {
            if (key === 'status') {
                result = true;
            }
        });
        return result;
    };

    vm.baseName = function (name) {
        if (name) {
            var split = name.split('.');
            return split[0];
        }
    };

    vm.subSystemName = function (name) {
        if (name) {
            var split = name.split('.');
            split.splice(0, 1);
            var remainder = split.join('.');
            return remainder ? ' - ' + remainder : '';
        }
    };
}
angular.module('mentoringApp').controller('HealthController', HealthController);