Ti.include('/src/code/towel/test/include.js');

	string = require('src/code/towel/string');


	function Test_string_reverse()
	{
		function test_reverse() { assertIdentical( string.reverse( 'wable' ), 'elbaw' ) }
	}Test.UT.runAndCache( Test_string_reverse, 'string.reverse' )


	function Test_string_repeat()
	{
		function test_repeat_3() { assertIdentical( string.repeat( 'x', 3 ), 'xxx' ) }
	}Test.UT.runAndCache( Test_string_repeat, 'string.repeat' )


	function Test_string_substrings()
	{
		function test_replace_something() { assertIdentical( string.replace('waable', 'aable', 'ey'), 'wey' ) }
		function test_replace_nothing  () { assertIdentical( string.replace('waable', 'able' ), 'wa' ) }
		function test_remove           () { assertIdentical( string.remove ('waable', 'able' ), 'wa' ) }

		function test_removeFromLeft_2 () { assertIdentical( string.removeFromLeft ( 'wable', 2 ),   'ble' ) }
		function test_removeFromLeft_3 () { assertIdentical( string.removeFromLeft ( 'wable', 3 ),    'le' ) }
		function test_removeFromRight_2() { assertIdentical( string.removeFromRight( 'wable', 2 ), 'wab'   ) }
		function test_removeFromRight_3() { assertIdentical( string.removeFromRight( 'wable', 3 ), 'wa'    ) }

		function test_charFirst() { assertIdentical( string.charFirst('wable'), 'w'     ) }
		function test_charLast () { assertIdentical( string.charLast ('wable'),     'e' ) }

		function test_left_2 () { assertIdentical( string.left ('wable', 2 ), 'wa'    ) }
		function test_left_4 () { assertIdentical( string.left ('wable', 4 ), 'wabl'  ) }
		function test_right_2() { assertIdentical( string.right('wable', 2 ),    'le' ) }
		function test_right_3() { assertIdentical( string.right('wable', 3 ),   'ble' ) }

		function test_isInString_true () { assertTrue ( string.isInString( 'ab', 'wable' ) ) }
		function test_isInString_false() { assertFalse( string.isInString( 'eb', 'wable' ) ) }

		function test_clear() { assertIdentical( string.clear('wable'), '' ) }

		function test_split_existant  () { assertEqual( string.split( 'wa-ble', '-' ), ['wa', 'ble'] ) }
		function test_split_inexistant() { assertEqual( string.split( 'wa-ble', '+' ), ['wa-ble'] ) }
	}Test.UT.runAndCache( Test_string_substrings, 'string substrings' )



	function Test_string_digits()
	{
		function test_number_minor  () { assertIdentical( string.digits(  123 , 2, '0' ),     '123' ) }
		function test_number_greater() { assertIdentical( string.digits(  123 , 6, '0' ),  '000123' ) }
		function test_string_minor  () { assertIdentical( string.digits( '123', 2, '0' ),     '123' ) }
		function test_string_greater() { assertIdentical( string.digits( '123', 5, 'x' ),   'xx123' ) }
		function test_default       () { assertIdentical( string.digits(  123 , 4      ),    '0123' ) }
	}Test.UT.runAndCache( Test_string_digits, 'string.digits' )


	function Test_string_ensure()
	{
		function test_startsWith_true () { assertTrue ( string.startsWith( 'wable', 'wa' ) ) }
		function test_startsWith_false() { assertFalse( string.startsWith( 'wable', 'we' ) ) }

		function test_ensureStartsWith_with   () { assertIdentical( string.ensureStartsWith(  'wa'   , '/'    ), '/wa'     ) }
// TODO	function test_ensureStartsWith_with_2 () { assertIdentical( string.ensureStartsWith(  'wa'   , 'waw'  ), 'wawa'    ) }
// TODO	function test_ensureStartsWith_with_3 () { assertIdentical( string.ensureStartsWith(  'wable', 'wiwa' ), 'wiwable' ) }
		function test_ensureStartsWith_without() { assertIdentical( string.ensureStartsWith( '/wa'   , '/'    ), '/wa'     ) }

		function test_ensureStartsWithout_with   () { assertIdentical( string.ensureStartsWithout(  'wa', '/' ), 'wa' ) }
		function test_ensureStartsWithout_without() { assertIdentical( string.ensureStartsWithout( '/wa', '/' ), 'wa' ) }

		function test_endsWith_true () { assertTrue ( string.endsWith( 'wable', 'le' ) ) }
		function test_endsWith_false() { assertFalse( string.endsWith( 'wable', 'bl' ) ) }
		function test_endsWith__    () { assertTrue ( string.endsWith( 'delete_', '_' ) ) }

		function test_ensureEndsWith_with   () { assertIdentical( string.ensureEndsWith( 'wa.jpeg', '.jpeg' ), 'wa.jpeg' ) }
		function test_ensureEndsWith_without() { assertIdentical( string.ensureEndsWith( 'wa'     , '.jpeg' ), 'wa.jpeg' ) }

		function test_ensureEndsWithout_with   () { assertIdentical( string.ensureEndsWithout( 'wa.jpeg', '.jpeg' ), 'wa' ) }
		function test_ensureEndsWithout_without() { assertIdentical( string.ensureEndsWithout( 'wa'     , '.jpeg' ), 'wa' ) }
		function test_ensureEndsWithout_date   () { assertIdentical( string.ensureEndsWithout( '123456789)', ')' ), '123456789' ) }

		function test_wrap       () { assertIdentical( string.wrap  ( '<div>',      '<input />'      , '</div>' ), '<div><input /></div>' ) }
		function test_unwrap     () { assertIdentical( string.unwrap( '<div>', '<div><input /></div>', '</div>' ),      '<input />' ) }
	}Test.UT.runAndCache( Test_string_ensure, 'string ensure' )


	function Test_startsWithout_Date()
	{
		function test_startsWith_Date    () { assertTrue     ( string.startsWith( 'Date(123456789)', 'Date' ) ) }
		function test_startsWith_Date_   () { assertTrue     ( string.startsWith( 'Date(123456789)', 'Date(' ) ) }
		function test_ensureStartsWithout() { assertIdentical( string.ensureStartsWithout( 'Date(123456789)', 'Date(' ), '123456789)' ) }
		function test_unwrap             () { assertIdentical( string.unwrap( 'Date(', 'Date(123456789)'    , ')'      ),      '123456789' ) }
	}Test.UT.runAndCache( Test_startsWithout_Date, 'string startsWithout Date' )


	function Test_string_casing()
	{
		function test_capitalize  () { assertIdentical( string.capitalize  ( 'wabLe' ), 'WabLe' ) }
		function test_uncapitalize() { assertIdentical( string.uncapitalize( 'WabLe' ), 'wabLe' ) }
	}Test.UT.runAndCache( Test_string_casing, 'string casint' )
	
