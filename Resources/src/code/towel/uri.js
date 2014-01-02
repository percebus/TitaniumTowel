Ti.include('/src/code/towel/include.js');
var validate   = TT.require(TT.Module.Validate);
var os         = TT.require(TT.Module.OS);
var sequence   = TT.require(TT.Module.Sequence);
var dictionary = TT.require(TT.Module.Dictionary);
var collection = TT.require(TT.Module.Collection);
var string     = TT.require(TT.Module.Str);
var variable   = TT.require(TT.Module.Var);
var ascii      = TT.require(TT.Module.ASCII);


	var Protocol = exports.Protocol = {
			file : 'file',
			HTTP : 'HTTP',
			HTTPS: 'HTTPS',
			FTP  : 'FTP' };

	var Port = exports.Port = {
			FTP   :    23,
			HTTP  :    80,
			HTTPS :   443,
			Apache:  8080,
			WCF   : 56950 };

	var Host = exports.Host = {
			Local: 'localhost',
			Home : '127.0.0.1' };

	var Default = exports.Default = {
			protocol: exports.Protocol.HTTP,
			port    : exports.Port.HTTP,
			host    : exports.Host.Home };

	var Linkify = {}; // TODO move?
	if (os.isAndroid)
	{
		Linkify = {
			All    : Ti.UI.Android.LINKIFY_ALL,
			eMail  : Ti.UI.Android.LINKIFY_EMAIL_ADDRESSES,
			Address: Ti.UI.Android.LINKIFY_MAP_ADDRESSES,
			Phone  : Ti.UI.Android.LINKIFY_PHONE_NUMBERS,
			URL    : Ti.UI.Android.LINKIFY_WEB_URLS };
	}
	if (os.isIOS)
	{
		Linkify  = {
			All     : Ti.UI.iOS.AUTODETECT_ALL,
			Address : Ti.UI.iOS.AUTODETECT_ADDRESS,
			Phone   : Ti.UI.iOS.AUTODETECT_PHONE,
			URL     : Ti.UI.iOS.AUTODETECT_LINK,
			Calendar: Ti.UI.iOS.AUTODETECT_CALENDAR };
	}
	exports.Linkify = Linkify;
logger.info('UI.Linkify', Linkify);

	var Part = exports.Part = {
			protocol: 'protocol',
			host    : 'host',
			port    : 'port',
			path    : 'path',
			resource: 'resource',
			params  : 'params' };

	var PARTS = exports.PARTS = [exports.Part.protocol, exports.Part.host, exports.Part.port, exports.Part.path, exports.Part.resource, exports.Part.params, 'config'];


	function listToDict( list, d ) { return dictionary.defaults( collection.listsToDict(list, exports.PARTS), compare.defaultDictionary(d) ); }
	 exports.listToDict = listToDict;


	function build() // arguments
	{
		var parts = sequence.unpack(arguments);
		if ( variable.isSomeString(parts) ) 
		{
	return parts;
		}

		if ( variable.isList(parts) )
			parts = exports.listToDict(parts);
validate.isEnumerator(parts , 'URL.build.parts  is False for isEnumerator');
validate.isAttributes(config, 'URL.build.config is False for isAttributes');

		var config   = dictionary.extend( parts.config, {toLower:{path:false, resource:false, params:false}} );
		var protocol = variable.defaultToValue(parts.protocol, exports.Protocol.HTTP);
		var host     = string.ensureStartsWith (parts.host, '//'); // we want to ensure to connect to '//localhost' for example
			host 	 = string.ensureEndsWithout(      host, '/' ); // If it ends with '/' we remove it since we'll want that AFTER the port declaration
		var URL  	 = protocol + ':' + host; // http: //yoursite
		var port	 = variable.defaultToValue(  parts.port,  variable.valueByKey( exports.Port, protocol, exports.Port.HTTP ),  variable.isNumberPortTCP  ); 

		if (  !variable.isValue( exports.Port[protocol], port )  )
			URL += ':' + string.toString(port); // http: //yoursite :8080

	//eventhough Hosts are case insensitive, paths might not be on Linux/UNIX machines
		var path = parts.path;
		if ( variable.isSomeString(path) )
		{
			path = string.ensureStartsWith(path, '/');
			if (config.toLower.path)
				path = path.toLowerCase();
			URL += path; // http: //yoursite :8080 /some/folder/here
		}

		var resource = parts.resource;
		if ( variable.isSomeString(resource) )
		{
			resource = string.ensureStartsWith( resource, '/' );
			if (config.toLower.resource)
				resource = resource.toLowerCase();
			URL += resource;// http: //yoursite :8080 /some/folder/here /resource.html
		}			

		URL = ascii.encode(URL, ascii.Level.URI);

		params = parts.params;
		if ( variable.isEnumerator(params) )
		{
			var paramsString = '';
			sequence.each( dictionary.keys(params), 
				function( param, index, list )
				{
					if (config.toLower.param)
						param = param.toLowerCase();
					paramsString += variable.isZero(index) ? '?' : '&';
					paramsString += ascii.encode( param, ascii.Level.Component ) + '=' + ascii.encode( params[param], ascii.Level.Component );
				} );
			URL += paramsString; // http: //yoursite :8080 /some/folder/here /resource.ext ?param1=foo&param2=bar
		}

		if ( variable.isGreaterThanFF(URL) )
		{
logger.warn(' ? warning: URL exceedes 255 characters', URL);
		}
logger.debug(URL, parts);
	return  URL; // http://yoursite:8080/some/folder/here/resource.ext?param1=foo&param2=bar
	}exports.build = exports.URL = exports.getURL = exports.URL_get = build;
