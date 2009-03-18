

function VISCACommand(camNum, subcommand){
	return "8" + camNum + " " + subcommand;
}

var VISCA = {
	command: function(camNum, subcommand) {
		return "8" + camNum + " " + subcommand;
	},
	subcommand: {
		// v : Pan Speed -> 01 to 18, 2 digit string
		// w : Tilt Speed -> 01 to 17, 2 digit string
		
		panTiltDriveUp: function(v,w){
			return "01 06 01 "+v+" "+w+" 03 01 FF";
		},
		
		panTiltDriveDown: function(v,w){
			return "01 06 01 "+v+" "+w+" 03 02 FF";
		},
		
		panTiltDriveLeft: function(v,w){
			return "01 06 01 "+v+" "+w+" 01 03 FF";
		},
		
		panTiltDriveRight: function(v,w){
			return "01 06 01 "+v+" "+w+" 02 03 FF";
		},
		
		panTiltDriveStop: function(v,w){
			return "01 06 01 "+v+" "+w+" 03 03 FF";
		},
		
		panTiltDriveHome: function(){
			return "01 06 04 FF";
		}
	}
}

