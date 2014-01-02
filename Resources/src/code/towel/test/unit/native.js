Ti.include('/src/code/towel/test/include.js')

	builtin = require(TT.Module.Native)

	function Test_native_has()
	{
		function test_hasEnumerables_array(){ assertTrue ( builtin.hasEnumerables([1, 2, 3]) ) }
		function test_hasEnumerables_empty(){ assertFalse( builtin.hasEnumerables([]) ) }

		function test_hasEnumerable_dict      (){ assertTrue ( builtin.hasEnumerable({'foo':'bar'}, 'foo') ) }
		function test_hasEnumerable_inexistant(){ assertFalse( builtin.hasEnumerable({'foo':'bar'}, 'wiru') ) }

		function test_hasKeys_dict (){ assertTrue ( builtin.hasKeys({'foo':'bar'}) ) }
		function test_hasKeys_empty(){ assertFalse( builtin.hasKeys({}) ) }

		function test_hasOwnProperty_array(){ assertTrue ( builtin.hasOwnProperty([1, 2, 3], 0) ) }
		function test_hasOwnProperty_empty(){ assertFalse( builtin.hasOwnProperty([], 0) ) }

		function test_hasProperty_array_length    (){ assertTrue ( builtin.hasProperty( []    , 'length'  ) ) }
		function test_hasProperty_array_forEach   (){ assertTrue ( builtin.hasProperty( []    , 'forEach' ) ) }
		function test_hasProperty_array_index     (){ assertTrue ( builtin.hasProperty( [1, 2], 0 ) ) }
		function test_hasProperty_array_inexistant(){ assertFalse( builtin.hasProperty( []    , 'wiru' ) ) }

		function test_hasEnumerable_array_length    (){ assertFalse( builtin.hasEnumerable( [], 'length'  ) ) }
		function test_hasEnumerable_array_forEach   (){ assertFalse( builtin.hasEnumerable( [], 'forEach' ) ) }
		function test_hasEnumerable_array_inexistant(){ assertFalse( builtin.hasEnumerable( [], 'wiru' ) ) }
	}Test.UT.runAndCache( Test_native_has, 'builtin' )