Ti.include('/src/code/lib/include.js')
var os        = TT.require(TT.Module.OS)
var iterable  = TT.require(TT.Module.Iterable)
var dateTime  = TT.require(TT.Module.DateTime)
var variable  = TT.require(TT.Module.Var)
var uri       = TT.require(TT.Module.URI)
var nw        = TT.require(TT.Module.NW)
var container = TT.require(TT.Module.Container)


	if (os.isIOS)
	{
		function iOS_createCancelAndDoneToolbar( id, fnCancel, fnDone, attributes, buttonsStyle )
		{
			var buttonsStyle = buttonsStyle || Ti.UI.iPhone.SystemButtonStyle.BORDERED
			var buttons      = []
	
			if ( variable.isType( fnCancel, 'function' ) )
			{
				var oCancel = Ti.UI.createButton(  addSelectorsToAttributes( 'keyboard_cancel', id, { title: 'Cancel', style: buttonsStyle } )  )
					oCancel.addEventListener( 'click', fnCancel )
				buttons.push(oCancel)
			}
	
			buttons.push(  Ti.UI.createButton( { systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE } )  )
	
			if ( variable.isType( fnDone, 'function' ) )
			{
				var oDone = Ti.UI.createButton(  addSelectorsToAttributes( 'keyboard_done', id, { title: 'Done', style: buttonsStyle } )  )
					oDone.addEventListener( 'click', fnDone )
				buttons.push(oDone)
			}

			var attributes       = addSelectorsToAttributes( 'iOS_toolBar', id, attributes )
				attributes.items = buttons
			   oToolBar = Ti.UI.iOS.createToolbar(attributes)
		return oToolBar
		}exports.iOS_createCancelAndDoneToolbar = iOS_createCancelAndDoneToolbar
	}


// TODO data
	function classId( className, id )  { return className + '_' + ( id || 1 )  }
	exports.classId = classId

	function addSelectorsToAttributes( className, id, attributes ) { return iterable.defaultDictionary( attributes, { className: className, id: exports.classId( className, id ) } ) }
	 exports.addSelectorsToAttributes = addSelectorsToAttributes


	function defaultAttributesRanges( min, max, value,  attributes ) { return  iterable.defaultDictionary( attributes, { min: min, value: value, max: max } ) }
	exports.defaultAttributesRanges = defaultAttributesRanges


    function createSlider		( min, max, value, attributes ) { return Ti.UI.createSlider     (  exports.defaultAttributesRanges( min, max, value, attributes )  ) }
     exports.createSlider = createSlider

    function createProgressBar	( min, max, value, attributes ) { return Ti.UI.createProgressBar(  exports.defaultAttributesRanges( min, max, value, attributes )  ) }
     exports.createProgressBar = createProgressBar

	function createButton( fn, attributes )
	{ 
		var oButton = Ti.UI.createButton( iterable.defaultDictionary(attributes) )
		if ( variable.isFunction(fn) )
			oButton.addEventListener( 'click', fn )
	return  oButton
	}exports.createButton = createButton

	function createButtonLabel ( title, fn, attributes ) { return exports.createButton(  fn,  iterable.defaultDictionary( attributes, { title: title } )  )  }
	 exports.createButtonLabel = createButtonLabel

	function downloadImage( oImage, URL, path, attributes )
	{
		var oNW = nw.createNWclient(attributes)
			oNW = nw.NWevents( oNW, { onload: function(e) {  oImage.image = nw.onloadSaveBLObToFile( oNW, path ) } } )
nw.NWrequest( URL, method, data, override )
	}exports.downloadImage = downloadImage

	function createImageWithDefault( image, defaultImage, attributes ) { return exports.createImage( image, iterable.defaultDictionary( attributes, { defaultImage: defaultImage } ) ) }
	 exports.createImageWithDefault = createImageWithDefault

	function createImageFromURL( URL, path, defaultImage, attrImg, attrNW )
	{
		var oImage = Ti.UI.createImageView( iterable.defaultDictionary( attrImg, { defaultImage: defaultImage } ) )
exports.downloadImage( oImage, URL, path, attrNW )
	return  oImage
	}exports.createImageFromURL = createImageFromURL


	function createImage( input, attributes ) 
	{
		var attributes = iterable.defaultDictionary( attributes, { cache: null } )
		if ( variable.isString(attributes.cache) && variable.exists(attributes.defaultImage) )
		{
	return exports.createImageFromURL( input, attributes.cache, attributes.defaultImage, attributes )
		}
	// implicit else
		if ( variable.exists(attributes.defaultImage) )
		{
	return exports.createImageWithDefault( input, attributes.defaultImage, attributes )
		}
	// implicit else
	return Ti.UI.createImageView( iterable.defaultDictionary( attributes, { image: image } ) ) 
	}exports.createImage = createImage


	function createLabel( text, attributes ) { return Ti.UI.createLabel(  iterable.defaultDictionary( attributes, { text: text } )  )  }
	exports.createLabel = createLabel

	function createLabelHTMLorText( HTML, defaultText, attributes )
	{
		var attributes = iterable.defaultDictionary(attributes)
		if (os.isAndroid)	attributes.html = HTML
		else				attributes.text = defaultText
	return ( os.isAndroid || defaultText ) ? exports.createLabel( defaultText, attributes ) : null
	}exports.createLabelHTMLorText = createLabelHTMLorText

	function createTextareaAutolink( tag, text, textDefault, attributes )
	{
		var tag		         = tag || 'all'
	    var autoLink         = uri.Linkify[tag] || null
		var attributes       = iterable.defaultDictionary( attributes, { editable: false } )
			attributes.value = (autoLink) ? text : textDefault
		if (autoLink) attributes.autoLink = autoLink
	return ( textDefault || autoLink ) ? Ti.UI.createTextArea(attributes) : null
	}exports.createTextareaAutolink = createTextareaAutolink

	function creatHTMLorAutolinkOrDefault( HTML, textLinkable, textDefault, attributes, attrLabel, attrTextArea ) { return (os.isAndroid) ? exports.createLabelHTMLorText( HTML, textDefault, iterable.defaultDictionary( attrLabel, attributes ) ) : exports.createTextareaAutolink( uri.LinkifyType.URL, textLinkable, textDefault, iterable.defaultDictionary( attrTextArea, attributes )  ) }
	 exports.creatHTMLorAutolinkOrDefault = creatHTMLorAutolinkOrDefault

	function createHyperLink( title, URL, HTML, attributes, attrLabel, attrButton ) { return (os.isAndroid) ? createLabelHTMLorText( HTML, title, iterable.defaultDictionary( attrLabel, attributes ) ) : exports.createButtonLabel( title, function() { if ( os.isIOS && Ti.Platform.canOpenURL ) Ti.Platform.openURL(URL) }, iterable.defaultDictionary( attrButton, attributes ) ) }
	 exports.createHyperLink = createHyperLink


	function createInput( hintText, options, attributes )
	{
		var options                 = iterable.defaultDictionary( options, { clearButton: 'onFocus', autoCapitalization: 'sentence' } )
		var attributes              = iterable.defaultDictionary(attributes)
		var modesClearButtonModes   = { always: Titanium.UI.INPUT_BUTTONMODE_ALWAYS, never: Titanium.UI.INPUT_BUTTONMODE_NEVER, onFocus: Titanium.UI.INPUT_BUTTONMODE_ONFOCUS, onBlur: Titanium.UI.INPUT_BUTTONMODE_ONBLUR }
		var modesAutoCapitalization = { all: Titanium.UI.TEXT_AUTOCAPITALIZATION_ALL, word: Titanium.UI.TEXT_AUTOCAPITALIZATION_WORDS, sentence: Titanium.UI.TEXT_AUTOCAPITALIZATION_SENTENCES, none: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE }
		if (options.clearButton)        attributes.clearButtonMode    = modesClearButtonModes  [options.clearButton]
		if (options.autoCapitalization) attributes.autocapitalization = modesAutoCapitalization[options.autoCapitalization] 
	return Ti.UI.createTextField(  iterable.defaultDictionary( attributes, { hintText: hintText, borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED } )  )
	}exports.createInput = createInput

	function createInputPassword( hintText, options, attributes ) { return exports.createInput(  ( hintText || 'PassWord' ), iterable.defaultDictionary( options, { autoCapitalization: 'none' } ), iterable.dictionaryUpdate( attributes, { autocorrect: false, passwordMask: true } )  )  }
	 exports.createInputPassword = createInputPassword

	function createInputCredentials( hintTexts, attributes, attrUsr, attrPwd )
	{
		return { usr: createInput        ( hintTexts.usr, { autoCapitalization: 'none' }, iterable.defaultDictionary(  iterable.dictionaryUpdate( attrUsr, { autocorrect: false } ),  attributes  )   ),
				 pwd: createInputPassword( hintTexts.pwd, { autoCapitalization: 'none' }, iterable.defaultDictionary(  iterable.dictionaryUpdate( attrPwd, { autocorrect: false } ),  attributes  )   )  }
	}exports.createInputCredentials = createInputCredentials


	function createViewDummy() { return Ti.UI.createView( { width: 0, height: 0 } ) }
	 exports.createViewDummy = createViewDummy

	function createViewByLayout(attributes) { return Ti.UI.createView(  iterable.defaultDictionary( attributes, { width: 'auto', height: 'auto' } )  ) }
	exports.createViewByLayout = createViewByLayout

	function createViewHorizontal(attributes)
	{
		var attributes 	      = iterable.defaultDictionary(attributes)
			attributes.layout = 'horizontal'
Ti.API.info( 'createViewHorizontal ' + attributes)
	return createViewByLayout(attributes)
	}exports.createViewHorizontal = createViewHorizontal

	function createViewVertical(attributes)
	{
		var attributes 		  = iterable.defaultDictionary(attributes)
			attributes.layout = 'vertical'
Ti.API.info( 'createViewVertical ' + attributes)
	return createViewByLayout(attributes)
	}exports.createViewVertical = createViewVertical

	function createViewByList			( list, attributes ) { return container.addListToContainer( 	 Ti.UI.createView		   (attributes), list ) }
	 exports.createViewByList = createViewByList

	function createViewVerticalByList	( list, attributes ) { return container.addListToContainer( exports.createViewVertical  (attributes), list ) }
	 exports.createViewVerticalByList = createViewVerticalByList

	function createViewHorizontalByList	( list, attributes ) { return container.addListToContainer( exports.createViewHorizontal(attributes), list ) }
	 exports.createViewHorizontalByList = createViewHorizontalByList

	function createScrollview(attributes) { return Ti.UI.createScrollView( iterable.defaultDictionary( attributes, { height: '100%', contentWidth: '100%', contentHeight: 'auto', showVerticalScrollIndicator: true } ) ) }
	 exports.createScrollview = createScrollview

	function createScrollviewByView ( oView, attributes ) { return container.addListToContainer( exports.createScrollview(attributes), [oView] ) }
	 exports.createScrollviewByView = createScrollviewByView


	function createTableviewrowByList( list, attributes ) { return container.addListToContainer( Ti.UI.createTableViewRow(attributes), list ) }
	 exports.createTableviewrowByList = createTableviewrowByList

	function createTableviewrowByView( oView, attributes ) { return exports.createTableviewrowByList( [oView], attributes ) }
	 exports.createTableviewrowByView = createTableviewrowByView

	function createListOfTableviewrowByList(list)
	{
		for( var iElement = 0, rows = []; iElement < list.length; iElement++ )
			rows.push(  exports.createTableviewrowByView( list[iElement] )  )
	return  rows
	}exports.createListOfTableviewrowByList = createListOfTableviewrowByList

	function createTableviewsectionByList( title, list, attributes ) { return container.addListToContainer( Ti.UI.createTableViewSection(  iterable.defaultDictionary( attributes, { headerTitle: title } )  ), exports.createListOfTableviewrowByList(list) )  }
	exports.createTableviewsectionByList = createTableviewsectionByList

	function listOfTablerowsByDictionaries(dictionaries)
	{
		var k = iterable.keys(dictionaries)
		for ( var rows = [], iDict = 0, IDict = k.length;  iDict < IDict;  iDict++ )
		{
			var dictionary = dictionaries[ k[iDict] ]
			var header     = dictionary.header || ''
			var list	   = dictionary.rows   || []
			for ( var iList = 0, IList = list.length;  iList < IList;  iList++ )
			{
				var row = list[iList]
				if (   ( variable.isZero(iList) )   &&   (  (header)  ||  ( iDict > 0 )  )   )
					row.header = row.header || header
				rows.push(row)
			}
		}
	return rows
	}exports.listOfTablerowsByDictionaries = listOfTablerowsByDictionaries



	function createTabNextButton( tabGroup, iTab, attributes )
	{//Use this AFTER the tab has been created
		function onClick()
		{
			var tabGroup =  tabGroup
			var setTo    = iTab || tabGroup.getActiveTab()
			if ( iTab < tabGroup.getTabs.length )
				setTo++
			tabGroup.setActiveTab(setTo)
		}
	return exports.createButton( onClick, iterable.defaultDictionary( attributes, { title: 'Next' } ) )
	}exports.createTabNextButton = createTabNextButton


	function createWindowModalWithCloseButton( attrWindow, attrButton ) // don't like this
	{
		var win               = container.createWindow(attrWindow) // createWindowModal blows up!
		    win.leftNavButton = exports.createButtonLabel(  'Close',  function(e){ container.windowClose(win) },  iterable.defaultDictionary( attrButton, { style: Ti.UI.iPhone.SystemButtonStyle.PLAIN } )  )
	return  win
	}exports.createWindowModalWithCloseButton = createWindowModalWithCloseButton

	function createWindowModalWithCloseButtonByView( oView, attrWindow, attrButton ) { return container.addListToContainer(  exports.createWindowModalWithCloseButton( attrWindow, attrButton ), [oView]  ) }
	 exports.createWindowModalWithCloseButtonByView = createWindowModalWithCloseButtonByView

	function createWindowSemimodalByView( oView, attrWindow, attrOverlay, attrContainer )
	{// inspired in https://github.com/appcelerator-developer-relations/Forging-Titanium/blob/master/ep-010/Forms/Resources/semiModalPicker.js
		var overlay		= exports.createViewVertical(  iterable.defaultDictionary( attrOverlay, { backgroundColor: '#000', opacity: 0.6 } )  )
		var container	= exports.createViewVertical(  iterable.defaultDictionary( attrContainer, { bottom: 0 } )  )
		var win			= container.createWindow(  iterable.defaultDictionary(attrWindow), { backgroundColor: 'transparent', bottom: 0 } )
		if (os.isIOS) // we add the toolbar for iPhone
			container.add(  exports.iOS_createCancelAndDoneToolbar( id, undefined, function(){ win.close() } )  )
		container.add(oView)
	return container.addListToContainer( win, [ overlay, container ] )
	}exports.createWindowSemimodalByView = createWindowSemimodalByView

	function createWindowModalSmart( oView, isModal, attrOpen, attributes ) { return ( isModal || false ) ? exports.createWindowModalWithCloseButtonByView( oView, attributes ) : exports.createWindowSemimodalByView( oView, attributes ) }
	exports.createWindowModalSmart = createWindowModalSmart

	function createWindowModalSmartAndOpen( oView, isModal, attrOpen, attributes ) { return container.containerOpen( createWindowModalSmart( oView, isModal, attrOpen, attributes ), attrOpen ) }
	 exports.createWindowModalSmartAndOpen = createWindowModalSmartAndOpen



	function OS_createWindowButton( title, oView, isModal, attrOpen, attrWindow, attributes, choices )
	{// Useful for the picker in iOS
		var oButton  = undefined
		var	 title	 = title || 'Open'
		var  choices = iterable.defaultDictionary( choices, { android: false, iphone: true, ipad: true } )
		if ( choices[Ti.Platform.osname] )
		{
			var oButton = Ti.UI.createButton(  iterable.defaultDictionary( attributes, { title: title } )  )
				oButton.addEventListener( 'click', 
					function(e)
					{ 
						exports.createAndOpenWindowModal( oView, isModal, attrOpen, attrWindow )
					} )
		}
	if (oButton) return oButton
/* else */		 return oView
	}exports.OS_createWindowButton = OS_createWindowButton


	function createPickerColumnByList( list, attributes )
	{
		var oPickerColumn = Ti.UI.createPickerColumn( iterable.defaultDictionary(attributes) )
		for ( var iPickerRow = 0, IPickerRow = list.length;  iPickerRow < IPickerRow;  iPickerRow++ )
			oPickerColumn.addRow( list[iPickerRow] )
	return  oPickerColumn
	}exports.createPickerColumnByList = createPickerColumnByList

	function createListOfPickerrowsByList( list, attributes )
	{// We need a dictionary instead of a list, since we want to use the key as the value
		var list = list || []
		var rows = []
		for ( var iItem = 0; iItem < list.length; iItem++ )
		{
			var oPickerRow = Ti.UI.createPickerRow( iterable.defaultDictionary(attributes) )
				oPickerRow.setTitle( list[iItem] )
			rows.push(oPickerRow)
		}
	return rows
	}exports.createListOfPickerrowsByList = createListOfPickerrowsByList

	function createPickerByList( id, data, listOfAttributes )
	{
		var data             = data             || []
		var listOfAttributes = listOfAttributes || [ { className: 'picker' }, { className: 'pickerColumn' }, { className: 'pickerRow' } ]
		var attrPickerColumn = exports.addSelectorsToAttributes( listOfAttributes[1].className, id, listOfAttributes[1].attributes )
		var attrPickerRow    = exports.addSelectorsToAttributes( listOfAttributes[2].className, id, listOfAttributes[2].attributes )
		var attrPicker       = exports.addSelectorsToAttributes( listOfAttributes[0].className, id, listOfAttributes[0].attributes )
			attrPicker.type  = attrPicker.type || Ti.UI.PICKER_TYPE_PLAIN
		if (  os.isAndroid  &&  ( data.length > 1 )  )  attrPicker.useSpinner         = true
		if   (os.isIOS)									attrPicker.selectionIndicator = true
Ti.API.info(data.length)
		var columns = []
		for ( var iColumn = 0, IColumn = data.length;  iColumn < IColumn;  iColumn++ )
		{// We go through each item in the list (Array)
			var rows = exports.createListOfPickerrowsByList( data[iColumn], attrPickerRow )
			if ( data.length > 1 )  columns.push(  createPickerColumnByList( rows, attrPickerColumn )  )
			else					columns = rows
		}
	return container.addListToContainer( Ti.UI.createPicker(attrPicker), [columns] )
	}exports.createPickerByList = createPickerByList


	function createTablePullHeader( texts, attrImg, attrLabelStatus, attrLabelLastUD, attrIndicator )
	{// TODO use proper drawing!
		var  texts           = iterable.defaultDictionary(texts)
		var  textStatus      = texts.status || 'Pull to reload'
		var  textLastUD      = texts.lastUD || 'Last Updated'
		var oImg             = Ti.UI.createView (   iterable.defaultDictionary(  attrImg, { backgroundImage: '/src/cfg/img/pull.png', width: 23, height: 60, bottom: 10, left: 20 } )   )
		var oLabelStatus     = Ti.UI.createLabel(   iterable.defaultDictionary(  attrLabelStatus, { text: textStatus,                                             left: 55, width: 200, bottom: 30, height: 'auto', color: '#576c89', textAlign: 'center', font: { fontSize: 13, fontWeight: 'bold' }, shadowColor: '#999', shadowOffset: { x: 0, y: 1 } } )   )
		var oLabelLastUD     = Ti.UI.createLabel(   iterable.defaultDictionary(  attrLabelLastUD, { text: textLastUD + ': ' + dateTime.FormatDayAndTime.Locale(), left: 55, width: 200, bottom: 15, height: 'auto', color: '#576c89', textAlign: 'center', font: { fontSize: 12 }                    , shadowColor: '#999', shadowOffset: { x: 0, y: 1 } } )   )
		var oIndicator       = Ti.UI.createActivityIndicator( iterable.defaultDictionary( attrIndicator, { left: 20, bottom: 13, width: 30, height: 30 }  )  )
	return { height: 60, view: container.addListToContainer(  Ti.UI.createView( { backgroundColor: '#e2e7ed', width: 320, height: 60 } ),  [ oImg, oLabelStatus, oLabelLastUD, oIndicator ]  ), img: oImg, status: oLabelStatus, lastUpdated: oLabelLastUD, indicator: oIndicator }
	}exports.createTablePullHeader = createTablePullHeader

	function createTable( attributes, fn, fnArgs, timeout, tablePullLabels, oTablePullHeader )
	{
		var attributes = iterable.defaultDictionary( attributes, { pulling: false, reloading: false })
		if ( os.isIOS && attributes.grouped )
		{
			attributes.style = Ti.UI.iPhone.TableViewStyle.GROUPED
		}
			attributes.style = (os.isIOS) ? attributes.style : null
		var fn               = fn     || null
		var fnArgs           = fnArgs || []
		var oTable           = Ti.UI.createTableView(attributes)
			oTable.addEventListener( 'click', 
				function(e) 
				{ 
					rowFn = e.rowData.fn || attributes.onClick
					variable.callIfFunction( rowFn, e )
				} )

		if ( variable.isFunction(fn) )
		{
			function execFn() { fn.apply( this, fnArgs ) }

			if (os.isIOS)
			{// from KitchenSink 2.0 
				var tablePullLabels = iterable.defaultDictionary( tablePullLabels, { lastUpdated: 'Last UpDated', refreshPull: 'Pull down to refresh...', refreshRelease: 'Release to refresh...', reloading: 'Reloading...' } )
				var timeout			= 2000
				var IOffset         =  -65
				var duration		=  180
				var tableHeaderPull = oTablePullHeader || exports.createTablePullHeader( { status: tablePullLabels.status, lastUD: tablePullLabels.lastUpdated } )
				  oTable.headerPullView = tableHeaderPull.view
	
				function reload()
				{
					execFn()
					oTable.setContentInsets( { top: 0}, { animated: true } )
					oTable.reloading = false
					tableHeaderPull.lastUpdated.text = tablePullLabels.lastUpdated + ': ' + dateTime.FormatDayAndTime.Locale()
					tableHeaderPull.status.text      = tablePullLabels.refreshPull
					tableHeaderPull.indicator.hide()
					tableHeaderPull.img.show()
				}


				oTable.addEventListener( 'scroll',
					function(e)
					{
						var offset = e.contentOffset.y
						if (  ( offset <= IOffset )  &&  !oTable.pulling  )
						{
							var t = Ti.UI.create2DMatrix()
								t              = t.rotate(-180)
								oTable.pulling = true
								tableHeaderPull.img.animate( { transform: t, duration: duration } )
								tableHeaderPull.status.text = tablePullLabels.refreshRelease
						}
						else if (  oTable.pulling  &&  ( offset > IOffset )  &&  ( offset < 0 )  )
						{
							var t = Ti.UI.create2DMatrix()
								oTable.pulling = false
								tableHeaderPull.img.animate( { transform: t , duration: duration } )
								tableHeaderPull.status.text = tablePullLabels.refreshPull
						}
					} )
				
				oTable.addEventListener( 'scrollEnd',
					function(e)
					{
						if (  oTable.pulling  &&  !oTable.reloading  &&  ( e.contentOffset.y <= IOffset )  )
						{
							oTable.reloading = true
							oTable.pulling   = false
							tableHeaderPull.img.hide()
							tableHeaderPull.indicator.show()
							tableHeaderPull.status.text = tablePullLabels.reloading
							oTable.setContentInsets( { top: tableHeaderPull.height }, { animated: true } )
							tableHeaderPull.img.transform = Ti.UI.create2DMatrix()
							setTimeout( reload, timeout )
						}
					} )
//Ti.Gesture.addEventListener( 'shake', fn )
			}
		}
	return oTable
	}exports.createTable = createTable


	function createFacebookButton( appID, fnLogIn, fnLogOut, permissions, attributes )
	{// TODO centralized appID?
		var attributes  = iterable.defaultDictionary(attributes)
		if (attributes.isWide) attributes.style = (os.isIOS) ? Ti.Facebook.BUTTON_STYLE_WIDE : 'wide'
Ti.Facebook.appid           = appID                    || '134793934930'
Ti.Facebook.permissions     = permissions              || [ 'publish_stream', 'read_stream' ]
Ti.Facebook.forceDialogAuth = (attributes.forceDialog) || true
		var oFB = Ti.Facebook.createLoginButton(attributes)
		if ( variable.isFunction(fnLogIn ) ) Ti.Facebook.addEventListener( 'login' , fnLogIn  )
		if ( variable.isFunction(fnLogOut) ) Ti.Facebook.addEventListener( 'logout', fnLogOut )
	return  oFB
	}exports.createFacebookButton = createFacebookButton

	function createWindowByView( oView, attributes ) { return container.addListToContainer(  container.createWindow(attributes), [oView] )  }
	 exports.createWindowByView = createWindowByView

	function createWindowAndTabByView( oView, attrWindow, attrTab ) 
	{ 
		var containers = container.createWindowAndTab( attrWindow, attrTab )
			containers.win.add(oView)
			containers.view = oView
	return  containers
	}exports.createWindowAndTabByView = createWindowAndTabByView

	function createWindowAndTabAndTabgroupByView( oView, attrWindow, attrTab, attrTabgroup )
	{
		var containers = container.createWindowAndTabAndTabgroup( attrWindow, attrTab, attrTabgroup )
			containers.win.add(oView)
			containers.view = oView
	return  containers
	}exports.createWindowAndTabAndTabgroupByView = createWindowAndTabAndTabgroupByView
