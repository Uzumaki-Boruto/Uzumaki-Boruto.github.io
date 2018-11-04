var app = angular.module('genLogin', []);
app.controller('myController', function ($scope, $window) {
	$scope.LoginData = [{
		userName: "binner",
		password: "binner"
	},
	{
		userName: "boruto",
		password: "cc"
	}];
	// $scope.result =false;
	$scope.Login = function () {
		for (var i = 0; i < 4; i++) {
			[i]
		}
		$scope.result = false;
		var account = $scope.LoginData.find(x => x.userName == $scope.username);
		if ($scope.txtuser == LoginData.nick1["username"] && $scope.txtpass == LoginData.nick1["password"]) {
			$scope.user = LoginData.nick1["username"];
			alert("Login Successfully!");
			$scope.result = true;
		} else {
			alert('Login Fail!');
		}
	}
});
// Hello