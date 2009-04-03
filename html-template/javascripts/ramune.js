function trace(msg) {
	//if (frescolita.use_trace)
		$.jGrowl(msg);
}

// TODO: Need to remove listeners after end call
function initKeyBindings() {
	$(document).keyup(function(event){
		switch (event.keyCode) {
			case 37: // LEFT KEY
			case 38: // UP KEY
			case 39: // RIGHT KEY
			case 40: // DOWN KEY
				cameraCommand('MOVE_STOP');
				break;
			case 188: // '<' KEY
			case 190: // '>' KEY
				cameraCommand('ZOOM_STOP');
				break;
			default:
				break;
		}
	});
	
	$(document).keydown(function(event){
		switch (event.keyCode) {
			case 37: // LEFT KEY
				cameraCommand('MOVE_LEFT');
				break;
			case 38: // UP KEY
				cameraCommand('MOVE_UP');
				break;
			case 39: // RIGHT KEY
				cameraCommand('MOVE_RIGHT');
				break;
			case 40: // DOWN KEY
				cameraCommand('MOVE_DOWN');
				break;
			case 188: // '<' KEY
				cameraCommand('ZOOM_OUT');
				break;
			case 190: // '>' KEY
				cameraCommand('ZOOM_IN');
				break;
			default:
				break;
		}
	});
}

function cameraCommand(str) {
	subcommand = null;
	switch (str) {
		case "MOVE_UP":
			subcommand = VISCA.subcommand.panTiltDriveUp("05", "05")
			break;
		case "MOVE_DOWN":
			subcommand = VISCA.subcommand.panTiltDriveDown("05", "05");
			break;
		case "MOVE_LEFT":
			subcommand = VISCA.subcommand.panTiltDriveLeft("05", "05");
			break;
		case "MOVE_RIGHT":
			subcommand = VISCA.subcommand.panTiltDriveRight("05", "05");
			break;
		case "MOVE_HOME":
			subcommand = VISCA.subcommand.panTiltDriveHome();
			break;
		case "MOVE_STOP":
			subcommand = VISCA.subcommand.panTiltDriveStop("05", "05");
			break;
		case "ZOOM_IN":
			subcommand = VISCA.subcommand.camZoomTeleStandard();
			break;
		case "ZOOM_OUT":
			subcommand = VISCA.subcommand.camZoomWideStandard();
			break;
		case "ZOOM_STOP":
			subcommand = VISCA.subcommand.camZoomStop();
			break;
		default:
			// TODO: Throw error
			break;
		
	}
	WENDICall("/devices/ptzcamera", VISCA.command(1, subcommand));
}

function startFrameApplication() {
	jRamune.hide();
	$("#placeholder").html("Hi!");
}

/**
 * Sends command to WENDI Server to switch S-Video Input
 *
 * @param string one-digit hexadecimal number
 */
function videoswitchCommand(str) {
	// TODO: Error checking. [1-F]
	WENDICall("/devices/videoswitch", "01 8" + str + " 81 81");
}

function WENDICall(resource, body) {
	trace("WENDI Call(" + resource + " <= " + body + ")");
	$.ajax({
		type: "POST",
		url: resource,
		//processData: false,
		data: body,
		dataType: "text",
		success: function(data, status) {
			//alert(data);
		}
	});
}

function flipScreens() {
	
}
