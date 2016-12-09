var app = angular.module('app', ['ngMaterial', 'ngCookies']);
app.factory('currentProject', function() {
  var _project ;
  return {
        setProject: function (project) {
            _project = project;
        },
        getProject: function () {
            return _project;
        }
    };
});
app.controller('AppCtrl',['$scope','$cookies', '$http', '$mdSidenav','currentProject',	
function($scope, $cookies, $http, $mdSidenav,currentProject) {
	
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
	}
	var getProj = function(){
			$http.get("https://api-test-task.decodeapps.io/projects?session="+$cookies.get('user'))
			.then(function(data){
				$scope.projects = data.data.projects; 
				currentProject.setProject(data.data.projects[0].Project.id);
			})
		}();
	var getAccount = function(){
		$http.get("https://api-test-task.decodeapps.io/account?session="+$cookies.get('user'))
		.then(function(data){
			$scope.profile = data.data.Account;
		})
	}();
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
	$scope.selectProj = function(proj){
		currentProject.setProject(proj);
	}
}]);
app.controller('TaskCtrl',['$scope','$cookies', '$http', '$mdSidenav','currentProject',	
function($scope, $cookies, $http, $mdSidenav, currentProject){	
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
				'id' : currentProject.getProject(),
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
	$scope.getTask = function(){
		var request = {
			'session': $cookies.get('user'),
			'project_id' : currentProject.getProject(),
			'paging_size':20,
			'paging_offset':0,
		}
			$http.get("https://api-test-task.decodeapps.io/tasks", {params: request})
			.then(function(data){
		    	$scope.tasks = data.data.tasks;
			})
		}
	$scope.completeTask = function(id){
		var request = {
			'session': $cookies.get('user'),
			'Task':{'id': id},
		}
		$http.post("https://api-test-task.decodeapps.io/tasks/task/complite",  request)
		.then(function(data){

		})
	}
}]);
