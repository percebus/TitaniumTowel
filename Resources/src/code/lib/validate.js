Ti.include('/src/code/lib/include.js')
var compare = TT.require(TT.Module.Compare)


	function check( condition, msg )
	{
		if ( !condition ) // TODO or isPROD
		{
throw new Error(msg)
		}
	return true		
	}exports.check = check


	function test( fnName, x, msg, useExact ) { return exports.check( compare[fnName]( x, useExact ), builtin.format( msg || '%s test failed for %s', builtin.String(x), builtin.String(fnName) ) ) }
	 exports.test = test

	function isValue( x, y, msg, useExact ) { return exports.check( compare.isValue	( x, y, useExact ), builtin.format( msg || '%s is not equal to %s', builtin.String(x), builtin.String(y) ) ) }
	 exports.isValue = exports.isSame = exports.isEqual = exports.areEqual = isValue

	function isEquivalent( x, y, msg ) { return exports.check( compare.isEquivalent	( x, y, useExact ), builtin.format( msg || '%s is not equivalent to %s', builtin.String(x), builtin.String(y) ) ) }
	 exports.isEquivalent = exports.areEquivalent = isEquivalent

	function isIdentical ( x, y, msg ) { return exports.check( compare.isIdentical  ( x, y, useExact ), builtin.format( msg || '%s is not identical to %s', builtin.String(x), builtin.String(y) ) ) }
	 exports.isIdentical = exports.areIdentical = exports.isSameExact = exports.areExactSame = isIdentical

	function isValue( x, y, msg, useExact ) { return exports.check( compare.isValue	( x, y, useExact ), builtin.format( msg || '%s is not equal to %s', builtin.String(x), builtin.String(y) ) ) }
	 exports.isValue = exports.isSame = isValue


	function isTrue		 ( x, msg, useExact ) { return exports.check( compare.isTrue	  ( x, useExact ), builtin.format( msg || '%s is not True', builtin.String(x) ) ) }
	 exports.isTrue = isTrue

	function isFalse	 ( x, msg, useExact ) { return exports.check( compare.isFalse	  ( x, useExact ), builtin.format( msg || '%s value is not False', builtin.String(x) ) ) }
	 exports.isFalse = isFalse

	function isZero		 ( x, msg, useExact ) { return exports.check( compare.isZero	  ( x, useExact ), builtin.format( msg || '%s  is not zero', builtin.String(x) ) ) }
	 exports.isZero = isZero

	function isNaN		 ( x, msg, useExact ) { return exports.check( compare.isNaN		  ( x, useExact ), builtin.format( msg || '%s is not NaN' ), builtin.String(x) ) }
	 exports.isNaN = isNaN

	function isUndefined ( x, msg, useExact ) { return exports.check( compare.isUndefined ( x, useExact ), builtin.format( msg || '%s is not undefined', builtin.String(x) ) ) }
	 exports.isUndefined = isUndefined

	function isNull		 ( x, msg, useExact ) { return exports.check( compare.isNull	  ( x, useExact ), builtin.format( msg || '%s is not null', builtin.String(x) ) ) }
	 exports.isNull = isNull

	function isNothing	 ( x, msg, useExact ) { return exports.check( compare.isNothing   ( x, useExact ), builtin.format( msg || '%s is not nothing (null or undefined)', builtin.String(x) ) ) }
	 exports.isNothing = isNothing

	function isNotNothing( x, msg, useExact ) { return exports.check( compare.isNotNothing( x, useExact ), builtin.format( msg || '%s is not nothing (null or undefined)', builtin.String(x) ) ) }
	 exports.isNotNothing = isNotNothing

	function isEmpty	 ( x, msg, useExact ) { return exports.check( compare.isEmpty	  ( x, useExact ), builtin.format( msg || '%s is not empty (null or undefined)', builtin.String(x) ) ) }
	 exports.isEmpty = isEmpty

	function isSomething ( x, msg, useExact ) { return exports.check( compare.isSomething( x, useExact ), builtin.format( msg || '%s is not something', builtin.String(x) ) ) }
	 exports.isSomething = isSomething

	function exists		 ( x, msg, useExact ) { return exports.check( compare.exists	  ( x, useExact ), builtin.format( msg || '%s does not exist', builtin.String(x) ) ) }
	 exports.exists = exists


	function isNothingOrFn( x, fn, msg, useExact ) { return exports.check(  compare.isNothingOrFn( x, fn, useExact ),  builtin.format( msg || '%s is not nothing (null or undefined) or fn %s', builtin.String(x), builtin.String(fn) )   ) }
	 exports.isNothingOrFn = isNothingOrFn


	function isString	      ( x, msg ) { return exports.check( compare.isString	      (x), builtin.format( msg || '%s is not String', builtin.String(x) ) ) }
	 exports.isString = isString

	function isStringSome     ( x, msg ) { return exports.check( compare.isStringSome     (x), builtin.format( msg || '%s is not Some String', builtin.String(x) ) ) }
	 exports.isStringSome = exports.isSomeString = isStringSome

	function isFunction	      ( x, msg ) { return exports.check( compare.isFunction       (x), builtin.format( msg || '%s is not Function', builtin.String(x) ) ) }
	 exports.isFunction = isFunction

	function isClass	      ( x, msg ) { return exports.check( compare.isClass          (x), builtin.format( msg || '%s is not Class', builtin.String(x) ) ) }
	 exports.isClass = isClass

	function isObject	      ( x, msg ) { return exports.check( compare.isObject	      (x), builtin.format( msg || '%s is not Object', builtin.String(x) ) ) }
	 exports.isObject = isObject

	function isInstance	      ( x, msg ) { return exports.check( compare.isInstance	      (x), builtin.format( msg || '%s is not Instance', builtin.String(x) ) ) }
	 exports.isInstance = isInstance

	function isInstanciated   ( x, msg ) { return exports.check( compare.isInstanciated   (x), builtin.format( msg || '%s is not instanciated', builtin.String(x) ) ) }
	 exports.isInstanciated = isInstanciated

	function isClassOrInstance( x, msg ) { return exports.check( compare.isClassOrInstance(x), builtin.format( msg || '%s is not class or instance', builtin.String(x) ) ) }
	 exports.isClassOrInstance = isClassOrInstance

	function isRegExp         ( x, msg ) { return exports.check( compare.isRegEx	      (x), builtin.format( msg || '%s is not RegEx', builtin.String(x) ) ) }
	 exports.isRegExp = exports.isRegEx = isRegExp

	function isCriteria       ( x, msg ) { return exports.check( compare.isCriteria	      (x), builtin.format( msg || '%s is not Search Criteria', builtin.String(x) ) ) }
	 exports.isCriteria = exports.isSearchCriteria = isCriteria

	function isBoolean	      ( x, msg ) { return exports.check( compare.isBoolean	      (x), builtin.format( msg || '%s is not Boolean', builtin.String(x) ) ) }
	 exports.isBoolean = isBoolean

	function isNumeric	      ( x, msg ) { return exports.check( compare.isNumeric	      (x), builtin.format( msg || '%s is not Numeric', builtin.String(x) ) ) }
	 exports.isNumeric = isNumeric

	function isFinite	      ( x, msg ) { return exports.check( compare.isFinite	      (x), builtin.format( msg || '%s is not Finite', builtin.String(x) ) ) }
	 exports.isFinite = isFinite

	function isNumber	      ( x, msg ) { return exports.check( compare.isNumber	      (x), builtin.format( msg || '%s is not Number', builtin.String(x) ) ) }
	 exports.isNumber = isNumber

	function isZero		      ( x, msg ) { return exports.check( compare.isZero		      (x), builtin.format( msg || '%s is not 0', builtin.String(x) ) ) }
	 exports.isZero = isZero

	function isZeroOrGreater  ( x, msg ) { return exports.check( compare.isZeroOrGreater  (x), builtin.format( msg || '%s is not 0 or greate', builtin.String(x) ) ) }
	 exports.isZeroOrGreater = exports.isZeroOrMore = isZeroOrGreater

	function isInt		      ( x, msg ) { return exports.check( compare.isInt		      (x), builtin.format( msg || '%s is not int', builtin.String(x) ) ) }
	 exports.isInt = isInt

	function isPositive       ( x, msg ) { return exports.check( compare.isPositive	      (x), builtin.format( msg || '%s is not Number greater than 0', builtin.String(x) ) ) }
	 exports.isPositive = exports.isNumberGTZ = exports.isNumberGreaterThanZero = exports.isNumberPositive = isPositive

	function isPositiveInt	  ( x, msg ) { return exports.check( compare.isPositiveInt	  (x), builtin.format( msg || '%s is not Positive int', builtin.String(x) ) ) }
	 exports.isPositiveInt = exports.isIntPositive = isPositiveInt

	function isFloat	      ( x, msg ) { return exports.check( compare.isFloat	      (x), builtin.format( msg || '%s is not float', builtin.String(x) ) ) }
	 exports.isFloat = isFloat

	function isArray	      ( x, msg ) { return exports.check( compare.isArray	      (x), builtin.format( msg || '%s is not Array', builtin.String(x) ) ) }
	 exports.isArray = isArray

	function isArguments      ( x, msg ) { return exports.check( compare.isArguments      (x), builtin.format( msg || '%s is not arguments', builtin.String(x) ) ) }
	 exports.isArguments = isArguments

	function isList		      ( x, msg ) { return exports.check( compare.isList           (x), builtin.format( msg || '%s is not list', builtin.String(x) ) ) }
	 exports.isList = exports.isResizable = isList

	function isSequence       ( x, msg ) { return exports.check( compare.isSequence       (x), builtin.format( msg || '%s is not a sequence', builtin.String(x) ) ) }
	 exports.isSequence = isSequence

	function isDictionary     ( x, msg ) { return exports.check( compare.isDictionary     (x), builtin.format( msg || '%s is not a dictionary', builtin.String(x) ) ) }
	 exports.isDictionary = isDictionary

	function isDictionaryOnly ( x, msg ) { return exports.check( compare.isDictionaryOnly (x), builtin.format( msg || '%s is not a pure dictionary', builtin.String(x) ) ) }
	 exports.isDictionaryOnly = exports.isEnumerator = isDictionaryOnly

	function isAttributes     ( x, msg ) { return exports.check( compare.isAttributes     (x), builtin.format( msg || '%s is not valid for attributes', builtin.String(x) ) ) }
	 exports.isAttributes = isAttributes

	function isFileParam      ( x, msg ) { return exports.check( compare.isFileParam      (x), builtin.format( msg || '%s is not a a valid parameter for file', builtin.String(x) ) ) }
	 exports.isFileParam = isFileParam

	function isCollection     ( x, msg ) { return exports.check( compare.isCollection     (x), builtin.format( msg || '%s is not a collection', builtin.String(x) ) ) }
	 exports.isCollection = isCollection

	function isIterable       ( x, msg ) { return exports.check( compare.isIterable       (x), builtin.format( msg || '%s is not iterable', builtin.String(x) ) ) }
	 exports.isIterable = isIterable

	function isDate		      ( x, msg ) { return exports.check( compare.isDate           (x), builtin.format( msg || '%s is not date', builtin.String(x) ) ) }
	 exports.isDate = isDate

	function isDateValid      ( x, msg ) { return exports.check( compare.isDateValid      (x), builtin.format( msg || '%s is not valid date', builtin.String(x) ) ) }
	 exports.isDateValid = isDateValid

	function isObjectOther    ( x, msg ) { return exports.check( compare.isObjectOther    (x), builtin.format( msg || '%s is not Object "other"', builtin.String(x) ) ) }
	 exports.isObjectOther = exports.isProxyObject = exports.isTiObject = isObjectOther


	function isIndexInList( i, x, msg ) { return exports.check( compare.isIndexInList( i, x ), builtin.format( msg || '%d is not a valid index for %s', i, builtin.String(x) ) ) }
	 exports.isIndexInList = exports.isIndexValid = isIndexInList

	function isIntInLength( i, x, msg ) { return exports.check( compare.isIntInLength( i, x ), builtin.format( msg || '%d th item is not in %s', i, builtin.String(x) ) ) }
	 exports.isIntInLength = isIntInLength

	function isBetween( x, min, max, msg ) { return exports.check( compare.isBetween( x, min, max ), builtin.format( msg || '%d is not between %d and %d', x, min, max ) ) }
	 exports.isBetween = isBetween

	function hasProperty( x, property  , msg ) { return exports.check( compare.hasProperty( x, property   ), builtin.format( msg || '%s has no property %s', builtin.String(x), builtin.String(property) ) ) }
	 exports.hasProperty = exports.hasProperty = hasProperty

	function hasProperty_length( x, msg ) { return exports.check( compare.hasProperty_length(x), builtin.format( msg || '%s has no property length', builtin.String(x) ) ) }
	 exports.hasProperty_length = hasProperty_length

	function has_length( x, msg ) { return exports.check( compare.has_length(x), builtin.format( msg || '%s has no length', builtin.String(x) ) ) }
	 exports.has_length = has_length

	function has_length_some( x, msg ) { return exports.check( compare.has_length_some(x), builtin.format( msg || '%s has not some length', builtin.String(x) ) ) }
	 exports.has_length_some = has_length_some

	function hasMethod  ( x, methodName, msg ) { return exports.check( compare.hasMethod  ( x, methodName ), builtin.format( msg || '%s has no method %s', builtin.String(x), builtin.String(methodName) ) ) }
	 exports.hasMethod = hasMethod

	function hasKey     ( x, key       , msg ) { return exports.check( compare.hasKey     ( x, key        ), builtin.format( msg || '%s has no key %s'   , builtin.String(x), builtin.String(key) ) ) }
	 exports.hasKey = hasKey

	function hasTrait   ( x, property  , msg ) { return exports.check( compare.hasTrait   ( x, property   ), builtin.format( msg || '%s has no trait %s' , builtin.String(x), builtin.String(key) ) ) }
	 exports.hasTrait = hasTrait


	function hasProperties( x, msg ) { return exports.check( compare.hasProperties(x), builtin.format( msg || '%s has no properties', builtin.String(x) ) ) }
	 exports.hasProperty = exports.hasProperty = hasProperty

	function hasKeys      ( x, msg ) { return exports.check( compare.hasKeys(x)      , builtin.format( msg || '%s has no keys', builtin.String(x) ) ) }
	 exports.hasKeys = hasKeys

	function hasTraits    ( x, msg ) { return exports.check( compare.hasTraits(x)    , builtin.format( msg || '%s has no traits', builtin.String(x) ) ) }
	 exports.hasTraits = hasTraits


	function hasMethod_hasOwnProperties( x, msg ) { return exports.check( compare.hasMethod_hasOwnProperties (x), builtin.format( msg || '%s has no method hasOwnProperties', builtin.String(x) ) ) }
	 exports.hasMethod_hasOwnProperties = hasMethod_hasOwnProperties

	function hasProperty_DontDelete( x, msg ) { return exports.check( compare.hasProperty_DontDelete (x), builtin.format( msg || '%s has no property DontDelete', builtin.String(x) ) ) }
	 exports.hasProperty_DontDelete = hasProperty_DontDelete


	function canBeNumber( x, msg ) { return exports.check( compare.canBeNumber(x), builtin.format( msg || '%s cannot be a number', builtin.String(x) ) ) }
	 exports.canBeNumber = canBeNumber
