'use strict';

angular.module('task').controller('ViewTasksController', ['$scope','$timeout','Authentication','Tasksbyprojectid','TaskOp','CommentsView',
	function($scope,$timeout,Authentication,Tasksbyprojectid,TaskOp,CommentsView) {
		// Controller Logic
		// ...
		var currentUser=Authentication.user;

		var currentTask;
		var currentComment;
		$scope.comment={text: '',
						author: '',
						authorName: '',
		};

		$scope.tableComment={
							text:'',
							author: '',
							authorName: '',
							date :''
		};

		$scope.taskComments=[];
		$scope.errorMessageDeleteComment='';
		$scope.errorMessageCreateComment='';
		$scope.errorMessageDelete='';
		$scope.errorMessage='';
		$scope.currentOperation='Nothing';
		$scope.projectTasks1=[{name: 'blbalba'},{name: 'bebe'}];
		$scope.projectTasks=[];
		var relatedTasks=[];
		$scope.predicate = 'name';  
        $scope.reverse = true;  
        $scope.currentPage = 1;

	    relatedTasks=Tasksbyprojectid.query({projectId: currentUser.relatedProject},function(){


				
				for(var i=0;i<relatedTasks.length;i++){
					
						
					var	tableData={ name : '',
							   		priority: '',
						       		status  : '',
							   		createdByUser:'',
							  		createdForUser: '',
							  		description: '',
							  		id : ''
									};

						tableData.name=relatedTasks[i].name;
						tableData.priority=relatedTasks[i].priority;
						tableData.createdByUser=relatedTasks[i].kreiraoName;
						tableData.createdForUser=relatedTasks[i].kreiranoZaName;
						tableData.status=relatedTasks[i].status;
						tableData.id=relatedTasks[i]._id;
						tableData.description=relatedTasks[i].description;
						tableData.createdByUserId=relatedTasks[i].createdByUser;
						tableData.createdForUserId=relatedTasks[i].createdForUser;
						

						//getUserById(relatedTasks[i].createdByUser,relatedTasks[i].createdForUser,tableData);

						$scope.projectTasks.push(tableData);
						//$scope.projectTasks[0]=tableData;
				}
			});




	   $scope.removeTask=function(taskParam){


	   		//console.log(taskIdParam + 'parametar za brisanje');
	   	var removedTask=TaskOp.delete({taskId: taskParam.id},function(response){
	   		var index=0;
	   		try{
	   			for(var i=0;i<$scope.projectTasks.length;i++){
	   				index=i;
	   				console.log($scope.projectTasks[i].id + ' id project tasks');
	   				if($scope.projectTasks[i].id === removedTask._id)
	   				{
	   					console.log('Obrisao obrisao obrisao');
	   					var tempArray=[];

	   					for(var j=0;j<i;j++){
	   						tempArray.push($scope.projectTasks[j]);
	   					}

	   					for(var n=i;n<($scope.projectTasks.length-1);n++){
	   						tempArray.push($scope.projectTasks[n+1]);
	   					}

	   					$scope.projectTasks=tempArray;


	   					//update user
	   					//updateUser(taskParam.createdForUserId,removedTask._id);


	   					break;
	   				}
	   			}

	   			}
	   		catch(err){


	   		//$scope.projectTasks[index].splice(index,1);
	   		//$scope.errorMessageDelete='Zadatak nije izbrisan.';

	   		console.log(i+'    indeksindeksindeks');

	   		$scope.errorMessageDelete='Obrisano iz catch bloka.';

	   		$timeout(function(){
			$scope.errorMessageDelete = '';
			
       		},1500);


	   		}

	   	},function(err){

	   		$scope.errorMessageDelete=err.message;

	   		$timeout(function(){
			$scope.errorMessageDelete = '';
			
       		},1500);
	   	});



	   };




	   $scope.izlaz=function(){

	   		$scope.currentOperation='Nothing';
	   };





	   	$scope.potvrda=function(){

	   		var changedTask=TaskOp.update({_id: currentTask.id,
	   										status: $scope.taskP.status},function(){
	   											$scope.errorMessage='Task uspedno izmenjen.';

	   																$timeout(function(){
																	$scope.errorMessage = '';
																	$scope.currentOperation='Nothing';
       																},1500);
	   										},function(error){
	   											$scope.errorMessage='Greska priliko pokusaja izmene';

	   																$timeout(function(){
																	$scope.errorMessage = '';
       																},1500);
	   										});
	   		//update model 

	   		for(var i=0;i<$scope.projectTasks.length;i++){
	   			if($scope.projectTasks[i].id=== currentTask.id)
	   			{
	   				$scope.projectTasks[i].status=$scope.taskP.status;
	   				break;
	   			}
	   		}

	   	};



	   $scope.changeTask=function(taskParam){
	   		$scope.currentOperation='IzmenaOp';
	   		currentTask=taskParam;
	   		$scope.taskP={name: '',
	   					  taskForUser:'',
	   					priority: '',
	   					status : '',
	   					description:''};

	   		$scope.taskP.name=taskParam.name;
	   		$scope.taskP.createdForUser=taskParam.createdForUser;
	   		$scope.taskP.priority=taskParam.priority;
	   		$scope.taskP.status=taskParam.status;
	   		$scope.taskP.description=taskParam.description;



	   }; 
					


	$scope.predicate = 'name';  
       $scope.reverse = true;  
       $scope.currentPage = 1;  

       $scope.order = function (predicate) {  
         $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;  
         $scope.predicate = predicate;  
       };

       $scope.totalItems = $scope.projectTasks.length;  

       $scope.numPerPage = 7;

       $scope.paginate = function (value) {  
         var begin, end, index;  
         begin = ($scope.currentPage - 1) * $scope.numPerPage;  
         end = begin + $scope.numPerPage;  
         index = $scope.projectTasks.indexOf(value);  
         return (begin <= index && index < end);  
       };
	


/*
		var updateUser=function(param,taskIdParam)
		{
			console.log(param+'user id param');
			var updateUser=UserTasks.query({ userId: param},function(){

				var tasksForUser=[];

				if(updateUser.hasOwnProperty('relatedTasks'))
				{
					tasksForUser=updateUser.relatedTasks;
				}

				for(var i=0;i<tasksForUser.length;i++){
					if(tasksForUser[i] === taskIdParam){


					var tempArray=[];

	   					for(var j=0;j<i;j++){
	   						tempArray.push($scope.projectTasks[j]);
	   					}

	   					for(var n=i;n<($scope.projectTasks.length-1);n++){
	   						tempArray.push($scope.projectTasks[n+1]);
	   					}

	   					tasksForUser=tempArray;

	   					var newUser=new UserTasks({_id : param,
	   										relatedTasks: tasksForUser});

	   					newUser.$update();

					}
				}
			});


		};
*/
/*
	var getUserById=function(user1IdParam,user2IdParam, tableData){

		var user1=Users.get({userId : user1IdParam},function(){
			tableData.createdByUser=user1.displayName;


			var user2=Users.get({userId : user2IdParam},function(){
			tableData.createdForUser=user2.displayName;

			$scope.projectTasks.push(tableData);
		});
		});

			//$scope.projectTasks.push(tableData);


		

	};*/


	/////////////////////////////////////////////////////////////////////////////////////////
	//ovaj deo je vezan za komentare

	$scope.removeComment=function(){
		if($scope.tableComment.authorName !== '')
		{
			var removedComment=CommentsView.delete({commentId : currentComment._id},function(){
				for(var i=0;i<$scope.taskComments.length;i++){
					if($scope.taskComments[i]._id === removedComment._id)
					{
						var tempArray=[];

	   					for(var j=0;j<i;j++){
	   						tempArray.push($scope.taskComments[j]);
	   					}

	   					for(var n=i;n<($scope.taskComments.length-1);n++){
	   						tempArray.push($scope.taskComments[n+1]);
	   					}

	   					$scope.taskComments=tempArray;


	   					$scope.tableComment.authorName='';
						$scope.tableComment.date='';
						$scope.tableComment.text='';


					}
				}

			});
		}
	};


	$scope.updateComment=function(){

		if($scope.tableComment.authorName !== '')
		{
			var updatedComment=CommentsView.update({_id : currentComment._id,	
													text : $scope.tableComment.text},function(){
				$scope.errorMessageCommentOperation='Komentar uspesno izmenjen.';

				for(var i =0;i<$scope.taskComments.length;i++)
				{
					if($scope.taskComments[i]._id === updatedComment._id)
						{
							$scope.taskComments[i]=updatedComment;
						}
				}

				$scope.tableComment.authorName='';
				$scope.tableComment.date='';
				$scope.tableComment.text='';

				$timeout(function(){
				$scope.errorMessageCommentOperation = '';
       			},1500);

			},function(err){

				$scope.errorMessageCommentOperation='Greska prilikom pokusaja izmene komentara.';

				$timeout(function(){
				$scope.errorMessageCommentOperation = '';
       			},1500);

			});
		}
	};

	$scope.viewComments=function(curTask){
		$scope.currentOperation='viewComments';

		currentTask=curTask;

		$scope.taskComments=CommentsView.query({},function(){


		});




	};

	$scope.nazad=function(){
		$scope.currentOperation='Nothing';

		$scope.tableComment.authorName='';
		$scope.tableComment.text='';
		$scope.tableComment.date='';
	};



	$scope.createComment=function(curTask){

		$scope.currentOperation='createComment';

		currentTask=curTask;

		


	};

	$scope.showComment=function(curComment){

		currentComment=curComment;
		//alert(currentComment.authorName);

		$scope.tableComment.authorName=currentComment.authorName;
		$scope.tableComment.text=currentComment.text;
		$scope.tableComment.date=currentComment.date;

	};



	$scope.potvrdaKomentar=function(){
		$scope.comment.author=currentUser._id;
		$scope.comment.authorName=currentUser.displayName;

		var newComment=new CommentsView($scope.comment);

		newComment.$save(function(response){

		$scope.errorMessageCreateComment='Komentar uspesno kreiran.';
			$scope.comment.authorName='';
			$scope.comment.author='';
			$scope.comment.text='';
			$timeout(function(){
			$scope.errorMessageCreateComment = '';
			$scope.currentOperation='Nothing';
       		},1500);


		

		},function(err){
			$scope.errorMessageCreateComment='Greska prilikom pokusaja cuvanja komentara.';

			$timeout(function(){
			$scope.errorMessageCreateComment = '';
       		},1500);
		});

	};

}
]);

