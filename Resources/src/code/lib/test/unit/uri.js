Ti.include('/src/code/lib/test/include.js')

	uri = require('src/code/lib/uri')


	function Test_uri_build()
	{
/* TODO
		function test_listToDict() { assertEqual(  
			uri.listToDict([uri.Protocol.HTTP , 'docs.appcelerator.com',  80, 'titanium/latest/#!/api'  , 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" }]) ,{
				host    :'docs.appcelerator.com', 
				params  : { param1: "I don't think m@n likes it", param2: "foo"},
				path    : 'titanium/latest/#!/api', 
				port    : 80, 
				protocol: uri.Protocol.HTTP,
				resource: 'Titanium.Network.Socket.TCP' } ) }
 */

		function test_full_HTTP         () { assertIdentical( uri.build( uri.Protocol.HTTP , 'docs.appcelerator.com',  80, 'titanium/latest/#!/api'  , 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" } ),  "HTTP://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo" ) }
		function test_full_HTTPS        () { assertIdentical( uri.build( uri.Protocol.HTTPS, 'docs.appcelerator.com', 443, 'titanium/latest/#!/api'  , 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" } ), "HTTPS://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo" ) }

		function test_port_default_HTTP () { assertIdentical( uri.build( uri.Protocol.HTTP , 'docs.appcelerator.com', null, 'titanium/latest/#!/api' , 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" } ),  "HTTP://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo" ) }
		function test_port_default_HTTPS() { assertIdentical( uri.build( uri.Protocol.HTTPS, 'docs.appcelerator.com', null, 'titanium/latest/#!/api' , 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" } ), "HTTPS://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo" ) }

		function test_port_some_HTTP    () { assertIdentical( uri.build( uri.Protocol.HTTP , 'docs.appcelerator.com',  8080, 'titanium/latest/#!/api', 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" } ),   "HTTP://docs.appcelerator.com:8080/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo" ) }
		function test_port_some_HTTPS   () { assertIdentical( uri.build( uri.Protocol.HTTPS, 'docs.appcelerator.com', 12345, 'titanium/latest/#!/api', 'Titanium.Network.Socket.TCP', { param1: "I don't think m@n likes it", param2: "foo" } ), "HTTPS://docs.appcelerator.com:12345/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo" ) }

		function test_string() { assertIdentical( 
			uri.build("HTTP://docs.appcelerator.com:8080/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo"),
					  "HTTP://docs.appcelerator.com:8080/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo"	) }

		function test_dictionary() { assertIdentical( 
			"HTTP://docs.appcelerator.com:8080/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m%40n%20likes%20it&param2=foo",
			uri.build( {
				protocol: uri.Protocol.HTTP,
				host    :'docs.appcelerator.com', 
				port    : 8080, 
				path    : 'titanium/latest/#!/api', 
				resource: 'Titanium.Network.Socket.TCP', 
				params  : {param1:"I don't think m@n likes it", param2:"foo"} } ) ) }
	}Test.UT.runAndCache( Test_uri_build, 'URI URL' )
