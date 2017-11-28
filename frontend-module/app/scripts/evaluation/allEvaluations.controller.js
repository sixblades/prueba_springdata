/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function AllEvaluationsController($rootScope, $state, $translate, Principal, EmployeesEvaluationService) {
    var vm = this;
    $rootScope.activeOption = 'consult';
    
    vm.onNgInit = () => {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(() => {
                if(!Principal.isAuthenticated) {
                    $state.go('login');
                }
                
                // Creates the year array. The first year will always be 2015.
                let firstYear = 2015;
                let date = new Date();
                vm.years = [];
                while(firstYear<=date.getFullYear()) {
                    vm.years.push(firstYear);
                    firstYear++;
                }
            }, 
            
            // If not authenticated, forward to login page
            (err) => {
                $state.go('login');      
            });
        } 
    };
    
    /** Handles the change on year combo */
    vm.changeYear = () => {
        vm.showTable = false;
        vm.excelDownloading = false;
        vm.excelButtonDisabled = false;
        if(!Mentoring.isUndefinedOrNull(vm.year)) {
            $('#pleaseWaitDialog').modal({backdrop: 'static', show: true});
            
            EmployeesEvaluationService.getAllEvaluations({year: vm.year}, (res) => {
                vm.evaluations = res;
                res.map((r) => {
                    // First, obtain the emplyee's full name
                    let employee = r.employee;
                    r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;
                    
                    // Then, obtains the evaluator name
                    if(r.evaluator) {
                        let evaluator = r.evaluator;
                        r.evaluator.name = evaluator.firstSurname + ' ' + evaluator.secondSurname + ', ' + evaluator.name;
                    }
                    
                    // Obtains the self evaluation label text and its class
                    let selfEvalKey = 'evaluationAll.tabla.';
                    if(r.selfEvaluation) {
                        selfEvalKey += 'si';
                        r.selfEvaluationClass = 'circle-green';
                    } else {
                        selfEvalKey += 'no';
                        r.selfEvaluationClass = 'circle-red';
                    }
                    r.selfEvaluation = $translate.instant(selfEvalKey);
                    
                    // Same for final evaluation
                    let finalEvalKey = 'evaluationAll.tabla.';
                    if(r.finalEvaluation) {
                        finalEvalKey += 'si';
                        r.finalEvaluationClass = 'circle-green';
                    } else {
                        finalEvalKey += 'no';
                        r.finalEvaluationClass = 'circle-red';
                    }
                    r.finalEvaluation = $translate.instant(finalEvalKey);
                });
                vm.showTable = true;
                
                $('#pleaseWaitDialog').modal('hide');
            }, (err) => {
                $('#pleaseWaitDialog').modal('hide');
                vm.Modal = {
                    msg: 'evaluationAll.modal.msg',
                    title: 'evaluationAll.modal.title',
                    button: 'evaluationAll.modal.ok',
                    action: () => {
                        $('#myModal').modal('hide');
                    }
                };
                $('#myModal').modal('show');
            });
        }
    }
    
    vm.getExcel = () => {
        let url = 'api/employeesEvaluationAll.xls?year=' + vm.year;
        window.open(url, '_self');
        vm.excelDownloading = true;
        vm.excelButtonDisabled = true;
    }
    
    vm.onNgInit();
};
angular.module('mentoringApp').controller('AllEvaluationsController', AllEvaluationsController);