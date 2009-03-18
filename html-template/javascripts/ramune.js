function trace(msg) {
	//if (frescolita.use_trace)
		$.jGrowl(msg);
}


function moveCamUp() {
	command = VISCA.command(1, VISCA.subcommand.panTiltDriveUp("01", "01"));
	trace("moveCamUp VISCA ASCII: " + command);
	WENDICall("/resources/visca_camera", hexify(command));
}


function moveCamDown() {
	command = "";
	trace("moveCamDown sent: " + command);
}


function moveCamLeft() {
	trace("moveCamLeft");
}


function moveCamRight() {
	trace("moveCamRight");
}

function zoomCamIn() {
	trace("zoomCamIn");
}

function zoomCamOut() {
	trace("zoomCamOut");
}

function WENDICall(resource, body) {
	trace("Hexified Command: " + body);
}