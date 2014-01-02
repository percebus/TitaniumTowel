Ti.include('/src/code/towel/include.js');
Ti.include( builtin.format('/%s.js', TT.Module.jsunity) ); // TODO require
var variable = TT.require(TT.Module.Var);

	jsUnity.log   = console.info;
	jsUnity.debug = console.debug;

	exports.results = {};
	exports.totals  = {
		duration: 0,
		passed  : 0,
		failed  : 0,
		total   : 0 };

	jsUnity.runAndCache = function(test, key)
	{
		var results = jsUnity.run(test);
// XXX  exports.totals.duration
		exports.totals.total    += results.total;
		exports.totals.passed   += results.passed;
		exports.totals.failed   += results.failed;
		exports.totals.duration += results.duration;
		if (key)
			exports.results[key] = results;
	};

    jsUnity.assertions.assertSimilar = function (expected, actual, message, precision) 
    {
	    function fmt(str) {
	        var a = Array.prototype.slice.call(arguments, 1);
	        return str.replace(/\?/g, function () { return a.shift(); });
	    }

    	var precision = compare.defaultBoolean(precision, false);
    	var x = variable.hash(expected, precision);
    	var y = variable.hash(actual  , precision);
        if (x != y) {
            throw fmt("?: (?) is not equal to (?)\n    - X: (?)\n    - Y: (?)",
                message || "assertEqual", actual, expected, x, y);
        }
    };

	exports.UT = jsUnity;

	function test(name, fn)
	{
		var results = ['FAILED', 'PASSED'];
logger.info( results[  builtin.Number( fn() )  ], name, true );
	}exports.test = test;

logger.info('UnitTest assertions', exports.UT.assertions);
