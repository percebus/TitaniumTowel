Ti.include('/src/code/lib/include.js')

	function requireTest(x) { return require( TT.Module.Test + '/integration/' + x.replace( TT.Path.TT, '' ) ) }

var tests = requireTest(TT.Module.NW)

logger.info( 'Titanium Towel - Tests - Integration', TT.require(TT.Module.Unit).totals )