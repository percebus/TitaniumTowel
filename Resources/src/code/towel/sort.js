Ti.include('/src/code/towel/include.js');
var compare  = TT.require(TT.Module.Compare);
var validate = TT.require(TT.Module.Validate);
var sequence = TT.require(TT.Module.Sequence);

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort

exports.alphaNumeric = null; // default


	function place( item, list, start, end, fn, context ) // 'place' of 'item' in 'list'
	{ // http://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
validate.isSequence( list, 'sort.place.list is False for isSequence' )
		function isIndexInList(x) { return compare.isIndexInList(x, list) }
validate.isNothingOrFn( start, isIndexInList, 'sort.place.start is False for isIndexInList' )
validate.isNothingOrFn( end  , isIndexInList, 'sort.place.end   is False for isIndexInList' )
validate.isNothingOrFn( fn, compare.isFunction, 'sort.place.fn is False for isFunction' )
		var start     = compare.defaultNumber( start, sequence.indexFirst(list) )
		var end       = compare.defaultNumber( end  , sequence.indexLast (list) )
		var index     = builtin.parseInt(  start  +  ( (end - start) / 2  )  )
		var fn        = compare.defaultFunction( fn, function(value){ return item == value } )
		var iteration = suscriptible.iterator( list, fn, context )
		if (  ( (end-start) <= 1 )  ||  iteration(index)  )
		{ 
	return index
		}
	// implicit else
		var from = start
		var to   = end
		if ( list[index] < item ) { from = index }
		else					  { to   = index }
	return exports.place( item, list, from, to, fn, context )
	}exports.place = place


	function heap( item, list, low, high )
	{
validate.isSequence( list, 'sort.heap.list is False for isSequence' )
		function isIndexInList(x) { return compare.isIndexInList(x, list) }
validate.isNothingOrFn( start, isIndexInList, 'sort.heap.start is False for isIndexInList' )
validate.isNothingOrFn( end  , isIndexInList, 'sort.heap.end   is False for isIndexInList' )
		var low   = compare.defaultNumber( low  , sequence.indexFirst(list) )
		var high  = compare.defaultNumber( high , sequence.indexLast (list)   )
		while( low <= high )
		{
			var  mid = (low + high) >>> 1 // binary comparison, say WHAAA?
			if ( list[mid] < item ) { low  = mid +1 }
			else				    { high = mid    }
		}
	return low
	}exports.heap = heap


// sorters
	function bool( x, fn )
	{ 
		var fn = compare.defaultFunction( fn, compare.itsFalse )
		if ( fn(x) )
		{// If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other,
		 // but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee this behaviour, 
		 // and thus not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this.
	return 0
		} 
	return !!x ? 1 : -1
	}exports.bool = bool


	function number0to9( a, b ) { return builtin.parseFloat(a) - builtin.parseFloat(b) }
	 exports.numnber0to9 = exports.numberAscending = number0to9

	function number9to0( a, b ) { return builtin.parseFloat(b) - builtin.parseFloat(a) }
	 exports.number9to0 = exports.numberDescending = number9to0

	function encoding  ( a, b ) { return exports.bool( a.localeCompare(b) ) } // TODO localeCompare to builtin
	 exports.encoding = encoding
