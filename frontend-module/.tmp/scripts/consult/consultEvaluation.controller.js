/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function ConsultEvaluationController($scope, $timeout, $sce, $state, $stateParams, $window, $previousState, Principal, $translate, QuestionsResource, StatesResource, AnswersResource, CompetencesResource, PillarsResource, SharingEvaluationService, EvaluationId, EmployeeIsLeaderResource, AnswersSelect, AnswersEval, isEvaluationDate, isFinalEvaluationDate, CurrentAllocation, CalculateEvaluationResult) {

	$previousState.memo('consult');
	var vm = this;
	$scope.chart;

	// Check if we come from consult state, otherwise redirect to it.
	var prevState = $previousState.get('consult');
	if (prevState.state === null) {
		$state.go('consult');
	}
	vm.evaluation = prevState.params.evaluation;
	vm.showInput = prevState.params.showInput;

	if ($state.current.name != 'login') {
		Principal.identity().then(function (account) {
			vm.account = account;

			vm.showPrint = false;
			if (!Mentoring.isUndefinedOrNull(account) && !Mentoring.isUndefinedOrNull(account.roles) && !Mentoring.isUndefinedOrNull(account.isLeader)) {
				vm.isLeader = account.isLeader;
				vm.employeeId = account.employeeId;
				vm.user = {
					firstName: account.firstName,
					lastName: account.lastName
				};
				vm.finalEvaluation = false;

				prepareChart();
				vm.questions = [];
				vm.states = [];
				vm.empleado = [];
				vm.competence = [];
				vm.pillar = [];
				vm.correcto = false;
				vm.evaluable = [];
				vm.consult = false;
				vm.esModificable = false;
				vm.evaluable.info = [];
				vm.destacados = [];
				vm.mejorar = [];
				vm.selected = [];
				vm.respuesta = [];

				isEvaluationDate.get(function (isDate) {
					vm.isEvaluationDate = isDate.value;
				});
				isFinalEvaluationDate.get(function (isDate) {
					vm.isFinalEvaluationDate = isDate.value;
				});

				var id = SharingEvaluationService.getId();
				var esModificable = SharingEvaluationService.getModification();

				// Check if the user can modify the evaluation type. This will be possible if the evaluation can be modified
				// and the user has one of this roles : ADMIN, DIRECTOR_GENERAL or HR.
				vm.userCanModifyType = false;
				if (esModificable && account.roles.length > 1) {
					var userRoles = account.roles;
					if (userRoles.indexOf('ROLE_ADMIN') > -1 || userRoles.indexOf('ROLE_RRHH') > -1 || userRoles.indexOf('ROLE_DIRECTORG') > -1) {
						vm.userCanModifyType = true;
						// Creates array of options for combo
						vm.evaluationTypes = [{ id: 'auto', value: $translate.instant('consult.evaluation.auto') }, { id: 'eval', value: $translate.instant('consult.evaluation.eval') }, { id: 'final', value: $translate.instant('consult.evaluation.final') }];
					}
				}

				vm.evaluadoo = SharingEvaluationService.getEvaluado();
				vm.esModificable = esModificable;

				var year_evaluation;
				if (!Mentoring.isUndefinedOrNull(vm.evaluadoo)) {
					vm.date = vm.evaluadoo.creationDate;
					year_evaluation = new Date(vm.evaluadoo.creationDate).getFullYear();
				}

				vm.getQuestionCode = function (questionCode) {
					vm.codePregunta = questionCode;
					vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
				};

				vm.evaluationId = [];

				EvaluationId.get({ id: id }, function (result) {
					if (!Mentoring.isUndefinedOrNull(result)) {
						vm.evaluationId = result;

						// Check if we need to show the print button. The first to check is if it's a final evaluation
						if (result.evaluationType === 'final') {
							// If the user has only one role and it's ROLE_USER, check whether if the employee
							// is checking his own evaluation, or if it's the actual employee's evaluator
							if (account.roles.length == 1 && account.roles.indexOf('ROLE_USER') == 0) {
								if (account.employeeId == result.employeeId) {
									vm.showPrint = true;
								} else {
									// Obtain actual employee's evaluator
									CurrentAllocation.get({ employeeId: result.employeeId }, function (res) {
										if (res.leaderId != undefined && account.employeeId === res.leaderId) {
											vm.showPrint = true;
										}
									});
								}
							} else {
								vm.showPrint = true;
							}
						}
						var finalEvaluationNum = vm.evaluationId.evaluationType;
						if (finalEvaluationNum == 'final') {
							vm.finalEvaluation = true;
						}

						EmployeeIsLeaderResource.get({ employeeId: vm.evaluationId.employeeId }, function (result2) {
							vm.isLeader = parseInt(result2[0]);
							if (!Mentoring.isUndefinedOrNull(result2[0])) {
								vm.loadAll = function () {
									StatesResource.query(function (result) {
										vm.statess = result;
									});
									CompetencesResource.query(function (result) {
										var aux = [];
										var j = 0;
										if (vm.isLeader === 0) {
											for (var i in result) {
												if (result[i].competenceCode != 'mando') {
													aux[j] = result[i];
													j++;
												}
											}
											vm.competences = aux;
										} else {
											vm.competences = result;
										}
									});
									PillarsResource.query(function (result) {
										vm.pillars = result;
										if (vm.isLeader === 0) {
											QuestionsResource.query({ id: 0 }, function (result) {
												vm.questionss = result;
											});
										} else {
											QuestionsResource.query(function (result) {
												vm.questionss = result;
											});
										}

										vm.select = function (index, idPregunta) {
											vm.selected[idPregunta] = index;
										};

										if (vm.evaluationId.employeeId == vm.evaluationId.leaderId) {
											vm.employeeId = vm.evaluationId.employeeId;
										} else {
											vm.evaluable.info.employeeId = vm.evaluationId.employeeId;
											vm.employeeId = vm.evaluationId.leaderId;
										}
										vm.observaciones = vm.evaluationId.observaciones;
										vm.observacionesEvaluador = vm.evaluationId.observacionesEvaluador;

										AnswersResource.query({ id: id }, function (result) {
											var seleccionados = [];
											for (var i in result) {
												seleccionados[result[i].questionId] = result[i].statesId;
												vm.selected[result[i].questionId] = result[i].statesId - 1;
											}
											vm.respuesta = seleccionados;
											AnswersSelect.query({ id: id }, function (result22) {
												if (result22.length > 0) {
													if (result22.length > 0) {
														vm.destacados[0] = result22[0].questionCode;
														vm.listSelect.push(vm.destacados[0]);
														vm.destacados[1] = result22[1].questionCode;
														vm.listSelect.push(vm.destacados[1]);
														vm.destacados[2] = result22[2].questionCode;
														vm.listSelect.push(vm.destacados[2]);
														vm.mejorar[0] = result22[3].questionCode;
														vm.listSelect.push(vm.mejorar[0]);
														vm.mejorar[1] = result22[4].questionCode;
														vm.listSelect.push(vm.mejorar[1]);
														vm.mejorar[2] = result22[5].questionCode;
														vm.listSelect.push(vm.mejorar[2]);
													}
												}
											});
										});
										StatesResource.query(function (result) {
											vm.statess = result;
										});
									});
								};
								vm.loadAll();
							}
						});
					}
				});

				var getEvaluationType = function getEvaluationType() {
					if (vm.userCanModifyType) {
						return;
					}
				};
				vm.submitForm = function (valido, datos, observaciones, observacionesEvaluador) {
					if (valido) {
						if (validarNoSeObserva(datos)) {
							vm.correcto = true;
							var employee, evaluationType, evaluationToSave, evaluator;
							if (Mentoring.isUndefinedOrNull(vm.evaluable.info.employeeId)) {
								employee = vm.employeeId;
								evaluationType = 'auto';

								evaluationToSave = AnswersEval.agrupar2(datos, employee, employee, observaciones, observacionesEvaluador, evaluationType, vm.isFinalEvaluationDate, id);
							} else {

								if (!(vm.roleDIRECTOR || vm.roleDIRECTORG || vm.roleADMIN)) {
									employee = vm.evaluable.info.employeeId;
								} else {
									employee = vm.evaluable.info.id;
								}
								evaluator = vm.employeeId;
								evaluationType = vm.isFinalEvaluationDate ? 'final' : 'eval';

								evaluationToSave = AnswersEval.agrupar2(datos, evaluator, employee, observaciones, observacionesEvaluador, evaluationType, vm.isFinalEvaluationDate, id);
							}
							// If the user can modify the evaluation type, override it
							if (vm.userCanModifyType) {
								evaluationToSave.evaluationType = vm.evaluation.evaluationType;
							}

							var numDes = 1;
							var numMej = 4;
							var answer = AnswersEval.agrupar(datos, 0, vm.isFinalEvaluationDate);
							var answerOutstanding = AnswersEval.agrupar3(0, numDes, vm.destacados, vm.isFinalEvaluationDate);
							var answerImprovable = AnswersEval.agrupar3(0, numMej, vm.mejorar, vm.isFinalEvaluationDate);

							var obj = {
								evaluation: evaluationToSave,
								answers: answer,
								outstanding: answerOutstanding,
								improvable: answerImprovable
							};
							vm.disableButton = true;
							//despues de guardar la evaluacion y recuperar el id , se guardan y se relacionan sus respuestas	     		
							AnswersEval.guardar2(obj).then(function (obj) {
								var msgModal = '';
								if (obj.data.msg == 'save.evaluation.no.mark') {
									msgModal = 'guardarCorrectoNoNota';
								} else {
									msgModal = 'guardarCorrecto';
								}
								vm.Modal = {
									msg: msgModal,
									title: 'consult.modal.ok.title',
									button: 'consult.modal.ok',
									action: function action() {
										$('#myModal').on('hidden.bs.modal', function () {
											$('#myModal').unbind('hidden.bs.modal');
											$stateParams.empleado = vm.employeeId;
											$state.go('consult');
										});
										$('#myModal').modal('hide');
									}
								};
								$('#myModal').modal('show');
							}, function (err) {
								var msg = err.data.msg || 'guardarFalla';
								vm.Modal = {
									msg: msg,
									title: 'consult.modal.error.title',
									button: 'consult.modal.ok',
									action: function action() {
										$('#myModal').modal('hide');
									}
								};
								$('#myModal').modal('show');
								vm.disableButton = false;
							});
						}
					} else {
						vm.Modal = {
							msg: 'guardarNoSeObserva',
							title: 'consult.modal.error.title',
							button: 'consult.modal.ok',
							action: function action() {
								$('#myModal').modal('hide');
							}
						};
						$('#myModal').modal('show');
						vm.disableButton = false;
					}
				};

				vm.listSelect = [];
				vm.add = function () {
					vm.listSelect = [];
					for (var i = 0; i < 3; i++) {
						if (!Mentoring.isUndefinedOrNull(vm.destacados[i])) {
							vm.listSelect.push(vm.destacados[i]);
						}
						if (!Mentoring.isUndefinedOrNull(vm.mejorar[i])) {
							vm.listSelect.push(vm.mejorar[i]);
						}
					}
				};
			}
			if ($state.current.name != 'login') {
				vm.isAuthenticated = Principal.isAuthenticated();
			}
		});
	}

	var prepareChart = function prepareChart() {
		$scope.options = {
			responsive: true,
			scaleShowLine: true,
			scaleOverride: true,
			scaleSteps: 5,
			scaleStepWidth: 20,
			scaleStartValue: 0,
			angleShowLineOut: true,
			scaleBeginAtZero: true,
			angleLineColor: 'rgba(0,0,0,.1)',
			angleLineWidth: 1,
			pointLabelFontFamily: '"Arial"',
			pointLabelFontStyle: 'normal',
			pointLabelFontSize: 10,
			pointLabelFontColor: '#666',
			pointDot: true,
			pointDotRadius: 3,
			pointDotStrokeWidth: 1,
			pointHitDetectionRadius: 20,
			datasetStroke: true,
			datasetStrokeWidth: 2,
			datasetFill: true,
			legend: {
				display: false
			}
		};

		// If there is evaluation result coming from the server, typical case
		if (vm.evaluation.evaluationResult) {
			handleEvaluationResult(vm.evaluation.evaluationResult);
		} else {
			// If not, case when the evaluation results weren't saved into db
			CalculateEvaluationResult.get({
				employeeId: vm.evaluadoo.employeeId,
				evaluationId: vm.evaluadoo.id,
				year: year_evaluation
			}, handleEvaluationResult);
		}
	};

	var handleEvaluationResult = function handleEvaluationResult(result) {
		var labelsCompetences = null;
		var dataCompetences = null;

		if (result.resultCompetences.length == 3) {
			labelsCompetences = ['Talent', 'Attitude', 'Business', 'Talent/Attitude', 'Business', 'VASS'];
			var compByPillarScore_0 = result.resultCompetences[0].scoreByPillar;
			var compByPillarScore_1 = result.resultCompetences[1].scoreByPillar;
			var compByPillarScore_2 = result.resultCompetences[2].scoreByPillar;
			dataCompetences = [compByPillarScore_0[1], compByPillarScore_0[2], compByPillarScore_0[3], compByPillarScore_1[4], compByPillarScore_1[5], compByPillarScore_2[6]];
		} else if (result.resultCompetences.length == 2) {
			labelsCompetences = ['Talent', 'Attitude', 'Business', 'VASS'];
			var compByPillarScore_0 = result.resultCompetences[0].scoreByPillar;
			var compByPillarScore_1 = result.resultCompetences[1].scoreByPillar;
			dataCompetences = [compByPillarScore_0[1], compByPillarScore_0[2], compByPillarScore_0[3], compByPillarScore_1[6]];
		}

		// Chart.js Data
		$scope.data = {
			update: false,
			labels: labelsCompetences,
			datasets: [{
				fillColor: 'rgba(151,187,205,0.2)',
				strokeColor: 'rgba(151,187,205,1)',
				pointColor: 'rgba(151,187,205,1)',
				pointStrokeColor: '#fff',
				pointHighlightFill: '#fff',
				pointHighlightStroke: 'rgba(220,220,220,1)',
				data: dataCompetences
			}]
		};
		vm.noteEvaluation = result.note;
	};

	var validarNoSeObserva = function validarNoSeObserva(datos) {
		var pillars = '';
		var pillar;
		for (var i in datos) {
			if (datos[i] === 6) {
				pillar = getPillar('preg' + i);
				// Comprobamos si existe el pillar
				if (pillar !== 0) {
					if (pillars.indexOf(pillar) < 0) {
						pillars += pillar;
					} else {
						return false;
					}
				}
			}
		}
		return true;
	};

	var getPillar = function getPillar(questionId) {
		var questions = vm.questionss;
		if (!Mentoring.isUndefinedOrNull(questions)) {
			for (var i = 0, len = questions.length; i < len; i++) {
				if (questions[i].questionsCode === questionId) {
					return questions[i].pillarId;
				}
			}
		}
		return 0;
	};

	vm.printEvaluation = function () {
		var loc = window.location;
		var printUrl = loc.origin + loc.pathname;
		printUrl = 'api/evaluation/evaluation.pdf?evaluationId=' + vm.evaluationId.id;
		window.open(printUrl);
	};

	// Check if the chartdiv is on scroll, to fire resize event.
	// It's the only way to repaint the chart...
	$(window).on('scroll', function (el, callback) {
		if ($(window).scrollTop() + window.innerHeight >= $('canvas').offset().top - $('canvas').innerHeight()) {
			window.dispatchEvent(new Event('resize'));
			// Once the event has been fired, it's not necessary anymore
			$(window).unbind('scroll');
		}
	});
}
angular.module('mentoringApp').controller('ConsultEvaluationController', ConsultEvaluationController);
//# sourceMappingURL=consultEvaluation.controller.js.map
