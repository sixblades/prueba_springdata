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
    DirectionsService.query({}, (result) => {
       vm.directions = result;
    });

    /* Function executed when there is a change on direction combo */
    vm.selectDirection = () => {
        /* If no directions selected, set showTables flag to flase and show modal */
        if(vm.direction === null) {
            vm.showTables = false;
            vm.Modal = {
                msg: 'increments.limits.modal.warning.select',
                title: 'increments.limits.modal.warning.title',
                button: 'increments.limits.modal.ok',
                action: () => {
                    $('#myModal').modal('hide');
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
        } else {
            /* Set flags to default */
            vm.showTables = false;
            vm.canSave = false;
            
            /* Obtains current year */
            let year = Mentoring.getCurrentYear();
            
            /* Wage Band Limits request by year and direction. */
            WageBandLimitsService.query({year: year, direction: vm.direction.id},
                (result) => {
                    /* Sets the currency symbol for the selected direction */
                    vm.currency = vm.direction.currencySymbol;
                    
                    /* If there are no result, request last year info */
                    if(result.limits.length==0) {
                        WageBandLimitsService.query({year: year - 1, direction: vm.direction.id},
                            (result) => {
                                handleResult(result, true);
                            }, errorHandler);
                    } else {
                        handleResult(result, false);
                    }
                    vm.canSave = result.canSave;
                }, errorHandler);
        }
    };
    
    /* Function that saves limits on server */
    vm.saveLimits = () => {
        /* If limits are valid, process them */
        if(validateLimits(vm.limits)) {
            let limits = [];
            let business = vm.limits.business;
            for(let item in business) {
                limits.push(business[item]);
            }
            let staff = vm.limits.staff;
            for(let item in staff) {
                limits.push(staff[item]);
            }
            
            /* Request to server */
            WageBandLimitsService.saveLimits(limits, 
                /* Success Handler */
                (result) => {
                    /* Shows a success modal */
                    vm.Modal = {
                        msg: 'increments.limits.modal.success',
                        title: 'increments.limits.modal.success.title',
                        button: 'increments.limits.modal.ok',
                        action: () => {
                            $window.location.reload();
                        }
                    };
                    /* Now show the modal */
                    $('#myModal').modal('show');
                }, 
                /* Error Handler */
                (error) => {
                    /* Shows a modal error */
                    vm.Modal = {
                        msg: 'increments.limits.modal.error',
                        title: 'increments.limits.modal.error.title',
                        button: 'increments.limits.modal.ok',
                        action: () => {
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
                action: () => {
                    $('#myModal').modal('hide');
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
        }
    };

    /* Validates the limits */
    var validateLimits = (limits) => {
        let ok = true;
        let scopeForm = $('form').scope().LimitsForm;
        let business = limits.business;
        let staff = limits.staff;
        for(let V in business) {
            let okValue = true;
            let item = business[V];
            // If minValue is equal or greater than medValue and medValue is equal or greater than maxValue, error
            if(item.minValue >= item.medValue || item.medValue >= item.maxValue) {
                ok = false;
                okValue = false;
            } 
            let errorField = 'Business.' + V + '.';
            scopeForm[errorField + 'minValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'medValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'maxValue'].$setValidity('business', okValue);
        }
        for(let V in staff) {
            let okValue = true;
            let item = staff[V];
            // If minValue is equal or greater than medValue and medValue is equal or greater than maxValue, error
            if(item.minValue >= item.medValue && item.medValue >= item.maxValue) {
                ok = false;
                okValue = false;
            }
            let errorField = 'Staff.' + V + '.';
            scopeForm[errorField + 'minValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'medValue'].$setValidity('business', okValue);
            scopeForm[errorField + 'maxValue'].$setValidity('business', okValue);
        }
        return ok;
    }

    /** Handles the result of the AJAX request */
    var handleResult = (result, removeId) => {
        let limits = result.limits;

        vm.positions = { business: {}, staff: {} };
        vm.limits = { business: {}, staff: {} };
        
        var limitsToSet;
        /* If there are no limits, get the default limits from server */
        if(limits.length === 0) {
            limitsToSet = result.defaultLimits;
        /* If there are limits, creates the objects to show the tables */
        } else {
            limitsToSet = limits;
        }
        
        // Set the limits on view
        limitsToSet.forEach(l => {
            let dest = l.isBusiness ? vm.limits.business : vm.limits.staff;
            dest[l.bandName] = l;
            if (removeId) {
                dest[l.bandName].id = null;
            }
        });
        /* Set showTables to true */
        vm.showTables = true;
    }

    /* Handles an error on WageBandLimitsService request */
    var errorHandler = (error) => {
        /* Shows a modal error */
        vm.Modal = {
            msg: 'increments.limits.modal.error',
            title: 'increments.limits.modal.error.title',
            button: 'increments.limits.modal.ok',
            action: () => {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    }

};
angular.module('mentoringApp').controller('WageLimitsController', WageLimitsController);
