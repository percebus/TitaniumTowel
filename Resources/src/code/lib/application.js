Ti.include('/src/code/lib/include.js')

	var App = exports.App = Ti.App
	var Info = exports.Info = {
			CopyRight  : exports.App.copyright,
			Description: exports.App.description,
			ID         : exports.App.id,
			GUID       : exports.App.guid,
			InstallID  : exports.App.installId,
			Name       : exports.App.name,
			Publisher  : exports.App.publisher,
			URL        : exports.App.url,
			Version    : exports.App.version}

debug.log( 'application', exports.Info )
