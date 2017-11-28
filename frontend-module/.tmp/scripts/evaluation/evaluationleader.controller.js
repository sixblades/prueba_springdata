/* jshint -W097 */
/* globals angular, $, Mentoring, dato*/
'use strict';
/*@ngInject*/
function EvaluationleaderController(QuestionsResource, StatesResource, AnswersResourceEL, AnswersResource, Empleados, EmployeeEvaluationResource, CompetencesResource, PillarsResource) {

    var vm = this;
    vm.states = [];
    vm.empleado = [];
    vm.question = [];
    vm.competence = [];
    vm.pillar = [];

    vm.loadAll = function () {
        QuestionsResource.query(function (result) {
            vm.questionss = result;
        });
        StatesResource.query(function (result) {
            vm.statess = result;
        });
        CompetencesResource.query(function (result) {
            vm.competences = result;
        });
        PillarsResource.query(function (result) {
            vm.pillars = result;
        });
    };
    vm.loadAll();

    vm.empleado = [];
    vm.empleados = [];
    vm.mando = [];
    vm.mandos = [];
    Empleados.query(function (result) {
        var empleados = [];
        var mandos = [];
        var k = 0;
        var j = 0;
        for (var i in result) {
            if (result[i].leaderId == dato) {
                empleados[k] = result[i];
                k++;
            }
            if (result[i].leader == 1) {
                mandos[j] = result[i];
                j++;
            }
        }
        vm.empleados = empleados;
        vm.mandos = mandos;
    });

    vm.changeMando = function (dato) {
        vm.loadAll();
        vm.empleado = [];
        vm.empleados = [];
        var empleados = [];
        Empleados.query(function (result) {
            var k = 0;
            for (var i in result) {
                if (result[i].leaderId == dato.employeeId) {
                    empleados[k] = result[i];
                    k++;
                }
            }
            vm.empleados = empleados;
        });
    };

    vm.change = function (dato) {
        vm.loadAll();

        vm.submitForm = function (datos, observaciones) {
            var usuario = dato.employeeId;
            var leader = vm.mando.employeeId;
            var respuestaJSON = AnswersResourceEL.agrupar(datos, usuario);
            AnswersResourceEL.guardar(respuestaJSON);

            var respuestaJSON2 = AnswersResourceEL.agrupar2(datos, usuario, observaciones, leader);
            AnswersResourceEL.guardar2(respuestaJSON2);
        };

        vm.respuesta = [];
        vm.observaciones = "Escriba aquí las observaciones";

        EmployeeEvaluationResource.query({ employeeId: dato.employeeId }, function (result) {
            var observaciones = null;
            var codigoResp = null;
            for (var j in result) {
                if (result[j].leaderId == vm.mando.employeeId.employeeId) {
                    codigoResp = result[j].answerId;
                    observaciones = result[j].observaciones;
                }
            }

            vm.observaciones = observaciones;
            if (codigoResp !== undefined) {
                AnswersResource.query({ id: codigoResp }, function (result) {
                    var seleccionados = [];
                    for (var i in result) {
                        seleccionados[result[i].questionId] = result[i].statesId;
                    }
                    vm.respuesta = seleccionados;
                });
            }
            vm.observaciones = result[0].observaciones;
        });
    };
}
angular.module('mentoringApp').controller('EvaluationleaderController', EvaluationleaderController);
//# sourceMappingURL=evaluationleader.controller.js.map
