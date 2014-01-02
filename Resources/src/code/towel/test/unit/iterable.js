Ti.include('/src/code/towel/test/include.js');

	compare  = require('src/code/towel/compare');
	iterable = require('src/code/towel/iterable');


	function Test_iterable_map()
	{
		function test_string_value () { assertEqual( ["1", "2", "3"], iterable.map( "123", function(value) { return value } ) ) }
		function test_string_value2() { assertEqual( ["a", "b", "c"], iterable.map( "abc", function(value) { return value } ) ) }

		function test_list_value   () { assertEqual( [1, 2, 3], iterable.map( [1, 2, 3], function(value) { return value } ) ) }
		function test_list_function() { assertEqual( [2, 4, 6], iterable.map( [1, 2, 3], function(value) { return value *2 } ) ) }
		function test_list_index   () { assertEqual( [0, 1, 2], iterable.map( [201, 3000, 542990], function( value, index ) { return index } ) ) }
		function test_list_list    () { assertEqual( [[1, 2, 3], [1, 2, 3], [1, 2, 3]], iterable.map( [1, 2, 3], function( value, index, list ) { return list } ) ) }

		function test_dict_value   () { assertEqual( [1, 3, 6], iterable.map( {a:1, b:3, c:6}, function(value) { return value } ) ) }
		function test_dict_property() { assertEqual( ['a', 'b', 'c'], iterable.map( {a:1, b:3, c:6}, function(value, key) { return key } ) ) }
		function test_dict_dict    () { assertEqual( [{a:1, b:2, c:3}, {a:1, b:2, c:3}, {a:1, b:2, c:3}], iterable.map( {a:1, b:2, c:3}, function(value, key, dictionary) { return dictionary } ) ) }
	}Test.UT.runAndCache( Test_iterable_map, 'iterable.map' )


	function Test_iterable_times()
	{
		function test_times_index    () { assertEqual( iterable.times( 3, function(index) { return index } ), [0, 1, 2] ) }
		function test_times_something() { assertEqual( iterable.times( 2, function()      { return 'wa'  } ), ['wa', 'wa'] ) }
	}Test.UT.runAndCache( Test_iterable_times, 'iterable.times' )



	function Test_iterable_properties()
	{
		function Class()
		{
			this.propertyA = 1
			this.propertyB = 2
			this.methodA   = function(){ return true }
			this.methodB   = function(){ return 123  }
		}

		function inherit( Sub, Main )
		{
			Sub.prototype             = new Main()
			Sub.prototype.constructor = Sub
		}

		function build( Sub, Main ) 
		{
			inherit( Sub, Main )
		return new Sub()
		}

		function SubClass()
		{
			this.propertyC = 1
			this.methodC   = false
		}
		function createSubClass() { return build( SubClass, Class ) }
		function SubClass2(){}
		function createSubClass2() { return build( SubClass2, Class ) }

		function setUp()
		{
			oClass    = new Class()
			oSubClass = createSubClass()
			oSubClass['propertyD'] = 'seriously?'

			oSubClass2 = createSubClass2()
		}


		function test_inspect_Class    (){ assertEqual( iterable.inspect(oClass)    , {self:[], keys:['propertyA', 'propertyB', 'methodA', 'methodB'], traits:[]})  }
		function test_inspect_SubClass (){ assertEqual( iterable.inspect(oSubClass) , {self:[], keys:['propertyC', 'methodC', 'propertyD']           , traits:['propertyA', 'propertyB', 'methodA', 'methodB', 'constructor']}) }
		function test_inspect_SubClass2(){ assertEqual( iterable.inspect(oSubClass2), {self:[], keys:[]                                              , traits:['propertyA', 'propertyB', 'methodA', 'methodB', 'constructor']})  }
		function test_inspect_array    (){ assertEqual( iterable.inspect([1, 2, 3]) , {self:['length'], keys:[0, 1, 2], traits:[]} ) }

		function test_properties_SubClass (){ assertEqual( iterable.properties(oSubClass) , ['propertyC', 'methodC', 'propertyD','propertyA', 'propertyB', 'methodA', 'methodB', 'constructor'] ) }
		function test_properties_SubClass2(){ assertEqual( iterable.properties(oSubClass2), [                                    'propertyA', 'propertyB', 'methodA', 'methodB', 'constructor'] ) }
		function test_traits_SubClass     (){ assertEqual( iterable.traits(oSubClass)     , [                                    'propertyA', 'propertyB', 'methodA', 'methodB', 'constructor'] ) }
		function test_traits_SubClass2    (){ assertEqual( iterable.traits(oSubClass2)    , [                                    'propertyA', 'propertyB', 'methodA', 'methodB', 'constructor'] ) }
		function test_keys_SubClass       (){ assertEqual( iterable.keys(oSubClass)       , ['propertyC', 'methodC', 'propertyD'] ) }
		function test_keys_SubClass2      (){ assertEqual( iterable.keys(oSubClass2)      , [] ) }

		function test_values_SubClass     (){ assertEqual( iterable.values(oSubClass) , [1, false, 'seriously?'] ) }
		function test_values_SubClass2    (){ assertEqual( iterable.values(oSubClass2), [] ) }

		function test_pairs_SubClass      (){ assertEqual( iterable.pairs(oSubClass) , [['propertyC', 1], ['methodC', 'false'], ['propertyD', 'seriously?']] ) }
		function test_pairs_SubClass2     (){ assertEqual( iterable.pairs(oSubClass2), [] ) }

		function test_entries_SubClass    (){ assertEqual( iterable.entries( oSubClass) , [{'key':'propertyC', 'value':1}, {'key':'methodC', 'value':'false'}, {'key':'propertyD', 'value':'seriously?'}] ) }
		function test_entries_SubClass_WCF(){ assertEqual( iterable.entries( oSubClass, iterable.KeysNames.WCF ), [{'Key':'propertyC', 'Value':1}, {'Key':'methodC', 'Value':'false'}, {'Key':'propertyD', 'Value':'seriously?'}] ) }
		function test_entries_SubClass2   (){ assertEqual( iterable.entries( oSubClass2), [] ) }

		function test_entriesToDict       (){ assertEqual( iterable.entriesToDict    ( [{'key':'propertyC', 'value':1}, {'key':'methodC', 'value':'false'}, {'key':'propertyD', 'value':'seriously?'}] ), {'propertyC':1, 'methodC':'false', 'propertyD':'seriously?'} ) }
	}Test.UT.runAndCache( Test_iterable_properties, 'iterable properties' )


	function Test_iterable_subsets()
	{
		function setUp()
		{
			oJSON = {
					"ID":1,
				 	"Dates":{
				 		"Created": new Date(123456789)},
				 	"IDs":{
				 		"Employee":483865,
				 		"Contact":1,
				 		"FaceBook": 123456789087654321},
				 	"Relationships":{
				 		"Notifications":[1,2],
				 		"Friends":[2]},
				 	"URLs":{
				 		"Image":""},
				 	"Badges":[
				 		{"ID":2,
				 		 "Dates":{}},
				 		{"ID":3,
				 		 "Dates":{}}],
				 	"Franchises":[
				 		{"ID":1,
				 		 "Dates":{},
				 		 "IDs":null,
				 		 "Relationships":null,
				 		 "URLs":null,
				 		 "Stores":[
				 		 	{"ID":1,
				 		 	 "Dates":{},
				 		 	 "IDs":{
				 		 	 	"Employee":483865},
				 		 	 "Relationships":null,
				 		 	 "URLs":null,
				 		 	 "WorkHours":10}]},
				 		{"ID":2,
				 		 "Dates":{},
				 		 "IDs":null,
				 		 "Relationships":null,
				 		 "URLs":null,
				 		 "Stores":[
				 		 	{"ID":2,
				 		 	 "Dates":{},
				 		 	 "IDs":{
				 		 	 	"Employee":483865},
				 		 	 "Relationships":null,
				 		 	 "URLs":null,
				 		 	 "WorkHours":20}]}],
				 	"Name":{
				 		"Family":"Guerrero",
				 		"Given" :"Juan"},
				 	"Promotions":[[4],[5],[3]],
				 	"MarketingOptIn":null,
				 	"Phones":{
				 		"Primary"  :"7047562077",
				 		"Secondary":"7047567922"},
				 	"Suggested":{
				 		"Badges":[6],
				 		"Friends":[null]},
				 	"eMail":"JCystems@gMail.com"}
	
			oJSONcleaned = {
					"ID":1,
				 	"Dates":{
				 		"Created": new Date(123456789)},
				 	"IDs":{
				 		"Employee":483865,
				 		"Contact":1,
				 		"FaceBook": 123456789087654321},
				 	"Relationships":{
				 		"Notifications":[1,2],
				 		"Friends":[2]},
				 	"URLs":{
				 		"Image":""},
				 	"Badges":[
				 		{"ID":2,
				 		 "Dates":{}},
				 		{"ID":3,
				 		 "Dates":{}}],
				 	"Franchises":[
				 		{"ID":1,
				 		 "Dates":{},
//				 		 "IDs":null,
//				 		 "Relationships":null,
//			 			 "URLs":null,
				 		 "Stores":[
				 		 	{"ID":1,
				 		 	 "Dates":{},
				 		 	 "IDs":{
				 		 	 	"Employee":483865},
//				 		 	 "Relationships":null,
//				 		 	 "URLs":null,
				 		 	 "WorkHours":10}]},
				 		{"ID":2,
				 		 "Dates":{},
//				 		 "IDs":null,
//				 		 "Relationships":null,
//				 		 "URLs":null,
				 		 "Stores":[
				 		 	{"ID":2,
				 		 	 "Dates":{},
				 		 	 "IDs":{
				 		 	 	"Employee":483865},
//				 		 	 "Relationships":null,
//				 		 	 "URLs":null,
				 		 	 "WorkHours":20}]}],
				 	"Name":{
				 		"Family":"Guerrero",
				 		"Given" :"Juan"},
				 	"Promotions":[[4],[5],[3]],
//				 	"MarketingOptIn":null,
				 	"Phones":{
				 		"Primary"  :"7047562077",
				 		"Secondary":"7047567922"},
				 	"Suggested":{
				 		"Badges":[6],
				 		"Friends":[]},
				 	"eMail":"JCystems@gMail.com"}

			sqless = {
    			'1': {ID: 1, age: 30, friends: [2,3,4], lastName: 'Guerrero', married: true , name: 'JC'},
				'2': {ID: 2, age: 29, friends: [1,3,6], lastName: 'Ledon'   , married: false, name: 'Jorge'}}
		}

		function test_contains_true () { assertTrue ( iterable.contains( [1, 2, 3], 2 ) ) }
		function test_contains_false() { assertFalse( iterable.contains( [1, 2, 3], 4 ) ) }
		function test_contains_null () { assertFalse( iterable.contains( [1, 2, 3], null ) ) }

		function test_ensure_nonexisting_number () { assertEqual( iterable.ensure(  3 , [1, 2]           ), [1, 2, 3] ) }
		function test_ensure_nonexisting_exact  () { assertEqual( iterable.ensure( '3', [1, 2, 3]        ), [1, 2, 3, '3'] ) }
		function test_ensure_nonexisting_inexact() { assertEqual( iterable.ensure( '3', [1, 2, 3], false ), [1, 2, 3] ) }

		function test_unique_default() { assertEqual( iterable.unique( [1, '2', '3', 3, 4, 2, 1, '4']        ), [1, '2', '3', 3, 4, 2, '4'] ) }
		function test_unique_exact  () { assertEqual( iterable.unique( [1, '2', '3', 3, 4, 2, 1, '4'], true  ), [1, '2', '3', 3, 4, 2, '4'] ) }
		function test_unique_inexact() { assertEqual( iterable.unique( [1, '2', '3', 3, 4, 2, 1, '4'], false ), [1, '2', '3', 4] ) }

		function test_select_with   (){ assertEqual( iterable.select( [1, 2, 3], [1, 2, '3'] ), [1, 2] ) }
		function test_select_without(){ assertEqual( iterable.select( [1, 2, 3], [4, 5, 6] ), [] ) }
		function test_select_inexact(){ assertEqual( iterable.select( [1, 2, 3], ['1', 2], false ), [1, 2] ) }

		function test_without_with   (){ assertEqual( iterable.without( [1, 2, 3], [1, 2, '3'] ), [3] ) }
		function test_without_without(){ assertEqual( iterable.without( [1, 2, 3], [4, 5, 6] ), [1, 2, 3] ) }
		function test_without_inexact(){ assertEqual( iterable.without( [1, 2, 3], ['1', 2], false ), [3] ) }

		function test_pick_with   (){ assertEqual( iterable.pick( {a:1, b:2, c:3}, ['a', 'b', 'd'] ), {a:1, b:2} ) }
		function test_pick_without(){ assertEqual( iterable.pick( {a:1, b:2, c:3}, ['d', 'e', 'f'] ), {} ) }
		function test_pick_list   (){ assertEqual( iterable.pick( [1, 2, 3], [1, 2, 4] ), [1, 2] ) }
		function test_pick_regression_all(){ assertEqual( iterable.pick( sqless, [1, 2], false ), sqless ) }
		function test_pick_regression_1  (){ assertEqual( iterable.pick( sqless, [1]   , false ), {'1': sqless['1']} ) }

//		function test_ommit_with   (){ assertEqual( iterable.ommit( {a:1, b:2, c:3}, ['a', 'b', 'd'] ), ({c:3}) ) }
		function test_ommit_without(){ assertEqual( iterable.ommit( {a:1, b:2, c:3}, ['d', 'e', 'f'] ), {a:1, b:2, c:3} ) }
		function test_ommit_list   (){ assertEqual( iterable.ommit( [1, 2, 3], [1, 2, 4] ), [3] ) }

		function test_clean_dict(){ assertEqual( iterable.clean( {a:'1', b:null, c:undefined, d:2} ), ({a:'1', d:2}) ) }
		function test_clean_list(){ assertEqual( iterable.clean( [1, null, undefined, '2', null, 3] ), [1, '2', 3] ) }

		function test_relevant(){ assertEqual( iterable.relevant(oJSON), oJSONcleaned ) }
	}Test.UT.runAndCache( Test_iterable_subsets, 'iterable subsets' )


	function Test_iterable_size()
	{
		function args(x, y) { return arguments }

		function test_sizeOfList_array    () { assertIdentical( iterable.sizeOfList      ( [1, 2, 3, 4] ), 4 ) }
		function test_sizeOfList_arguments() { assertIdentical( iterable.sizeOfList      ( args(1, 2, 3, 4) ), 4 ) }
		function test_sizeOfList_function () { assertIdentical( iterable.sizeOfList      (args), 2 ) }
		function test_sizeOfDictionary    () { assertIdentical( iterable.sizeOfDictionary( {a:1, b:2, c:3} ), 3 ) }
		function test_sizeOfObject        () { assertIdentical( iterable.sizeOfObject    ( {a:1, b:2, c:3} ), 3 ) }

		function test_size_array     () { assertIdentical( iterable.size( [1, 2, 3, 4] ), 4 ) }
		function test_size_arguments () { assertIdentical( iterable.size( args(1, 2, 3, 4) ), 4 ) }
		function test_size_function  () { assertIdentical( iterable.size(args), 2 ) }
		function test_size_dictionary() { assertIdentical( iterable.size( {a:1, b:2, c:3} ), 3 ) }
	}Test.UT.runAndCache( Test_iterable_size, 'iterable.size' )


	function Test_iterable_listToDict()
	{
		function test_true_strings() { assertEqual( iterable.listToDict( ['a', 'b', 'c'], null ), {'a':null, 'b':null, 'c':null} ) }
		function test_true_numbers() { assertEqual( iterable.listToDict( [1, 2, 3], null ), {'1':null, '2':null, '3':null} ) }

		function test_false_strings() { assertEqual( iterable.listToDict( ['a', 'b', 'c'], 3 ), {'a':3, 'b':3, 'c':3} ) }
		function test_false_numbers() { assertEqual( iterable.listToDict( [1, 2, 3], 3 ), {'1':3, '2':3, '3':3} ) }

		function test_default_strings() { assertEqual( iterable.listToDict( ['a', 'b', 'c'] ), {'a':'a', 'b':'b', 'c':'c'} ) }
		function test_default_numbers() { assertEqual( iterable.listToDict( [1, 2, 3] ), {'1':1, '2':2, '3':3} ) }

		function test_list() { assertEqual( iterable.listToDict( ['a', 'b', 'c'], [1, 2] ), {'a': 1, 'b':2, 'c': undefined} ) }
	}Test.UT.runAndCache( Test_iterable_listToDict, 'iterable.listToDict' )


	function Test_iterable_pairsToDict()
	{
		function test_01() { assertEqual( iterable.pairsToDict([['first_name', 'john'], ['last_name', 'smith']]), {'first_name': 'john', 'last_name':'smith'} ) }
	}Test.UT.runAndCache( Test_iterable_pairsToDict, 'iterable.pairsToDict' )



	function Test_iterable_subcollections()
	{
		function test_first() { assertIdentical( iterable.first( [10, 11, 12] ), 10 )}
		function test_last () { assertIdentical( iterable.last ( [10, 11, 12] ), 12 )}

		function test_removeAtIndex_valid_0   () { assertIdentical( iterable.removeAtIndex( [10, 11, 12],  0    ), 10 )}
		function test_removeAtIndex_valid_1   () { assertIdentical( iterable.removeAtIndex( [10, 11, 12],  1    ), 11 )}
		function test_removeAtIndex_valid_2   () { assertIdentical( iterable.removeAtIndex( [10, 11, 12],  2    ), 12 )}
		function test_removeAtIndex_valid_m   () { assertIdentical( iterable.removeAtIndex( [10, 11, 12], -1    ), 12 )}
		function test_removeAtIndex_valid_m2  () { assertIdentical( iterable.removeAtIndex( [10, 11, 12], -2    ), 11 )}
		function test_removeAtIndex_valid_many() { assertEqual  ( iterable.removeAtIndex( [10, 11, 12], -2, 2 ), [11, 12] )}
// TODO	function test_removeAtIndex_invalid   () { assertEqual( iterable.removeAtIndex( [10, 11, 12],  3    ), [10, 11, 12] )}

		function test_indexNth_valid_1      () { assertIdentical( iterable.indexNth(  1, [10, 11, 12] ),  0 )}
		function test_indexNth_valid_2      () { assertIdentical( iterable.indexNth(  2, [10, 11, 12] ),  1 )}
		function test_indexNth_valid_3      () { assertIdentical( iterable.indexNth(  3, [10, 11, 12] ),  2 )}
		function test_indexNth_valid_m1     () { assertIdentical( iterable.indexNth( -1, [10, 11, 12] ), -1 )}
		function test_indexNth_valid_m2     () { assertIdentical( iterable.indexNth( -2, [10, 11, 12] ), -2 )}
// TODO	function test_indexNth_invalid_0    () { assertIdentical( iterable.indexNth(  0, [10, 11, 12] ),  err )}
// TODO	function test_indexNth_invalid_more () { assertIdentical( iterable.indexNth(  4, [10, 11, 12] ),  err )}
// TODO	function test_indexNth_invalid_minus() { assertIdentical( iterable.indexNth( -3, [10, 11, 12] ),  err )}

		function test_nth_valid_1() { assertIdentical( iterable.nth( [10, 11, 12], 1 ),  10 )}
		function test_nth_valid_2() { assertIdentical( iterable.nth( [10, 11, 12], 2 ),  11 )}
		function test_nth_valid_3() { assertIdentical( iterable.nth( [10, 11, 12], 3 ),  12 )}

		function test_removeAtNth_valid_0   () { assertIdentical( iterable.removeAtNth( [10, 11, 12],  1    ), 10 )}
		function test_removeAtNth_valid_1   () { assertIdentical( iterable.removeAtNth( [10, 11, 12],  2    ), 11 )}
		function test_removeAtNth_valid_2   () { assertIdentical( iterable.removeAtNth( [10, 11, 12],  3    ), 12 )}
		function test_removeAtNth_valid_m1  () { assertIdentical( iterable.removeAtNth( [10, 11, 12], -1    ), 12 )}
		function test_removeAtNth_valid_m2  () { assertIdentical( iterable.removeAtNth( [10, 11, 12], -2    ), 11 )}
		function test_removeAtNth_valid_many() { assertEqual    ( iterable.removeAtNth( [10, 11, 12], -2, 2 ), [11, 12] )}
// TODO	function test_removeAtNth_invalid   () { assertEqual    ( iterable.removeAtNth( [10, 11, 12],  4    ), [10, 11, 12] )}

		function test_removeFromLeft_1() { assertEqual( iterable.removeFromLeft( [10, 11, 12], 1 ), [   11, 12] ) }
		function test_removeFromLeft_2() { assertEqual( iterable.removeFromLeft( [10, 11, 12], 2 ), [       12] ) }

		function test_removeFromRight_1() { assertEqual( iterable.removeFromRight( [10, 11, 12], 1 ), [10, 11   ] ) }
		function test_removeFromRight_2() { assertEqual( iterable.removeFromRight( [10, 11, 12], 2 ), [10       ] ) }

		function test_left_1() { assertEqual( iterable.left( [10, 11, 12], 1 ), [10       ] ) }
		function test_left_2() { assertEqual( iterable.left( [10, 11, 12], 2 ), [10, 11   ] ) }

		function test_right_1() { assertEqual( iterable.right( [10, 11, 12], 1 ), [       12] ) }
		function test_right_2() { assertEqual( iterable.right( [10, 11, 12], 2 ), [   11, 12] ) }


		function test_deleteProperty_valid   () { assertUndefined( iterable.deleteProperty( {a:1, b:2}, 'a' ) )}
		function test_deleteProperty_invalid () { assertUndefined( iterable.deleteProperty( {a:1, b:2}, 'c' ) )}
		function test_deleteKey_valid        () { assertUndefined( iterable.deleteKey     ( {a:1, b:2}, 'a' ) )}
		function test_deleteKey_invalid      () { assertUndefined( iterable.deleteKey     ( {a:1, b:2}, 'c' ) )}

		function test_deleteItem_dict_valid  () { assertUndefined( iterable.deleteItem    ( {a:1, b:2}, 'a' ) )}
		function test_deleteItem_dict_invalid() { assertUndefined( iterable.deleteItem    ( {a:1, b:2}, 'c' ) )}
		function test_deleteItem_list_valid  () { assertUndefined( iterable.deleteItem    ( [10, 11, 12],  1 ) )}
		function test_deleteItem_list_valid_m() { assertUndefined( iterable.deleteItem    ( [10, 11, 12], -1 ) )}
//		function test_deleteItem_list_invalid() { assertUndefined( iterable.deleteItem    ( [10, 11, 12],  3 ) )}
	}Test.UT.runAndCache( Test_iterable_subcollections, 'iterable subcollections' )
