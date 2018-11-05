app.controller('ControllerTB', ['$scope', '$window', function ($scope, $window) {
	$scope.selected = 0;
	$scope.countTable = 1;
	$scope.countCollum = [1];

	$scope.tdata = ["NVARCHAR", "INT", "BOOLEAN", "DECIMAL", "FLOAT", "DATETIME"];
	$scope.typeCondition = [ "<", "<=", "=", ">=", ">", "<>" ];
	$scope.dbName = '';
	//tableInfos chứ id, name, và chứa thông tin cột
	//Muốn trigger cái gì thì cứ việc ng-repeat cái này ra, auto có data
	$scope.tableInfos = [{
		tableID: 1,
		tableName: '',
		//Trong thông tin cột thì có một mảng chứa các giá trị: Tên cột, Loại cột, allow null
		collumInfos: [{
			collumName: '',
			collumType: '',
			identity: false,
			primaryKey: false,
			foreignKey: false,
			referencesTo: '',
			referencesTable: '',
			check: false,
			condition: '',
			valueCheck: '',
			allowNull: false,
			unique: false
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
						identity: false,
						primaryKey: false,
						foreignKey: false,
						referencesTo: '',
						referencesTable: '',
						check: false,
						condition: '',
						valueCheck: '',
						allowNull: false,
						unique: false
					}]
				};
				$scope.tableInfos.push(obj);
				$scope.countCollum.push(1);
			}
		}
		else {
			for (var i = $scope.tableInfos.length - $scope.countTable; i > 0; i--) {
				$scope.tableInfos.splice(-1, 1);
				$scope.countCollum.splice(-1, 1);
				$scope.selected = $scope.selected < $scope.countTable ? $scope.selected : $scope.countTable - 1;
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
					identity: false,
					primaryKey: false,
					foreignKey: false,
					referencesTo: '',
					referencesTable: '',
					addCheck: false,
					condition: '',
					valueCheck: '',
					allowNull: false,
					unique: false
				};
				colInfos.push(obj);
			}
		}
		else {
			for (var i = colInfos.length - $scope.countCollum[currentIndex]; i > 0; i--) {
				colInfos.splice(-1, 1);
			}
		}
	};
	$scope.validated = function () {
		if ($scope.dbName == '') {
			return false;
		}
		var result = true;
		$scope.tableInfos.forEach(tableInfo => {
			if (tableInfo.tableName == null || tableInfo.tableName == '') {
				result = false;
			}
			tableInfo.collumInfos.forEach(collumInfo => {
				if (collumInfo.collumName == '') {
					result = false;
				}
				if (collumInfo.collumType == null || collumInfo.collumType == '') {
					result = false;
				}
				if (collumInfo.foreignKey && (collumInfo.referencesTo == '' || collumInfo.referencesTable == '')) {
					result = false;
				}
			});
		});
		return result;
	};
	$scope.genCodeTable = function () {
		var finalCode = `--Use ${$scope.dbName}\nUSE [${$scope.dbName}]\nGO`;
		var alterCode = "";
		var insertCode = "";
		$scope.tableInfos.forEach(table => {
			var tbCode = `\n--Create table ${table.tableName}\nCREATE TABLE [${table.tableName}](\n`;
			insertCode += `\n--INSERT INTO [${table.tableName}](`;
			for (let i = 0; i < table.collumInfos.length; i++) {
				const collum = table.collumInfos[i];
				var colCode = `\t[${collum.collumName}] ${collum.collumType == 'NVARCHAR' ? 'NVARCHAR(255)' : collum.collumType}`;
				colCode += `${collum.identity ? ' IDENTITY' : ''}`;
				colCode += `${!collum.allowNull || collum.primaryKey ? ' NOT NULL' : ''}`;
				colCode += `${collum.unique || collum.primaryKey ? ' UNIQUE' : ''}`;
				if (collum.primaryKey) {
					alterCode += `\n--Add primary key\nALTER TABLE [${table.tableName}]\n\tADD PRIMARY KEY ([${collum.collumName}])\nGO`;
				}
				if (collum.foreignKey) {
					alterCode += `\n--Add foreign key\nALTER TABLE [${table.tableName}]\n\tADD FOREIGN KEY ([${collum.collumName}]) REFERENCES [${collum.referencesTo}]([${collum.referencesTable}])\nGO`;
				}
				if (collum.addCheck)
				{
					alterCode+= `\n--Add check\nALTER TABLE\n\tADD CHECK([${collum.collumName}] ${collum.condition} ${isNaN(collum.valueCheck) ? `'${collum.valueCheck}'` : `${collum.valueCheck}`})\nGO`;
				}
				if (i != table.collumInfos.length - 1) {
					colCode += ',\n';
					insertCode += `[${collum.collumName}], `;
				}
				else {
					colCode += ')\nGO';
					insertCode += `[${collum.collumName}]) VALUES `;
				}
				tbCode += colCode;
			}
			finalCode += tbCode;
		});
		alterCode += insertCode;
		finalCode += alterCode;
		return finalCode;
	};
	$scope.accInfo = $window.accInfo;
}]);

//JAVa script
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
