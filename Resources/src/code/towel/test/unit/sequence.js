Ti.include('/src/code/towel/test/include.js');

	sequence = require('src/code/towel/sequence');


	function Test_sequence()
	{
		function setUp()
		{
			list = [1, 2, 3]
		}

		function test_updateAtIndex() { assertEqual( sequence.updateAtIndex( [1, 2, 3], 1, function(x) { return x*2 } ),  4 ) }
		function test_reverse_list     () { assertEqual( sequence.reverse([1, 2, 3]), [3, 2, 1] ) }
		function test_reverse_arguments() { assertEqual( sequence.reverse( 1, 2, 3 ), [3, 2, 1] ) }
		function test_sort          () { assertEqual( sequence.sort( [4, 2, 1, 3, 5, 0, 6] ), [0, 1, 2, 3, 4, 5, 6] ) }
		function test_sort_objs     () { assertEqual( sequence.sort( [ {'id':4}, {'id':2}, {'id':3}, {'id': 1} ], function( a, b ) { return parseInt(a.id)-parseInt(b.id) } ), [ {'id': 1}, {'id':2}, {'id':3}, {'id':4} ] ) }
		function test_sort_objs_desc() { assertEqual( sequence.sort( [ {'id':4}, {'id':2}, {'id':3}, {'id': 1} ], function( a, b ) { return parseInt(b.id)-parseInt(a.id) } ), [ {'id': 4}, {'id':3}, {'id':2}, {'id':1} ] ) }
	}Test.UT.runAndCache( Test_sequence, 'sequence' )


	function Test_sequence_indexes()
	{
		function setUp()
		{
			list = [1, 2, 3, '2', 3, 4]
		}

		function test_empty_indexFirst() { assertIdentical( sequence.indexFirst([]), null ) }
		function test_empty_indexLast () { assertIdentical( sequence.indexLast ([]), null ) }
		function test_1_indexFirst    () { assertIdentical( sequence.indexFirst(['a']), 0 ) }
		function test_1_indexLast     () { assertIdentical( sequence.indexLast (['a']), 0 ) }
		function test_2_indexFirst    () { assertIdentical( sequence.indexFirst(['a', 'b']), 0 ) }
		function test_2_indexLast     () { assertIdentical( sequence.indexLast (['a', 'b']), 1 ) }

		function test_indexFirst(){ assertIdentical( sequence.indexFirst(list), 0 ) }
		function test_indexLast (){ assertIdentical( sequence.indexLast (list), 5 ) }

		function test_indexes_exact_1    (){ assertEqual( sequence.indexes( list,  1  ), [0] ) }
		function test_indexes_exact_2_int(){ assertEqual( sequence.indexes( list,  2  ), [1] ) }
		function test_indexes_exact_3    (){ assertEqual( sequence.indexes( list,  3  ), [2, 4] ) }
		function test_indexes_exact_2_str(){ assertEqual( sequence.indexes( list, '2' ), [3] ) }
		function test_indexes_exact_4    (){ assertEqual( sequence.indexes( list,  4  ), [5] ) }
		function test_indexes_exact_foo  (){ assertEqual( sequence.indexes( list, 'a' ), [] ) }

		function test_indexes_fn(){ assertEqual( sequence.indexes( list, function(x){ return x == 2 }), [1, 3] ) }

		function test_indexMatchFirst_exact_1    (){ assertIdentical( sequence.indexMatchFirst( list,  1  ), 0 ) }
		function test_indexMatchFirst_exact_2_int(){ assertIdentical( sequence.indexMatchFirst( list,  2  ), 1 ) }
		function test_indexMatchFirst_exact_3    (){ assertIdentical( sequence.indexMatchFirst( list,  3  ), 2 ) }
		function test_indexMatchFirst_exact_2_str(){ assertIdentical( sequence.indexMatchFirst( list, '2' ), 3 ) }
		function test_indexMatchFirst_exact_4    (){ assertIdentical( sequence.indexMatchFirst( list,  4  ), 5 ) }
		function test_indexMatchFirst_exact_foo  (){ assertIdentical( sequence.indexMatchFirst( list, 'a' ), null ) }

		function test_indexMatchLast_exact_1    (){ assertIdentical( sequence.indexMatchLast( list,  1  ), 0 ) }
		function test_indexMatchLast_exact_2_int(){ assertIdentical( sequence.indexMatchLast( list,  2  ), 1 ) }
		function test_indexMatchLast_exact_3    (){ assertIdentical( sequence.indexMatchLast( list,  3  ), 4 ) }
		function test_indexMatchLast_exact_2_str(){ assertIdentical( sequence.indexMatchLast( list, '2' ), 3 ) }
		function test_indexMatchLast_exact_4    (){ assertIdentical( sequence.indexMatchLast( list,  4  ), 5 ) }
		function test_indexMatchLast_exact_foo  (){ assertIdentical( sequence.indexMatchLast( list, 'a' ), null ) }

		function test_isFirst_1  () { assertTrue ( sequence.isFirst(list,  1 ) ) }
		function test_isFirst_2  () { assertFalse( sequence.isFirst(list,  2 ) ) }
		function test_isFirst_3  () { assertFalse( sequence.isFirst(list,  3 ) ) }
		function test_isFirst_4  () { assertFalse( sequence.isFirst(list,  4 ) ) }

		function test_isLast_1  () { assertFalse( sequence.isLast(list,  1 ) ) }
		function test_isLast_2  () { assertFalse( sequence.isLast(list,  2 ) ) }
		function test_isLast_3  () { assertFalse( sequence.isLast(list,  3 ) ) }
		function test_isLast_4  () { assertTrue ( sequence.isLast(list,  4 ) ) }
	}Test.UT.runAndCache( Test_sequence_indexes, 'sequence indexes' )


	function Test_sequence_process()
	{
		function test_process_noresult   () { assertUndefined( sequence.process   ([1, 2, 3], function(x) { return x+1 })  ) }
		function test_process_result     () { assertEqual    ( sequence.process   ([1, 2, 3], function(x) { return x+1 }, []), [2, 3, 4] ) }
		function test_map                () { assertEqual    ( sequence.map       ([1, 2, 3], function(x) { return x+1 }    ), [2, 3, 4] ) }
		function test_ascending_noresult () { assertUndefined( sequence.ascending ([1, 2, 3], function(x) { return x+1 }    ) ) }
		function test_ascending_result   () { assertEqual    ( sequence.ascending ([1, 2, 3], function(x) { return x+1 }, []), [2, 3, 4] ) }
		function test_descending_noresult() { assertUndefined( sequence.descending([1, 2, 3], function(x) { return x+1 }    ) ) }
		function test_descending_result  () { assertEqual    ( sequence.descending([1, 2, 3], function(x) { return x+1 }, []), [2, 3, 4] ) }
		function test_copy() { 
			assertEqual       ( sequence.copy(list), list )
			assertNotIdentical( sequence.copy(list), list ) }
	}Test.UT.runAndCache( Test_sequence_process, 'sequence process' )


	function Test_sequence_concat()
	{
		function test_fail_types () { assertNotIdentical(          typeof([1, 2, 3] + [4, 5, 6]), typeof([1, 2, 3, 4, 5, 6]) ) }
		function test_fail_concat() { assertIdentical   (                 [1, 2, 3] + [4, 5, 6] ,           "1,2,34,5,6" ) }
		function test_concat_2   () { assertEqual       ( sequence.concat([1, 2, 3],  [4, 5, 6]),        [1, 2, 3, 4, 5, 6] ) }
		function test_concat_3   () { assertEqual       ( sequence.concat([1, 2, 3],  [4, 5, 6], [7, 8], [9, 0]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] ) }
	}Test.UT.runAndCache( Test_sequence_concat, 'sequence.concat' )


	function Test_sequence_firstValid()
	{
		function test_find_mid () { assertEqual    ( sequence.firstValid( [ 0, '0', 'wa', false ]   , compare.boolOrFalse ), 'wa' ) }
		function test_find_1st () { assertEqual    ( sequence.firstValid( [ 'wa', '0', true, false ], compare.boolOrFalse ), 'wa' ) }
		function test_find_last() { assertEqual    ( sequence.firstValid( [ null, '0', false, 'wa' ], compare.boolOrFalse ), 'wa' ) }
		function test_notfind  () { assertUndefined( sequence.firstValid( [ 0, '0', 'false', false ], compare.boolOrFalse ) ) }
	}Test.UT.runAndCache( Test_sequence_firstValid, 'sequence.firstValid' )


	function Test_sequence_flatten()
	{
		function test_lists(){ 
				assertEqual( sequence.flatten( 
					[[[1, 2, 3],4, 5, [6, 7], 8], 9, 10, [11], [12,[[13, 14, 15], 16, 17], 18, 19], 20] ), 
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] ) }
	}Test.UT.runAndCache( Test_sequence_flatten, 'sequence.flatten' )


	function Test_sequence_reverse()
	{
		function test_array_numbers() { assertEqual( sequence.reverse([1, 2, 3]), [3, 2, 1] )}
		function test_array_strings() { assertEqual( sequence.reverse(['uno', 'dos', 'tres']), ['tres', 'dos', 'uno'] )}
	}Test.UT.runAndCache( Test_sequence_reverse, 'sequence.reverse' )


	function Test_sequence_append()
	{
		function test_list_number   () { assertEqual( sequence.append( 3        , [1, 2] ), [1, 2, 3] ) }
		function test_list_string   () { assertEqual( sequence.append( '3'      , [1, 2] ), [1, 2, '3'] ) }
		function test_list_null     () { assertEqual( sequence.append( null     , [1, 2] ), [1, 2, null] ) }
		function test_list_undefined() { assertEqual( sequence.append( undefined, [1, 2] ), [1, 2, undefined] ) }
		function test_default_number() { assertEqual( sequence.append( 3 ), [3] ) }
	}Test.UT.runAndCache( Test_sequence_append, 'sequence.append' )


	function Test_sequence_resize()
	{
		function args() { return arguments }

		function test_array_less    () { assertIdentical( sequence.resize([10, 20, 30], 2), 2 ) }
		function test_array_more    () { assertIdentical( sequence.resize([10, 20, 30], 4), 4 ) }
// TODO	function test_string_less   () { assertIdentical( sequence.resize('wable', 4), 'wable' ) }
// TODO	function test_string_more   () { assertIdentical( sequence.resize('wable', 6), 'wable' ) }
		function test_arguments_less() { assertIdentical( sequence.resize(args(10, 20, 30), 2), 2 ) }
		function test_arguments_more() { assertIdentical( sequence.resize(args(10, 20, 30), 4), 4 ) }
	}Test.UT.runAndCache( Test_sequence_resize, 'sequence.resize' )


	function Test_sequence_argumentsToArray()
	{
		function args() { return arguments }

		function test_args_2 () { assertEqual( sequence.argumentsToArray(args(1, 2)), [1, 2] ) }
		function test_array_2() { assertEqual( sequence.argumentsToArray(args([1, 2])), [1, 2] ) }
		function test_args_1 () { assertEqual( sequence.argumentsToArray(args(1)), [1] ) }
		function test_array_1() { assertEqual( sequence.argumentsToArray(args([1])), [1] ) }
		function test_mixed  () { assertEqual( sequence.argumentsToArray(args([1, 2], [3, 4])), [[1, 2], [3, 4]] ) }
	}Test.UT.runAndCache( Test_sequence_argumentsToArray, 'sequence.argumentsToArray' )

