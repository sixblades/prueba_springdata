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

angular.module('mentoringApp').filter('NumericFilter', NumericFilter);
//# sourceMappingURL=numeric.filter.js.map
