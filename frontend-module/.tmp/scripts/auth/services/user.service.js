'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('User', function ($resource) {
        return $resource('api/users/:login', {}, {
            'query': { method: 'GET', isArray: true },
            'get': {
                method: 'GET',
                transformResponse: function transformResponse(data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    });
})();
//# sourceMappingURL=user.service.js.map
