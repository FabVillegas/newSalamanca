angular.module('Salamanca', [
  'ui.router',
  'angularCharts',
  'ngDialog'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('herramienta');
	$stateProvider.
	state('herramienta', {
		url: '/herramienta',
		templateUrl: 'views/herramienta-template.html',
		controller: 'herramientaCtrl'
	});
}]);
