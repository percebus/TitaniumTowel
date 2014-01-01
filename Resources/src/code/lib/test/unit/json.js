Ti.include('/src/code/lib/test/include.js')

	builtin  = require('src/code/lib/native')
	dateTime = require('src/code/lib/date')
	variable = require('src/code/lib/var')
	json     = require('src/code/lib/json')

	function Test_json()
	{
		function process(x) { return json.toObject( json.toString(x) ) }
		function assertProcess(x) { assertEqual( x, process(x) ) }

		function test_dateTrandform_isDateValid (){ assertTrue( variable.isDateValid(               new Date(  builtin.JSON.parse( builtin.JSON.stringify( new Date() ) )  )  ) ) }
		function test_dateTrandform_stringToDate(){ assertTrue( variable.isDateValid(  dateTime.stringToDate(  builtin.JSON.parse( builtin.JSON.stringify( new Date() ) )  )  ) ) }

		function test_date_nixon      (){ assertIdentical( builtin.JSON.parse('"\/Date(1352971010000)\/"'), '/Date(1352971010000)/' ) }
		function test_date_now        (){ assertProcess( new Date() ) }
		function test_date_fixed      (){ assertProcess( new Date('2012/01/01') ) }
		function test_string          (){ assertProcess( '123' ) }
		function test_int             (){ assertProcess( 123 ) }
		function test_0               (){ assertProcess( 0 ) }
		function test_null            (){ assertProcess(null) }
		function test_list            (){ assertProcess( [1, 2, 3] ) }
		function test_list_full       (){ assertProcess( [new Date(), new Date('2012/01/01'), '123', 123, 0, null, [1, 2, 3]] ) }
		function test_list_empty      (){ assertProcess( [] ) }
		function test_dictionary      (){ assertProcess( {a:1, b:2, c:3} ) }
		function test_dictionary_full (){ assertProcess( {a:123, b:'123', c:new Date(), d:new Date('2012/01/01'), e:0, f:null, g:[1, 2, 3]} ) }
		function test_dictionary_empty(){ assertProcess( {} ) }
		function test_typical         (){ assertProcess( [
			{id: 1, name:'JC', points:260, DoB: new Date('1982/02/02'), marriedTo: null, friends: [2, 3, 4]},
			{id: 2, name:'K' , points:320, DoB: new Date('1984/09/22'), marriedTo: 1   , friends: [1, 3, 4]}])}

	}Test.UT.runAndCache( Test_json, 'json' )


	function Test_json_dates()
	{
		function test_dateTime   () { assertIdentical(                             dateTime.datetime( "2012-11-15T09:16:50Z" ).toString(), 'Thu Nov 15 2012 03:16:50 GMT-0600 (CST)' ) } // converted from UTC to local
		function test_builtin    () { assertIdentical(                            builtin.JSON.parse('"2012-11-15T09:16:50Z"'), "2012-11-15T09:16:50Z" ) } // doesnt parses it, just removes quotes
// TODO	function test_ISO8601    () { assertIdentical( dateTime.dateToMilliseconds   ( json.toObject('"2012-11-15T09:16:50"'         ) ), 1353335061859 ) } // local
		function test_ISO8601_GMT() { assertIdentical( dateTime.dateToMilliseconds   ( json.toObject('"2012-11-15T09:16:50-06:00"'   ) ), 1352992610000 ) } // local
		function test_ISO8601_0  () { assertIdentical( dateTime.dateToUTCmilliseconds( json.toObject('"2012-11-15T09:16:50-00:00"'   ) ), 1352992610000 ) } // UTC
		function test_ISO8601_UTC() { assertIdentical( dateTime.dateToUTCmilliseconds( json.toObject('"2012-11-15T09:16:50Z"'        ) ), 1352992610000 ) } // UTC
		function test_MS_UTC     () { assertIdentical( dateTime.dateToUTCmilliseconds( json.toObject('"\/Date(1352992610000)\/"'     ) ), 1352992610000 ) } // UTC
		function test_MS_GMT     () { assertIdentical( dateTime.dateToMilliseconds   ( json.toObject('"\/Date(1352992610000-0600)\/"') ), 1352992610000 ) } // local
	}Test.UT.runAndCache( Test_json_dates, 'json dates' )


	function Test_json_regression()
	{
		function setUp()
		{
			obj = {
				'Phones': {'Primary': '7047562077'},
				'Dates' : {'Created': new Date(2013,0,1,0,0,0,0) } }
			newObj = json.toObject( json.toString(obj) )
			objs = {'1': obj, '2': obj}
			newObjs = json.toObject( json.toString(objs) )
		}

		function test_obj           (){ assertEqual    (       obj                         , newObj ) }
		function test_objs          (){ assertEqual    (       objs                        , newObjs ) }
		function test_date_obj      (){ assertEqual    (       obj.Dates.Created           , newObj.Dates.Created ) }
		function test_date_explicit1(){ assertIdentical(       obj.Dates.Created.getTime() , new Date(2013,0,1,0,0,0,0).getTime() ) }
		function test_date_explicit2(){ assertIdentical( objs['1'].Dates.Created.getTime() , new Date(2013,0,1,0,0,0,0).getTime() ) }
		function test_date_toString (){ assertIdentical(       obj.Dates.Created.toString(), newObj.Dates.Created.toString() ) }
		function test_phone         (){ assertIdentical(       obj.Phones.Primary          , newObj.Phones.Primary ) }
	}Test.UT.runAndCache( Test_json_regression, 'json regression' )
