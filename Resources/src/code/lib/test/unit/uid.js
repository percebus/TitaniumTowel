Ti.include('/src/code/lib/test/include.js')

	UID = require(TT.Module.UID)

	function Test_UID()
	{
		function test_initial_entities(){ assertEqual( UID.entities, [] ) }
		function test_initial_UIDs    (){ assertEqual( UID.UIDs    , {} ) }

		function test_get_1() { assertIdentical( UID.get()     , 1 ) }
		function test_get_2() { assertIdentical( UID.get('foo'), 2 ) }

		function test_UID_2() { assertIdentical( UID.UID, 2 ) }

		function test_entities_2(){ assertEqual( UID.entities, [undefined, 'foo'] ) }

		function test_entity_get_horse_1(){ assertIdentical( UID.entity_get('horse'), 1 ) }
		function test_entity_get_cow_1  (){ assertIdentical( UID.entity_get('cow')  , 1 ) }
		function test_entities_4 () { assertEqual( UID.entities, [undefined, 'foo', 'horse', 'cow'] ) }

		function test_entity_get_horse_2(){ assertIdentical( UID.entity_get('horse'), 2 ) }
		function test_entity_get_horse_3(){ assertIdentical( UID.entity_get('horse'), 3 ) }
		function test_entity_get_cow_2  (){ assertIdentical( UID.entity_get('cow')  , 2 ) }
		function test_entity_get_horse_4(){ assertIdentical( UID.entity_get('horse'), 4 ) }

		function test_entities_8 () { assertEqual( UID.entities, [undefined, 'foo', 'horse', 'cow', 'horse', 'horse', 'cow', 'horse'] ) }

		function test_UID_8() { assertIdentical( UID.UID, 8 ) }

		function test_UIDs(){ assertEqual( UID.UIDs, {'horse':4, 'cow':2} ) }
	}Test.UT.runAndCache( Test_UID, 'UID' )