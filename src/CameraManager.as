package {
	import flash.media.Camera;
	import flash.system.Capabilities;

	public class CameraManager {
		
		private var cams:Array;
		private var defaultCameraIndex:int;
		
		private var defaults:Object = {
			width: 640,
			height: 480,
			bandwidth: 0,
			quality: 95,
			fps: 25,
			keyFrameInterval: 25
		};
		
		public function CameraManager() {
			defaultCameraIndex = -1;
			cams = null;
			
			if (Camera.names.length > 0) {
				cams = new Array();
				for (var i:uint = 0; i < Camera.names.length; ++i) {
					//debug("Found Camera " + i + ": " + Camera.names[i]);
					cams.push(Camera.getCamera(i.toString()));
					
					cams[i].setQuality(defaults.bandwidth, defaults.quality);
					cams[i].setMode(defaults.width, defaults.height, defaults.fps);
					cams[i].setKeyFrameInterval(defaults.keyFrameInterval);
					//cams[i].addEventListener();
				}
				
				if (Capabilities.os.search("Mac") != -1)
					defaultCameraIndex = findCameraIndexByName("USB Video Class Video");
				else
					defaultCameraIndex = Camera.getCamera(null).index;
			}
		}
		
		public function getDefaultCamera():Camera {
			if (defaultCameraIndex >= 0)
				return cams[defaultCameraIndex];
			else
				return null;
		}
		
		public function getCameraCount():uint {
			return cams.length;
		}
		
		public function getCameras():Array {
			return cams;
		}
		
		public function getCameraByName(name:String):Camera {
			var index:int = findCameraIndexByName(name);
			if (index >= 0)
				return cams[index];
			else
				return null;
		}
		
		public function findCameraIndexByName(name:String):int {
			if (name !== null)
				for (var i:int = 0; i < cams.length; ++i)
					if (cams[i].name == name)
						return i;
			return -1;
		}
		
		public function setQualityForAllCameras(bandwidth:uint, quality:uint):void {
			for (var i:String in cams)
				cams[i].setQuality(bandwidth, quality);
		}
	}
}