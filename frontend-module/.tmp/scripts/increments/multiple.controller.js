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
    Directions.query({}, function (result) {
        vm.directions = result;
    });

    /* Function executed when a value change has happened on Direction Combo */
    vm.changeDirectionCombo = function () {
        if (vm.direction !== '') {
            vm.areas = [];
            /* Obtains the direction areas */
            Areas.getDirectionAreas({ directionId: vm.direction.id }, function (res) {
                vm.areas = res;
            }, function (err) {
                errorHandler(err.data.msg);
            });
        };
    };

    /* Function that calls to the server to obtain the data */
    vm.searchIncreases = function () {
        /* If no direction nor year are selected, show error modal */
        if (Mentoring.isEmpty(vm.direction) || Mentoring.isUndefinedOrNull(vm.year)) {
            vm.Modal = {
                msg: 'increments.multiple.modal.error.search',
                title: 'increments.multiple.modal.error.title',
                button: 'increments.multiple.modal.ok',
                action: function action() {
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
        var obj = {
            directionId: vm.direction.id,
            areaId: vm.area,
            year: vm.year,
            confirmed: vm.confirmed
        };
        EmployeeMultiple.getMultipleData(obj, function (result) {
            vm.showTables = true;
            vm.employeesInfo = result;
            // Iterate over the response, to know if any result it's a confirmed increase.
            result.filter(function (i) {
                if (i.confirmed === true) {
                    vm.confirmedServer = true;
                    // Format the increases to something bonny
                    i.customSalaryIncrease = $filter('NumericFilter')(i.customSalaryIncrease, 2);
                    i.customSalaryIncreasePercent = $filter('NumericFilter')(i.customSalaryIncreasePercent, 2);
                }
            });
            $('#pleaseWaitDialog').modal('hide');
        }, function (err) {
            $('#pleaseWaitDialog').modal('hide');
            errorHandler(err.data.msg);
        });
    };

    /* Handles the change of percent values on the table inputs */
    vm.changeValuePercent = function (obj) {
        var actualIncome = parseFloat(obj.actualIncome);
        var customSalaryIncreasePercent = parseFloat(obj.customSalaryIncreasePercent);
        var fixedIncrease = parseFloat(obj.salaryIncreasePercent) + customSalaryIncreasePercent;

        /* Checks if the increment is a number */
        if (isNaN(fixedIncrease)) {
            customSalaryIncreasePercent = 0.0;
            fixedIncrease = 0.0;
            errorHandler('increments.multiple.modal.error.percent.nan');
        }

        /* Calculates the values */
        var customSalaryIncrease = actualIncome * customSalaryIncreasePercent / 100;
        var finalSalaryIncrease = actualIncome * fixedIncrease / 100;
        var finalIncome = actualIncome + finalSalaryIncrease;

        /* Assigns the formatted values */
        obj.customSalaryIncrease = $filter('NumericFilter')(customSalaryIncrease, 2);
        obj.customSalaryIncreasePercent = $filter('NumericFilter')(customSalaryIncreasePercent, 2);
        obj.finalSalaryIncreasePercent = fixedIncrease;
        obj.finalSalaryIncrease = finalSalaryIncrease;
        obj.finalIncome = finalIncome;
    };

    /* Handles the change of a numeric vlaue on the inputs table */
    vm.changeValueNumeric = function (obj) {
        /* Obtains the obj values */
        var actualIncome = parseFloat(obj.actualIncome);
        var customIncrease = parseFloat(obj.customSalaryIncrease);
        /* Calculates the custom increase */
        var customIncreasePercent = customIncrease * 100 / actualIncome;
        /* Calcualtes the final increase percent. P-increment+User Defined. */
        var finalSalaryPercent = parseFloat(obj.salaryIncreasePercent) + customIncreasePercent;

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

        var finalSalaryIncrease = actualIncome * finalSalaryPercent / 100;
        var finalIncome = actualIncome + finalSalaryIncrease;

        /* Set the object values */
        obj.customSalaryIncrease = $filter('NumericFilter')(customIncrease, 2);
        obj.customSalaryIncreasePercent = $filter('NumericFilter')(customIncreasePercent, 2);
        obj.finalSalaryIncreasePercent = finalSalaryPercent;
        obj.finalSalaryIncrease = finalSalaryIncrease;
        obj.finalIncome = finalIncome;
    };

    /* Handles the check of a confirmed checkbox on the inputs table */
    vm.changeConfirmed = function (obj) {
        /* If the obj is confirmed, add it to the list */
        if (obj.confirmed) {
            vm.confirmedList.push(obj);

            /* If not, search the list for it and delete it. It should be have added first... */
        } else {
                var index = 0;
                for (index = 0, length = vm.confirmedList.length; index < length; index++) {
                    var item = vm.confirmedList[index];
                    if (item.categoryId === obj.categoryId) {
                        break;
                    }
                }
                vm.confirmedList.splice(index, 1);
            }
    };

    /* Save into BD the confirmed rows. This method will NOT save the increases. To save the increases they must be confirmed first. */
    vm.saveConfirmed = function () {
        /* If there are confirmed increases... */
        if (vm.confirmedList.length > 0) {
            EmployeeMultiple.saveConfirmedData({ directionId: vm.direction.id }, vm.confirmedList, function (result) {
                vm.Modal = {
                    msg: 'increments.multiple.modal.confirmed.success',
                    title: 'increments.multiple.modal.confirmed.title',
                    button: 'increments.multiple.modal.ok',
                    action: function action() {
                        $window.location.reload();
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            }, function (error) {
                errorHandler(error.data.msg);
            });
        }
    };

    /* Saves the increases. */
    vm.confirmIncrements = function () {
        var increasesList = vm.employeesInfo.filter(function (item) {
            return item.confirmed;
        });
        EmployeeMultiple.saveIncreases(increasesList, function (result) {
            vm.Modal = {
                msg: 'increments.multiple.modal.confirmed.successb',
                title: 'increments.multiple.modal.confirmed.title',
                button: 'increments.multiple.modal.ok',
                action: function action() {
                    $window.location.reload();
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
        }, function (error) {
            errorHandler(error.data.msg);
        });
    };

    /* Obtains a PDF Export file */
    vm.getPDFFile = function () {
        var url = getURLExport('pdf');
        window.open(url, '_self');
    };

    /* Obtains a XLS Export file */
    vm.getXLSFile = function () {
        var url = getURLExport('excel');
        window.open(url, '_self');
    };

    /* Builds the export URL based on the combo selections and format passed by parameter */
    var getURLExport = function getURLExport(format) {
        var url = 'api/employeeCatYear.' + format + '?directionId=' + vm.direction.id + '&year=' + vm.year;
        if (!Mentoring.isEmpty(vm.area)) {
            url += '&areaId=' + vm.area;
        }
        if (!Mentoring.isEmpty(vm.confirmed)) {
            url += '&confirmed=' + vm.confirmed;
        }
        return url;
    };

    var errorHandler = function errorHandler(msg) {
        msg = msg || 'increments.multiple.modal.error';
        vm.Modal = {
            msg: msg,
            title: 'increments.multiple.modal.error.title',
            button: 'increments.multiple.modal.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
};
angular.module('mentoringApp').controller('MultipleController', MultipleController);
//# sourceMappingURL=multiple.controller.js.map
