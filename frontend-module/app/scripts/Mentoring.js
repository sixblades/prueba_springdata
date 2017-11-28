/**
 * Modulo Mentoring de la aplicacion
 */
var Mentoring = (() => {
    // Private variables
    var currentDate = new Date();

	/** Manejador de resource general para la aplicacion */
	var resHandler = {
		query: { method: 'GET', isArray: true },
		get: {
			method: 'GET',
			transformResponse: function (data) {
				data = angular.fromJson(data);
				return data;
			}
		},
		update: { method: 'PUT' }
	};
	var resHandlerGET = {
		query: { method: 'GET', isArray: true },
		get: {
			method: 'GET',
			transformResponse: function (data) {
				data = angular.fromJson(data);
				return data;
			}
		}
	};
	var resHandlerGETNoTransform = {
		get: {
			method: 'GET',
			transformResponse: function (data) {
				return data;
			}
		}
	};
	
    // Common functions
	var readCookie = (cname) => {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)===' ') {  
                c = c.substring(1);
            }
			if (c.indexOf(name) === 0) {
                return c.substring(name.length,c.length);
            }
		}
		return '';
	};
	
	var undefinedOrNull = (obj) => {
		return obj===undefined || obj===null;
	};
    
    var isEmpty = (obj) => {
        var res = undefinedOrNull(obj);
        if(typeof obj === 'string' && obj === '') {
            res = true;
        }
        return res;
    };
    
    var getCurrentYear = () => {
        return currentDate.getFullYear();
    };
 
	return {
		resourceHandler: resHandler,
		resourceHandlerGET: resHandlerGET,
		resourceHandlerGETNoTransform: resHandlerGETNoTransform,
		getCookie: readCookie,
		isUndefinedOrNull: undefinedOrNull,
        isEmpty: isEmpty,
        getCurrentYear: getCurrentYear
	};
})();


