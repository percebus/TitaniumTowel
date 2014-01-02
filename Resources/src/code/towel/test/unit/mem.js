Ti.include('/src/code/towel/test/include.js');

	iterable = require('src/code/towel/iterable');
	variable = require('src/code/towel/var');
	events   = require('src/code/towel/event');
	mem      = require('src/code/towel/mem');


	function Test_references()
	{
		function setUp()
		{
			a = [1, 2, 3]
			b = a
			c = [4, 5, 6]
			d = [a, b, c]
		}

		function test_a()
		{
			a = null // d[0] is a
			assertEqual( d, [[1, 2, 3], [1, 2, 3], [4, 5, 6]] )
		}

		function test_b()
		{
			b = null
			assertEqual( d, [[1, 2, 3], [1, 2, 3], [4, 5, 6]] )
		}

		function test_c()
		{
			c = null
			assertEqual( d, [[1, 2, 3], [1, 2, 3], [4, 5, 6]] )
		}

		function test_d0_indirect()
		{
			x = d[0]
			x = null
			assertEqual( d, [[1, 2, 3], [1, 2, 3], [4, 5, 6]] )
			assertEqual( a, [1, 2, 3] )
			assertEqual( b, [1, 2, 3] )
		}

		function test_d0_direct()
		{
			d[0] = null
			assertEqual( d, [null, [1, 2, 3], [4, 5, 6]] )
			assertEqual( a, [1, 2, 3] )
			assertEqual( b, [1, 2, 3] )
		}
	}Test.UT.runAndCache( Test_references, 'references' )



	GLOBAL = 'foo'

	function Test_mem()
	{
		function args() { return arguments }

		function setUp()
		{
			null_      = null
			undefined_ = undefined
			fn         = args
			string     = 'wa'
			int_       = 123
			float_     = 123.45
			true_      = true
			false_     = false
			arguments_ = fn(1, 2, 3)
			array      = [1, 2, 3]
			oTiButton  = Ti.UI.createButton()
/*
			events.eventAdd( 'wa', function(){ return true }, oTiButton )
			events.eventAdd( 'we', function(){ return 2    }, oTiButton )
 */
			list      = [null, null_, undefined_, fn, string, int_, float_, true_, false_, arguments_, array, oTiButton]
			selflist  = []
			for (i=0; i<list.length; i++)
				selflist[i] = list[i]
			selflist[0] = selflist // self ref
			dictionary = {n:null_, u:undefined_, f1:fn, s:string, i:int_, f2:float_, '1':true_, '0':false_, a:arguments_, l:list, arr:array, Ti:oTiButton}
			selfdict = {}
			for (property in dictionary)
				selfdict[property] = dictionary[property]
			selfdict.d = selfdict // self ref
		}

		function assert_dealloc(x)
		{
			y = x
			assertTrue( x === y )
			mem.dealloc(x)
			assertTrue( x === y ) // nothing happened?! sigh....
			x = mem.dealloc(x)
			assertFalse( x === y )
			y = null
			y = undefined
			delete x
			assertTrue( x === y )
		return undefined
		}

		function assertInitials()
		{
			assertIdentical( null_, null )
			assertIdentical( undefined_, undefined )
			assertEqual  ( fn, args )
			assertIdentical( string, 'wa' )
			assertIdentical( int_, 123 )
			assertIdentical( float_, 123.45 )
			assertIdentical( true_, true )
			assertIdentical( false_, false )
//			assertEqual    ( array, [1, 2, 3] )
		}

		function assertListDisposal(fn, doRecursive) 
		{ 
			doRecursive = variable.defaultBoolean( doRecursive, true )
			copy = []
			for (i=0; i<list.length; i++)
				copy[i] = list[i]
			reference = list
			assertEqual( list, reference )
			assertEqual( list, copy )
			assertEqual( copy, reference )
			assertEqual( list, [null, null_, undefined_, fn, string, int_, float_, true_, false_, arguments_, array, oTiButton] )
			fn(list)
			if (doRecursive) assertEqual( array, [,,] ) 
			else			 assertEqual( array, [1,2,3] )
			assertEqual( list, reference )
			assertEqual( list, [,,,,,,,,,,] )
			assertNotEqual( list, copy )
//			assertEqual( list.length, copy.length )
			assertInitials()

			x = [string]
			y = x[0]
			y = null
			y = undefined
			delete x[0]
			assertIdentical( string, 'wa' )

			list = fn(list)
			assertUndefined(list)
			assertNotEqual( list, reference )
			assertEqual( reference, [,,,,,,,,,,] )
			assertEqual( 'undefined', typeof(list) )
		}

		function assertRecursiveDisposal(fn) 
		{ 
			copy = []
			for (i=0; i<selflist.length; i++)
				copy[i] = selflist[i]
			copy[0] = null
			fn(selflist)
			assertEqual( selflist, [,,,,,,,,,,] )
			assertNotEqual( selflist, copy )
			selflist = fn(selflist)
			assertTrue( 'undefined' === typeof(selflist) )
			assertInitials()
		}

/*
		function test_TiObject_hasEvents() { assertTrue( events.hasEvents(oTiButton) ) }
		function test_TiObject_events   () { assertEqual( iterable.keys(events.oTiButton._eventListeners), ['wa', 'we'] ) }
 */
		function test_dealloc_GLOBAL() 
		{ 
			assert_dealloc(GLOBAL)
			assertIdentical( GLOBAL, 'foo' )
			GLOBAL = assert_dealloc(GLOBAL)
			assertTrue( 'undefined' === typeof(GLOBAL) )
		}

		function test_dealloc_null() 
		{ 
			assert_dealloc(null_)
			assertIdentical( null_, null )
			null_ = assert_dealloc(null_)
			assertTrue( 'undefined' === typeof(null_) )
		}

		function test_dealloc_fn() 
		{ 
			assert_dealloc(fn)
			assertEqual( fn, args )
			fn = assert_dealloc(fn)
			assertTrue( 'undefined' === typeof(fn) ) 
		}

		function test_dealloc_string() 
		{ 
			assert_dealloc(string)
			assertIdentical( string, 'wa' )
			string = assert_dealloc(string)
			assertTrue( 'undefined' === typeof(string) ) 
		}

		function test_dealloc_int() 
		{ 
			assert_dealloc(int_)
			assertIdentical( int_, 123 )
			int_ = assert_dealloc(int_)
			assertTrue( 'undefined' === typeof(int_) ) 
		}

		function test_dealloc_float() 
		{ 
			assert_dealloc(float_)
			assertIdentical( float_, 123.45 )
			float_ = assert_dealloc(float_)
			assertTrue( 'undefined' === typeof(float_) ) 
		}

		function test_dealloc_true() 
		{ 
			assert_dealloc(true_)
			assertIdentical( true_, true )
			true_ = assert_dealloc(true_)
			assertTrue( 'undefined' === typeof(true_) ) 
		}

		function test_dealloc_false() 
		{ 
			assert_dealloc(false_)
			assertIdentical( false_, false )
			false_ = assert_dealloc(false_)
			assertTrue( 'undefined' === typeof(false_) ) 
		}

		function test_dealloc_arguments() 
		{ 
			assert_dealloc(arguments_)
			assertEqual( arguments_, fn(1, 2, 3) )
			arguments_ = assert_dealloc(arguments_)
			assertTrue( 'undefined' === typeof(arguments_) ) 
		}

		function test_dealloc_array() 
		{ 
			assert_dealloc(array)
			assertEqual( array, [1, 2, 3] )
			array = assert_dealloc(array)
			assertTrue( 'undefined' === typeof(array) ) 
		}

		function test_dealloc_TiObject() 
		{ 
			assert_dealloc(oTiButton)
			assertNotUndefined(oTiButton)
			oTiButton = assert_dealloc(oTiButton)
			assertTrue( 'undefined' === typeof(oTiButton) ) 
		}


		function test_dealloc_list() 
		{ 
			copy = []
			for ( i = 0; i < list.length; i++ )
				copy[i] = list[i]
			reference = list
			assertEqual( list, reference )
			assertEqual( list, copy )
			assertEqual( copy, reference )
			assert_dealloc(list)
			assertEqual( list, copy )
			list = assert_dealloc(list)
			assertEqual( copy, reference )
			assertEqual( copy, [null, null_, undefined_, fn, string, int_, float_, true_, false_, arguments_, array, oTiButton] )
			assertEqual( 'undefined', typeof(list) )
			assertInitials()
		}


		function test_dealloc_recursive() 
		{ 
			copy = []
			for ( i = 0; i < selflist.length; i++ )
				copy[i] = selflist[i]
			copy[0] = null
			assert_dealloc(selflist)
			selflist[0] = null 
			assertEqual( selflist, copy )
			selflist[0] = selflist
			selflist = assert_dealloc(selflist)
			assertTrue( 'undefined' === typeof(selflist) )
			assertInitials()
		}


		function test_recursive_clobber   (){ assertRecursiveDisposal(mem.clobber, false) }
		function test_recursive_obliterate(){ assertRecursiveDisposal(mem.obliterate) }
		function test_recursive_dispose   (){ assertRecursiveDisposal(mem.dispose, false) }

		function test_list_clobber   (){ assertListDisposal(mem.clobber, false) }
		function test_list_obliterate(){ assertListDisposal(mem.obliterate) }
		function test_list_dispose   (){ assertListDisposal(mem.dispose, false) }
	}Test.UT.runAndCache( Test_mem, 'mem' )
