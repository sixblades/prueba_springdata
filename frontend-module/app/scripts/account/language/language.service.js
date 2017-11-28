/* jshint -W097 */
/* globals angular, $*/
'use strict';
angular.module('mentoringApp')
.factory('Language', ["$q", "$translate", "LANGUAGES", function ($q, $translate, LANGUAGES) {
    return {
        getCurrent: function () {
            var deferred = $q.defer();
            var language = $translate.storage().get('NG_TRANSLATE_LANG_KEY');

            if (angular.isUndefined(language)) {
                language = 'es';
            }

            deferred.resolve(language);
            return deferred.promise;
        },
        getAll: function () {
            var deferred = $q.defer();
            deferred.resolve(LANGUAGES);
            return deferred.promise;
        }
    };
}])
.constant('LANGUAGES', [
    /*
    Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    They are written in English to avoid character encoding issues (not a perfect solution)
    */
    'es', 'en']
);





