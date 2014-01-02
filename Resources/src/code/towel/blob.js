Ti.include('/src/code/towel/include.js');
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)
var sequence = TT.require(TT.Module.Sequence)
var string   = TT.require(TT.Module.Str)

exports.encode = Ti.Utils.base64encode


	var Type = exports.Type = {
			Category: { // http://en.wikipedia.org/wiki/Internet_media_type
				Binary: {
					Byte: 'octet' // application/octet-stream
				},
				Script: {
					Script    : 'script', // application/javascript or application/ecmascript
					JavaScript: 'javascript', //text/javascript > application/javascript
					ECMAscript: 'ecmascript',
					CSS       : 'css' },
				Data: {
					XML : 'xml',
					JSON: 'json',
					CSV : 'csv',
					Any : 'text' // text-plain
				},
				Document: {
					Text_: 'plain', // text-plain
					PDF  : 'pdf',   // application/pdf
					HTML : 'htm'    // text/html
				},
				Media: {
					Image_: 'image', // image/jpeg
//					SVG   : 'svg',   // image/svg+xml
					Audio : 'audio', // audio/mp3
					Video : 'video', // video/mpeg
					OGG   : 'ogg',   // application/ogg
				}}}

	var Property = {
			mimeType: 'mimeType',
			file    : 'file',
			Text_   : 'text',
			width   : 'width',
			height  : 'height',
			Pixels  : 'size',
			Bytes   : 'length'}
		Property.MIME = Property.mimeType
		Property.FS   = Property.file
	exports.Property = Property


	function getMIME(x)
	{
validate.isTiObject( x, 'blob.MIME.x is False for isTiObject' )
		var MIME = compare.resolveProperty( x, exports.Property.MIME ) 
debug.log( ' > MIME', MIME, true )
	return  MIME
	}exports.getMIME = exports.MIME_get = exports.MIME = getMIME


	function isInMIME( search, x )
	{
validate.isCriteria( search, 'blob.isInMIME.search is False for isCriteria: %s' )
validate.isTiObject( x     , 'blob.isInMIME.x      is False for isTiObject' )
	return string.isInString( search, exports.MIME_get(x) )
	}exports.isInMIME = isInMIME


	function isMIMEanyOf( x, categories ) 
	{
validate.isTiObject  ( x         , 'blob.isMIMEanyOf.x          is False for isTiObject' )
validate.isCollection( categories, 'blob.isMIMEanyOf.categories is False for isCollection' )
	return iterable.any( categories, function(search){ return exports.isInMIME( search, x ) } )
	}exports.isMIMEanyOf = isMIMEanyOf


	function isData(x) 
	{
validate.isTiObject( x, 'blob.isData.x is False for isTiObject' ) 
	return exports.isMIMEanyOf( x, exports.Type.Category.Data ) 
	}exports.isData = isData


	function isMedia(x) 
	{
validate.isTiObject( x, 'blob.isMultimedia.x is False for isTiObject' ) 
	return exports.isMIMEanyOf( x, exports.Type.Category.Media ) 
	}exports.isMedia = exports.isMultiMedia = isMedia


	function isDocument(x) 
	{
validate.isTiObject( x, 'blob.isDocument.x is False for isTiObject' ) 
	return exports.isMIMEanyOf( x, exports.Type.Category.Document ) 
	}exports.isDocument = isDocument


	function isScript(x) 
	{ 
validate.isTiObject( x, 'blob.isScript.x is False for isTiObject' )
	return exports.isMIMEanyOf( x, exports.Type.Category.Script ) 
	}exports.isScript = isScript


	function isBinary(x)
	{
validate.isTiObject( x, 'blob.isBinary.x is False for isTiObject' )
	return exports.isInMIME( exports.Type.Category.Binary.Byte, x )
	}exports.isBinary = isBinary


	function isMIME_folder(x) 
	{ // TODO test this in android
validate.isTiObject( x, 'blob.isMIME_folder.x is False for isTiObject' )
	return exports.isBinary(x) 
	}exports.isMIME_folder = isMIME_folder


	function isMIME_file(x) 
	{ 
validate.isTiObject( x, 'blob.isMIME_file.x is False for isTiObject' )
	return ( exports.isBinary(x) || exports.isData(x) || exports.isMultimedia(x) || exports.isDocument(x) || exports.isScript(x) )
	}exports.isMIME_file = isMIME_file


	function getF(x) 
	{// it actually returns the oFile object, for either file or folder
validate.isTiObject( x, 'blob.file.x is False for isTiObject' ) 
	return compare.resolveProperty( x, exports.Property.FS ) 
	} exports.getF = exports.file_get = exports.file = exports.f_get = getF


	function getText(x) 
	{
validate.isTiObject( x, 'blob.text.x is False for isTiObject' )
exports.MIME_get(x)
		var text = compare.resolveProperty( x, exports.Property.Text_ )
debug.log( ' > text', text )
	return compare.isStringSome(text) ? text : null // folder returns '' O.o
	}exports.getText = exports.text = exports.text_get = getText

/* TODO
	function getTextFromFile(x) 
	{ 
validate.isTiObject( x, 'blob.fileText_get.x is False for isTiObject' )
	return exports.isMIME_file(x) ? exports.text_get(x) : null 
	}exports.getTextFromFile = exports.fileText_get = getTextFromFile
 */

	function isFile(x) 
	{ 
validate.isTiObject( x, 'blob.isFile.x is False for isTiObject' )
	return compare.defaultBoolean(  (  compare.isStringSome( exports.text(x) )  ||  exports.isMIME_file(x)  ),  null  ) 
	}exports.isFile = isFile


	function _getDimension( x, property )
	{
validate.isTiObject( x       , 'blob._getDimension.x        is False for isTiObject' )
validate.isString  ( property, 'blob._getDimension.property is False for isString' )
		var result = compare.resolveProperty( x, property )
	return  compare.isPositiveInt(result) ? result : null		
	}// no export


	function getWidth(x) 
	{
validate.isTiObject( x, 'blob.width.x is False for isTiObject' ) 
	return _getDimension( x, exports.Property.width ) 
	}exports.getWidth = exports.width_get = exports.width = getWidth 


	function getHeight(x) 
	{
validate.isTiObject( x, 'blob.height.x is False for isTiObject' ) 
	return _getDimension( x, exports.Property.height ) 
	}exports.getHeight = exports.height_get = exports.height = getHeight


	function isImage(x) 
	{ 
validate.isTiObject( x, 'blob.isImage.x is False for isTiObject' )
	return (  ( exports.width(x) && exports.height(x) )  ||  exports.isInMIME( exports.Type.Category.Media.Image_, x ) ) 
	}exports.isImage = isImage


	function getDimensions(x) 
	{ 
validate.isTiObject( x, 'blob.dimensions.x is False for isTiObject' )
	return exports.isImage(x) ? [ exports.width(x), exports.height(x) ] : null 
	}exports.getDimensions = exports.dimensions_get = exports.dimensions = getDimensions


	function getPixels(x) 
	{
validate.isTiObject( x, 'blob.pixels.x is False for isTiObject' ) 
	return exports.isImage(x) ? compare.resolveProperty( x, exports.Property.Pixels ) : null 
	}exports.getPixels = exports.pixels_get = exports.pixels = getPixels


	function getBytes(x) 
	{ 
validate.isTiObject( x, 'blob.bytes.x is False for isTiObject' )
	return compare.resolveProperty( exports.encode(x), exports.Property.Bytes ) 
	}exports.getBytes = exports.bytes_get = exports.bytes = getBytes
