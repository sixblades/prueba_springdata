/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').factory('Auth', function ($rootScope, $state, $q, $translate, Activate, Principal, AuthServerProvider, $log) {
    return {
        login: function login(credentials, callback) {
            var cb = callback || angular.noop;
            var deferred = $q.defer();

            AuthServerProvider.login(credentials).then(function (data) {
                // retrieve the logged account information
                Principal.identity(true).then(function () {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    $log.log('Usuario identificado correctamente');
                });
                deferred.resolve(data);

                return cb();
            })['catch']((function (err) {
                this.logout();
                Activate.get({ key: "KEY" });
                deferred.reject(err);
                return cb(err);
            }).bind(this));

            return deferred.promise;
        },

        logout: function logout() {
            AuthServerProvider.logout();
            Principal.authenticate(null);
        },

        authorize: function authorize(force) {
            return Principal.identity(force).then(function () {
                var isAuthenticated = Principal.isAuthenticated();
                if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {
                    if (isAuthenticated) {
                        // user is signed in but not authorized for desired state
                        $state.go('accessdenied');
                    } else {
                        // user is not authenticated. stow the state they wanted before you
                        // send them to the signin state, so you can return them when you're done
                        $rootScope.returnToState = $rootScope.toState;
                        $rootScope.returnToStateParams = $rootScope.toStateParams;

                        // now, send them to the signin state so they can log in
                        $state.go('login');
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=auth.service.js.map
