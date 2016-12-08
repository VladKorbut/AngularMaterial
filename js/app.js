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
		$http.get("https://api-test-task.decodeapps.io/projects?session="+$cookies.get('user'))
		.then(function(data){
			$scope.projects = data.data.projects; 
		})
		$http.get("https://api-test-task.decodeapps.io/account?session="+$cookies.get('user'))
		.then(function(data){
			$scope.profile = data.data.Account;
		})
	}
	$scope.createProj = function(){
		var request = {
			'session':$cookies.get('user'),
			'Project':{
				'title' : $scope.projectName,
			}
		}
		$http.post("https://api-test-task.decodeapps.io/projects/project", request)
		.then(function(data){
			
		})
	}
}]);
app.controller('TaskCtrl',['$scope', '$http', '$mdSidenav',	
function($scope, $http, $mdSidenav) {
    $scope.toggleRight = buildToggler('createTask');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
}]);