Ti.include('/src/code/towel/include.js');
var compare      = TT.require(TT.Module.Compare);
var suscriptible = TT.require(TT.Module.Suscriptible);
var sequence     = TT.require(TT.Module.Sequence);
var dictionary   = TT.require(TT.Module.Dictionary);
var recursive    = TT.require(TT.Module.Recursive);
var string       = TT.require(TT.Module.Str);
var oop          = TT.require(TT.Module.OOP);
var dateTime     = TT.require(TT.Module.DateTime);
var assert       = TT.require(TT.Module.Assert);
var mem          = TT.require(TT.Module.Mem);
var extension    = TT.require(TT.Module.Ext);
var fs           = TT.require(TT.Module.FS);
var paths        = TT.require(TT.Module.Path);


	function Common()
	{
		this.latest_update = function(entity, ID) 
		{
			var _dates = this.dates(entity, ID)
		return _dates.updated || _dates.created
		}

		this.latest_modified = function(entity, ID) 
		{
			var _dates = this.dates(entity, ID) 
		return _dates.modified || _dates.updated || _dates.created
		}


		this.update = function( entity, ID, data ) 
		{ 
assert.isSomeString( entity, 'SQLess.DB.update.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DB.update.ID     is False for isNotNothing' )
assert.isDictionary( data  , 'SQLess.DB.update.data   is False for isDictionaryOnly' )
			var previous = this.get(entity, ID)
			var current  = dictionary.update(previous, data)
		return this.set( entity, ID, current )
		}
	}


	function DB( DBname, DBfolder, ext )
	{// This class will handle JSON storing and retrieval
assert.isNothingOrFn( DBname,   compare.isString, 'SQLess.DBname   is False for isString' )
assert.isNothingOrFn( DBfolder, compare.isString, 'SQLess.DBfolder is False for isString' )
assert.isNothingOrFn( ext     , compare.isString, 'SQLess.ext      is False for isString' )

		var DBfolder = compare.defaultToValue( DBfolder, paths.Path.DB      )
		var DBname   = compare.defaultToValue( DBname  , 'SQLessDB'         )
		var ext      = compare.defaultToValue( ext     , extension.Ext.JSON )
		var location = [DBfolder, DBname]
		var fields   = {dates:'dates', data:'value'} // TODO move to Common?
		var cache    = {}
logger.info(  string.format( 'SQLess.DB[%s] @ %s', DBname, DBfolder )  )


		this.dates = function(entity, ID)
		{
assert.isSomeString( entity, 'SQLess.DB.dates.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DB.dates.ID     is False for isNotNothing' )
		return compare.defaultDictionary( this.get(entity, ID, {meta:true, all:true}) )[fields.dates]
		}
 

 		this.path = function(entity) 
 		{// employee.js
assert.isSomeString( entity, 'SQLess.DB.path.entity is False for isSomeString' ) 
 		return sequence.concat( location, fs.ensureHasExtension( entity, ext ) ) 
 		}


	 	this.file = function(entity)
		{
assert.isSomeString( entity, 'SQLess.DB.file.entity is False for isSomeString' )
			var  p = this.path(entity)
			var oF = paths.path_file_RoN(p) // ensures that folder exists before trying read/write
logger.debug(  string.format( 'SQLess.%s.%s @ %s', DBname, entity, fs.location(oF) ),  p  )
		return  oF
		}


		this.write = function(entity, data)
		{
assert.isSomeString( entity, 'SQLess.DB.write.entity is False for isSomeString' )
assert.isDictionary( data  , 'SQLess.DB.write.data   is False for isDictionary' )
assert.isJSONable  ( data  , 'SQLess.DB.write.data   is False for isJSONable'   )
logger.debug(  string.format( 'SQLess.%s.%s.write', DBname, entity ),  data  )
			cache[entity] = data
		 return fs.JSON_writeAndClose( this.file(entity), data )
		 }


		this.read = function(entity)
		{
assert.isSomeString( entity, 'SQLess.DB.read.entity is False for isSomeString' )
			var data = cache[entity] || fs.JSON_readAndClose( this.file(entity) )
logger.debug(  string.format( 'SQLess.%s.%s.read', DBname, entity ),  data  )
		return dictionary.copy( compare.defaultDictionary(data) ) // we need to ensure that NO ONE will mod this "by ref"
		}


		this.IDs = function(entity)
		{ // TODO eval IDs?
assert.isSomeString( entity, 'SQLess.DB.IDs.entity is False for isSomeString' )
			var result = dictionary.keys( this.read(entity) )
logger.debug(  string.format( 'SQLess.%s.%s.IDs', DBname, entity ),  result )
		return result
		}


		this.records = function( entity, ID_s, options )
		{
assert.isSomeString( entity, 'SQLess.DB.records.entity is False for isSomeString' )
// ID_s can be anything really...
assert.isNothingOrFn( options, compare.isDictionary, 'SQLess.DB.records.options is False for isDictionary' )
			var meta = false
			var all  = false
			if (options)
			{
				meta = compare.defaultBoolean(options.meta, false)
				all  = compare.defaultBoolean(options.all , false)
			}
			var IDs    = compare.exists(ID_s) ? sequence.toList(ID_s) : this.IDs(entity) // TODO 2x trip
			var result = {}
			var data   = this.read(entity)
			sequence.each(IDs, function(ID)
			{
				if ( builtin.has(data, ID) )
				{
					var  record  = data[ID]
					var  expires = recursive.get(record, fields.dates, 'expires' )
					var  expired = expires ? dateTime.isPast(expires, true) : false 
					if ( !expired || all )
						result[ID] = meta ? record : record[fields.data]
				}
			})
logger.debug(  string.format( 'SQLess.%s.%s.records', DBname, entity ),  result  )
		return result
		}


		this.edit = function(entity, data, expires)
		{
assert.isSomeString( entity, 'SQLess.DB.edit.entity is False for isSomeString' )
assert.isDictionary( data  , 'SQLess.DB.edit.data   is False for isDictionary' )
assert.isNothingOrFn( expires, compare.isPositiveInt, 'SQLess.DB.edit.expires is False for isPositiveInt' )
			var now = new Date()
logger.info(  string.format( 'SQLess.%s.%s.edit at %s', DBname, entity, now ),  data  )
			var previous = this.read(entity)
			var save     = {}
			dictionary.each(data, function(record, ID, obj)
			{
				var prev    = compare.defaultDictionary(previous[ID])
				var curr    = obj[ID]
				var changed = (builtin.stringifyJSON(curr) != builtin.stringifyJSON(prev[fields.data]))
				var _dates  = prev[fields.dates] || {}
					_dates.created = compare.defaultDate(_dates.created, now)
				if (_dates.created != now)
				{// 2nd+ visit
					_dates.updated = now // by ref
					if (changed)
					{// TODO change for variable.hash ?
						_dates.modified = now
					}
				}
				if(expires)// data probably didn't change, but we might want to extend/reduce the expires time
					_dates.expires = dateTime.add(now, expires)
				save[ID] = {}
				save[ID][fields.data]  = curr
				save[ID][fields.dates] = _dates
			})
			var current = dictionary.update(previous, save)
	this.write(entity, current)
		return this.records( entity, dictionary.keys(data) )
		}


		this.truncate = function(entity) 
		{ 
assert.isSomeString( entity, 'SQLess.DB.truncate.entity is False for isSomeString' )
logger.warn(  string.format( 'SQLess.%s.%s.truncate', DBname, entity )  )
builtin.del(cache, entity)
		return fs.file_delete( this.path(entity) )
		}


		this.wipeOut = function()
		{// WARNING, this clears ALL DATA!!
logger.warn(  string.format( 'SQLess.%s.wipeOut', DBname )  )
mem.clobber(cache)
		return paths.remove(location)
		}


		this.set = function( entity, ID, data, expires )
		{
assert.isSomeString( entity, 'SQLess.DB.write.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DB.write.ID     is False for isNotNothing' )
assert.isJSONable( data, 'SQLess.DB.write.data is False for isJSONable' )
assert.isNothingOrFn( expires, compare.isPositiveInt, 'SQLess.DB.edit.expires is False for isPositiveInt' )
logger.debug(  string.format( 'SQLess.%s.%s.%s.set', DBname, entity, string.parse(ID) ),  data  )
			var record = suscriptible.defaults( {}, ID, data ) // {}[ID]: data
		return this.edit( entity, record )[ID]
		}


		this.unset = function( entity, ID ) 
		{ 
assert.isSomeString( entity, 'SQLess.DB.unset.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DB.unset.ID     is False for isNotNothing' )
logger.debug(  string.format( 'SQLess.%s.%s.%s.unset', DBname, entity, string.parse(ID) )  )
			if ( recursive.has( cache, entity, ID ) )
				builtin.del(cache[entity], ID)
		return this.write(  entity,  dictionary.deleteProperty(this.read(entity), ID)  ) 
		}


		this.get = function( entity, ID, options )
		{
assert.isSomeString( entity, 'SQLess.DB.get.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DB.get.ID     is False for isNotNothing' )
assert.isNothingOrFn( options, compare.isDictionary, 'SQLess.DB.get.options is False for isDictionary' )
logger.debug(  string.format( 'SQLess.%s.%s.get', DBname, entity ),  ID,  true  )
		return this.records( entity, ID, options )[ID]
		}
	}exports.DB = exports.SQLessDB = oop.inherit( DB, Common )



	function DBZ( DBname, DBfolder, ext )
	{// Yeah I like DBZ, so what?
assert.isNothingOrFn( DBname,   compare.isString, 'SQLess.DBname   is False for isString' )
assert.isNothingOrFn( DBfolder, compare.isString, 'SQLess.DBfolder is False for isString' )
assert.isNothingOrFn( ext     , compare.isString, 'SQLess.ext      is False for isString' )

		var DBfolder = compare.defaultToValue( DBfolder, paths.Path.DB      )
		var DBname   = compare.defaultToValue( DBname  , 'SQLessDBZ'        )
		var ext      = compare.defaultToValue( ext     , extension.Ext.JSON )
		var location = [DBfolder, DBname]
		var fields   = {dates:'dates'}
		var dates    = {}
logger.info(  string.format( 'SQLess.DBZ[%s] @ %s', DBname, DBfolder )  )

		this.path = function(entity) 
		{
assert.isSomeString( entity, 'SQLess.DBZ.path.entity is False for isSomeString' ) 
		return sequence.concat(location, entity) 
		}


		this.file = function(entity, ID)
		{
assert.isSomeString( entity, 'SQLess.DBZ.file.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DBZ.file.ID     is False for isNotNothing' )
			var p  = sequence.concat( this.path(entity), fs.ensureHasExtension(string.parse(ID), ext) )
			var oF = paths.path_file_RoN(p) // ensures that folder exists before trying read/write
logger.debug(  string.format( 'SQLess.%s.%s.%s @ %s', DBname, entity, string.parse(ID), fs.location(oF) ),  p  )
		return  oF	
		}


		this.dates = function(entity, ID)
		{
assert.isSomeString( entity, 'SQLess.DBZ.dates.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DBZ.dates.ID     is False for isNotNothing' )
recursive.setdefault( dates, entity, ID )
			var oF = this.file(entity, ID)
			var _dates =  {
					created : fs.date_created(oF),
					modified: fs.date_updated(oF) }
				_dates.modified = dates[entity][ID].modified || _dates.updated
		return  _dates
		}


		this.IDs = function(entity)
		{
assert.isSomeString( entity, 'SQLess.DBZ.IDs.entity is False for isSomeString' )
			var oF       = fs.folder_RoN( this.path(entity) )
			var children = compare.defaultDictionary( fs.items(oF) )
		return dictionary.map(children, function(oF, fileName) { return fs.ensureHasntExtension(fileName, ext) } )
		}


		this.truncate = function(entity) 
		{ 
assert.isSomeString( entity, 'SQLess.DBZ.truncate.entity is False for isSomeString' )
logger.warn(  string.format( 'SQLess.%s.%s.truncate', DBname, entity )  )
		return paths.remove( this.path(entity) )
		}


		this.wipeOut = function() 
	    {
logger.warn(  string.format( 'SQLess.%s.wipeOut', DBname )  )
	    return paths.remove(location) 
	    }


		this.get = function( entity, ID, meta )
		{
assert.isSomeString( entity, 'SQLess.DBZ.get.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DBZ.get.ID     is False for isNotNothing' )
assert.isNothingOrFn( meta, compare.isBoolean, 'SQLess.DBZ.records.meta is False for isBoolean' )
			var oF   = this.file(entity, ID)
			var data = compare.defaultToValue( fs.JSON_readAndClose(oF) )
			if ( compare.defaultBoolean(meta, false) )
			{
				if ( !compare.isDictionary(data) )
					data = {data:data}
				data[fields.dates] = this.dates(entity, ID)
			}
logger.debug(  string.format( 'SQLess.%s.%s.%s.read', DBname, entity, ID ),  data  )
		return data
		}


		this.records = function( entity, ID_s, meta )
		{
assert.isSomeString( entity, 'SQLess.DBZ.records.entity is False for isSomeString' )
assert.isNothingOrFn( meta, compare.isBoolean, 'SQLess.DBZ.records.meta is False for isBoolean' )
			var IDs    = compare.exists(ID_s) ? sequence.toList(ID_s) : this.IDs(entity)
			var result = {}
			sequence.each({object:IDs, context:this, callback:function(ID){ result[ID] = this.get( entity, ID, meta ) }})
		return result
		}


		this.read = function(entity)
		{
assert.isSomeString( entity, 'SQLess.DBZ.read.entity is False for isSomeString' )
		return this.records(entity) // No ID_s will return all.	
		}


		this.write = function( entity, ID, data )
		{
assert.isSomeString( entity, 'SQLess.DBZ.write.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DBZ.write.entity is False for isNotNothing' )
assert.isJSONable  ( data  , 'SQLess.DBZ.write.data   is False for isJSONable' )
logger.debug(  string.format( 'SQLess.%s.%s.write', DBname, entity ),  data  )
		return fs.JSON_writeAndClose( this.file(entity, ID), data )
		}
		 

		this.set = function( entity, ID, data )
		{
assert.isSomeString( entity, 'SQLess.DBZ.set.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DBZ.set.ID     is False for isNotNothing' )
assert.isJSONable  ( data  , 'SQLess.DBZ.set.data   is False for isJSONable' )
logger.info(  string.format( 'SQLess.%s.%s.%s.set', DBname, entity, ID ),  data  )
			var previous = this.file( entity, ID )
			var prev     = builtin.stringifyJSON(previous)
			var curr     = builtin.stringifyJSON(data)
			if (curr != prev)
			{
				var _dates = this.dates(entity, ID)
					_dates.modified = compare.now()
			}
			this.write( entity, ID, data )
		return this.get(entity, ID)
		}


		this.edit = function(entity, data)
		{
assert.isSomeString( entity, 'SQLess.DBZ.edit.entity is False for isSomeString' )
assert.isDictionary( data  , 'SQLess.DBZ.edit.data   is False for isDictionary' )
			var IDs = []
			dictionary.each({object:data, context:this, callback:function(record, ID) 
			{ 
				sequence.append( ID, IDs )
		this.set( entity, ID, compare.defaultDictionary(record) ) 
			}})
		return this.records(entity, IDs)
		}


		this.unset = function(entity, ID) 
		{
assert.isSomeString( entity, 'SQLess.DBZ.unset.entity is False for isSomeString' )
assert.isNotNothing( ID    , 'SQLess.DBZ.unset.ID     is False for isNotNothing' )
logger.info(  string.format( 'SQLess.%s.%s.%s.unset', DBname, entity, ID )  )
			if ( recursive.has( dates, entity, ID ) )
				mem.obliterate( dates[entity][ID] )
		return fs.file_delete(  this.file( entity, ID )  ) 
		}
	}exports.DBZ = exports.SQLessDBZ = oop.inherit( DBZ, Common )



//Dictionary of SQLess DataBases, for singleton use
	var DBs = exports.DBs = {}

	function DBsingleton( DBname, DBfolder, ext )
	{
assert.isNothingOrFn( DBname  , compare.isSomeString, 'DBsingleton.DBname   is False for isSomeString' )
assert.isNothingOrFn( DBfolder, compare.isString    , 'DBsingleton.DBfolder is False for isString' )
assert.isNothingOrFn( ext     , compare.isString    , 'DBsingleton.ext      is False for isString' )
		var DBname = compare.defaultToValue( DBname, 'SQLessDB' )
	return oop.singleton( exports.DBs[DBname], exports.DB, arguments, function(oDB){ exports.DBs[DBname] = oDB } ) 
	}exports.DBsingleton = exports.SQLessDBsingleton = DBsingleton


	function DBZsingleton( DBname, DBfolder, ext )
	{
assert.isNothingOrFn( DBname  , compare.isSomeString, 'DBZsingleton.DBname   is False for isSomeString' )
assert.isNothingOrFn( DBfolder, compare.isString    , 'DBZsingleton.DBfolder is False for isString' )
assert.isNothingOrFn( ext     , compare.isString    , 'DBZsingleton.ext      is False for isString' )
		var DBname = compare.defaultToValue( DBname, 'SQLessDBZ' )
	return oop.singleton( exports.DBs[DBname], exports.DBZ, arguments, function(oDB){ exports.DBs[DBname] = oDB } )
	}exports.DBZsingleton = exports.SQLessDBZsingleton = DBZsingleton


