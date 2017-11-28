/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function LeadersEvaluationsController($rootScope, $state, $translate, 
        Principal, EmployeeLeaderResource, LeadersEvaluationsService) {
    var vm = this;
    
    $rootScope.activeOption = 'consult';
    
    vm.onNgInit = () => {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(() => {
                if(!Principal.isAuthenticated) {
                    $state.go('login');
                }
                // Obtains all the leaders employees
                EmployeeLeaderResource.query({}, (res) => {
                    vm.leaders = res;
                });
                
                vm.years = [];
                let date = new Date();
                let firstYear = 2015;
                let thisYear = date.getFullYear();
                while (firstYear<=thisYear) {
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
    
    // Handles the changes on the years combo
    vm.changeYear = () => {
        vm.changeEvaluator();
    }
    
    // Handles the changes on the evaluator combo
    vm.changeEvaluator = () => {
        // If there is no year selected, force the selection of the current year
        if(Mentoring.isUndefinedOrNull(vm.year)) {
            let date = new Date();
            vm.year = date.getFullYear();
        }
        // If there is leader selected...
        if(!Mentoring.isUndefinedOrNull(vm.leader)) {
            // Dispatch the server request
            LeadersEvaluationsService.getLeadersEvaluations({leaderId: vm.leader.id, year: vm.year}, (res) => {
                // if there are results
                if(res.length > 0) {
                    vm.showTable = true;
                    // Iterate over all the result to do some process
                    res.map( (r) => {
                        let employee = r.employee;
                        r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;
                        
                        // Obtains the self evaluation label text and its class
                        let selfEvalKey = 'leadersEvaluation.tabla.';
                        if(r.selfEvaluation) {
                            selfEvalKey += 'si';
                            r.selfEvaluationClass = 'circle-green';
                        } else {
                            selfEvalKey += 'no';
                            r.selfEvaluationClass = 'circle-red';
                        }
                        r.selfEvaluation = $translate.instant(selfEvalKey);
                        
                        // Same for final evaluation
                        let finalEvalKey = 'leadersEvaluation.tabla.';
                        if(r.finalEvaluation) {
                            finalEvalKey += 'si';
                            r.finalEvaluationClass = 'circle-green';
                        } else {
                            finalEvalKey += 'no';
                            r.finalEvaluationClass = 'circle-red';
                        }
                        r.finalEvaluation = $translate.instant(finalEvalKey);
                    });
                    vm.leadersEvaluations = res;
                } else {
                    // If there are no results, don't show the table
                    vm.showTable = false;
                }
            }, (err) => {
                vm.Modal = {
                    msg: 'leadersEvaluation.modal.error',
                    title: 'leadersEvaluation.modal.error.title',
                    button: 'leadersEvaluation.modal.ok',
                    action: () => {
                        $('#myModal').modal('hide');
                    }
                };
                $('#myModal').modal('show');
            });
        } else {
            vm.showTable = false;
        }
    }
    
    // Init the controller
    vm.onNgInit();
};
angular.module('mentoringApp').controller('LeadersEvaluationsController', LeadersEvaluationsController);