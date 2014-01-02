Ti.include('/src/code/towel/include.js');
var _          = TT.require(TT.Module.underscore)._ // XXX
var compare    = TT.require(TT.Module.Compare)
var titanium   = TT.require(TT.Module.Titanium)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var iterable   = TT.require(TT.Module.Iterable)
var functions  = TT.require(TT.Module.Fn)
var regExp     = TT.require(TT.Module.RegEx)
var string     = TT.require(TT.Module.Str)
var dateTime   = TT.require(TT.Module.DateTime)

	exports._ = _ // if some one wants to use it

	exports.unwrapObjectName  = compare.unwrapObjectName
	exports.typeName_native   = exports.getNativeTypeName = compare.typeName_native
	exports.typeName          = exports.getTypeName       = compare.typeName
	exports.hasName           = compare.hasName

	exports.f             = exports.identity = compare.f
	exports.now 		  = compare.now
	exports.Type          = compare.Type
	exports.isSame        = exports.areSame = compare.isSame
	exports.isSameExact   = exports.areSameExact = exports.areExactSame = compare.isSameExact
	exports.isTrue        = compare.isTrue
	exports.isFalse       = compare.isFalse
	exports.isZero        = compare.isZero
	exports.isNaN         = compare.isNaN
	exports.isUndefined   = compare.isUndefined
	exports.isNull        = compare.isNull
	exports.isNothing     = compare.isNothing
	exports.isNothingOrFn = compare.isNothingOrFn
	exports.isNotNothing  = compare.isNotNothing
//	exports.isEmpty       = compare.isEmpty // improved here
//	exports.isSomething   = compare.isSomething // improved here

	exports.exists                  = compare.exists
/* Improved here
	exports.resolve                 = compare.resolve
	exports.resolveBoolean          = compare.resolveBoolean
	exports.resolveProperty         = compare.resolveProperty
	exports.resolvePropertyPrivate  = exports.resolvePrivateProperty = compare.resolvePropertyPrivate
	exports.resolvePropertyBoolean  = exports.resolveBooleanProperty = compare.resolvePropertyBoolean
	exports.resolvePropertyOrObject = compare.resolvePropertyOrObject
 */

//	exports.isType            = compare.isType // improved here
//	exports.isTypeSame        = compare.isTypeSame // improved here
	exports.isIndexInList     = exports.isIndexValid = compare.isIndexInList
	exports.isTypeJSONable    = compare.isTypeJSONable
	exports.isFunction        = exports.isClass = compare.isFunction
	exports.isBoolean         = compare.isBoolean
	exports.isNumeric         = compare.isNumeric
	exports.isFinite          = compare.isFinite
	exports.isInfinite        = compare.isNotFinite = compare.isInfinite
	exports.isNumber          = compare.isNumber
	exports.isPositive        = exports.isNumberGTZ = exports.isNumberPositive = exports.isNumberGreaterThanZero = compare.isPositive
	exports.isInt             = compare.isInt
	exports.isIntPositive     = exports.isPositiveInt = compare.isIntPositive
	exports.isFloat           = compare.isFloat
	exports.isBetween         = compare.isBetween
	exports.isArray           = compare.isArray
	exports.isArguments       = compare.isArguments
	exports.isList            = compare.isList
	exports.isString          = compare.isString
	exports.isSomeString      = exports.isStringSome = compare.isSomeString
	exports.isCriteria        = exports.isSearchCriteria = compare.isCriteria
	exports.isEndOfStream     = compare.isEndOfStream
	exports.isSequence        = compare.isSequence
	exports.isObject          = compare.isObject
	exports.isObjectOther     = exports.isProxyObject = compare.isObjectOther
	exports.isTiObject        = compare.isObjectOther // TODO improved here
	exports.isSubcontext      = compare.isSubContext 
	exports.isInstance        = compare.isInstance
	exports.isClassOrInstance = compare.isClassOrInstance
	exports.isInstanciated    = compare.isInstanciated
	exports.isDictionary      = compare.isDictionary
	exports.isDictionaryOnly  = exports.isEnumerator = compare.isDictionaryOnly
	exports.isAttributes      = compare.isAttributes
	exports.isCollection      = compare.isCollection
	exports.isRecursivable    = compare.isRecursivable
	exports.isIterable        = compare.isIterable
	exports.isDate            = compare.isDate
	exports.isDateValid       = exports.isValidDate = compare.isDateValid
	exports.isJSONstring      = compare.isJSONstring
//	exports.isJSOnable        = compare.isJSONable   // improved here

	exports.isNumberPortTCP    = exports.isPortNumber   = compare.isNumberPortTCP
	exports.isNumberPortSocket = exports.isSocketNumber = compare.isNumberPortSocket

	exports.isIndexInList = exports.isIndexValid = compare.isIndexInList
	exports.isIntInLength = compare.isIntInLength

	exports.bool3states = compare.bool3states
	exports.bool2states = compare.bool2states
	exports.boolOrTrue  = compare.boolOrTrue
	exports.boolOrFalse = compare.boolOrFalse

	exports.defaultValue        = exports.defaultToValue        = compare.defaultToValue
	exports.defaultNumber       = exports.defaultToNumber       = compare.defaultNumber
	exports.defaultParam        = exports.defaultToParam        = compare.defaultParam
	exports.defaultBoolean      = exports.defaultToBoolean      = compare.defaultBoolean
	exports.defaultFunction     = exports.defaultToFunction     = compare.defaultFunction
	exports.defaulMethod        = exports.defaultToMethod       = compare.defaultMethod
	exports.defaultEventHandler = exports.defaultToEventHandler = compare.defaultEventHandler
	exports.defaultList         = compare.defaultList
	exports.defaultDictionary   = compare.defaultDictionary
	exports.defaultWindow       = compare.defaultWindow
	exports.defaultTab          = compare.defaultTab
	exports.defaultTo0          = exports.defaultToZero         = compare.defaultTo0

	exports.hasProperties = compare.hasProperties
	exports.hasProperty = exports.hasAttribute = exports.hasattr = compare.hasProperty
	exports.hasProperty_DontDelete = compare.hasProperty_DontDelete
	exports.hasProperty_length = compare.hasProperty_length
	exports.hasProperty_window = compare.hasProperty_window
	exports.isSelfReference = compare.isSelfReference
	exports.canRecursive = compare.canRecursive
	exports.canBeNumber = compare.canBeNumber
	exports.has_children = compare.has_children
	exports.has_length = compare.has_length
	exports.has_length_0 = compare.has_length_0
	exports.has_length_some = compare.has_length_some
	exports.hasMethod = compare.hasMethod
	exports.hasMethod_hasOwnProperty = exports.has_hasOwnProperty = compare.hasMethod_hasOwnProperty
	exports.hasKeys = compare.hasKeys
	exports.hasKey  = compare.hasKey
	exports.hasTraits = compare.hasTraits
	exports.hasTrait  = compare.hasTrait
	exports.hasIndex    = compare.hasIndex
	exports.hasPosition = compare.hasPosition
	exports.hasItem     = compare.hasItem

	exports.item_get = exports.getItem = exports.item = compare.item_get
	exports.item_set = exports.setItem                = compare.item_set
	exports.value_get = exports.value = exports.getValue = compare.value_get
	exports.valueByProperty = exports.getattr = compare.valueByProperty
	exports.valueByKey      = compare.valueByKey
    exports.valueByIndex    = compare.valueByIndex
    exports.valueByItem     = compare.valueByItem


	var Precision = exports.Precision = {
			Is    : 5,  // A is A!
			Exact : 4, //  3.0 = 3
			Strict: 3, //  3 === 3
			Type  : 2, //
			Value : 1, // String('3') == new String('3') but != 3
			Weak  : 0  // '3' == 3
		}


	function resolve( x, args, context ) { return exports.isFunction(x) ? functions.fwd( x, args, context ) : x }  
	 exports.resolve = resolve

	function resolveProperty( x, property, args, context ) { return exports.resolve(  exports.item( x, property ),  args,  context  ) } // some property could return null, so we want to be able to distinguish from one another
	 exports.resolveProperty = exports.retrieve = resolveProperty

	function applyMethod( x, method, args, force )
	{// Use sparringly as it breaks in-lining
		compare.defaultBoolean( force, true ) ? functions.fwd( x[property], args ) : exports.resolveProperty( x, method, args )
	return x // do what-ev and keep going (that's why we return the object itself)
	}exports.applyMethod = exports.executeMethod = exports.apply_attr = applyMethod

	function resolvePropertyOrObject( x, property, args, context ) { return exports.isObjectOther(x) ? x : compare.defaultParam(  exports.resolveProperty( x, property, args, context ),  x  ) }
	 exports.resolvePropertyOrObject = resolvePropertyOrObject

	function resolvePropertyPrivate ( x, property, args ) 
	{ 
	return compare.defaultParam(  exports.resolveProperty( x, '_'+property, args ),  
								  exports.resolveProperty( x,     property, args )  ) 
	}exports.resolvePropertyPrivate = exports.resolvePrivateProperty = resolvePropertyPrivate


	function resolveBoolean( x, fn, args, context ) { return  compare.defaultFunction( fn, exports.boolOrCast )(  exports.resolve( x, args, context ) ) }
	 exports.resolveBoolean = resolveBoolean

	function resolvePropertyBoolean( x, property, fn, args, context ) { return exports.resolveBoolean(  exports.resolveProperty( x, property, args, context ),  fn  ) }
	 exports.resolvePropertyBoolean = exports.resolveBooleanProperty = resolvePropertyBoolean


	function size(x)
	{
	if ( compare.isNumber  (x) ) return compare.value(x)
	if ( compare.isDate    (x) ) return x.getTime()
	if ( compare.isIterable(x)
	  || compare.has_length(x) ) return iterable.size(x) // including string
	/* implicit else */			 return null
	}exports.size = exports.len = size


	function copy(x)
	{// we don't use the word 'clone' because the inner elements are just references
		if ( compare.isCollection(x) ) return iterable.copy(x)
		if ( compare.isPrimitive (x) ) return x
		if ( compare.isDate      (x) ) return new builtin.Date( x.getTime() ) // TODO dateTime lib
		if ( compare.isInstance(x) )
		{
			try
			{ // TODO use create + prototype instead ?
	return new x.constructor( compare.value(x) )
			}
			catch(err){}
		}
	return compare.value(x)
	}exports.copy = copy


	function reset(x)
	{ // little more work, but we avoid re-generating objects when a clean slate is needed
	if ( compare.isString    (x) ) { return string.clear(x) }
	if ( compare.isInt       (x) ) { return 0   }
	if ( compare.isFloat     (x) ) { return 0.0 } // some evals show that 0.0 is not the same than 0 or 0.0	
		if 		( compare.isCollection(x) ) { iterable.clear(x) }
		else if ( compare.isDate      (x) ) { x.setTime( x.getTime() ) } // TODO setTime to 0?
	return x
	}exports.reset = reset


// TODO
/*
	function isTiObject(x) { return exports.isObjectOther(x) ? string.startsWith( compare.type(x), exports.Type.TiUI ) : null }
	 exports.isTiObject = isTiObject
 */

	function isTiUI(x) { return exports.isTiObject(x) && string.startsWith( compare.typeName(x), titanium.Ti.UI._prefix ) }
	 exports.isTiUI = isTiUI

	function isTiUItype( x, type_ ) { return exports.isTiObject(x) && compare.hasName( x, type_ ) }
	 exports.isTiUItype = isTiUItype


	function type( x, precision )
	{// like typeof but with additional types
		var fns     = [    exports.isDictionaryOnly, exports.isObjectOther,    exports.isFloat,    exports.isInt,    exports.isInfinite ]
		var results = [ exports.Type.Dictionary    ,    exports.Type.Other, exports.Type.Float, exports.Type.Int, exports.Type.Infinite ]
		for ( var i=0, I=fns.length;  i<I;  i++ )
			if (    exports.isTrue(  fns[i]( x, precision )  )   )
			{
	return results[i]
			}
	return compare.type(x)
	}exports.type = exports.typeOf = type


	function typeNames(x) { return [ exports.type(x), builtin.typeOf(x), compare.typeName(x) ] }
	 exports.typeNames = exports.typeNames_get = exports.getTypeNames = typeNames


	function isTypeSame( x, y, precision ) { return ( exports.type( x, precision ) === exports.type( y, precision ) ) }
	 exports.isTypeSame = exports.areSameType = isTypeSame


	function isType( x, type, fn, precision )
	{
		var TypeFn = {
				'error'     : exports.isError,
				'null'      : exports.isNull,
				'undefined' : exports.isUndefined,
				'nothing'   : exports.isNothing,
				'function'  : exports.isFunction,
				'object'    : exports.isObj,
				'boolean'   : exports.isBoolean,
				'numeric'   : exports.isNumeric,
				'number'    : exports.isNumber,
				'infinite'  : exports.isInfinite,
				'int'       : exports.isInt,
				'float'     : exports.isFloat,
				'array'     : exports.isArray,
				'arguments' : exports.isArguments,
				'list'      : exports.isList,
				'string'    : exports.isString,
				'regexp'    : exports.isRegExp,
				'sequence'  : exports.isSequence,
				'date'      : exports.isDate,
				'dateValid' : exports.isDateValid,
				'dictionary': exports.isDictionary,
				'iterable'  : exports.isIterable,
				'other'     : exports.isObjectOther }

		var type = compare.defaultToValue( type, exports.type(x) )
	return  compare.defaultFunction( fn, TypeFn[type] )( type, precision )
	}exports.isType = isType


    function hash( x, precision )
    {// inspired in jsUnity hash 
    	var default_ = exports.Precision.Strict
    	if ( compare.isBoolean(precision) )
			precision = precision ? default_ : exports.Precision.Weak
		precision = compare.defaultToValue(precision, default_)
    	var name;
// TODO add exports.Precision.Exact with Oids?
    	if      ( precision >= exports.Precision.Strict ) { name = function(obj) { return string.wrap( '<', [ builtin.typeOf(obj), exports.type(obj) ].join('::'), '>' ) }; }
    	else if ( precision >= exports.Precision.Type   ) { name = function(obj) { return string.wrap( '<', exports.type(obj), '>' ) } }
    	else											  { name = function(obj) { return '' } }

 		var represent;
 		if ( precision >= exports.Precision.Value ) 
 		{
 			represent = function(obj)
	 		{
	 			var result  = compare.isNothing(obj) ? '' : name(obj)
					result += compare.isString (obj) ? string.wrap("'", obj, "'") : builtin.String(obj)
			return  result
	 		}
 		}
 		else if ( precision >= exports.Precision.Weak )
 		{
 			represent = builtin.String
 		}
 
 
        function recursive( obj, level ) 
        {
            var arr = []

			var enumerable = dictionary.enumerate(obj)
			if ( !( compare.isList(obj) || ( precision >= exports.Precision.Exact ) ) )
				enumerable.sort()

			if ( compare.isList(obj) )
			{
				var callback = function(index)
				{
	                var value = obj[index]
					if ( index > 0 ){ sequence.append( ', ', arr ) }
	                var items = compare.canRecursive( obj, index ) ? recursive( value, ++level ) : represent(value)
	                sequence.append( items, arr )
				}
			}
			else
			{
				var callback = function(property)
				{
	                var value = obj[property]
					if ( ++index > 1 ){ sequence.append( ', ', arr ) }
										sequence.append( property + '=', arr )
	                var items = compare.canRecursive( obj, property ) ? recursive( value, ++level ) : represent(value)
	                sequence.append( items, arr )
				}
			}

			var index = 0
			iterable.each( enumerable, callback )
			var subhash = arr.join('')
				subhash = compare.isList(obj) ? 
					string.wrap('[', subhash, ']') : 
					string.wrap('{', subhash, '}')
		return name(obj) + subhash
        }
	return compare.isRecursivable(x) ? recursive( x, 0 ) : represent(x)
    }exports.hash = hash


	function isHashSame( x, y, precision ){ return exports.hash( x, precision ) === exports.hash( y, precision ) }
	 exports.isHashSame = exports.areSameHash = isHashSame


	function isValue( x, y, precision )
	{
	return _.isEqual( x, y ) // XXX
/*
		var precision = exports.defaultBoolean( precision, true )
    	var level    = exports.defaultTo0(level)
		if ( exports.isRecursivable(x) )
		{
			if ( !exports.isRecursivable(y) )
			{
debug.log( 'variable.isValue: y is False isRecursivable' )
debug.log( ' > ', variable.hash(x), true )
debug.log( ' > ', variable.hash(y), true )
	return false
			}

			var ok = true
			iterable.each( x, 
				function( item, index )
				{
					if ( !exports.hasItem( y, index ) ) 
					{
						ok = false
debug.log( 'variable.isValue: y is False for hasItem', index, true )
debug.log( ' > ', variable.hash( x[index] ), true )
debug.log( ' > ', variable.hash( y[index] ), true )
				return iterable.BREAK
					}

					if ( exports.canRecursive( x, index ) )
					{
						if ( !exports.canRecursive( y, index ) )
						{
						ok = false
debug.log( 'variable.isValue: y is False for canRecursive', index, true  )
debug.log( ' > ', variable.hash( x[index] ), true )
debug.log( ' > ', variable.hash( y[index] ), true )
				return iterable.BREAK
						}

						if ( !exports.isValue( x[index], y[index], precision, ++level ) )
						{ 
						ok = false
				return iterable.BREAK
						}
					}
				} )

			if ( !ok )
			{
debug.log( 'variable.isValue: differences' )
debug.log( ' > ', variable.hash(x), true )
debug.log( ' > ', variable.hash(y), true )
	return false
			}
		}

	// if we got here, it means there is nothing to iterate
		if (  exports.isNumber (x) && exports.isNumber (y) )
		{ // just in case for the -0 and decimal issues
	return exports.isZero( x - y )
		}

		if ( !precision )
		{ // TODO change precision for levels
debug.log( 'variable.isValue' )
devug.log( ' > ', exports.hash(x) )
devug.log( ' > ', exports.hash(y) )
	if (  exports.isBoolean(x) || exports.isBoolean(y) ) return compare.isValue( exports.bool3states(x), exports.bool3states(y), precision )
	if (  exports.isNumber (x) || exports.isNumber (y) ) return compare.isValue( x, y, precision )
	if (  exports.isDate   (x) || exports.isDate   (y) ) return exports.isZero( dateTime.millisecondsSBoT(x) - dateTime.millisecondsSBoT(y) )
	if (  exports.isString (x) || exports.isString (y) ) return compare.isValue( string.parse(x), string.parse(y), precision  )
		}
	return compare.isValue( x, y, precision )
*/
	}exports.isValue = exports.isEqual = exports.areEqual = isValue


	function not(x)
	{
validate.isBoolean( x, 'variable.not.x is False for isBoolean' )// XXX ?
	return !x
	}exports.not = not

	function isIdentical( x, y )  { return exports.isHashSame( x, y, true ) } // exports.isValue( x, y, true ) }
	 exports.isIdentical = exports.areIdentical = _.isEqual // isIdentical

	function isEquivalent( x, y ) { return exports.isHashSame( x, y, false ) } // exports.isValue( x, y, false ) }
	 exports.isEquivalent = exports.areEquivalent = isEquivalent

	function isEmpty    ( x, precision ) { return ( compare.isNothing( x, precision ) || compare.is0( exports.size(x), precision ) ) }
	 exports.isEmpty = isEmpty

	function isSomething( x, precision ) { return !compare.isEmpty( x, precision ) }
	 exports.isSomething = isSomething


	function isJSONstringDate(x) { return ( exports.canBeNumber(x) || !exports.isSomeString(x) ) ? false : sequence.any( dateTime.DateRegexp.JSON.List, function(oRegExp){ return regExp.matches( x, oRegExp ) } ) }
	 exports.isJSONstringDate = isJSONstringDate


// TODO it is JSONing TiViews and TiFiles!! ensure it works on android too!
	function isJSONable(x)
	{// very handy for all the sqless and session vars
		if ( !compare.isJSONable(x) )
		{ // If the type doesn't match, why even bother?
	return false
		}
		try
		{ // we don't use eval, someone could hack the webserver and affect MILLIONS OF USERS!!!!!
			var oJSON = builtin.JSON.parse( builtin.JSON.stringify(x) )
			if ( exports.isDate(x) )
				oJSON = new Date(oJSON)
	return (  exports.areIdentical( x, oJSON )  &&  exports.areSameType( x, oJSON )  )
		}
		catch(err) {}
	// implicit else
	return false
	}exports.isJSONable = exports.isJSON = isJSONable


	function isEventData(x) { return ( exports.isJSONable(x) || exports.isNothing(x) ) }
	 exports.isEventData = isEventData 


	function isGreaterThanFF(x) { return ( sequence.size(x) > 255 ) }
	 exports.isGreaterThanFF = isGreaterThanFF

