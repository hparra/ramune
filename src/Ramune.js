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

/*
 *  DEPENDENCIES
 * 
 * SWFObject
 * jQuery (Will be removed in future)
 * 
 */

if (typeof console === 'undefined') {
	var console = {
		debug: function() {},
		log: function() {}
	};
}

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
	
	var events = {
		RESIZE: "RAMUNE_RESIZE_EVENT",
		STATE_CHANGE: "RAMUNE_STATE_CHANGE_EVENT"
	};
	
	// FIXME: Should find out whether it worked or not
	var initialize = function(options) {
		
		if (typeof swfobject === "undefined") {
			throw new Error("SWFObjectNotFound", "\'swfobject\' undefined. Initialization aborting.");
		}
		
		// TODO: deprecate
		if (typeof jQuery === "undefined") {
			throw new Error("jQueryNotFound", "\'jquery\' undefined. Initialization aborting.");
		}
		
		// TODO: deprecate
		if (typeof FABridge === "undefined") {
			throw new Error("FABridgeNotFound", "\'FABridge\' undefined. Initialization aborting.");
		}
		
		/* DOM */
		div = document.getElementById('Ramune');
		if (div === null) {
			div = document.createElement('div');
			div.setAttribute('id', 'Ramune');
			div.setAttribute('class', 'Ramune');
			document.body.appendChild(div);
		}
		
		/* SWF */
		flashvars = {
			bridgeName: "Ramune",
			serverURI: "rtmfp://stratus.adobe.com/957c10737240a05c0143ce7f-b33403f49938" // user should provide?
		};		
		params = {
			//wmode: "transparent", // FIXME: See http://twitter.com/hgparra/status/1309417926
			//wmode: "opaque",
			allowscriptaccess: "always",
			allowfullscreen: "true"
		};
		attributes = {};
		embed_callback = function() {
			console.debug("[RamuneJS] SWFObject embedded");
		};
		swfobject.embedSWF("../bin-debug/Ramune.swf", "Ramune", "0", "0", "10.0.0", "expressInstall.swf", flashvars, params, attributes, embed_callback);

		// TODO: deprecate
		/* FABridge */
		FABridge.addInitializationCallback("Ramune", function() {
			ramune = FABridge.Ramune.root();
			if (typeof ramune === "undefined" || ramune === null) {
				throw new Error("RamuneUndefined", "\'ramune\' undefined. FABridge Initialization aborting.");
			}
			isInitialized = true;
			listeners[INITIALIZED]();
		});	
		
	};
	
	return {
/* public */
		INITIALIZED: INITIALIZED,
		NETCONNECTION_SUCCESSFUL: "NetConnectionSuccessful",
		events: events,
		//
		version: 1,

		// FIXME: Redesign
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
		
		// FIXME: Hackey
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
		triggerCallStateChangeEvent: function(state) {
			console.debug("Triggering STATE_CHANGE");
			event = jQuery.Event(Ramune.events.STATE_CHANGE);
			event.state = state;
			$("#Ramune").trigger(event);
		},
		triggerResizeEvent: function(width, height) {
			event = jQuery.Event(Ramune.events.RESIZE);
			event.width = width;
			event.height = height;
			$('#Ramune').trigger(event);
		},
		resize: function(width, height) {
			ramune.setSize(width, height);
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