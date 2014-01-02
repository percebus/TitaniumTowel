Ti.include('/src/code/towel/include.js');
var compare      = TT.require(TT.Module.Compare);
var validate     = TT.require(TT.Module.Validate);
var suscriptible = TT.require(TT.Module.Suscriptible);
var iterable     = TT.require(TT.Module.Iterable);


	function bubble(x, fn, limit)
	{// fn(obj)
validate.isFunction( fn, 'mem.bubble.fn is False for isFunction' )
validate.isNothingOrFn( limit, compare.isPositiveInt, 'mem.bubble.limit is False for isPositiveInt' )
		var cache;
		var recursive = compare.isNumber(limit) ? 
				function( obj, level )
				{
					if ( level <= limit )
					{
						iterable.each( obj, 
							function( v, k, item )
							{// since delete foo doesn't remove foo.bar... we remove every index
								if (  compare.canRecursive( item, k )  )
								{
				recursive( item[k], ++level )
								}
							} )
						cache = fn(obj)
					} 
				return cache
				} :
				function( obj, level )
				{
					iterable.each( obj, 
						function( v, k, item )
						{// since delete foo doesn't remove foo.bar... we remove every index
							if (  compare.canRecursive( item, k )  )
							{
				recursive( item[k], ++level );
							}
                       } );
					   cache = fn(obj);
				return cache;
				}
			// if it got to this point, there is nothing deeper to iterate to.
	return recursive( x, 0 );
	}exports.bubble = bubble;


	function each( x, fn, limit ) 
	{// fn( v, k, obj )
validate.isFunction( fn, 'mem.each.fn is False for isFunction' )
validate.isNothingOrFn( limit, compare.isPositiveInt, 'mem.each.limit is False for isPositiveInt' )
		var cache;
		var recursive = compare.isNumber(limit) ? 
				function( obj, level )
				{
					if (level <= limit)
					{
						iterable.each( obj, 
							function( v, k, item )
							{// since delete foo doesn't remove foo.bar... we remove every index
								if (  compare.canRecursive( item, k )  )
								{
				recursive( item[k], ++level )
								}
							cache = fn( v, k, item )
							} )
					} 
				return cache
				} :
				function( obj, level )
				{
					iterable.each( obj, 
						function( v, k, item )
						{// since delete foo doesn't remove foo.bar... we remove every index
							if (  compare.canRecursive( item, k )  )
							{
				recursive( item[k], ++level )
							}
					   		cache = fn( v, k, item )
						} )
				return cache
				}
	}exports.each = each


	function has() // args
	{
		var obj;
		var result = true
		sequence.until(arguments, function(argument, index)
		{
			if ( index === sequence.FIRST )
			{
				obj = argument
		return sequence.Until.Skip
			}
		// else
			if ( !builtin.has( obj, argument ) )
			{
				result = false
		return sequence.Until.Break
			}
		// else
			obj = obj[argument]
		})
	return result
	}exports.has = has


	function get() // args
	{
		var obj;
		var result;
		sequence.until(arguments, function(argument, index)
		{
			if ( index === sequence.FIRST )
			{
				obj = argument
		return sequence.Until.Skip
			}
		// else
			if ( !builtin.has( obj, argument ) )
			{
				result = undefined
		return sequence.Until.Break
			}
		// else
			obj = compare.resolveProperty(obj, argument)
			result = obj
		})
	return result
	}exports.get = exports.resolve = get



	function setdefault()
	{
		var obj;
		var root;
		sequence.each(arguments, function(argument, index)
		{
			if ( index === sequence.FIRST )
			{
				root = compare.defaultToValue( argument, {} ) // no defaultDictionary, since is ONLY if is nothing
				obj  = root
			}
			else
			{
suscriptible.setdefault(obj, argument, {})
				obj = obj[argument]
			}
		})
	return root
	}exports.setdefault = setdefault


	function iterate( n, fn, condition )
	{
		var n         = compare.defaultNumber( n, 1 )
		var fn        = compare.defaultFunction(  fn       ,  function( i,    r ) { return r }  )
		var condition = compare.defaultFunction(  condition,  function( i, n, r ) { return ( i < n ) }  )
		var r;
		function recursion(i)
		{
			if (  condition( ++i, n, r )  )
			{ // deeper
				r = recursion(i)
		return  r
			}
		return fn( i, r ) // pop
		}
	return recursion(0)
	}exports.iterate = iterate
