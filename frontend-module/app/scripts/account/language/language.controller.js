/* jshint -W097 */
/* globals angular, $*/
'use strict';
/*@ngInject*/
function LanguageController($translate, Language) {
    var vm = this;

    Language.getCurrent().then(function (lang) {
        vm.selected = lang;
    });

    vm.changeLanguage = function (languageKey) {
        $translate.use(languageKey).then(function () {
            vm.selected = languageKey;
        });
        // Cambiamos el idioma del calendario
        $.datepicker.setDefaults($.datepicker.regional[languageKey]);
    };

    Language.getAll().then(function (languages) {
        vm.languages = languages;
    });
}
angular.module('mentoringApp').controller('LanguageController', LanguageController);
