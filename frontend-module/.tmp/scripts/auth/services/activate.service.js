'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Activate', function ($resource) {
        return $resource('api/activate', {}, {
            'get': { method: 'GET', params: {}, isArray: false }
        });
    });
})();
//# sourceMappingURL=activate.service.js.map
