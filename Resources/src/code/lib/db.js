/* // TODO under construction
Ti.include('/src/code/lib/include.js')
var variable = TT.require(TT.Module.Var)
var mem      = TT.require(TT.Module.Mem)
var fs       = TT.require(TT.Module.FS)

	function openOrInstall( dbName, path ) { return variable.isEmpty(path) ? Ti.Database.open(dbName) : Ti.Database.install( dbName, path ) }
	 exports.openOrInstall

	function SQL2JSON( oDB, SQLstring )
	{
Ti.API.info(SQLstring)
		var JSON = []
		oRS = oDB.execute(SQLstring)
		while ( oRS.isValidRecord() )
		{
			var row = {}
			for ( var iColumn = 0, IColumn = oRS.fields();  iColumn < IColumn;  iColumn++ )
			{
				var fieldName = oRS.field(iColumn)
					row[fieldName] = oRS.fieldByName(fieldName)
			}
			JSON.push(row)
		}
	return JSON
	}exports.SQL2JSON = SQL2JSON

	function queryOnce( oDB, SQLstring, dbName, path )
	{
		var oDB  = exports.openOrInstall( dbName, path )
		var JSON = exports.SQL2JSON( oDB, SQLstring )
			oDB.close()
mem.dispose(oDB)
	return JSON
	}exports.openOrInstallAndSQL2JSON = openOrInstallAndSQL2JSON
 */