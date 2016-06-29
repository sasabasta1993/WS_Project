'use strict';



angular.module('menu-bar').controller('CreateProjectController', ['$scope','$location','$http','$timeout','$resource','ProjectOp','UsersOp','Availableusers','Authentication',
	function($scope,$location,$http,$timeout,$resource,ProjectOp,UsersOp,Availableusers,Authentication) {
		// Controller Logic
		// ...
		var admin;
		var currentUser=Authentication.user;

		//redirect to specified adress
		$scope.redirect=function(path){
			//alert();
			$location.path(path);
		};


		
		$scope.availableUsers=Availableusers.query();


		
		$scope.availableUsers2=[];
		var map = new Map();
		console.log('ulazak u for');


		//$scope.availableUsers.push({firstName:'Sasa'});
		//$scope.availableUsers.push({firstName:'Jovan'});
		

		$scope.selectedUsers=[];

		$scope.errorMessage1='';
		$scope.errorMessage2='';
		$scope.errorMessage='';

		$scope.selectedUser1='default';
		$scope.selectedUser2='default';




		$scope.createProject=function(){
			$scope.project.projectUsers=[];

			

			for(var i=0;i<$scope.selectedUsers.length;i++)
			{
				$scope.project.projectUsers.push({_id:$scope.selectedUsers[i]._id});

			}

				$scope.project.projectAdmin=currentUser._id;

				
				var newProject=new ProjectOp($scope.project);


				newProject.$save(function(response) {

				var projectUsersResponse=[];

				projectUsersResponse=response.projectUsers;

				if(projectUsersResponse){
					for(var r=0;r<projectUsersResponse.length;r++){
						updateUser({_id : projectUsersResponse[r]._id,
									relatedProject:response._id});
					}
				}

				var projectsId=[];
				if(currentUser.hasOwnProperty('myProjectsId'))
				{
				projectsId=currentUser.myProjectsId;
				projectsId.push(response._id);
				}
				else
				{
				projectsId.push(response._id);
				}

				var projectId;
				var p=currentUser._id;
				if(projectsId.length > 0){
					updateUser({_id : currentUser._id,
					//relatedProject: response._id,
					myProjectsId: projectsId,
					roles: ['admin']});
				}
				else
				{
					updateUser({_id : currentUser._id,
					//relatedProject: response._id,
					myProjectsId: projectsId,
					roles: ['admin']});
				}




				$scope.project.name='';
				//$scope.availableUsers=$scope.selectedUsers;
				$scope.selectedUsers=[];
				$scope.errorMessage='Project created';
				$scope.selectedUser1='default';
				$scope.selectedUser2='default';
				$scope.availableUsers=Availableusers.query();
				$timeout(function(){
				$scope.errorMessage = '';
       			},1500);
				
				}, function(errorResponse) {
					$scope.errorMessage=errorResponse.data.message;
				

					$timeout(function(){
						$scope.errorMessage = '';
       				},1500);
				
			});


		};




		$scope.addUser=function(){
			if(($scope.selectedUser1 !== 'default'))
			{

			console.log($scope.selectedUser1);
			var parsedValues=$scope.selectedUser1.split('&',2);
			var idSelectedValue=parsedValues[0];
			var displayNameSelectedValue=parsedValues[1];

			$scope.selectedUsers.push({_id:idSelectedValue,displayName:displayNameSelectedValue});

			removeUserArray($scope.availableUsers,idSelectedValue);
		
			}
			else
			{
				$scope.errorMessage1='Niste izabrali nijednog clana.';

				$timeout(function(){
					$scope.errorMessage1 = '';
       			},1500);
			}
		};


		

		$scope.removeUser=function()
		{
			if(($scope.selectedUser2 !== 'default'))
			{
				var parsedValues=$scope.selectedUser2.split('&',2);
				var idSelectedValue=parsedValues[0];
				var displayNameSelectedValue=parsedValues[1];

				removeUserArray($scope.selectedUsers,idSelectedValue);
				
				$scope.availableUsers.push({_id:idSelectedValue,displayName:displayNameSelectedValue});
			}
			else
			{
				$scope.errorMessage2='Niste izabrali nijednog clana.';
				$timeout(function(){
    			 $scope.errorMessage2 = '';
       			},1500);
			}
		};



		$scope.initUsers = function() {
			$http.get('/users').success(function(response) {
				console.log('init users function');
				// If successful we assign the response to the global user model
				$scope.availableUsers = response;

				// And redirect to the index page
				//$location.path('/create-project');
			}).error(function(response) {
				console.log('error initUsers');
				$scope.error = response.message;
			});
		};


		var updateUser=function(param)
		{
			var updateUser=new UsersOp(param);

				updateUser.$update(function(response) {

					
					
				}, function(response) {
					$scope.errorMessage = response.data.message;
				});
		};


		var removeUserArray=function(arrayParam,userParam)
		{
			
			
			for(var i=0;i<arrayParam.length;i++)
			{	
				
				if(arrayParam[i]._id === userParam)
				{
					
					arrayParam.splice(i,1);
				}
			}

		};
	}
]);