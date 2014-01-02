Ti.include('/src/code/towel/include.js');

	var OSname     = Ti.Platform.getOsname();
	var OStype     = Ti.Platform.getOstype();
    var isAndroid  = ( 'android' === OSname );
	var isIPhone   = ( 'iphone'  === OSname );
	var isIPad     = ( 'ipad'    === OSname );
	var isIOS      = ( isIPhone || isIPad );

	var Group = exports.Group = {
			android: 'android',
			iOS    : 'iOS' };

	var group;
	if     (isAndroid)  group = exports.Group.android;
	else if(isIOS)      group = exports.Group.iOS;

exports.name      = OSname;
exports.group     = group;
exports.type      = OStype;
exports.isAndroid = isAndroid;
exports.isIPhone  = isIPhone;
exports.isIPad    = isIPad;
exports.isIOS     = isIOS;

logger.info( group + '.' + OSname + ', ' + OStype );

	var statusBarHandler = exports.isIOS ? Ti.UI.iPhone : null;


	function statusHide()
	{
		if (statusBarHandler)
		{
statusBarHandler.hideStatusBar();
		}
	}exports.statusHide = statusHide;


	function statusShow()
	{
		if (statusBarHandler)
		{
statusBarHandler.showStatusBar();
		}
	}exports.statusShow = statusShow;
