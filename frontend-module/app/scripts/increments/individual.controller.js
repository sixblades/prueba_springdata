/* jshint -W097 */
/* Controller for Individual Matrix funcionality */
'use strict';
/*@ngInject*/
function IndividualController($rootScope, $scope, $state, $stateParams, $q, $translatePartialLoader, $translate, $filter,
    SharingEvaluationService, EmpleadosCn, EmployeesCategory, Employees, EmployeeEvaluationResource, EvaluationsCn, Retribution){
	var vm = this;
    vm.showInfo = false;
	$rootScope.activeOption = 'increments';
    
    /* Obtains the employee list */
	Employees.query({}, (result) => {
		vm.employees = result;
	});

    // Chart.js Data
    vm.ChartConf = {
        labels: ["","",""],
        datasets: [{
            label: 'Maximo',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'red',
            pointColor: 'rgba(0,0,0,0)', pointStrokeColor: 'rgba(0,0,0,0)',
            pointHighlightFill: 'rgba(0,0,0,0)', pointHighlightStroke: 'rgba(0,0,0,0)',
            data: [30000,30000,30000]
        },{
            label: 'Media',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'green',
            pointColor: 'rgba(0,0,0,0)', pointStrokeColor: 'rgba(0,0,0,0)',
            pointHighlightFill: 'rgba(0,0,0,0)', pointHighlightStroke: 'rgba(0,0,0,0)',
            data: [25000,25000,25000]
        }, {
            label: 'Minimo',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'black',
            pointColor: 'rgba(0,0,0,0)', pointStrokeColor: 'rgba(0,0,0,0)',
            pointHighlightFill: 'rgba(0,0,0,0)', pointHighlightStroke: 'rgba(0,0,0,0)',
            data: [20000,20000,20000]
        }, {
            label: 'Salario',
            fillColor: 'rgba(0,0,0,0)', strokeColor: 'rgba(0,0,0,0)',
            pointColor: 'blue', pointStrokeColor: 'blue',
            pointHighlightFill: 'blue', pointHighlightStroke: 'blue',
            data: [0,23000,0]
        }
        ]
    };
    // Chart.js Options
    vm.ChartOptions =  {
        responsive: true, showTooltips: false,
        scaleShowGridLines : true, scaleGridLineColor : "rgba(0,0,0,.05)", scaleGridLineWidth : 1,
        bezierCurve : true, bezierCurveTension : 0.4,
        pointDot : true, pointDotRadius : 3,
        pointDotStrokeWidth : 1, pointHitDetectionRadius : 20,
        datasetStroke : false, datasetStrokeWidth : 2, datasetFill : true,
        legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><%if(datasets[i].label){%><li><%=datasets[i].label%></li><%}%><%}%></ul>'
    };


	/** Obtains the employee categories when an employee is selected on the combo. */
	vm.changeEmployeeCombo = () =>{
        /* Hides the info divs while loading */
        vm.showInfo = false;
		if(vm.employeeId !== '') {
			EmployeesCategory.query({employeeId:vm.employeeId}, (result) => {
				vm.retributions = result.filter((item) => {
					return item.retribution!== null;
				}).map((retribution) => {
					var date = new Date(retribution.dateFrom);
					return {id: retribution.retribution.id, positionId: retribution.positionId, year: date.getFullYear()}
				});
				vm.retribution = '';
			});
		} else {
			vm.employeeCategories = null;
		}
	};


	/** Obtains the retribution for a given year */
	vm.changeYearsCombo = () => {
		if(vm.retribution !== '') {
            /* Hides the info divs while loading */
            vm.showInfo = false;
            
            /* Retribution info request */
			Retribution.get({retributionId: vm.retribution.id}, (result) => {
				vm.retributionInfo = result;
				vm.retributionInfo.annualTotalIncome = vm.retributionInfo.annualGrossIncome + vm.retributionInfo.annualSocialProfits;

                /* Employee info request. WageBand, Area, Job... */
                Retribution.getEmployeeInfo({employeeId: vm.employeeId,
                                            categoryId: vm.retribution.positionId,
                                            year: vm.retribution.year},
                    (result) => {
                        /* Hows the info div */
                        vm.showInfo = true;
                        
                        vm.employeeInfo = result;
                        /* In case there are no wage band limits... */
                        if(result.wageBandLimits === null) {
                            result.wageBandLimits = {
                                minValue: 0, medValue:0, maxValue:0
                            }
                        }
                        var min = result.wageBandLimits.minValue;
                        var avg = result.wageBandLimits.medValue;
                        var max = result.wageBandLimits.maxValue;
                        var salary = vm.retributionInfo.annualGrossIncome;
                        
                        /* Checks if there are position increases info */
                        /* Otherwise, default values */
                        if(vm.employeeInfo.positionIncreases.P1.length === 0) {
                            vm.employeeInfo.positionIncreases.P1 = [0, 0, 0, 0 ,0];
                            vm.employeeInfo.positionIncreases.P2 = [0,0,0,0,0];
                            vm.employeeInfo.positionIncreases.P3 = [0,0,0,0,0];
                            vm.employeeInfo.positionIncreases.P4 = [0,0,0,0,0];
                        }
                        
                        // Calculate current P
                        var actualP = 'P4';
                        if(salary <= (min+avg)/2) {
                            actualP = 'P1';
                        } else if(salary <= avg) {
                            actualP = 'P2';
                        } else if (salary <= (max+avg)/2) {
                            actualP = 'P3';
                        }
                        vm.P = {
                            actual: actualP,
                            msg : 'increments.position.' + actualP
                        };
                        
                        /* Calculate Salary Increases */
                        let percentIncrease = 0.0;
                        /* Obtains current P values for the correpondent P percent */
                        let PValues = vm.employeeInfo.positionIncreases[actualP];
                        switch(vm.employeeInfo.evaluationMark) {
                            case 'F': percentIncrease = PValues[0]; break;
                            case 'B': percentIncrease = PValues[1]; break;
                            case 'A': percentIncrease = PValues[2]; break;
                            case 'A+': percentIncrease = PValues[3]; break;
                            case 'A++': percentIncrease = PValues[4]; break;
                        }
                        vm.percentIncrease = (percentIncrease + vm.employeeInfo.generalIncrease).toFixed(1);
                        vm.totalIncrease = ((vm.retributionInfo.annualGrossIncome * vm.percentIncrease)/100).toFixed(2);
                        vm.newGrossIncome = (vm.retributionInfo.annualGrossIncome * (1 + (vm.percentIncrease/100))).toFixed(2);
                        vm.fixedPercentIncrease = (percentIncrease + vm.employeeInfo.generalIncrease).toFixed(1);
                        vm.fixedTotalIncrease = ((vm.retributionInfo.annualGrossIncome * vm.fixedPercentIncrease)/100).toFixed(2);
                        
                        // Format the numeric values to show on the first table
                        let currency = ' ' + vm.retributionInfo.currencyName;
                        vm.retributionInfo.annualGrossIncome = $filter('NumericFilter')(vm.retributionInfo.annualGrossIncome) + currency;
                        vm.retributionInfo.annualSocialProfits = $filter('NumericFilter')(vm.retributionInfo.annualSocialProfits) + currency;
                        vm.retributionInfo.annualTotalIncome = $filter('NumericFilter')(vm.retributionInfo.annualTotalIncome) + currency;
                        
                        // Update Chart info
                        vm.ChartConf.datasets[0].data = [min,min,min];
                        vm.ChartConf.datasets[1].data = [avg,avg,avg];
                        vm.ChartConf.datasets[2].data = [max,max,max];
                        vm.ChartConf.datasets[3].data = [salary, salary, salary];
                },
                (error) => {
                    let msg = error.data.msg || 'increments.individual.modal.error';
                    vm.Modal = {
                        msg,
                        title: 'increments.individual.modal.error.title',
                        button: 'increments.individual.modal.ok',
                        action: () => {
                            $('#myModal').modal('hide');
                        }
                    };
                    /* Now show the modal */
                    $('#myModal').modal('show');
                });
			});
		} else {
			vm.retribution = null;
		}
	}
    
    /* Redirects to the current evaluation page */
    vm.goToEvaluation = () => {
        /* Set some info needed before going to consultEvaluation state */
        SharingEvaluationService.setId(vm.employeeInfo.evaluationId);
        SharingEvaluationService.setModification(false);
        SharingEvaluationService.setEvaluado({
            employeeId: vm.employeeId,
            id: vm.employeeInfo.evaluationId, 
		    creationDate: vm.employeeInfo.evaluationCreationDate
        })
        
        /* Obtains info needed to go to the evaluation state */
        let promiseArray = [];
        /* Add to the promiseArray all the request to server */
        promiseArray.push(EmpleadosCn.getEmployeeInfo({id: vm.employeeId}, (emp) => {
            vm.employeeData = emp;
        }).$promise);
        promiseArray.push(EmployeeEvaluationResource.getEvaluation(
                {employeeId: vm.employeeId, evaluationId: vm.employeeInfo.evaluationId}, (eva) => {
            vm.evaluationData = eva;
        }).$promise);
        
        /* Loads the json i18n files for consult */
        /* There are props loaded by consult state, which is before going to consultEvaluation.
        Since we are going directly to consultEvaluation, we need to load these props, just in case we were there before */
        $translatePartialLoader.addPart('consult');
        promiseArray.push($translate.refresh());                
       
        /* When all the requests are finished, then go to consultEvaluation state */
        $q.all(promiseArray).then(() => {
            $stateParams.empleado = {info: vm.employeeData};
            $stateParams.leader = [];
            $stateParams.evaluation = vm.evaluationData;
            $state.go('consultEvaluation',{}, {location: true});
        })
    }
 }
angular.module('mentoringApp').controller('IndividualController', IndividualController);
