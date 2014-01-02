Ti.include('/src/code/towel/test/include.js');

	regExp = require('src/code/towel/regExp');


	function Test_regexp_source()
	{
		function test_regExp_direct(){ assertIdentical( regExp.source(            /wa/  ), 'wa' ) }
		function test_regExp_class (){ assertIdentical( regExp.source( new RegExp('wa') ), 'wa' ) }
		function test_string       (){ assertIdentical( regExp.source(            'wa'  ), 'wa' ) }
	}Test.UT.runAndCache( Test_regexp_source, 'regExp.source' )


	function Test_regexp_concat()
	{
		function test_concat () { assertIdentical( regExp.concat ( '^', /wa/, /[A-C]/, '-', /$/ ).source, new RegExp(/^wa[A-C]-$/).source ) }
		function test_options() { assertIdentical( regExp.options( /dog/, /cat/, 'bird' ).source, '(dog|cat|bird)' ) }
	}Test.UT.runAndCache( Test_regexp_concat, 'regExp.concat' )
