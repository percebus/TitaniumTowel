Ti.include('/src/code/towel/include.js');
var validate = TT.require(TT.Module.Validate);
var dateTime = TT.require(TT.Module.DateTime);


	function timeit(fn)
	{
validate.isFunction(fn, 'time.timeit.fn is False for isFunction');
		var start = new Date();
		fn();
		var end   = new Date();
	return dateTime.delta(start, end);
	}exports.timeit = timeit;


	function once(ms, fn)
	{
validate.isPositiveInt(ms, 'time.once.ms is False for isPositiveInt');
validate.isFunction   (fn, 'time.once.fn is False for isFunction'   );
	return builtin.setTimeout(fn, ms);
	}exports.once = once;


	function every(ms, fn)
	{
validate.isPositiveInt(ms, 'time.every.ms is False for isPositiveInt');
validate.isFunction   (fn, 'time.every.fn is False for isFunction'   );
	return builtin.setInterval(fn, ms);
	}exports.every = every;


	function wait(ms)
	{
validate.isPositiveInt(ms, 'time.wait.ms is False for isPositiveInt');
		var until = dateTime.add( new Date(), ms );
		while( dateTime.isFuture(until)) {};
	}exports.wait = exports.sleep = wait;
