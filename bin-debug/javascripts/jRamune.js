/*
 * jRamune
 * JavaScript Helper for Ramune
 * Hector Parra
 */
var jRamune = {
	states: {
		CALL_NOT_READY: "RamuneCallNotReady",
		CALL_READY: "RamuneCallReady",
		CALL_CALLING: "RamuneCallCalling",
		CALL_RINGING: "RamuneCallRinging",
		CALL_ESTABLISHED: "RamuneCallEstablished",
		CALL_FAILED: "RamuneCallFailed"
	},
	events: {
		RESIZE: "RamuneResizeEvent",
		STATE_CHANGED: "RamuneStateChangedEvent",
		NETCONNECTION_SUCCESSFUL: "RamuneNetConnectionSuccessful"
	},
	selector: null,
	initialize: function(s) {
		selector = s;
		$(s).flash({
			id: 'ramune',
			swf: 'ramune.swf',
			width: '0',
			height: '0',
			params: {
				//wmode: "transparent, // FIXME: See http://twitter.com/hgparra/status/1309417926
				allowscriptaccess: "always",
				allowfullscreen: "true"	
			},
			flashvars: {
			}
		});
	},
	placeCall: function(name, farID) {
		ramune.placeCall(name, farID); // NOTE: Defined by ExternalInterface
	},
	acceptCall: function() {
		ramune.acceptCall(); // NOTE: Defined by ExternalInterface
	},
	endCall: function() {
		ramune.endCall(); // NOTE: Defined by ExternalInterface
	},
	onNetConnectionSuccess: function(farID) {
		event = jQuery.Event(jRamune.events.NETCONNECTION_SUCCESSFUL);
		event.farID = farID;
		$(selector).trigger(event);
	},
	onCallStateChanged: function(state) {
		event = jQuery.Event(jRamune.events.STATE_CHANGED);
		event.state = state;
		$(selector).trigger(event);
	},
	onResize: function(width, height) {
		event = jQuery.Event(jRamune.events.RESIZE); // FIXME: this?
		event.width = width;
		event.height = height;
		$(selector).trigger(event);
	}
}