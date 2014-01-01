Ti.include('/src/code/lib/include.js')
var compare  = TT.require(TT.Module.Compare)
var validate = TT.require(TT.Module.Validate)

	var Round = exports.Round = {
			Lower  : builtin.parseInt,
			Nearest: builtin.round,
			Higher : builtin.ceil }


	function divide( x, y, useDecimal )
	{
validate.isNumber( x, 'math.divide.x is False for isNumber' )
validate.isNumber( y, 'math.divide.y is False for isNumber' )
validate.isNothingOrFn( useDecimal, compare.isBoolean, 'math.divide.useDecimal is False for isBoolean' )
		var useDecimal = compare.defaultBoolean( useDecimal, true )
		var residual   = x % y
		var result     = x / y
	return ( useDecimal || compare.isZero(residual) ) ? result : [ exports.Round.Lower(result), residual ]
	}exports.divide = divide
