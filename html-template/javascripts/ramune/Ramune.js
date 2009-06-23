
/**
 * Ramune
 * 
 * (Power Constructor Pattern)
 */
function Ramune(id, vars, params) {
	
	var that = object(), id;

	var ramune;
	
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
	
	that.states = {
		CALL_NOT_READY: "RamuneCallNotReady",
		CALL_READY: "RamuneCallReady",
		CALL_CALLING: "RamuneCallCalling",
		CALL_RINGING: "RamuneCallRinging",
		CALL_ESTABLISHED: "RamuneCallEstablished",
		CALL_FAILED: "RamuneCallFailed"
	}
	
	that.events = {
		RESIZE: "RamuneResizeEvent",
		STATE_CHANGED: "RamuneStateChangedEvent",
		NETCONNECTION_SUCCESSFUL: "RamuneNetConnectionSuccessful"
	}
	
	// NOT SURE I WANT TO IMPLEMENT that
	that.triggerEvent = function(e) {
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
	};
	
	
	that.onNetConnectionSuccess = function(farID) {
		event = jQuery.Event(jRamune.events.NETCONNECTION_SUCCESSFUL);
		event.farID = farID;
		$("#Ramune").trigger(event);
	};

	that.onCallStateChanged = function(state) {
		event = jQuery.Event(jRamune.events.STATE_CHANGED);
		event.state = state;
		$("#Ramune").trigger(event);
	};
	
	that.onResize = function(width, height) {
		event = jQuery.Event(jRamune.events.RESIZE); // FIXME: that?
		event.width = width;
		event.height = height;
		$("#Ramune").trigger(event);
	};
	
	// Clean me up!
	
	that.connect = function() {
		ramune.connect();
	};
	
	that.placeCall = function(name, farID) {
		ramune.placeCall(name, farID);
	};
	
	that.acceptCall = function() {
		ramune.acceptCall();
	};
	
	that.endCall = function() {
		ramune.endCall();
	}
	
	that.cancelCall = function() {
		ramune.cancelCall();
	}
	
	that.ignoreCall = function() {
		ramune.ignoreCall();
	}
	
	that.hide = function() {
		ramune.hide();
	}
	
	that.show = function() {
		ramune.show();
	}
	
	/*
	 * Constructor
	 */
	try {
		initialize(path, vars);
		return that;
	}
	catch(e) {
		
	}
	
	
};