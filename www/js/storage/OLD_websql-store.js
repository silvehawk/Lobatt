var WebSqlStore = function(successCallback, errorCallback) {

	this.initializeDatabase = function(successCallback, errorCallback) {
		var self = this;
		this.db = window.openDatabase("LobattDB", "1.0", "LoBaTT DB", 2000000);
		this.db.transaction(function(tx) {
			self.createTable(tx);
			self.addSampleData(tx);
			//TODO löschen
		}, function(error) {
			console.log('Transaction error: ' + error);
			if (errorCallback)
				errorCallback();
		}, function() {
			console.log('Transaction success');
			if (successCallback)
				successCallback();
		});
	};

	this.createTable = function(tx) {
		tx.executeSql('DROP TABLE IF EXISTS lobatt');
		var sql = "CREATE TABLE IF NOT EXISTS lobatt ( " + "pid INTEGER PRIMARY KEY AUTOINCREMENT, " + "sid INTEGER, " + "synced INTEGER, " + "provider VARCHAR(50), " + "costCenterName VARCHAR(50), " + "costCenterId INTEGER, " + "projectName VARCHAR(50), " + "projectId INTEGER, " + "jobName VARCHAR(50), " + "jobId INTEGER, " + "absenceName VARCHAR(50), " + "absenceId INTEGER, " + "serverInfo TEXT, " + "day VARCHAR(10), " + "time VARCHAR(8), " + "dateProvider VARCHAR(50), " + "longitude VARCHAR(50), " + "latitude VARCHAR(50), " + "locProvider VARCHAR(50), " + "locAccuracy VARCHAR(5), " + "locDuration VARCHAR(5))";
		tx.executeSql(sql, null, function() {
			console.log('Create table success');
		}, function(tx, error) {
			alert('Create table error: ' + error.message);
		});
	};

	this.addSampleData = function(tx, bookings) {
		var bookings = [{
			"pid" : 1,
			"sid" : -1,
			"synced" : -1,
			"provider" : "device",
			"costCenterName" : "Kostenstelle-1",
			"costCenterId" : 101,
			"projectName" : "Projekt-1",
			"projectId" : 201,
			"jobName" : "Job-1",
			"jobId" : 301,
			"absenceName" : "Absence-1",
			"absenceId" : 401,
			"serverInfo" : "",
			"day" : "2014-01-01",
			"time" : "10:05:30",
			"dateProvider" : "internet",
			"longitude" : "64.00000",
			"latitude" : "80.00000",
			"locProvider" : "gps",
			"locAccuracy" : "300",
			"locDuration" : "3000"
		}, {
			"pid" : 2,
			"sid" : -1,
			"synced" : -1,
			"provider" : "device",
			"costCenterName" : "Kostenstelle-2",
			"costCenterId" : 102,
			"projectName" : "Projekt-2",
			"projectId" : 202,
			"jobName" : "Job-2",
			"jobId" : 302,
			"absenceName" : "Absence-2",
			"absenceId" : 402,
			"serverInfo" : "",
			"day" : "2014-01-01",
			"time" : "10:05:30",
			"dateProvider" : "internet",
			"longitude" : "64.00000",
			"latitude" : "80.00000",
			"locProvider" : "gps",
			"locAccuracy" : "300",
			"locDuration" : "3000"
		}, {
			"pid" : 3,
			"sid" : -1,
			"synced" : -1,
			"provider" : "device",
			"costCenterName" : "Kostenstelle-1",
			"costCenterId" : 101,
			"projectName" : "Projekt-1",
			"projectId" : 201,
			"jobName" : "Job-1",
			"jobId" : 301,
			"absenceName" : "Absence-1",
			"absenceId" : 401,
			"serverInfo" : "",
			"day" : "2014-01-01",
			"time" : "10:05:30",
			"dateProvider" : "internet",
			"longitude" : "64.00000",
			"latitude" : "80.00000",
			"locProvider" : "gps",
			"locAccuracy" : "300",
			"locDuration" : "3000"
		}, {
			"pid" : 4,
			"sid" : -1,
			"synced" : -1,
			"provider" : "device",
			"costCenterName" : "Kostenstelle-2",
			"costCenterId" : 102,
			"projectName" : "Projekt-2",
			"projectId" : 202,
			"jobName" : "Job-2",
			"jobId" : 302,
			"absenceName" : "Absence-2",
			"absenceId" : 402,
			"serverInfo" : "",
			"day" : "2014-01-01",
			"time" : "10:05:30",
			"dateProvider" : "internet",
			"longitude" : "64.00000",
			"latitude" : "80.00000",
			"locProvider" : "gps",
			"locAccuracy" : "300",
			"locDuration" : "3000"
		}, {
			"pid" : 5,
			"sid" : -1,
			"synced" : -1,
			"provider" : "device",
			"costCenterName" : "Kostenstelle-3",
			"costCenterId" : 103,
			"projectName" : "Projekt-3",
			"projectId" : 203,
			"jobName" : "Job-3",
			"jobId" : 303,
			"absenceName" : "Absence-3",
			"absenceId" : 403,
			"serverInfo" : "",
			"day" : "2014-01-01",
			"time" : "10:05:30",
			"dateProvider" : "internet",
			"longitude" : "64.00000",
			"latitude" : "80.00000",
			"locProvider" : "gps",
			"locAccuracy" : "300",
			"locDuration" : "3000"
		}];
		var l = bookings.length;
		var sql = "INSERT OR REPLACE INTO lobatt " + "(pid, sid, synced, provider, costCenterName, costCenterId, projectName, projectId, jobName, jobId, absenceName, absenceId, serverInfo, day, time, dateProvider, longitude, latitude, locProvider, locAccuracy, locDuration) " + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		var e;
		for (var i = 0; i < l; i++) {
			e = bookings[i];
			tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.managerId, e.title, e.city, e.officePhone, e.cellPhone, e.email], function() {
				console.log('INSERT success');
			}, function(tx, error) {
				alert('INSERT error: ' + error.message);
			});
		}
	};

	this.findByName = function(searchKey, callback) {
		this.db.transaction(function(tx) {

			var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " + "FROM lobatt e LEFT JOIN lobatt r ON r.managerId = e.id " + "WHERE e.firstName || ' ' || e.lastName LIKE ? " + "GROUP BY e.id ORDER BY e.lastName, e.firstName";

			tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
				var len = results.rows.length, bookings = [], i = 0;
				for (; i < len; i = i + 1) {
					bookings[i] = results.rows.item(i);
				}
				callback(bookings);
			});
		}, function(error) {
			alert("Transaction Error: " + error.message);
		});
	};

	this.findById = function(id, callback) {
		this.db.transaction(function(tx) {

			var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " + "FROM lobatt e " + "LEFT JOIN lobatt r ON r.managerId = e.id " + "LEFT JOIN lobatt m ON e.managerId = m.id " + "WHERE e.id=:id";

			tx.executeSql(sql, [id], function(tx, results) {
				callback(results.rows.length === 1 ? results.rows.item(0) : null);
			});
		}, function(error) {
			alert("Transaction Error: " + error.message);
		});
	};

	this.initializeDatabase(successCallback, errorCallback);

};
