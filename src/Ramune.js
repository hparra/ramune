/*
 * Ramune.js
 *
 * Copyright © 2008 The Regents of the University of California
 * All Rights Reserved
 *
 * Created by Hector Guillermo Parra, hector@hectorparra.com
 * Telios
 * California Institute for Telecommunications and Information Technology
 * University of California, Irvine
 */ 

/**
 * This uses a singleton pattern because ExternalInterface prevents proper closure for power constructor
 */
var Ramune = (function() {
/* private */
	var	INITIALIZED = "INITIALIZED";

	var ramune, // Flash root
		isInitialized = false,
		listeners = {
		};
	
	// FIXME: Should find out whether it worked or not
	var initialize = function(options) {
		// TODO: check that dependent libs are available
		
		/* DOM */
		div = document.createElement('div');
		div.setAttribute('id', 'Ramune');
		document.body.appendChild(div);
				
		/* SWF */
		// TODO: replace with pure swfobject
		vars = {
			bridgeName: "Ramune",
			serverURI: "rtmfp://stratus.adobe.com/957c10737240a05c0143ce7f-b33403f49938" // user should provide
		};
		options.path = "../bin-debug/Ramune.swf";
		$("#Ramune").flash({
			id: 'ramune',
			swf: path,
			width: '0',
			height: '0',
			params: {
				//wmode: "transparent", // FIXME: See http://twitter.com/hgparra/status/1309417926
				//wmode: "opaque",
				allowscriptaccess: "always",
				allowfullscreen: "true"
			},
			flashvars: vars
		});
		
		/* FABridge */
		FABridge.addInitializationCallback("Ramune", function() {
			ramune = FABridge.Ramune.root();
			// TODO: check that ramune is defined
			isInitialized = true;
			listeners[INITIALIZED]();
		});
	};
	
	return {
/* public */
		INITIALIZED: INITIALIZED,
		NETCONNECTION_SUCCESSFUL: "NetConnectionSuccessful",
		//
		version: 1,

		/**
		 * Initializes Ramune
		 */
		initialize: function() {
			if (isInitialized) {
				console.log("Already initialized");
			}
			else {
				initialize();
			}
		},
		
		/**
		 * @param e event name
		 * @param f function
		 */
		addEventListener: function(e, f) {
			// TODO: error checking + protection
			listeners[this.INITIALIZED] = f;
		},
		triggerEvent: function(e) {
			switch (e) {
				case this.NETCONNECTION_SUCCESSFUL:
				break;
				case this.STATE_CHANGED:
				break;
				case this.RESIZE:
				break;
				default:
				break;
			}
			
			$("#Ramune").trigger(event); // TODO: jQuery removal
		},
		connect: function() {
			ramune.connect();
		},
		placeCall: function(name, farID) {
			ramune.placeCall(name, farID);
		},
		acceptCall: function() {
			ramune.acceptCall();
		},
		endCall: function() {
			ramune.endCall();
		},
		cancelCall: function() {
			ramune.cancelCall();
		},
		ignoreCall: function() {
			ramune.ignoreCall();
		},
		hide: function() {
			ramune.hide();
		},
		show: function() {
			ramune.show();
		}
	};
})();