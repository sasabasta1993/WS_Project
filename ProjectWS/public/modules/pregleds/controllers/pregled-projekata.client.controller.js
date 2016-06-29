'use strict';

angular.module('pregleds').controller('PregledProjekataController', ['$scope','$timeout','ProjectOp','TeamOp','UsersOp','Availableusers','Authentication',
	function($scope,$timeout,ProjectOp,TeamOp,UsersOp,Availableusers,Authentication) {

		
	// Controller Logic
		var currentUser=Authentication.user;

		$scope.operation='nothing';
		$scope.projects=[];
		var currentProject;
		var removedUsers=[];
		var addedUsers=[];
		var projectsAll=[];
		var teamUsersId=[];
		var users=[];
		$scope.availableUsers=[];




		$scope.availableUsers=Availableusers.query({},function(){

			for(var b=0;b<$scope.availableUsers.length;b++){
				console.log('av users'+ $scope.availableUsers[b].firstName);
			}
		});

		$scope.teamUsers =[];
		$scope.teamUsers2=[];

		projectsAll=ProjectOp.query({},function(){

			for(var i=0;i<projectsAll.length;i++){
				console.log(projectsAll[i].projectAdmin +' adminadminadmin '+currentUser._id);
				if(projectsAll[i].projectAdmin === currentUser._id)
				{
					$scope.projects.push(projectsAll[i]);
				}
			}

		});

		var team=TeamOp.get({teamId:currentUser.myTeamId},function(){

			teamUsersId=team.members;

			users=UsersOp.query({},function(){

	    	if(teamUsersId.length > 0)
	    	{

				for(var k=0;k<users.length;k++)
				{
					for(var m=0;m<teamUsersId.length;m++)
					{
						console.log('user_id' + users[k]._id +' vs '+ teamUsersId[m]);
						if(users[k]._id === teamUsersId[m])
						{
							$scope.teamUsers.push(users[k]);
						}
					}
				}
			}
		});
		});

							
$scope.izmeniKorisnike=function(param){
	//alert('Kliknuo na button izmena');
		$scope.operation='changeUsers';
	var projekat=param;
	 	currentProject=param;

			
			var projectMembers=[];
			var allUsers1=[];
				$scope.selectedUsers=[];

				projectMembers=currentProject.projectUsers;

				allUsers1=UsersOp.query({},function(){

				for(var j=0;j<allUsers1.length;j++){
					for(var n=0;n<projectMembers.length;n++)
					{
						console.log(allUsers1[j]._id+' equals '+projectMembers[n]._id);
						if(allUsers1[j]._id === projectMembers[n]._id)
						{
							$scope.selectedUsers.push(allUsers1[j]);
						}
					}	
				}	

			});
			    



		};



 $scope.predicate = 'name';  
       $scope.reverse = true;  
       $scope.currentPage = 1;  

       $scope.order = function (predicate) {  
         $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
         $scope.predicate = predicate;  
       };

       $scope.totalItems = $scope.projects.length;  

       $scope.numPerPage = 5;

       $scope.paginate = function (value) {  
         var begin, end, index;  
         begin = ($scope.currentPage - 1) * $scope.numPerPage;  
         end = begin + $scope.numPerPage;  
         index = $scope.projects.indexOf(value);  
         return (begin <= index && index < end);  
       };  
       



		var updateUser=function(param)
		{
			var updateUser=new UsersOp(param);

				updateUser.$update(function(response) {

					
					
				}, function(response) {
					$scope.errorMessage = response.data.message;
				});
		};


		var updateProject=function(param)
		{
			var updateProject=new ProjectOp(param);

				updateProject.$update(function(response) {

					
					
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


		$scope.addUser=function(){
			if(($scope.selectedUser2 !== 'default'))
			{

			console.log($scope.selectedUser2);
			var parsedValues=$scope.selectedUser2.split('&',2);
			var idSelectedValue=parsedValues[0];

			var sign=false;

			for(var i=0;i<removedUsers.length;i++){
				if( removedUsers[i] === idSelectedValue){
					delete removedUsers[i];
					sign=true;	
				}
			}

			if(!sign)
			{
				addedUsers.push(idSelectedValue);
				sign =false;
			}

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

		

		$scope.izlaz=function(){
			removedUsers=[];
			addedUsers=[];
			$scope.operation='nothing';
		};



		$scope.potvrda=function(){
			var projectUsers=[];
			projectUsers=currentProject.projectUsers;
			
			for(var i=0;i<projectUsers.length;i++)
			{
				for(var j=0;j<removedUsers.length;j++)
				if(projectUsers[i]._id === removedUsers[j])
				{
					updateUser({_id :projectUsers[i]._id,
								$unset:{relatedProject: '' }});
					delete projectUsers[i];
				}

			}


				for(i=0;i<addedUsers.length;i++){

					updateUser({_id : projectUsers[i]._id,
								relatedProject : currentProject._id});

					projectUsers.push({_id:addedUsers[i]});
				}

				currentProject.projectUsers=projectUsers;


				//updateProject(currentProject);
				//resetujem promenjive

				var updateProject=new ProjectOp(currentProject);

				updateProject.$update(function(response) {
				removedUsers=[];
				addedUsers=[];

				$scope.errorMessage='Korisnici za projekat uspesno izmenjeni.';

				$scope.operation='nothing';

				$timeout(function(){
    			 $scope.errorMessage = '';
       			},1500);
					
					
				}, function(response) {
					$scope.errorMessage = response.data.message;
				});



		};



		$scope.removeUser=function()
		{
			if(($scope.selectedUser1 !== 'default'))
			{

				var parsedValues=$scope.selectedUser1.split('&',2);
				var idSelectedValue=parsedValues[0];
				var displayNameSelectedValue=parsedValues[1];

				removedUsers.push(idSelectedValue);

				removeUserArray($scope.selectedUsers,idSelectedValue);
				
				$scope.availableUsers.push({_id:idSelectedValue,displayName:displayNameSelectedValue});
			}
			else
			{
				$scope.errorMessage1='Niste izabrali nijednog clana.';
				$timeout(function(){
    			 $scope.errorMessage2 = '';
       			},1500);
			}
		};
	}
	]);


