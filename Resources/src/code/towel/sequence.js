Ti.include('/src/code/towel/include.js');
var compare      = TT.require(TT.Module.Compare);
var validate     = TT.require(TT.Module.Validate);
var suscriptible = TT.require(TT.Module.Suscriptible);
exports.join   = builtin.join;
exports.shift  = builtin.shift;
exports.slice  = builtin.slice;
exports.splice = builtin.splice;
exports.pop    = builtin.pop;
exports.push   = builtin.push;
exports.arguments_get = exports.args = exports.getArguments = builtin.args;
exports.updateAtIndex = suscriptible.update;

	var FIRST = exports.FIRST = 0;

	var Property = exports.Property = {
			sort   : 'sort',
			reverse: 'reverse',
			join   : 'join',
			length_: 'length' };

	var Until = {
			Continue: compare.C.False,
			Break   : compare.C.True };
		Until.Skip = Until.Continue;
exports.Until = Until;


	function toList(x)
	{// Warning, 'string' is returned as ['string'], not as ['s', 't', 'r', 'i', 'n', 'g']
		if ( compare.isNothing(x) )
		{// this way null values give us an empty list
	return []
		}
	return compare.isList(x) ? x : [x] // all other values give us [3], or [oObject] 
	}exports.toList = exports.list = toList


	function toIterable(x) { return compare.isIterable(x) ? x : exports.toList(x) }
	 exports.toIterable = toIterable

	function size(x) { return compare.resolveProperty( x, exports.Property.length_ ) } // x.length or x.length() for dictionaries n,n
	 exports.size = exports.len = size

	function areSameSize( x, y ) { return exports.size(x) == exports.size(y) }
	 exports.areSameSize = areSameSize


	function resize( x, n )
	{
validate.isResizable ( x, 'sequence.resize.x is False for isResizable'  ) // eventhough string and function have length, they are immutable
validate.isZeroOrMore( n, 'sequence.resize.n is False for isZeroOrMore' )
	return suscriptible.set(x, 'length', n)
	}exports.resize = resize


	function clear(x)
	{
validate.isResizable( x, 'sequence.clear.x is False for isResizable'  ) // eventhough string and function have length, they are immutable
	return suscriptible.set(x, 'length', 0)
	}exports.clear = clear


	function append( item, list )
	{ // this is faster than array.push(x)
validate.isNothingOrFn( list, compare.isList, 'sequence.append.list False for isList' )
		var list              = exports.toList(list)
		    list[list.length] = item // we could array[ exports.indexLast(array) +1 ], but since we are not using array.push for performance...
	return  list // I WOULD return the item set, but what if list didn't exist? (reason why we use toList)
	}exports.append = append 


	function insert( item, list )
	{
validate.isNothingOrFn( list, compare.isSequence, 'sequence.append.list False for isSequence' )
		var list = exports.toList(list)
		builtin.unshift( list, [item] )
	return list // I WOULD return the item set, but what if list didn't exist? (reason why we use toList)
	}exports.insert = insert


// ***** index position *****
	function indexFirst(x) { return compare.has_length_some(x) ? 0                  : null }
	 exports.indexFirst = indexFirst

	function indexLast (x) { return compare.has_length_some(x) ? exports.size(x) -1 : null }
	 exports.indexLast = indexLast

	function indexNth( i, list )
	{
validate.isFalse( compare.is0(i), 'sequence.indexNth.i is True for isZero' )
validate.isNothingOrFn( list, compare.isList, 'sequence.indexNth.list is False for isList' )
		if (i > 0) { i-- }
		if ( compare.isSequence(list) )
		{
validate.isIndexInList( i, list, 'sequence.indexNth.i %d is False for a isIndexInList %s' )
		}
	return  i
	}exports.indexNth = exports.positionToIndex = exports.indexOfPosition = indexNth


	function first(x)
	{
validate.isSequence( x, 'sequence.first.x False for isSequence' ) 
	return x[exports.FIRST]
	}exports.first = first

	function last(x) 
	{
validate.isSequence( x, 'sequence.last.x False for isSequence' )		 
	return x[ exports.indexLast(x) ] 
	}exports.last = last

	function nth( x, n )
	{
validate.isSequence( x, 'sequence.last.x False for isSequence' )
validate.isIntInLength( n, x, 'sequence.nth.n is False for isIntInLength' )
	return x[ exports.indexNth( n, x ) ]
	}exports.nth = nth


	function unpack(x) 
	{
validate.isList( x, 'sequence.unpack.x False for isList' )
		var _size = x.length
		if ( compare.is0(_size) )
		{
	return undefined
		}
	return compare.is1(_size) ? exports.first(x) : x 
	}exports.unpack = unpack


	function pack() { return exports.toList( exports.unpack(arguments) ) }
	 exports.pack = pack


	function placeholder(x) 
	{// on an ascending for, it can dramatically boost perf, as the array gets resized only once
validate.isIterable( x, 'sequence.placeholder.x is False for isIterable' ) 
	return compare.isSequence(x) ? new Array( exports.size(x) ) : {}
	}exports.placeholder = placeholder


	function criterion(x)
	{// TODO re-name.
		if ( compare.isUndefined(x) )
		{
	return compare.isNotNothing
		}
	return compare.isRegExp(x) ? 
				function(value) { return builtin.test( value, x ) } : 
				compare.defaultFunction( x, function(value){ return compare.isValue( value, x ) } )
	}exports.criterion = criterion


	function until( x, criteria, ascending, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var criteria   = attributes.criteria
			var ascending  = attributes.ascending
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.until.x is False for isSequence' )
		if (!x.length)
		{
	return null
		}
validate.isNothingOrFn( ascending, compare.isBoolean , 'sequence.until.ascending is False for isBoolean'  )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.until.context   is False for isInstance' )
		var iteration = suscriptible.iterator( x, exports.criterion(criteria), context )
	if (  compare.defaultBoolean( ascending, true )  ) { for ( var i=0, I=x.length -1;  i <= I;  i++ ) if ( iteration(i) ){ return i }}
	else											   { for ( var i=x.length -1, I=0;  i >= I;  i-- ) if ( iteration(i) ){ return i }}
	return null
	}exports.until = until


	function indexMatchFirst( x, criteria, context )
	{
validate.isSequence( x, 'sequence.indexMatchFirst.x False for isSequence' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.indexMatchFirst.context is False for isInstance' )
	return exports.until( x, criteria, true, context )
	}exports.indexMatchFirst = exports.indexOf = indexMatchFirst


	function indexMatchLast( x, criteria, context )
	{
validate.isSequence( x, 'sequence.indexMatchLast.x False for isSequence' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.indexMatchLast.context is False for isInstance' )
	return exports.until( x, criteria, false, context )
	}exports.indexMatchLast = exports.lastIndexOf = indexMatchLast


	function isFirst( x, criteria, context )
	{
validate.isSequence( x, 'sequence.isFirst.x False for isSequence' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.isFirst.context is False for isInstance' )
		var index = exports.indexFirst(x)
	return (   compare.isNumber(index)   &&   compare.areEqual(  index,  exports.indexMatchFirst( x, criteria, context )  )   )
	}exports.isFirst = isFirst


	function isLast( x, criteria, context )
	{
validate.isSequence( x, 'sequence.isLast.x False for isSequence' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.isLast.context is False for isInstance' )
	var index = exports.indexLast(x)
	return (   compare.isNumber(index)   &&   compare.areEqual(  index,  exports.indexMatchLast( x, criteria, context )  )   )
	}exports.isLast = isLast


	function find( x, criteria, ascending, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var criteria   = attributes.criteria
			var ascending  = attributes.ascending
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.firstValid.x is False for isSequence' )
validate.isNothingOrFn( ascending, compare.isBoolean , 'sequence.firstValid.ascending is False for isBoolean'  )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.firstValid.context   is False for isInstance' )
		var i = exports.until( x, criteria, ascending, context )
	return compare.isNumber(i) ? x[i] : undefined 
	}exports.find = exports.firstValid = exports.detect = find


	function any( x, criteria, ascending, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var criteria   = attributes.criteria
			var ascending  = attributes.ascending // possibly to boost perf?
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.any.x is False for isSequence' )
validate.isNothingOrFn( ascending, compare.isBoolean , 'sequence.any.ascending is False for isBoolean'  )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.any.context   is False for isInstance' )
	return compare.isNumber(  exports.until( x, criteria, ascending, context )  )
	}exports.any = exports.some = exports.has = any


	function none( x, criteria, ascending, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var criteria   = attributes.criteria
			var ascending  = attributes.ascending // possibly to boost perf?
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.none.x is False for isSequence' )
validate.isNothingOrFn( ascending, compare.isBoolean , 'sequence.none.ascending is False for isBoolean'  )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.none.context   is False for isInstance' )
	return !exports.any( x, criteria, ascending, context )
	}exports.none = none


	function isAnyOf( x, fn_s ) 
	{// compare for a list of settings
	return exports.any( exports.toList(fn_s), function(fn) { return compare.isTrue( fn(x) ) } ) // instead of just passing 'anything' we ensure the output is an actual boolean (and not truetsy values like an empty list) 
	}exports.isAnyOf = isAnyOf


	function contains( x, item, precision )
	{
validate.isSequence( x, 'sequence.contains.x is False for isSequence' )
	return exports.any( x, function(value){ return compare.isValue( item, value, precision ) } )
	}exports.contains = contains


	function process( x, fn, target, ascending, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var target     = attributes.target
			var ascending  = attributes.ascending
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.process.x is False for isSequence' )
validate.isNothingOrFn( target, compare.isIterable, 'sequence.process.target is False for isIterable' )
		if ( !x.length )
		{
	return compare.isIterable(target) ? target : undefined
		}
validate.isNothingOrFn( fn       , compare.isFunction, 'sequence.process.fn        is False for isFunction' )
validate.isNothingOrFn( ascending, compare.isBoolean , 'sequence.process.ascending is False for isBoolean'  )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.process.context   is False for isInstance' )
		var fn        = compare.defaultFunction(fn)
		var ascending = compare.defaultBoolean( ascending, false ) // TODO ascending if x == target ?
		var iteration = suscriptible.iterator( x, fn, context )
		if ( compare.isIterable(target) )
		{
			if (ascending){ for ( var i=0          , I=x.length -1; i <= I;  i++ ) target[i] = iteration(i) }
			else		  { for ( var i=x.length -1, I=0          ; i >= I;  i-- ) target[i] = iteration(i) }
	return target
		}
		else
		{
			if (ascending){ for ( var i=0          , I=x.length -1; i <= I;  i++ ) iteration(i) }
			else		  { for ( var i=x.length -1, I=0          ; i >= I;  i-- ) iteration(i) }
		}
	// no return
	}exports.process = process


	function ascending( x, fn, target, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var target     = attributes.target
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.ascending.x is False for isSequence' )
validate.isNothingOrFn( fn     , compare.isFunction, 'sequence.ascending.fn      is False for isFunction' )
validate.isNothingOrFn( target , compare.isIterable, 'sequence.ascending.target  is False for isIterable' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.ascending.context is False for isInstance' )
	return exports.process( x, fn, target, true, context )
	}exports.ascending = ascending


	function descending( x, fn, target, context )
	{ // faster than ascending...?
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var target     = attributes.target
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.descending.x is False for isSequence' )
validate.isNothingOrFn( fn     , compare.isFunction, 'sequence.descending.fn      is False for isFunction' )
validate.isNothingOrFn( target , compare.isIterable, 'sequence.descending.target  is False for isIterable' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.descending.context is False for isInstance' )
	return exports.process( x, fn, target, false, context )
	}exports.descending = descending


	function indexes( x, criteria, context )
	{
validate.isSequence( x, 'sequence.indexes.x False for isSequence' )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.indexes.context is False for isInstance' )
		var iteration = suscriptible.iterator( x, exports.criterion(criteria), context )
		var results   = []
		exports.ascending( x, function( value, i ){ if ( iteration(i) ){ exports.append( i, results ) }} )
	return results
	}exports.indexes = indexes


	function positions( x, criteria, context )
	{
validate.isSequence( x, 'sequence.positions.x False for isSequence' )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.positions.context is False for isInstance' )
		var iteration = suscriptible.iterator( x, exports.criterion(criteria), context )
		var results   = []
		exports.ascending( x, function( value, i ){ if ( iteration(i) ){ exports.append( i +1, results ) }} )
	return results
	}exports.positions = positions


	function judge( x, criteria, context ) 
	{
validate.isSequence( x, 'sequence.judge.x is False for isSequence' )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.judge.context is False for isInstance' )
		var iteration = suscriptible.iterator( x, exports.criterion(criteria), context )
		var results   = {passed:[], failed:[]}
		exports.ascending( x, 
			function( value, i )
			{ 
				if ( iteration(i) ) { exports.append( value, results.passed ) }
				else 			    { exports.append( value, results.failed ) }
			})
	return results
	}exports.judge = judge


	function filter( x, criteria, context )
	{
validate.isSequence( x, 'sequence.filter.x False for isSequence' )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.filter.context is False for isInstance' )
		var iteration = suscriptible.iterator( x, exports.criterion(criteria), context )
		var results   = []
		exports.ascending( x, function( value, i ) { if ( iteration(i) ) { exports.append( value, results ) }})
	return results
	}exports.filter = filter


	function reject( x, criteria, context )
	{
validate.isSequence( x, 'sequence.reject.x False for isSequence' )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.reject.context is False for isInstance' )
		var iteration = suscriptible.iterator( x, exports.criterion(criteria), context )
		var results   = []
		exports.ascending( x, function( value, i ) { if (! iteration(i) ) { exports.append( value, results ) }})
	return results
	}exports.reject = reject


	function all( x, criteria, context )
	{
validate.isSequence( x, 'sequence.all.x False for isSequence' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.all.context is False for isInstance' )
	return exports.areSameSize(  x,  exports.filter( x, criteria, context )  )
	}exports.all = exports.every = all


	function ensure( item_s, list, precision ) 
	{
validate.isSequence( list, 'sequence.ensure.list is False for isSequence' )
		exports.process( 
			exports.toList(item_s), 
			function(item) { if( !exports.contains( list, item, precision ) ) { exports.append( item, list ) } }, 
			null, 
			true )
	return list 
	}exports.ensure = exports.appendOnce = ensure


	function extend( x, item_s, precision )
	{
validate.isSequence( x, 'sequence.ensure.x is False for isSequence' )
		exports.process( 
			exports.toList(item_s), 
			function(item) { exports.append( item, x ) }, 
			null, 
			true )
	return x 
	}exports.extend = extend


	function unique( x, useExact )
	{ 
validate.isSequence( x, 'sequence.unique.x False for isSequence' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'sequence.unique.useExact is False for isBoolean' )
	return exports.ensure( x, [], useExact )
	}exports.unique = exports.uniq = unique


	function select( x, item_s, useExact )
	{
validate.isIterable( x, 'sequence.select.x is False for isIterable' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'sequence.select.useExact is False for isBoolean' )
	return exports.filter( x, function(value){ return exports.contains( exports.toList(item_s), value, useExact ) } )
	}exports.select = exports.containsFilter = select


	function without( x, item_s, useExact )
	{
validate.isIterable( x, 'sequence.without.x is False for isIterable' )
validate.isNothingOrFn( useExact, compare.isBoolean, 'sequence.without.useExact is False for isBoolean' )
	return exports.reject( x, function(value){ return exports.contains( exports.toList(item_s), value, useExact ) } )
	}exports.without = exports.containsReject = without


	function parse( x, fn, target, context ) 
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var target     = attributes.target
			var context    = attributes.context
		}
validate.isSequence( x, 'sequence.parse.x is False for isSequence' )
validate.isNothingOrFn( fn     , compare.isFunction, 'sequence.parse.fn      is False for isFunction' )
validate.isNothingOrFn( target , compare.isIterable, 'sequence.parse.target  is False for isIterable' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.parse.context is False for isInstance' )
	return exports.process( x, fn, exports.toIterable(target), null, context )
	}exports.parse = parse


	function each( x, fn, ascending, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var ascending  = attributes.ascending
			var context    = attributes.context
		}
validate.isSequence( x , 'sequence.each.x  is False for isSequence' )
validate.isFunction( fn, 'sequence.each.fn is False for isFunction' )
validate.isNothingOrFn( ascending, compare.isBoolean , 'sequence.each.ascending is False for isBoolean'  )
validate.isNothingOrFn( context  , compare.isInstance, 'sequence.each.context   is False for isInstance' )
	return exports.process( x, fn, null, compare.defaultBoolean( ascending, true ), context ) // exports.ascending( x, fn, null, context )
	}exports.each = each


	function map( x, fn, context )
	{// outputs a new list with processed results
validate.isSequence( x , 'sequence.map.x  is False for isSequence' )
validate.isFunction( fn, 'sequence.map.fn is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.map.context is False for isInstance' )
	return exports.process( x, fn, exports.placeholder(x), true, context ) // exports.ascending( x, fn, exports.placeholder(x), context )
	}exports.map = map


	function flatten(x)
	{
validate.isSequence( x, 'sequence.flatten.x is False for isSequence' )
		var results = []
		function recursive(list)
		{
			exports.ascending( list, function( value, index, obj )
			{
				if ( compare.canRecursive( obj, index ) ) {      recursive( value )			 }
				else									  { exports.append( value, results ) }
			} )	
		}recursive(x)
	return results
	}exports.flatten = flatten


	function update( x, fn, context )
	{
validate.isSequence( x , 'sequence.update.x  is False for isSequence' )
validate.isFunction( fn, 'sequence.update.fn is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'sequence.update.context is False for isInstance' )
	return exports.process( x, fn, x, null, context ) // parse( x, fn, x, context )
	}exports.update = update


	function copy(x)
	{
validate.isSequence( x, 'sequence.copy.x is False for isSequence' )
	return exports.process( x, compare.f, [] ) // parse( x, identity, [] )
	}exports.copy = copy


	function concat() // list of lists
	{ // concat( [1, 2, 3], [4, 5], [6, 7, 8] ) >> [1, 2, 3, 4, 5, 6, 7, 8]
		var result = []
		exports.process( arguments, function(list) { result = builtin.concat( result, exports.toList(list) ) }, null, true )
	return result
	}exports.concat = concat


	function times( n, fn, context )
	{
validate.isZeroOrMore( n , 'sequence.times.n  is False for isZeroOrMore' )
validate.isFunction  ( fn, 'sequence.times.fn is False for isFunction' ) 
	return exports.map( new Array(n),  function( value, index ) { return fn(index) }, context  )
	}exports.times = times


	function listToArray( x, forceCopy ) 
	{ // ensures the output is an array
validate.isSequence( x, 'sequence.listToArray.x is False for isSequence' )
validate.isNothingOrFn( forceCopy, compare.isBoolean, 'sequence.listToArray.forceCopy is False for isBoolean' )
	return (  !compare.defaultBoolean( forceCopy, false )  &&  compare.isArray(x)  )  ?  x  :  exports.copy(x)
	}exports.listToArray = exports.sequenceToArray = listToArray

	function toArray(x) { return exports.listToArray( exports.toList(x) ) }
	 exports.toArray = exports.array = toArray


	function argumentsToArray(args)
	{// only used when specifically need Arguments methods or using apply, otherwise use unpack
validate.isList( args, 'sequence.argumentsToArray.args is False for isList' )
	return exports.toArray( exports.unpack(args) )
	}exports.argumentsToArray = argumentsToArray


	function removeAtIndex( x, i, n )
	{ // delete x[0] only removes the value, but not the reference TODO don't know if you can remove items from Arguments
validate.isSequence( x, 'sequence.removeAtIndex.x is False for isSequence' )
validate.isIndexInList( i, x, 'sequence.removeAtIndex.i is False for isIndexInList %d @ %s'  )
validate.isNothingOrFn( n, function() { return compare.isIntInLength( n, x ) }, 'sequence.removeAtIndex.n is False for isIntInLength' )
	return exports.unpack(  builtin.splice(  x,  i,  compare.defaultToValue( n, 1 )  )  )
	}exports.removeAtIndex = removeAtIndex


	function removeAtNth( x, i, n )
	{
validate.isSequence( x, 'sequence.removeAtNth.x is False for isSequence' )
validate.isNothingOrFn( n, function() { return compare.isIntInLength( n, x ) }, 'sequence.removeAtNth.n is False for isIntInLength' )
	return exports.removeAtIndex( x, exports.indexNth( i, x ), n )		
	}exports.removeAtNth = removeAtNth


	function removeFromLeft( x, n )
	{
validate.isSequence( x , 'sequence.removeFromLeft.x  is False for isSequence' )
validate.isIntInLength( n, x, 'sequence.removeFromLeft.n is False for isIntInLength' )
	return builtin.slice( x, n )
	}exports.removeFromLeft = removeFromLeft


	function removeFromRight( x, n )
	{
validate.isSequence( x , 'sequence.removeFromRight.x  is False for isSequence' )
validate.isIntInLength( n, x, 'sequence.removeFromRight.n is False for isIntInLength' )
	return builtin.slice( x, exports.FIRST, x.length -n )
	}exports.removeFromRight = removeFromRight


	function left( x, n )
	{
validate.isSequence( x, 'sequence.left.x  is False for isSequence' )
validate.isIntInLength( n, x, 'sequence.left.n is False for isIntInLength' )
exports.resize( x, n )
	return x 
	}exports.left = left


	function right( x, n )
	{
validate.isSequence( x, 'sequence.left.x  is False for isSequence' )
validate.isIntInLength( n, x, 'sequence.right.n is False for isIntInLength' )
	return exports.removeFromLeft( x, x.length-n ) 		
	}exports.right = right


	function rest(x)
	{
validate.isSequence( x, 'sequence.rest.x is False for isSequence' )
	return exports.removeFromLeft( x, 1 )
	}exports.rest = rest


	function reverse() { return builtin.reverse( exports.argumentsToArray(arguments) ) }
	 exports.reverse = reverse


	function sort( x, fn )
	{
validate.isSequence( x, 'sequence.sort.x is False for isSequence' )
validate.isNothingOrFn( fn, compare.isFunction, 'sequence.sort.fn is False for isFunction' )
	return builtin.sort( x, fn )
	}exports.sort = exports.sorted = sort


	function intersection(list1)/*args*/
	{
		var rest = exports.rest( exports.copy(arguments) )
	return exports.reject( exports.first(arguments), 
			function(value)
			{
			return compare.isInt(  exports.until( rest, function(list) { return !exports.contains( list, value ) } )  )
			} )
	}exports.intersection = intersection


	function tuple() // args
	{
validate.isSequence( x, 'sequence.tuple.x is False for isSequence' )
		var output = exports.argumentsToArray(arguments) // both work: tuple(1, 2, 3) or tuple([1, 2, 3])
builtin.preventExtensions(output)
	return output
	}exports.tuple = tuple


	function Tuple() { return exports.tuple(arguments) }
	 exports.Tuple = Tuple
