var exports = exports || {}
	exports.Console = Ti.API

	var Type = exports.Type = {
			debug: 'debug',
			trace: 'trace',
			error: 'error',
			warn : 'warn',
			test : 'debug',  
			info : 'info'}

	var Level = exports.Level = {
			BuiltIn :    0,
			Compare :    1,
			Validate:    3,
			Sequence:    2,
			Iterable:    4,
			OOP     :    5,
			Variable:  100,
			Ti      : 1000}

	var LEVEL = exports.Level.Variable

	function log( msg, obj, inline, level, type )
	{
		var level = level                 ||    exports.Level.Ti
		var type  =    exports.Type[type] ||    exports.Type.debug
		var fn    = exports.Console[type] || exports.Console.debug
		if ( level < LEVEL )
		{
	return level
		}

		var obj    = obj || ''
		var inline = ( 'boolean' === typeof(inline) ) ? inline : false
			inline = ( '' === msg ) ? true : inline
		var msg    = inline ? msg + ' ' + obj : msg
fn(msg)
		if ( obj && !inline )
		{
fn(obj)
fn('')
		}
// TODO output to some file or somehting
	return level
	}exports.log = log


	function debug( msg, obj, inline, level ) { return exports.log( msg, obj, inline, level, exports.Type.debug ) }
	 exports.debug = debug

	function trace( msg, obj, inline, level ) { return exports.log( msg, obj, inline, level, exports.Type.trace ) }
	 exports.trace = trace

	function error( msg, obj, inline, level ) { return exports.log( msg, obj, inline, level, exports.Type.error ) }
	 exports.error = error

	function warn ( msg, obj, inline, level ) { return exports.log( msg, obj, inline, level, exports.Type.warn ) }
	 exports.warn = warn

	function test ( msg, obj, inline, level ) { return exports.log( msg, obj, inline, level, exports.Type.test ) }
	 exports.test = test

	function info ( msg, obj, inline, level ) { return exports.log( msg, obj, inline, level, exports.Type.info ) }
	 exports.info = info
