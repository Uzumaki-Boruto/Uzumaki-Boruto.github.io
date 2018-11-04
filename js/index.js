var app = angular.module('genLogin', []);
app.controller('myController', function ($scope, $window) {
	var LoginData = {
		"nick1":{
			"username": "binner",
			"password": "binner"
		}
	};
	// $scope.result =false;
	$scope.Login=function () {
		for (var i = 0; i < 4; i++) {
			[i]
		}
		$scope.result =false;
		if ($scope.txtuser==LoginData.nick1["username"]&&$scope.txtpass==LoginData.nick1["password"]) {
			$scope.user=LoginData.nick1["username"];
			alert("Login Successfully!");
			$scope.result =true;
		}else{
			alert('Login Fail!');
		}
	}
});