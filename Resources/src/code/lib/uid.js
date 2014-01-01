Ti.include('/src/code/lib/include.js')
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)
var sequence = TT.require(TT.Module.Sequence)

exports.UID = 0

	var UIDs     = exports.UIDs     = {}
	var entities = exports.entities = [] // starts at size 0


	function get(entity)
	{ 
		exports.entities = sequence.append( entity, exports.entities ) // JIC gets deleted, it will re-generate
		   exports.UID   = exports.entities.length
	return exports.UID // TODO what to return if entities gets deleted?
	}exports.get = get


	function entity_get(entity) 
	{
validate.isSomeString( entity, 'UID.get.entity_get is False for is entity' )
		exports.get(entity)
exports.UIDs[entity] = compare.defaultNumber( exports.UIDs[entity] ) +1
	return exports.UIDs[entity] 
	}exports.entity_get = exports.entity = exports.getEntity = entity_get
