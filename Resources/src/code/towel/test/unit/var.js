Ti.include('/src/code/towel/test/include.js');

	builtin  = require('src/code/towel/native');
	regExp   = require('src/code/towel/regexp');
	dateTime = require('src/code/towel/date');
	variable = require('src/code/towel/var');

	function Test_var_hash()
	{
		function setUp()
		{
			x = {a:1, c:3.2, b:'wa', d:null, e:undefined, f:new String('Wa'), g:[1, 2, 3]}
			x.x = x
		}

		function test_assertEqual_success   (){ assertEqual   ({a:1, b: 2 , c:3}, {a:1, b:2, c:3}) }
		function test_assertEqual_fail_order(){ assertNotEqual({a:1, b: 2 , c:3}, {a:1, c:3, b:2}) }
		function test_assertEqual_fail_type (){ assertEqual   ({a:1, b:'2', c:3}, {a:1, b:2, c:3}) }
		function test_assertEqual_fail_constructor(){ assertNotEqual('wa', new String('wa')) }

		function test_hash_true  (){ assertIdentical( variable.hash(x, true                     ), "<object::dictionary>{a=<number::int>1, b=<string::string>'wa', c=<number::float>3.2, d=null, e=undefined, f=<object::string>'Wa', g=<object::array>[<number::int>1, <number::int>2, <number::int>3], x=<object::dictionary>[object Object]}" ) }
		function test_hash_Is    (){ assertIdentical( variable.hash(x, variable.Precision.Is    ), "<object::dictionary>{a=<number::int>1, c=<number::float>3.2, b=<string::string>'wa', d=null, e=undefined, f=<object::string>'Wa', g=<object::array>[<number::int>1, <number::int>2, <number::int>3], x=<object::dictionary>[object Object]}" ) }
		function test_hash_Exact (){ assertIdentical( variable.hash(x, variable.Precision.Exact ), "<object::dictionary>{a=<number::int>1, c=<number::float>3.2, b=<string::string>'wa', d=null, e=undefined, f=<object::string>'Wa', g=<object::array>[<number::int>1, <number::int>2, <number::int>3], x=<object::dictionary>[object Object]}" ) }
		function test_hash_Strict(){ assertIdentical( variable.hash(x, variable.Precision.Strict), "<object::dictionary>{a=<number::int>1, b=<string::string>'wa', c=<number::float>3.2, d=null, e=undefined, f=<object::string>'Wa', g=<object::array>[<number::int>1, <number::int>2, <number::int>3], x=<object::dictionary>[object Object]}" ) }
		function test_hash_Strict(){ assertIdentical( variable.hash(x, variable.Precision.Type  ), "<dictionary>{a=<int>1, b=<string>'wa', c=<float>3.2, d=null, e=undefined, f=<string>'Wa', g=<array>[<int>1, <int>2, <int>3], x=<dictionary>[object Object]}" ) }
		function test_hash_Value (){ assertIdentical( variable.hash(x, variable.Precision.Value ), "{a=1, b='wa', c=3.2, d=null, e=undefined, f='Wa', g=[1, 2, 3], x=[object Object]}" ) }
		function test_hash_Weak  (){ assertIdentical( variable.hash(x, variable.Precision.Weak  ), "{a=1, b=wa, c=3.2, d=null, e=undefined, f=Wa, g=[1, 2, 3], x=[object Object]}" ) }
		function test_hash_false (){ assertIdentical( variable.hash(x, false                    ), "{a=1, b=wa, c=3.2, d=null, e=undefined, f=Wa, g=[1, 2, 3], x=[object Object]}" ) }

		function test_isHashSame_inexact_order      (){ assertTrue( variable.isHashSame( {a:1, c:3.2, b:'2'}, {a:1, b:'2', c:3.2}, false ) ) }
		function test_isHashSame_inexact_type       (){ assertTrue( variable.isHashSame( {a:1, b:'2', c:3.2}, {a:1, b: 2 , c:3.2}, false ) ) }
		function test_isHashSame_inexact_constructor(){ assertTrue( variable.isHashSame( 'wa'               , new String('wa')   , false ) ) }

		function test_isHashSame_exact_order      (){ assertTrue ( variable.isHashSame( {a:1, c:3.2, b:'2'} , {a:1, b:'2', c:3.2}, true ) ) }
		function test_isHashSame_exact_type       (){ assertFalse( variable.isHashSame( {a:1, b:'2', c:3.2} , {a:1, b: 2 , c:3.2}, true ) ) }
		function test_isHashSame_exact_constructor(){ assertFalse( variable.isHashSame( 'wa'                , new String('wa')   , true ) ) }
	}Test.UT.runAndCache( Test_var_hash, 'variable.hash' )


	function Test_var_type()
	{
		function args() { return arguments }

		function test_string    () { assertIdentical( variable.type('wa'), 'string' ) }
		function test_int       () { assertIdentical( variable.type(1234), 'int' ) }
		function test_float     () { assertIdentical( variable.type(12.3), 'float' ) }
		function test_dictionary() { assertIdentical( variable.type({a:1, b:2, c:3}), 'dictionary' ) }
		function test_array     () { assertIdentical( variable.type([1, 2, 3]), 'array' ) }
		function test_arguments () { assertIdentical( variable.type( args() ), 'arguments' ) }
		function test_true      () { assertIdentical( variable.type(true), 'boolean' ) }
		function test_false     () { assertIdentical( variable.type(false), 'boolean' ) }
		function test_null      () { assertIdentical( variable.type(null), 'null' ) }
		function test_undefined () { assertIdentical( variable.type(undefined), 'undefined' ) }
		function test_date      () { assertIdentical( variable.type( new Date() ), 'date' ) }
		function test_NaN       () { assertIdentical( variable.type( new Date('wa').getTime() ), 'NaN' ) }
		function test_RegExp    () { assertIdentical( variable.type( /wa/ ), 'regexp' ) }
		function test_Function  () { assertIdentical( variable.type( args ), 'function' ) }
	}Test.UT.runAndCache( Test_var_type, 'variable.type' )


	function Test_var_size()
	{
		function args(x, y) { return arguments }

		function test_int_1    () { assertIdentical( variable.size(1), 1 ) }
		function test_int_123  () { assertIdentical( variable.size(123), 123 ) }
		function test_int_m123 () { assertIdentical( variable.size(-123), -123 ) }
		function test_array    () { assertIdentical( variable.size( [1, 2, 3, 4] ), 4 ) }
		function test_arguments() { assertIdentical( variable.size( args(1, 2, 3, 4) ), 4 ) }
		function test_function () { assertIdentical( variable.size(args), 2 ) }
	}Test.UT.runAndCache( Test_var_size, 'variable.size' )


	function Test_var_reset()
	{
		function setUp()
		{
			date = new Date()
		}

		function args(x, y) { return arguments }

		function test_int_1     () { assertIdentical( variable.reset(1), 0 ) }
		function test_int_123   () { assertIdentical( variable.reset(123), 0 ) }
		function test_int_m123  () { assertIdentical( variable.reset(-123), 0 ) }
		function test_float     () { assertIdentical( variable.reset(12.3), 0.0 ) }
		function test_string    () { assertIdentical( variable.reset('wa'), '' ) }
		function test_array     () { assertEqual( variable.reset( [1, 2, 3, 4] ), [] ) }
		function test_dictionary() { assertEqual( variable.reset( {'a':1, 'b':2} ), {} ) }
		function test_arguments () { assertEqual( variable.reset( args(1, 2, 3, 4) ), [] ) }
		function test_date()
		{
			assertTrue( variable.reset(date) === date )
			snapshot = date.getTime()
			assertTrue( variable.reset(date) >= snapshot )
		}
	}Test.UT.runAndCache( Test_var_reset, 'variable.reset' )


	function Test_var_isJSON()
	{
		function args() { return arguments }

		function test_regex(){ assertFalse( regExp.matches( 'wa', dateTime.DateRegexp.ISO8601.Any ) )}

		function test_date_isDate                        (){ assertTrue ( variable.isDate        ( new Date() ) ) }
		function test_date_isDateValid                   (){ assertTrue ( variable.isDateValid   ( new Date() ) ) }
		function test_date_isTypeJSONable                (){ assertTrue ( variable.isTypeJSONable( new Date() ) ) }
		function test_date_isRegexMatch_err              (){ assertTrue ( regExp.matches         ( builtin.JSON.stringify( new Date(-1) ), dateTime.DateRegexp.ISO8601.Any ) )}
		function test_date_isRegexMatch                  (){ assertTrue ( regExp.matches         ( builtin.JSON.stringify( new Date() ), dateTime.DateRegexp.ISO8601.Any ) )}
		function test_date_isRegexMatch_string           (){ assertTrue ( regExp.matches         ( '2012-09-16T16:40:28.687Z', dateTime.DateRegexp.ISO8601.Any ) )}
		function test_date_isJSONstringDate_date         (){ assertTrue ( variable.isJSONstringDate( builtin.JSON.stringify( new Date() ) ) ) }
		function test_date_isJSONstringDate_string       (){ assertTrue ( variable.isJSONstringDate(  '2012-09-16T16:40:28.687Z' ) ) }
		function test_date_isJSONstringDate_string_quotes(){ assertTrue ( variable.isJSONstringDate( '"2012-09-16T16:40:28.687Z"' ) ) }

		function test_isJSONable_number_positive (){ assertTrue ( variable.isJSONable(123) ) }
		function test_isJSONable_number_negative (){ assertTrue ( variable.isJSONable(-123) ) }
		function test_isJSONable_number_0        (){ assertTrue ( variable.isJSONable(0) ) }
		function test_isJSONable_string          (){ assertTrue ( variable.isJSONable('wa') ) }
		function test_isJSONable_date_string     (){ assertTrue ( variable.isJSONable('2012-01-01') ) }
		function test_isJSONable_date_object     (){ assertTrue ( variable.isJSONable( new Date() )  ) }
		function test_isJSONable_date_invalid_1  (){ assertFalse( variable.isJSONable( new Date(-1) ) ) }
		function test_isJSONable_date_invalid_2  (){ assertFalse( variable.isJSONable( new Date(NaN) ) ) }
		function test_isJSONable_date_invalid_3  (){ assertFalse( variable.isJSONable( new Date('dragon/augustus/bicentenial') ) ) }
		function test_isJSONable_list            (){ assertTrue ( variable.isJSONable([1, 2, 3]) ) }
		function test_isJSONable_boolean_true    (){ assertTrue ( variable.isJSONable(true) ) } // by itself it gets turned into a '1'
		function test_isJSONable_boolean_false   (){ assertTrue ( variable.isJSONable(false) ) } // by itself it gets turned into a '0'
		function test_isJSONable_boolStr_true    (){ assertTrue ( variable.isJSONable('true') ) } 
		function test_isJSONable_boolStr_false   (){ assertTrue ( variable.isJSONable('false') ) } 
		function test_isJSONable_booleans_list   (){ assertTrue ( variable.isJSONable([true, false, 1, 0]) ) } // luckly it will be treated properly later on
		function test_isJSONable_booleans_dict   (){ assertTrue ( variable.isJSONable({a:true, b:false, c:1, d:0}) ) }
		function test_isJSONable_list_empty      (){ assertTrue ( variable.isJSONable([]) ) }
		function test_isJSONable_dictionary      (){ assertTrue ( variable.isJSONable({a:1, b:2, c:3}) ) }
		function test_isJSONable_dictionary_empty(){ assertTrue ( variable.isJSONable({}) ) }
		function test_isJSONable_null            (){ assertTrue ( variable.isJSONable(null) ) }
		function test_isJSONable_arguments       (){ assertFalse( variable.isJSONable( args(1, 2, 3) ) ) }
		function test_isJSONable_arguments_empty (){ assertFalse( variable.isJSONable( args() ) ) }
		function test_isJSONable_undefined       (){ assertFalse( variable.isJSONable(undefined) ) } // this is why we default everything to null!!
		function test_isJSONable_undefined2      (){ assertFalse( variable.isJSONable({a: undefined, b:2}) ) }
		function test_isJSONable_TiObject        (){ assertFalse( variable.isJSONable( Ti.UI.createView({color: 'red'}) ) ) }
		function test_isJSONable_TiFile          (){ assertFalse( variable.isJSONable( Ti.Filesystem.getFile('KS_nav_ui.png') ) ) }
		function test_isJSONable_TiImage         (){ assertFalse( variable.isJSONable( Ti.UI.createImageView({image:'KS_nav_ui.png'}) ) ) }
		function test_isJSONable_complex         (){ assertFalse( variable.isJSONable( {a: Ti.UI.createWindow({color: 'red'}), b: Ti.Filesystem.getFile('KS_nav_ui.png'), c: Ti.UI.createImageView({image:'KS_nav_ui.png'}) } ) ) }
		function test_isJSONable_function        (){ assertFalse( variable.isJSONable( function(){ return false } ) ) }
	}Test.UT.runAndCache( Test_var_isJSON, 'variable.isJSON' )


	function Test_variable_isValue()
	{
		function test_int       (){ assertTrue( variable.isValue( 3 , 3 ) ) }
		function test_float     (){ assertTrue( variable.isValue( 3.1 , 3.1 ) ) }
		function test_string    (){ assertTrue( variable.isValue( 'wa', 'wa' ) ) }
		function test_bool      (){ assertTrue( variable.isValue( true, true ) ) }
		function test_null      (){ assertTrue( variable.isValue( null, null ) ) }
		function test_undefined (){ assertTrue( variable.isValue( undefined, undefined ) ) }
		function test_list      (){ assertTrue( variable.isValue( [1, 2, 3], [1, 2, 3] ) ) }
		function test_dictionary(){ assertTrue( variable.isValue( {a:1, b:2, c:3}, {a:1, b:2, c:3} ) ) }
	}Test.UT.runAndCache( Test_variable_isValue, 'variable.isValue' )
