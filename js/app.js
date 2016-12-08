var app = angular.module('app', ['ngMaterial', 'ngCookies']);
app.controller('AppCtrl',['$scope','$cookies', '$http', '$mdSidenav',	
function($scope, $cookies, $http, $mdSidenav) {
    $scope.toggleRight = buildToggler('right');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
	if(!$cookies.get('user')){
		$http.post("https://api-test-task.decodeapps.io/signup")
	    .then(function(response) {
	    	console.log(response.data);
	        $cookies.put('user', response.data.session);
	    });
	}else{
		$http.get("https://api-test-task.decodeapps.io/projects?session="+ $cookies.get('user'))
		.then(function(data){
			$scope.projects = data.data.projects;
			console.log($scope.projects);
		})
	}
}]);