Ti.include('/src/code/lib/include.js')
var os        = TT.require(TT.Module.OS)
var sequence  = TT.require(TT.Module.Sequence)
var string    = TT.require(TT.Module.Str)
var fs        = TT.require(TT.Module.FS)
var functions = TT.require(TT.Module.Fn)
var variable  = TT.require(TT.Module.Var)
var assert    = TT.require(TT.Module.Assert)
var extension = TT.require(TT.Module.Ext)

exports.build  = fs.path_build
exports.parent = fs.path_parent

	var DB_extension = exports.DB_extension = (os.isIOS) ? extension.ensure(extension.Ext.SQL) : ''

	var Property = exports.Property = {
			isExternalStoragePresent: 'isExternalStoragePresent',
			Path: {
				Resources      : 'resourcesDirectory',
				Temp           : 'tempDirectory',
				Cache          : 'applicationCacheDirectory',
				Data           : 'applicationDataDirectory',
			// android
				ExternalStorage: 'externalStorageDirectory',
		// iOS
				Application    : 'applicationDirectory',
				Support        : 'applicationSupportDirectory'}}


	function resolveFilesystemProperty(x) { return variable.resolveProperty( Ti.Filesystem, x ) }
	 exports.resolveFilesystemProperty = resolveFilesystemProperty


	function fix_include( x, isRoot ) 
	{
validate.isNothingOrFn( isRoot, 'path.fix_include.isRoot is False for isBoolean' )
		if (  variable.defaultBoolean( isRoot, false )  )
			x = string.ensureStartsWith( x, fs.Char.Separator )
	return fs.ensureHasExtension( x, extension.Ext.Module )
	}exports.fix_include = fix_include

	function fix_require(x) { return fs.ensureHasntExtension(  string.ensureStartsWithout( x, fs.Char.Separator ),  extension.Ext.Module  ) }
	 exports.fix_require = fix_require


	function DB_file(dbName) { return fs.ensureHasExtension( dbName, exports.DB_extension ) }
	 exports.DB_file = exports.DBfileName = DB_file

	function build_folder()/* args */ { return  string.ensureEndsWith(  functions.fwd( fs.path_build, arguments ),  fs.Char.Separator  ) }
	 exports.build_folder = exports.buildFolderPath = build_folder


	function externalStorage() { return variable.resolveBooleanProperty( Ti.Filesystem, exports.Property.isExternalStoragePresent ) ? variable.resolveFilesystemProperty(exports.Property.Path.ExternalStorage) : null }
	 exports.externalStorage = externalStorage

	var Path = {
			Resources: exports.resolveFilesystemProperty(exports.Property.Path.Resources),
			Cache    : exports.resolveFilesystemProperty(exports.Property.Path.Cache),
			Data     : exports.resolveFilesystemProperty(exports.Property.Path.Data),
			Temp     : exports.resolveFilesystemProperty(exports.Property.Path.Temp),
		// android
			External : exports.externalStorage,// we'll call it each time
		// iOS
			App      : exports.resolveFilesystemProperty(exports.Property.Path.Application),
			Support  : exports.resolveFilesystemProperty(exports.Property.Path.Support),

			DB       : exports.DB // we'll call it each time
		}
		Path.Base = fs.path_parent(Path.Data)
		Path.Lib  = fs.path_parent(Path.Cache)
		Path.Priv = exports.build_folder( Path.Lib, 'Private%20Documents' )
		Path.DB   = Path.Priv
		Path.Docs = function() 
		{
			var path = exports.externalStorage() 
		return path ? exports.build_folder( path, 'Documents' ) : variable.resolveFilesystemProperty(exports.Property.Path.Data) 
		}
		Path.Settings = function() { return exports.path_build_folder(   sequence.firstValid(  [ Path.External, Path.Support, Path.Data ], function(path) { return variable.resolve(path) }  ),   'Settings'   ) }
	exports.Path = Path
debug.log( 'Path', exports.Path )


	function DB(dbName) { return exports.Path.DB + exports.DB_file(dbName) }
	 exports.DB = exports.DBpath = DB


// ***** path functions *****
	function path_RoN() // args
	{
		var args = sequence.listToArray(arguments)
		var  oF  = functions.fwd( fs.get, arguments )
debug.log( 'path.folder.RoN @ ', fs.location(oF), true )
		if ( fs.exists(oF) )
		{// let's not loose any more time!
	return oF
		}
	//implicit else
debug.log( " ? path doesn't exist", oF )
		var subFolder  = []
		sequence.each( sequence.unpack(args), 
			function(folder)
			{
				sequence.append( folder, subFolder ) // modify by reference
			    oF = fs.folder_RoN(subFolder) // this is what we REALLY care
			} )
	return fs.exists(oF)
	}exports.path_RoN = path_RoN


	function path_file_RoN( input, useBackup )
	{
assert.isList( input, 'path.fileRoN.input is False for isList' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'path.fileRoN.useBackup is False for isBoolean' )
		var oF = fs.get(input)
debug.log( 'path.file.RoN @ ', fs.location(input) )
		if ( fs.exists(oF) )
		{
	return oF
		}
	//implicit else
debug.log( ' ? doesnt exist', fs.location(oF), true )
		var file    = input.pop() // last one should be the file!!
		var folders = input
		if ( !fs.exists( exports.path_RoN(folders) ) )
		{ // we ensure all path exists, folder by folder
	return null
		}
		folders.push(file)
	return fs.file_RoN( folders, useBackup )
	}exports.path_file_RoN = exports.readOrNewFilePath = path_file_RoN


	function remove()// args
	{
		var args = sequence.listToArray(arguments)
debug.log( 'path.remove', args )
		var  oF = functions.fwd( fs.get, args )
		if ( fs.isFolder(oF) )
		{
oF.deleteDirectory(true) // true means recursive!
		}
	return oF
	}exports.remove = exports.deletePath = remove


/*
	function copy( src, dst )
	{
		   fs.android_copy( src, dst ) // tries to copy(android only)
	return exports.path_RoN(dst) // gets
	}exports.copy = copy
 */

//TODO move

