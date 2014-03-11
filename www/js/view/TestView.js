var TestView = function() {
	this.initialize = function() {
		var self = this;
		this.el = $('<div/>');
		this.el.on("click", ".add-location-btn", this.addLocation);
		this.fillList();
	};

	this.render = function() {
		this.el.html(TestView.template());
		return this;
	};

	this.fillList = function() {
		TestView.listTemplate(findAllLobats());
	};

	this.addLocation = function(event) {
		event.preventDefault();
		$(".location", this.el).html("Finding geolocation...");

		var onSuccess = function(position) {
			$(".location", this.el).html(position.coords.latitude + ", " + position.coords.longitude + ", " + position.coords.accuracy + ", " + position.timestamp);
		};
		var onError = function(error) {
			alert("Error getting location:\n" + "code: " + error.code + "\n" + "message: " + error.message + "\n");
			$(".location", this.el).html("Location couldn't be determined");
		};
		var options = {
			maximumAge: 1000*60*5,
			timeout: 1000*10,
			enableHighAccuracy: true
		};
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		return false;
	};

	this.initialize();
};
TestView.template = Handlebars.compile($("#test-template").html());
TestView.listTemplate = Handlebars.compile($("#item-list-template").html());