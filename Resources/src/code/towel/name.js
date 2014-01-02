Ti.include('/src/code/towel/include.js');
var sequence = TT.require(TT.Module.Sequence);
var str      = TT.require(TT.Module.Str);


// TODO add asserts
	function first_last(nameFirst, nameLast)
	{
		var names = sequence.unpack(arguments);
	return sequence.first(names) + ' ' + sequence.last(names);
	}exports.first_last = first_last;


	function last_first(nameFirst, nameLast)
	{
		var names = sequence.unpack(arguments);
	return sequence.last(names) + ', ' + sequence.first(names);
	}exports.last_first = last_first;


	function fullName() // args
	{
	return str.join( sequence.unpack(arguments), ' ' );
	}exports.fullName = fullName;

