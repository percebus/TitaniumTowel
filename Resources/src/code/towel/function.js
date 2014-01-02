Ti.include('/src/code/towel/include.js');
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)
var sequence = TT.require(TT.Module.Sequence)

exports.f = compare.f


	function params_delta( args, fn )// TODO adjust to use 'this'
	{ // Calculate how many more or less args were provided
validate.isArguments( args, 'function.params_delta.args is False for isArguments' )
validate.isFunction ( fn  , 'function.params_delta.fn   is False for isFunction'  )
	return sequence.size(args) - sequence.size(fn)
	}exports.params_delta = exports.paramsDiff = params_delta


	function hasParamsNone(args)
	{
validate.isArguments( args, 'function.hasParamsNone.args is False for isArguments' )
	return compare.has_length_0(args)
	}exports.hasParamsNone = exports.hasNoParams = hasParamsNone


	function hasParamsSame( args, fn ) 
	{ 
validate.isArguments( args, 'function.hasParamsSame.args is False for isArguments' )
validate.isFunction ( fn  , 'function.hasParamsSame.fn   is False for isFunction'  )
	return compare.is0(  exports.params_delta( args, fn )  ) 
	}exports.hasParamsSame = exports.hasSameParams = hasParamsSame


	function hasParamsMore( args, fn, orEqual ) 
	{ 
validate.isArguments( args, 'function.hasParamsMore.args is False for isArguments' )
validate.isFunction ( fn  , 'function.hasParamsMore.fn   is False for isFunction'  )
validate.isNothingOrFn( orEqual, isBoolean, 'function.hasParamsLess.orEqual is False for isBoolean'  )
	return compare.isGreaterThanZero( exports.params_delta( args, fn ), compare.defaultBoolean( orEqual, false ) ) 
	}exports.hasParamsMore = exports.hasMoreParams = hasParamsMore


	function hasParamsLess( args, fn, orEqual ) 
	{ 
validate.isArguments( args, 'function.hasParamsLess.args is False for isArguments' )
validate.isFunction ( fn  , 'function.hasParamsLess.fn   is False for isFunction'  )
validate.isNothingOrFn( orEqual, isBoolean, 'function.hasParamsLess.orEqual is False for isBoolean'  )
	return compare.isLowerThanZero( exports.params_delta( args, fn ), compare.defaultBoolean( orEqual, false ) ) 
	}exports.hasParamsLess = exports.hasLessParams = hasParamsLess


	function fwd( fn, args, context )
	{// http://stackoverflow.com/questions/5427118/using-function-prototype-apply-to-set-javascript-callback-scope
/*TODO this is black magic! we are tampering with forces beyond our control!
	Function.prototype.apply.apply.call(Function.prototype.apply
 */
validate.isFunction( fn, 'function.fwd.fn is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'function.fwd.context is False for isInstance' )
	return  builtin.apply.call( fn, compare.defaultContext(context), sequence.toArray(args) ) // metaprogramming, FTW?!
	}exports.fwd = exports.fwdArgs = exports.forwardArguments = fwd 


	function not( fn, args, context )
	{
validate.isFunction( fn, 'function.not.fn is False for isFunction' )
validate.isNothingOrFn( context, compare.isInstance, 'function.not.context is False for isInstance' )
	return !exports.fwd( fn, args, context )
	}exports.not = not


	function fwdIfFunction( fn, args, context ) { return compare.isFunction(fn) ? exports.fwd( fn, args, context ) : undefined }
	 exports.fwdIfFunction = fwdIfFunction


// specially for Ti objects that cannot use .apply() or .call() XXX ?
	function callIfFunction( fn, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 )
	{//not as elegant as fwdIfFunction, but it will do the trick in messy occasions 
	return compare.isFunction(fn) ? fn( arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9 ) : undefined
	}exports.callIfFunction = callIfFunction

