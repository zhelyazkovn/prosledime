(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};
    
var eventApp;
    
    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        navigator.splashscreen.hide();
    	notificationApp = new notificationApp();
    	notificationApp.run();
        
        eventApp = new EventApp();
    	eventApp.printEvent('deviceready');
    	eventApp.run();
        
    }, false);
    
    function notificationApp() {
    }

    function id(element) {
	return document.getElementById(element);
    }
    
    notificationApp.prototype = {
	alertCount:0,
	run:function() {
		var that = this;
		id("vibrateButton").addEventListener("click", function() {
			that._vibrate.apply(that, arguments);
		});
	},
    
	_vibrate:function() {
		// Note that iPhone ignores the duration parameter and vibrates for
		// a pre-determined amount of time. Some iOS devices would only vibrate when volume is turned off
		navigator.notification.vibrate(3000);
	} 
}
        
    EventApp.prototype = {
	run: function() {
		var that = this;
        
		window.addEventListener("batterystatus",
								function() {
									that._onBatteryStatus.apply(that, arguments)
								},
								false);
	},
    
	
	_onBatteryStatus: function(batteryInfo) {
		var that = this
		batteryLevel = batteryInfo.level,
		isPlugged = batteryInfo.isPlugged;

		var notificationMessage = "Нивото на батерията (" + batteryLevel + "%). " + 
								  "Устройството " + (isPlugged ? "е" : "не е") + "  включено.";
    
		that.printEvent(notificationMessage);
	},

    
	printEvent: function(text) {
		newDiv = document.createElement('div'),
		resultBox = document.getElementById("result");
		var currentTime = new Date().toLocaleTimeString().split(" ")[0];
		newDiv.innerHTML = '[' + currentTime + '] ' + text;
        
		resultBox.appendChild(newDiv);
	}
}
    
    
    
    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
})(window);