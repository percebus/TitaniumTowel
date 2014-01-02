/*
Ti.include('/src/code/towel/include.js')
var dictionary = TT.require(TT.Module.Dictionary)
var iterable   = TT.require(TT.Module.Iterable)
var variable   = TT.require(TT.Module.Var)
var events     = TT.require(TT.Module.Event)
var mem        = TT.require(TT.Module.Mem)

	var LIGHTWINDOW_ATTRS = [ 'fullscreen', 'modal', 'navBarHidden', 'windowSoftInputMode' ]

	function Depth()
	{// Class aware of how many windows are in place
		var DEPTH  = 'depth'
		this.get   = function(){ return Ti.App.Properties.getInt(DEPTH) || 0 }
		this.set   = function(input)
						{
							Ti.App.Properties.setInt( DEPTH, input )
						return this.GET()
						}
		this.add    = function()  { return this.set( this.get() +1 ) }
		this.remove = function()  { return this.set( this.get() -1 ) } 
	}oDepth = new Depth()
	exports.oDepth = oDepth

	function defaultAttributesWindowLight(attributes) { return sequence.map( LIGHTWINDOW_ATTRS, function (attr){ dictionary.property_delete( attributes, attr ) }  ) }
	 exports.defaultAttributesWindowLight = defaultAttributesWindowLight

	function defaultAttributesOpenAndClose(attributes) { return dictionary.extend( attributes, { animated: true } ) }
	exports.defaultAttributesOpenAndClose = defaultAttributesOpenAndClose

	function defaultWindow(win) { return win || Ti.UI.currentWindow }
	 exports.defaultWindow = defaultWindow

	function defaultTab   (tab) { return tab || Ti.UI.currentTab }
	 exports.defaultTab = defaultTab

	function addListToContainer( oContainer, list )
	{
		sequence.map( variable.toList(list), 
			function(item) 
			{ 
					 if ( variable.hasMethod( oContainer, 'addTab' ) ) oContainer.addTab(item)
				else if ( variable.hasMethod( oContainer, 'add'    ) ) oContainer.add   (item) 
			} )
	return oContainer
	}exports.addListToContainer = addListToContainer


	function containerOpen( oContainer, attributes, tab )
	{
		var attributes = exports.defaultAttributesOpenAndClose(attributes)
debug.log( 'container.open ' + variable.hash(oContainer), attributes )
		if (oContainer)
		{// NOT currentWin!
			var opener = tab || oContainer
			if (tab)        tab.open( oContainer, attributes ) 	// for tabs
			else	 oContainer.open(attributes)			    // for tabGroup or Window
			opener.show()
			oDepth.add()
debug.log( ' > ', mem.RAM(), true )
		}
	return oContainer
	}exports.containerOpen = containerOpen


	function container_onClose(oContainer)
	{
		oDepth.remove() // We don't do it inside Dispose since it is recursive!
mem.disposeContainer(oContainer)
	return oContainer
	}exports.container_onClose = container_onClose


	function containerClose( oContainer, attributes, tab )
	{
		var oContainer = exports.defaultWindow(oContainer)
		var attributes = exports.defaultAttributesOpenAndClose(attributes)
debug.log( 'container.close ' + variable.hash(oContainer), attributes )
		if (oContainer)
		{// since the above, it will always pass. We just leave it here for future mods
			var closer = tab || oContainer
			if (tab)	 tab.close( oContainer, attributes )
			else		 oContainer.close(attributes)
		}
	return oContainer
	}exports.containerClose = containerClose


	function windowOpen ( win, attributes ) { exports.containerOpen ( win, attributes ) }
	exports.windowOpen = windowOpen

	function windowClose( win, attributes ) { exports.containerClose( win, attributes ) }
	exports.windowClose = windowClose

	function windowOpenModal( win, attributes )  { exports.containerOpen(  win,  dictionary.update( dictionary.extend(attributes), { modal: true } )  ) }
	 exports.windowOpenModal = windowOpenModal

	function windowOpenFullscreen( win, attributes )  { exports.containerOpen( win, dictionary.update(  dictionary.extend(attributes), { fullscreen: true } )  ) }
	 exports.windowOpenFullscreen = windowOpenFullscreen

	function tabOpen	( win, attributes, tab ) { exports.containerOpen ( win, attributes, exports.defaultTab(tab) ) }
	 exports.tabOpen = tabOpen

	function tabClose	( win, attributes, tab ) { exports.containerClose( win, attributes, exports.defaultTab(tab) ) }
	 exports.tabClose = tabClose

	function tabGroupOpen ( tabGroup, attributes ) { tabGroup.open(  dictionary.extend( attributes, { transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT } )  ) }
	 exports.tabGroupOpen = tabGroupOpen

	function tabGroupClose( tabGroup, attributes ) { tabGroup.close(attributes) }
	 exports.tabGroupClose = tabGroupClose

	function currentWindowClose(attributes)		{ exports.windowOpen( Ti.UI.currentWindow, attributes ) }
	exports.currentWindowClose = currentWindowClose

	function windowOpenWithCurrentTab( win, attributes )  { exports.tabOpen( win, attributes, Ti.UI.currentTab ) }
	exports.windowOpenWithCurrentTab = windowOpenWithCurrentTab

	function windowCloseWithCurrentTab( win, attributes ) { exports.tabClose( win, attributes, Ti.UI.currentTab ) }
	exports.windowCloseWithCurrentTab = windowCloseWithCurrentTab


	function toggleNavBar(win)
	{
		var win = exports.defaultWindow(win)
		if (win.navBarHidden) 	win.showNavBar()
		else					win.hideNavBar()
	return win
	}exports.toggleNavBar = toggleNavBar


	function createWindow(attributes)
	{
		var win = Ti.UI.createWindow( dictionary.extend(attributes) )
	return  events.eventListenerAdd( 'close', function(e){ exports.container_onClose(win) }, win )
	}exports.createWindow = createWindow


	function createWindowModal(attributes)  { return exports.createWindow( dictionary.update( attributes, { modal: true } ) ) }
	 exports.createWindowModal = createWindowModal

// Just in case we want to do something fancy later on, like on createWindow
	function createTab(attributes) { return Ti.UI.createTab(attributes) }
	 exports.createTab = createTab

	function createTabGroup(attributes) { return Ti.UI.createTabGroup(attributes) }
	 exports.createTabGroup = createTabGroup


	function createWindowAndTab( attrWindow, attrTab )
	{
		var win = exports.createWindow(attrWindow)
		var tab = exports.createTab(  dictionary.extend( attrTab, { window: win } )  )
	return { win: win, tab: tab }
	}exports.createWindowAndTab = createWindowAndTab


	function createTabAndTabgroup( attrTab, attrTabgroup )
	{
		var tab      = exports.createTab(attrTab)
		var tabGroup = exports.addListToContainer( exports.createTabGroup(attrTabgroup), [tab] )
	return { tab: tab, tabGroup: tabGroup }
	}exports.createTabAndTabgroup = createTabAndTabgroup


	function createWindowAndTabAndTabgroup( attrWindow, attrTab, attrTabgroup )
	{
		var containers          = exports.createWindowAndTab(  dictionary.extend( attrWindow, { tabBarHidden: true } ),  attrTab  )
			tabGroup			= exports.createTabGroup(attrTabgroup)
			tabGroup.addTab(containers.tab)
			containers.tabGroup = tabGroup
	return  containers
	}exports.createWindowAndTabAndTabgroup = createWindowAndTabAndTabgroup


	function createTabAndTabgroupByWin( win, attrTab, attrTabgroup )
	{
		var win = exports.defaultWindow(win)
	return  dictionary.extend(  exports.createTabAndTabgroup( dictionary.extend( attrTab, { window: win } ), attrTabgroup ),  { win: win }  )
	}exports.createTabAndTabgroupByWin = createTabAndTabgroupByWin
*/