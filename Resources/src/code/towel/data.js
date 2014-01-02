Ti.include('/src/code/towel/include.js');
var compare    = TT.require(TT.Module.Compare)
var validate   = TT.require(TT.Module.Validate)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var collection = TT.require(TT.Module.Collection)
var iterable   = TT.require(TT.Module.Iterable)
var string     = TT.require(TT.Module.Str)
var regExp     = TT.require(TT.Module.RegEx)

exports.rename = dictionary.rename


	function key_get( obj, key ) 
	{ // key( {Name: 'John', name:'Johnny'}, 'name' )  >>  ['Name', 'name']
validate.isInstance( obj, 'data.key_get.obj is False for isInstance' )
		var oRegExp = new RegExp( regExp.ensureIs( string.toString(key) ), 'i' )
	return sequence.unpack(  iterable.filter( obj, function( value, k ) { return matches( oRegExp, k ) } )  ) 
	}exports.key_get = key_get


	function entriesToDict_WCF(x)
	{// {Key: keyName, Value: value}, {Key: keyName2, Value: value2} >> {keyName: value, keyName2: value2}
validate.isList( x, 'data.entriesToDict_WCF.x is False for isList' ) 
	return collection.entriesToDict( x, collection.KeysNames.WCF ) 
	}exports.entriesToDict_WCF = exports.listOfWCFEntriesToDict = entriesToDict_WCF


	function pluralize( x, n, plural )
	{
validate.isSomeString( x, 'data.pluralize.x is False for isSomeString' )
validate.isNumber    ( n, 'data.pluralize.n is False for isNumber'     )
validate.isNothingOrFn( plural, compare.isSomeString, 'data.pluralize.plural is False for isSomeString' )
		var plural = compare.isString(plural) ? plural : string.ensureEndsWith( x, 's' )
	return ( n > 1 ) ? plural : x // string.ensureEndsWithout( x, 's' )
	}exports.pluralize = pluralize


	function ordinal(n) // NOTE: this piece of code is simply AWESOME!!! 
	{ // http://ecommerce.shopify.com/c/ecommerce-design/t/ordinal-number-in-javascript-1st-2nd-3rd-4th-29259
	   var s=["th","st","nd","rd"],
	       v=n%100;
	   return ( s[(v-20)%10] || s[v] || s[0] ); // NOTE: removed the number, so I can have them separetely
	}exports.ordinal = ordinal


	function where( x, where_s, useExact )
	{// TODO under construction
		var results = []
	return sequence.filter( sequence.toList(x), 
		function(record)
		{
			var OR = false
			sequence.each( sequence.toList(where_s), 
				function(ANDs)
				{
					var AND = true
					dictionary.each( ANDs, 
						function( value, field )
						{
							
						} )
				} )
		} )
	}exports.where = where
