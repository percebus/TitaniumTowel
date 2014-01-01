Ti.include('/src/code/lib/include.js')
var titanium   = TT.require(TT.Module.Titanium)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var iterable   = TT.require(TT.Module.Iterable)
var oop        = TT.require(TT.Module.OOP)
var session    = TT.require(TT.Module.AppProperties) 
var variable   = TT.require(TT.Module.Var)
var assert     = TT.require(TT.Module.Assert)
var events     = TT.require(TT.Module.Event)
var mem        = TT.require(TT.Module.Mem)


	var Structure = {
			view     : 'view', 		// Any Ti.UI object
			item     : 'item', 		// only child for wrapper objects, like TableViewRow
			children : 'children',	// dictionary (or list) of children
			parent   : 'parent',	// view's parent
			container: 'container', // Any container type
			window   : 'window',	// Ti.UI.Window
			tab      : 'tab' }
	exports.Structure = Structure

	var Properties = {
			fullscreen         : 'fullscreen',
			modal              : 'modal',
			navBarHidden       : 'navBarHidden',
			windowSoftInputMode: 'windowSoftInputMode' }
	exports.Properties = Properties

	var LIGHTWINDOW_ATTRS = [ 
			exports.Properties.fullscreen, 
			exports.Properties.modal, 
			exports.Properties.navBarHidden, 
			exports.Properties.windowSoftInputMode ]
	exports.LIGHTWINDOW_ATTRS = LIGHTWINDOW_ATTRS

	function Depth()
	{// Class aware of how many windows are in place
		var oAppVar = session.VarSingleton( 'depth', 0 )
		this.get    = function(){ return variable.defaultNumber( oAppVar.get() ) }
		this.SET    = oAppVar.SET
		this.PLUS   = function()  { return this.SET( this.get() +1 ) }
		this.MINUS  = function()  { return this.SET( this.get() -1 ) } 
	}
	    var oDepthSingleton = null
	function DepthSingleton() { return oop.singleton( oDepthSingleton, Depth ) }
	 exports.DepthSingleton = DepthSingleton



	function defaultAttributesWindowLight(attributes) { return dictionary.without( attributes, exports.LIGHTWINDOW_ATTRS ) }
	 exports.defaultAttributesWindowLight = defaultAttributesWindowLight

	function defaultAttributesOpenAndClose(attributes) { return dictionary.extend( attributes, {animated:true} ) }
	exports.defaultAttributesOpenAndClose = defaultAttributesOpenAndClose


	function getView(x) 
	{
assert.isObject( x, 'container.getView.x is False for isObject' ) 
	return variable.resolvePropertyOrObject( x, exports.Structure.view ) 
	}exports.getView = exports.view = getView


	function getItem(x) 
	{
assert.isObject( x, 'container.getItem.x is False for isObject' ) 
	return variable.resolvePropertyOrObject( x, exports.Structure.item ) 
	}exports.getItem = exports.item_get = exports.item = getItem


	function getChildren(x)
	{
assert.isObject( x, 'container.getChildren.x is False for isObject' ) 
	return variable.resolvePropertyOrObject( x, exports.Structure.children ) 
	}exports.getChildren = exports.children_get = exports.children = getChildren


	function getParent(x) 
	{
assert.isObject( x, 'container.getParent.x is False for isObject' ) 
	return variable.defaultToValue(  variable.resolvePropertyOrObject( x, exports.Structure.parent ),  variable.resolvePropertyOrObject( exports.view_get(x), exports.Structure.parent )  ) 
	}exports.getParent = exports.parent_get = exports.parent = getParent


	function getContainer(x) 
	{
// TODO assert.isObject( x, 'container.getContainer.x is False for isObject' ) 
	return variable.resolvePropertyOrObject( x, exports.Structure.container ) 
	}exports.getContainer = exports.container_get = exports.container = getContainer


	function getWindow(x) 
	{ 
assert.isObject( x, 'container.getWindow.x is False for isObject' )
	return variable.resolvePropertyOrObject( x, exports.Structure.window ) 
	}exports.getWindow = exports.window_get = getWindow


	function getTab(x) 
	{ 
//TODO assert.isObject( x, 'container.getTab.x is False for isObject' )
	return variable.resolvePropertyOrObject( x, exports.Structure.tab ) 
	}exports.getTab = exports.tab_get = exports.tab = getTab


	function getItemOrView(x) 
	{ 
assert.isObject( x, 'container.getItemOrView.x is False for isObject' )
	return variable.defaultToValue( exports.getItem(x), exports.getView(x) ) 
	}exports.getItemOrView = getItemOrView


	function getContainerOrView(x) 
	{ 
assert.isObject( x, 'container.getContainerOrView.x is False for isObject' )
	return variable.defaultToValue( exports.getContainer(x), exports.getView(x) ) 
	}exports.getContainerOrView = getContainerOrView


	function addView( oContainer, oItem )
	{ // method to add views
assert.isObject( oContainer, 'container.addView.oContainer is False for isObject' )
assert.isObject( oItem     , 'container.addView.oItem      is False for isObject' )
debug.log( 'container.addView', oItem )
		var _oContainer = exports.getContainerOrView(oContainer) // windows play too :)
			_oContainer.add( exports.getView(oItem) )
	return   oContainer
	}exports.addView = addView


	function setWindow( oTab, oWindow )
	{// method to add a window to a tab
assert.isObject( oTab   , 'container.setWindow.oTab    is False for isObject' )
assert.isObject( oWindow, 'container.setWindow.oWindow is False for isObject' )
debug.log( 'container.setWindow', oWindow )
		dictionary.update( exports.getTab(oTab), { window: exports.getWindow(oWindow) } )
	return oTab
	}exports.setWindow = setWindow


	function addTab( oTabGroup, oTab )
	{ // method to add a tab to a tabGroup
assert.isObject( oTabGroup, 'container.addTab.oTabGroup is False for isObject' )
assert.isObject( oTab     , 'container.addTab.oTab      is False for isObject' )
debug.log( 'container.addTab', oTab )
		var _oTabGroup = exports.getContainer(oTabGroup)
			_oTabGroup.addTab( exports.getTab(oTab) )
	return oTabGroup
	}exports.addTab = addTab


	function addChild( oParent, oChild )
	{
// TODO oChild isNothingOr isObject?
assert.isObject( oParent, 'container.addChild.oParent is False for isObject' )
assert.isObject( oChild , 'container.addChild.oChild  is False for isObject' )
debug.log( 'container.addChild', oChild )
		var _oParent = exports.getContainerOrView(oParent)
	if ( variable.isTiUItype( _oParent, titanium.Ti.UI.Tab      ) ) return exports.setWindow( oParent, oChild ) // Tab
	if ( variable.isTiUItype( _oParent, titanium.Ti.UI.TabGroup ) ) return exports.addTab   ( oParent, oChild ) // TabGroup
		try
		{
	return exports.addView( oParent, oChild ) // View
		}catch(err){}
	return null
	}exports.addChild = addChild


	function add( oView, item_s )
	{
assert.isObject( oView, 'container.add.oView is False for isObject' )
debug.log( 'container.add', item_s )
		sequenc.map( sequence.toList(item_s), function(oItem) { exports.addChild( oView, oItem ) }  )
	return oView
	}exports.add = add



	function createStealthWindow()
	{
	return Ti.UI.createWindow({
		visible: false, 
		width  : 0, 
		height : 0})
	}exports.createStealthWindow = createStealthWindow
	var     oStealthWindowSingleton = null
	function StealthWindowSingleton(doOpen) 
	{ 
		if ( compare.isInstance(oStealthWindowSingleton) )
		{
	return oStealthWindowSingleton
		}
		var oWindow = createStealthWindow()
		if ( variable.defaultBoolean( doOpen, true ) )
			oWindow.open()
	return  oWindow
	}exports.StealthWindowSingleton = StealthWindowSingleton


	function GC()
	{
		var oCollector = null

		this.get = function()
		{
			   this.oCollector = exports.StealthWindowSingleton()
		return this.oCollector
		}

		this.add = function(x) { return exports.add( this.get(), x ) }

		this.dispose = function()
		{
			var _oCollector = this.get()
			iterable.each( _oWin.children, 
				function(child)
				{
					child.visible = false
// TODO remove child from child.parent
				} )
// TODO mem-clean up
			    _oCollector.close() // this should empty w/e contents
			    _oCollector = null
			this.oCollector = null
		return this.get()
		}
	}exports.GC = GC
	var     oGC = null
	function GCsingleton() { return oop.singleton( oGC, GC ) }
	 exports.GCsingleton = GCsingleton



	function structView(oView)
	{
assert.isObject( oView, 'container.structItem.oView    is False for isObject' )
	return  { view: oView }		
	}exports.structView = structView


	function structChildren( oView, children )
	{
assert.isObject    ( oView   , 'container.structItem.oView    is False for isObject' )
assert.isCollection( children, 'container.structItem.children is False for isCollection' )
	return  { view: oView, children: children, type: exports.Structure.children }		
	}exports.structChildren = structChildren


	function structItem( oItem, oView )
	{
assert.isObject( oItem, 'container.structItem.oItem is False for isObject' )
assert.isObject( oView, 'container.structItem.oView is False for isObject' )
	return  { view: oView, item: oItem, type: exports.Structure.item }
	}exports.structItem = structItem


	function structContainer( oView, oContainer )
	{
assert.isObject( oView     , 'container.structContainer.oView      is False for isObject' )
assert.isObject( oContainer, 'container.structContainer.oContainer is False for isObject' )
	return { container: oContainer, view: oView, item: oView, type: exports.Structure.container }
	}exports.structContainer = structContainer


	function structWindow( oView, oWindow )
	{
assert.isObject( oView  , 'container.structWindow.oView      is False for isObject' )
assert.isObject( oWindow, 'container.structWindow.oContainer is False for isObject' )
	return { container: oWindow, window: oWindow, view: oView, item: oView, type: exports.Structure.window }
	}exports.structWindow = structWindow


	function structTab( oWindow, oTab )
	{
assert.isObject( oWindow, 'container.structTab.oWindow is False for isObject' )
assert.isObject( oTab   , 'container.structTab.oTab    is False for isObject' )
	return { container: oTab, tab: oTab, window: oWindow, item: oWindow, type: exports.Structure.tab }
	}exports.structTab = structTab


	function structSingleTabGroup( oTab, oTabGroup )
	{
assert.isObject( oTab     , 'container.structSingleTabGroup.oTab      is False for isObject' )
assert.isObject( oTabGroup, 'container.structSingleTabGroup.oTabGroup is False for isObject' )
	return { container: oTabGroup, tab: oTab, item: oTab, type: 'singleTabGroup' }
	}exports.structSingleTabGroup = structSingleTabGroup



	function container_onClose(oContainer)
	{
exports.DepthSingleton().MINUS()
mem.disposeContainer( exports.getContainerOrView(oContainer) )
	return oContainer
	}exports.container_onClose = container_onClose


	function containerOpen( oContainer, attributes, oParent )
	{
		var attributes = exports.defaultAttributesOpenAndClose(attributes)
		var _oContainer = variable.defaultWindow( exports.getContainer(oContainer) )
debug.log( 'container.open', _oContainer, true )
debug.log( ' > attributes' , attributes )
		var _oParent    = exports.getTab(oParent)
		if ( variable.isTiObject(_oContainer) )
		{
			if ( variable.isTiObject(_oParent) ) _oParent.open( _oContainer, attributes )	// Tabs
			else	  						  _oContainer.open()							// Windows and TabGroups
//			opener.show() 
exports.DepthSingleton().PLUS()
debug.log( ' > ', mem.RAM(), true )
		}
	return oContainer
	}exports.containerOpen = exports.open = exports.openContainer = containerOpen


	function containerClose( oContainer, attributes, oParent )
	{
		var attributes = exports.defaultAttributesOpenAndClose(attributes)
debug.log( 'container.close ' + variable.hash(oContainer), attributes )
		var _oContainer = variable.defaultWindow( exports.getContainer(oContainer) )
		var _oParent       = exports.getTab(oParent)
		if ( variable.isTiObject(_oContainer) )
		{// since the above, it will always pass. We just leave it here for future mods
			var closer = variable.defaultToValue( _oParent, _oContainer )
//				closer.hide()
			if ( variable.isTiObject(_oParent) ) _oParent.close( _oContainer, attributes )
			else	 						  _oContainer.close(attributes) 			// Windows and TabGroups
		}
	return oContainer
	}exports.containerClose = exports.close = exports.closeContainer = containerClose


	function windowOpen( oWin, attributes ) 
	{ // TODO add stack of windows to close?
assert.isAttributes( attributes, 'container.windowOpen.attributes is False for isAttributes' )
assert.isObject( oWin, 'container.windowOpen.oWin is False for isObject' ) // cannot use currentWindow for an inexisting one!
exports.containerOpen ( oWin, attributes ) 
	}exports.windowOpen = exports.openWindow = windowOpen


	function windowClose( oWin, attributes ) 
	{
assert.isAttributes( attributes, 'container.windowClose.attributes is False for isAttributes' )
assert.isNothingOrFn( oWin, variable.isObject, 'container.windowClose.oWin is False for isObject' ) 
exports.containerClose( oWin, attributes ) 
	}exports.windowClose = closeWindow = windowClose


	function windowOpenModal( oWin, attributes ) 
	{ 
assert.isAttributes( attributes, 'container.windowOpenModal.attributes is False for isAttributes' )
assert.isObject( oWin, 'container.windowOpenModal.oWin is False for isObject' ) // cannot use currentWindow for an inexisting one! 
exports.windowOpen(  oWin,  dictionary.update( attributes, { modal: true } )  ) 
	}exports.windowOpenModal = exports.openWindowAsModal = windowOpenModal


	function windowOpenFullscreen( oWin, attributes )  
	{
assert.isAttributes( attributes, 'container.windowOpenFullscreen.attributes is False for isAttributes' )
assert.isNothingOrFn( oWin, variable.isObject, 'container.windowOpenFullscreen.oWin is False for isObject' ) 
exports.windowOpen(  oWin, dictionary.update( attributes, { fullscreen: true } )  ) 
	}exports.windowOpenFullscreen = exports.openWindowAsFullscreen = windowOpenFullscreen


	function tabOpen( oWin, oTab, attributes ) 
	{
assert.isAttributes( attributes, 'container.tabOpen.attributes is False for isAttributes' )
assert.isNothingOrFn( oWin, variable.isObject, 'container.tabOpen.oWin is False for isObject' )
assert.isNothingOrFn( oTab, variable.isObject, 'container.tabOpen.oTab is False for isObject' ) 
exports.containerOpen( oWin, attributes, variable.defaultTab(oTab) ) 
	}exports.tabOpen = tabOpen


	function tabClose( oWin, oTab, attributes )
	{
assert.isAttributes( attributes, 'container.tabOpen.attributes is False for isAttributes' )
assert.isNothingOrFn( oWin, variable.isObject, 'container.tabOpen.oWin is False for isObject' )
assert.isNothingOrFn( oTab, variable.isObject, 'container.tabOpen.oTab is False for isObject' ) 
exports.containerClose( oWin, attributes, variable.defaultTab(oTab) ) 
	}exports.tabClose = tabClose


	function tabgroupOpen( oTabGroup, attributes ) 
	{ 
assert.isAttributes( attributes, 'container.tabgroupOpen.attributes is False for isAttributes' )
assert.isObject( oTabGroup, 'container.tabgroupOpen.oTabGroup is False for isObject' )
exports.containerOpen(  oTabGroup,  dictionary.extend( attributes, {transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT} )  ) 
	}exports.tabgroupOpen = exports.openTabgroup = tabgroupOpen


	function tabgroupClose( oTabGroup, attributes ) 
	{ 
assert.isAttributes( attributes, 'container.tabgroupClose.attributes is False for isAttributes' )
assert.isObject( oTabGroup, 'container.tabgroupClose.tabGroupClose is False for isObject' )
exports.containerClose( oTabGroup, attributes ) 
	}exports.tabgroupClose = exports.closeTabgroup = tabgroupClose


	function currentWindowClose(attributes)
	{ 
assert.isAttributes( attributes         , 'container.currentWindowClose.attributes is False for isAttributes' )
assert.isTiObject  ( Ti.UI.currentWindow, 'container.currentWindowClose Ti.UI.currentWindow is False for isTiObject... not in context?')
exports.windowClose( Ti.UI.currentWindow, attributes ) 
	}exports.currentWindowClose = currentWindowClose



	function createViewByChildren( children, attributes, createView )
	{
assert.isCollection( children  , 'ui.createViewByChildren.children   is False for isCollection' )
assert.isAttributes( attributes, 'ui.createViewByChildren.attributes is False for isAttributes' )
		var createView = variable.defaultFunction( createView, Ti.UI.createView )
	return container.structChildren(   container.add(  createView( compare.defaultDictionary(attributes) ),  dictionary.values(children)  ),   children   )
	}exports.createViewByChildren = createViewByChildren


	function createViewHorizontalByChildren( children, attributes )
	{
assert.isCollection( children  , 'ui.createViewHorizontalByChildren.children   is False for isCollection' )
assert.isAttributes( attributes, 'ui.createViewHorizontalByChildren.attributes is False for isAttributes' )
	return exports.createViewByChildren(  children,  dictionary.update( attributes, exports.Align.horizontal )  )
	}exports.createViewHorizontalByChildren = exports.VL = createViewHorizontalByChildren


	function createViewVerticalByChildren( children, attributes )
	{
assert.isCollection( children  , 'ui.createViewVerticalByChildren.children   is False for isCollection' )
assert.isAttributes( attributes, 'ui.createViewVerticalByChildren.attributes is False for isAttributes' )
	return exports.createViewByChildren(  children,  dictionary.update( attributes, exports.Align.vertical )  )
	}exports.createViewVerticalByChildren = exports.HL = createViewVerticalByChildren


	function createViewByView( oItem, attributes, createView )
	{
// TODO assert oItem is TiObject or even better: View
		var createView = variable.defaultFunction( createView, Ti.UI.createView )
	return exports.structItem(   oItem,   exports.addView(  createView( variable.defaultDictionary(attributes) ),  exports.view_get(oItem)  )   )
	}exports.createViewByView = createViewByView


	function wrap( oView, attributes )
	{
// TODO assert oItem is TiObject 
	return exports.createViewByView( oView, attributes ) 
	}exports.wrap = wrap


	function createTableViewRowByView( oView, attributes ) 
	{
// TODO assert oItem is TiObject or even better: View
	return exports.createViewByView( oView, attributes, Ti.UI.createTableViewRow ) 
	}exports.createTableViewRowByView = createTableViewRowByView


	function createScrollViewByView( oView, attributes ) 
	{
// TODO assert oItem is TiObject or even better: View
	return exports.createViewByView( oView, attributes, Ti.UI.createScrollView ) 
	}exports.createScrollViewByView = createScrollViewByView



	function createWindowByView( oView, attributes )
	{
// TODO assert oItem is TiObject or even better: View
	return exports.structWindow(   oView,   exports.addView(  Ti.UI.createWindow( compare.defaultDictionary(attributes) ),  exports.view_get(oView)  )   )
	}exports.createWindowByView = createWindowByView


	function createTabByWindow( oWindow, attributes )
	{
// TODO assert oWindow is TiObject
	return exports.structTab(   oWindow,   exports.addTab(  Ti.UI.createTab( compare.defaultDictionary(attributes) ),  exports.getWindow(oWindow)  )   )
	}exports.createTabByWindow = createTabByWindow


	function createSingleTabGroup( oTab, attributes )
	{
// TODO assert oTab is TiObject
	return exports.structSingleTabGroup(   oTab,   exports.addTab(  Ti.UI.createTabGroup( compare.defaultDictionary(attributes) ),  exports.getTab(oTab)  )   )
	}exports.createSingleTabGroup = createSingleTabGroup


