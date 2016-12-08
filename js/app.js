var app = angular.module('app', ['ngMaterial', 'ngCookies']);
app.controller('AppCtrl',['$scope','$cookies', '$http', '$mdSidenav',	
function($scope, $cookies, $http, $mdSidenav) {
	var getProj = function(){
			$http.get("https://api-test-task.decodeapps.io/projects?session="+$cookies.get('user'))
			.then(function(data){
		    	console.log(data.data.projects);
				$scope.projects = data.data.projects; 
			})
		}
	var getAccount = function(){
		$http.get("https://api-test-task.decodeapps.io/account?session="+$cookies.get('user'))
		.then(function(data){
			$scope.profile = data.data.Account;
		})
	}
    $scope.toggleRight = buildToggler('right');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
	if(!$cookies.get('user')){
		$http.post("https://api-test-task.decodeapps.io/signup")
	    .then(function(response) {
	        $cookies.put('user', response.data.session);
	    });
	    getProj();
		getAccount();
	}else{
		getProj();
		getAccount();
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
		getProj();
	}
}]);
app.controller('TaskCtrl',['$scope','$cookies', '$http', '$mdSidenav',	
function($scope, $cookies, $http, $mdSidenav){	
    $scope.toggleRight = buildToggler('createTask');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      }
    }
    $scope.createTask= function(){
		var request = {
			'session':$cookies.get('user'),
			'Project':{
				'id' : 17883,
			},
			'Task': {
			    'title': $scope.taskName,
			    'description': $scope.taskDesk
			  }
		}
		$http.post("https://api-test-task.decodeapps.io/tasks/task", request)
		.then(function(data){
			
		})
	}
	var getProj = function(){
		var request = {
			'session':$cookies.get('user'),
			'Project':{
				'id' : 17883,
			},
			'Task': {
			    'title': $scope.taskName,
			    'description': $scope.taskDesk
			  }
		}
			$http.get("https://api-test-task.decodeapps.io/tasks?session="+$cookies.get('user'))
			.then(function(data){
		    	console.log(data.data.projects);
				$scope.projects = data.data.projects; 
			})
		}
}]);