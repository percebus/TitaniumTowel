Ti.include('/src/code/lib/include.js')
var compare    = TT.require(TT.Module.Compare)
var os         = TT.require(TT.Module.OS)
var dictionary = TT.require(TT.Module.Dictionary)
var mem        = TT.require(TT.Module.Mem)
var session    = TT.require(TT.Module.AppProperties)

	if (os.isAndroid)
	{
		function NotificationID()
		{
			var oAppVar = session.AppVar( 'notificationsPID', 0)

			this.get = oAppVar.get
			this.set = oAppVar.set
			this.next = function() { return this.set( this.get() +1 ) }
		}var oNotificationID = new NotificationID() 

		function imgDrawable(img) { return Ti.App.Android.R.drawable[img] } //TODO correct img path with extension
		 exports.imgDrawable = imgDrawable

		function defaultActivity(oActivity) { return oActivity || Ti.Android.currentActivity }
		 exports.defaultActivity = defaultActivity

		function createIntentSEND( attributes, oActivity )
		{//TODO incomplete?
			var	 attributes = dictionary.extend( attributes, {type:'text/plain'} )
			var oIntent     = Ti.Android.createIntent( {action:Ti.Android.ACTION_SEND, type:type} )
				oIntent.addCategory(Ti.Android.CATEGORY_DEFAULT)
			if (attributes.subject)	oIntent.putExtra( Ti.Android.EXTRA_SUBJECT, attributes.subject )
			if (attributes.body)	oIntent.putExtra( Ti.Android.EXTRA_TEXT   , attributes.body    )
var oActivity = exports.defaultActivity(oActivity)
	oActivity.startActivity( Ti.Android.createIntent(oIntent) )
		return  oIntent
		}exports.createIntentSEND = createIntentSEND


		function createNotificationToast( msg, attributes ) { return Ti.UI.createNotification(  dictionary.extend( attributes, {message:msg, duration:Ti.UI.NOTIFICATION_DURATION_LONG} )  ) }
		 exports.createNotificationToast = createNotificationToast

		function createNotificationToastAndShow( msg, attributes )
		{
			var oToast = exports.createNotificationToast( msg, attributes )
			if (oToast)
				oToast.show()
    mem.dispose(oToast)
		}exports.createNotificationToastAndShow = createNotificationToastAndShow


		function defaultAttributesIntentActivity(attributes)
		{
			var attributes = dictionary.extend( attributes, {action:Ti.Android.ACTION_MAIN} )
			if ( !compare.isSomething(attributes.url) ) // TODO add exists check
				attributes.className = exports.appActivityName()
		return  attributes
		}exports.defaultAttributesIntentActivity = defaultAttributesIntentActivity

		function createIntentActivity(attributes)
		{
			var oIntent = Ti.Android.createIntent( exports.defaultAttributesIntentActivity(attributes) )
				oIntent.addCategory(Ti.Android.CATEGORY_LAUNCHER)
		return  oIntent 
		}exports.createIntentActivity = createIntentActivity

		function createIntentActivityAndStart(attributes) { Ti.Android.currentActivity.startActivity( exports.createIntentActivity(attributes) ) }
		 exports.createIntentActivityAndStart = createIntentActivityAndStart

		function createIntentPending( attributes, attrIntent ) { return Ti.Android.createPendingIntent(  dictionary.extend( attributes, {intent:exports.createIntentActivity(attrIntent), type:Ti.Android.PENDING_INTENT_FOR_ACTIVITY, activity:exports.defaultActivity(attributes.activity) } )  ) }
		 exports.createIntentPending = createIntentPending

		function createNotificationTask( attributes, attrPending, attrIntent ) { return Ti.Android.createNotification(  dictionary.extend( attributes, {icon:exports.imgDrawable(attributes.thumb), when:compare.now(), contentIntent:exports.createIntentPending( attrPending, attrIntent ), contentTitle:Ti.App.name } )  ) }
		 exports.createNotificationTask = createNotificationTask

		function createNotificationTaskAndNotify( attributes, attrPending, attrIntent )
		{
			var oNotification = exports.createNotificationTask( attributes, attrPending, attrIntent )
Ti.Android.NotificationManager.notify( oNotificationID.next(), oNotification )
		return  oNotification
		}exports.createNotificationTaskAndNotify = createNotificationTaskAndNotify
	}