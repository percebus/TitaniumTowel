Ti.include('/src/code/towel/include.js');
var validate  = TT.require(TT.Module.Validate)
var sequence  = TT.require(TT.Module.Sequence)
var string    = TT.require(TT.Module.Str)
var functions = TT.require(TT.Module.Fn)
var variable  = TT.require(TT.Module.Var)

	exports.Type          = validate.Type
    exports.isSame        = exports.areSame = validate.isSame
    exports.isSameExact   = exports.areExactSame = validate.isSameExact
	exports.isTrue        = validate.isTrue
	exports.isFalse       = validate.isFalse
	exports.isZero        = validate.isZero
	exports.isNaN         = validate.isNaN
	exports.isUndefined   = validate.isUndefined
	exports.isNull        = validate.isNull
	exports.isNothing     = validate.isNothing
	exports.isNothingOrFn = validate.isNothingOrFn
	exports.isNotNothing  = validate.isNotNothing
//	exports.isEmpty       = validate.isEmpty // improved here
	exports.isSomething   = validate.isSomething
	exports.exists        = validate.exists

//	exports.isType            = validate.isType // improved here
	exports.isFunction        = exports.isClass = validate.isFunction
	exports.isObject          = validate.isObject
	exports.isObjectOther     = exports.isProxyObject = exports.isTiObject = validate.isObjectOther
	exports.isInstance        = validate.isInstance
	exports.isInstanciated    = validate.isInstanciated
	exports.isClassOrInstance = validate.isClassOrInstance
	exports.isRegExp          = validate.isRegExp
	exports.isBoolean         = validate.isBoolean
	exports.isNumeric         = validate.isNumeric
	exports.isNumber          = validate.isNumber
	exports.isFinite          = validate.isFinite
	exports.isInt             = validate.isInt
	exports.isFloat           = validate.isFloat
	exports.isBetween         = validate.isBetween
	exports.isArray           = validate.isArray
	exports.isArguments       = validate.isArguments
	exports.isList            = validate.isList
	exports.isString          = validate.isString
	exports.isStringSome 	  = exports.isSomeString = validate.isStringSome
	exports.isCriteria        = exports.isSearchCriteria = validate.isCriteria
	exports.isSequence        = validate.isSequence
	exports.isCollection      = validate.isCollection
	exports.isFileParam       = validate.isFileParam
	exports.isDictionary      = validate.isDictionary
	exports.isDictionaryOnly  = exports.isEnumerator = validate.isDictionaryOnly
	exports.isAttributes      = validate.isAttributes
	exports.isIterable        = validate.isIterable
	exports.isDate            = validate.isDate
	exports.isDateValid       = validate.isDateValid

	exports.hasProperties = exports.hasattr = exports.has = validate.hasProperties
	exports.hasKeys       = validate.hasKeys
	exports.hasTraits     = validate.hasTraits

	exports.hasProperty        = validate.hasProperty
	exports.hasProperty_length = validate.hasProperty_length
	exports.has_length         = validate.has_length
	exports.hasMethod          = validate.hasMethod
	exports.hasKey             = validate.hasKey
	exports.hasTrait           = validate.hasTrait


	function isType( x, type, msg, fn, useExact ) { return validate.check( variable.isType( x, type, fn, useExact ), string.format( msg ||  '%s is not type %s', string.toString(x), string.toString(type) ) ) }
	 exports.isType = isType

	function isAnyOf( x, types, msg ) { return validate.check( sequence.isAnyOf( x, types ), string.format( msg ||  '%s is not any supported type %s', string.toString(x), string.toString(types) ) ) }
	 exports.isAnyOf = isAnyOf

	function isValue   ( x, y, msg, useExact ) { return validate.check( variable.isValue( x, y, useExact ), string.format( msg || '%s is not equal to %s', string.toString(x), string.toString(y) ) ) }
	 exports.isValue = exports.isEqual = exports.areEqual = isValue

	function isHashSame( x, y, msg, useExact ) { return validate.check( variable.isHashSame( x, y, useExact ), string.format( msg || "%s != %s", variable.hash(x), variable.hash(y) ) ) }
	 exports.isHashSame = isHashSame

	function isEmpty    ( x, msg, useExact ) { return validate.check( variable.isEmpty( x, useExact ), string.format( msg || '%s is not empty', string.toString(x) ) ) }
	 exports.isEmpty = isEmpty

	function isSomething( x, msg, useExact ) { return validate.check( variable.isSomething( x, useExact ), string.format( msg || '%s is not something', string.toString(x) ) ) }
	 exports.isSomething = isSomething

	function isIdentical( x, y, msg ) { return validate.check( variable.isIdentical( x, y ), string.format( msg || '%s is not identical to %s', string.toString(x), string.toString(y) ) ) }
	 exports.isIdentical = exports.areIdentical = isIdentical

	function isEquivalent( x, y, msg ) { return validate.check( variable.isEquivalent( x, y ), string.format( msg || '%s is not equivalent to %s', string.toString(x), string.toString(y) ) ) }
	 exports.isEquivalent = exports.areEquivalent = isEquivalent


	function isJSONable  ( x, msg ) { return validate.check( variable.isJSONable  , string.format( msg || '%s cannot be parsed as JSON', string.toString(x) ) ) }
	 exports.isJSONable = isJSONable

	function isJSONstring( x, msg ) { return validate.check( variable.isJSONstring, string.format( msg || '%s cannot be a JSON string' , string.toString(x) ) ) }
	 exports.isJSONstring = isJSONstring

	function isEventData ( x, msg ) { return validate.check( variable.isEventData  , string.format( msg || '%s is not event data', string.toString(x) ) ) }
	 exports.isEventData = isEventData


	function hasSize( x, size, msg, useExact ) { return validate.check( variable.isValue( variable.size(x), size, useExact ), string.format( msg || '%s has no size %s', string.toString(x), string.toString(size) ) ) }
	 exports.hasSize = hasSize


	function isTypeInList ( x, list, msg, useExact )  { return validate.check(  sequence.any( list, function(value) { return variable.isType( x, value, null, useExact ) } ), string.format( msg || '%s is none of the types in list %s', string.toString(x), string.toString(list) ) ) }
	 exports.isTypeInList = isTypeInList

	function isValueInList( x, list, msg, useExact ) { return validate.check(  sequence.any( list, function(value) { return variable.isValue( x, value, useExact ) } ), string.format( msg || '%s is none of the values in list %s', string.toString(x), string.toString(list) ) ) }
	 exports.isValueInList = isValueInList


	function hasParamsNone      ( args,     msg ) { return validate.check(  functions.hasParamsNone(args), string.format( msg || 'argumens size is more than zero %s', string.toString( sequence.toArray(args) ) )  ) }
	 exports.hasParamsNone = hasParamsNone

	function hasParamsSame      ( args, fn, msg ) { return validate.check(  functions.hasParamsSame( args, fn ), string.format( msg || 'argumens and function dont have same number of args %s', string.toString(args) )  ) }
	 exports.hasParamsSame = hasParamsSame

	function hasParamsSameOrMore( args, fn, msg ) { return validate.check(  functions.hasParamsSameOrMore( args, fn ), string.format( msg || 'argumens doesnt have same or more args than function %s', string.toString(args) )  ) }
	 exports.hasParamsSameOrMore = hasParamsSameOrMore

	function hasParamsSameOrLess( args, fn, msg ) { return validate.check(  functions.hasParamsSameOrLess( args, fn ), string.format( msg || 'argumens doesnt have same or less args than function %s', string.toString(args) )  ) }
	 exports.hasParamsSameOrLess = hasParamsSameOrLess

	function hasParamsMore      ( args, fn, msg ) { return validate.check(  functions.hasParamsMore( args, fn ), string.format( msg || 'argumens doesnt have more args than function %s', string.toString(args) )  ) }
	 exports.hasParamsMore = hasParamsMore

	function hasParamsLess      ( args, fn, msg ) { return validate.check(  functions.hasParamsLess( args, fn ), string.format( msg || 'argumens doesnt have less args than function %s', string.toString(args) )  ) }
	 exports.hasParamsLess = hasParamsLess
