Ti.include('/src/code/towel/include.js');

	var App = exports.App = Ti.App;
	var Info = exports.Info = {
			CopyRight  : Ti.App.copyright,
			Description: Ti.App.description,
			ID         : Ti.App.id,
			GUID       : Ti.App.guid,
			InstallID  : Ti.App.installId,
			Name       : Ti.App.name,
			Publisher  : Ti.App.publisher,
			URL        : Ti.App.url,
			Version    : Ti.App.version};

debug.log('application', exports.Info);
