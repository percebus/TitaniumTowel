Ti.include('/src/code/towel/test/include.js');

	variable = require('src/code/towel/var');
	sqless   = require('src/code/towel/sqless');
	time     = require('src/code/towel/time');

	oDB  = sqless.DBsingleton();
	oDBZ = sqless.DBZsingleton();


	function Test_sqless_init()
	{
		function test_wipeOut_DB (){ oDB.wipeOut()  }
		function test_wipeOut_DBZ(){ oDBZ.wipeOut() }

		function test_read_DB (){ assertEqual( oDB.read('employee'), {}) }
		function test_read_DBZ(){ assertEqual(oDBZ.read('employee'), {}) }
	}Test.UT.runAndCache( Test_sqless_init, 'sqless init' )


	function Test_sqless()
	{
		function setUp()
		{
			oJC = {
				name    : 'JC',
				lastName: 'Guerrero',
				married : true,
				age     : 30,
				ID      : 1,
				friends : [2, 3, 4],
				date    : new Date(2013, 0, 1, 0, 0, 0, 0) }

			oJorge = {
				name    : 'Jorge',
				lastName: 'Ledon',
				married : false,
				age     : 29,
				ID      : 2,
				friends : [1, 3, 6],
				date    : new Date(2013, 0, 1, 0, 0, 0, 0) }

			oKarime = {
				name    : 'Karime',
				lastName: 'Silva',
				married : true,
				age     : 28,
				ID      : 3,
				friends : [1, 4],
				date    : new Date(2013, 0, 1, 0, 0, 0, 0) }
		}

		function test_DB_ini_1() { assertUndefined( oDB.get('employee', 1) ) }
		function test_DB_ini_2() { assertUndefined( oDB.get('employee', 2) ) }
		function test_DB_set_1() { assertEqual( oDB.set( 'employee', 1, oJC    ),  oJC    ) }
		function test_DB_set_2() { assertEqual( oDB.set( 'employee', 2, oJorge ),  oJorge ) }
		function test_DB_get_1() { assertEqual( oDB.get( 'employee', 1         ),  oJC    ) }
		function test_DB_get_2() { assertEqual( oDB.get( 'employee', 2         ),  oJorge ) }
		function test_DB_IDs  () { assertEqual( oDB.IDs( 'employee'), [1, 2] ) }
		function test_DB_get_1_all() 
		{ 
			_oJC = oDB.get( 'employee', 1, {meta:true} )
			assertEqual(oJC, _oJC.value)
			assertTrue     ( _oJC.dates.created.getTime() > 0 )
			assertUndefined( _oJC.dates.updated)
			assertUndefined( _oJC.dates.modified)
			assertUndefined( _oJC.dates.expires)
		}
		function test_DB_get_2_all() 
		{ 
			_oJorge = oDB.get( 'employee', 2, {meta:true} )
			assertEqual(oJorge, _oJorge.value)
			assertTrue     ( _oJorge.dates.created.getTime() > 0 )
			assertUndefined( _oJorge.dates.updated)
			assertUndefined( _oJorge.dates.modified)
			assertUndefined( _oJorge.dates.expires)
		}
//TODO	function test_DB_read         () { assertSimilar( oDB.read   ( 'employee'          ), {'1':oJC, '2':oJorge } )}
		function test_DB_records_all  () { assertSimilar( oDB.records( 'employee'          ), {'1':oJC, '2':oJorge } )}
		function test_DB_records_some () { assertSimilar( oDB.records( 'employee' , [1, 2] ), {'1':oJC, '2':oJorge } )}
		function test_DB_records_1    () { assertSimilar( oDB.records( 'employee' ,  1     ), {'1':oJC             } )}
		function test_DB_records_2    () { assertSimilar( oDB.records( 'employee' ,     2  ), {         '2':oJorge } )}
		function test_DB_update       () { time.wait(1000); assertSimilar( oDB.update ( 'employee' , 1, oJC ), oJC )}
		function test_DB_edit         () { time.wait(1000); assertSimilar( oDB.edit( 'employee' , {'2':{'foo':'bar'}, '3':oKarime} ), {'2':{'foo':'bar'}, '3':oKarime} )}
		function test_DB_records_all2 () { assertSimilar( oDB.records( 'employee'          ), {'1':oJC, '2':{'foo':'bar'}, '3':oKarime} )}
		function test_DB_records_some2() { assertSimilar( oDB.records( 'employee' , [1, 3] ), {'1':oJC, '3':oKarime} )}
		function test_DB_records_dates()
		{ 
			employees = oDB.records( 'employee', null, {meta:true} )
			_oJC     = employees['1']
			_oFoo    = employees['2']
			_oKarime = employees['3']

Test.UT.debug("JC hasn't changed, but it was updated")
			assertTrue     ( _oJC.dates.updated.getTime() > _oJC.dates.created.getTime()  )
			assertUndefined( _oJC.dates.modified )

Test.UT.debug("Karime is new")
			assertTrue     ( _oKarime.dates.created.getTime() > 0 )
			assertUndefined( _oKarime.dates.updated)
			assertUndefined( _oKarime.dates.modified)
			assertUndefined( _oKarime.dates.expires)

Test.UT.debug("2 was Jorge, now is Foo")
			assertIdentical( _oFoo.dates.updated.getTime(),   _oFoo.dates.modified.getTime() )
			assertTrue     ( _oFoo.dates.modified.getTime() > _oFoo.dates.created.getTime() )
		}

		function test_DBZ_set_1  () { assertEqual( oDBZ.set( 'employee', 1, oJC    ),  oJC    ) }
		function test_DBZ_set_2  () { assertEqual( oDBZ.set( 'employee', 2, oJorge ),  oJorge ) }
		function test_DBZ_get_1  () { assertEqual( oDBZ.get( 'employee', 1         ),  oJC    ) }
		function test_DBZ_get_2  () { assertEqual( oDBZ.get( 'employee', 2         ),  oJorge ) }
		function test_DBZ_records_all  () { assertSimilar( oDBZ.records( 'employee'          ), {'1':oJC, '2':oJorge } )}
		function test_DBZ_records_some () { assertSimilar( oDBZ.records( 'employee' , [1, 2] ), {'1':oJC, '2':oJorge } )}
		function test_DBZ_records_1    () { assertSimilar( oDBZ.records( 'employee' , [1]    ), {'1':oJC             } )}
		function test_DBZ_records_2    () { assertSimilar( oDBZ.records( 'employee' ,     [2]), {         '2':oJorge } )}
		function test_DBZ_edit         () { assertSimilar( oDBZ.edit( 'employee' , {'2':{'foo':'bar'}, '3':oKarime} ), {'2':{'foo':'bar'}, '3':oKarime} )}
		function test_DBZ_records_all2 () { assertSimilar( oDBZ.records( 'employee'          ), {'1':oJC, '2':{'foo':'bar'}, '3':oKarime} )}
		function test_DBZ_records_some2() { assertSimilar( oDBZ.records( 'employee' , [1, 3] ), {'1':oJC, '3':oKarime} )}
	}Test.UT.runAndCache( Test_sqless, 'sqless' )
