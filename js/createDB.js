var app = angular.module('genSQLCode', []);
app.controller('myController', ['$scope', '$window', function ($scope, $window) {

    $scope.createPrimary = true;
    $scope.createFilegroup = false;
    $scope.createLog = true;
    $scope.dbInfo = {
        dbName: 'DemoName',
        primaryInfo: {
            primaryName: 'DemoName',
            //primaryFileName: '',
            primarySize: 10,
            primaryMaxSize: 100,
            primaryGrowth: 1
        },
        filegroupInfo: {
            filegroupName: 'MyGroup',
            //filegroupFileName: '',
            filegroupSize: 1,
            filegroupMaxSize: 20,
            filegroupGrowth: 1
        },
        logInfo: {
            logName: 'DemoName',
            //logFileName: '',
            logSize: 5,
            logMaxSize: 25,
            logGrowth: 1
        },
    };
    $scope.validated = function () {
        if ($scope.dbInfo.dbName == '') {
            return false;
        }
        var result = false;
        if ($scope.createPrimary) {
            result = !Object.values(angular.element(document.body).scope().dbInfo.primaryInfo).some(element => element == '');
        }
        if ($scope.createFilegroup) {
            result = !Object.values(angular.element(document.body).scope().dbInfo.filegroupInfo).some(element => element == '');
        }
        if ($scope.createLog) {
            result = !Object.values(angular.element(document.body).scope().dbInfo.logInfo).some(element => element == '');
        }
        return result;
    };
}]);
//Javascript 
function getData() {
    //vãi cả hard code
    var sql = document.getElementById('FcodeSQL').value;
    var index1= sql.indexOf("-- Tạo Primary");
    var index2= sql.indexOf("--Tạo FileGroup");
    var index3= sql.indexOf("-- Tạo Log File");
    var index4= sql.lastIndexOf("GO");
    var sqlPrimary = sql.substring(index1,index2);
    var sqlFileGroup = sql.substring(index2,index3);
    var sqlLogFile = sql.substring(index3,index4+2);
    var cb_Primary = document.getElementById('cb_Primary');
    var cb_FileGroup = document.getElementById('cb_FileGroup');
    var cb_Log = document.getElementById('cb_Log');
    if (cb_Primary.checked==false) {
        sql = sql.replace(sqlPrimary,"");
    }
    if (cb_FileGroup.checked==false) {
        sql = sql.replace(sqlFileGroup,"");
    }
    if (cb_Log.checked==false) {
        sql = sql.replace(sqlLogFile,"");
    }
    document.getElementById('LcodeSQL').innerHTML=sql;
}