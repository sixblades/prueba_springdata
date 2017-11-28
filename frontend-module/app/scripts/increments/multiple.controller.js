/* jshint -W097 */
/* Controller for Multiple Matrix funcionality */
'use strict';
/*@ngInject*/
function MultipleController($rootScope, $window, $filter, EmployeesCategoryByYear, EmployeeMultiple, Directions, Areas) {
    var vm = this;
    $rootScope.activeOption = 'increments';
    vm.direction = '';
    vm.area = '';
    vm.year;
    vm.confirmedServer = false;
    vm.showTables = false;
    vm.listDate = [];
    vm.confirmedList = [];

    var dateFinal = new Date();
    for (var i = 2015; i <= dateFinal.getFullYear(); i++) {
        vm.listDate.push(i);
    }

    /* Obtains the directions */
    Directions.query({}, (result) => {
        vm.directions = result;
    });

    /* Function executed when a value change has happened on Direction Combo */
    vm.changeDirectionCombo = () => {
        if (vm.direction !== '') {
            vm.areas = [];
            /* Obtains the direction areas */
            Areas.getDirectionAreas({ directionId: vm.direction.id }, (res) => {
                vm.areas = res;
            }, (err) => {
                errorHandler(err.data.msg);
            });
        };
    };

    /* Function that calls to the server to obtain the data */
    vm.searchIncreases = () => {
        /* If no direction nor year are selected, show error modal */
        if (Mentoring.isEmpty(vm.direction) || Mentoring.isUndefinedOrNull(vm.year)) {
            vm.Modal = {
                msg: 'increments.multiple.modal.error.search',
                title: 'increments.multiple.modal.error.title',
                button: 'increments.multiple.modal.ok',
                action: () => {
                    $('#myModal').modal('hide');
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
            return;
        }

        /* Else, search for increases */
        $('#pleaseWaitDialog').modal({ backdrop: 'static', show: true });
        vm.showTables = false;
        vm.confirmedServer = false;
        let obj = {
            directionId: vm.direction.id,
            areaId: vm.area,
            year: vm.year,
            confirmed: vm.confirmed
        }
        EmployeeMultiple.getMultipleData(obj, (result) => {
            vm.showTables = true;
            vm.employeesInfo = result;
            // Iterate over the response, to know if any result it's a confirmed increase.
            result.filter((i) => {
                if (i.confirmed === true) {
                    vm.confirmedServer = true;
                    // Format the increases to something bonny
                    i.customSalaryIncrease = $filter('NumericFilter')(i.customSalaryIncrease, 2);
                    i.customSalaryIncreasePercent = $filter('NumericFilter')(i.customSalaryIncreasePercent, 2);
                }
            });
            $('#pleaseWaitDialog').modal('hide');
        }, (err) => {
            $('#pleaseWaitDialog').modal('hide');
            errorHandler(err.data.msg);
        });
    };

    /* Handles the change of percent values on the table inputs */
    vm.changeValuePercent = (obj) => {
        let actualIncome = parseFloat(obj.actualIncome);
        let customSalaryIncreasePercent = parseFloat(obj.customSalaryIncreasePercent);
        let fixedIncrease = parseFloat(obj.salaryIncreasePercent) + customSalaryIncreasePercent;

        /* Checks if the increment is a number */
        if (isNaN(fixedIncrease)) {
            customSalaryIncreasePercent = 0.0;
            fixedIncrease = 0.0;
            errorHandler('increments.multiple.modal.error.percent.nan');
        }

        /* Calculates the values */
        let customSalaryIncrease = (actualIncome * customSalaryIncreasePercent) / 100;
        let finalSalaryIncrease = (actualIncome * fixedIncrease) / 100;
        let finalIncome = actualIncome + finalSalaryIncrease;

        /* Assigns the formatted values */
        obj.customSalaryIncrease = $filter('NumericFilter')(customSalaryIncrease, 2);
        obj.customSalaryIncreasePercent = $filter('NumericFilter')(customSalaryIncreasePercent, 2);
        obj.finalSalaryIncreasePercent = fixedIncrease;
        obj.finalSalaryIncrease = finalSalaryIncrease;
        obj.finalIncome = finalIncome;
    };

    /* Handles the change of a numeric vlaue on the inputs table */
    vm.changeValueNumeric = (obj) => {
        /* Obtains the obj values */
        let actualIncome = parseFloat(obj.actualIncome);
        let customIncrease = parseFloat(obj.customSalaryIncrease);
        /* Calculates the custom increase */
        let customIncreasePercent = (customIncrease * 100) / actualIncome;
        /* Calcualtes the final increase percent. P-increment+User Defined. */
        let finalSalaryPercent = parseFloat(obj.salaryIncreasePercent) + customIncreasePercent;

        /* Checks if the increment is a number */
        if (isNaN(customIncrease)) {
            customIncrease = 0.0;
            customIncreasePercent = 0.0;
            finalSalaryPercent = 0.0;
            errorHandler('increments.multiple.modal.error.salary.nan');
        }
        /* Checks if the salary increase is lower than 0 */
        if (customIncrease < 0) {
            customIncrease = 0.0;
            customIncreasePercent = 0.0;
            finalSalaryPercent = 0.0;
            errorHandler('increments.multiple.modal.error.salary');
        }

        let finalSalaryIncrease = (actualIncome * finalSalaryPercent) / 100;
        let finalIncome = actualIncome + finalSalaryIncrease;

        /* Set the object values */
        obj.customSalaryIncrease = $filter('NumericFilter')(customIncrease, 2);
        obj.customSalaryIncreasePercent = $filter('NumericFilter')(customIncreasePercent, 2);
        obj.finalSalaryIncreasePercent = finalSalaryPercent;
        obj.finalSalaryIncrease = finalSalaryIncrease;
        obj.finalIncome = finalIncome;
    };

    /* Handles the check of a confirmed checkbox on the inputs table */
    vm.changeConfirmed = (obj) => {
        /* If the obj is confirmed, add it to the list */
        if (obj.confirmed) {
            vm.confirmedList.push(obj);

            /* If not, search the list for it and delete it. It should be have added first... */
        } else {
            let index = 0;
            for (index = 0, length = vm.confirmedList.length; index < length; index++) {
                let item = vm.confirmedList[index];
                if (item.categoryId === obj.categoryId) {
                    break;
                }
            }
            vm.confirmedList.splice(index, 1);
        }
    };

    /* Save into BD the confirmed rows. This method will NOT save the increases. To save the increases they must be confirmed first. */
    vm.saveConfirmed = () => {
        /* If there are confirmed increases... */
        if (vm.confirmedList.length > 0) {
            EmployeeMultiple.saveConfirmedData({ directionId: vm.direction.id }, vm.confirmedList, (result) => {
                vm.Modal = {
                    msg: 'increments.multiple.modal.confirmed.success',
                    title: 'increments.multiple.modal.confirmed.title',
                    button: 'increments.multiple.modal.ok',
                    action: () => {
                        $window.location.reload();
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            },
                (error) => {
                    errorHandler(error.data.msg);
                });
        }
    };

    /* Saves the increases. */
    vm.confirmIncrements = () => {
        let increasesList = vm.employeesInfo.filter((item) => { return item.confirmed });
        EmployeeMultiple.saveIncreases(increasesList,(result) => {
                vm.Modal = {
                    msg: 'increments.multiple.modal.confirmed.successb',
                    title: 'increments.multiple.modal.confirmed.title',
                    button: 'increments.multiple.modal.ok',
                    action: () => {
                        $window.location.reload();
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            },
                (error) => {
                    errorHandler(error.data.msg);
                });
    }

    /* Obtains a PDF Export file */
    vm.getPDFFile = () => {
        let url = getURLExport('pdf');
        window.open(url, '_self');
    }

    /* Obtains a XLS Export file */
    vm.getXLSFile = () => {
        let url = getURLExport('excel');
        window.open(url, '_self');
    }

    /* Builds the export URL based on the combo selections and format passed by parameter */
    var getURLExport = (format) => {
        let url = 'api/employeeCatYear.' + format + '?directionId=' + vm.direction.id + '&year=' + vm.year;
        if (!Mentoring.isEmpty(vm.area)) {
            url += '&areaId=' + vm.area;
        }
        if (!Mentoring.isEmpty(vm.confirmed)) {
            url += '&confirmed=' + vm.confirmed;
        }
        return url;
    }

    var errorHandler = (msg) => {
        msg = msg || 'increments.multiple.modal.error';
        vm.Modal = {
            msg: msg,
            title: 'increments.multiple.modal.error.title',
            button: 'increments.multiple.modal.ok',
            action: () => {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
};
angular.module('mentoringApp').controller('MultipleController', MultipleController);