var TT      =    require('src/code/lib/index')
var logger  = TT.require(TT.Module.Log)
var exports = exports || {}


// We make a copy of all the builtin native js goodies... just in case someone overwrites them along the way
	function isEquivalent( x, y ) { return x == y }
	 exports.isEquivalent = exports.areEquivalent = isEquivalent

	function isIdentical ( x, y ) { return x === y }
	 exports.isIdentical = exports.areIdentical = isIdentical

	function typeOf(x) { return typeof(x) } 
	 exports.typeOf = typeOf // for some reason I cannot assign it directly

	function instanceOf( x, y ) { return x instanceof y }
	 exports.instanceOf = instanceOf

	function args(){ return arguments }
	 exports.args = exports.arguments_get = exports.getArguments = args 

	exports.eval = eval
	exports.Math   = Math
	exports.abs    = Math.abs
	exports.min	   = Math.min
	exports.max	   = Math.max
	exports.round  = Math.round
	exports.ceil   = Math.ceil
	exports.random = Math.random
	exports.E      = Math.E
	exports.PI     = Math.PI // TODO 103993/33102
	exports.RegExp = RegExp
	exports.Array   = Array
	exports.isArray = Array.isArray
	exports.Boolean = Boolean
	exports.isFinite = isFinite
	exports.isNaN	 = isNaN
	exports.Function = Function
	exports.call     = Function.prototype.call
	exports.apply    = Function.prototype.apply
	exports.bind	 = Function.prototype.bind
	exports.undefined = undefined
	exports.Date      = Date
	exports.UTC       = Date.UTC
	exports.parseDate = Date.parse
	exports.parseInt   = parseInt
	exports.parseFloat = parseFloat
	exports.JSON		 = JSON
	exports.parseJSON    = JSON.parse
	exports.toJSONstring = exports.toJsonString = exports.stringifyJSON = JSON.stringify
	exports.clearInterval = clearInterval
	exports.setInterval   =   setInterval
	exports.clearTimeout  = clearTimeout
	exports.setTimeout    =   setTimeout
	exports.String		   = String
	exports.fromCharCode   = String.fromCharCode
	exports.format         = String.format
	exports.formatCurrency = String.formatCurrency
	exports.formatDate	   = String.formatDate
	exports.formatTime	   = String.formatTime
	exports.formatDecimal  = String.formatDecimal
	exports.Number            = Number
	exports.POSITIVE_INFINITE = Number.POSITIVE_INFINITE
	exports.NEGATIVE_INFINITE = Number.NEGATIVE_INFINITE
	exports.MAX_VALUE         = Number.MAX_VALUE
	exports.MIN_VALUE         = Number.MIN_VALUE
	exports.NaN               = Number.NaN
	exports.toExponential     = Number.toExponential
	exports.toFixed           = Number.toFixed
	exports.toPrecision       = Number.toPrecision
	exports.escape			    = escape
	exports.unescape		    = unescape
	exports.encodeURI	   	    = encodeURI
	exports.encodeURIComponent  = encodeURIComponent
	exports.decodeURI	   	    = decodeURI
	exports.decodeURIComponent  = decodeURIComponent
	exports.prototype_               = Object.prototype // if we assign the exports require dictionary's prototype... dear G0d why!?
	exports.isPrototypeOf            = Object.isPrototypeOf
	exports.getPrototypeOf           = Object.getPrototypeOf 
	exports.defineProperty           = Object.defineProperty
	exports.preventExtensions        = Object.preventExtensions
	exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
	exports.seal                     = Object.seal
	exports.freeze                   = Object.freeze
	exports.isExtensible             = Object.isExtensible
	exports.isSealed                 = Object.isSealed
	exports.isFrozen                 = Object.isFrozen

	function fwd( fn, args, context ) { return (args || context) ? exports.apply.call( fn, context, args ) : fn() }
	 exports.fwd = fwd

	exports.test = RegExp.prototype.test ? function( x, item ) { return RegExp.prototype.test.call( x, item ) } : null
	exports.exec = RegExp.prototype.exec ? function( x, item ) { return RegExp.prototype.exec.call( x, item ) } : null
	exports.getTime = Date.prototype.getTime ? function(x) { return Date.prototype.getTime.call(x) } : null
// TODO add context to mapping functions
	exports.forEach		= Array.prototype.forEach     ? function( x, fn, context ) { return Array.prototype.forEach.call( x, fn, context ) } : null
	exports.some		= Array.prototype.some        ? function( x, fn, context ) { return Array.prototype.some.call   ( x, fn, context ) } : null
	exports.every		= Array.prototype.every       ? function( x, fn, context ) { return Array.prototype.every.call  ( x, fn, context ) } : null
	exports.map			= Array.prototype.map         ? function( x, fn, context ) { return Array.prototype.map.call    ( x, fn, context ) } : null
	exports.filter		= Array.prototype.filter      ? function( x, fn, context ) { return Array.prototype.filter.call ( x, fn, context ) } : null
	exports.reduce		= Array.prototype.reduce      ? function( x, fn   ) { return Array.prototype.reduce.call     ( x, fn   ) } : null
	exports.reduceRight	= Array.prototype.reduceRight ? function( x, fn   ) { return Array.prototype.reduceRight.call( x, fn   ) } : null

	exports.push		= Array.prototype.push        ? function( x, item  ) { return Array.prototype.push.call       ( x, item )  } : null // TODO item_s
	exports.pop			= Array.prototype.pop         ? function( x        ) { return Array.prototype.pop.call        ( x       )  } : null
	exports.reverse		= Array.prototype.reverse     ? function( x        ) { return Array.prototype.reverse.call    ( x       )  } : null
	exports.sort		= Array.prototype.sort        ? function( x, fn    ) { return Array.prototype.sort.call       ( x, fn   )  } : null
	exports.indexOf		= Array.prototype.indexOf     ? function( x, item  ) { return Array.prototype.indexOf.call    ( x, item )  } : null
	exports.lastIndexOf	= Array.prototype.lastIndexOf ? function( x, item  ) { return Array.prototype.lastIndexOf.call( x, item )  } : null
	exports.join		= Array.prototype.join        ? function( x, item  ) { return Array.prototype.join.call       ( x, item )  } : null
	exports.slice		= Array.prototype.slice       ? function( x, i, I  ) { return Array.prototype.slice.call      ( x, i, I )  } : null
	exports.shift		= Array.prototype.shift		  ? function( x        ) { return Array.prototype.shift.call      ( x       )  } : null
	exports.unshift     = Array.prototype.unshift     ? function( x, items ) { return Array.prototype.unshift.apply   ( x, items ) } : null
	exports.concat      = Array.prototype.concat 	  ? function( x, items ) { return Array.prototype.concat.apply    ( x, items ) } : null
	exports.splice      = Array.prototype.splice      ? function( x, i, n, items ) 
	{ 
		var array = Array.prototype.splice.call( x, i, n ) // 1st remove
	return items ? exports.unshift( array, items ) : array // then add
	} : null
	exports.charAt			   = String.prototype.charAt      ? function( x, item ) { return String.prototype.charAt.call     ( x, item ) } : null
	exports.charCodeAt		   = String.prototype.charCodeAt  ? function( x, item ) { return String.prototype.charCodeAt.call ( x, item ) } : null
	exports.toLowerCase	       = String.prototype.toLowerCase ? function( x       ) { return String.prototype.toLowerCase.call( x       ) } : null
	exports.toUpperCase		   = String.prototype.toUpperCase ? function( x       ) { return String.prototype.toUpperCase.call( x       ) } : null
	exports.replace			   = String.prototype.replace	  ? function( x, s, S ) { return String.prototype.replace.call    ( x, s, S ) } : null
	exports.substr			   = String.prototype.substr	  ? function( x, i, L ) { return String.prototype.substr.call     ( x, i, L ) } : null
	exports.substring		   = String.prototype.substring	  ? function( x, a, b ) { return String.prototype.substring.call  ( x, a, b ) } : null
	exports.search             = String.prototype.search      ? function( x, item ) { return String.prototype.search.call     ( x, item ) } : null
	exports.split              = String.prototype.split		  ? function( x, s, l ) { return String.prototype.split.call      ( x, s, l ) } : null
	exports.String_indexOf     = String.prototype.indexOf     ? function( x, item ) { return String.prototype.indexOf.call    ( x, item ) } : null
	exports.String_lastIndexOf = String.prototype.lastIndexOf ? function( x, item ) { return String.prototype.lastIndexOf.call( x, item ) } : null
	exports.String_slice	   = String.prototype.slice       ? function( x, i, I ) { return String.prototype.slice.call      ( x, i, I ) } : null
	exports.match              = String.prototype.match		  ? function( x, item ) { return String.prototype.match.call      ( x, item ) } : null

	exports.toString	   = Object.prototype.toString       ? function( x       ) { return Object.prototype.toString.call      ( x       ) } : null
	exports.hasOwnProperty = Object.prototype.hasOwnProperty ? function( x, item ) { return Object.prototype.hasOwnProperty.call( x, item ) } : null


	function hasProperty( x, property )
	{ // this is such a native function that every instance shares, that is easier to ask for forgiveness
		try
		{
			if ( exports.hasOwnProperty( x, property ) )
			{
	return true
			}
		}catch(err) {}
		try
		{ // TODO even with try/catch TiObjects explodes!
	return ( property in x )
		}catch(err) {}
	return null
	}exports.hasProperty = exports.hasattr = exports.has = hasProperty // exports.has in honor of underscore _.has(obj, prop)


	function hasEnumerables(x)
	{
		for ( var property in x )
		{// we just need 1
	return true
		}
	return false
	}exports.hasEnumerables = exports.hasAnyEnumerable = hasEnumerables


// NOT TO BE CONFUSED WITH propertyIsEnumerable, since it also check's for 'own'. hasKey?
	exports.hasEnumerable = exports.isEnumerable = /* TODO exports.getOwnPropertyDescriptor ?
		function( x, item ) { return exports.has(x, item) ? exports.getOwnPropertyDescriptor( x, item ).enumerable : null } : 
*/
		function( x, item )
		{
			for ( var property in x ) 
			{ 
				if ( property === item ) 
				{ 
		return true 
				}
			}
		return false
		}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable
	exports.propertyIsEnumerable = Object.prototype.propertyIsEnumerable ? 
		function(x, item) { return exports.has(x, item) ? Object.prototype.propertyIsEnumerable.call( x, item ) : null } :
		function(x, item) { return exports.has(x, item) ? ( exports.hasOwnProperty( x, item )  && exports.hasEnumerable( x, item ) ) : null }


	exports.is = Object.is || function( x, y ) 
	{
    if ( x === 0 && y === 0 ) { return 1/x === 1/y } // -Infinity != Infinity, ergo -0 != 0
    if ( x !== x && y !== y ) { return true } // NaN: not reflexive
	    					    return x === y
  	}


	function enumerate(x)
	{// we don't call them 'properties' as getOwnPropertyNames include some not enumerable
		var results = []
		for ( var property in x ){ results[results.length] = property }
	return results
	}exports.enumerate = enumerate


	exports.keys = Object.keys || function(x)
	{
		var results = []
		for ( var property in x ){ if ( exports.hasOwnProperty( x, property ) ) { results[results.length] = property }}
	return results
	}

	exports.getOwnPropertyNames = Object.getOwnPropertyNames || exports.keys // + self? TODO is there another way to do introspection ?


	function traits(x)
	{// only inherited properties, contrary to keys
		var results = []
		for ( var property in x ){ if ( !exports.hasOwnProperty( x, property ) ) { results[results.length] = property }}
	return results
	}exports.traits = traits


// ***** IDEPOTENT suscriptor functions *****

	function get( obj, item )
	{
		try
		{ 
	return obj[item] 
		}catch(err) {}
	return undefined
	}exports.get = exports.item_get = exports.item = exports.getItem = get


	function set( obj, item, value )
	{
		try
		{
			obj[item] = value
		}catch(err){}
	return exports.item_get( obj, item )
	}exports.set = exports.item_set = exports.setItem = set


	function setdefault( obj, item, value )
	{
		if ( !exports.has(obj, item) )
			exports.item_set( obj, item, value )
	return  exports.item_get( obj, item )
	}exports.setdefault = exports.item_setdefault = setdefault


	function del( x, item )
	{
		try
		{
			x[item] = undefined // in case the below fails for being immutable
delete      x[item]
		}catch(err){}
	return exports.item_get( x, item )
	}exports.del = exports.item_delete = del


	function hasKeys(x)
	{
		for ( var property in x )
			if( exports.hasOwnProperty( x, property ) )
			{// we just want to know if it has at least 1 key so we can differenciate it from the other types of objects!
	return true
			}
	// implicit else
	return false
	}exports.hasKeys = exports.hasAnyKey = hasKeys

// we could say exports.hasKey = exports.propertyIsEnumerable BUT the vague name indicates it could behave differently in other environments. This is about same behaviour
	function hasKey( x, key ){ return exports.has(x, key) ? ( exports.propertyIsEnumerable(x, key) && exports.hasOwnProperty(x, key) ) : null }
	 exports.hasKey = hasKey

	function hasTrait( x, property ) { return exports.has(x, property) ? !exports.hasOwnProperty(x, property) : null }
	 exports.hasTrait = exports.hasInheritedProperty = exports.hasPropertyInherited = hasTrait

	function hasTraits(x)
	{
		for ( var property in x )
			if ( exports.hasTrait( x, property ) )
			{
	return true
			}
	// implicit else
	return false
	}exports.hasTraits = exports.hasAnyTrait = exports.hasInheritedProperties = hasTraits


	function walk( x, fn )
	{
		var result = []
		var obj    = x
		do
		{
			result[result.length] = fn(obj)
			obj = exports.getPrototypeOf(obj)
		}while(obj)
	return result
	}exports.walk = walk


	exports.parse = {
		string: String,
		Date_ : exports.parseDate,
		Int   : exports.parseInt,
		Float : exports.parseFloat,
		JSON  : exports.parseJSON }

	exports.index = {
		array : {first:exports.indexOf       , last:exports.lastIndexOf},
		string: {first:exports.String_indexOf, last:exports.String_lastIndexOf }}


logger.info( 'native', exports )
