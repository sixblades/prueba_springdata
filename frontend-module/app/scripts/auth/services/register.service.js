(function(){
'use strict';
angular.module('mentoringApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });
})();