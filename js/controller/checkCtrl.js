angular.module('genSQLCode', ['ngCookies'])
.controller('checkCtrl', ['$cookies', function($cookies) {
  // Retrieving a cookie
  var favoriteCookie = $cookies.get('myFavorite');
  // Setting a cookie
  $cookies.put('myFavorite', 'oatmeal');
  console.log(favoriteCookie);
}]);
// var app = angular.module('genSQLCode', ['ngCookies']);
// app.controller('checkCtrl', ['$cookies', '$window', function ($scope, $window) {
//     $scope.objUser = [{
//         username: "binner",
//         pass: "binner"
//     },
//     {
//         username: "admin",
//         pass: "admin"
//     }];

//     $scope.accInfo = $window.accInfo;
//     $scope.testLogin = function () {
//         // Retrieving a cookie
//         var favoriteCookie = $cookies.get('myFavorite');
//         // Setting a cookie
//         $cookies.put('myFavorite', 'oatmeal');
//         console.log(favoriteCookie);
//     }
// }]);
//JS
// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, '\\$&');
//     var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, ' '));
// }
// var username = getParameterByName('txtUser');
// var passW = getParameterByName('txtPass');

// if (username == null || username == '' || passW == null || passW == '') {
//     window.location = "./index.html";
// }
// var accInfo = { username: username.toLowerCase(), pass: passW };