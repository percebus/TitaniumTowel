Ti.include('/src/code/towel/test/include.js');

	container = require('src/code/towel/container');
	variable  = require('src/code/towel/var');


	oWindow = Ti.UI.createWindow({
		layout         : 'vertical',
		title          : 'title',
		backgroundColor: 'blue' });

	oTabGroup = Ti.UI.createTabGroup({backgroundColor: 'brown'});

	oTab = Ti.UI.createTab({
		title          : 'tab',
//		window         : oWindow,
		backgroundColor: 'grey' });
	container.add(oTab, oWindow);

	oTab.addEventListener( 'click', 
		function(e)
		{ //TODO not working?
container.tabgroupClose(oTabGroup) 
		})

	oButtonClose = Ti.UI.createButton({title: 'close TabGroup'})
	oButtonClose.addEventListener( 'click', 
		function(e) 
		{ 
container.tabgroupClose(oTabGroup)
		})

	oButtonTab = Ti.UI.createButton({title: 'open tab'})
	oButtonTab.addEventListener( 'click', 
		function(e)
		{ 
			oWindowTab = Ti.UI.createWindow({
				title          : 'Tab Window',
				backgroundColor: 'red'})
			oWindowTab.addEventListener( 'click',  
				function(e) 
				{ 
container.tabClose( oWindowTab, oTab ) 
				})

container.tabOpen( oWindowTab, oTab ) 
		} )


	oButtonContext = Ti.UI.createButton({title: 'open context'})
	oButtonContext.addEventListener( 'click',
		function(e)
		{
			oWindowContext = Ti.UI.createWindow({
				backgroundColor: 'yellow',
				title          : 'sub-context',
				url            : 'context.js'})
container.tabOpen(oWindowContext, oTab)
		} )


	oButtonModal = Ti.UI.createButton({title: 'open modal'})
	oButtonModal.addEventListener( 'click', 
		function(e)
		{
			oModal = Ti.UI.createWindow({
//				modal          : true,
				title          : 'Modal Window',
				backgroundColor: 'purple'})
			oModal.addEventListener( 'click', 
				function(e)
				{ 
container.windowClose(oModal) 
				})
 
container.windowOpenModal(oModal) 
		})

	oButtonWindow = Ti.UI.createButton({title: 'open window'})
	oButtonWindow.addEventListener( 'click', 
		function(e)
		{
			oWin = Ti.UI.createWindow({
				title          : 'New Window',
				backgroundColor: 'green'})
			oWin.addEventListener( 'click', 
				function(e)
				{ 
container.windowClose(oWin) 
				})
 
container.windowOpen(oWin) 
		})

	container.add( oWindow, [oButtonTab, oButtonModal, oButtonContext, oButtonWindow, oButtonClose] )
	container.add( oTabGroup, oTab )

	function Test_container_open_close()
	{// currentWindow and currentTab only work in external contexts!
		function test_before_Titainum_currentWindow() { assertTrue( variable.isNothing(Titanium.UI.currentWindow) ) }
		function test_before_Titanium_currentTab   () { assertTrue( variable.isNothing(Titanium.UI.currentTab) ) }
		function test_before_Ti_currentWindow      () { assertTrue( variable.isNothing(      Ti.UI.currentWindow) ) }
		function test_before_Ti_currentTab         () { assertTrue( variable.isNothing(      Ti.UI.currentTab) ) }
		function test_tabGroup                     () { container.tabgroupOpen(oTabGroup) }
		function test_after_Titainum_currentWindow () { assertTrue( variable.isNothing(Titanium.UI.currentWindow) ) }
		function test_after_Titanium_currentTab    () { assertTrue( variable.isNothing(Titanium.UI.currentTab) ) }
		function test_after_Ti_currentWindow       () { assertTrue( variable.isNothing(      Ti.UI.currentWindow) ) }
		function test_after_Ti_currentTab          () { assertTrue( variable.isNothing(      Ti.UI.currentTab) ) }
	}Test.UT.runAndCache( Test_container_open_close, 'container open & close' )
