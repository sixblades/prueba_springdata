/* jshint -W097 */
/* Controller for Increments Table functionality */
'use strict';
/*@ngInject*/
function IncrementsController($rootScope, PositionIncreases, EvaluationMarkService, WageBandService, WageBandPositionService, DirectionsService, $window) {
    var vm = this;
    /* Controller variables */
    vm.direction = null;
    vm.year = null;
    vm.showTables = false;
    vm.saveChanges = false;
    vm.generalIncrease = 0.0;

    $rootScope.activeOption = 'increments';
    var defaults = {};

    /* Obtains the years */
    PositionIncreases.getYears({}, function (result) {
        vm.years = result;
    });

    /* Obtains the directions */
    DirectionsService.query({}, function (result) {
        vm.directions = result;
    });

    /* Obtains from DB the IDs for marks, wage bands and wage band positions for the default object */
    EvaluationMarkService.query({}, function (result) {
        defaults.evaluationMarks = result;
    });
    WageBandService.query({}, function (result) {
        defaults.wageBands = result;
    });
    WageBandPositionService.query({}, function (result) {
        defaults.wageBandPositions = result;
    });

    /* Search for the positions */
    vm.searchPositions = function () {
        /* If both direction and year are selected, do it */
        if (vm.direction !== null && vm.year !== null) {
            /* Reset view flags to default */
            vm.showTables = false;
            vm.saveChanges = false;
            vm.generalIncrease = 0.0;

            /* Reset vm.positions to default */
            vm.positions = getDefaultPositions();
            /* At first, we can save changes always */
            vm.saveChanges = true;

            PositionIncreases.query({ year: vm.year, direction: vm.direction.id }, function (result) {
                /* If there is no result for the given year, we search the year before.
                Only if year is current year, so this way we can add new year positions starting from the last year positions. */
                if (result.noPositionIncreases && vm.year === Mentoring.getCurrentYear()) {
                    /* Request to year before */
                    PositionIncreases.query({ year: vm.year - 1, direction: vm.direction.id }, function (result) {
                        handleSearchPositions(result, true);
                    });
                } else {
                    handleSearchPositions(result, false);
                }
                vm.saveChanges = result.canSave;
            });
            /* Othewise, show a warning modal */
        } else {
                vm.Modal = {
                    msg: 'increments.increments.modal.warning.select',
                    title: 'increments.increments.modal.warning.title',
                    button: 'increments.increments.modal.ok',
                    action: function action() {
                        $('#myModal').modal('hide');
                    }
                };
                /* Now show the modal */
                $('#myModal').modal('show');
            }
    };

    /* Send a save request to server */
    vm.savePositions = function () {
        /* Creates object to send */
        var buss = vm.positions.business;
        var staff = vm.positions.staff;
        var object = {
            v1: [], v2: [], v3: [], v4: []
        };
        for (var V in buss) {
            var vName = V.toLowerCase();
            for (var p in buss[V]) {
                buss[V][p].map(function (pos) {
                    object[vName].push(pos);
                });
            }
        };
        for (var V in staff) {
            var vName = V.toLowerCase();
            for (var p in buss[V]) {
                staff[V][p].map(function (pos) {
                    object[vName].push(pos);
                });
            }
        };
        object.generalIncrease = vm.generalIncrease;

        /* Send request */
        PositionIncreases.savePositions({ direction: vm.direction.id }, object,
        /* If successful request... */
        function (result) {
            /* Creates a the object which contains the modal info to show */
            vm.Modal = {
                msg: 'increments.increments.modal.success',
                title: 'increments.increments.modal.success.title',
                button: 'increments.increments.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                    $window.location.reload();
                }
            };
            /* Now show the modal */
            $('#myModal').modal('show');
            /* If error... */
        }, function (error) {
            vm.Modal = {
                msg: 'increments.increments.modal.error',
                title: 'increments.increments.modal.error.title',
                button: 'increments.increments.modal.ok',
                action: function action() {
                    $('#myModal').modal('hide');
                }
            };
            $('#myModal').modal('show');
        });
    };

    /* Handles the positionIncreases response object to render the tables */
    var handleSearchPositions = function handleSearchPositions(result, removeId) {
        /* If there arent result, leave vm.positions as default */
        if (!result.noPositionIncreases) {
            /* First, reset the item's P arrays. This its easier to add the obtained values from server. */
            vm.positions = getEmptyPositions();

            /* Sets the general increase */
            vm.generalIncrease = result.generalIncrease;

            /* Iterate over the result properties looking for the arrays which contains the P values. */
            for (var item in result) {
                var V = result[item];
                /* If the item is array, iterate it. */
                if (Array.isArray(V)) {
                    V.map(function (i) {
                        /* Check isBusiness flag to know is whether is business position or not. */
                        var dest = vm.positions.staff[item];
                        if (i.isBusiness) {
                            dest = vm.positions.business[item];
                        }
                        /* Push the position to destination object */
                        if (removeId) {
                            i.id = null;
                        }
                        dest[i.name].push(i);
                    });
                }
            }
        }
        vm.showTables = true;
    };

    /* Returns a Postions object with empty P arrays. */
    var getEmptyPositions = function getEmptyPositions() {
        return {
            business: {
                v1: { P1: [], P2: [], P3: [], P4: [] },
                v2: { P1: [], P2: [], P3: [], P4: [] },
                v3: { P1: [], P2: [], P3: [], P4: [] },
                v4: { P1: [], P2: [], P3: [], P4: [] }
            },
            staff: {
                v1: { P1: [], P2: [], P3: [], P4: [] },
                v2: { P1: [], P2: [], P3: [], P4: [] },
                v3: { P1: [], P2: [], P3: [], P4: [] },
                v4: { P1: [], P2: [], P3: [], P4: [] }
            }
        };
    };

    /* Returns a default object representing an empty position increases */
    var getDefaultPositions = function getDefaultPositions() {
        var obj = {
            business: {},
            staff: {}
        };
        /* Obtains the code for each evaluation mark */
        var fId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'F';
        }).map(function (m) {
            return m.id;
        });
        var dId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'B';
        }).map(function (m) {
            return m.id;
        });
        var cId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'A';
        }).map(function (m) {
            return m.id;
        });
        var bId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'A+';
        }).map(function (m) {
            return m.id;
        });
        var aId = defaults.evaluationMarks.filter(function (e) {
            return e.code === 'A++';
        }).map(function (m) {
            return m.id;
        });

        for (var i = 1; i < 5; i++) {
            var v = 'V' + i;
            var vName = 'V' + i;
            obj.business[v] = {};
            obj.staff[v] = {};
            /* Obtains the list of wage band ids which corresponds */
            var wageBandId = {};
            defaults.wageBands.filter(function (w) {
                return w.name === vName;
            }).map(function (p) {
                if (p.business) {
                    wageBandId.business = p.id;
                } else {
                    wageBandId.staff = p.id;
                }
            });

            /* Creates the object */
            for (var z = 1; z < 5; z++) {
                var p = 'P' + z;
                var pId = defaults.wageBandPositions.filter(function (pos) {
                    return pos.name === p;
                });
                obj.business[v][p] = [{ positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: fId[0], markCode: 'F', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: dId[0], markCode: 'B', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: cId[0], markCode: 'A', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: bId[0], markCode: 'A+', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.business, isBusiness: true, markId: aId[0], markCode: 'A++', value: 0.0 }];
                obj.staff[v][p] = [{ positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: fId[0], markCode: 'F', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: dId[0], markCode: 'B', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: cId[0], markCode: 'A', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: bId[0], markCode: 'A+', value: 0.0 }, { positionId: pId[0].id, bandName: vName, bandId: wageBandId.staff, isBusiness: false, markId: aId[0], markCode: 'A++', value: 0.0 }];
            }
        }
        return obj;
    };
};
angular.module('mentoringApp').controller('IncrementsController', IncrementsController);
//# sourceMappingURL=increments.controller.js.map
