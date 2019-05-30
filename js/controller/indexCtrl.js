var app = angular.module('ToolGen', ['ngCookies']);
app.controller('indexCtrl', ['$cookies', '$window', function ($cookies, $window) {
  var index = this;
  index.objUser = [{
    username: "binner",
    pass: "binner"
  },
  {
    username: "admin",
    pass: "admin"
  }];

  index.callLogin = function () {
    $cookies.put('user', '');
    $cookies.put('pass', '');
  }

  index.testLogin = function () {
    if (index.objUser.find(x => x.username == index.user && x.pass == index.pass) == null) {
      window.location = "./login.html";
    }
  }
  //get cookie
  index.user = $cookies.get('user');
  index.pass = $cookies.get('pass');

  index.Login = function () {    
      window.location = "/index.html#/!";
  };
}]);