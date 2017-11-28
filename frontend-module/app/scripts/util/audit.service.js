/* jshint -W097 */
/* Filter for numbers */
'use strict';
var AuditService = () => {
    return {
        audit: (msg) => {
            let obj = {
                location: msg.location,
                type: msg.type,
                element: msg.element,
                msg: msg.msg
            };
			var header = Mentoring.getCookie('CSRF-TOKEN');
			 $.ajax({
				 url: 'api/webaudit',
				 method: 'POST',
				 data: JSON.stringify(obj),
				 contentType: 'application/json; charset=utf-8',
				 headers: {'X-CSRF-TOKEN': header} 
			 });
        }
    }
}
angular.module('mentoringApp').factory('AuditService', AuditService);