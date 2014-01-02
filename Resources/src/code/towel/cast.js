var exports = exports || {};


	function not(x) { return !x; } // warning, no control
	 exports.not = not;

	function coherce(x) { return (x); } // TODO does it work when return from a fn?
	 exports.coherce = coherce;

	function number(x) { return +(x); } // +coherce(x)
	 exports.number = number;

	function bool(x) 
	{ // http://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript
	/*
	!!false         === false 
    !!true          === true  
    !!0             === false
    !!1             === true  
    !!-1            === true  // -1 is truthy 
    !!""            === false // empty string is falsy
    !!"foobar"      === true  // non-empty string is truthy
    !!"false"       === true  // ...even if it encapsulates a falsy value
    !!null          === false // null is falsy
    !![]            === true  // an (empty) array is truthy
    !!{}            === true  // an (empty) object is truthy
	 */ 
	return !!x;
	}exports.bool = bool;

	function dull() {} // return undefined? null?
	 exports.dull = exports.noop = exports.noOperation = dull;

	function f(x) { return x; } // avoids if isFunction(fn) ? fn(x) : x
	 exports.f = exports.identiy = f;

	function itsTrue () { return true; }
	 exports.itsTrue = itsTrue;

	function itsFalse() { return false; }
	 exports.itsFalse = itsFalse;

	function itsNull () { return null; }
	 exports.itsNull = exports.nullify = itsNull;

	function itsUndefined() { return undefined; }
	 exports.itsUndefined = exports.undefine = itsUndefined;

	function now() { return new Date(); }
	 exports.now = now;

	function pass(x, d, fn){ return fn(x) ? x : d; }
	 exports.pass = pass;

	function fail(x, d, fn){ return fn(x) ? d : x; }
	 exports.fail = fail;

	function passOrNothing(x, fn) { return exports.pass(x, undefined, fn); }
	 exports.passOrNothing = passOrNothing;
