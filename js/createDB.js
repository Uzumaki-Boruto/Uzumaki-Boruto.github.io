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
            result = !Object.values(dbInfo.primaryInfo).includes(null) && !Object.values(dbInfo.primaryInfo).includes(undefined) && !Object.values(dbInfo.primaryInfo).includes('');
        }
        if ($scope.createFilegroup && result) {
            result = !Object.values(dbInfo.filegroupInfo).includes(null) && !Object.values(dbInfo.filegroupInfo).includes(undefined) && !Object.values(dbInfo.filegroupInfo).includes('');
        }
        if ($scope.createLog && result) {
            result = !Object.values(dbInfo.logInfo).includes(null) && !Object.values(dbInfo.logInfo).includes(undefined) && !Object.values(dbInfo.logInfo).includes('');
        }
        return result;
    };
    $scope.genCode = function () {
        
        var dbInfo = $scope.dbInfo;
        var finalCode = `USE MASTER
GO
IF EXISTS(SELECT * FROM MASTER ..SysDatabases WHERE NAME = '${dbInfo.dbName}')
DROP DATABASE ${dbInfo.dbName}
GO
-- CREATE DATABASE
CREATE DATABASE ${dbInfo.dbName}
`;
        if ($scope.createPrimary) {
            var primaryInfo = dbInfo.primaryInfo;
            var primaryCode = `--Tạo Primary
ON PRIMARY(
    NAME = ${primaryInfo.primaryName}_dat,
    FILENAME = N'C:\\Program Files\\Microsoft SQL Server\\MSSQL14.MSSQLSERVER\\MSSQL\\DATA\\${primaryInfo.primaryName}_dat.mdf',
    SIZE = ${primaryInfo.primarySize}${primaryInfo.primarySizeType},
    MAXSIZE = ${primaryInfo.primaryMaxSize}${primaryInfo.primaryMaxSizeType},
    FILEGROWTH = ${primaryInfo.primaryGrowth}${primaryInfo.primaryGrowthType})`;
            finalCode += primaryCode;
            if ($scope.createFilegroup) {
                var filegroupInfo = dbInfo.filegroupInfo;

                var fileGroupCode = `,
--Tạo FileGroup ${filegroupInfo.filegroupName}
    FILEGROUP ${filegroupInfo.filegroupName}(
    NAME = ${filegroupInfo.filegroupName},
    FILENAME = N'C:\\Program Files\\Microsoft SQL Server\\MSSQL14.MSSQLSERVER\\MSSQL\\DATA\\${filegroupInfo.filegroupName}_group.ndf',
    SIZE = ${filegroupInfo.filegroupSize}${filegroupInfo.filegroupSizeType},
    MAXSIZE = ${filegroupInfo.filegroupMaxSize}${filegroupInfo.filegroupMaxSizeType},
    FILEGROWTH = ${filegroupInfo.filegroupGrowth}${filegroupInfo.filegroupGrowthType})`
                finalCode += fileGroupCode;
            }
            if ($scope.createLog) {
                var logInfo = dbInfo.logInfo;
                var logCode = `
--Tạo Log ${logInfo.logName}
LOG ON(
    Name = ${logInfo.logName}_log,
    FILENAME =  N'C:\\Program Files\\Microsoft SQL Server\\MSSQL14.MSSQLSERVER\\MSSQL\\DATA\\${logInfo.logName}_log.ldf',
    SIZE = ${logInfo.logSize}${logInfo.logSizeType},
    MAXSIZE = ${logInfo.logMaxSize}${logInfo.logMaxSizeType},
    FILEGROWTH = ${logInfo.logGrowth}${logInfo.logGrowthType})`;
                finalCode += logCode;
            }
        }
        finalCode += '\nGO\n';
        return finalCode;
    };
    $scope.accInfo=$window.accInfo;
}]);

//JQuery
$(document).ready(function () {
    $("#copyButton").click(function () {      
        $("#code").select();
        document.execCommand('copy');
        alert("Copied");
    });
});
