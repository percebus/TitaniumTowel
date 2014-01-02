Ti.include('/src/code/towel/include.js');
var compare   = TT.require(TT.Module.Compare);
var validate  = TT.require(TT.Module.Validate);
var sequence  = TT.require(TT.Module.Sequence);
var functions = TT.require(TT.Module.Fn);

exports.lower = exports.toLowerCase = builtin.toLowerCase;
exports.upper = exports.toUpperCase = builtin.toUpperCase;
exports.format = builtin.format; //compare.isFunction(builtin.format) ? builtin.format : sprintf
exports.charAt = builtin.charAt;
exports.chars  = sequence.listToArray;


	function join( strings, separator )
	{
validate.isList( strings, 'string.join.strings is False for isList' )
validate.isNothingOrFn( separator, validate.isString, 'validate.join.separator is False for isString' )
	return builtin.join(  strings,  compare.defaultToValue( separator, ',' )  )
	}exports.join = join


	function concat() { return exports.join( sequence.argumentsToArray(arguments), '' ) }
	 exports.concat = exports.listToString = concat


	function toString(x) { return compare.isList(x) ? exports.listToString(x) : builtin.String(x) }
	 exports.toString = exports.parse = toString


	function updateAtChar( x, i, fn )
	{
validate.isSomeString( x , 'string.updateAtChar.x  is False for isSomeString' )
validate.isFunction  ( fn, 'string.updateAtChar.fn is False for isFunction'   )
validate.isIndexInList( i, x, 'string.updateAtChar.i is not a valid index: %d @ %s' )
		var letters    = exports.chars(x)
			letters[i] = fn( letters[i] )
	return exports.toString(letters)
	}exports.updateAtChar = updateAtChar


	function capitalize(x)
	{
validate.isSomeString( x, 'string.capitalize.x is False for isSomeString' )
	return exports.updateAtChar( x, sequence.FIRST, exports.upper )
	}exports.capitalize = capitalize


	function uncapitalize(x)
	{
validate.isSomeString( x, 'string.capitalize.x is False for isSomeString' )
	return exports.updateAtChar( x, sequence.FIRST, exports.lower )
	}exports.uncapitalize = uncapitalize


	function transform( x, fn )
	{ // TODO
validate.isString  ( x , 'string.transform.x  is False for isString'   )
validate.isFunction( fn, 'string.transform.fn is False for isFunction' )
	return exports.parse( fn( exports.chars(x) ) )
	}exports.transform = transform


	function reverse(x)
	{
validate.isString( x, 'string.reverse.x is False for isString' )
	return exports.parse( sequence.reverse( exports.chars(x) ) )		
	}exports.reverse = reverse


	function replace( x, before, after )
	{
validate.isString( x     , 'string.replace.x      is False for isString' )
validate.isString( before, 'string.replace.before is False for isString' )
validate.isNothingOrFn( after, compare.isString, 'string.replace.after  is False for isString' )
	return builtin.replace(  x,  before,  compare.defaultToValue( after, '' )  )
	}exports.replace = replace


	function remove( x, part )
	{
validate.isString( x   , 'string.remove.x    is False for isString' )
validate.isString( part, 'string.remove.part is False for isString' )
	return exports.replace( x, part, '' )
	}exports.remove = remove


	function charFirst(x) 
	{
validate.isString( x, 'string.charFists.x is False for isString' ) 
	return exports.charAt( x, sequence.FIRST ) 
	}exports.charFirst = charFirst


	function charLast(x)  
	{
validate.isString( x, 'string.charLast.x is False for isString' ) 
	return exports.charAt( x, sequence.indexLast(x) ) 
	}exports.charLast = charLast


	function left( x, chars ) 
	{
validate.isString( x, 'string.left.x is False for isString' )
validate.isIntInLength( chars, x, 'string.left.chars is False for isIntInLength' )
	return builtin.substr( x, sequence.FIRST, chars ) 
	}exports.left = left


	function right( x, chars ) 
	{
validate.isString( x, 'string.right.x is False for isString' )
validate.isIntInLength( chars, x, 'string.right.chars is False for isIntInLength: %d in %s' ) 
	return builtin.substr( x, sequence.size(x) -chars ) 
	}exports.right = right


	function search( x, part )
	{
validate.isString  ( x   , 'string.search.x    is False for isString'    )
validate.isCriteria( part, 'string.search.part is False for isCriteria ' )
	return compare.isString(part) ? builtin.String_indexOf( x, part ) : builtin.search( x, part )
	}exports.search = search


	function contains( x, part ) 
	{
validate.isString  ( x   , 'string.contains.x    is False for isString'    )
validate.isCriteria( part, 'string.contains.part is False for isCriteria ' )
	return (  exports.search( x, part )  >=  0  )
	}exports.contains = contains


	function isInString( part, x ) // XXX 
	{
validate.isCriteria( part, 'string.isInString.part is False for isCriteria ' )
validate.isString  ( x   , 'string.isInString.x    is False for isString'    )
	return exports.contains( x, part ) //indexOf doesnt support regex
	}exports.isInString = isInString


	function split( x, separator )
	{
validate.isString    ( x        , 'string.split.x         is False for isString'    )
validate.isSomeString( separator, 'string.split.separator is False for isSomeString ' )
	return exports.contains( x, separator ) ? x.split(separator) : [x]
	}exports.split = split


	function removeFromLeft( x, chars ) 
	{
validate.isString( x, 'string.removeFromLeft.x is False for isString' )
validate.isIntInLength( chars, x, 'string.removeFromLeft.chars is False for isIntInLength: %d in %s' )
	return exports.right( x, sequence.size(x) - chars ) 
	}exports.removeFromLeft = removeFromLeft


	function removeFromRight( x, chars )
	{
validate.isString( x, 'string.removeFromRight.x is False for isString' )
validate.isIntInLength( chars, x, 'string.isIntInLength.chars is False for isIntInLength: %d in %s' )
	return exports.left( x, sequence.size(x) - chars )
	}exports.removeFromRight = removeFromRight


	function startsWith( x, part ) 
	{
validate.isString  ( x   , 'string.startsWith.x    is False for isString' ) 
validate.isCriteria( part, 'string.startsWith.part is False for isCriteria' )
	return compare.isZero( exports.search( x, part ) ) //indexOf doesnt support regex 
	}exports.startsWith = startsWith


	function ensureStartsWith( x, part ) 
	{ 
validate.isString( x   , 'string.ensureStartsWith.x    is False for isString' ) 
validate.isString( part, 'string.ensureStartsWith.part is False for isString' )
	return exports.startsWith( x, part ) ? x : part + x
	}exports.ensureStartsWith = ensureStartsWith


	function ensureStartsWithout( x, part ) 
	{ 
validate.isString( x   , 'string.ensureStartsWithout.x    is False for isString' ) 
validate.isString( part, 'string.ensureStartsWithout.part is False for isString' )
	return exports.startsWith( x, part ) ? exports.removeFromLeft( x, sequence.size(part) ) : x 
	}exports.ensureStartsWithout = ensureStartsWithout


	function endsWith( x, part ) 
	{// TODO support search
validate.isString( x   , 'string.endsWith.x    is False for isString' ) 
validate.isString( part, 'string.endsWith.part is False for isString' )
		var chars = sequence.size(part)
	return compare.isIntInLength( chars, x ) ? compare.isValue(  exports.right( x, chars ),  part  ) : false
	}exports.endsWith = endsWith


	function ensureEndsWith( x, part ) 
	{ 
validate.isString( x   , 'string.ensureEndsWith.x    is False for isString' ) 
validate.isString( part, 'string.ensureEndsWith.part is False for isString' )
	return x = exports.endsWith( x, part ) ? x : x + part
	}exports.ensureEndsWith = ensureEndsWith


	function ensureEndsWithout( x, part ) 
	{ 
validate.isString( x   , 'string.ensureEndsWith.x    is False for isString' ) 
validate.isString( part, 'string.ensureEndsWith.part is False for isString' )
	return exports.endsWith( x, part ) ? exports.removeFromRight( x, sequence.size(part) ) : x 
	}exports.ensureEndsWithout = ensureEndsWithout


	function wrap( ini, x, end )
	{
validate.isString( ini, 'string.wrap.ini is False for isString' )
validate.isString( x  , 'string.wrap.x   is False for isString' ) 
validate.isString( end, 'string.wrap.end is False for isString' )
	return exports.ensureEndsWith(  exports.ensureStartsWith( x, ini ),  end  )
	}exports.wrap = wrap


	function unwrap( ini, x, end )
	{
validate.isString( ini, 'string.unwrap.ini is False for isString' )
validate.isString( x  , 'string.unwrap.x   is False for isString' ) 
validate.isString( end, 'string.unwrap.end is False for isString' )
	return exports.ensureEndsWithout(  exports.ensureStartsWithout( x, ini ),  end  )
	}exports.unwrap = unwrap


	function clear(x)
	{
validate.isString( x, 'string.clear.x is False for isString' )
	return builtin.substr( x, sequence.FIRST, 0 )
	}exports.clear = clear


	function repeat( x, n )
	{
validate.isString( x, 'string.repeat.x is False for isString' )
validate.isNothingOrFn( n, compare.isZeroOrMore, 'string.repeat.n is False for isZeroOrMore' )
		var result = ''
		sequence.times( n, function(i) { result += x } )
	return  result
	}exports.repeat = repeat


	function digits( input, iDigits, character )
	{
validate.isNotNothing( input  , 'string.digits.input   is False for isNotNothing' )
validate.isPositive  ( iDigits, 'string.digits.iDigits is False for isPositive' )
validate.isNothingOrFn( character, compare.isString, 'string.digits.character is False for isString' )
		var character = compare.defaultToValue( character, '0' )
		var value     = exports.parse(input)
		while ( sequence.size(value) < iDigits )
			value = character + value
	return  value
	}exports.digits = digits


// TODO move me: locale? or currency?
	function formatDollar(num) 
	{// from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
		var num = parseFloat(num) // I added this line!
	    var p   = num.toFixed(2).split(".")
	return "$" + p[0].split("").reverse().reduce( function(acc, num, i, orig) { return  num + (i && !(i % 3) ? "," : "") + acc }, "" ) + "." + p[1]
	}exports.formatDollar = formatDollar

