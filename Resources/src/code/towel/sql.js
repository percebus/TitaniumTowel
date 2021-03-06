/* TODO under construction
Ti.include('/src/code/towel/include.js')
var iterable = TT.require(TT.Module.Iterable)


	var constants = {
		separator:  ';',
		wildcard :  '%',
		equal    :  '=',
		different: '!=',
		greater  :  '>',
		minor    :  '<',
		is       : 'IS',
		exists   : 'IF EXISTS',
		inexists : 'IF NOT EXISTS'
	}
exports.constants = constants

	var typesRS = {
		'string': Ti.Database.FIELD_TYPE_STRING,
		'double': Ti.Database.FIELD_TYPE_DOUBLE,
		'float' : Ti.Database.FIELD_TYPE_FLOAT,
		'int'   : Ti.Database.FIELD_TYPE_INT
	}
exports.typesRS = typesRS

	var typesDB = {
		'string': 'TEXT',
		'double': 'DOUBLE',
		'float' : 'FLOAT',
		'int'   : 'INT'
	}
exports.typesDB = typesDB

	function typeString(input) { return "'" + String(input) + "'" }
	 exports.typeString = typeString

	function queryString( input, wildcardLeft, wildcardRight )
	{
		var wildcardLeft  = wildcardLeft  || true
		var wildcardRight = wildcardRight || true
		var query = exports.typeString(input)
		if (wildcardLeft)  query = constants.wildcard + query
		if (wildcardRight) query =						query + constants.wildcard
	return query
	}exports.queryString = queryString

	function typeNumeric(input) { return input }
	 exports.typeNumeric = typeNumeric

	function typeDate(input) { return exports.typeString(input) }
	 exports.typeDate = typeDate

	var typesFns = {
		'string': exports.typeString,
		'double': exports.typeNumeric,
		'float' : exports.typeNumeric,
		'int'   : exports.typeNumeric
	}

	function queryList(list)
	{
		var query = ' ( '
		for ( var iList = 0, IList = list.length;
			      iList   <  IList;
			      iList++                        )
		{
			if ( iList > 1 )
				query += ', '
			query += list[iList]
		}
		query += ' ) '
	return query
	}exports.queryList = queryList

	function queryCREATE( tableName, schema )
	{
		var query = 'CREATE ' + exports.constants.inexists + ' ' + tableName
		var columns = []
		for ( column in schema )
			columns.push( column.name + ' ' + column.type )
		query += exports.queryList(columns)
	return query 
	}exports.queryCREATE = queryCREATE

	function queryDROP(tableName) { return 'DROP ' + exports.constants.exists + ' ' + tableName  }
	 exports.queryDROP = queryDROP

	function queryDELETE(tableName) { return 'DELETE FROM ' + tableName }
	 exports.queryDELETE = queryDELETE

	function queryTRUNCATE( tableName, schema ) { return exports.queryDROP(tableName) + exports.constants.separator + exports.queryCREATE( tableName, schema ) }
	 exports.queryTRUNCATE = queryTRUNCATE

	function queryINSERT( tableName, schema, data )
	{
		var query = 'INSERT INTO ' + tableName + exports.queryList( iterable.keys(data) ) + ' VALUES ' + exports.queryList( iterable.values(data) )
	return  query
	}exports.queryINSERT = queryINSERT
*/