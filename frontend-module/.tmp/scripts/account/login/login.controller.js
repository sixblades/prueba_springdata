/* jshint -W097 */
/*jshint -W030 */
/* globals angular, $, document */
'use strict';
/*@ngInject*/
function LoginController($cookies, $state, Auth, Activate, AuditService) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.companies = ['VASS', 'VASSDigital', 'Serbatic'];
    vm.company = vm.companies[0];
    vm.rememberMe = true;

    /* Obtencion del token CRSF */
    Activate.get({ key: "KEY" });

    // Recuperamos el valor de la organización de la cookie si existe
    var organization = $cookies.organization;
    if (organization !== null && organization !== undefined) {
        vm.company = organization;
    }

    vm.login = function () {
        // Comprobamos si los valores de los campos requeridos son correctos
        if (vm.username !== undefined && vm.password !== undefined && vm.company !== undefined) {
            Auth.login({
                username: vm.username,
                password: vm.password,
                company: vm.company
            }).then(function () {
                vm.authenticationError = false;
                var now = new Date();
                var time = now.getTime();
                time += 24 * 60 * 60 * 1000 * 9999;
                now.setTime(time);
                document.cookie = 'organization' + '=' + vm.company + ';expires=' + now.toGMTString() + ';path=/';
                $state.go('home');
            })['catch'](function () {
                vm.authenticationError = true;
                showLoginError('login.messages.error.authentication');
            });
        } else {
            vm.authenticationError = true;
            showLoginError('login.messages.error.form');
        }
    };
    vm.cancelarEvento = function (event) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
    };

    var showLoginError = function showLoginError(msg) {
        vm.Modal = {
            msg: msg,
            title: 'login.messages.error.title',
            button: 'login.messages.error.ok',
            action: function action() {
                $('#myModal').modal('hide');
            }
        };
        /* Now show the modal */
        $('#myModal').modal('show');
    };
}
angular.module('mentoringApp').controller('LoginController', LoginController);
//# sourceMappingURL=login.controller.js.map
