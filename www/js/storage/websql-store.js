var Lobat;
function LobatDatabase(successCallback) {
	console.log("Starting initialization of Database...");
	persistence.store.websql.config(persistence, "lobatt.db", "Database for ZE.mobile", 5 * 1024 * 1024);

	Lobat = persistence.define("Lobat", {
		// pid : "INT",
		synced : "BOOL",
		serverId : "INT",
		serverInfo : "TEXT",

		day : "TEXT",
		time : "TEXT",
		dateProvider : "TEXT",

		lat : "REAL",
		lon : "REAL",
		locProvider : "TEXT",
		locAccuracy : "INT",
		locDuration : "INT",

		provider : "TEXT",
		costCenterName : "TEXT",
		costCenterId : "INT",
		projectName : "TEXT",
		projectId : "INT",
		jobName : "TEXT",
		jobId : "INT",
		absenceName : "TEXT",
		absenceId : "INT"
	});

	// Lobat.index("pid", {
	// unique : true
	// });

	persistence.reset(function() {
		persistence.schemaSync(function() {
			for (var i = 0; i < 5; i++) {
				var lobat = new Lobat();
				// lobat.pid = i + 1;
				lobat.serverId = i + 1;
				lobat.serverInfo = "TestBooking_" + (i + 1);
				persistence.add(lobat);
			}
			persistence.flush(function() {
				console.log("Initialization of Database complete.");
				if (successCallback) {
					successCallback();
				};
			});
		});
	});
};
findAllLobats = function(callback) {
	if (callback) {
		callback(Lobat.all());
	}
	return Lobat.all();
};

showAllLobats = function() {
	var allLobats = findAllLobats();
	console.log("All Lobats in DB:");
	allLobats.list(null, function(results) {
		results.forEach(function(r) {
			logLobat(r);
		});
		console.log("End of collection.");
	});
};
// }

logLobat = function(lobat) {
	console.log(lobatToString(lobat));
};

lobatToString = function(lobat) {
	if (lobat.id != null) {
		myLobatId = lobat.id;
	};
	return myLobatId + ", " + lobat.synced + ", " + lobat.serverId + ", " + lobat.serverInfo;
};

Handlebars.registerHelper("persistence", function(objectReference, options) {
	var out = "<ul>";
	this.list(null, function(results) {
		results.forEach(function(r) {
			out = out + options.fn(r);

		});
		out = out + "</ul>";
		console.log(out);
		$(objectReference).html(out);
	});
});
