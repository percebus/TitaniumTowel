Ti.include('/src/code/towel/include.js');
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)
var string   = TT.require(TT.Module.Str)

	var Level = exports.Level = {
			Space    : 1,
			Escape   : 2,
			URI      : 3,
			Component: 4}


	function spaces_encode(x) 
	{
validate.isString( x, 'ASCII.spaces_encode.x is False for isString' ) 
	return string.replace( x, ' ' , '%20' ) 
	}exports.spaces_encode = exports.encodeSpaces = spaces_encode


	function spaces_decode(x) 
	{
validate.isString( x, 'ASCII.spaces_decode.x is False for isString' ) 
	return string.replace( x, '%20', ' ' ) 
	}exports.spaces_decode = exports.decodeSpaces = spaces_decode


	function encode( x, level )
	{ 
validate.isString( x    , 'ASCII.encode.x     is False for isString' )
validate.isInt   ( level, 'ASCII.encode.level is False for isInt'    )
		var level = compare.defaultToValue( level, exports.Level.Space )
		switch(level)
		{
			case exports.Level.Space    : fn = exports.spaces_encode															      ; break
			case exports.Level.Escape   : fn = builtin.escape															          ; break
			case exports.Level.URI      : fn = builtin.encodeURI																  ; break
			case exports.Level.Component: fn = compare.defaultFunction( builtin.encodeURIComponent, Ti.Network.encodeURIComponent); break
		}
	return fn(x) 
	}exports.encode = encode


	function decode( x, level )
	{ 
validate.isString( x    , 'ASCII.decode.x     is False for isString' )
validate.isInt   ( level, 'ASCII.decode.level is False for isInt'    )
		var level = compare.defaultToValue( level, exports.Level.Space )
		switch(level)
		{
			case exports.Level.Space    : fn = exports.spaces_decode															      ; break
			case exports.Level.Escape   : fn = builtin.unescape																      ; break
			case exports.Level.URI      : fn = builtin.decodeURI																  ; break
			case exports.Level.Component: fn = compare.defaultFunction( builtin.decodeURIComponent, Ti.Network.decodeURIComponent); break
		}
	return fn(x) 
	}exports.decode = decode
