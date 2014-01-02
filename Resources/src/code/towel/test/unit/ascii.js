Ti.include('/src/code/towel/test/include.js');

	ascii = require(TT.Module.ASCII);

	URL = "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I don't think m@n likes it&param2=foo";

	function Test_ascii_encode()
	{
		function test_spacesEncode    () { assertIdentical( ascii.spaces_encode(URL)                   , "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't think m@n likes it&param2=foo" ) }
		function test_encode_space    () { assertIdentical( ascii.encode( URL, ascii.Level.Space )     , "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't think m@n likes it&param2=foo" ) }
		function test_encode_esacpe   () { assertIdentical( ascii.encode( URL, ascii.Level.Escape )    , "http%3A//docs.appcelerator.com/titanium/latest/%23%21/api/Titanium.Network.Socket.TCP%3Fparam1%3DI%20don%27t%20think%20m@n%20likes%20it%26param2%3Dfoo" ) }
		function test_encode_URI      () { assertIdentical( ascii.encode( URL, ascii.Level.URI  )      , "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m@n%20likes%20it&param2=foo" ) }
		function test_encode_Component() { assertIdentical( ascii.encode( URL, ascii.Level.Component  ), "http%3A%2F%2Fdocs.appcelerator.com%2Ftitanium%2Flatest%2F%23!%2Fapi%2FTitanium.Network.Socket.TCP%3Fparam1%3DI%20don't%20think%20m%40n%20likes%20it%26param2%3Dfoo" ) }
	}Test.UT.runAndCache( Test_ascii_encode, 'ASCII.encode' )


	function Test_ascii_decode()
	{
		function test_spacesDecode    () { assertIdentical( URL, ascii.spaces_decode( "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't think m@n likes it&param2=foo" ) ) }
		function test_decode_space    () { assertIdentical( URL, ascii.decode       ( "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't think m@n likes it&param2=foo"                                    , ascii.Level.Space ) ) }
		function test_decode_esacpe   () { assertIdentical( URL, ascii.decode       ( "http%3A//docs.appcelerator.com/titanium/latest/%23%21/api/Titanium.Network.Socket.TCP%3Fparam1%3DI%20don%27t%20think%20m@n%20likes%20it%26param2%3Dfoo"            , ascii.Level.Escape ) ) }
		function test_decode_URI      () { assertIdentical( URL, ascii.decode       ( "http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.Network.Socket.TCP?param1=I%20don't%20think%20m@n%20likes%20it&param2=foo"                            , ascii.Level.URI ) ) }
		function test_decode_Component() { assertIdentical( URL, ascii.decode       ( "http%3A%2F%2Fdocs.appcelerator.com%2Ftitanium%2Flatest%2F%23!%2Fapi%2FTitanium.Network.Socket.TCP%3Fparam1%3DI%20don't%20think%20m%40n%20likes%20it%26param2%3Dfoo", ascii.Level.Component ) ) }
	}Test.UT.runAndCache( Test_ascii_decode, 'ASCII.decode' )

