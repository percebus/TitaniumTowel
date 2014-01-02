/* no var, it breaks */
    TT   =    require('src/code/towel/index'); 
	Test = TT.require(TT.Module.Unit);
	Test.UT.attachAssertions(); // so we can use assertEqual directly, instead of Test.UT.assertions.assertEqual

var exports         = exports || {};
	exports.results = Test.results;
	exports.totals  = Test.totals;