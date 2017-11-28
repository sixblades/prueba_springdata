/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function RolesController($rootScope, EmpleadosRL, Roles, RolesUsuario, Guardar, Borrar) {
        var vm = this;

        vm.empleado = [];
        vm.roles = [];
        vm.rol = '';
        vm.correcto = false;
        vm.habilitado = false;

        // Activamos la opción de menú Configuración
        $rootScope.activeOption = "configuration";

        vm.loadAll = () => {
                EmpleadosRL.query((result1) => {
                        vm.empleados = result1;
                });
                Roles.query((result2) => {
                        vm.roles = result2;
                });
        };
        vm.loadAll();

        vm.change = function () {
                if ($('#role').hasClass('ng-dirty')) {
                        vm.habilitado = false;
                }
                RolesUsuario.query({ userId: vm.empleado.id }, (result3) => {
                        if (result3.length > 0) {
                                vm.rol = result3[0].authorityName;
                                if (vm.rol === 'ROLE_ADMIN') {
                                        vm.habilitado = false;
                                } else {
                                        vm.habilitado = true;
                                }
                        } else {
                                vm.rol = 'ROLE_USER';
                                vm.habilitado = true;
                        }
                });
        };

        vm.guardar = (userId, authorityName, valido) => {
                if (valido) {
                        vm.correcto = true;
                        if (authorityName === 'ROLE_USER') {
                                Borrar.borrar({ id: userId });
                        } else {
                                var respuestaJSON = Guardar.agrupar(userId, authorityName);
                                Guardar.guardar(respuestaJSON);
                        }
                }
        };
}
angular.module('mentoringApp').controller('RolesController', RolesController);