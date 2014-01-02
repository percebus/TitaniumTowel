Ti.include('/src/code/towel/test/include.js');

	str      = require('src/code/towel/string');
	dateTime = require('src/code/towel/date');
	variable = require('src/code/towel/var');
	assert   = require('src/code/towel/assert');
	events   = require('src/code/towel/event');
	nw       = require('src/code/towel/nw');


	function IntegrationTest_nw_request()
	{
		function setUp()
		{
			URL    = "http://www.w3.org/2002/08/REC-xhtml1-20020801-errata/";
			oNW    = Ti.Network.createHTTPClient(); // nw.eventsSET( Ti.Network.createHTTPClient(), { onload: function(e) { debug.log( assertTrue( str.startsWith( e.source.responseText, '<?xml' ) ) ) } } )
			params = {foo: 'bar'};
		}


		function test_method_default() { assertIdentical( nw.Method.GET , nw.request( oNW, URL                         ).oNW.connectionType ) }
		function test_method_GET    () { assertIdentical( nw.Method.GET , nw.request( oNW, URL, nw.Method.GET          ).oNW.connectionType ) }
		function test_method_POST   () { assertIdentical( nw.Method.POST, nw.request( oNW, URL, nw.Method.POST, params ).oNW.connectionType ) }

		function test_method_PUT                 () { assertIdentical( nw.Method.PUT , nw.request( oNW, URL, nw.Method.PUT, params                      ).oNW.connectionType ) }
		function test_method_PUT_override_Header () { assertIdentical( nw.Method.PUT , nw.request( oNW, URL, nw.Method.PUT, params, nw.Override.Headers ).oNW.connectionType ) }
		function test_method_PUT_override_POST   () { assertIdentical( nw.Method.POST, nw.request( oNW, URL, nw.Method.PUT, params, nw.Override.POST    ).oNW.connectionType ) }

		function test_method_DELETE                 () { assertIdentical( nw.Method.DELETE, nw.request( oNW, URL, nw.Method.DELETE, params                      ).oNW.connectionType ) }
		function test_method_DELETE_override_Header () { assertIdentical( nw.Method.DELETE, nw.request( oNW, URL, nw.Method.DELETE, params, nw.Override.Headers ).oNW.connectionType ) }
		function test_method_DELETE_override_POST   () { assertIdentical( nw.Method.POST  , nw.request( oNW, URL, nw.Method.DELETE, params, nw.Override.POST    ).oNW.connectionType ) }
	}Test.UT.runAndCache( IntegrationTest_nw_request, 'nw request' )


	function IntegrationTest_nw_JSON()
	{
		function mixinTest1(e){ debug.log( '[test e.data.language]'      , assert.areEqual( e.data.language       , "en-us" ), true ) }
		function mixinTest2(e){ debug.log( '[test e.data.folders.0.name]', assert.areEqual( e.data.folders[0].name, "/arq/site/public/historico/PortaFolio/" ), true ) }
		function track     (e){ debug.log( 'result', variable.hash(e) ) }

		function setUp()
		{
			URL = "http://estevezarquitectos.com/JCystems/JCoFTTPdev/JSON.asp?folder=/arq/site/public/historico/PortaFolio"
			oNW = Ti.Network.createHTTPClient()
			eventName = 'estevezJSON'
// events.eventListenerAdd( eventName, track )
events.eventListenerAdd( eventName, mixinTest1 )
events.eventListenerAdd( eventName, mixinTest2 )
			Ti.App.addEventListener( eventName, 
				function(e) 
				{ 
					debug.log( '[test e.data]', assert.areEqual( 
						variable.hash(e.data),
						variable.hash(
						{
				    		"language":"en-us",
						    "folders" : [
						        {
						            "name"       : "/arq/site/public/historico/PortaFolio/",
						            "ageRequired":  0,
						
						            "folders": [
						                {
						                    "name"            : "Casa",
						                    "type"            : "folder",
						                    "size"            :  8935370,
						                    "dateLastModified": dateTime.datetime("2012-08-28T07:46:40Z"),
						                    "link"            : "http://estevezarquitectos.com/JCystems/JCoFTTPdev/JSON.asp?folder=/arq/site/public/historico/PortaFolio/Casa",
						                    "icon"            : "http://estevezarquitectos.com/JCystems/JCoFTTPdev/src/cfg/img/FS/folder.png",
						                    "thumb"           : "http://estevezarquitectos.com/arq/site/public/historico/PortaFolio/_thumbs/Casa.JPG"
						                },
						                {
						                    "name"            : "Industrial",
						                    "type"            : "folder",
						                    "size"            :  4333057,
						                    "dateLastModified": dateTime.datetime("2012-08-28T07:47:28Z"),
						                    "link"            : "http://estevezarquitectos.com/JCystems/JCoFTTPdev/JSON.asp?folder=/arq/site/public/historico/PortaFolio/Industrial",
						                    "icon"            : "http://estevezarquitectos.com/JCystems/JCoFTTPdev/src/cfg/img/FS/folder.png",
						                    "thumb"           : "http://estevezarquitectos.com/arq/site/public/historico/PortaFolio/_thumbs/Industrial.JPG"
						                }
						            ],
						            "files":[]
						        }
						    ]
						}) ), true ) } )

			nw.eventsSET( oNW, { 
				onload: function(e) 
				{ 
					nw.triggerResponseJSON( oNW, eventName )
//					events.eventRemove(eventName) 
				} } ) }

		function test_request        (){ nw.request        ( oNW, URL ) }
		function test_requestAndClose(){ nw.requestAndClose(      URL, eventName ) }
		function test_requestJSON    (){ nw.requestJSON    (      URL, eventName ) }
	}Test.UT.runAndCache( IntegrationTest_nw_JSON, 'nw JSON' )
