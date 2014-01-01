Ti.include('/src/code/lib/include.js')
var SDK        = TT.require(TT.Module.Titanium)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var oop        = TT.require(TT.Module.OOP)
var variable   = TT.require(TT.Module.Var)
var assert     = TT.require(TT.Module.Assert)

	var Handler = exports.Handler = SDK.Handler.Session

	var vars = exports.vars = {}
	function dispose(name) 
	{
logger.debug( 'session.' +name, 'removed', true )
delete vars[name] 
	return Handler.removeProperty(name) 
	}exports.dispose = dispose


	function clear() 
	{ 
		dictionary.each( vars, function( value, name ) { exports.dispose(name) } )
	return dictionary.clear(exports.vars) // 2x check, but it should be empty at this point
	}exports.clear = clear


	var API = {}
		API[variable.Type.Bool      ] = {get:Handler.getBool  , set:Handler.setBool}
		API[variable.Type.Float     ] = {get:Handler.getDouble, set:Handler.setDouble}
		API[variable.Type.Int       ] = {get:Handler.getInt   , set:Handler.setInt}
		API[variable.Type.Str       ] = {get:Handler.getString, set:Handler.setString}
		API[variable.Type.Array_    ] = {get:Handler.getList  , set:Handler.setList}
		API[variable.Type.Dictionary] = {}

// new in Ti 2.1.- For some reason, eventhough is not released, is not null!! O.o
//		if ( variable.hasMethod( SDK.Handler.Handler, 'getObject' ) ) API[variable.Type.Dictionary].get = Handler.getObject 
//		if ( variable.hasMethod( SDK.Handler.Handler, 'setObject' ) ) API[variable.Type.Dictionary].set = Handler.setObject
// since the ^^ above ^^  doesnt work!
		if ( SDK.Info.Release.DateTime >= SDK.Feature.Ti.App.Properties.getObject ) API[variable.Type.Dictionary].get = Handler.getObject 
		if ( SDK.Info.Release.DateTime >= SDK.Feature.Ti.App.Properties.setObject ) API[variable.Type.Dictionary].set = Handler.setObject


	function isType(x) { return builtin.hasProperty( API, x ) }
	 exports.isType = isType


	function any_set( name, value )
	{
assert.isString  ( name , 'session.any_set.name  is False for isString'   )
assert.isJSONable( value, 'session.any_set.value is False for isJSONable' )
		vars[name] = value
		if ( variable.isNothing(value) )
		{
	return exports.dispose(name)
		}
	// implicit else
		var v = [value]
logger.debug( 'session.' + name + '.set::any', v ) 
	return API[variable.Type.Array_].set( name, v )
	}exports.any_set = any_set


// So lists can store serializable JSON data... let's exploit that to store ALMOST w/e w/o asking type =D
	function any_get( name, d ) 
	{
assert.isString( name, 'session.any_get.name is False for isString' )
// Since 'v' is a default value... we can have it to be w/e we want
		var value = API[variable.Type.Array_].get(name) // ( name, v ) since we need to extract the value from the array...
logger.debug( 'session.' + name + '.get::any', value )
	return variable.isArray(value) ? sequence.unpack(value) : d
	}exports.any_get = any_get


	function Any(name)
	{
		var name = name
		this.get(d)     = function(d)     { return exports.any_get(name, d    ) }
		this.set(value) = function(value) { return exports.any_set(name, value) }
	}exports.Any = Any


	function set( name, value, type )
	{
assert.isString     ( name , 'session.set.name %s is False for isString' )
assert.isJSONable   ( value, 'session.set.value is False for isJSONable' )
assert.isNothingOrFn( type, exports.isType, 'session.set.type %s is False for isType' )
		if ( variable.isNothing(value) )
		{
	return exports.dispose(name)
		}
		var type  = variable.defaultToValue( type, variable.type(value) )
			vars[name] = type
logger.debug( 'session.' + name + '.set::' + type, sequence.listToArray(arguments) )
		var store = true // variable.isType( value, type )
		var rtrn  = null
		if (store)
		{// are we allowed to store it?
			fn = API[type] ? API[type].set : null
			fn = variable.isFunction(fn) ? fn : exports.any_set
			fn( name, value )
			rtrn = type
		}
	return rtrn
	}exports.set = set


	function get( name, v, type )
	{
assert.isString( name , 'session.get.name is False for isString' )
assert.isNothingOrFn( type, exports.isType, 'session.get.type %s is False for isType' )
		var v    = variable.defaultToValue(v) // returns null if null or undefined
		var type = variable.defaultToValue( type, variable.type(v) )
		if ( variable.isValue( type, 'null' ) )
			type = vars[name]
logger.debug( 'session.' + name + '.get::' + type, sequence.listToArray(arguments) )
		fn = API[type] ? API[type].get : null
		fn = variable.isFunction(fn) ? fn : exports.any_get
		var value = fn( name , v )
logger.debug( ' > value', value )
	return value
	}exports.get = get


	API.any  = {get:exports.any_get, set:exports.any_set}
	API.auto = {get:exports.get    , set:exports.set}
exports.API = API
logger.info( 'session.API', exports.API )



	function Var( name, v, type )
	{
		var name    = name
		var v       = v
		var type    = variable.defaultToValue( type, variable.type(v) )
		var exact   = ( variable.isNothing(v) && variable.isNothing(type) )
		var methods = exact ? exports.API.auto : exports.API.any
logger.debug( string.format('session.%s.create::%s<%s>', string.parse(name), string.parse(type), string.parse(v) ), sequence.listToArray(arguments) )

		this.get   = function(d)     { return methods.get( name, variable.defaultToValue( d, v ), type ) }
		this.set   = function(value) { return methods.set( name, value, type ) }
		this.unset = function()      { return exports.dispose(name) }
	}exports.Var = Var


	var objects = exports.objects = {}
	function VarSingleton( name, v, type )
	{
// TODO add asserts
	return oop.singleton( exports.objects[name], AppVar, arguments )
	}exports.VarSingleton = VarSingleton


	function Entity( name, d )
	{
		var  name = name
		var  d    = compare.defaultToValue(d)
		var oVar  = exports.VarSingleton( name, {}, variable.Type.Dictionary )

		this.get = function(ID){ return compare.valueByKey( oVar.get(), ID, d ) }

		this.set = function( ID, value )
		{
			var data = this.get(ID)
				data[ID] = value
		return oVar.set(data)
		}

		this.unset    = function(ID) { return this.set( ID, null ) }
		this.truncate = function() { return exports.dispose(name) }
	}exports.Entity = Entity


	function DB()
	{
		var entities = {}

		function fetch(entity){ return oop.singleton( entities[entity], Entity, entity, function(oEntity){ entities[entity] = oEntity } )}

		this.get = function( entity, ID        ){ return fetch(entity).get(ID) }
		this.set = function( entity, ID, value ){ return fetch(entity).set( ID, value ) }

		this.unset = function( entity, ID ) { return this.set( entity, ID, null ) }
		this.truncate = function(entity) 
		{ 
			delete entities[entity]
			this.get(entity).truncate()
		}

		this.wipeOut = function(){ dictionary.each( entities, function(oEntity, entity) { this.truncate(entity) } ) }
	}exports.DB = DB


	function DBZ(schema)
	{
		var schema = schema || {}
		var log    = {}

		function log_set( entity, ID )
		{
			log[entity]     = log[entity] || {}
			log[entity][ID] = compare.now()
		}

		function name_get( entity, ID ) 
		{
			log_set( entity, ID ) 
		return entity + '_' + String(ID) 
		}

		this.get      = function( entity, ID, v     ) { return exports.get( name_get( entity, ID ), v    , schema[entity] ) }
		this.set      = function( entity, ID, value ) { return exports.set( name_get( entity, ID ), value, schema[entity] ) }
		this.unset    = function( entity, ID )        { return exports.dispose( name_get( entity, ID ) ) }
		this.truncate = function(entity) { dictionary.each( log[entity], function( record, ID ){ this.unset( entity, ID ) } ) }
		this.wipeOut  = function() { dictionary.each( log, function( records, entity ) { this.truncate(entity) } ) }
	}exports.DBZ = DBZ
