/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
function InformationController($rootScope, $translate, Principal, Directions) {
    
    var PREFFIX = 'InfoV&Y/';
    var textBusiness = 'information.maps.business.';
    var textStaff = 'information.maps.staff.'; 
    var vm = this;
    $rootScope.activeOption = 'information';
    
    vm.imgUrl = [];
    
    vm.getCompetencesUrl = (doc) => {
        let file = '';
        let lang = $translate.use();
        switch (doc) {
            case 1: file = lang === 'es' ? 'COMPETENCIAS_GESTION.PDF' : 'MANAGEMENT-COMPETENCES-VASSIT.PDF'; break;
            case 2: file = lang === 'es' ? 'COMPETENCIAS_MANDO.PDF' : 'MANAGEMENT&LEADERSHIP-COMPETENCES-VASSIT.PDF'; break;
        }
        return PREFFIX + 'PDFs/' + file;
    }
   
    /** Populates the imgUrl array with the URL of the imgs to show to the employee */
    vm.getMapImgs = () => {
        Principal.identity().then((account) => {
            // Check the employee organization to add one or another urls
            let organization = account.organization;
            switch(organization) {
                case 'Serbatic': vm.imgUrl.push({text: $translate.instant(textBusiness + 'Serbatic'), url: PREFFIX + 'IMGs/MapaSerbatic.png'}); break;
                case 'VASSDigital': vm.imgUrl.push({text: $translate.instant(textBusiness + 'VASSDigital'), url: PREFFIX + 'IMGs/MapaVASSDigital.png'}); break;
                case 'VASS': vm.imgUrl.push({text: $translate.instant(textBusiness + 'VASS'), url: PREFFIX + 'IMGs/MapaNegocio_es.png'},
                        {text: $translate.instant(textStaff + 'VASS'), url: PREFFIX + 'IMGs/MapaStaff_es.png'},
                        {text: $translate.instant(textBusiness + 'VASSIT'), url: PREFFIX + 'IMGs/MapaNegocio_en.png'},
                        {text: $translate.instant(textBusiness + 'LATAM'), url: PREFFIX + 'IMGs/MapaNegocio_latam.png'});  
            }
        });
    };
    
    vm.initPopup = () => {
        $('.popup_image').magnificPopup({
          type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
          image: {
            verticalFit: true
          },
          zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
          }
        });
    }
};
angular.module('mentoringApp').controller('InformationController', InformationController);
