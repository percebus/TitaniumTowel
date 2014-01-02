Ti.include('/src/code/towel/include.js');
var compare  = TT.require(TT.Module.Compare)
var dateTime = TT.require(TT.Module.DateTime)
var variable = TT.require(TT.Module.Var)
var events   = TT.require(TT.Module.Event)


	function Cache( name, src, cache, milliSeconds, fn )
	{
		var dates        = {}
		var name         = name
		var src          = src
		var cache        = cache
		var milliSeconds = milliSeconds || 0
			fn           = fn || function( a, b ){ return variable.isValue( a, b ) }

		this.expirationDate_get = function() { return dates[name] || 0 }
		this.expirationDate_set = function(n)
								 {
								 	var milliSeconds = n || milliSeconds
								 	var oNow         = compare.now()
								 	var   ms         = oNow.getTime() + milliSeconds
								 	var oDate        = dateTime.datetime(ms)
dateTime.disposeDate(oNow)
								 	dates[name] = oDate
								 return oDate
								 }
		this.get = function()
					{
						var oDate = this.expirationDate_get()
						var oNow  = dateTime.Now()
						if ( oNow > oDate )
						{
							data = src.get()
							if (  !fn( data, cache.get() )  )
							{
								cache.set(data)
events.eventFire( name, data )
							}
							this.expirationDate_set()
						} 
					}

		this.set = function(data)
					{
						  src.set(data)
						cache.set(data)
						this.expirationDate_set()
					}
	}
