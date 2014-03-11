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
		console.log("addLocation");
		navigator.geolocation.getCurrentPosition(function(position) {
			$(".location", this.el).html(position.coords.latitude + ", " + position.coords.longitude);
		}, function() {
			alert("Error getting location");
		});
		return false;
	};

	this.initialize();
};
TestView.template = Handlebars.compile($("#test-template").html());
TestView.listTemplate = Handlebars.compile($("#item-list-template").html());