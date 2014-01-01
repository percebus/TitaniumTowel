Ti.include('/src/code/lib/include.js')
var cast         = TT.require(TT.Module.Cast)
var compare      = TT.require(TT.Module.Compare)
var validate     = TT.require(TT.Module.Validate)
var suscriptible = TT.require(TT.Module.Suscriptible)
var sequence     = TT.require(TT.Module.Sequence)
var dict         = TT.require(TT.Module.Dictionary)
var collection   = TT.require(TT.Module.Collection)


exports.min = builtin.min
exports.max = builtin.max

exports.valueByProperty  = exports.getattr = compare.valueByProperty
exports.valueByKey   = compare.valueByKey
exports.valueByIndex = compare.valueByIndex
exports.valueByItem  = compare.valueByItem

exports.toList = exports.list = sequence.toList
exports.pack = sequence.pack
exports.toIterable = sequence.toIterable
exports.list_size = exports.sizeOfList = sequence.size
exports.indexFirst = sequence.indexFirst
exports.indexLast = sequence.indexLast
exports.first = sequence.first
exports.last = sequence.last
exports.unpack = sequence.unpack
exports.copyList = exports.list_copy = sequence.copy
exports.listToArray = sequence.listToArray
exports.toArray = exports.array = sequence.toArray
exports.argumentsToArray = sequence.argumentsToArray
exports.indexNth = exports.positionToIndex = sequence.indexNth
exports.nth = sequence.nth
exports.removeAtIndex = sequence.removeAtIndex
exports.removeAtNth = sequence.removeAtNth
exports.removeFromLeft = sequence.removeFromLeft
exports.removeFromRight = sequence.removeFromRight
exports.pop = sequence.pop
exports.resize = sequence.resize
exports.times = sequence.times
exports.clearList = sequence.clear
exports.left = sequence.left
exports.right = sequence.right
exports.append = sequence.append
exports.insert = sequence.insert
exports.reverse = sequence.reverse
exports.firstValid = exports.find = exports.detect = sequence.firstValid 
exports.concat = sequence.concat
exports.flatten = sequence.flatten
exports.select = sequence.select
exports.without = sequence.without
exports.contains = sequence.contains
exports.ensure = exports.appendOnce = sequence.ensure
exports.unique = exports.uniq = sequence.unique
exports.isAnyOf = sequence.isAnyOf

exports.get = dict.get
exports.set = dict.set
exports.iteration = dict.iteration
exports.key_get = exports.key = exports.getKey = dict.key_get
exports.deleteProperty = exports.property_delete = dict.deleteProperty
exports.Scope = dict.Scope
exports.API   = dict.API
exports.traverse = dict.traverse
exports.expose = dict.expose
exports.traverseByScope = dict.process
exports.inspect = dict.inspect
exports.dictionary_default = exports.defaultDictionary = dict.defaultTo
exports.dictionary_update = exports.extend = dict.update
exports.dictionary_updateByFields = dict.updateByFields
exports.copyObject = exports.object_copy = dict.copy
exports.keys = dict.keys
exports.traits = dict.traits
exports.enumerate = dict.enumerate
exports.self = dict.self
exports.own = exports.getOwnPropertyNames = dict.own
exports.dir = exports.describe = exports.getAllPropertyNames = dict.dir
exports.properties = exports.indexes = exports.dir = dict.properties
exports.methods = dict.methods
exports.sizeOfObject = exports.object_size = dict.sizeOfObject
exports.sizeOfDictionary = exports.dictionaryS_sze = dict.sizeOfDictionary
exports.deleteKey = exports.key_delete = dict.deleteKey
exports.deleteTrait = exports.trait_delete = dict.deleteTrait
exports.deleteProperties = exports.properties_delete = dict.deleteProperties
exports.deleteKeys = exports.keys_delete = dict.deleteKeys
exports.deleteTraits = exports.traits_delete = dict.deleteTraits

exports.KeysNames = collection.KeysNames
exports.pairs = exports.iteritems = collection.pairs
exports.pairsToDict = collection.pairsToDict
exports.listsToDict = collection.listsToDict
exports.listToDict = collection.listToDict
exports.entries = exports.toEntries = collection.entries
exports.entriesToDict = exports.listOfEntriesToDict = collection.entriesToDict


	var BREAK = exports.BREAK = {} // this idea is GENIUS! thanks _underscore!!


	function values( x, order )
	{
	return compare.isList(x) ? x : dict.values( x, order )
	}exports.values = values


	function process( x, fn, result, options, context )
	{
validate.isIterable( x, 'iterable.process.x is False for isIterable' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.process.fn is False for isFunction' )
validate.isNothingOrFn( result , compare.isIterable, 'iterable.process.result  is False for isIterable' )
validate.isNothingOrFn( context, compare.isInstance, 'iterable.process.context is False for isInstance' )
		var iterable = exports.toIterable(x)
		var options  = dict.update( options, {
				sequence  : compare.defaultBoolean( option, true ),
				dictionary: compare.defaultNumber ( option, dict.Scope.Keys )} )
	return compare.isSequence(x) ? 
		sequence.process( x, fn, result, options.sequence  , context ) : // option is a boolean. result can be either list or dict
		    dict.process( x, fn, result, options.dictionary, context )   // option is a int    . result must be dict
	}exports.process = process


	function until( x, fn, context )//, args
	{
validate.isFunction( fn, 'iterable.until.fn is False for isFunction' )
		var iterable  = sequence.toIterable(x)
		var iteration = suscriptible.iterator( iterable, fn, context )

		if ( compare.isSequence(iterable) )
		{
			for ( var i=0, I=iterable.length;  i<I;  i++ )
				if ( iteration(i) )
				{ // since BREAK is an object, === will test it against THAT reference, sw33t!
	return i
				}
		}
		else
		{
			for ( property in iterable )
				if ( iteration(property) )
				{
	return property
				}
		}
	return undefined
	}exports.until = until


	function each( x, fn, context )
	{
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.each.fn is False for isFunction' )
		var results   = []
		var iterable  = sequence.toIterable(x)
		var iteration = suscriptible.iterator( iterable, fn, context )
		if ( compare.isSequence(iterable) ) { for ( var i=0, I=iterable.length;  i<I;  i++ ) { iteration(i)        }}
		else 								{ for ( property in iterable ) 					 { iteration(property) }}		
	}exports.each = exports.forEach = each


	function map( x, fn, context )
	{ // TODO since we don't want one 'if' for every item, we repeat 'each' but w/o the ifs
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.map.fn is False for isFunction' )
		var results   = []
		var iterable  = sequence.toIterable(x)
		var iteration = suscriptible.iterator( iterable, fn, context )
		if ( compare.isSequence(iterable) ) { for ( var i=0, I=iterable.length;  i<I;  i++ ) { sequence.append( iteration(i)       , results ) } }
		else 								{ for ( property in iterable ) 					 { sequence.append( iteration(property), results ) } }
	return results
	}exports.map = map


	function update( x, fn, context )
	{
validate.isFunction( fn, compare.isFunction, 'iterable.update.fn is False for isFunction' )
	if ( compare.isNothing (x) ) { return null }
	if ( compare.isSequence(x) ) { return sequence.update( x, fn, context ) }
	if ( compare.isInstance(x) ) { return      dict.parse( x, fn, context ) }
								   return x
	}exports.update = update


	function reduce( x, initialValue, fn )
	{
validate.isIterable  ( x           , 'iterable.reduce.x            is False for isIterable' )
validate.isNotNothing( initialValue, 'iterable.reduce.initialValue is False for exists'     )
validate.isFunction  ( fn          , 'iterable.reduce.fn           is False for isFunction' )
		var result = compare.defaultToValue( initialValue, 0 )
		exports.map( x, function( value, index, obj ){ result = fn( result, value, index, obj ) } )
	return result
	}exports.reduce = reduce


	function sumarize( x, type )
	{
validate.isIterable( x, 'iterable.sumarize.x is False for isIterable' )
validate.isNothingOrFn( type, compare.isString, 'iterable.sumarize.type is False for isString' )
		var result = compare.isString( compare.defaultToValue( type, compare.Type.Str ) ) ? '' : 0
	return exports.reduce( x, result, function( result, value ) { return result + value } )
	}exports.sumarize = sumarize


	function filter( x, fn )
	{
validate.isIterable( x, 'iterable.filter.x is False for isIterable' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.filter.fn is False for isFunction' )
		var fn      = compare.defaultFunction( fn, compare.isNotNothing )
		var results = []
		exports.each( x, 
			function( value, index, obj )
			{// map functions structure
				if ( fn( value, index, obj ) ) // should be a fn that returns true!
					sequence.append( value, results )
			} )
	return  results 
	}exports.filter = filter


	function reject( x, fn )
	{
validate.isIterable( x, 'iterable.reject.x is False for isIterable' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.reject.fn is False for isFunction' )
		var fn = compare.defaultFunction( fn, compare.isNotNothing )
	return exports.filter( x, function(x){ return !compare.defaultBoolean( fn(x), false ) } )
	}exports.reject = reject


	function judge( x, fn ) 
	{
validate.isIterable( x, 'iterable.reject.x is False for isIterable' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.judge.fn is False for isFunction' )
	return {passed:exports.filter( x, fn ),  failed:exports.reject( x, fn )} 
	}exports.judge = judge



// ***** size *****
	function size(x)
	{
	if ( compare.has_length  (x) ) return sequence.size(x) // including functions
	if ( compare.isDictionary(x) ) return     dict.size( x, dict.Scope.Keys )
	if ( compare.isInstance  (x) ) return     dict.size( x, dict.Scope.All  )
							 	   return null
	}exports.size = exports.len = size


	function areSizesSame( x, y )
	{
validate.isIterable( x, 'iterable.size.x is False for isIterable' )
validate.isIterable( y, 'iterable.size.y is False for isIterable' )
	return compare.areEqual( exports.size(x), exports.size(y) )
	}exports.areSizesSame = areSizesSame



	function any( x, fn ) 
	{
validate.isIterable( x, 'iterable.any.x is False for isIterable' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.any.fn is False for isFunction' )
		var fn = compare.defaultFunction( fn, compare.isNotNothing )
	return !compare.isUndefined(  exports.until( x, function( value, i, obj ) { return fn(value) } )  ) 
	}exports.any = exports.some = any


	function all( x, fn )
	{
validate.isIterable( x, 'iterable.all.list is False for isList' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.all.fn is False for isFunction' ) 
	return exports.areSizeSame( x, exports.filter( x, fn )  )
	}exports.all = all


	function none( list, fn )
	{
validate.isList( list, 'iterable.none.list is False for isList' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.none.fn is False for isFunction' ) 
	return !exports.any( list, fn ) 
	}exports.none = none


	function pick( x, item_s, useExact )
	{
validate.isIterable( x, 'iterable.pick.x is False for isIterable' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.pick.useExact is False for isBoolean' )
		var items = sequence.toList(item_s)
		if ( compare.isSequence(x) )
		{
	return sequence.select( x, items, useExact )
		}
	// implicit else
		var newDict = {}
		var k = sequence.select( dict.properties(x), items, false ) // all keys get parsed to string
		sequence.each( k, function(key){ newDict[key] = x[key] } )
	return newDict
	}exports.pick = pick


	function omit( x, item_s, useExact )
	{
validate.isIterable( x, 'iterable.ommit.x is False for isIterable' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.ommit.useExact is False for isBoolean' )
		var items = sequence.toList(item_s)
		if ( compare.isSequence(x) )
		{
	return sequence.without( x, items, useExact )
		}
	// implicit else
		var newDict = {}
		var k = sequence.without( dict.properties(x), items, false )
		exports.each( k, function(key){ newDict[key] = x[key] } )
	return newDict
	}exports.omit = exports.ommit = omit


	function subset( x, fn ) 
	{// Like filter, but it returns a dictionary if a dictionary is given
validate.isIterable( x, 'iterable.subset.x is False for isIterable' )
validate.isNothingOrFn( fn, compare.isFunction, 'iterable.subset.x is False for isFunction' )
		var fn = compare.defaultFunction( fn, compare.isNotNothing )
		if ( compare.isSequence(x) )
		{
	return exports.filter( x, fn )
		}
		var newDict = {}
		exports.each( x, 
			function( value, i )
			{
				if ( fn(value) )
					newDict[i] = value
			} )
	return newDict
	}exports.subset = subset


	function clean( x, useExact )
	{
validate.isIterable( x, 'iterable.clean.x is False for isIterable' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.clean.x is False for isBoolean' )
	return exports.subset( x, function(x){ return compare.isNotNothing( x, useExact ) } )
	}exports.clean = clean


	function relevant( x, useExact )
	{
		var cleaned = exports.clean( x, useExact )
		dict.each({
			object: cleaned,
			scope : dict.Scope.Keys, 
			callback: function( value, i )
			{
				if ( compare.canRecursive( cleaned, i ) )
				{
cleaned[i] = relevant( value, useExact )
				}
			}})
	return cleaned
	}exports.relevant = relevant



// ***** delete-ers *****
	function deleteItem( x, item )
	{
validate.isIterable( x, 'iterable.deleteItem.x is False for isIterable' )
	     if ( compare.isSequence(x) ) { 	sequence.removeAtIndex( x, item ) }
	else if ( compare.isInstance(x) ) { return dict.deleteProperty( x, item ) }
	// no return
	}exports.deleteItem = exports.item_delete = deleteItem


	function deleteItems( x, scope ) 
	{
	if ( compare.isList      (x) ) { return sequence.clear(x)  }
	if ( compare.isDictionary(x) ) { return dict.deleteKeys(x) }
	if ( compare.isInstance  (x) ) { return dict.deleteProperties(x, scope) } // TODO test new String/Boolean/Number and so on
	}exports.deleteItems = exports.clear = deleteItems


// ***** copy *****
	function copy(x)
	{
validate.isIterable( x, 'iterable.copy.x is False for isDictionary or isInstance' )
	return compare.isList(x) ? sequence.copy(x) : dict.copy(x)
	}exports.copy = copy

/*
	function sort( x, fn )
	{// TODO WTF
		var fn = compare.defaultFunction( fn, compare.executeMethod( x, 'sort' ) )
		var index = {}
		exports.each( x, function( obj, idx ) { index[idx] = fn( obj, idx ) } )
	}exports.sort = exports.sortBy = sort
*/


// ************************************************************************************
// XXX the below is DEPRECATED
// ************************************************************************************


// **** groups *****
	function listDifference( x, y )
	{/// XXX delete all this
validate.isList( x, 'iterable.listDifference.x False for isList' )
validate.isList( y, 'iterable.listDifference.y False for isList' )
		var a       = exports.listToArray(x)
		var b       = exports.listToArray(y)
		var results = [] 
		function inspect( x, y ){ return exports.filter( x, function(value) { return !( builtin.indexOf( y, value ) > -1 ) } ) }
		results = builtin.concat.call( results, inspect( a, b ) )
		results = builtin.concat.call( results, inspect( b, a ) )
	return results 
	}exports.listDifference = listDifference



// ***** searches *****
	function isListInList( a, b, useExact )
	{
validate.isList( a, 'iterable.isListInList.a is False for isList' )
validate.isList( b, 'iterable.isListInList.b is False for isList' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.isListInList.useExact is False for isBoolean' )
		if ( compare.isSame( a, b, useExact ) )
		{// this is only if "both" lists are the same object
	return true
		}

		for ( var i = 0, l = exports.listSize(a);
		          i   <  l;
		          i++ )
			if ( !exports.contains( b, a[i], useExact ) )
			{
	return false
			}
	return true
	}exports.isListInList = isListInList


	function areListsEqual( a, b, sort, useExact )
	{
validate.isList( a, 'iterable.areListsEqual.a is False for isList' )
validate.isList( b, 'iterable.areListsEqual.b is False for isList' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.areListsEqual.useExact is False for isBoolean' )
		if ( compare.isSame( a, b, useExact ) )
		{// this is only if "both" lists are the same object
	return true
		}

		if ( !compare.areEqual( exports.listSize(a), exports.listSize(b) ) )
		{
	return false
		}

		var x    = exports.listCopy(a)
		var y    = exports.listCopy(b)
		var sort = compare.defaultBoolean( sort, true )
		if ( compare.isTrue(sort) )
		{// otherwise [2, 3, 1] won't be the same as [1, 2, 3]
			x.sort()
			y.sort()
		}

		for ( var i = 0, l = exports.listSize(x);  
			      i   <  l;
			      i++ )
			if (  !compare.areEqual( x[i], y[i], useExact )  )
			{// it will break at 1st mistake
	return false
			}
	return true
	}exports.areListsEqual = areListsEqual


	function isDictInDict( a, b, useExact )
	{
validate.isDictionary( a, 'iterable.isDictInDict.a is False for isDictionary' )
validate.isDictionary( b, 'iterable.isDictInDict.b is False for isDictionary' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.isDictInDict.useExact is False for isBoolean' )
		if ( compare.isSame( a, b, useExact ) )
		{// are they the same object?
	return true
		}

		for ( key in a )
			if ( compare.hasKey( a, key ) )
				if ( !compare.areEqual( a[key], b[key], useExact ) )
				{// do keys contain the same values?
	return false
				}
	return true
	}exports.isDictInDict = isDictInDict


	function areDictionariesEqual( a, b, useExact ) 
	{ // after we've checked that a is a sub dictionary of b, we just check they have the same keys
validate.isDictionary( a, 'iterable.areDictionariesEqual.a is False for isDictionary' )
validate.isDictionary( b, 'iterable.areDictionariesEqual.b is False for isDictionary' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'iterable.areDictionariesEqual.useExact is False for isBoolean' )
	return exports.isDictInDict( a, b, useExact ) ? exports.areListsEqual( exports.keys(a), exports.keys(b), true, useExact ) : false 
	}exports.areDictionariesEqual = areDictionariesEqual

