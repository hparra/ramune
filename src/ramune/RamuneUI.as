package ramune
{
	import flash.media.Camera;
	import flash.media.Video;
	import flash.net.NetStream;
	
	import mx.core.UIComponent;

	/**
	 * All Flex components extend UIComponent, which is a grandchild of Sprite.
	 * 
	 * We use this new Video class to implement custom full-screen behavior and NetStream attachment.
	 */
	public class RamuneUI extends UIComponent
	{

		private var videos:Array;

		public function RamuneUI() {
			super();
			videos = new Array();
		}
		
		public function newVideo(width:uint, height:uint, x:uint, y:uint, z:uint):uint {
			videos.push(new Video(this.width, this.height));
			var index:uint = videos.length - 1;
			this.addChild(videos[index]);
			videos[index].smoothing = true;
			videos[index].x = x;
			videos[index].y = y;
			// TODO: z-index
			return index;
		}
		
		public function resizeVideo(index:uint, width:uint, height:uint):void {
			videos[index].width = width;
			videos[index].height = height;
		}
		
		/**
		 * From doc: "You do not call this method directly. Flex calls the createChildren() method in response to the call to the addChild() method to add the component to its parent."
		 * 
		 * It's only when this is added that its Video child is instantiated
		 */
		override protected function createChildren():void {
			super.createChildren();
		}
		
		
		/**
		 * I dont' know what this does!
		 */
		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			super.updateDisplayList( unscaledWidth, unscaledHeight );

			// TODO: Was this important? Research updateDisplayList()
			//remote_video.x = 0;
			//remote_video.y = 0;
			//remote_video.width = unscaledWidth;
			//remote_video.height = unscaledHeight;
		}
		
		public function getVideos():Array {
			return videos;
		}
		
		public function attachCameraToVideo(cam:Camera, index:uint):void {
			// TODO: error handling
			videos[index].attachCamera(cam);
		}

		public function attachNetStreamToVideo(ns:NetStream, index:uint):void {
			// TODO: error handling
			videos[index].attachNetStream(ns);
		}
	}
}	