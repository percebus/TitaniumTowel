var exports = exports || {}


	var Weight = {
			normal  : 'normal',
			semibold: 'semibold',
			bold    : 'bold' }
	exports.Weight = Weight

	var Style_ = {
			italic: 'italic',
			normal: 'normal' }
	exports.Style_ = Style_

	var Family = {
			Helvetica: 'Helvetica',
			DroidSans: 'DroidSans' } // TODO Droid only?
	exports.Family = Family

	var Generic = {
			sans     : 'sans-serif',
			serif    : 'serif',
			monospace: 'monospace' }
	exports.Generic = Generic

	var Unit = { // iOS only uses pts!, better stick to points
			point: 'pt',
			pixel: 'px',
			dp   : 'dp',
			dip  : 'dip',
			mm   : 'mm',
			inch : 'in' }
		Unit.DP  = Unit.dp
		Unit.DIP = Unit.dip
		Unit.MM  = Unit.mm
	exports.Unit = Unit
