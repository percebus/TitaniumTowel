Ti.include('/src/code/lib/test/include.js')

	session  = require(TT.Module.Session)
	variable = require(TT.Module.Var)

	last = undefined
	function Test_session_any()
	{
		function assert_any( value, identical )
		{
			assertEqual( session.any_get('x'), last )
			last = value
			session.any_set( 'x' , value )
			identical = ( null != identical ) ? identical : true
			fn = identical ? assertIdentical : assertSimilar
			fn( value, session.any_get('x') )
		}

		function test00_null()
		{
			session.dispose('x')
			assert_any(undefined)
		}
		function test01_string    () { assert_any('Jorge') }
		function test02_int       () { assert_any(123) }
		function test02_string_int() { assert_any('123') }
		function test03_float     () { assert_any(123.45) }
		function test04_true      () { assert_any(true) }
		function test05_false     () { assert_any(false) }
		function test06_1         () { assert_any(1) }
		function test07_0         () { assert_any(0) }
		function test08_list      () { assert_any([0, 0.0, 123, 123.45, -123, -123.45, true, false, 'wa', [1,2,3], {a:1, b:2, c:3}], false) }
		function test09_dictionary() { assert_any({a:0, b:0.0, c:123, d:123.45, e:-123, f:-123.45, f:true, g:false, h:'wa', i:[1,2,3], j:{a:1, b:2, c:3} }, false) }
	}Test.UT.runAndCache( Test_session_any, 'session any' )


	function Test_session_API()
	{
		function assertValid( name, value, type, identical )
		{
			var identical = ( null != identical ) ? identical : true
				fn = identical ? assertIdentical : assertSimilar
				fn(  value,  session.get( name, value, type )  )
		}

		function assert_set( value, type, identical )
		{
			session.set( 'y', value, type )
			assertValid( 'y', value, type, identical )
		}


		function test_00_defaultToFalse1() { assertIdentical(  variable.defaultToValue( false, null  ),  false  ) }
		function test_00_defaultToFalse2() { assertIdentical(  variable.defaultToValue( null , false ),  false  ) }


		function test_01_explicit_false (){ assertValid( 'bool' , false , variable.Type.Bool ) }
		function test_01_explicit_true  (){ assertValid( 'bool' , true  , variable.Type.Bool ) }
		function test_01_explicit_float (){ assertValid( 'float', 123.45, variable.Type.Float ) }
		function test_01_explicit_int   (){ assertValid( 'int'  , 123   , variable.Type.Int ) }
		function test_01_explicit_string(){ assertValid( 'sting', 'wa'  , variable.Type.Str ) }
		function test_01_explicit_array (){ assertValid( 'array',  [0, 0.0, 123, 123.45, -123, -123.45, true, false, 'wa', [1,2,3], {a:1, b:2, c:3}], variable.Type.Array_, false ) }
		function test_01_explicit_dict  (){ assertValid( 'dict', {a:0, b:0.0, c:123, d:123.45, e:-123, f:-123.45, f:true, g:false, h:'wa', i:[1,2,3], j:{a:1, b:2, c:3} }, variable.Type.Dictionary, false ) }

		function test_01_implicit_false (){ assertValid( 'bool' , false ) }
		function test_01_implicit_true  (){ assertValid( 'bool' , true ) }
		function test_01_implicit_float (){ assertValid( 'float', 123.45 ) }
		function test_01_implicit_int   (){ assertValid( 'int'  , 123 ) }
		function test_01_implicit_string(){ assertValid( 'sting', 'wa' ) }
		function test_01_implicit_array (){ assertValid( 'array',  [0, 0.0, 123, 123.45, -123, -123.45, true, false, 'wa', [1,2,3], {a:1, b:2, c:3}], null, false ) }
		function test_01_implicit_dict  (){ assertValid( 'dict', {a:0, b:0.0, c:123, d:123.45, e:-123, f:-123.45, f:true, g:false, h:'wa', i:[1,2,3], j:{a:1, b:2, c:3} }, null, false ) }


		function test_02_implicit_bool_true     (){ assert_set(true, variable.Type.Bool) }
		function test_02_implicit_bool_false    (){ assert_set(false, variable.Type.Bool) }
		function test_02_implicit_float_positive(){ assert_set(123.45, variable.Type.Float) }
		function test_02_implicit_float_0       (){ assert_set(0.0, variable.Type.Float) }
		function test_02_implicit_float_negative(){ assert_set(-123.45, variable.Type.Float ) }
		function test_02_implicit_int_positive  (){ assert_set(123, variable.Type.Int ) }
		function test_02_implicit_int_0         (){ assert_set(0, variable.Type.Int ) }
		function test_02_implicit_int_negative  (){ assert_set(-123, variable.Type.Int ) }
		function test_02_implicit_string        (){ assert_set('wa', variable.Type.Str ) }
		function test_02_implicit_array         (){ assert_set( [0, 0.0, 123, 123.45, -123, -123.45, true, false, 'wa', [1,2,3], {a:1, b:2, c:3}], variable.Type.Array_, false ) }
		function test_02_implicit_dict          (){ assert_set( {a:0, b:0.0, c:123, d:123.45, e:-123, f:-123.45, f:true, g:false, h:'wa', i:[1,2,3], j:{a:1, b:2, c:3} }, variable.Type.Dictionary, false ) }

		function test_02_explicit_bool_true     (){ assert_set(true) }
		function test_02_explicit_bool_false    (){ assert_set(false) }
		function test_02_explicit_float_positive(){ assert_set(123.45) }
		function test_02_explicit_float_0       (){ assert_set(0.0) }
		function test_02_explicit_float_negative(){ assert_set(-123.45) }
		function test_02_explicit_int_positive  (){ assert_set(123) }
		function test_02_explicit_int_0         (){ assert_set(0) }
		function test_02_explicit_int_negative  (){ assert_set(-123) }
		function test_02_explicit_string        (){ assert_set('wa') }
		function test_02_explicit_array         (){ assert_set( [0, 0.0, 123, 123.45, -123, -123.45, true, false, 'wa', [1,2,3], {a:1, b:2, c:3}], null, false ) }
		function test_02_explicit_dict          (){ assert_set( {a:0, b:0.0, c:123, d:123.45, e:-123, f:-123.45, f:true, g:false, h:'wa', i:[1,2,3], j:{a:1, b:2, c:3} }, null, false ) }
	}Test.UT.runAndCache( Test_session_API, 'session API' )
