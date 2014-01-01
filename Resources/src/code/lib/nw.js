Ti.include('/src/code/lib/include.js')
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var functions  = TT.require(TT.Module.Fn)
var str        = TT.require(TT.Module.Str)
var variable   = TT.require(TT.Module.Var)
var assert     = TT.require(TT.Module.Assert)
var json       = TT.require(TT.Module.JSON)
var mem        = TT.require(TT.Module.Mem)
var fs         = TT.require(TT.Module.FS)
var uri        = TT.require(TT.Module.URI)
var events     = TT.require(TT.Module.Event)


	var Property = {
			abort: 'abort',
			Status: { 
			 	Code : 'status',
				Text_: 'statusText'},
			State: 'readyState',
			Is: {
				online: 'online' },
			Response: {
				Text_ : 'responseText',
				Data  : 'responseData'},
			Interface: {
				LAN    : 'NETWORK_LAN',
				Cell   : 'NETWORK_MOBILE',
				WiFi   : 'NETWORK_WIFI',
				UnKnown: 'NETWORK_UNKNOWN',
				None   : 'NETWORK_NONE'},
			On: {
				stream: {
					send: 'onsendstream',
					data: 'ondatastream' },
				load       : 'onload',
				error      : 'onerror',
				stateChange: 'onreadystatechanged'},
			Event: {
				progress: 'progress',
				error   : 'error',
				source  : 'source'}}

		    Property.Event.client = Property.Event.source
	exports.Property              = Property


	function disposeNW(oNW)
	{
oNW.abort()
mem.dispose(oNW)
	}exports.disposeNW = disposeNW


	var oNW = Ti.Network.createHTTPClient()
	var State = exports.State = {
			UnSent : oNW.UNSENT,
			Opened : oNW.OPENED,
			Headers: oNW.HEADERS_RECEIVED,
			Loading: oNW.LOADING,
			Done   : oNW.DONE}
exports.disposeNW(oNW)


	function resolveNetworkProperty(property) { return variable.resolveProperty( Ti.Network, property ) }
	 exports.resolveNetworkProperty = resolveNetworkProperty

	function resolveProperty_responseText(oNW) { return variable.resolveProperty( oNW, exports.Property.Response.Text_ ) }
	 exports.resolveProperty_responseText = resolveProperty_responseText

	function hasInternet() { return variable.resolveBooleanProperty( Ti.Network, exports.Property.Is.online ) }
	 exports.hasInternet = hasInternet


	var Override = exports.Override = { // our 1 way stop to use or not PUT and DELETE
			POST   : 1,
			Headers: 2}

	var Method = exports.Method = {
			GET   : 'GET',
			POST  : 'POST',
			PUT   : 'PUT',
			DELETE: 'DELETE' }

	var Verb = exports.Verb = {
			Create: exports.Method.PUT,
			Read  : exports.Method.GET,
			UpDate: exports.Method.POST,
			Delete: exports.Method.DELETE }

	var Interface = exports.Interface = {
			LAN    : exports.resolveNetworkProperty(exports.Property.Interface.LAN),
			Cell   : exports.resolveNetworkProperty(exports.Property.Interface.Cell),
			WiFi   : exports.resolveNetworkProperty(exports.Property.Interface.WiFi),
			UnKnown: exports.resolveNetworkProperty(exports.Property.Interface.UnKnown),
			None   : exports.resolveNetworkProperty(exports.Property.Interface.None)}


	var speedsAsUsual = exports.speedsAsusual = [
			exports.Interface.None,
			exports.Interface.UnKnown,
			exports.Interface.Cell,
			exports.Interface.WiFi,
			exports.Interface.LAN ]


	function speeds()
	{// TODO poll/calculate speed rates depending on area
	return speedsAsUsual
	}


	var Speed = exports.Speed = {
			None   : exports.Interface.None,
			UnKnown: exports.Interface.UnKnown,
			Slow   : -1,
			Medium :  0,
			Fast   :  1 }


	var CodeRange = exports.CodeRange = {
			'100': 'info',
			'200': 'success',
			'300': 'more',
			'400': 'error.client',
			'500': 'error.server'}

	var Code = exports.Code = {
			Successful: {
				'0K'          : 200,
				Created       : 201,
				Accepted      : 202,
				NonAuthorative: 203,
				Content: {
					 No     : 204,
					'Reset' : 205,
					 Partial: 206}},
			More: {
				MultipleChoices : 300,
				MovedPermanently: 301,
				Found           : 302,
				SeeOther        : 303,
				NotModified     : 304,
				UseProxy        : 305,
				UnUsed          : 306,
				Temporary       : 307},
			error: {
				Client: {
					Access: {
						UnAuthorized   : 401,
						PaymentRequired: 402,
						Forbidden      : 403,
						Proxy          : 407},
					NotFound       : 404,
					NotAcceptable  : 406,
					Timeout        : 408,
					Conflict       : 409,
					Gone           : 410,
					Request: {
						MethodUnallowed: 405,
						LengthRequired : 411,
						Precondition   : 412,
						TooLarge: {
							Entity: 413,
							URI   : 414},
						UnsupportedMediaType: 415,
						RequestRange        : 416,
						Expectation         : 417}},
				Server: {
					Internal      : 500,
					NotImplemented: 501,
					Gateway: {
						Bad    : 502,
						Tiemout: 504},
					UnAvailable: 503,
					HTTPversion: 505 }}}


	function responseCodeRange(oNW)
	{
assert.isTiObject( oNW, 'NW.isConnectionAvailable.oNW is False for isTiObject' )
		var status = variable.resolveProperty( oNW, exports.Property.Status.Code )
		if ( variable.canBeNumber(status) )
		{
			status = builtin.parseInt( str.removeFromRight( str.toString(status), 2 ) )  * 100
	return exports.CodeRange[status] // CodeRanges[200] 'success'
		}
	return null
	}exports.responseCodeRange = responseCodeRange


	function isConnectionAvailable(oNW)
	{
assert.isTiObject( oNW, 'NW.isConnectionAvailable.oNW is False for isTiObject' )
		switch ( variable.resolveProperty( oNW, exports.Property.State.Which ) )
		{// if its not the expected property
			case exports.State.UnSent:
			case exports.State.Done:
	return true
		}
	return false
	}exports.isConnectionAvailable = isConnectionAvailable


	function events_set( oNW, ev )
	{
assert.isTiObject  ( oNW, 'NW.event.ev is False for isTiObject' )
assert.isAttributes( ev , 'NW.event.ev is False for isAttributes' )

		var ev = dictionary.extend( ev, {onsendstream:null, ondatastream:null, onload:null, onerror:null, onheader:null, ondone:null, onreadystatechanged:null} )

		oNW.onsendstream = function(e) 
		{// UPLOAD
logger.debug( 'NW.client.onsendstream > ' + e.source.location, e )
			functions.fwdIfFunction( ev.onsendstream, [e.progress, e], oNW )
		}

		oNW.ondatastream = function(e) 
		{// DOWNLOAD 
logger.debug( 'NW.client.ondatastream > ' + e.source.location, e )
			functions.fwdIfFunction( ev.ondatastream, [e.progress, e], oNW )
		}

		oNW.ondone = function(e)
		{
exports.disposeNW(oNW)
			functions.fwdIfFunction( ev.ondone, [e], oNW )
		}

		oNW.onload = function(e)
		{// RESPONSE
logger.debug( 'NW.client.onload > ' + e.source.location, e )
logger.debug( ' > response', exports.resolveProperty_responseText(oNW) )
			functions.fwdIfFunction( ev.onload, [e.source, e], oNW )
			functions.fwdIfFunction( ev.ondone, arguments    , oNW )
		}

		oNW.onerror = function(e)
		{
logger.warning( 'NW.client.onerror', e       )
logger.warning( ' ! error'         , e.error )
logger.warning( ' > response'      , exports.resolveProperty_responseText(oNW) )
			functions.fwdIfFunction( ev.onerror, [e.error, e], oNW )
			functions.fwdIfFunction( ev.ondone, arguments    , oNW )
		}

		oNW.onreadystatechanged = function(e)
		{// every time it changes state
			var state = exports.resolveProperty( oNW, exports.Property.State )
logger.debug( 'NW.client.onreadystatechanged: ' + state, e )
			if (  variable.isValue( state, exports.State.Done    )  )	functions.fwdIfFunction( ev.ondone             , arguments, oNW )
			if (  variable.isValue( state, exports.State.Headers )  )	functions.fwdIfFunction( ev.onheaders          , arguments, oNW )
																		functions.fwdIfFunction( ev.onreadystatechanged, arguments, oNW )
		}

	return oNW
	}exports.events_set = exports.setEvents = events_set


	function clientCreate(attributes) 
	{
assert.isAttributes( attributes, 'NW.client.create.attributes is False for isAttributes' )
		var attributes =  dictionary.extend( attributes, {validatesSecureCertificate:false} )
logger.debug( 'NW.client.new', attributes )
	return Ti.Network.createHTTPClient(attributes) 
	}exports.clientCreate = exports.createClient = clientCreate


	function client( attributes, oNW )
	{
assert.isAttributes( attributes, 'NW.client.get.attributes is False for isAttributes' ) 
	return exports.clientCreate(attributes) // TODO exports.isConnectionAvailable(oNW)? oNW : exports.clientCreate(args) )  } 
	} exports.client = exports.getClient = client


	function request( oNW, URL, method, data, override, file )
	{// We use OVERRIDE to change PUT & DELETE for POST with data.method = PUT or DELETE
assert.isTiObject   ( oNW  , 'NW.request.oNW is False for isTiObject' )
assert.isAnyOf      ( URL, [variable.isSomeString, variable.isEnumerator], 'NW.request.URL is in unspupported format' )
assert.isNothingOrFn(  method  , variable.isSomeString    , 'NW.request.data     is False for isSomeString' )
assert.isNothingOrFn(  data    , variable.isDictionaryOnly, 'NW.request.data     is False for isDictionaryOnly' )
assert.isNothingOrFn(  override, variable.isInt           , 'NW.request.override is False for IsInt' ) 
assert.isNothingOrFn(  file    , variable.isSomeString    , 'NW.request.file     is False for isSomeString' )

		if ( !exports.hasInternet() )
		{
logger.error( ' ! no NW' )
	return null
		}
	// implicit else
	
		var URL      = uri.build(URL)
		var data     = data
		var method   = variable.defaultToValue( method  , exports.Method.GET )
//		var override = variable.defaultToValue( override, exports.Override.Headers )
logger.debug( 'NW.client.' + method + ' > ' + URL, data )
		if (   override   &&   (  variable.isValue( method, exports.Method.PUT )  ||  variable.isValue( method, exports.Method.DELETE )  )   )
		{//TODO I don't like having the open 3 times!!
			switch(override)
			{
				case exports.Override.POST: // In this case, our REST must be enabled to receive POST and handle it as PUT or DELETE, depending on the method flag
					var data            = compare.defaultDictionary(data)
					    data['_method'] = method
				        method          = exports.Method.POST
logger.debug( ' ? modified', data )
oNW.open( method, URL )
			  	  break;


				case exports.Override.Headers: // In this case, we'll ask the connection AFTER opening it to handle it as it was meant (that way we don't have to rebuild Titanium :) )
					var header = 'X-HTTP-Method-Override'
oNW.open( method, URL )
					oNW.setRequestHeader( header, method )
logger.log( ' ? modified', data )
			      break;
			}
		}

oNW.open( method, URL )

		if ( variable.isSomeString(file) )
			oNW.file = file // Only works on iOS

logger.info( ' > opened, using method', method, true )
if (data) oNW.send(data)
else      oNW.send() // we don't know what happens if we pass null, better not pass it :P
	return { oNW: oNW, method: method, data: data }
	}exports.request = request


	function responseTextTransform( oNW, fn )
	{
assert.isTiObject( oNW, 'NW.responseTextTransform.oNW is False for isTiObject' )
assert.isNothingOrFn( fn, compare.isFunction, 'NW.responseTextTransform.fn is False for isFunction' )
		var fn = variable.defaultFunction( fn, functions.f )
	return  fn(  exports.resolveProperty_responseText(oNW)  )
	}exports.responseTextTransform = responseTextTransform


	function responseJSON(oNW) 
	{ 
assert.isTiObject( oNW, 'NW.responseJSON.oNW  is False for isTiObject' )
	return exports.responseTextTransform( oNW, json.toObject ) 
	}exports.responseJSON = responseJSON


	function responseTextOrJSON(oNW)
	{
assert.isTiObject( oNW, 'NW.responseTextOrJSON.oNW  is False for isTiObject' )
	return exports.responseTextTransform( oNW, json.defaultToJSON )
	}exports.responseTextOrJSON = responseTextOrJSON


	function responseBLOb(oNW)
	{
assert.isTiObject( oNW, 'NW.responseBLOb.oNW  is False for isTiObject' )
	return variable.resolveProperty( oNW, exports.Property.Response.Data )
	}exports.responseBLOb = responseBLOb


	function responseBLObToFile( oNW, path, move ) 
	{
assert.isTiObject   ( oNW , 'NW.responseBLObToFile.oNW  is False for isTiObject' )
assert.isFileParam  ( path, 'NW.responseBLObToFile.path is False for isFileParam' )
assert.isNothingOrFn( move, variable.isBoolean, 'NW.responseBLObToFile.move is False for isBoolean' ) 
	return fs.fileBLObSave( exports.responseBLOb(oNW), path, move ) 
	}exports.responseBLObToFile = responseBLObToFile


	function response(oNW)
	{ // TODO add XML?
assert.isTiObject( oNW, 'NW.response.oNW  is False for isTiObject' )
	return variable.defaultToValue( exports.responseTextOrJSON(oNW), exports.responseBLOb(oNW) )
	}exports.response = response



	function triggerResponseText( oNW, eventName, obj )
	{
assert.isTiObject  ( oNW      , 'NW.triggerResponseText.oNW       is False for isTiObject' )
assert.isSomeString( eventName, 'NW.triggerResponseText.eventName is False for isSomeString' )
return events.fire( eventName, exports.resolveProperty_responseText(oNW), obj )
	}exports.triggerResponseText = triggerResponseText


	function triggerResponseJSON( oNW, eventName, obj )
	{
assert.isTiObject  ( oNW      , 'NW.triggerResponseJSON.oNW       is False for isTiObject' )
assert.isSomeString( eventName, 'NW.triggerResponseJSON.eventName is False for isSomeString' )
return events.fire( eventName, exports.responseJSON(oNW), obj )
	}exports.triggerResponseJSON = triggerResponseJSON


	function triggerResponseTextOrJSON( oNW, eventName, obj )
	{
assert.isTiObject  ( oNW      , 'NW.triggerResponseTextOrJSON.oNW       is False for isTiObject' )
assert.isSomeString( eventName, 'NW.triggerResponseTextOrJSON.eventName is False for isSomeString' )
return events.fire( eventName, exports.responseTextOrJSON(oNW), obj )
	}exports.triggerResponseTextOrJSON = triggerResponseTextOrJSON


	function triggerResponseFile( oNW, eventName, path, move, obj )
	{
assert.isTiObject   ( oNW , 'NW.triggerResponseFile.oNW  is False for isTiObject' )
assert.isSomeString ( eventName, 'NW.triggerResponseFile.eventName is False for isSomeString' )
assert.isFileParam  ( path, 'NW.triggerResponseFile.path is False for isFileParam' )
assert.isNothingOrFn( move, variable.isBoolean, 'NW.triggerResponseFile.move is False for isBoolean' )
return events.fire(   eventName,   fs.location(  exports.responseBLObToFile( oNW, path, move )  ),   obj   ) // I would live to give directly the oFile, but its not JSONable
	}exports.triggerResponseFile = triggerResponseFile


	function requestByParams( oNW, parts, method, data, override )
	{// GET gets the URL by ?param1=foo&param2=bar whereas POST sends them as data
assert.isTiObject  ( oNW  , 'NW.requestByParams.oNW   is False for isTiObject' )
assert.isEnumerator( parts, 'NW.requestByParams.parts is False for isEnumerator' )
assert.isAttributes( data , 'NW.requestByParams.data  is False for isAttributes' )
assert.isNothingOrFn( method  , variable.isSomeString , 'NW.requestByParams.method is False for isSomeString' )
assert.isNothingOrFn( override, variable.isPositiveInt, 'NW.requestByParams.method is False for isPositiveInt' )
		var method = variable.defaultToValue( method, exports.Method.GET )
		if ( variable.isValue( method, exports.Method.POST ) )
		{
			data         = dictionary.extend(data, parts.params)
			parts.params = null
		}
	return exports.request( oNW, parts, method, data, override )
	}exports.requestByParams = requestByParams


	function requestAndClose( URL, eventName, fn, ev, attributes )
	{
		if ( !exports.hasInternet() )
		{
logger.error( ' ! no connection' )
	return null
		}
	// implicit else
		var attributes = dictionary.extend( attributes, {method:null, data:null, override:null, timeout:null})
		var oNW        = exports.events_set(  exports.client( {timeout: attributes.timeout} ),  dictionary.update( ev, {onload: function(oNW, e){ fn( oNW, eventName ) } } )  )
		var requester  = variable.isString(URL) ? exports.request : exports.requestByParams 
	return  requester( oNW, URL, attributes.method, attributes.data, attributes.override )	
	}exports.requestAndClose = requestAndClose


	function requestJSON( URL, eventName, ev, attributes )
	{// It could either be DownLoad or UpLoad...
logger.debug( 'NW.requestJSON', sequence.listToArray(arguments) )
	return exports.requestAndClose( URL, eventName, exports.triggerResponseJSON, ev, attributes )
	}exports.requestJSON = requestJSON


	function requestText( URL, eventName, ev, attributes )
	{// It could either be DownLoad or UpLoad...
logger.debug( 'NW.requestText', sequence.listToArray(arguments) )
	return exports.requestAndClose( URL, eventName, exports.triggerResponseText, ev, attributes )
	}exports.requestText = requestText
