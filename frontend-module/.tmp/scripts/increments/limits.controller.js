/* jshint -W097 */
/* Controller for Wage Bands Limits funcionality */
'use strict';
/*@ngInject*/
function WageLimitsController($rootScope, $window, WageBandLimitsService, DirectionsService) {
    var vm = this;
    $rootScope.activeOption = 'increments';
    vm.canSave = true;
    vm.direction = null;
    vm.directions = [];
    vm.limits = [];
    vm.currency = '';
    vm.yearHTML = Mentoring.getCurrentYear();
    vm.showTables = false;

    /* Obtains directions */
    DirectionsService.query({}, function (result) {
        vm.directions = result;
    });

    /* Function executed when there is a change on direction combo */
    vm.selectDirection = function () {
        /* If no directions selected, set showTables flag to flase and show modal */
        if (vm.direction === null) {
            vm.showTables = false;
            vm.Modal = {
                msg: 'increments.limits.modal.warning.select',
                title: 'increments.limits.modal.warning.title',
                button: 'increments.limits.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
        } else {
            (function () {
                /* Set flags to default */
                vm.showTables = false;
                vm.canSave = false;

                /* Obtains current year */
                var year = Mentoring.getCurrentYear();

                /* Wage Band Limits request by year and direction. */
                WageBandLimitsService.query({ year: year, direction: vm.direction.id }, function (result) {
                    /* Sets the currency symbol for the selected direction */
                    vm.currency = vm.direction.currencySymbol;

                    /* If there are no result, request last year info */
                    if (result.limits.length == 0) {
                        WageBandLimitsService.query({ year: year - 1, direction: vm.direction.id }, function (result) {
                            handleResult(result, true);
                        }, errorHandler);
                    } else {
                        handleResult(result, false);
                    }
                    vm.canSave = result.canSave;
                }, errorHandler);
            })();
        }
    };

    /* Function that saves limits on server */
    vm.saveLimits = function () {
        /* If limits are valid, process them */
        if (validateLimits(vm.limits)) {
            var limits = [];
            var business = vm.limits.business;
            for (var item in business) {
                limits.push(business[item]);
            }
            var staff = vm.limits.staff;
            for (var item in staff) {
                limits.push(staff[item]);
            }

            /* Request to server */
            WageBandLimitsService.saveLimits(limits,
            /* Success Handler */
            function (result) {
                /* Shows a success modal */
                vm.Modal = {
                    msg: 'increments.limits.modal.success',
                    title: 'increments.limits.modal.success.title',
                    button: 'increments.limits.modal.ok',
                    action: function action() {
                        $window.location.reload();
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            },
            /* Error Handler */
            function (error) {
                /* Shows a modal error */
                vm.Modal = {
                    msg: 'increments.limits.modal.error',
                    title: 'increments.limits.modal.error.title',
                    button: 'increments.limits.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            });

            // Else, show an error modal
        } else {
                /* Shows a modal error */
                vm.Modal = {
                    msg: 'increments.limits.modal.form.error',
                    title: 'increments.limits.modal.error.title',
                    button: 'increments.limits.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            }
    };

    /* Validates the limits */
    var validateLimits = function validateLimits(limits) {
        var ok = true;
        var scopeForm = $('form').scope().LimitsForm;
        var business = limits.business;
        var staff = limits.staff;
        for (var V in business) {
            var okValue = true;
            var item = business[V];
            // If minValue is equal or greater than medValue and medValue is equal or greater than maxValue, error
            if (item.minValue >= item.medValue || item.medValue >= item.maxValue) {
                ok = false;
                okValue = false;
            }
            var errorField = 'Business.' + V + '.';
            scopeForm[errorField + 'minValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'medValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'maxValue'].$setValidity('business', okValue);
        }
        for (var V in staff) {
            var okValue = true;
            var item = staff[V];
            // If minValue is equal or greater than medValue and medValue is equal or greater than maxValue, error
            if (item.minValue >= item.medValue && item.medValue >= item.maxValue) {
                ok = false;
                okValue = false;
            }
            var errorField = 'Staff.' + V + '.';
            scopeForm[errorField + 'minValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'medValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'maxValue'].$setValidity('business', okValue);
        }
        return ok;
    };

    /** Handles the result of the AJAX request */
    var handleResult = function handleResult(result, removeId) {
        var limits = result.limits;

        vm.positions = { business: {}, staff: {} };
        vm.limits = { business: {}, staff: {} };

        var limitsToSet;
        /* If there are no limits, get the default limits from server */
        if (limits.length === 0) {
            limitsToSet = result.defaultLimits;
            /* If there are limits, creates the objects to show the tables */
        } else {
                limitsToSet = limits;
            }

        // Set the limits on view
        limitsToSet.forEach(function (l) {
            var dest = l.isBusiness ? vm.limits.business : vm.limits.staff;
            dest[l.bandName] = l;
            if (removeId) {
                dest[l.bandName].id = null;
            }
        });
        /* Set showTables to true */
        vm.showTables = true;
    };

    /* Handles an error on WageBandLimitsService request */
    var errorHandler = function errorHandler(error) {
        /* Shows a modal error */
        vm.Modal = {
            msg: 'increments.limits.modal.error',
            title: 'increments.limits.modal.error.title',
            button: 'increments.limits.modal.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
};
angular.module('mentoringApp').controller('WageLimitsController', WageLimitsController);
//# sourceMappingURL=limits.controller.js.map
