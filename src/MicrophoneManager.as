package {
	import flash.media.Microphone;
	import flash.media.SoundCodec;

	public class MicrophoneManager {
		
		private var mics:Array;
		private var defaultMicrophoneIndex:int;
		
		private var defaults:Object = {

		};
		
		public function MicrophoneManager() {
			defaultMicrophoneIndex = -1;
			mics = null;
			
			if (Microphone.names.length > 0) {
					mics = new Array();
				for (var i:uint = 0; i < Microphone.names.length; ++i) {
					//debug("Found Microphone " + i + "	: " + Microphone.names[i]);
					mics.push(Microphone.getMicrophone(i));
					mics[i].codec = SoundCodec.SPEEX;
					mics[i].rate = 11; // Microphone default
					mics[i].framesPerPacket = 2; // Microphone default
					mics[i].encodeQuality = 6; // Microphone default [0, 10]
					mics[i].setSilenceLevel(0); // NOTE: needed due to strange bug
					mics[i].setUseEchoSuppression(false);
				}
				defaultMicrophoneIndex = Microphone.getMicrophone(-1).index;
			}
		}
		
		public function getDefaultMicrophone():Microphone {
			if (defaultMicrophoneIndex >= 0)
				return mics[defaultMicrophoneIndex];
			else
				return null;
		}
		
		public function getMicrophoneCount():uint {
			return mics.length;
		}
		
		public function getMicrophones():Array {
			return mics;
		}
		
		public function getMicrophoneByName(name:String):Microphone {
			var index:int = findMicrophoneIndexByName(name);
			if (index >= 0)
				return mics[index];
			else
				return null;
		}
		
		public function findMicrophoneIndexByName(name:String):int {
			if (name !== null)
				for (var i:int = 0; i < mics.length; ++i)
					if (mics[i].name == name)
						return i;
			return -1;
		}
	}
}