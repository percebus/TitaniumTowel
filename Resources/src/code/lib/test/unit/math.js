Ti.include('/src/code/lib/test/include.js')

	math = require('src/code/lib/math')


	function Test_math_Round()
	{
		function test_Lower       (){ assertIdentical( math.Round.Lower  (4.9), 4 ) }
		function test_Nearest_low (){ assertIdentical( math.Round.Nearest(4.4), 4 ) }
		function test_Nearest_high(){ assertIdentical( math.Round.Nearest(4.5), 5 ) }
		function test_Higher      (){ assertIdentical( math.Round.Higher (4.1), 5 ) }
	}Test.UT.runAndCache( Test_math_Round, 'math.Round' )


	function Test_math_division()
	{
		function test_int  () { assertIdentical( math.divide( 4, 2 ), 2 ) }
		function test_float() { assertIdentical( math.divide( 5, 2 ), 2.5 ) }

		function test_noDecimal_int  () { assertIdentical( math.divide( 4, 2, false ),  2 ) }
		function test_noDecimal_float() { assertEqual    ( math.divide( 5, 2, false ), [2, 1] ) }
	}Test.UT.runAndCache( Test_math_division, 'math.division' )
