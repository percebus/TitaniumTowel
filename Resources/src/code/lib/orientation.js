Ti.include('/src/code/lib/include.js')
var os       = TT.require(TT.Module.OS)
var variable = TT.require(TT.Module.Var)
var display  = TT.require(TT.Module.Display)
var events   = TT.require(TT.Module.Event)

	function isOrientedTo(x) { return variable.isValue( Ti.Gesture.orientation, x ) }
	 exports.isOrientedTo = isOrientedTo

	function isLandscape() { return ( exports.isOrientedTo(Titanium.UI.LANDSCAPE_LEFT) || exports.isOrientedTo(Titanium.UI.LANDSCAPE_RIGHT) ) }
	 exports.isLandscape = isLandscape

// TODO inverse portrait?
	function isPortraitPhone() { return exports.isOrientedTo(Titanium.UI.PORTRAIT) }
	 exports.isPortraitPhone = isPortraitPhone

	function shouldHide() { return (  ( !exports.isPortraitPhone() )  &&  display.isSmall  ) }
	 exports.shouldHide = shouldHide


	function toggleStatusbarOnOrientationChange()
	{// Adding window by window would be nightmare-ish
		if (display.isSmall)
		{
debug.log('display: too small!, adding orientation event listener')
events.eventListenerAdd( 'orientationchange', 
				function(e)
				{
debug.log( 'orientation.changed', Ti.Gesture.orientation, true )
					if ( exports.shouldHide() )	os.statusHide()
					else						os.statusShow()
				}, Ti.Gesture )
		}
	}exports.toggleStatusbarOnOrientationChange = toggleStatusbarOnOrientationChange

	function getWidth (){ return exports.isLandscape() ? display.height : display.width }
	 exports.getWidth = exports.width_get = exports.width = getWidth

	function getHeight(){ return exports.isLandscape() ? display.width : display.height }
	 exports.getHeight = exports.height_get = exports.height = getHeight

