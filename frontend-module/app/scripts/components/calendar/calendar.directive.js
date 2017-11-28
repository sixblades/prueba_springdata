/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
angular.module('mentoringApp').directive('calendar', function (Language, $filter) {
	return {
		scope: false,
		require: 'ngModel',
		link: function (scope, el, attr, ngModel) {
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
				scope.$watch(attr.datemin, function() {
					// Obtains the new dateMin
					var datemin = scope.$eval(attr.datemin);
					dateMin = $filter('date')(datemin, 'dd/MM/yyyy');

					// Destroys the datepicker, and creates it again using the new dateMin
					$(el).datepicker('destroy');
					$(el).datepicker({
						minDate: dateMin,
						onSelect: function (dateText) {
							scope.$apply(function () {
								ngModel.$setViewValue(dateText);
							});
						}
					});
				});
			}
			
			$(el).datepicker({
				minDate: dateMin,
				onSelect: function (dateText) {
					scope.$apply(function () {
						ngModel.$setViewValue(dateText);
					});
				}
			});
		}
	};
});