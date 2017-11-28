/* jshint -W097 */
/* Filter for numbers */
'use strict';
var NumericFilter = ($filter) => {
    return (input) => {
        if (isNaN(input)) {
            input = 0.0;
        }
        input = parseFloat(input).toFixed(2).replace(".",",");
        return input;
    }
}

angular.module('mentoringApp').filter('NumericFilter', NumericFilter);