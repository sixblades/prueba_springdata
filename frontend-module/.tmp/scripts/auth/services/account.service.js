'use strict';

(function () {
    'use strict';
    angular.module('mentoringApp').factory('Account', function ($resource) {
        return $resource('api/account', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function response(_response) {
                        // expose response
                        return _response;
                    }
                }
            }
        });
    });
})();
//# sourceMappingURL=account.service.js.map
