Ti.include('/src/code/lib/include.js')
var dictionary = TT.require(TT.Module.Dictionary)
var oop        = TT.require(TT.Module.OOP)


	function Global()
	{
		var G = {}

		this.get = function(key) { return G[key] }

		this.set = function( key, value ) { return dictionary.item_set( G, key, value ) }

		this.unset = function(key) { dictionary.deleteProperty( G, key ) }

		this.wipeOut = function() { dictionary.clear(G) }
	}exports.Global = Global


	var     oGlobal = null
	function GlobalSingleton() { return oop.singleton( oGlobal, Global ) }
	 exports.GlobalSingleton = GlobalSingleton
