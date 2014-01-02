Ti.include('/src/code/towel/include.js');
var iterable = TT.require(TT.Module.Iterable);
var str      = TT.require(TT.Module.Str);
var regExp   = TT.require(TT.Module.RegEx);
var dateTime = TT.require(TT.Module.DateTime);
var variable = TT.require(TT.Module.Var);
var assert   = TT.require(TT.Module.Assert);


	function toString(x)
	{
assert.isJSONable( x, 'json.toString.x is false for isJSONable' )
	return builtin.JSON.stringify(x)
	}exports.toString = exports.stringify = toString


	function fix(x) 
	{
		function fixDate(string) { return variable.isJSONstringDate(string) ? variable.defaultToValue( dateTime.stringToDate(string), string ) : string }
		function fixAll (item)   { return fixDate(item) }

		if ( variable.isCollection(x) )
		{
			iterable.each( x, 
				function( item, key, x )
				{
					x[key] = fixAll(item)
					if ( variable.canRecursive( x, key ) )
						exports.fix(item) // inception
				} )
		}
	return fixAll(x)
	}exports.fix = fix


	function toObject( x, doFix )
	{
assert.isJSONstring( x, 'json.toObject.x is false for isJSONstring' )
assert.isNothingOrFn( doFix, variable.isBoolean, 'json.toObject.doFix is false for isBoolean' )

		var oJSON = builtin.JSON.parse(x)
		if ( variable.defaultBoolean( doFix, true ) )
			oJSON = exports.fix(oJSON) 
// debug.log( 'JSON.toObject', oJSON )
	return oJSON
	}exports.toObject = exports.parse = toObject


	function defaultToJSON( x, doFix ) { return variable.isJSONable(x) ? exports.toObject( x, doFix ) : x }
	 exports.defaultToJSON = defaultToJSON
