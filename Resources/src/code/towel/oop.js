Ti.include('/src/code/towel/include.js');
var compare    = TT.require(TT.Module.Compare);
var validate   = TT.require(TT.Module.Validate);
var sequence   = TT.require(TT.Module.Sequence);
var dictionary = TT.require(TT.Module.Dictionary);
var string     = TT.require(TT.Module.Str);
var functions  = TT.require(TT.Module.Fn);


	var GUOID = exports.GUOID = 0;
	var instances = exports.instances = {};
	var objects = exports.objects = {};


	function OID_get(obj)
	{
		var _names = [ // TODO is this order desired?
				'Oid',   // object ID 
				'Id', 
				'Uid',   // unique ID
				'Guid',  // global unique ID
				'Guoid'] // global unique object ID
		var  names = sequence.concat( _names,  sequence.map( _names, function(name) { return string.upper(name) } )  )
			 names = sequence.concat(  names,  sequence.map( _names, function(name) { return string.lower(name) } )  )
	return sequence.find( names, function(name) { return compare.resolvePrivateProperty( obj, name ) } )
	}exports.OID_get = exports.id = OID_get


	function OID_set( obj, Class, property )
	{
validate.isInstance( obj, 'OOP.OID.set.obj is False for IsInstance' )
validate.isNothingOrFn( Class   , compare.isClass     , 'OOP.OID.set.Class    is False for isClass' )
validate.isNothingOrFn( property, compare.isSomeString, 'OOP.OID.set.property is False for isSomeString' )
		if ( !sequence.any( dictionary.values(instances), obj ) )
		{
			exports.GUOID++
			var property = compare.defaultToValue( property, '_OID' )
			exports.instances[exports.GUOID] = obj
			obj[property] = exports.GUOID
			if ( compare.isClass(Class) )
			{
				exports.objects[Class]                = compare.defaultDictionary( exports.objects[Class] )  
				exports.objects[Class][exports.GUOID] = obj
			}
		}
	return obj		
	}exports.OID_set = OID_set


	function create( Class, args )
	{ // http://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
validate.isClass( Class, 'OOP.create.Class is False for is Class' )
		if ( !compare.isList(args) )
		{
	return compare.isUndefined(args) ? new Class() : new Class(args)
		}
    	function F() 
    	{// TODO NOTE does not work in native classes (ex. Date) 
    	return functions.fwd( Class, args, this ) 
    	}
    		   F.prototype = Class.prototype 
	return new F() // exports.OID_set( new F(), Class )
	}exports.create = create


	function emancipate(x)
	{
validate.isInstance( x, 'OOP.emancipate.x is False for isInstance' )
		   x.prototype = builtin.prototype_
	return x
	}exports.emancipate = emancipate


	function inherit( Class, Parent )
	{ // http://phrogz.net/JS/classes/OOPinJS2.html
validate.isClass( Class, 'OOP.inherit.Class is False for isClass' )
validate.isNothingOrFn( Parent, compare.isClassOrInstance, 'OOP.inherit.Parent is False for isClassOrInstance' )
		if ( compare.isFunction(Parent.constructor) ) 
		{ // Normal Inheritance 
			Class.prototype             = new Parent
			Class.prototype.constructor = Class
			Class.prototype.parent      = Parent.prototype
		} 
		else 
		{ // Pure Virtual Inheritance 
			Class.prototype             = Parent
			Class.prototype.constructor = Class
			Class.prototype.parent      = Parent
		}
	return Class
	}exports.inherit = inherit


	function singleton( obj, Class, args, __init__ )
	{ // TODO accept anything as obj ? string could be String('wa') or new String('wa')
validate.isClass( Class, 'OOP.singleton.Class is False for is Class' )
validate.isNothingOrFn( args    , compare.isList    , 'OOP.singleton.args is False for isList'     )
validate.isNothingOrFn( __init__, compare.isFunction, 'OOP.singleton.fn   is False for isFunction' )
		if (obj)
		{
	return obj
		}
		var oClass = exports.create( Class, args )
		if ( compare.isFunction(__init__) )
			__init__(oClass)
	return oClass
	}exports.singleton = singleton


	function Singleton( Class, args, __init__ )
	{
validate.isClass( Class, 'OOP.Singleton.Class is False for is Class' )
validate.isNothingOrFn( args    , compare.isList    , 'OOP.Singleton.args is False for isList'     )
validate.isNothingOrFn( __init__, compare.isFunction, 'OOP.Singleton.fn   is False for isFunction' )
		var instance;
		var Class = Class
		this.get = function(_args) { return exports.singleton( instance, Class, compare.defaultToValue( _args, args ), __init__ ) }
	}exports.Singleton = Singleton


	function toString( Class, name, property )
	{
validate.isClass      ( Class, 'OOP.toString.Class is False for isClass' )
validate.isSomeString ( name , 'OOP.toString.name  is False for isSomeString' )
validate.isNothingOrFn( property, compare.isSomeString, 'OOP.toString.property is False for isSomeString' )
		Class.prototype.toString = function()
		{
			var hasOID  = compare.hasProperty( Class, '_OID' )
			var hasName = compare.isSomeString(name)
		if ( hasOID && hasName ) return string.format( "[%s::%s %d]", name, this[property], this._OID )
		if (           hasName ) return string.format( "[%s::%s]"   , name, this[property]            )
		if ( hasOID            ) return string.format( "[%s %d]"    , name,                 this._OID )
		}
	return Class
	}exports.toString = toString

