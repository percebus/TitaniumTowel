Ti.include('/src/code/lib/include.js')
	exports.width   = Ti.Platform.displayCaps.platformWidth
	exports.height  = Ti.Platform.displayCaps.platformHeight
	exports.isSmall = ( exports.width < 400 )
debug.log( 'display', exports.width + 'x' + exports.height, true )