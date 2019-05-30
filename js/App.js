var app = angular.module("ToolGen", ["ngRoute","ngCookies"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when("/Database", {
      templateUrl: "GenSQLDB.html",
      controller: "databaseCtrl"
    })
    .when("/Table", {
      templateUrl: "GenSQLTables.html",
      controller: "tableCtrl"
    });
});