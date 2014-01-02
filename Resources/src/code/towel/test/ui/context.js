Ti.include('/src/code/towel/test/include.js');

	variable  = require('src/code/towel/var');
	container = require('src/code/towel/container');
	titanium  = require('src/code/towel/titanium');


	oTitle = Ti.UI.createLabel({text: 'Other context'})

	oButtonTab = Ti.UI.createButton({title: 'Open Window'})
	oButtonTab.addEventListener( 'click',
		function(e)
		{
			oWinTab = Ti.UI.createWindow({
				title          : 'sub-sub window',
				backgroundColor: 'navy'})
			oWinTab.addEventListener('click',
				function(e)
				{
container.windowClose(oWinTab)
				} )
container.tabOpen(oWinTab) // Look ma, no hands! (oTab or currentTab)
		} )

	oButtonClose1 = Ti.UI.createButton({title: 'containerClose'})
	oButtonClose1.addEventListener('click', 
		function(e)
		{
container.containerClose()
		})

	oButtonClose2 = Ti.UI.createButton({title: 'windowClose'})
	oButtonClose2.addEventListener('click', 
		function(e)
		{
container.windowClose()
		})

	oButtonClose3 = Ti.UI.createButton({title: 'currentWindowClose'})
	oButtonClose3.addEventListener('click', 
		function(e)
		{
container.currentWindowClose()
		})


	oWin = Ti.UI.currentWindow
	oWin.layout = 'vertical'
	container.add( oWin, [oTitle, oButtonTab, oButtonClose1, oButtonClose2, oButtonClose3] )


	function Test_current()
	{
		function test_Titainum_currentWindow () { assertIdentical( Titanium.UI.currentWindow, Ti.UI.currentWindow ) }
		function test_Titanium_currentTab    () { assertIdentical( Titanium.UI.currentTab   , Ti.UI.currentTab    ) }
		function test_Ti_currentWindow       () { assertTrue( variable.isTiObject(Ti.UI.currentWindow) ) }
		function test_Ti_currentTab          () { assertTrue( variable.isTiObject(Ti.UI.currentTab) ) }
		function test_name_currentWindow     () { assertIdentical( variable.getTypeName(Ti.UI.currentWindow), titanium.Ti.UI.Window ) }
		function test_name_currentTab        () { assertIdentical( variable.getTypeName(Ti.UI.currentTab   ), titanium.Ti.UI.Tab    ) }
	}Test.UT.runAndCache( Test_current, 'Ti.UI.current' )

Ti.API.info( variable.getTypeNames(Ti.UI.currentWindow) )
