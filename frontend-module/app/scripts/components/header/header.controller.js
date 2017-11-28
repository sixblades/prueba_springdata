/* jshint -W097 */
/* globals angular, $, Mentoring*/
'use strict';
/*@ngInject*/
 function HeaderController($scope, isEvaluationDate) {
	 var vm = this;
        
	isEvaluationDate.get(function(isDate){
		if ((!isDate.value && !$scope.ROLE_ADMIN && !$scope.account.isLeader)){
			vm.deshabilitaAlta();
		}
	});
	
	vm.deshabilitaAlta = function(){
		$("#btn_alta_evaluation").addClass("disabled");
		$("#btn_alta_evaluation a").removeAttr("ui-sref");
		$("#btn_alta_evaluation a").removeAttr("href");
		$("#btn_alta_evaluation a").removeAttr("ng-class");
	};
}
angular.module('mentoringApp').controller('HeaderController', HeaderController);
