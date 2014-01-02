Ti.include('/src/code/towel/include.js');
var compare      = TT.require(TT.Module.Compare)
var validate     = TT.require(TT.Module.Validate)
var suscriptible = TT.require(TT.Module.Suscriptible)
var sequence     = TT.require(TT.Module.Sequence)
var string       = TT.require(TT.Module.Str)

// TODO split into dictionary and instance

exports.traits = builtin.traits
exports.keys = builtin.keys
exports.key_get = exports.getKey = exports.key = builtin.evaluate
exports.own = exports.getOwnPropertyNames = builtin.getOwnPropertyNames
exports.enumerate = builtin.enumerate
exports.get = compare.valueByProperty
exports.set = builtin.set
exports.setdefault = builtin.setdefault
exports.setItemAsValue = suscriptible.setItemAsValue
exports.deleteProperty = exports.property_delete = suscriptible.del


	var ALL = exports.ALL = new Number(100) // as in 100%

	var Scope = exports.Scope = {
			All       : exports.ALL, 
			Self      :   3, // 1 + 2 = 3, say wha? 'self' borrowed from python
			Own       :   2, // own enumerable (keys) and non enumerable
			Keys      :   1, // own + enumerable
			Enumerable:   0, // 1 + -1 = 0, w00t? Keys And Traits
			Traits    :  -1 }

	var Mutability = exports.Mutability = {
			None     :  0,
			Extension: -1,
			Seal     : -2,
			Freeze   : -3 }

	var API = exports.API = {
			All       : {level: exports.ALL, fn: compare.itsFalse },
			NoConflict: {level:  1, fn: function(x) { return (   (  string.startsWith( x, '$' )  ||  string.endsWith( x, '_' )  )   &&   !string.startsWith( x, '_' )   ) }},
			Public    : {level:  0, fn: function(x) { return !string.startsWith( x, '_' ) }},
			Private   : {level: -1, fn: function(x) { return (  string.startsWith( x, '_'  )  &&  !string.startsWith( x, '__' )  )}},
			Secret    : {level: -2, fn: function(x) { return (  string.startsWith( x, '__' )  &&  !string.endsWith  ( x, '__' )  )}},
			Special   : {level: -3, fn: function(x) { return (  string.startsWith( x, '__' )  &&   string.endsWith  ( x, '__' )  )}}}


	function immutability( x, level )
	{
validate.isInstance( x, 'dictionary.immutability.x is False for isInstance' )
validate.isNothingOrFn( level , compare.isNumber, 'dictionary.immutability.level is False for isNumber' )
		switch(level)
		{
// Instructions																Add Key		Mod Key		Mod Value
case exports.Mutability.Extension: builtin.preventExtensions(x); break // 		N			Y			Y
case exports.Mutability.Seal     : builtin.seal             (x); break // 		N			N			Y
case exports.Mutability.Freeze   : builtin.freeze           (x); break //		N			N			N
		}
	return x
	}exports.immutability = immutability


	function self(x)
	{
validate.isInstance( x, 'dictionary.self.x is False for isInstance' )
	return sequence.without( builtin.getOwnPropertyNames(x), builtin.keys(x) )
	}exports.self = self


	function describe(x)
	{
validate.isInstance( x, 'dictionary.describe.x is False for isInstance' )
	return sequence.unique(  sequence.concat( builtin.enumerate(x), builtin.getOwnPropertyNames(x) )  )
	}exports.describe = exports.dir = exports.getAllPropertyNames = describe


	function heritage( x, precision )
	{
validate.isInstance( x, 'dictionary.heritage.x is False for isInstance' )
validate.isNothingOrFn( precision , compare.isBoolean, 'dictionary.until.precision is False for isBoolean' )
		var fn = compare.defaultBoolean(precision, true) ? exports.own : exports.self
	return builtin.walk( x, function(obj) { return [ compare.typeName(obj), fn(obj) ] } )
	}exports.heritage = heritage


	function until( x, fn_s, context )
	{
validate.isInstance( x, 'dictionary.until.x is False for isInstance' )
validate.isNothingOrFn( target , compare.isInstance, 'dictionary.until.target   is False for isInstance' )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.until.context  is False for isInstance' )

		if ( compare.isFunction(fn_s) )
		{// fnKeys and fnTraits are the same, let's skip the 'if's
			var iteration = suscriptible.iterator( x, fn_s, context )
			for ( var property in x ) 
				if ( iteration(property) )
				{
	return property
				}
		}
		else
		{
			var fns      = compare.defaultDictionary(fn_s)
			var iterator = {}
			if ( compare.isFunction(fns.keys) )   { iterator.keys   = suscriptible.iterator( x, fns.keys  , context ) }
			if ( compare.isFunction(fns.traits) ) { iterator.traits = suscriptible.iterator( x, fns.traits, context ) }
			if ( compare.isFunction(iterator.keys) && compare.isFunction(iterator.traits) )
			{
				for ( var property in x )
				{
					var iteration = builtin.hasOwnProperty( x, property ) ? iterator.keys : iterator.traits 
					if ( iteration(property) )
					{
	return property
					}
				}
			}
			else
			{
				for ( var property in x )
				{
					var iteration = builtin.hasOwnProperty( x, property ) ? iterator.keys : iterator.traits 
					if ( compare.isFunction(iteration) )
						if ( iteration(property) )
						{
	return property
						}
				}
			}
		}
	return undefined
	}exports.until = until


	function traverse( x, fn_s, target, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn_s       = attributes.callback
			var target     = attributes.target
			var context    = attributes.context
		}
validate.isInstance( x, 'dictionary.traverse.x is False for isInstance' )
validate.isNothingOrFn( target , compare.isInstance, 'dictionary.traverse.target   is False for isInstance' )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.traverse.context  is False for isInstance' )

		if ( compare.isFunction(fn_s) )
		{// fnKeys and fnTraits are the same, let's skip the 'if's
			var iteration = suscriptible.iterator( x, fn_s, context )
			if ( compare.isInstance(target) )
			{ // target expected
				for ( var property in x ) 
					target[property] = iteration(property) 
	return 			target 
			}
			else
			{ // no target expected
				for ( var property in x ) 
					iteration(property)
			}
		}
		else
		{
			var fns      = compare.defaultDictionary(fn_s)
			var iterator = {}
			if ( compare.isFunction(fns.keys  ) ) { iterator.keys   = suscriptible.iterator( x, fns.keys  , context ) }
			if ( compare.isFunction(fns.traits) ) { iterator.traits = suscriptible.iterator( x, fns.traits, context ) }

			if ( compare.isInstance(target) )
			{
				if ( compare.isFunction(iterator.keys) && compare.isFunction(iterator.traits) )
				{
					for ( var property in x )
						target[property] = builtin.hasOwnProperty( x, property ) ? iterator.keys(property) : iterator.traits(property) // it's established that property is in x (since the 'for'). We just need to know if it's a key
				}
				else
				{
					for ( var property in x )
					{  
						var iteration = builtin.hasOwnProperty( x, property ) ? iterator.keys : iterator.traits // it's established that property is in x (since the 'for'). We just need to know if it's a key
						if ( compare.isFunction(iteration) )
							target[property] = iteration(property)
					}
				}
	return target
			}
			// implicit else
			if ( compare.isFunction(iterator.keys) && compare.isFunction(iterator.traits) )
			{
				for ( var property in x )
					builtin.hasOwnProperty( x, property ) ? iterator.keys(property) : iterator.traits(property) 
			}
			else
			{
				for ( var property in x )
				{
					var iteration = builtin.hasOwnProperty( x, property ) ? iterator.keys : iterator.traits 
					if ( compare.isFunction(iteration) )
						iteration(property)
				}
			}
		}
	// no return
	}exports.traverse = traverse


	function process( x, fn, target, scope, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var target     = attributes.target
			var scope      = attributes.scope
			var context    = attributes.context
		}
validate.isInstance( x, 'dictionary.process.x is False for isInstance' )
validate.isNothingOrFn( fn     , compare.isFunction, 'dictionary.process.fn      is False for isFunction' )
validate.isNothingOrFn( target , compare.isInstance, 'dictionary.process.target  is False for isInstance' )
validate.isNothingOrFn( scope  , compare.isInt     , 'dictionary.process.scope   is False for isInt'      )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.process.context is False for isInstance' )
		var scope = compare.defaultNumber( scope, exports.Scope.Keys )
		var fn    = compare.defaultFunction(fn)
		if ( scope >= exports.Scope.Own )
		{
			var properties = null
			switch(scope)
			{
				case exports.Scope.Own : properties = exports.own     (x); break
				case exports.Scope.Self: properties = exports.self    (x); break
				case exports.Scope.All : properties = exports.describe(x); break
			}
	return sequence.process({object:properties, target:target, callback:suscriptible.iterator( x, fn, context )})
		}
	// implicit else
		var fns = compare.isValue( scope, exports.Scope.Enumerable ) ? fn : {
				keys  : ( scope >= exports.Scope.Enumerable ) ? fn : null,
				traits: ( scope <= exports.Scope.Enumerable ) ? fn : null }
	return exports.traverse( x, fns, target, context )
	}exports.process = process


	function subset( x, fn, scope, context )
	{// subdictionary
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var scope      = attributes.scope
			var context    = attributes.context
		}
validate.isInstance( x, 'dictionary.subset.x is False for isInstance' )
validate.isNothingOrFn( fn     , compare.isFunction, 'dictionary.subset.fn      is False for isFunction' )
validate.isNothingOrFn( scope  , compare.isInt     , 'dictionary.subset.scope   is False for isInt'      )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.subset.context is False for isInstance' )
		var iterable = suscriptible.iterator( x, fn, context )
		var target   = {}
		exports.process({object:x, scope:scope, context:context, callback:function( value, property ){ if ( iterable(property) ) { target[property] = value }}})
	return target
	}exports.subset = exports.filter = subset


	function parse( x, fn, target, scope, context )
	{// it will return something
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var target     = attributes.target
			var scope      = attributes.scope
			var context    = attributes.context
		}
validate.isInstance( x, 'dictionary.parse.x is False for isInstance' )
validate.isNothingOrFn( fn     , compare.isFunction, 'dictionary.parse.fn      is False for isFunction' )
validate.isNothingOrFn( target , compare.isInstance, 'dictionary.parse.target  is False for isInstance' )
validate.isNothingOrFn( scope  , compare.isInt     , 'dictionary.parse.scope   is False for isInt'      )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.parse.context is False for isInstance' )
	return exports.process( x, fn, compare.defaultDictionary(target), scope, context )
	}exports.parse = parse


	function transform( x, fns )
	{
validate.isInstance  ( x  , 'dictionary.transform.x   is False for isInstance'   )
validate.isDictionary( fns, 'dictionary.transform.fns is False for isDictionary' )
		exports.process( fns, function( fn, property ) { if ( property in x ) { x[property] = fn( x[property] ) }})
	return x
	}exports.transform = transform


	function copy( x, scope )
	{
validate.isInstance( x, 'dictionary.copy.x is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt, 'dictionary.copy.scope is False for isInt' )
//TODO?	var defaultScope = compare.isDictionary(x) ? exports.Scope.Keys : exports.Scope.Enumerable
	return exports.process( x, compare.f, {}, scope )
	}exports.copy = copy


	function expose( x, level, scope )
	{
validate.isInstance( x, 'dictionary.expose.x is False for isInstance' )
validate.isNothingOrFn( level, compare.isDictionary, 'dictionary.expose.level is False for isDictionary' )
validate.isNothingOrFn( scope, compare.isInt       , 'dictionary.expose.scope is False for isInt'        )
		var level = compare.defaultDictionary( level, exports.API.Public )
	return compare.isValue( level, exports.API.All ) ? x : exports.subset({
				object  : x, 
				scope   : scope,
				callback: function( value, property ) 
				{
					if ( level.fn(property) )
					{
				return true
					}
					var min = 0
					exports.process( exports.API, function(lvl) { if ( lvl.fn(property) ) { min = ( lvl.level < min ) ? lvl.level : min }})
				return ( min >= level.level ) 
				}} )
	}exports.expose = expose


	function each( x, fn, scope, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var scope      = attributes.scope
			var context    = attributes.context
		}
validate.isInstance( x , 'dictionary.each.x  is False for isInstance' )
validate.isFunction( fn, 'dictionary.each.fn is False for isFunction' )
validate.isNothingOrFn( scope  , compare.isInt     , 'dictionary.each.scope   is False for isInt'      )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.each.context is False for isInstance' )
	return exports.process( x, fn, null, scope, context )
	}exports.each = each


	function map( x, fn, scope, context )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var fn         = attributes.callback
			var scope      = attributes.scope
			var context    = attributes.context
		}
validate.isInstance( x, 'dictionary.map.x is False for isInstance' )
validate.isNothingOrFn( fn     , compare.isFunction, 'dictionary.map.fn      is False for isFunction' )
validate.isNothingOrFn( scope  , compare.isInt     , 'dictionary.map.scope   is False for isInt'      )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.map.context is False for isInstance' )
		var results   = []
		var iteration = suscriptible.iterator( x, fn, context )
		exports.process(
			x, 
			function( value, property ) { sequence.append( iteration(property), results ) },
			null,
			scope, 
			context )
	return results
	}exports.map = map


	function extend( dst, src_s, scope )
	{
validate.isNothingOrFn( dst  , compare.isInstance, 'dictionary.extend.dst   is False for isInstance' )
validate.isNothingOrFn( src_s, compare.isInstance, 'dictionary.extend.src_s is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt     , 'dictionary.extend.scope is False for isInt'      )
		var dst = compare.defaultDictionary(dst)
		sequence.each( sequence.toList(src_s), function(src) 
		{ 
			exports.process( 
				compare.defaultDictionary(src),
				function( value, key, old ){ suscriptible.setdefault( dst, key, old[key] ) },
				null, // set by reference ^^
				scope ) 
		} )
	return dst
	}exports.extend = exports.defaults = extend


	function defaults( dst, src_s, scope )
	{
validate.isNothingOrFn( dst  , compare.isInstance, 'dictionary.defaults.dst   is False for isInstance' )
validate.isNothingOrFn( src_s, compare.isInstance, 'dictionary.defaults.src_s is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt     , 'dictionary.defaults.scope is False for isInt'      )
		var dst = compare.defaultDictionary(dst)
		sequence.each( sequence.toList(src_s), function(src) 
		{ 
			exports.process( 
				compare.defaultDictionary(src), 
				function( value, key, old ){ return compare.defaultToValue( dst[key], old[key] ) },
				dst, 
				scope ) 
		} )
	return dst
	}exports.defaults = exports.defaultTo = defaults


	function update( dst, src_s, scope )
	{// similar to python's dict.update(src)
validate.isNothingOrFn( dst  , compare.isInstance, 'dictionary.update.dst   is False for isInstance' )
validate.isNothingOrFn( src_s, compare.isInstance, 'dictionary.update.src_s is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt     , 'dictionary.update.scope is False for isInt'      )
		var dst = compare.defaultDictionary(dst)
		sequence.each( sequence.toList(src_s), function(dict){ exports.process( compare.defaultDictionary(dict), null, dst, scope ) } )
	return dst
	}exports.update = update


	function inspect(x)
	{
validate.isInstance( x, 'dictionary.inspect.x is False for isInstance' )
		var results = {self:[], keys:[], traits:[]}
		for ( var property in x )
		{
			if ( builtin.hasOwnProperty(x, property) ) { sequence.append( property, results.keys   ) }
			else 									   { sequence.append( property, results.traits ) }
		}
		   results.self = sequence.without( builtin.getOwnPropertyNames(x), results.keys )
	return results
	}exports.inspect = inspect


	function properties(x, scope)
	{
validate.isInstance( x, 'dict.properties.x is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt, 'dict.properties.scope is False for isInt' )
	return exports.map( x, function( value, property ){ return property }, compare.defaultNumber( scope, exports.Scope.Enumerable )  )
	}exports.properties = properties


	function values(x, order)
	{
validate.isInstance( x, 'dict.keys.x is False for isInstance' )
validate.isNothingOrFn( order, compare.isList, 'dictionary.values.order is False for isList' )
	return compare.isList(order) ?
				exports.map( order, function(key) { return x[key] } ) :
				exports.map( x    , compare.f ) 
	}exports.values = values


	function methods( x, scope )
	{
validate.isInstance( x, 'dict.methods.x is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt, 'dict.methods.scope is False for isInt' )
// TODO 2x trip!
	return sequence.filter(  exports.properties( x, scope ),  function(property) { return compare.hasMethod( x, property ) } )
	}exports.methods = methods


	function size( x, scope )
	{
validate.isInstance( x, 'dict.size.x is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt, 'dict.size.scope is False for isInt' )
		var scopeDefault = compare.isDictionary(x) ? exports.Scope.Keys : exports.Scope.All
	return exports.map(  x,  null,  compare.defaultNumber( scope, scopeDefault )  ).length
	}exports.size = size


	function sizeOfObject(x)
	{
validate.isInstance( x, 'dict.sizeOfObject.x is False for isInstance' )
	return exports.describe(x).length
	}exports.sizeOfObject = exports.object_size = sizeOfObject


	function sizeOfDictionary(x) 
	{
validate.isDictionary( x, 'dict.sizeOfObject.x is False for isDictionary' ) 
	return builtin.keys(x).length 
	}exports.sizeOfDictionary = exports.dictionary_size = sizeOfDictionary



// ***** deleters *****
	function deleteKey( x, key )
	{
validate.isString( key, 'dictionary.deleteKey.key is False for isString' )
	return compare.hasKey( x, key ) ? suscriptible.del( x, key ) : undefined
	}exports.deleteKey = exports.key_delete = deleteKey


	function deleteTrait( x, trait )
	{
validate.isString( trait, 'dictionary.deleteTrait.trait is False for isString' )
	return compare.hasTrait( x, trait ) ? suscriptible.del( x, trait ) : undefined
	}exports.deleteTrait = exports.trait_delete = deleteTrait


	function deleteProperties( x, scope ) 
	{ 
	return exports.map( x,
		function( value, property, obj ) 
		{ 
suscriptible.del( obj, property )
		return property 
		},
		compare.defaultNumber( scope, exports.Scope.Enumerable ) ) 
	}exports.deleteProperties = exports.properties_delete = deleteProperties


	function deleteEnumerable(x) { return exports.deleteProperties( x, exports.Scope.Enumerable ) }
	 exports.deleteEnumerable = exports.enumerable_delete = deleteEnumerable

	function deleteKeys(x) { return exports.deleteProperties( x, exports.Scope.Keys ) }
	 exports.deleteKeys = exports.keys_delete = exports.clear = deleteKeys

	function deleteTraits(x) { return exports.deleteProperties( x, exports.Scope.Traits ) }
	 exports.deleteTraits = exports.traits_delete = deleteTraits
// TODO exports.emancipate rather as prototype = Object.prototype ?

	function rename( x, parser_s, scope, context )
	{
validate.isInstance( x, 'dictionary.rename.x is False for isInstance' )
validate.isTrue( (  compare.isFunction(parser_s)  ||  compare.isDictionary(parser_s)  ), 'dictionary.rename.x is False for isInstance' )
validate.isNothingOrFn( scope, compare.isInt, 'dictionary.rename.scope is False for isInt' )
		if ( compare.isFunction(parser_s) )
		{// rename all keys using the parser
			exports.process({
				object : x,
				scope  : scope,
				callback: function( value, nameOld, obj )
				{
					var nameNew  = parser_s(nameOld)
					obj[nameNew] = obj[nameOld]
					if ( !compare.areEqual( nameOld, nameNew ) )
						delete obj[nameOld]
				}})
		}
		else
		{// rename only keys in parser object
			exports.process( parser_s, 
				function( renameTo, nameOld )
				{ 
					if ( nameOld in x )
					{
						var nameNew  = compare.isFunction(renameTo) ? renameTo(nameOld) : renameTo
						  x[nameNew] = x[nameOld]
						if ( !compare.areEqual( nameOld, nameNew ) )
							delete x[nameOld]
					} 
				})
		}
	return x
	}exports.rename = rename


	function select( x, names )
	{
validate.isInstance  ( x    , 'dictionary.select.x     is False for isInstance' )
validate.isCollection( names, 'dictionary.select.names is False for isCollection' )
		var result = {}
		if ( compare.isList(names) ) // [name1, name2, name3]
			sequence.process( names, function(name) { if ( name in x ) { result[name] = x[name] } } )
		else // {nameOld1: nameNew1, nameOld2: nameNew2}
			exports.process( names, 
				function( criteria, nameOld )
				{ 
					if ( nameOld in x )
					{
						var    nameNew  = compare.isFunction(criteria) ? criteria(nameOld) : criteria
						result[nameNew] = x[nameOld]
					} 
				})
	return result
	}exports.select = exports.pick = select


	function without( x, names, scope )
	{
		if ( compare.isArgumentAttributes(arguments) )
		{
			var attributes = arguments[0]
			var x          = attributes.object
			var scope      = attributes.scope
			var context    = attributes.context
		}
validate.isInstance( x, 'dictionary.without.x is False for isInstance' )
validate.isNothingOrFn( scope  , compare.isInt     , 'dictionary.without.scope   is False for isInt'      )
validate.isNothingOrFn( context, compare.isInstance, 'dictionary.without.context is False for isInstance' )
	return exports.subset( x, function(value, property) { return (property in names) }, null, scope )
	}exports.without = exports.omit = exports.exclude = without


// ********** *UNGH* **********************************************

	function updateByFields( dst, src, fields )
	{// XXX too convenient? 
validate.isDictionary( dst   , 'dictionary.updateByFieldsdst    is False for isDictionary' )
validate.isDictionary( src   , 'dictionary.updateByFieldssrc    is False for isDictionary' )
validate.isList      ( fields, 'dictionary.updateByFieldsfields is False for isList' )
	return exports.update( dst, exports.select( src, fields ) )
	}exports.updateByFields = updateByFields
