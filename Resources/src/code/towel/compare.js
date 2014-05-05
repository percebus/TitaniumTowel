Ti.include('/src/code/towel/include.js');
var cast = TT.require(TT.Module.Cast);
var SDK  = TT.require(TT.Module.Titanium);

exports.is = exports.isSameExact = exports.areExactSame = builtin.is;
exports.isIdentical  = exports.areIdentical  = builtin.isIdentical;
exports.isEquivalent = exports.areEquivalent = builtin.isEquivalent;
exports.hasProperty = exports.hasattr = exports.has = builtin.hasProperty;
exports.hasKeys = builtin.hasKeys;
exports.hasKey = builtin.hasKey;
exports.propertyIsEnumerable = builtin.propertyIsEnumerable;
exports.hasEnumerables = exports.hasAnyEnumerable = builtin.hasEnumerables;
exports.hasEnumerable = exports.isEnumerable = builtin.hasEnumerable;
exports.hasTrait = exports.hasInheritedProperty = builtin.hasTrait;
exports.hasTraits = exports.hasInheritedProperties = builtin.hasTraits;
exports.item_get = exports.item = exports.getItem = builtin.item_get;
exports.item_set = exports.setItem = builtin.item_set;
exports.fwd = builtin.fwd;
exports.isExtensible = builtin.isExtensible;
exports.isSealed     = builtin.isSealed;
exports.isFrozen     = builtin.isFrozen;

exports.boolCast = exports.bool = cast.bool;
exports.numberCast = exports.toNumber = cast.number;
exports.f = exports.identity = cast.f;
exports.itsTrue = cast.itsTrue;
exports.itsFalse = exports.falsify = cast.itsFalse;
exports.itsNull = cast.itsNull;
exports.now = cast.now;
exports.pass = cast.pass;
exports.fail = cast.fail;
exports.passOrNothing = cast.passOrNothing;

    var C = exports.C = {
            True : new Boolean(true),
            False: new Boolean(false),
            All  : new Number(100),
            Zero : new Number(0) };

    var Property = exports.Property = {
            length_        : 'length',
            hasOwnProperty_: 'hasOwnProperty',
            DontDelete_    : 'DontDelete',
            children       : 'children',
            window_        : 'window',
            value_         : 'value',
            valueOf_       : 'valueOf' };

    var Type = exports.Type = { // TODO rename these
            TiUI      : 'TiUI',
            Err       : 'error',
            Null      : 'null',
            Undefined : 'undefined',
            Nothing   : 'nothing',
            Var       : 'var',
            Fn        : 'function',
            Str       : 'string',
            Bool      : 'boolean',
            Numeric   : 'number',
            Infinite  : 'infinite',
            Int       : 'int',
            Float     : 'float',
            DateTime  : 'date',
            Array_    : 'array',
            Arguments : 'arguments',
            List      : 'list',
            Sequence  : 'sequence',
            Obj       : 'object',
            RegEx     : 'regexp',
            Dictionary: 'dictionary',
            Other     : 'other',
            Iterable  : 'iterable',
            NaN_      : 'NaN' };

    var Precision = exports.Precision = {
            Is    : 4, // ====: -0 != 0
            Strict: 3, // ===
            Weak  : 2  // == 
        };


// warning isNaN builtin function rename. use builtin.isNaN for vanilla behavior
    function isNaN(x) { return x !== x; } // wait... what o.O?
     exports.isNaN = isNaN;

    function typeName_get(x) { return builtin.String(   builtin.String_slice(  builtin.toString(x),  8,  -1 )   ); } // extract name from '[object <name>]' 
     exports.typeName_get = exports.typeName = exports.getTypeName = typeName_get;

    function typeName_native_get(x) { return builtin.toLowerCase( exports.typeName_get(x) ); }
     exports.typeName_native_get = exports.typeName_native = exports.getNativeTypeName = typeName_native_get;

    function type(x)
    {// null casts to 'object', we can't have that
    if (x === null     ) return exports.Type.Null;
    if (x === undefined) return exports.Type.Undefined;
    if (x !== x        ) return exports.Type.NaN_; // according to _underscore: "NaN is the only value for which === is not reflexive."
                         return exports.typeName_native(x);
    }exports.type = exports.typeOf = type;


    function isPrimitive(x)
    {
        switch( builtin.typeOf(x) )
        {
            case exports.Type.Str:
            case exports.Type.Numeric:
            case exports.Type.Bool:
    return true;
        break;
        }
    return false;
    }exports.isPrimitive = isPrimitive;


    function typeNames_get(x) { return [ exports.type(x), builtin.typeOf(x), exports.typeName(x) ]; };
     exports.typeNames_get = exports.typeNames = exports.getTypeNames = typeNames_get;


    function isValue(x, y, precision)
    {// I DONOT wish to see this piece of code OVER AND OVER EVERYWHERE! 
        if ( exports.type(precision) === exports.Type.Bool ) // TODO remove useExact true/false?
            precision = precision ? exports.Precision.Strict : exports.Precision.Weak;
        precision = precision || exports.Precision.Strict;
        switch(precision)
        {
    case exports.Precision.Is  : return builtin.is(x, y); break;
    case exports.Precision.Weak: return        (x ==  y); break;
    default                    : return        (x === y); break; // Strict
        }
    }exports.isValue = exports.isSame = exports.areSame = exports.isEqual = exports.areEqual = isValue;


    function hasName(x, name) { return exports.typeName(x) === name; }
     exports.hasName = hasName;


// ***** lowest level comparisons *****
    function isTrue    (x, precision) { return exports.isValue(x, true , precision); }
     exports.isTrue = isTrue;

    function isFalse   (x, precision) { return exports.isValue(x, false, precision); }
     exports.isFalse = isFalse;

    function isZero    (x, precision) { return exports.isValue(x,  0, precision); }
     exports.isZero = exports.is0 = isZero;

    function isOne     (x, precision) { return exports.isValue(x,  1, precision); }
     exports.isOne = exports.is1 = isOne;

    function isMinusOne(x, precision) { return exports.isValue(x, -1, precision); }
     exports.isMinusOne = isMinusOne;

// TODO move to Ti module
    function isEndOfStream(x) { return x == -1; } // Ti.Buffer end of stream
     exports.isEndOfStream = isEndOfStream;


// ***** types/values *****
// ES5 Note: For convenience the return value of Object.prototype.toString for both null and undefined was changed from Object to Null and Undefined in ECMAScript 5.
    function isUndefined (x, precision) { return exports.isValue(x, undefined, precision); }
     exports.isUndefined = isUndefined;

    function isNull      (x, precision) { return exports.isValue(x, null     , precision); }
     exports.isNull = isNull;

    function isNothing   (x, precision) { return ( exports.isUndefined(x, precision) || exports.isNull(x, precision) ); }
     exports.isNothing = exports.isNone = isNothing; //isNone alias for python's is None

// Normally I would use !isNothing but I will end up with function(x) { return !isNothing(x) }  instead of isNotNothing...
    function isNotNothing(x, precision) { return !exports.isNothing(x, precision); }
     exports.isNotNothing = isNotNothing;

// This looks really nice when if ( compare.exists(x) ) return x
    function exists      (x, precision) { return exports.isNothing(x, precision) ? null : x; } // could be null or undefined, we want to force null JIC
     exports.exists = exists;


// ***** type comparisons *****
    function isTypeSame(x, y) { return exports.type(x) === exports.type(y); }
     exports.isTypeSame = exports.areSameType = exports.areTypesSame = isTypeSame;

    function isType(x, type_) { return exports.type(x) === type_; }
     exports.isType = isType;

// ***** types *****
    function isString  (x) { return exports.isType(x, exports.Type.Str); }
     exports.isString = isString;

    function isObject  (x) { return exports.isType(x, exports.Type.Obj); }
     exports.isObject = isObject;

    function isRegExp  (x) { return exports.isType(x, exports.Type.RegEx); }
     exports.isRegExp = exports.isRegEx = isRegExp;

// TODO ensure it doesnt conflict with Ti methods
    function isFunction(x) { return exports.isType(x, exports.Type.Fn); }
     exports.isFunction = exports.isCallable = exports.isClass = isFunction;

    function isError   (x) { return exports.isType(x, exports.Type.Err); }
     exports.isError = isError;

// We filter out nulls, since they "are objects"
    function isInstance(x) { return exports.isNothing(x) ? null : builtin.typeOf(x) === exports.Type.Obj; } // this can be any new Date/Sring/Number etc..
     exports.isInstance = isInstance;

// Such as new Boolean(true), where 'object' is different from 'boolean'
    function isInstanciated(x) { return builtin.typeOf(x) !== exports.type(x); }
     exports.isInstanciated = isInstanciated;

    function isClassOrInstance(x) { return ( exports.isClass(x) || exports.isInstance(x) ); }
     exports.isClassOrInstance = isClassOrInstance;

    function isBoolean  (x) { return exports.isType(x, exports.Type.Bool); }
     exports.isBoolean = isBoolean;

    function isNumeric  (x) { return exports.isType(x, exports.Type.Numeric); }
     exports.isNumeric = isNumeric;

    function isArray    (x) { return exports.isType(x, exports.Type.Array_); } // its better than builtin.isArray ?
     exports.isArray = isArray;

    function isArguments(x) { return exports.isType(x, exports.Type.Arguments); }
     exports.isArguments = isArguments;

// warning overwriting isFinite native function! backup is on native module
    function isFinite   (x) { return exports.isNumeric(x) ?  builtin.isFinite(x) : null; }
     exports.isFinite = isFinite;

    function isInfinite (x) { return exports.isNumeric(x) ? !exports.isFinite(x) : null; }
     exports.isInfinite = exports.isNotFinite = isFinite;

    function isInt      (x) { return exports.isFinite(x) ? exports.is0( x % 1 ) : null; }
     exports.isInt = isInt;

	function isFloat    (x) { return exports.isFinite(x) ? !exports.isInt(x) : null; }
	 exports.isFloat = isFloat;

    function isNumber(x, precision) 
    { 
        var fn = exports.isFinite;
        switch(precision)
        {
            case exports.Type.Int  : fn = exports.isInt  ; break;
            case exports.Type.Float: fn = exports.isFloat; break;
        }
    return ( exports.is0(x) || fn(x) );
    }exports.isNumber = isNumber;

    function isDate (x) { return exports.isType(x, exports.Type.DateTime); }
     exports.isDate = isDate;

    function isList (x) { return ( exports.isArray(x) || exports.isArguments(x) ); }
     exports.isList = exports.is_args = exports.isResizable = isList;

    function isSequence(x) { return ( exports.isList(x) || exports.isString(x) ); }
     exports.isSequence = isSequence;

    function isCriteria(x) { return ( exports.isString(x) || exports.isRegExp(x) ); }
     exports.isCriteria = exports.isSearchCriteria = isCriteria;


    function hasProperties(x){ return exports.isInstance(x) ? (  builtin.hasEnumerables(x)  ||  ( builtin.getOwnPropertyNames(x).length > 0 )  ) : null; }
     exports.hasProperties = exports.hasAnyProperty = hasProperties;

// ***** default common functions *****
    function valueOrDefault(x, d, d2, fn)
    {
        var d = fn(d) ? d : d2;
    return      fn(x) ? x : d;
    }exports.valueOrDefault = valueOrDefault;

    function defaultParam(x, d) 
    {// even params not set are 'undefined', easier to distinguish from isNothing alone
        var d = exports.isNothing  (d) ? undefined : d;
    return      exports.isUndefined(x) ? d         : x;
    }exports.defaultParam = defaultParam;

exports.defaultContext = exports.defaultParam;

    function defaultBoolean   (x, d) { return exports.valueOrDefault(x, d, !!d, exports.isBoolean); }
     exports.defaultBoolean = exports.defaultToBoolean = defaultBoolean;

    function defaultNumber    (x, d) { return exports.valueOrDefault(x, d, 0, exports.isNumber); }
     exports.defaultNumber = exports.defaultToNumber = defaultNumber;

    function defaultFunction  (x, d) { return exports.valueOrDefault(x, d, cast.f, exports.isFunction); }
     exports.defaultFunction = exports.defaultToFunction = defaultFunction;

    function defaultDate      (x, d) { return exports.valueOrDefault(x, d, cast.now(), exports.isDateValid); }
     exports.defaultDate = exports.defaultToDate = defaultDate;

    function defaultList      (x, d) { return exports.valueOrDefault(x, d, [], exports.isList); }
     exports.defaultList = exports.defaultToList = defaultList;

    function defaultDictionary(x, d) { return exports.valueOrDefault(x, d, {}, exports.isInstance); }
     exports.defaultDictionary = exports.defaultToDictionary = defaultDictionary;

    function defaultIterable  (x, d) { return exports.valueOrDefault(x, d, {}, exports.isIterable); }
     exports.defaultIterable = exports.defaultToIterable = defaultIterable;


    function defaultToValue(x, d, fn) { return exports.valueOrDefault( x, d, null, exports.defaultFunction(fn, exports.isNotNothing) ); }
     exports.defaultToValue = defaultToValue;

    function defaultMethod(obj, method, d) { return exports.defaultFunction( builtin.item(obj, method), d ); }
     exports.defaultMethod = defaultMethod;

    function defaultTo0(x) { return exports.defaultNumber(x, 0); } // XXX ?
     exports.defaultTo0 = exports.defaultToZero = defaultTo0;

// TODO move to Ti module
    function defaultEventHandler(x) { return exports.defaultParam(x, SDK.Handler.Event); }
     exports.defaultEventHandler = exports.defaultToEventHandler = defaultEventHandler;

    function defaultWindow(win) { return exports.isTiObject(win) ? win : SDK.Current.win; }
     exports.defaultWindow = defaultWindow;

    function defaultTab   (tab) { return exports.isTiObject(tab) ? tab : SDK.Current.tab; }
     exports.defaultTab = defaultTab;


// TODO review over-engineering
    function isGreaterThan( x, y, orEqual, precision )
    {
        if (  !( exports.isNumber(x, precision) && exports.isNumber(y, precision) )  )
        {
    return null;
        }
    return exports.defaultBoolean(orEqual, false) ? (x >= y) : (x > y);
    }exports.isGreaterThan = isGreaterThan;


    function isLowerThan( x, y, orEqual, precision )
    {
        if (  !( exports.isNumber(x, precision) && exports.isNumber(y, precision) )  )
        {
    return null;
        }
    return exports.defaultBoolean(orEqual, false) ? (x <= y) : (x < y);
    }exports.isLowerThan = isLowerThan;


    function isGreaterThanZero(x, orEqual, precision) { return exports.isGreaterThan(x, 0, orEqual, precision); }
     exports.isGreaterThanZero = isGreaterThanZero;

    function isLowerThanZero  (x, orEqual, precision) { return exports.isLowerThan  (x, 0, orEqual, precision); }
     exports.isLowerThanZero = isLowerThanZero;

    function isPositive  (x, precision)  { return exports.isGreaterThanZero(x, false, precision); }
     exports.isPositive = exports.isPositiveNumber = exports.isNumberGTZ = exports.isNumberGreaterThanZero = exports.isNumberPositive = isPositive;

    function isZeroOrMore(x, precision)  { return exports.isGreaterThanZero(x, true , precision); }
     exports.isZeroOrMore = exports.isZeroOrGreater = isZeroOrMore;

    function isIntPositive(x) { return exports.isPositive(x, exports.Type.Int); } // we use it so often. might as well have it
     exports.isIntPositive = exports.isPositiveInt = isIntPositive;



// ***** properties, keys, methods and so on *****

    function evaluate(x) 
    {
        if ( !exports.isString(x) )
        {
    return x;
        }
        try
        {
    return builtin.eval(x);
        }
        catch(err){};
    return x;
    }exports.evaluate = exports.evaluate;

// Commonly used hasProperty_ies
    function hasProperty_length  (x) { return builtin.hasProperty(x, exports.Property.length_); } // Too much?? ( x.length >= 0 ) : null }
     exports.hasProperty_length = hasProperty_length;

    function hasProperty_window  (x) { return builtin.hasProperty(x, exports.Property.window_); }
     exports.hasProperty_window = hasProperty_window;


    function has_children(x) { return builtin.hasProperty(x, exports.Property.children) ? exports.isCollection(x.children) : null; }
     exports.has_children = has_children;


// ***** methods *****
    function hasMethod(obj, method) { return builtin.hasProperty(obj, method) ? exports.isFunction( obj[method] ) : null; }
     exports.hasMethod = hasMethod;

    function hasMethod_hasOwnProperty(obj) { return exports.hasMethod(obj, exports.Property.hasOwnProperty_); }
     exports.hasMethod_hasOwnProperty = hasMethod_hasOwnProperty; 


// resolvers specially usefull with methods get()
    function resolve(x, args, context) { return exports.isFunction(x) ? builtin.fwd(x, args, context) : x; }  
     exports.resolve = resolve;

    function resolveProperty(x, property, args, context) { return exports.resolve( builtin.item(x, property), args, context ); } // some property could return null, so we want to be able to distinguish from one another
     exports.resolveProperty = exports.retrieve = resolveProperty;


    function executeMethod(x, property, force)
    {
        exports.defaultBoolean(force, true) ? x[property]() : exports.resolveProperty(x, property);
    return x;
    }exports.executeMethod = exports.invoke = executeMethod;


    function resolvePropertyPrivate ( x, property, args, context ) 
    { 
    return exports.defaultToValue(
                exports.resolveProperty(x, '_'+property, args, context),
                exports.resolveProperty(x,     property, args, context)  ); 
    }exports.resolvePropertyPrivate = exports.resolvePrivateProperty = resolvePropertyPrivate;



// This will hopefully allow us to use builtin.Array or similar to take the length, in case it was overwritten
	function has_length     (x) { return ( exports.hasProperty_length(x) || exports.isSequence(x) || exports.isFunction(x) ); }
	 exports.has_length = has_length;

    function has_length_0   (x) { return exports.has_length(x) ? exports.is0(x.length) : null; }
     exports.has_length_0 = exports.isZeroLength = has_length_0;

    function has_length_1   (x) { return exports.has_length(x) ? exports.is1(x.length) : null; }
     exports.has_length_1 = has_length_1;

    function has_length_some(x) { return exports.has_length(x) ? (x.length > 0) : null; }
     exports.has_length_some = has_length_some;

    function has_length_many(x) { return exports.has_length(x) ? (x.length > 1) : null; }
     exports.has_length_many = has_length_many;

    function hasIndex   (x, i) { return ( exports.has_length_some(x) && exports.isInt        (i) ) ?  (  builtin.abs(i) <= (x.length -1)  ) : null; } // we use abs since for [1, 2, 3] it goes from 0-2 or 0- -3, but -3 is 0...
     exports.hasIndex = hasIndex;

    function hasPosition(x, i) { return ( exports.has_length_some(x) && exports.isIntPositive(i) ) ?                 i  <=   x.length         : null; }
     exports.hasPosition = hasPosition;

    function hasItem    ( x, i ) { return ( exports.isSequence(x) && exports.isInt(i) )  ?  exports.hasIndex(x, i) : builtin.hasProperty(x, i); }
     exports.hasItem = hasItem;

    function hasItems(x) { return exports.has_length(x) ? exports.has_length_some(x) : builtin.hasProperties(x); }
     exports.hasItems = hasItems;


// ***** GET-ters *****
    function valueByProperty(obj, property, defaultValue) { return builtin.hasProperty( obj, property ) ? obj[property] : exports.defaultParam(defaultValue); }
     exports.valueByProperty = exports.getattr = valueByProperty;

    function valueByKey     (obj, key     , defaultValue) { return exports.hasKey     ( obj, key      ) ? obj[key]      : exports.defaultParam(defaultValue); }
     exports.valueByKey = valueByKey;

    function valueByIndex   (x  , index   , defaultValue) { return exports.hasIndex   ( x  , index    ) ?   x[index]    : exports.defaultParam(defaultValue); }
     exports.valueByIndex = valueByIndex;

    function valueByItem    (x  , item    , defaultValue) { return ( exports.isList(x) && exports.isInt(item) ) ? exports.valueByIndex(x, item, defaultValue) : exports.valueByProperty(x, item, defaultValue); }
     exports.valueByItem = valueByItem;


// ***** advanced comparisons *****
    function isBetween(value, min, max, precision) 
    {
        var min = exports.defaultNumber(min, value);
        var max = exports.defaultNumber(max, value);
    return ( exports.isNumber(min, precision) && exports.isNumber(value, precision) && exports.isNumber(max, precision) ) ? (  (min <= value)  &&  (value <= max)  ) : null; 
    }exports.isBetween = isBetween;

    function isInRange(min, value, max, precision) { return exports.isBetween(value, min, max, precision); }
     exports.isInRange = isInRange;

    function isNumberPortTCP   (x) { return exports.isPositiveInt(x) ? exports.isInRange(   1, x, 65535) : null; }
     exports.isNumberPortTCP = exports.isPortNumber = isNumberPortTCP;

    function isNumberPortSocket(x) { return exports.isPositiveInt(x) ? exports.isInRange(1024, x, 65535) : null; }
     exports.isNumberPortSocket = exports.isSocketNumber = isNumberPortSocket;

    function isNumberDoY(x, limit) { return exports.isInRange( 1, x, compare.defaultNumber(limit, 366) ); }
     exports.isNumberDoY = exports.isNumberDayOfYear = isNumberDoY;

    function isNumberDoW(x) { return exports.isInRange(1, x, 7); }
     exports.isNumberDoW = exports.isNumberDayOfWeek = isNumberDoW;

    function isNumberDoM(x, limit) { return exports.isInRange( 1, x, compare.defaultNumber(limit, 31) ); }
     exports.isNumberDoM = exports.isNumberDayOfMonth = isNumberDoM;

    function isNumberMonth(x) { return exports.isInRange(1, x, 12); }
     exports.isNumberMonth = exports.isNumberMonth = isNumberMonth;

    function isNumberBase( x, base ) { return exports.isInRange( 0, x, compare.defaultNumber(base, 10) -1 ); }
     exports.isNumberBase = exports.isBase = isNumberBase;

    function isNumberBase12(x) { return exports.isNumberBase(x, 12); }
     exports.isNumberBase12 = exports.isNumberHour12 = exports.isBase12 = isNumberBase12;

    function isNumberBase24(x) { return exports.isNumberBase(x, 24); }
     exports.isNumberBase24 = exports.isNumberHour24 = exports.isBase24 = isNumberBase24;

    function isNumberBase60(x) { return exports.isNumberBase(x, 60); }
     exports.isNumberBase60 = exports.isNumberMinute = exports.isNumberSecond = exports.isBase60 = isNumberBase60;

    function isNumberBase1000(x) { return exports.isNumberBase(x, 1000); }
     exports.isNumberBase1000 = exports.isNumberMillisecond = exports.isBase1000 = isNumberBase1000;


    function isStringSome(x) { return exports.isString(x) ? exports.has_length_some(x) : null; }
     exports.isStringSome = exports.isSomeString = isStringSome;

    function isStringChar(x) { return exports.isString(x) ? exports.has_length_1   (x) : null; }
     exports.isStringChar = exports.isChar = isStringChar;

    function isIndexInList(i, x) { return exports.hasIndex(x, i); }
     exports.isIndexInList = exports.isIndexValid = isIndexInList;

    function isIntInLength(i, x) { return exports.hasPosition(x, i); }
     exports.isIntInLength = isIntInLength;

    function isNothingOrFn(x, fn, precision) 
    {
        var fn = exports.defaultFunction(fn, cast.itsNull);
    return ( exports.isNothing(x, precision) || fn(x, precision) ); // TODO simplify to defaultFunction or isNothing ?
    }exports.isNothingOrFn = isNothingOrFn;

// TODO
    function isMultipleParam(x, fn, precision)
    {
        var fn = exports.defaultFunction(fn, cast.itsNull);
    return ( exports.isNothingOrFn(x, exports.isList, precision) || fn(x, precision) );
    }exports.isMultipleParam = isMultipleParam;


    function isDictionary    (x) { return exports.isObject(x) ? exports.hasMethod_hasOwnProperty(x) : null; } // new String() could have own property, but not be A -object-
     exports.isDictionary = exports.isObjectDictionary = isDictionary;

    function isDictionaryOnly(x) { return exports.isDictionary(x) ? !exports.hasTraits(x) : null; }
     exports.isDictionaryOnly = exports.isEnumerator = isDictionaryOnly;

	function isAttributes    (x) { return ( exports.isNothing(x) || exports.isEnumerator(x) ); }
	 exports.isAttributes = exports.isNamedArguments = exports.is_kwargs = isAttributes;

    function isArg_s(x) { return ( exports.isList(x) || exports.isNothing(x) ); }
     exports.isArg_s = isArg_s;

    function isArgumentAttributes (x) { return (  exports.has_length_1(x)  &&  exports.isEnumerator( x[0] )  ); }
     exports.isArgumentAttributes = isArgumentAttributes;

    function isObjectOther   (x) { return exports.isObject(x) ? !exports.isDictionary(x) : null; } // Like Ti.UI things... hate those things! the way they "mew"...
     exports.isObjectOther = exports.isProtoObject = exports.isProxyObject = exports.isTiObject = isObjectOther;

// TODO move to Ti module
    function isSubcontext() { return exports.isTiObject(SDK.Current.win); }
     exports.isSubcontext = isSubcontext;


// TODO a little bit more intelligent?
    function isFileParam     (x) { return ( exports.isString(x) || exports.isList(x) || exports.isTiObject(x) ); }
     exports.isFileParam = isFileParam;

    function isCollection    (x) { return ( exports.isList(x) || exports.isDictionary(x) ); } // in honor of underscore, and .net "Collections"
     exports.isCollection = isCollection;

    function isRecursivable  (x) { return ( exports.isList(x) || exports.isObject(x) ); } // TODO !isString // TODO isDictionary instead?
     exports.isRecursivable = isRecursivable;


    function isDateValid     (x)  { return exports.isDate(x) ? ( builtin.getTime(x) >= 0 ) : null; }
     exports.isDateValid = isDateValid;

    function isSelfReference(obj, property) { return builtin.hasProperty(obj, property) ? obj === obj[property] : null; }
     exports.isSelfReference = isSelfReference;

    function canRecursive   (obj, property) { return builtin.hasProperty(obj, property) ? (  !exports.isSelfReference(obj, property)  &&  exports.isRecursivable( obj[property] )  ) : null; }
     exports.canRecursive = canRecursive;


    function canBeNumber(x) 
    {
        if ( exports.isNumber(x) )
        { 
    return true;
        }

        try
        {
    return exports.isNumber( cast.number(x) );
        }
        catch(err){}
    return false;
    }exports.canBeNumber = canBeNumber;


    function isIterable(x) 
    {
    return ( exports.isObject      (x)
          || exports.isInstance    (x)// again, any kind of object
          || builtin.hasEnumerables(x)// any kind of object
          || exports.isSequence    (x)
          || exports.isCollection  (x) ); // list or dict 
    }exports.isIterable = isIterable;


    function isTypeJSONable(x) 
    { 
    /* allowed for value, according to http://www.json.org/
        string
        number
        object
        array
        true, false
        null*/
    return ( 
            exports.isString(x)
         || exports.isNumber(x)
         || exports.isDateValid(x)
         || exports.isDictionary(x) // TODO isDictionaryOnly ?
         || exports.isArray(x)
         || exports.isBoolean(x)
         || exports.isNull(x) );
    } exports.isTypeJSONable = isTypeJSONable;


    function isJSONstring(x)
    {// very handy for all the sqless and session vars
        if ( !exports.isString(x) )
        {
    return null;
        }
        try
        { // we don't use eval, someone could hack the webserver and affect MILLIONS OF USERS!!!!!
            var oJSON = builtin.JSON.parse(x);
    return exports.isTypeJSONable(oJSON);
        }
        catch(err) {}
    return false;
    }exports.isJSONstring = isJSONstring;


    function isJSONable(x)
    {// very handy for all the sqless and session vars
        if ( !exports.isTypeJSONable(x) )
        { // If the type doesn't match, why even bother?
    return null;
        }
        try
        { // we don't use eval, someone could hack the webserver and affect MILLIONS OF USERS!!!!!
    return exports.isJSONstring( builtin.JSON.stringify(x) );
        }
        catch(err) {}
    // implicit else
    return false;
    }exports.isJSONable = exports.isJSON = isJSONable;


    function isEmpty( x, precision ) 
    {
    if ( exports.has_length  (x) ) return  exports.has_length_0(x);
    if ( exports.isDictionary(x) ) return !builtin.hasKeys(x);
    if ( exports.isInstance  (x) ) return !builtin.hasProperties(x); // TODO
                                   return  exports.isNothing( x, precision );
	}exports.isEmpty = isEmpty;


    function isSomething(x, precision) { return !exports.isEmpty(x, precision) ? !exports.is0(x, precision) : null; }
     exports.isSomething = isSomething;

    function isFalseString(x)
    {
        switch ( builtin.String(x).toLowerCase() )
        {
            case 'n':
            case 'no':
            case '0':
            case 'false':
            case 'f':
//          case 'ie':
//          case 'nel':
//          case 'niet':
    return true;
        }
    return false;
    }exports.isFalseString = isFalseString; 


// ***** boolean-rama *****

    function bool3states(x, fn_false, fn_null)
    { // because of the above, that's why we need fancyness
        var fn_false = exports.defaultFunction(fn_false, exports.isFalseString);
        var fn_null  = exports.defaultFunction(fn_null , exports.isEmpty);
    if ( exports.isBoolean(x) ) return x;
    if ( fn_false(x) )          return false;
    if ( fn_null(x) )           return null;
                                return true; // everything else would be true
    }exports.bool3states = bool3states;

    function bool2states(x, state, fn_false, fn_null) { return exports.defaultBoolean( exports.bool3states(x, fn_false, fn_null), exports.defaultBoolean(state, false) ); }
     exports.bool2states = bool2states;
    
    function boolOrCast (x, fn_false, fn_null) { return exports.defaultBoolean( exports.bool3states(x, fn_false, fn_null), cast.bool(x) ); }
     exports.boolOrCast = boolOrCast;

    function boolOrTrue (x, fn_false, fn_null) { return exports.bool2states(x, true , fn_false, fn_null); }
     exports.boolOrTrue = boolOrTrue;

    function boolOrFalse(x, fn_false, fn_null) { return exports.bool2states(x, false, fn_false, fn_null); }
     exports.boolOrFalse = boolOrFalse;



// Complex resolves
    function resolvePropertyOrObject(x, property, args, context)
    { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FGlobal_Objects%2FObject%2FvalueOf
        if( exports.isObjectOther(x) )
        {// ProtoObjects complain when trying to look into something they might not have
    return x
        }
    // if an object has no primitive value, valueOf returns the object itself
    return exports.defaultToValue( exports.resolveProperty(x, property, args, context),  x );
    }exports.resolvePropertyOrObject = resolvePropertyOrObject;


    function value_set(x, v)
    {
        builtin.defineProperty(x, exports.Property.value_, { // value or value of?
            enumerable: false,
            value     : v });
    return x;
    }exports.value_set = exports.setValue = value_set;


    function value_get(x) 
    { 
        if ( exports.isPrimitive(x) )
        {
    return x;
        }
    return exports.defaultToValue(
                exports.resolveProperty        (x, exports.Property.value_  ), 
                exports.resolvePropertyOrObject(x, exports.Property.valueOf_) );
    }exports.value_get = exports.value = exports.getValue = value_get;


    function resolveBoolean(x, fn) { return exports.defaultFunction(fn, exports.boolOrCast)( exports.resolve(x) ); }
     exports.resolveBoolean = resolveBoolean;

    function resolvePropertyBoolean(x, property, fn) { return exports.resolveBoolean(  exports.resolveProperty(x, property),  fn  ); }
     exports.resolvePropertyBoolean = exports.resolveBooleanProperty = resolvePropertyBoolean;
