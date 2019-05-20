app.controller('ControllerDB', ['$scope', '$window', function ($scope, $window) {
    $scope.createPrimary = true;
    $scope.createFilegroup = false;
    $scope.createLog = true;
    $scope.typeStorage = ["KB", "MB", "GB", "%"];
    $scope.dbInfo = {
        dbName: 'DemoName',
        primaryInfo: {
            primaryName: 'DemoName',
            //primaryFileName: '',
            primarySize: 10,
            primarySizeType: "MB",
            primaryMaxSize: 100,
            primaryMaxSizeType: "MB",
            primaryGrowth: 1,
            primaryGrowthType: "MB"
        },
        filegroupInfo: {
            filegroupName: 'MyGroup',
            //filegroupFileName: '',
            filegroupSize: 1,
            filegroupSizeType: "MB",
            filegroupMaxSize: 20,
            filegroupMaxSizeType: "MB",
            filegroupGrowth: 1,
            filegroupGrowthType: "MB"
        },
        logInfo: {
            logName: 'DemoName',
            //logFileName: '',
            logSize: 5,
            logSizeType: "MB",
            logMaxSize: 25,
            logMaxSizeType: "MB",
            logGrowth: 1,
            logGrowthType: "MB"
        },
    };
    $scope.validated = function () {
        if ($scope.dbInfo.dbName == '') {
            return false;
        }
        var result = !$scope.createPrimary;
        var dbInfo = $scope.dbInfo;
        if ($scope.createPrimary) {
            result = !Object.values(dbInfo.primaryInfo).includes(null) &&
                !Object.values(dbInfo.primaryInfo).includes(undefined) &&
                !Object.values(dbInfo.primaryInfo).includes('');
        }
        if ($scope.createFilegroup && result) {
            result = !Object.values(dbInfo.filegroupInfo).includes(null) &&
                !Object.values(dbInfo.filegroupInfo).includes(undefined) &&
                !Object.values(dbInfo.filegroupInfo).includes('');
        }
        if ($scope.createLog && result) {
            result = !Object.values(dbInfo.logInfo).includes(null) &&
                !Object.values(dbInfo.logInfo).includes(undefined) &&
                !Object.values(dbInfo.logInfo).includes('');
        }
        return result;
    };
    $scope.genCode = function () {

        var dbInfo = $scope.dbInfo;
        var finalCode = 'USE MASTER\nGO\n--Kiểm tra xem database có tồn tại chưa, nếu có, xóa nó';
        finalCode += `\nIF EXISTS(SELECT * FROM MASTER ..SysDatabases WHERE NAME = '${dbInfo.dbName}')`;
        finalCode += `\nDROP DATABASE ${dbInfo.dbName}`;
        finalCode += `\n-- CREATE DATABASE`;
        finalCode += `\nCREATE DATABASE ${dbInfo.dbName}`;

        if ($scope.createPrimary) {
            var primaryInfo = dbInfo.primaryInfo;
            var primaryCode = `\n--Tạo Primary ${primaryInfo.primaryName}\nON PRIMARY(`;
            primaryCode += `\n\tNAME = ${primaryInfo.primaryName}_dat,`;
            primaryCode += `\n\tFILENAME = N'C:\\Program Files\\Microsoft SQL Server\\MSSQL14.MSSQLSERVER\\MSSQL\\DATA\\${primaryInfo.primaryName}_dat.mdf',`;
            primaryCode += `\n\tSIZE = ${primaryInfo.primarySize}${primaryInfo.primarySizeType},`;
            primaryCode += `\n\tMAXSIZE = ${primaryInfo.primaryMaxSize}${primaryInfo.primaryMaxSizeType},`;
            primaryCode += `\n\tFILEGROWTH = ${primaryInfo.primaryGrowth}${primaryInfo.primaryGrowthType})`;

            finalCode += primaryCode;
            if ($scope.createFilegroup) {
                var filegroupInfo = dbInfo.filegroupInfo;

                var fileGroupCode = `,\n--Tạo FileGroup ${filegroupInfo.filegroupName}`;
                fileGroupCode += `\nFILEGROUP ${filegroupInfo.filegroupName}(`;
                fileGroupCode += `\n\tNAME = ${filegroupInfo.filegroupName},`;
                fileGroupCode += `\n\tFILENAME = N'C:\\Program Files\\Microsoft SQL Server\\MSSQL14.MSSQLSERVER\\MSSQL\\DATA\\${filegroupInfo.filegroupName}_group.ndf',`;
                fileGroupCode += `\n\tSIZE = ${filegroupInfo.filegroupSize}${filegroupInfo.filegroupSizeType},`;
                fileGroupCode += `\n\tMAXSIZE = ${filegroupInfo.filegroupMaxSize}${filegroupInfo.filegroupMaxSizeType},`;
                fileGroupCode += `\n\tFILEGROWTH = ${filegroupInfo.filegroupGrowth}${filegroupInfo.filegroupGrowthType})`;

                finalCode += fileGroupCode;
            }
            if ($scope.createLog) {
                var logInfo = dbInfo.logInfo;
                var logCode = `\n--Tạo Log ${logInfo.logName}\nLOG ON(`;
                logCode += `\n\tName = ${logInfo.logName}_log,`;
                logCode += `\n\tFILENAME =  N'C:\\Program Files\\Microsoft SQL Server\\MSSQL14.MSSQLSERVER\\MSSQL\\DATA\\${logInfo.logName}_log.ldf',`;
                logCode += `\n\tSIZE = ${logInfo.logSize}${logInfo.logSizeType},`;
                logCode += `\n\tMAXSIZE = ${logInfo.logMaxSize}${logInfo.logMaxSizeType},`;
                logCode += `\n\tFILEGROWTH = ${logInfo.logGrowth}${logInfo.logGrowthType})`;

                finalCode += logCode;
            }
        }
        finalCode += '\nGO\n';
        return finalCode;
    };
    $scope.accInfo = $window.accInfo;
}]);

//JQuery
$(document).ready(function () {
    $('#copyButton').tooltip({title: "Copy", placement: "bottom"});
    $("#copyButton").click(function () {
        $("#code").select();
        document.execCommand('copy');
        $('#copyButton').tooltip("dispose");
        $('#copyButton').tooltip({title: "Copied", placement: "bottom"});
        $('#copyButton').tooltip("show");
    });
});
