(function(){
'use strict';
angular.module('mentoringApp')
    .factory('Password', function ($resource) {
        return $resource('api/account/change_password', {}, {
        });
    });
})();