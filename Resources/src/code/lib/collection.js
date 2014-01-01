Ti.include('/src/code/lib/include.js')
var compare    = TT.require(TT.Module.Compare)
var validate   = TT.require(TT.Module.Validate)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)


	var KeysNames = exports.KeysNames = {
			Default: {key:'key', value:'value'},
			WCF    : {key:'Key', value:'Value'}}


	function pairs(x, order)
	{ // {key:value, key2:value2} >> [(key, value), (key2, value2)]
validate.isDictionary( x, 'collection.pairs.x is False for isDictionary' )
validate.isNothingOrFn( order, compare.isList, 'collection.pairs.order is False for isList' )
	return compare.isList(order) ? 
		  sequence.map( order, function(     key    ) { return [ key, x[key] ] } ) :
		dictionary.map( x    , function( value, key ) { return [ key, x[key] ] })
	}exports.pairs = exports.iteritems = pairs


	function pairsToDict(x)
	{ // [(key1, value1), (key2, value2)] >> {key1:value1, key2:value2}
validate.isList( x, 'collection.pairsToDict.x is False for isList' )
		var result = {}
		sequence.each( x, function(pair) { result[ pair[0] ] = pair[1] } )
	return result
	}exports.pairsToDict = pairsToDict


	function listsToDict(values, names)
	{// [(value1, value2, value3), (key1, key2)] >> {key1:value1, key2:value2}
validate.isList( values, 'collection.listsToDict.values is False for isList' )
validate.isList( names , 'collection.listsToDict.names  is False for isList' )
// TODO check sizes?
		var result = {}
		sequence.each( names, function(name, index) { result[name] = compare.valueByIndex(values, index) } )
	return result
	}exports.listsToDict = listsToDict


	function listToDict(x, d)
	{// http://snook.ca/archives/javascript/testing_for_a_v
validate.isList( x, 'collection.listToDict.list False for isList' ) 
		if ( compare.isList(d) )
		{
	return exports.listsToDict(d, x)
		}
		var result = {}
		sequence.each( x, function(value) { result[value] = compare.defaultParam(d, value) } )
	return result
	}exports.listToDict = listToDict


	function entries( x, keysNames, order )
	{// {key1:value1, key2:value2} >> [{'key':key1, 'value':value1}, {'key':key2, 'value':value2}]
validate.isDictionary ( x, 'collection.entries.x is False for isDictionary' )
validate.isNothingOrFn( keysNames, compare.isDictionary, 'collection.entries.keysNames is False for isDictionary' )
validate.isNothingOrFn( order    , compare.isList      , 'collection.entries.order     is False for isList'       )
		var keysNames = dictionary.defaults( keysNames, exports.KeysNames.Default )
		var k         = compare.defaultList( order, dictionary.keys(x) ) 
		var v         = dictionary.values(x, order)
	return sequence.map( k, 
		function( key, index ) 
		{
			var result = {}
				result[keysNames.key]   = k[index]
				result[keysNames.value] = v[index]
		return  result 
		} )
	}exports.entries = exports.toEntries = entries


	function entriesToDict(x, keysNames)
	{// [{'key':key1, 'value':value1}, {'key':key2, 'value':value2}] >> {key1:value1, key2:value2} 
validate.isList( x, 'collection.entriesToDict.x is False for isList' )
validate.isNothingOrFn( keysNames, compare.isDictionary, 'collection.entriesToDict.keysNames is False for isDictionary' )
		var keysNames = dictionary.defaults( keysNames, exports.KeysNames.Default )	
		var result   = {}
		sequence.each( x, function(obj) { result[ obj[keysNames.key] ] = obj[keysNames.value] } )
	return result
	}exports.entriesToDict = exports.listOfEntriesToDict = entriesToDict
