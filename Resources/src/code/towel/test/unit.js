Ti.include('/src/code/towel/include.js');

	function requireTest(x) { return require( TT.Module.Test + '/unit/' + x.replace( TT.Path.TT, '' ) ); }

var tests = requireTest(TT.Module.Log);
	tests = requireTest(TT.Module.Native);
	tests = requireTest(TT.Module.Compare);
	tests = requireTest(TT.Module.Math_);
	tests = requireTest(TT.Module.Sequence);
	tests = requireTest(TT.Module.Dictionary);
	tests = requireTest(TT.Module.UID);
	tests = requireTest(TT.Module.Iterable);
	tests = requireTest(TT.Module.OOP);
	tests = requireTest(TT.Module.Str);
	tests = requireTest(TT.Module.RegEx);
	tests = requireTest(TT.Module.DateTime);
	tests = requireTest(TT.Module.ASCII);
	tests = requireTest(TT.Module.Name);
	tests = requireTest(TT.Module.Data);
	tests = requireTest(TT.Module.Var);
	tests = requireTest(TT.Module.Event);
	tests = requireTest(TT.Module.Mem);
	tests = requireTest(TT.Module.JSON);
	tests = requireTest(TT.Module.AppProperties);
	tests = requireTest(TT.Module.FS);
	tests = requireTest(TT.Module.Path);
	tests = requireTest(TT.Module.SQLess);
	tests = requireTest(TT.Module.URI);

logger.info( 'Titanium Towel - Tests - Unit', TT.require(TT.Module.Unit).totals );
