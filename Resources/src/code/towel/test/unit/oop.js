Ti.include('/src/code/towel/test/include.js')

	oop = require('src/code/towel/oop')


	function Test_oop_create()
	{
		function Custom( x, y )
		{
			z = x + y
			this.zGET = function() { return z }
		}

		function test_empty() { assertEqual    (  oop.create( Date      ).getTime(),  new Date().getTime()     ) }
		function test_1arg () { assertEqual    (  oop.create( Date, 123 ).getTime(),  new Date(123).getTime()  ) }
		function test_2args() { assertIdentical(  oop.create( Custom, [1, 2] ).zGET(),  3 ) } // new Custom(1, 2).zGET()  ) }
// TODO	function test_args () { assertIdentical(  oop.create( Date, [ 2000, 1, 1 ] ).toString(), '2000-1-1T00:00:00.000Z' ) }
	}Test.UT.runAndCache( Test_oop_create, 'oop.create' )
