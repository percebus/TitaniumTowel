Ti.include('/src/code/towel/include.js');

	function requireTest(x) { return require( TT.Module.Test + '/ui/' + x.replace( TT.Path.TT, '' ) ); }

var tests = requireTest(TT.Module.Container);

logger.info( 'Titanium Towel - Tests - UI', TT.require(TT.Module.Unit).totals );