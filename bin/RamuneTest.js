RamuneTest = {
	placeCall: function() {
		v = prompt("Adobe Stratus farID: ");
		if (v !== null)
			Ramune.placeCall("?", v);
	},
	acceptCall: function() {
		Ramune.acceptCall();
	},
	cancelCall: function() {
		Ramune.cancelCall();
	},
	ignoreCall: function() {
		Ramune.endCall();
	},
	endCall: function() {
		Ramune.endCall();
	}
}