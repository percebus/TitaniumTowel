Ti.include('/src/code/lib/test/include.js')

	names = require('src/code/lib/name')


	function Test_names_first_last()
	{
		function test_2args () { assertIdentical( names.first_last( 'Karime', 'Silva'                       ), 'Karime Silva' ) }
		function test_list_2() { assertIdentical( names.first_last( ['Karime', 'Silva']                     ), 'Karime Silva' ) }
		function test_list_3() { assertIdentical( names.first_last( ['Karime', 'Renee', 'Silva']            ), 'Karime Silva' ) }
		function test_list_4() { assertIdentical( names.first_last( ['Karime', 'Renee', 'Delgado', 'Silva'] ), 'Karime Silva' ) }
	}Test.UT.runAndCache( Test_names_first_last, 'names.first_last' )

	function Test_names_last_first()
	{
		function test_2args () { assertIdentical( names.last_first( 'Karime', 'Silva'                       ), 'Silva, Karime' ) }
		function test_list_2() { assertIdentical( names.last_first( ['Karime', 'Silva']                     ), 'Silva, Karime' ) }
		function test_list_3() { assertIdentical( names.last_first( ['Karime', 'Renee', 'Silva']            ), 'Silva, Karime' ) }
		function test_list_4() { assertIdentical( names.last_first( ['Karime', 'Renee', 'Delgado', 'Silva'] ), 'Silva, Karime' ) }
	}Test.UT.runAndCache( Test_names_last_first, 'names.last_first' )

