'use strict';



angular.module('menu-bar').controller('CreateTeamController', ['$scope','$location','$http','$timeout','$resource','ProjectOp','UsersOp','TeamOp','Authentication',
	function($scope,$location,$http,$timeout,$resource,ProjectOp,UsersOp,TeamOp,Authentication) {
		// Controller Logic
		// ...
		var currentUser=Authentication.user;
		 $scope.errorMessage ='';
		 $scope.errorMessage1='';
		 $scope.errorMessage2='';

		//redirect to specified adress
		$scope.redirect=function(path){
			//alert();
			$location.path(path);
		};

		$scope.availableUsers=[];
		$scope.selectedUsers=[];
		$scope.queryUsers=UsersOp.query({},function(){

			for(var n=0;n<$scope.queryUsers.length;n++){
				try
				{
					var temp=$scope.queryUsers[n].memberOfTeam;
					var name=temp.firstName;
					
				}
				catch(err)
				{
					$scope.availableUsers.push($scope.queryUsers[n]);
				}

			}

		});


		$scope.addUser=function(){
			if(($scope.selectedUser1 !== 'default'))
			{

			console.log($scope.selectedUser1);
			var parsedValues=$scope.selectedUser1.split('&');
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



		$scope.createTeam=function(){
			$scope.team.members=[];


			for(var i=0;i<$scope.selectedUsers.length;i++)
			{
				$scope.team.members.push($scope.selectedUsers[i]._id);
			}


				var newTeam=new TeamOp($scope.team);


				newTeam.$save(function(response) {

				var myTeams=[];
				myTeams=currentUser.myTeamId;
				myTeams.push(response._id);
				updateUser({_id : currentUser._id,
							myTeamId:myTeams});

				$scope.team.name='';
				$scope.team.teamAdmin=currentUser._id;
				console.log('id response');
				console.log(response._id);

				for(var i=0;i<$scope.selectedUsers.length;i++)
				{

					$scope.availableUsers.push({_id:$scope.selectedUsers[i]._id,displayName: $scope.selectedUsers[i].displayName});	

				}

				for(var j=0;j<$scope.selectedUsers.length;j++)
				{	
					var user={ _id:$scope.selectedUsers[j]._id,
								memberOfTeam:response._id};

					updateUser(user);


				}

				$scope.selectedUsers=[];
				$scope.errorMessage='Team created';
				$scope.selectedUser1='default';
				$scope.selectedUser2='default';

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