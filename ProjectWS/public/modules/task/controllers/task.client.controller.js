'use strict';

angular.module('task').controller('TaskController', ['$scope','$location','$http','$timeout','$resource','ProjectOp','UsersOp','TaskOp','Authentication',
	function($scope,$location,$http,$timeout,$resource,ProjectOp,UsersOp,TaskOp,Authentication) {
		// Controller Logic
		// ...
		var currentUser=Authentication.user;


		//redirect to specified adress
		$scope.redirect=function(path){
			
			$location.path(path);
		};



		$scope.errorMessage='';
		
		$scope.availableUsers=UsersOp.query({},function(){


		$scope.availableUsersForProject=[];

		for(var i=0;i<$scope.availableUsers.length;i++){
			if($scope.availableUsers[i].hasOwnProperty('relatedProject')){
				if($scope.availableUsers[i].relatedProject === currentUser.relatedProject)
				{
					$scope.availableUsersForProject.push($scope.availableUsers[i]);
				}
			}
		}	

		

		$scope.createTask=function(){

			var parsedValues=[];
			
		     parsedValues=$scope.selectedUser.split('&');
		     var selectedPriority=$scope.selectedPriority;
		     

		     if(parsedValues[0] !== 'd'){

		     	$scope.task.createdForUser=parsedValues[0];

		     }

		     $scope.task.priority=selectedPriority;
		     $scope.task.kreiraoName=currentUser.displayName;
		     $scope.task.kreiranoZaName=parsedValues[1];
		     $scope.task.createdByUser=currentUser._id;

		     $scope.task.taskForProject=currentUser.relatedProject;

			var newTask=new TaskOp($scope.task);


				newTask.$save(function(response) {
				var selectedUserVar;

				//update project

				var currentProject=ProjectOp.get({projectId : currentUser.relatedProject},function()
					{
						var projectTasksArray=[];
						projectTasksArray=currentProject.projectTasks;
						projectTasksArray.push({_id :response._id});
						updateProject({_id : currentUser.relatedProject,
									  projectTasks: projectTasksArray});	
					});




				for(var j=0;j<$scope.availableUsersForProject.length;j++)
				{
					
					if(parsedValues[0] !== 'd')
					{
						if($scope.availableUsersForProject[j]._id === parsedValues[0])
						{
							
							 selectedUserVar=$scope.availableUsersForProject[j];

						}
					}	
				}

				var userRelatedTasks=[];
				var userUpdate;

				

				var myCreatedTasks=[];

				if(currentUser.hasOwnProperty('myCreatedTasks'))
				{
					myCreatedTasks=currentUser.myCreatedTasks;
					myCreatedTasks.push(response._id);
				}



				try {
    			userRelatedTasks.relatedTasks=selectedUserVar.relatedTasks;
    			userRelatedTasks.push(response._id);
    			 userUpdate={ _id : selectedUserVar._id,
    			 			myCreatedTasks: myCreatedTasks,
							relatedTasks: userRelatedTasks };
				updateUser(userUpdate);
				}
				catch(err) {
   				

				}

				


				$scope.task.name='';
				$scope.task.description='';
				$scope.errorMessage='Task created';
				$scope.selectedUser='d&d';
				$scope.selectedPriority='Blocker';

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


		});



		var updateProject=function(param){
			var updateProject =new ProjectOp(param);

			updateProject.$update(function(response){

			},function(response){
				$scope.errorMessage= response.data.message;
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