var app = angular.module('genSQLCode', []);
app.controller('checkCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.objUser = [{
        username: "binner",
        pass: "binner"
    },
    {
        username: "admin",
        pass: "admin"
    }];
    // $scope.accInfo = null;
    $scope.accInfo = $window.accInfo;
    $scope.testLogin = function () {
        if ($scope.objUser.find(x => x.username == $scope.accInfo.username && x.pass == $scope.accInfo.pass) == null) {
            window.location = "./index.html";
        }
    }
}]);
//JS
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var username = getParameterByName('txtUser');
var passW = getParameterByName('txtPass');

if (username == null || username == '' || passW == null || passW == '') {
    window.location = "./index.html";
}
var accInfo = { username: username.toLowerCase(), pass: passW };