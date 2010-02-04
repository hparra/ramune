package {
	//import flash.events.StatusEvent;
	//import flash.system.Capabilities;
	//import com.adobe.serialization.json.JSON;
	import flash.net.SharedObject;
	import flash.net.NetConnection;
	import flash.net.NetStream;


	public class NetManager {
		
		private var netconnections:Array;
		private var netstreams:Array;
		
		public function NetManager():void {
			netconnections = new Array();
			netstreams = new Array();	
		}
		
		public function createNetConnection():NetConnection {
			return new NetConnection();
		}
		
		public function createNetStream(netConnection:NetConnection):NetStream {
			return new NetStream(netConnection);
		}
		
		public function getRemoteSharedObject(name:String, remotePath:String = null, persistence:Object = false, secure:Boolean = false):SharedObject {
			return SharedObject.getRemote(name, remotePath, persistence, secure);
		}
	}
}