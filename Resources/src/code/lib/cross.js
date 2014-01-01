Ti.include('/src/code/lib/include.js')
var compare   = TT.require(TT.Module.Compare)
var validate  = TT.require(TT.Module.Validate)
var sequence  = TT.require(TT.Module.Sequence)
var iterable  = TT.require(TT.Module.Iterable)
var functions = TT.require(TT.Module.Fn)


	function _fwdToBuiltinFn( fnEval, fnNative, fnIterable, args ) 
	{
		var x    = sequence.nth( args, 1 )
		var list = sequence.nth( args, 2 )
	return ( fnEval(x) && compare.isFunction(fnNative) ) ? fnNative.call( x, list ) : functions.fwd( fnIterable, args ) 
	}// no exports


	function _fwdToBuiltinFnList( fnNative, fnIterable, args ) 
	{
		var x = sequence.first(args) 
validate.isIterable( x, 'function._fwdToBuiltinFnList.x is False for isIterable %' )
	return _fwdToBuiltinFn( compare.isArray, fnNative, fnIterable, args ) 
	}// no exports


	function keys() 
	{
		var x = sequence.first(arguments) 
validate.isObject( x, 'function.keys.x is False for isObject' ) 
	return _fwdToBuiltinFn( compare.isObject, builtin.keys, iterable.keys, arguments ) 
	}exports.keys = iterable.keys // builtin.keys doesn't work properly


	function map   () { return _fwdToBuiltinFnList( builtin.map   , iterable.map   , arguments ) }
	 exports.map = exports.each = exports.forEach = map

	function reduce() { return _fwdToBuiltinFnList( builtin.reduce, iterable.reduce, arguments ) }
	 exports.reduce = reduce

	function filter() { return _fwdToBuiltinFnList( builtin.filter, iterable.filter, arguments ) }
	 exports.filter = filter

	function all   () { return _fwdToBuiltinFnList( builtin.every , iterable.all   , arguments ) }
	 exports.all = exports.every = all

	function any   () { return _fwdToBuiltinFnList( builtin.some  , iterable.any   , arguments ) }
	 exports.any = exports.some = any

