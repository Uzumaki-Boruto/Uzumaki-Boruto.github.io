app.controller('ControllerTB', ['$scope', '$window', function ($scope, $window) {
	$scope.selected = 0;
	$scope.tdata = ["VARCHAR", "INT", "DATETIME", "BOOLEAN", "DECIMAL"];
	$scope.dbName = '';
	$scope.countTable = 1;
	$scope.countCollum = [1];
	//tableInfos chứ id, name, và chứa thông tin cột
	//Muốn trigger cái gì thì cứ việc ng-repeat cái này ra, auto có data
	$scope.tableInfos = [{
		tableID: 1,
		tableName: '',
		//Trong thông tin cột thì có một mảng chứa các giá trị: Tên cột, Loại cột, allow null
		collumInfos: [{
			collumName: '',
			collumType: '',
			allowNull: false,
		}]
	}];

	$scope.select = function (index) {
		$scope.selected = index;
		//console.log(index);
	};
	$scope.addTable = function () {
		if ($scope.countTable > $scope.tableInfos.length) {
			for (var i = $scope.countTable - $scope.tableInfos.length; i > 0; i--) {
				var obj = {
					tableID: $scope.countTable - i + 1,
					tableName: '',
					collumInfos: [{
						collumName: '',
						collumType: '',
						allowNull: false,
					}]
				};
				$scope.tableInfos.push(obj);
				$scope.countCollum.push(1);
				console.log($scope.countCollum);
				console.log($scope.tableInfos);
			}
		}
		else {
			for (var i = $scope.tableInfos.length - $scope.countTable; i > 0; i--) {
				$scope.tableInfos.splice(-1, 1);
				$scope.countCollum.splice(-1, 1);
				console.log($scope.countCollum);
				console.log($scope.tableInfos);
			}
		}
	};
	$scope.addCollum = function (tableID) {
		var currentIndex = $scope.selected;
		var colInfos = $scope.tableInfos[currentIndex].collumInfos;

		if ($scope.countCollum[currentIndex] > colInfos.length) {
			for (var i = $scope.countCollum[currentIndex] - colInfos.length; i > 0; i--) {
				var obj = {
					collumName: '',
					collumType: '',
					allowNull: false,
				};
				colInfos.push(obj);
			}
			console.log($scope.colInfos);
		}
		else {
			for (var i = colInfos.length - $scope.countCollum[currentIndex]; i > 0; i--) {
				colInfos.splice(-1, 1);
				console.log($scope.colInfos);
			}
		}
	};
	$scope.validated = function () {
		if ($scope.dbName == '') {
			return false;
		}
		var result = true;
		$scope.tableInfos.forEach(element => {
			if (element.tableName == null || element.tableName == '') {
				result = false;
			}
			element.collumInfos.forEach(collumInfo => {
				if (collumInfo.collumName == null || collumInfo.collumName == '') {
					result = false;
				}
				if (collumInfo.collumType == null || collumInfo.collumType == '') {
					result = false;
				}
			});
		});
		return result;
	};
	$scope.genCodeTable = function () {
		var finalCode = `--Use ${$scope.dbName}
		USE ${$scope.dbName}
		GO`;
		$scope.tableInfos.forEach(table => {
		var tbCode = `\n--Create table ${table.tableName}
		CREATE TABLE ${table.tableName}(
			`;
			for (let i = 0; i < table.collumInfos.length; i++) {
				const collum = table.collumInfos[i];
				var colCode = `	${collum.collumName} ${collum.collumType == 'NVARCHAR' ? 'NVARCHAR(255)' : collum.collumType}`;
				colCode += `${collum.allowNull ? '' : ' NOT NULL'}`
				if (i != table.collumInfos.length - 1) {
					colCode += ',\n';
				}
				else {
					colCode += ')\nGO';
				}
				tbCode += colCode;
			}
			finalCode += tbCode;
		});
		return finalCode;
	};
	$scope.accInfo=$window.accInfo;
}]);

//JAVa script
$(document).ready(function () {
	$("#copyButton").click(function () {

		if (!scope.validated()) {
			alert('Vui lòng điền đầy đủ thông tin để tạo bảng');
			return;
		}
		$("#code").select();
		document.execCommand('copy');
		alert("Copied");
	});
});
