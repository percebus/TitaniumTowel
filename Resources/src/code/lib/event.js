Ti.include('/src/code/lib/include.js')
var compare    = TT.require(TT.Module.Compare)
var sequence   = TT.require(TT.Module.Sequence)
var dictionary = TT.require(TT.Module.Dictionary)
var functions  = TT.require(TT.Module.Fn)
var variable   = TT.require(TT.Module.Var)
var assert     = TT.require(TT.Module.Assert)

exports.defaultEventHandler = variable.defaultEventHandler

	var Property = exports.Property = {
			Event: {
				fire: 'fireEvent',
				Listener: {
					add   : 'addEventListener',
					remove: 'removeEventListener' }}}


	function events_get(obj) 
	{ 
		var obj = variable.defaultEventHandler(obj)
	return compare.defaultDictionary(obj._eventListeners)
	}exports.events_get = exports.get = exports.events = exports.eventsByHandler = exports.eventsByEventHandler = events_get


	function listeners_get( eventName, obj ) 
	{
assert.isSomeString( eventName, 'event.listeners_get.eventName is False for isSomeString' )
	return variable.valueByProperty( exports.events(obj), eventName, [] )
	}exports.listeners_get = exports.listeners = exports.eventListeners_get = exports.eventListenersByEventName = listeners_get


	function hasEvents(obj) { return variable.hasProperties(  exports.events( variable.defaultEventHandler(obj) )  ) }
	 exports.hasEvents = hasEvents

	function hasListeners( eventName, obj ) { return variable.hasProperty(  exports.events( variable.defaultEventHandler(obj) ), eventName  ) }
	 exports.hasListeners = exports.hasEventListeners = hasListeners


	function listener_add( eventName, fn, obj )
	{
assert.isSomeString ( eventName, 'event.listener_add.eventName is False for isSomeString' )
assert.isFunction   ( fn       , 'event.listener_add.fn        is False for isFunction' )
assert.isNothingOrFn( obj, variable.isObject, 'event.listener_add.obj is False for isObject' )
		var obj = variable.defaultEventHandler(obj)
assert.hasMethod( obj, exports.Property.Event.Listener.add, 'event.listener_add.obj is False for hasMethod.addEventListener' )
logger.debug( 'event.' + eventName + '.add', variable.hash(fn) )
		var eventsByName = exports.listeners( eventName, obj )
		if (  sequence.none( eventsByName, function(f){ return variable.isHashSame( f, fn ) } )  )
		{// To avoid adding the same function for the same event by mistake
			var events              = exports.events(obj)
				events[eventName]   = sequence.ensure( fn, eventsByName )
logger.info( ' > added', variable.hash( events[eventName] ) )
				obj._eventListeners = events
obj.addEventListener( eventName, fn )
		}
	return obj
	}exports.listener_add = exports.listenerAdd = exports.eventListenerAdd = listener_add


	function listener_remove( eventName, fn, obj )
	{
assert.isSomeString ( eventName, 'event.listener_remove.eventName is False for isSomeString' )
assert.isFunction   ( fn       , 'event.listener_remove.fn        is False for isFunction' )
assert.isNothingOrFn( obj, variable.isObject, 'event.listener_remove.obj is False for isObject' )
		var obj = variable.defaultEventHandler(obj)
assert.hasMethod( obj, exports.Property.Event.Listener.remove, 'event.listener_remove.obj is False for hasMethod.removeEventListener' )
logger.debug( 'event.' + eventName + '.remove', variable.hash(fn) )
		if ( exports.hasEventListeners( eventName, obj ) )
		{
			var events              = exports.events(obj)
				events[eventName]   = sequence.without( exports.listeners( eventName, obj ), fn )
logger.info( ' > removed', variable.hash( events[eventName] ) )
				obj._eventListeners = events
		}
obj.removeEventListener( eventName, fn )
	return obj
	}exports.listener_remove = exports.listenerRemove = exports.removeEventListener = exports.eventListenerRemove = listener_remove


	function event_remove( eventName, obj )
	{
assert.isSomeString( eventName, 'event.eventRemove.eventName is False for isSomeString' )
assert.isNothingOrFn( obj, variable.isObject, 'event.eventRemove.obj is False for isObject' )
		var obj = variable.defaultEventHandler(obj)
logger.debug( 'event.' + eventName + '.remove ALL' )
		if ( exports.hasEventListeners( eventName, obj ) )
		{
			sequence.each( exports.listeners( eventName, obj ), function(fn) { obj = exports.eventListenerRemove( eventName, fn, obj ) } )
logger.debug( ' > removed', variable.hash( exports.events(obj) ) )
		}
	return obj
	}exports.event_remove = exports.eventRemove = exports.removeEventListeners = exports.eventListenersRemove = event_remove


	function events_remove(obj) 
	{// idepotent event cleanup
		if ( functions.paramsDiff( arguments, exports.eventsRemove ) < 0 )
			var obj = variable.defaultEventHandler(obj)
logger.debug( 'events.remove ALL' )
		if(  variable.hasMethod( obj, exports.Property.Event.Listener.remove )  )
		{
			dictionary.each( exports.events(obj), function( events, eventName ){ obj = exports.eventRemove( eventName, obj ) } )
logger.debug( ' > removed', variable.hash( exports.events(obj) ) )
		}
	return obj
	}exports.events_remove = exports.eventsRemove = exports.removeAllEventsListeners = events_remove


	function remove( obj, eventName, fn )
	{
assert.isNothingOrFn( obj      , variable.isObject    , 'event.remove.obj       is False for isObject' )
assert.isNothingOrFn( eventName, variable.isSomeString, 'event.remove.eventName is False for isSomeString' )
assert.isNothingOrFn( fn       , variable.isFunction  , 'event.remove.fn        is False for isFunction' )
		if ( variable.isSomeString(eventName) )
		{ 
			if ( variable.isFunction(fn) )
			{
	return exports.eventListenerRemove ( eventName, fn, obj )
			}
	return exports.eventListenersRemove( eventName, obj )
		}
	return exports.eventsRemove(obj)
	}exports.remove = remove


	function fire( eventName, param, obj )
	{
// TODO when serializing/deserializing the JSON event as param, Dates and large numbers get corrupted!
assert.isSomeString( eventName, 'event.eventFire.eventName is False for isSomeString' )
assert.isEventData ( param    , 'event.eventFire.param     is False for isEventData' )
assert.isNothingOrFn( obj     , variable.isObject , 'event.eventFire.obj      is False for isObject'  )
		var obj  = variable.defaultEventHandler(obj)
assert.hasMethod( obj, exports.Property.Event.fire, 'event.eventFire.obj is False for hasMethod.fireEvent' )
logger.debug( 'event.' + eventName + '.fire', param )
obj.fireEvent( eventName, {data: param} )
logger.info( ' > fired', variable.hash( exports.listeners( eventName, obj ) ) )
	return obj
	}exports.fire = exports.eventFire = fire


	function fireAndRemove( eventName, param, obj )
	{
assert.isSomeString( eventName, 'event.eventFireAndRemove.eventName is False for isSomeString' )
assert.isEventData ( param    , 'event.eventFireAndRemove.param     is False for isEventData' )
assert.isNothingOrFn( obj, variable.isObject, 'event.eventFireAndRemove.obj   is False for isObject' )
		var obj = variable.defaultEventHandler(obj)
assert.hasMethod( obj, exports.Property.Event.fire           , 'event.eventFireAndRemove.obj is False for hasMethod.fireEvent' )
assert.hasMethod( obj, exports.Property.Event.Listener.remove, 'event.eventFireAndRemove.obj is False for hasMethod.removeEventListener' )
logger.debug( 'event.' + eventName + '.fire once', param )
return exports.eventRemove(  eventName,  exports.eventFire( eventName, param, obj )  )
	}exports.fireAndRemove = exports.eventFireAndRemove = exports.fireOnce = exports.eventFireOnce = fireAndRemove
