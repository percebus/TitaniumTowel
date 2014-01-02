Ti.include('/src/code/towel/test/include.js');

	iterable = require(TT.Module.Iterable)
	variable = require(TT.Module.Var)
	events   = require(TT.Module.Event)

	function run (x) { assertEqual( x.type, 'runner' ) }
	function walk(x) { assertEqual( variable.hash(x.data), variable.hash(['5', false, 7]) ) }
	function yell(x) { assertEqual( variable.hash(x.data), variable.hash({a:1, b:2, c:3}) ) }
	fn = {'run': run, 'walk': walk, 'yell': yell}
	oWalk = [walk]
	oRun  = [run]
	oRun2 = [run, yell]

	function Test_event_initial()
	{
		function test__eventListeners         () { assertUndefined(Ti.App._eventListeners) }
		function test_events                  () { assertEqual( events.events(), {} ) }
		function test_listeners_runner        () { assertEqual( events.listeners('runner'), {} ) }
		function test_listeners_walker        () { assertEqual( events.listeners('walker'), {} ) }
		function test_hasEvents               () { assertFalse( events.hasEvents() ) }
		function test_hasEventListeners_runner() { assertFalse( events.hasEventListeners('runner') ) }
		function test_hasEventListeners_walker() { assertFalse( events.hasEventListeners('walker') ) }

		function test_fire() { events.fire('nothing') }		
	}Test.UT.runAndCache( Test_event_initial, 'event initial' )


	function Test_event_listener_add_run()
	{
		function run (x) { assertEqual( x.type, 'runner' ) }
		function setUp() { events.eventListenerAdd( 'runner', run ) }

		function test__eventListeners         () { assertEqual( Ti.App._eventListeners, {runner: oRun} ) }
		function test__eventListeners_runner  () { assertTrue ( 'runner' in Ti.App._eventListeners ) }
		function test__eventListeners_walker  () { assertFalse( 'walker' in Ti.App._eventListeners ) }
		function test_listeners_runner        () { assertEqual( events.listeners('runner'), oRun ) }
		function test_listeners_walker        () { assertEqual( events.listeners('walker'), {} ) }
		function test_hasEvents               () { assertTrue ( events.hasEvents() ) }
		function test_hasEventListeners_runner() { assertTrue ( events.hasEventListeners('runner') ) }
		function test_hasEventListeners_walker() { assertFalse( events.hasEventListeners('walker') ) }

		function test_fire_runner() { events.fire( 'runner' , {a:1, b:2, c:3}) }		
	}Test.UT.runAndCache( Test_event_listener_add_run, 'event listener_add run' )


	function Test_event_listener_add_walk()
	{
		function walk(x) { assertEqual( variable.hash(x.data), variable.hash(['5', false, 7]) ) }
		function setUp() { events.eventListenerAdd( 'walker', walk ) }

		function test__eventListeners         () { assertEqual( Ti.App._eventListeners, {runner: oRun, walker: oWalk} ) }
		function test__eventListeners_runner  () { assertTrue ( 'runner' in Ti.App._eventListeners ) }
		function test__eventListeners_walker  () { assertTrue ( 'walker' in Ti.App._eventListeners ) }
		function test_listeners_runner        () { assertEqual( events.listeners('runner'), oRun ) }
		function test_listeners_walker        () { assertEqual( events.listeners('walker'), oWalk ) }
		function test_hasEvents               () { assertTrue ( events.hasEvents() ) }
		function test_hasEventListeners_runner() { assertTrue ( events.hasEventListeners('runner') ) }
		function test_hasEventListeners_walker() { assertTrue ( events.hasEventListeners('walker') ) }

		function test_fire_runner() { events.fire( 'runner' , {a:1, b:2, c:3}) }
		function test_fire_walker() { events.fire( 'walker' , ['5', false, 7]) }		
	}Test.UT.runAndCache( Test_event_listener_add_walk, 'event listener_add walk' )


	function Test_event_listener_add_yell()
	{
		function yell(x) { assertEqual( variable.hash(x.data), variable.hash({a:1, b:2, c:3}) ) }
		function setUp() { events.listener_add( 'runner', yell ) }

		function test__eventListeners_before  () { Ti.App._eventListeners, {runner: oRun2, walker: oWalk} }
		function test_listeners_runner        () { assertEqual( variable.hash(events.listeners('runner')), variable.hash(oRun2) ) }
		function test_listeners_walker        () { assertEqual( events.listeners('walker'), oWalk ) }
		function test_hasEvents               () { assertTrue ( events.hasEvents() ) }
		function test_hasEventListeners_runner() { assertTrue ( events.hasEventListeners('runner') ) }
		function test_hasEventListeners_walker() { assertTrue ( events.hasEventListeners('walker') ) }

		function test_fire_runner              () { events.fire         ( 'runner' , {a:1, b:2, c:3}) }
		function test_fireAndRemove            () { events.fireAndRemove( 'walker' , ['5', false, 7]) }
		function test_hasEventListeners2_runner() { assertTrue ( events.hasEventListeners('runner') ) }
//		function test_hasEventListeners2_walker() { assertFalse( events.hasEventListeners('walker') ) }
		function test_eventRemove_runner() 
		{ 
events.event_remove( 'runner' )
//			assertFalse( events.hasEventListeners('runner') )
		}

		function test__eventListeners_after() { Ti.App._eventListeners, {} }
	}Test.UT.runAndCache( Test_event_listener_add_yell, 'event listener_add yell' )

