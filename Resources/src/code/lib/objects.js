Ti.include('/src/code/lib/include.js')
var compare    = TT.require(TT.Module.Compare)
var validate   = TT.require(TT.Module.Validate)
var sort       = TT.require(TT.Module.Sort)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)


	function ListDictionary(x)
	{
validate.isNothingOrFn( x, compare.isList, 'dict.ListDictionary.x is False for isList' )
		var result = {}
		function _keys() 
		{
			var count = 0 
			dictionary.process( result, 
				function( value, key )
				{
					if ( compare.canBeNumber(key) )
						count++	
				} )
		return count 
		}

		builtin.defineProperty( result, 'value', {
			enumerable  : false,
			configurable: false,
			writable    : false, // TODO ?
			get: function(sorted)
			{
			return compare.defaultBoolean( sorted, false )  ?  
				dictionary.values(  result,  sequence.sort( dictionary.keys(result), sort.number0to9 )  )  :  
				dictionary.values(  result) 
			}
		} )

		builtin.defineProperty( result, 'length', {
			enumerable  : false,
			configurable: false,
			writable    : true,
			value: _keys,
			get  : _keys,
			set: function(n)
			{// if n is > then number of keys, it gets ignored.
				dictionary.process( result, 
					function( value, key )
					{
						if ( compare.canBeNumber(key) )
							if ( builtin.parseInt(key) >= n )
								dictionary.deleteProperty( result, key )
					} )
			} })

		sequence.process( sequence.toList(x), compare.f, result )
	}exports.ListDictionary = ListDictionary
