Ti.include('/src/code/towel/include.js');
var compare    = TT.require(TT.Module.Compare);
var dictionary = TT.require(TT.Module.Dictionary);
var str        = TT.require(TT.Module.Str);
var mem        = TT.require(TT.Module.Mem);
var fs         = TT.require(TT.Module.FS);


	var Mode = exports.Mode = {
			R: Ti.Stream.MODE_READ,
			W: Ti.Stream.MODE_WRITE,
			A: Ti.Stream.MODE_APPEND };


	function createBuffer(attributes) { return Ti.createBuffer( dictionary.extend( attributes, {length:mem.KB} ) ); }
	 exports.createBuffer = createBuffer;

	function disposeStream(oStream)
	{
		oStream.close()
mem.dispose(oStream)
	}exports.dispose = dispose


	function fileOpen( input, mode )
	{
		var oF = fs.file(input)
	return  oF.open(mode)
	}exports.fileOpen = fileOpen


	function fileOpenRead(input) { return exports.fileOpen( input, fs.Mode.R ) }
	 exports.fileOpenRead = fileOpenRead

	function fileOpenWrite( input, append ) 
	{ 
		var append = compare.defaultBoolean( append, false )
		var mode   = append ? fs.Mode.A : fs.Mode.W
	return exports.fileOpen( input, mode ) 
	}exports.fileOpenWrite = fileOpenWrite


	function callbacks( arg, fnDuring, fnDone )
	{
		var arg = compare.defaultDictionary(arg)
		if ( compare.isEndOfStream(arg.bytesProcessed) )
		{
debug.log( 'stream.EoS' )
			fnDone(arg)
	return
		}
	// implicit else
debug.log( str.format( 'stream.received %.0f / %.0f', arg.bytesProcessed, arg.totalBytesProcessed ) )
		fnDuring(arg)		
	return
	}exports.callbacks = callbacks


	function read( oStream, oBuffer )
	{
		var result = oStream.read(oBuffer)
	return compare.isEndOfStream(result) ? null : result
	}exports.read = read


	function move( oStreamSrc, oStreamDst ) 
	{ 
		Ti.Stream.writeStream( oStreamSrc, oStreamDst )
	return oStreamDst 
	}exports.move = move


	function copy( oStreamSrc, oStreamDst, attributes )
	{
		var oBuffer  = exports.createBuffer(attributes)
		var streamed = 0
		while( streamed = exports.read( oStreamSrc, oBuffer ) )
			oStreamDst.write( oBuffer, 0, streamed )
	return  oStreamDst
	}exports.copy = copy
