Ti.include('/src/code/lib/include.js')
var validate = TT.require(TT.Module.Validate)
var str      = TT.require(TT.Module.Str)


	var Ext = {
			SQL       : 'sql',
			JavaScript: 'js',
			JSS       : 'jss',
			CSS       : 'css',
			PNG       : 'png',
			JPG       : 'jpg',
			JPEG      : 'jpeg',
			GIF       : 'gif',
			JSON      : 'json'}
		Ext.Code   = Ext.JavaScript
		Ext.Module = Ext.JavaScript
	exports.Ext = Ext

	var images = [
			exports.Ext.PNG,
			exports.Ext.JPG,
			exports.Ext.JPEG,
			exports.Ext.GIF]
	exports.images = images


	function ensure(x)
	{
validate.isSomeString( x, 'extension.ensure.x is False for isSomeString' )
	return str.ensureStartsWith( x, '.' )
	}exports.ensure = exports.ensureExtension = ensure
