/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('AuthServerProvider', function ($log, $http, localStorageService, $window) {
    return {
        login: function login(credentials) {
            var data = 'j_username=' + credentials.company + ':' + encodeURIComponent(credentials.username) + '&j_password=' + encodeURIComponent(credentials.password) + '&submit=Login';
            return $http.post('api/authentication', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (response) {
                localStorageService.set('token', $window.btoa(credentials.username + ':' + credentials.password));
                return response;
            }).error(function () {
                $log.error("Login error");
            });
        },
        logout: function logout() {
            // logout from the server
            $http.post('api/logout').success(function (response) {
                localStorageService.clearAll();
                return response;
            });
        },
        getToken: function getToken() {
            var token = localStorageService.get('token');
            return token;
        },
        hasValidToken: function hasValidToken() {
            var token = this.getToken();
            return !!token;
        }
    };
});
//# sourceMappingURL=auth.session.service.js.map
