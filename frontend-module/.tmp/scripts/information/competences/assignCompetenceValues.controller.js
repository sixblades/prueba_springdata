/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function AssignCompetencesValues($rootScope, $filter, $log, $sce, $state, $translate, Principal, PositionService, WageBandService, WeightQuestionService, StatesResource) {

    var vm = this;
    var positionsCopy;

    // Function that inits the values of the controller.
    vm.initCtrl = function () {
        if ($state.current.name != 'login') {
            Principal.identity().then(function (account) {
                if ($rootScope.roleRRHH || $rootScope.roleAdmin) {
                    vm.wageBand = null;
                    vm.position = null;

                    // Obtains the values for the positions combo and wageBands combo.
                    PositionService.query({}, function (result) {
                        // Iterate over all the positions to add the description to its name
                        // We do this instead of using a filter on the combo because this way there is less watchers
                        // on the page, thus the performance it's better
                        vm.positions = result.map(function (res) {
                            var name = $translate.instant(res.description) + ' - ' + $translate.instant(res.nameKey);
                            res.name = name;
                            return res;
                        });
                    });
                    WageBandService.query({}, function (result) {
                        // Iterate over all the wageBands to obtain all the wageBands which are not outsourcing and to
                        // mark the staff wage bands. We do this for the same reason as above.
                        vm.wageBands = result.filter(function (wb) {
                            return wb.outsourcing === 0;
                        }).map(function (wb) {
                            if (wb.business === 0) {
                                wb.name = wb.name + ' Staff';
                            }
                            return wb;
                        });
                    });
                } else {
                    $log.error('Usuario intentado acceder a un area donde no tiene autorizacion -> ' + $state.current.name);
                    $state.go('home');
                }
            });
            vm.Modal = {};
        }
    };

    // Handles the value change on the wageBand combo
    vm.changeWageBandCombo = function () {
        // First check is there is a copy of all the positions in memory
        if (Mentoring.isUndefinedOrNull(positionsCopy)) {
            positionsCopy = angular.copy(vm.positions);
        }

        // If no wageBand selected, show all the positions
        if (Mentoring.isUndefinedOrNull(vm.wageBand)) {
            vm.positions = angular.copy(positionsCopy);
        } else {
            vm.positions = positionsCopy.filter(function (pos) {
                return pos.wageBandId === vm.wageBand.id;
            });
        }
    };

    // Handles the value change on the position combo
    vm.changePositionCombo = function () {
        if (!Mentoring.isUndefinedOrNull(vm.position)) {
            // Obtains the values for the weight questions combo
            if (Mentoring.isUndefinedOrNull(vm.states)) {
                StatesResource.query({}, function (result) {
                    vm.states = result;
                    // Iterate over the states to get its tranlation
                    vm.states.map(function (s) {
                        var key = 'Estado' + s.id;
                        s.text = $translate.instant(key);
                    });
                    // Once we have the states we could request the weightQuestions
                    getWeightQuestions();
                });
            } else {
                getWeightQuestions();
            }
        }
    };

    // Saves the weight question values for a given position
    vm.saveWeightQuestions = function () {
        // First of all, make a copy of all questions to recover them later
        var wqAux = angular.copy(vm.weightQuestions);

        // Obtains the total sum of the values
        var totalSum = 0;
        vm.weightQuestions.map(function (wq) {
            // As we are iterating over the weight questions, we also delete the statedId variable which is
            // not present on the Java bean.
            delete wq.stateId;
            totalSum += wq.value;
        });

        // Validate the answers first
        if (vm.weightQuestions.length === 25 && totalSum !== 57 || vm.weightQuestions.length === 18 && totalSum !== 42) {
            showModal({ msg: 'assign.competences.modal.error.sum',
                title: 'assign.competences.modal.error.form.title' });

            // Finally, recover the question weights
            vm.weightQuestions = angular.copy(wqAux);
            return;
        }

        // Save the answers
        WeightQuestionService.saveWeightQuestions(vm.weightQuestions, function (result) {
            showModal({ msg: 'assign.competences.modal.save.ok',
                title: 'assign.competences.modal.save.ok.title' });
        }, function (error) {
            showModal({ msg: 'assign.competences.modal.save.error',
                title: 'assign.competences.modal.save.error' });
        });

        // Finally, recover the question weights
        vm.weightQuestions = angular.copy(wqAux);
    };

    vm.getQuestionCode = function (questionCode) {
        vm.codePregunta = questionCode;
        vm.definicionInfo = $sce.trustAsHtml($translate.instant('evaluation.info.' + questionCode + '.comportamientoInfo'));
    };

    var getWeightQuestions = function getWeightQuestions() {
        WeightQuestionService.getByPositionId({ positionId: vm.position.id }, function (result) {
            // Iterate over the weight questions to obtain its competence and pillar name
            var competenceId = 0;
            var pillarId = 0;
            var year = undefined;
            result.map(function (wq) {
                vm.locked = wq.locked === 1 ? true : false;
                year = wq.year;
                if (competenceId !== wq.question.competence.competenceCode) {
                    var competenceStr = 'evaluation.' + wq.question.competence.competenceCode;
                    competenceId = wq.question.competence.competenceCode;
                    wq.competence = $filter('translate')(competenceStr);
                }
                if (pillarId !== wq.question.pillar.pillarCode) {
                    pillarId = wq.question.pillar.pillarCode;
                    var pillarStr = 'evaluation.' + wq.question.pillar.pillarCode;
                    wq.pillar = $filter('translate')(pillarStr);
                }
                wq.stateId = '' + wq.value;
            });
            vm.weightQuestions = result;

            // Now check, if the year of the position is the same as the current year
            var now = new Date();
            vm.sameYear = year === now.getFullYear();
        });
    };

    vm.changeState = function (wq) {
        wq.value = parseInt(wq.stateId);
    };

    var showModal = function showModal(opts) {
        if (Mentoring.isUndefinedOrNull(vm.Modal)) {
            vm.Modal = {};
        }
        vm.Modal.msg = opts.msg;
        vm.Modal.title = opts.title;
        vm.Modal.button = opts.button || 'assign.competences.modal.ok', vm.Modal.action = opts.action || function () {
            $('#myModal').modal('hide');
        };
        $('#myModal').modal('show');
    };

    // Init the controller
    vm.initCtrl();
}

// Custom filter to show only specific competences values on the combos
function CustomCompetencesFilter() {
    return function (items, n, question) {
        // Array which will contains the filter values
        var filtered = [];

        // Iterate over all items to process it
        items.map(function (item) {
            // Obtains the competence id
            var compId = question.question.competenceId;
            // If competence = Etica, show only 4 and 6
            if (compId === 3) {
                if (item.id === 4 || item.id === 6) {
                    filtered.push(item);
                }
                // Otherwise, show 1, 3 and 5
            } else {
                    if (item.id === 1 || item.id === 3 || item.id === 5) {
                        filtered.push(item);
                    }
                }
        });
        // Return the filteres list of values
        return filtered;
    };
};
angular.module('mentoringApp').controller('AssignCompetencesController', AssignCompetencesValues);
angular.module('mentoringApp').filter('customCompetencesFilter', CustomCompetencesFilter);
//# sourceMappingURL=assignCompetenceValues.controller.js.map
