Ti.include('/src/code/towel/include.js');
var SDK          = TT.require(TT.Module.Titanium);
var cast         = TT.require(TT.Module.Cast);
var compare      = TT.require(TT.Module.Compare);
var os           = TT.require(TT.Module.OS);
var suscriptible = TT.require(TT.Module.Suscriptible);
var iterable     = TT.require(TT.Module.Iterable);
var recursive    = TT.require(TT.Module.Recursive);
var variable     = TT.require(TT.Module.Var);
var assert       = TT.require(TT.Module.Assert);
var events       = TT.require(TT.Module.Event);

// a little bit of syntatic sugar
exports.undefine = cast.undefine;
exports.nullify  = cast.nullify;
exports.dealloc  = builtin.del;


	var KB = exports.KB = exports.KILOBYTE = 1024;

	var Size = exports.Size = {
			Bit : 0,
			Byte: 1,
			Kilo: 2,
			Mega: 3,
			Giga: 4 };

	var Precision = exports.Precision = {
			Superficial: 0,
			Recursive  : 1,
			Intensive  : 2 }


	function RAM(format) 
	{
assert.isNothingOrFn( format, variable.isInt, 'mem.RAM.format is False for isInt' )
		var  output = os.isAndroid ? SDK.Handler.Mem.availableMemory : ( SDK.Handler.Mem.availableMemory * exports.KB*exports.KB )
		var  format = compare.defaultNumber( format, exports.Size.Mega )
		for (var iFormat=0; iFormat<format; iFormat++)
			output = output / exports.KB
	return  output
	}exports.RAM = RAM


	function obliterate( x, doRecursive )
	{
assert.isNothingOrFn( doRecursive, variable.isBoolean, 'mem.obliterate.doRecursive is False for isBoolean' )
		if ( variable.defaultBoolean(doRecursive, true) )
		{// When we unset/nullify/undefine a ref to an object, we don't delete its properties, so we will iterate to oblitearte
recursive.bubble( x, variable.reset )
		}
variable.reset(x)
	return undefined
	}exports.obliterate = obliterate

// whack a mole? (there are still 'moles' under the table)
	function clobber(obj) { return exports.obliterate( obj, false ) }
	 exports.clobber = clobber


	function dispose( obj, doRecursive )
	{
assert.isNothingOrFn( doRecursive, variable.isBoolean, 'mem.dispose.doRecursive is False for isBoolean' )
logger.debug( 'mem.dispose  RAM:' + exports.RAM(), '    ' + variable.hash(obj) )
events.eventsRemove(obj) // since a dictionary can contain Ti.FS which in return can have their own events
exports.obliterate(  obj,  variable.defaultBoolean( doRecursive, false )  )
logger.debug( ' > disposed RAM:' + exports.RAM(), variable.hash(obj), true )
	return  undefined // result
	}exports.dispose = dispose


	function disposeContainer( x, precision )
	{
assert.isNothingOrFn( precision, variable.isInt, 'mem.disposeContainer.precision is False for isInt' )
		var precision = variable.defaultToValue( precision, exports.Precision.Recursive )
		if ( precision >= exports.Precision.Recursive )
		{
			function recursive( container, level )
			{
				sequence.each( sequence.toList(container.children), 
					function( child, item, parent ) 
					{
						if (  variable.canRecursive( container, item )  )
						{
			recursive( child, ++level )
						}
						x.remove(child)
					} )
			}recursive( x, 0 )
		}
		var doRecursive = ( precision >= exports.Precision.Intensive )
	return exports.dispose( x, doRecursive )
	}exports.disposeContainer = disposeContainer
