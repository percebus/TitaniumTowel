Ti.include('/src/code/lib/include.js')
var compare   = TT.require(TT.Module.Compare)
var validate  = TT.require(TT.Module.Validate)
var sequence  = TT.require(TT.Module.Sequence)
var str       = TT.require(TT.Module.Str)


	var Common = exports.Common = {
			With: {
				Starts: '^',
				Ends  : '$' },
			Or: '|',
			Has: {
				Optional: '?',
				ManyOr: {
					None: '*',
					One : '+'}}}


	function matches( string, regex )
	{
validate.isString( string, 'regexp.matches.string is False for isString' )
validate.isRegExp( regex , 'regexp.matches.regex  is False for isRegExp' )
	return builtin.test( regex, string ) // regex.test(string)	
	}exports.matches = exports.isMatch = exports.hasMatch = matches


	function source(x)
	{
validate.isCriteria( x, 'regexp.source.x is False for isCriteria: %s' )
	return compare.isRegExp(x) ? x.source : x
	}exports.source = getSource = exports.source_get = source


	function join( list, separator )
	{
		var strings = sequence.map( list, exports.source )
	return new RegExp( str.join( strings, exports.source(separator) ) )
	}exports.join = join


	function concat() { return exports.join( sequence.argumentsToArray(arguments), '' ) }
	 exports.concat = concat


	function ensureStartsWith(regex) 
	{
validate.isCriteria( regex, 'ensureStartsWith.regex is False for isCriteria' ) 
	return new RegExp( str.ensureStartsWith( exports.source(regex), exports.Common.With.Starts ) ) 
	}exports.ensureStartsWith = ensureStartsWith

	function ensureEndsWith(regex) 
	{
validate.isCriteria( regex, 'ensureEndsWith.regex is False for isCriteria' ) 
	return new RegExp( str.ensureEndsWith  ( exports.source(regex), exports.Common.With.Ends ) ) 
	}exports.ensureEndsWith = ensureEndsWith


	function ensureIs(regex) 
	{ 
validate.isCriteria( regex, 'is.regex is False for isCriteria' )
	return new RegExp( exports.source( exports.ensureStartsWith( exports.ensureEndsWith(regex) ) ) ) 
	}exports.ensureIs = ensureIs


	function optional( regex, n )
	{
validate.isCriteria( regex, 'regExp.optional.regex is False for isCriteria' )
validate.isNothingOrFn( n, compare.isCriteria, 'regExp.optional.n is False for isCriteria' )
	return exports.concat(  str.wrap( '(', exports.source(regex), ')' ),  exports.source( compare.defaultToValue( n, exports.Common.Has.Optional ) )  )
	}exports.optional = optional


	function options() { return new RegExp(   str.wrap(  '(',  exports.source(  exports.join( sequence.argumentsToArray(arguments), exports.Common.Or )  ),  ')'  )   ) }
	 exports.options = options
