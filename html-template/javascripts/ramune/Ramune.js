/*
 * Ramune.js
 *
 * Copyright © 2008 The Regents of the University of California
 * All Rights Reserved
 *
 * Created by Hector Guillermo Parra, hector@hectorparra.com
 * California Institute for Telecommunications and Information Technology
 * University of California, Irvine
 */ 

/**
 * This uses a singleton pattern because ExternalInterface prevents proper closure for power constructor
 */
var Ramune = (function() {
/* private */
	var ramune; // Flash root
	
	// FIXME: Should find out whether it worked or not
	var initialize = function(path, vars) {
		// TODO: replace with pure swfobject
		$("#Ramune").flash({
			id: 'ramune',
			swf: path + 'ramune.swf',
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
	};
	
/* public */
	return {
		// TODO: Closure to make static
		states: {
			CALL_NOT_READY: "RamuneCallNotReady",
			CALL_READY: "RamuneCallReady",
			CALL_CALLING: "RamuneCallCalling",
			CALL_RINGING: "RamuneCallRinging",
			CALL_ESTABLISHED: "RamuneCallEstablished",
			CALL_FAILED: "RamuneCallFailed"
		},
		// TODO: Closure to make static
		events: {
			RESIZE: "RamuneResizeEvent",
			STATE_CHANGED: "RamuneStateChangedEvent",
			NETCONNECTION_SUCCESSFUL: "RamuneNetConnectionSuccessful"
		},
		// NOT SURE I WANT TO IMPLEMENT THIS
		triggerEvent: function(e) {
			switch (e) {
				case that.events.RESIZE:

				break;

				case that.events.STATE_CHANGED:
				break;

				case that.events.NETCONNECTION_SUCCESSFUL:
				break;
				default:
				break;
			}
		},
		onNetConnectionSuccess: function(farID) {
			event = jQuery.Event(jRamune.events.NETCONNECTION_SUCCESSFUL);
			event.farID = farID;
			$("#Ramune").trigger(event);
		},
		onCallStateChanged: function(state) {
			event = jQuery.Event(jRamune.events.STATE_CHANGED);
			event.state = state;
			$("#Ramune").trigger(event);
		},
		onResize: function(width, height) {
			event = jQuery.Event(jRamune.events.RESIZE); // FIXME: that?
			event.width = width;
			event.height = height;
			$("#Ramune").trigger(event);
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
}());