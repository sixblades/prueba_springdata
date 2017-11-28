/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
HeaderController.$inject = ['$scope', 'isEvaluationDate'];
angular.module('mentoringApp').directive('showValidation', function () {
    return {
        restrict: 'A',
        require: 'form',
        link: function link(scope, element) {
            element.find('.form-group').each(function () {
                var $formGroup = $(this);
                var $inputs = $formGroup.find('input[ng-model],textarea[ng-model],select[ng-model]');

                if ($inputs.length > 0) {
                    $inputs.each(function () {
                        var $input = $(this);
                        scope.$watch(function () {
                            return $input.hasClass('ng-invalid') && $input.hasClass('ng-dirty');
                        }, function (isInvalid) {
                            $formGroup.toggleClass('has-error', isInvalid);
                        });
                    });
                }
            });
        }
    };
});
//# sourceMappingURL=form.directive.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function HeaderController($scope, isEvaluationDate) {
	var vm = this;

	isEvaluationDate.get(function (isDate) {
		if (!isDate.value && !$scope.ROLE_ADMIN && !$scope.account.isLeader) {
			vm.deshabilitaAlta();
		}
	});

	vm.deshabilitaAlta = function () {
		$("#btn_alta_evaluation").addClass("disabled");
		$("#btn_alta_evaluation a").removeAttr("ui-sref");
		$("#btn_alta_evaluation a").removeAttr("href");
		$("#btn_alta_evaluation a").removeAttr("ng-class");
	};
}
angular.module('mentoringApp').controller('HeaderController', HeaderController);
//# sourceMappingURL=header.controller.js.map

/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').directive('calendar', ['Language', '$filter', function (Language, $filter) {
	return {
		scope: false,
		require: 'ngModel',
		link: function link(scope, el, attr, ngModel) {
			$.datepicker.regional.es = {
				closeText: 'Cerrar',
				prevText: '<Ant',
				nextText: 'Sig>',
				currentText: 'Hoy',
				monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
				monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
				dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
				dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
				dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
				weekHeader: 'Sm',
				dateFormat: 'dd/mm/yy',
				firstDay: 1,
				isRTL: false,
				showMonthAfterYear: false,
				yearSuffix: ''
			};

			Language.getCurrent().then(function (languages) {
				var localization = languages === 'es' ? languages : '';
				$.datepicker.setDefaults($.datepicker.regional[localization]);
			});
			var dateMin = 'today';

			// If attribute datemin is informed,
			// Add control on dateUntil. It has to be later or equal than dateFrom
			if (attr.datemin) {
				// Obtains the value of the $scope variable which holds the dateMin value
				var datemin = scope.$eval(attr.datemin);
				dateMin = $filter('date')(datemin, 'dd/MM/yyyy');

				// Adds a watcher to know when the variable changes, so we can recalculate the new dateMin
				scope.$watch(attr.datemin, function () {
					// Obtains the new dateMin
					var datemin = scope.$eval(attr.datemin);
					dateMin = $filter('date')(datemin, 'dd/MM/yyyy');

					// Destroys the datepicker, and creates it again using the new dateMin
					$(el).datepicker('destroy');
					$(el).datepicker({
						minDate: dateMin,
						onSelect: function onSelect(dateText) {
							scope.$apply(function () {
								ngModel.$setViewValue(dateText);
							});
						}
					});
				});
			}

			$(el).datepicker({
				minDate: dateMin,
				onSelect: function onSelect(dateText) {
					scope.$apply(function () {
						ngModel.$setViewValue(dateText);
					});
				}
			});
		}
	};
}]);
//# sourceMappingURL=calendar.directive.js.map

'use strict';

(function () {
    'use strict';

    angular.module('mentoringApp').filter('characters', function () {
        return function (input, chars, breakOnWord) {
            if (isNaN(chars)) {
                return input;
            }
            if (chars <= 0) {
                return '';
            }
            if (input && input.length > chars) {
                input = input.substring(0, chars);

                if (!breakOnWord) {
                    var lastspace = input.lastIndexOf(' ');
                    // Get last space
                    if (lastspace !== -1) {
                        input = input.substr(0, lastspace);
                    }
                } else {
                    while (input.charAt(input.length - 1) === ' ') {
                        input = input.substr(0, input.length - 1);
                    }
                }
                return input + '...';
            }
            return input;
        };
    }).filter('words', function () {
        return function (input, words) {
            if (isNaN(words)) {
                return input;
            }
            if (words <= 0) {
                return '';
            }
            if (input) {
                var inputWords = input.split(/\s+/);
                if (inputWords.length > words) {
                    input = inputWords.slice(0, words).join(' ') + '...';
                }
            }
            return input;
        };
    });
})();
//# sourceMappingURL=truncate.filter.js.map

/*jshint bitwise: false*/
'use strict';

(function () {
    'use strict';

    angular.module('mentoringApp').service('Base64', function () {
        var keyStr = 'ABCDEFGHIJKLMNOP' + 'QRSTUVWXYZabcdef' + 'ghijklmnopqrstuv' + 'wxyz0123456789+/' + '=';
        this.encode = function (input) {
            var output = '',
                chr1,
                chr2,
                chr3 = '',
                enc1,
                enc2,
                enc3,
                enc4 = '',
                i = 0;

            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            }

            return output;
        };

        this.decode = function (input) {
            var output = '',
                chr1,
                chr2,
                chr3 = '',
                enc1,
                enc2,
                enc3,
                enc4 = '',
                i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

            while (i < input.length) {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 !== 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 !== 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = '';
                enc1 = enc2 = enc3 = enc4 = '';
            }
        };
    }).factory('StorageService', ['$window', function ($window) {
        return {

            get: function get(key) {
                return JSON.parse($window.localStorage.getItem(key));
            },

            save: function save(key, data) {
                $window.localStorage.setItem(key, JSON.stringify(data));
            },

            remove: function remove(key) {
                $window.localStorage.removeItem(key);
            },

            clearAll: function clearAll() {
                $window.localStorage.clear();
            }
        };
    }]);
})();
//# sourceMappingURL=base64.service.js.map

/* global angular */
'use strict';

(function () {
    'use strict';

    angular.module('mentoringApp').service('ParseLinks', function () {
        this.parse = function (header) {
            if (header.length === 0) {
                throw new Error("input must not be of zero length");
            }

            // Split parts by comma
            var parts = header.split(',');
            var links = {};
            // Parse each part into a named link
            angular.forEach(parts, function (p) {
                var section = p.split(';');
                if (section.length != 2) {
                    throw new Error("section could not be split on ';'");
                }
                var url = section[0].replace(/<(.*)>/, '$1').trim();
                var queryString = {};
                url.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function ($0, $1, $2, $3) {
                    queryString[$1] = $3;
                });
                var page = queryString.page;
                if (angular.isString(page)) {
                    page = parseInt(page);
                }
                var name = section[1].replace(/rel="(.*)"/, '$1').trim();
                links[name] = page;
            });

            return links;
        };
    });
})();
//# sourceMappingURL=parse-links.service.js.map

/* jshint -W097 */
/* Filter for numbers */
'use strict';
var NumericFilter = function NumericFilter($filter) {
    return function (input) {
        if (isNaN(input)) {
            input = 0.0;
        }
        input = parseFloat(input).toFixed(2).replace(".", ",");
        return input;
    };
};
NumericFilter.$inject = ['$filter'];

angular.module('mentoringApp').filter('NumericFilter', NumericFilter);
//# sourceMappingURL=numeric.filter.js.map

/* jshint -W097 */
/* Filter for numbers */
'use strict';
var AuditService = function AuditService() {
    return {
        audit: function audit(msg) {
            var obj = {
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
                headers: { 'X-CSRF-TOKEN': header }
            });
        }
    };
};
angular.module('mentoringApp').factory('AuditService', AuditService);
//# sourceMappingURL=audit.service.js.map
