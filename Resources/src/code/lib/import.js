var TT       =    require('src/code/lib/index')
var debug    = TT.require(TT.Module.Debug)
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)
var str      = TT.require(TT.Module.Str)
var path     = TT.require(TT.Module.Path)
var exports  = exports || {}

	var ImportType = {
			Once  : require,
			Always: Ti.include
		}
	exports.ImportType = ImportType


	function include( x, doAlways )
	{
validate.isSomeString( x, 'import.include is False for isSomeString' )
validate.isNothingOrFn( doAlways, compare.isBoolean, 'import.include is False for isBoolean' )
		var doAlways = compare.defaultBoolean( doAlways, false )
		var retrieve = doAlways ? ImportType.Always      : ImportType.Once
		var file     = doAlways ? path.fix_include(x) : path.fix_require(x)
// logger.debug( 'import.include >>>', file, true ) 
return retrieve(file)
	}exports.include = include


	function includeOnce(x)
	{ 
validate.isSomeString( x, 'import.includeOnce.x is False for isSomeString' )
logger.debug( 'import.require >>>', x, true )
	return exports.include( x, false ) 
	}exports.includeOnce = exports.requireOnce = exports.require = includeOnce


	function inject(x) 
	{
validate.isSomeString( x, 'import.inject.x is False for isSomeString' )
logger.debug( 'import.inject >>>', x, true ) 
	return exports.include( x, true ) 
	}exports.inject = inject


	function index(x)
	{
validate.isSomeString( x, 'import.index.x is False for isSomeString' )
logger.debug( 'import.index >>>', x, true ) 
	return exports.includeOnce( str.ensureEndsWith( x, '/index' ) )
	}exports.index = index


	function load (x)
	{
validate.isSomeString( x, 'import.load.x is False for isSomeString' )
logger.debug( 'import.load >>>', x, true )
	return exports.inject     ( str.ensureEndsWith( x, '/include' ) ) 
	}exports.load = load

