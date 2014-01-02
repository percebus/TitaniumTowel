Ti.include('/src/code/towel/include.js');
var os         = TT.require(TT.Module.OS)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var string     = TT.require(TT.Module.Str)
var extension  = TT.require(TT.Module.Ext)
var functions  = TT.require(TT.Module.Fn)
var variable   = TT.require(TT.Module.Var)
var assert     = TT.require(TT.Module.Assert)
var mem        = TT.require(TT.Module.Mem)
var json       = TT.require(TT.Module.JSON)
var blob       = TT.require(TT.Module.BLOb)

exports.dispose = mem.dispose // TODO

	var oResources     = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory)
	var RESOURCES_PATH = oResources.resolve()
mem.dispose(oResources)
		

	var Mode = exports.Mode = {
			R: Ti.Filesystem.MODE_READ,
			A: Ti.Filesystem.MODE_APPEND,
			W: Ti.Filesystem.MODE_WRITE }

	var Char = exports.Char = {
			Separator: Ti.Filesystem.separator,
			NewLine  : '\n' }

	var Property = exports.Property = {
			Copy  : 'copy', 
			Exists: 'exists',
			Is: {
				ReadOnly: 'readonly',
				Writable: 'writable',
				Folder  : 'isDirectory',
				File    : 'isFile' },
			Create: {
				File  : 'createFile',
				Folder: 'createDirectory' },
			Path: {
				Resolve: 'resolve',
				Native : 'nativePath' },
			Get: { 
				Parent: 'getParent',
				Items : 'getDirectoryListing' },
			Dates: {
				Created:       'createTimestamp',
				Edited : 'modificationTimestamp' },
			Bytes: {
				Using    : 'size',
				Available: 'spaceAvailable' }}



	function ensureHasExtension( path, ext )
	{
	return string.ensureEndsWith   (  path, extension.ensureExtension(ext)  )
	}exports.ensureHasExtension = ensureHasExtension 

	function ensureHasntExtension( path, ext )
	{
// TODO to remove everything from last '.' by default
	return string.ensureEndsWithout(  path, extension.ensureExtension(ext)  )
	}exports.ensureHasntExtension = ensureHasntExtension 


	function path_build() // arguments
	{// not thrilled about having this here, but file needs it :(
		var input = sequence.unpack(arguments)
assert.isFileParam( input, 'fs.path_build.input is False for isFileParam' )
		if ( variable.isString(input) || variable.isTiObject(input) )
		{// it is already prepared
	return input
		}
	//implicit else
		var path     = ''
		var lastChar = ''
		sequence.each( sequence.filter(input), 
			function(folder)
			{
				if ( variable.size(folder) > 0 )
				{
					if (  	( !variable.isValue(                lastChar , exports.Char.Separator ) )  
						&&  ( !variable.isValue( string.charFirst(folder), exports.Char.Separator ) )  )
					{// We only want to add if the last car of the prev wasn't '/' nor the 1st of this one
						path += exports.Char.Separator
					}
					path     += string.toString(folder) // just in case we're creating a folder out of a number or something
					lastChar  = string.charLast(folder)
				}
			} )
logger.debug( 'FS.path_build.- ' + path, input )
	return variable.isSomething(path) ? path : null
	}exports.path_build = exports.buildPath = path_build


	function getF()// arguments
	{
		var oF = sequence.unpack(arguments)
		if ( variable.isNothing(oF) )
		{ // you can get Ti.Filesystem.getFile() ... we don't want that
	return null
		}

	// TODO mix oFolder with strings ?
		if ( variable.isTiObject(oF) )
		{// we assume its an oF already 
	return oF 
		}
		var oF = functions.fwd( Ti.Filesystem.getFile, oF )
//		var oF = Ti.Filesystem.getFile( functions.fwd( exports.path_build, arguments )  ) // XXX
logger.debug( ' > FS.get', variable.resolveProperty( oF, exports.Property.Path.Resolve ), true )
	return oF
	}exports.getF = exports.file = exports.folder = exports.get = getF


	function date_created()
	{ // TODO return int or Date?
		var oF = functions.fwd( exports.get, arguments )
		var ms = variable.resolveProperty( oF, exports.Property.Dates.Created )
	return  variable.isZero(ms) ? null : ms // let's be honest, which file is going to be created in BoT?
	}exports.date_created = exports.getDateCreated = date_created


	function date_updated()
	{ // TODO return int or Date?
		var oF = functions.fwd( exports.get, arguments )
		var ms = variable.resolveProperty( oF, exports.Property.Dates.Edited )
	return  variable.isZero(ms) ? null : ms // let's be honest, which file is going to be created in BoT?
	}exports.date_updated = exports.getDateModified = date_updated



// ****** meet the parents *****
// TODO make sure that it handles gracefully when accesed at root level
// NOTE: on iOS, getParent will return a path, wereas in android will return the object. We are simply ensuring is the same thing
	function parent()  { return exports.get( variable.resolveProperty( functions.fwd( exports.get, arguments ), exports.Property.Get.Parent ) ) }
	 exports.parent = exports.getParent = parent

// TODO what about non-existent yet?
	function path_parent()  { return exports.location( functions.fwd( exports.parent, arguments )  ) }
	 exports.path_parent = exports.getParentPath = path_parent


// ***** common tasks *****
	function exists() // arguments
	{
		var oF = functions.fwd( exports.get, arguments )
 		if (  !variable.resolveBooleanProperty( oF, exports.Property.Exists )  )
 		{
logger.debug( " ? doesn't exist")
	return null
		}
	// implicit else
	return oF  
	}exports.exists = exists


	function cloud_set( input, useBackup )
	{
assert.isFileParam( input, 'fs.cloud_set.input is False for isFileParam' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.cloud_set.useBackup is False for isBoolean' )
		var oF = exports.get(input)
		if ( os.isIOS && exports.exists(oF) )
		{// only for iCloud services
			var useBackup = variable.defaultBoolean( useBackup, false ) // we wan't to default to false so we don't get our app rejected
logger.warn( ' > setting remote storage to', useBackup, true )
oF.setRemoteBackup(useBackup) // set iTunes and iCloud backup
		}
	return oF
	}exports.cloud_set = cloud_set

	function getURI() { return variable.resolveProperty( functions.fwd( exports.get, arguments ), exports.Property.Path.Native ) }
	 exports.getURI = exports.URI = getURI

	function getPath() { return variable.resolveProperty( functions.fwd( exports.get, arguments ), exports.Property.Path.Resolve ) }
	 exports.getPath = exports.path = getPath

// These aliases are for debugging purposes
	exports.getLocation = exports.location = exports.getPath

// These aliases are for module imports. iOS likes the resolve() better than nativePath
	exports.getModule = exports.module = exports.getURI


// ***** offspring *****
	function getChildren()
	{// standard way of getting a dictionary with folderName: folderPath
		var oF = functions.fwd( exports.get, arguments )
		if ( exports.exists(oF) ) // folderExists
		{
			var newDict = {}
			sequence.each( variable.resolveProperty( oF, exports.Property.Get.Items ), function(k) { newDict[k] = exports.path_build( exports.location(oF), k ) } )
	return newDict
		}
	return null
	}exports.getChildren = exports.subF = exports.getDirectoryListing = exports.items = exports.children = getChildren


	function isNameInFolder  ( name, folder ) { return sequence.any( dictionary.keys  ( exports.items(folder) ), name ) }
	 exports.isNameInFolder = exports.isNameInDirectory = isNameInFolder

	function isObjectInFolder( f, folder )    { return sequence.any( dictionary.values( exports.items(folder) ), exports.location( exports.get(f) ) ) }
	 exports.isObjectInFolder = exports.isObjectInDirectory = isObjectInFolder

	function isInFolder      ( f, folder ) { return exports.isNameInDirectory( f, folder ) || exports.isObjectInDirectory( f, folder ) }
	 exports.isInFolder = exports.isInDirectory = isInFolder


// ***** semi-advanced comparissons *****
	function isFolder()
	{
		var oF = functions.fwd( exports.get, arguments )
	if ( !exports.exists(oF) ) 												 			 return false
	if ( variable.resolveBooleanProperty( oF, exports.Property.Is.Folder ) ) 			 return true
	if ( variable.resolveBooleanProperty( oF, exports.Property.Is.File   ) ) 			 return false
	if ( variable.isList( variable.resolveProperty( oF, exports.Property.Get.Items ) ) ) return true // if ( !!oF.getDirectoryListing() )					
	/* default */															 			 return null // this doesnt mean 'false', but rather "I don't know"
	}exports.isFolder = exports.isDirectory = isFolder


	function isFile()
	{
		var oF = functions.fwd( exports.get, arguments )
	if ( !exports.exists(oF) ) 												return false
	if ( variable.resolveBooleanProperty( oF, exports.Property.Is.File ) ) 	return true
	if ( exports.isFolder(oF) )												return false
	if ( blob.isFile( oF.read() ) )											return true // "I didn't want to do this... vell, I DID" - Mojo Jojo
	/* default */															return null 
	}exports.isFile = isFile


	function isResource() { return string.startsWith( exports.path( functions.fwd( exports.get, arguments ) ), RESOURCES_PATH ) }
	 exports.isResource = isResource


	function isWritable()
	{// saying it is readonly will prevent some actions, so unless its specified as readonly, we assume is not
		var oF = functions.fwd( exports.get, arguments )
	if ( !exports.exists    (oF) ) return false
	if (  exports.isResource(oF) ) return false // we need this since the emulator can write, but the device can't
								   return variable.resolveBooleanProperty( oF, exports.Property.Is.Writable )
	}exports.isWritable = isWritable


	function isReadOnly() // arguments
	{// is Writable is more supported, so...
		var oF = functions.fwd( exports.get, arguments )
	if ( !exports.exists    (oF) ) 	return false
	if (  exports.isWritable(oF) ) 	return false
									return variable.resolveBooleanProperty( oF, exports.Property.Is.ReadOnly ) 
	}exports.isReadOnly = isReadOnly


	function canCreate() // arguments
	{
		var oParentFolder = functions.fwd( exports.parent, arguments )
	return exports.exists(oParentFolder) ? exports.isWritable(oParentFolder) : false
	}exports.canCreate = canCreate

	function canExist() // arguments
	{ 
		var oF = functions.fwd( exports.get, arguments )
	return ( !exports.exists(oF) && exports.canCreate(oF) ) 
	}exports.canExist = canExist

	function canBeFolder() 
	{ 
		var oF = functions.fwd( exports.get, arguments )
	return ( exports.isFolder(oF) || exports.canExist(oF) ) 
	}exports.canBeFolder = canBeFolder

	function canBeFile() 
	{ 
		var oF = functions.fwd( exports.get, arguments )
	return ( exports.isFile(oF) || exports.canExist(oF) ) 
	}exports.canBeFile = canBeFile


	function getBytes() // arguments
	{//in the docs, it says is not supported for iOS, so we create this layer JIC
		var oF = functions.fwd( exports.get, arguments )
		if ( exports.exists(oF) )
		{
			var size_ = variable.defaultToValue(  variable.resolveProperty( oF, exports.Property.Bytes.Used ),  blob.bytes( exports.read(oF) )  )
logger.debug( ' > size', size_, true )
	return size_
		}
	return null
	}exports.getBytes = exports.bytes = exports.size = exports.getSize = getBytes


	function spaceAvailable() // arguments
	{
		var oF = functions.fwd( exports.get, arguments )
		if ( exports.exists(oF) )
		{
			var space = variable.resolveProperty( oF, exports.Property.Bytes.Available )
logger.debug( ' > space', space )
	return space
		}
	return null
	}exports.spaceAvailable = spaceAvailable


	function fitsInSpace( dst, input )
	{
assert.isFileParam( dst, 'fs.fitsInSpace.dst is False for isFileParam' )
		var bytes = variable.isPositiveInt(input) ? input : exports.bytes(input)
		var space = exports.spaceAvailable(dst)
	return  ( variable.isPositiveInt(bytes) && variable.isPositiveInt(space) ) ? ( space > bytes ) : null
	}exports.fitsInSpace = fitsInSpace


	function canCopy( src, dst )
	{
assert.isFileParam( src, 'fs.canCopy.src is False for isFileParam' )
assert.isFileParam( dst, 'fs.canCopy.dst is False for isFileParam' )
		var oF    = exports.get(src) 
		var oFnew = exports.get(dst)
	return exports.exists(oF) ? variable.defaultBoolean(  exports.fitsInSpace( oFnew, oF ), true ) : false 
	}exports.canCopy = canCopy


// ***** create *****
	function file_touch() // arguments
	{
		var oF = functions.fwd( exports.get, arguments )
		if ( !exports.exists(oF) )
		{
logger.info( ' > file doesnt exist, touching...', exports.location(oF), true )
			if ( !exports.canCreate(oF) )
			{
logger.error( " ! Can't touch in this location", exports.URI(oF), true )
	return null
			}

			if ( !oF.write( '', true ) ) //touched (we use append just in case the file DID exist and had something there)
			{// append test
logger.error( ' ! file could not be touched', exports.URI(oF), true )
			}
		}
	return exports.exists(oF)
	}exports.file_touch = exports.touchFile = file_touch


	function file_create() // arguments
	{
		var oF = functions.fwd( exports.get, arguments )
		if ( !exports.exists(oF) )
		{
logger.info( ' > file doesnt exist, creating...', exports.location(oF), true )
			if ( !exports.canCreate(oF) )
			{
logger.error( " ! Can't create in this location", exports.URI(oF), true )
	return null
			}

			if ( !variable.resolveBooleanProperty( oF, exports.Property.Create.File ) )
			{// only works on iOS
logger.error( ' ! file could not be created', exports.URI(oF), true )
exports.file_ouch(oF) // XXX ?
			}
		}
	return exports.exists(oF)
	}exports.file_create = exports.createFile = file_create


// TODO does remoteBackup apply for folders as well?
	function folder_create() // arguments
	{
		var oF = functions.fwd( exports.get, arguments )
logger.info( 'FS.folder.RoN @', exports.location(oF), true )
		if ( !exports.exists(oF) )
		{
logger.warn( ' ? folder doesnt exist, creating...', exports.location(oF), true )
			if ( !exports.canCreate(oF) )
			{
logger.error( " ! Can't create in this location", exports.URI(oF), true )
	return null
			}

			if ( !variable.resolveBooleanProperty( oF, exports.Property.Create.Folder ) )
			{
logger.error( ' ! folder could not be created', exports.URI(oF), true )
			}
		}
	return exports.exists(oF)
	}exports.folder_create = exports.createFolder = folder_create


// ***** Read Or New *****
	function file_RoN( input, useBackup )
	{
assert.isFileParam( input, 'fs.file_RoN.input is False for isFileParam' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.file_RoN.useBackup is False for isBoolean' )
		var oF = exports.get(input)
logger.info( 'FS.file.RoN @', exports.location(oF), true )
		if ( !exports.exists(oF) )
		{// We create it 1st, so we can set up the useBackup (only works in already existing files)
logger.warn( ' > file doesnt exist, setting up', exports.location(oF), true )
exports.file_create(oF)
		}
	return exports.exists( exports.cloud_set( oF, useBackup ) )
	}exports.file_RoN = exports.readOrNewFile = file_RoN


	function folder_RoN( input, useBackup )
	{
assert.isFileParam( input, 'fs.folder_RoN.input is False for isFileParam' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.folder_RoN.useBackup is False for isBoolean' )
		var oF = exports.get(input)
logger.info( 'FS.folder.RoN @', exports.location(oF), true )
		if ( !exports.exists(oF) )
		{// We create it 1st, so we can set up the useBackup (only works in already existing files)
logger.warn( ' > folder doesnt exist, setting up', exports.location(oF), true )
exports.folder_create(oF)
		}
	return exports.exists( exports.cloud_set( oF, useBackup ) )
	}exports.folder_RoN = exports.readOrNewFolder = folder_RoN


// ***** deletes *****
	function file_delete() // args
	{
		var args = sequence.listToArray(arguments)
logger.warn( 'FS.file.delete', args )
		var oF = functions.fwd( exports.get, args )
		if ( exports.isFile(oF) )
		{
			if ( !oF.deleteFile() )
			{
logger.error( ' ! couldnt delete file', oF )
			}
		}
		else
		{
logger.error( ' ! this is not a file' )			
		}
	return exports.exists(oF)
	}exports.file_delete = exports.deleteFile = file_delete


	function folder_delete()
	{
		var oF = functions.fwd( exports.get, arguments )
logger.warn( 'FS.folder.delete @', exports.location(oF), true )
		if ( exports.isFolder(oF) )
		{
			if ( !oF.deleteDirectory() )
			{
logger.error( ' ! couldnt delete folder', oF )
			}
		}
		else
		{
logger.error( ' ! this is not a folder' )			
		}
	return exports.exists(oF)
	}exports.folder_delete = exports.deleteFolder = folder_delete


	function remove()
	{// I don't care what it is, just get rid of it!
		var oF = functions.fwd( exports.get, arguments )
		if ( exports.exists(oF) )
		{
if ( exports.isFile  (oF) ) exports.deleteFile  (oF)
if ( exports.isFolder(oF) ) exports.deleteFolder(oF)
		}
	return exports.exists(oF)
	}exports.remove = exports.deleteF = remove


	function dispose()
	{// I don't care what it is, just get rid of it!
		var oF = functions.fwd( exports.remove, arguments )
logger.debug( 'FS.disposeF.delete @', exports.location(oF), true )
		if ( !exports.exists(oF) )
		{
mem.dispose(oF)
		}
	return exports.exists(oF)			 
	}exports.dispose = dispose


// ***** read *****
	function read() //args
	{
		var  oF = functions.fwd( exports.get, arguments )
logger.debug( 'FS.read.contents @', exports.location(oF), true )
		if ( exports.exists(oF) )
		{
			var oBLOb = oF.read()
logger.debug( ' > data', variable.hash(oBLOb), true )
	return  oBLOb		
		}
logger.warn( ' ! file does not exist', oF )
	return null
	}exports.read = exports.readFile = exports.BLOb = exports.getBLOb = read


	function read_text() //args
	{
		var oF = functions.fwd( exports.get, arguments )
logger.debug( 'FS.file.read.contents.text @', exports.location(oF) )
		if ( exports.isFile(oF) )
		{
			var oBLOb = exports.read(oF)
			if ( variable.isTiObject(oBLOb) )
			{
	return blob.text(oBLOb)
			}
logger.warn( ' ! invalid BLOb', data )
		}
	// implicit else
	return null
	}exports.read_text = exports.readText = read_text


	function readAndClose() // args
	{// input could be oF, path, array of paths, etc
		var  oF = functions.fwd( exports.get, arguments )
logger.debug( 'FS.file.readAndClose @', exports.location(oF) )
		var result = exports.readText(oF)
// TODO mem.dispose(oF)
	return result
	}exports.readAndClose = readAndClose


// ***** write *****
	function write( input, data, append, useBackup )
	{
assert.isFileParam ( input, 'fs.write.input is False for isFileParam' )
assert.isNotNothing( data , 'fs.write.data  is False for isNotNothing' )
assert.isNothingOrFn( append   , variable.isBoolean, 'fs.write.append    is False for isBoolean' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.write.useBackup is False for isBoolean' )
		var append = variable.defaultBoolean( append, false ) // TODO true or false?
		var action = append ? 'append' : 'write'
		var oF     = exports.file_RoN( input, useBackup )
logger.warn( 'FS.file.' + action + ' @', exports.location(input), true )
		if ( exports.canBeFile(oF) )
		{// this avoids trying to write to a folder
			if ( !oF.write( data, append ) ) // NOTE: append does not add \n
			{
logger.error( ' ! cannot write to file', input )
			}
		}
	return exports.exists(oF)
	}exports.write = write


	function writeAndClose( input, data, append, useBackup )
	{
assert.isFileParam ( input, 'fs.writeAndClose.input is False for isFileParam' )
assert.isNotNothing( data , 'fs.writeAndClose.data  is False for isNotNothing' )
assert.isNothingOrFn( append   , variable.isBoolean, 'fs.writeAndClose.append    is False for isBoolean' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.writeAndClose.useBackup is False for isBoolean' )
logger.debug( 'FS.file.write.text & close @', exports.location(input), true )
		var oF = exports.write( input, data, append, useBackup )
//TODO 	return mem.dispose(oF)
	}exports.writeAndClose = writeAndClose


// ***** common tasks *****
	function log( input, data, useBackup ) 
	{
assert.isFileParam ( input, 'fs.fileLog.input is False for isFileParam' )
assert.isNotNothing( data , 'fs.fileLog.data  is False for isNotNothing' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.fileLog.useBackup is False for isBoolean' ) 
	return exports.writeAndClose( input, exports.Char.NewLine + data, true, useBackup ) 
	}exports.log = exports.logInFile = log

	function JSON_readAndClose() { return json.toObject( functions.fwd(exports.readAndClose, arguments) )}
	 exports.JSON_readAndClose = JSON_readAndClose 

	function JSON_writeAndClose( input, data, useBackup )
	{ 
assert.isFileParam( input, 'fs.JSONfileWriteAndClose.input is False for isFileParam' )
assert.isJSONable ( data , 'fs.JSONfileWriteAndClose.data  is False for isJSONable' )
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.JSONfileWriteAndClose.useBackup is False for isBoolean' )
	return exports.writeAndClose( input, json.toString(data), false, useBackup ) 
	}exports.JSON_writeAndClose = JSON_writeAndClose


// ***** copies *****
	function file_copy( src, dst, append, useBackup ) 
	{ //TODO Is android's copy really better than .write(oF)?
assert.isFileParam( src, 'fs.file_copy.src is False for isFileParam' )
assert.isFileParam( dst, 'fs.file_copy.dst is False for isFileParam' )
assert.isNothingOrFn( append   , variable.isBoolean, 'fs.file_copy.append    is False for isBoolean')
assert.isNothingOrFn( useBackup, variable.isBoolean, 'fs.file_copy.useBackup is False for isBoolean')
		var oF     = exports.get(src)
		var oFnew  = exports.get(dst)
		var append = variable.defaultBoolean( append, true )
logger.warn( 'FS.file.copy to ' + dst, oF )
		if (  exports.isFile(oF)  &&  exports.canCopy( oF, oFnew )  )
		{
exports.write( oFnew, oF, append, useBackup ) // note that we dont use the BLOb but rather the FILE itself (oF)
		}
	//implicit else
	return exports.exists(oFnew)
	}exports.file_copy = exports.copyFile = file_copy


	function move( src, dst )
	{// Move and get the reference to the new file object
assert.isFileParam( src, 'fs.move.src is False for isFileParam' )
assert.isFileParam( dst, 'fs.move.dst is False for isFileParam' )
		var oF    = exports.get(src)
		var oFnew = exports.get(dst)
logger.warn( 'FS.move', sequence.listToArray(arguments) )
logger.warn( ' > from', exports.location(oF)   , true )
logger.warn( ' > to  ', exports.location(oFnew), true )
		if (  exports.canExist(oFnew)  &&  exports.canCopy( oF, oFnew )  )
		{
			if ( !oF.move( exports.location(oFnew) ) )
			{
logger.error( " ! couldn't move it", exports.location(oFnew) )
			}
		}
		else
		{
logger.error( " ! can't move it", exports.location(oFnew) )
		}
	return exports.exists(oFnew)
	}exports.move = exports.moveFile = exports.moveFolder = exports.file_move = exports.folder_move = move


	function rename( input, newName )
	{// rename only works if its on the same folder
assert.isFileParam( input  , 'fs.rename.input   is False for isFileParam' )
assert.isString   ( newName, 'fs.rename.newName is False for isString'    )
		var oF    = exports.get(input)
		var oFnew = exports.get( exports.path_parent(oF), newName )
logger.warn( 'FS.rename @ to', exports.location(oFnew) )
		if ( exports.exists(oF) && exports.canExist(oFnew) ) 
		{
			if ( !oF.rename(newName) )
			{
logger.error( " ! coudln't rename it", newName, true )
			}
		}
		else
		{
logger.error( " ! can't rename it", newName, true )
		}
	// implicit else
	return exports.exists(oFnew)
	}exports.rename = exports.renameFile = exports.renameFolder = exports.folder_rename = exports.file_rename = rename


	function file_BLOb_save( oBLOb, dst, move ) 
	{
assert.isTiObject ( oBLOb, 'fs.file_BLOb_save.oBLOb is False for isTiObject'  )
assert.isFileParam( dst  , 'fs.file_BLOb_save.dst   is False for isFileParam' )
assert.isNothingOrFn( move, variable.isBoolean, 'fs.file_BLOb_save.move is False for move' )
		var  fn = variable.defaultBoolean( move, false ) ? exports.move : exports.file_copy
		var oF  = blob.file(oBLOb)
	return exports.exists(oF) ? fn( oF, dst ) : exports.write( dst, oBLOb ) 
	}exports.file_BLOb_save = exports.saveBLObToFile = file_BLOb_save

