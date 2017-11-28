/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function EmployeesEvaluationsController($rootScope, $state, $translate, Principal, Directions, Areas, EmployeesEvaluationService) {
    var vm = this;
    $rootScope.activeOption = 'consult';
    
    vm.onNgInit = () => {
        if ($state.current.name != 'login') {
            // Check if the user is authenticated before doing anything
            Principal.identity().then(() => {
                if(!Principal.isAuthenticated) {
                    $state.go('login');
                }
                // Obtains all the directions
                Directions.query({}, (res) => {
                    vm.directions = res;
                }, (err) =>{
                    showModal(() => {
                        $state.go('home');
                    });
                });
                
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
    
    // Handles the changes on direction combo
    vm.changeDirection = () => {
        vm.showTable = false;
        // First check if it's not an empty value
        if(!Mentoring.isUndefinedOrNull(vm.direction)) {
            // Then, obtain the direction's areas
            Areas.getDirectionAreas({directionId: vm.direction}, (res) => {
                vm.areas = res;
            }, (err) =>{
                showModal(() => {
                    $('#myModal').modal('hide');
                });
            });
        }
    }
    
    // Handles the changes on years combo
    vm.changeYear = () => {
        vm.showTable = false;
        if(!Mentoring.isUndefinedOrNull(vm.year) && !Mentoring.isUndefinedOrNull(vm.area)) {
            // Dispatch server request
            getResults();
        }
    };
    
    // Handles the changes on area combo
    vm.changeArea = () => {
        vm.showTable = false;
        // First check if it's not an empty value
        if(!Mentoring.isUndefinedOrNull(vm.area)) {
            // If there is no year selected, autoselect current year
            if(Mentoring.isUndefinedOrNull(vm.year)) {
                let date = new Date();
                vm.year = date.getFullYear();
            }
            // Dispatch the server request
            getResults();
        }
    };
    
    // Dispatch server request to obtain the data
    var getResults = () => {
        EmployeesEvaluationService.get({areaId:vm.area, year: vm.year}, (res)=> {
            vm.showTable = true;
            res.map(processResults);
            vm.evaluations = res; 
        }, (err) => {
            showModal(() => {
                $('#myModal').modal('hide');
            });
        });
    }
    
    // Handles the visualization of the controller Modal
    var showModal = (action) => {
        vm.Modal = {
            msg: 'employeesEvaluation.modal.error',
            title: 'employeesEvaluation.modal.error.title',
            button: 'employeesEvaluation.modal.ok',
            action: action
        };
        $('#myModal').modal('show');
    }
    
    // Handles each result of the server request. This function do some process on each result before they are shown
    // to the user
    var processResults = (r) => {
        // First, obtain the emplyee's full name
        let employee = r.employee;
        r.employee.name = employee.firstSurname + ' ' + employee.secondSurname + ', ' + employee.name;
        
        // Obtains the self evaluation label text and its class
        let selfEvalKey = 'employeesEvaluation.tabla.';
        if(r.selfEvaluation) {
            selfEvalKey += 'si';
            r.selfEvaluationClass = 'circle-green';
        } else {
            selfEvalKey += 'no';
            r.selfEvaluationClass = 'circle-red';
        }
        r.selfEvaluation = $translate.instant(selfEvalKey);
        
        // Same for final evaluation
        let finalEvalKey = 'employeesEvaluation.tabla.';
        if(r.finalEvaluation) {
            finalEvalKey += 'si';
            r.finalEvaluationClass = 'circle-green';
        } else {
            finalEvalKey += 'no';
            r.finalEvaluationClass = 'circle-red';
        }
        r.finalEvaluation = $translate.instant(finalEvalKey);
    }
    
    vm.onNgInit();
};
angular.module('mentoringApp').controller('EmployeesEvaluationsController', EmployeesEvaluationsController);