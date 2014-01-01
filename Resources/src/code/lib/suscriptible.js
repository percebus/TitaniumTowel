Ti.include('/src/code/lib/include.js')
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)

exports.get        = builtin.get
exports.set        = builtin.set
exports.setdefault = builtin.setdefault
exports.has        = builtin.has
exports.del        = builtin.del


	function defaults( x, item, value )
	{
		var dict = compare.defaultDictionary(x)
			dict[item] = value
	return  dict
	}exports.defaults = defaults

// we wan't to be able to say obj[function foo(x)] = foo
	function mirror  ( x, item ) { return builtin.set( x, item, item ) }
	 exports.mirror = exports.setItemAsValue = mirror

	function evaluate( obj, key ) 
	{// In python, we can key any immuttable obj. we wan't to be able to say obj[function foo(x)] = foo
	return compare.hasProperty( obj, key ) ? compare.evaluate(key) : undefined 
	}exports.evaluate = evaluate

	function undefine( x, item ) { return builtin.set( x, item, undefined ) }
	 exports.undefine = undefine

// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/delete
// when deleting, length is not affected in sequences. Thus we just undefine.
	function remove( x, item ) { return compare.isSequence(x) ? exports.undefine( x, item ) : exports.del( x, item ) }
	 exports.remove = remove


	function iterator( x, fn, context )
	{ // TODO apply always?
validate.isIterable( x, 'suscriptible.iterator.x is False for isIterable' )
validate.isNothingOrFn( fn     , compare.isFunction, 'suscriptible.iterator.fn      is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'suscriptible.iterator.context is False for isInstance' )
		var fn = compare.defaultFunction(fn)
	return context ? 
			function(i) { return builtin.apply.call(  fn,  context,  [ x[i], i, x ]  ) }  :
			function(i) { return fn( x[i], i, x ) }
	}exports.iterator = iterator


	function iteration( x, i, fn, context )
	{ // XXX un-performant! 
validate.isIterable( x, 'suscriptible.iteration.x is False for isIterable' )
validate.isNothingOrFn( fn     , compare.isFunction, 'suscriptible.iteration.fn      is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'suscriptible.iteration.context is False for isInstance' )
	return exports.iterator( x, compare.defaultFunction(fn), context )(i)
	}exports.iteration = iteration


	function update( x, i, fn, context )
	{
validate.isIterable( x , 'suscriptible.update.x  is False for isIterable'  )
validate.isFunction( fn, 'suscriptible.update.fn is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'suscriptible.update.context is False for isInstance' )
		   x[i] = exports.iterator( x, fn, context )(i)
	return builtin.get( x, i )
	}exports.update = update

