Ti.include('/src/code/towel/test/include.js');

    compare = require(TT.Module.Compare);


    function Test_compare_isClass()
    {
        function test_type_Object () { assertIdentical( compare.type(Object) , 'function' ); }
        function test_type_Number () { assertIdentical( compare.type(Number) , 'function' ); }
        function test_type_Boolean() { assertIdentical( compare.type(Boolean), 'function' ); }
        function test_type_Array  () { assertIdentical( compare.type(Array)  , 'function' ); }
        function test_type_String () { assertIdentical( compare.type(String) , 'function' ); }
        function test_type_RegExp () { assertIdentical( compare.type(RegExp) , 'function' ); }
        function test_type_Date   () { assertIdentical( compare.type(Date)   , 'function' ); }

        function test_typeof_Object () { assertIdentical( typeof(Object) , 'function' ); }
        function test_typeof_Number () { assertIdentical( typeof(Number) , 'function' ); }
        function test_typeof_Boolean() { assertIdentical( typeof(Boolean), 'function' ); }
        function test_typeof_Array  () { assertIdentical( typeof(Array)  , 'function' ); }
        function test_typeof_String () { assertIdentical( typeof(String) , 'function' ); }
        function test_typeof_RegExp () { assertIdentical( typeof(RegExp) , 'function' ); }
        function test_typeof_Date   () { assertIdentical( typeof(Date)   , 'function' ); }

        function test_isClass_Object () { assertTrue( compare.isClass(Object)  ); }
        function test_isClass_Number () { assertTrue( compare.isClass(Number)  ); }
        function test_isClass_Boolean() { assertTrue( compare.isClass(Boolean) ); }
        function test_isClass_Array  () { assertTrue( compare.isClass(Array)   ); }
        function test_isClass_String () { assertTrue( compare.isClass(String)  ); }
        function test_isClass_RegExp () { assertTrue( compare.isClass(RegExp)  ); }
        function test_isClass_Date   () { assertTrue( compare.isClass(Date)    ); }
    }Test.UT.runAndCache(Test_compare_isClass, 'compare.isClass');


    function Test_compare_typeNames()
    {
        function setUp()
        {
            obj     = {};
            Number_ = new Number(3);
            String_ = new String('wa');
        };

        function test_Object_prototype      () { assertIdentical( '[object Object]', String(obj) ); }
        function test_Object_typeof         () { assertIdentical( 'object'         , typeof(obj) ); }
        function test_Object_type           () { assertIdentical( 'object'         , compare.type(obj) ); }
        function test_Object_typeName       () { assertIdentical( 'Object'         , compare.typeName(obj) ); }
        function test_Object_typeName_native() { assertIdentical( 'object'         , compare.typeName_native(obj)); }
        function test_Object_typeNames() { assertEqual( compare.typeNames(obj), ['object', 'object', 'Object'] ); }

        function test_null_prototype      () { assertIdentical( 'null'        , String(null) ); }
        function test_null_typeof         () { assertIdentical( 'object'      , typeof(null) ); }
        function test_null_type           () { assertIdentical( 'null'        , compare.type(null) ); }

        function test_null_typeName       () { assertIdentical( 'Null', compare.typeName(null) ); }
        function test_null_typeName_native() { assertIdentical( 'null', compare.typeName_native(null) ); }
        function test_null_typeNames() { assertEqual( compare.typeNames(null), ['null', 'object', 'Null'] ); }
/* TODO iOS?
        function test_null_typeName       () { assertIdentical( 'GlobalObject', compare.typeName(null) ); }
        function test_null_typeName_native() { assertIdentical( 'globalobject', compare.typeName_native(null) ); }
        function test_null_typeNames() { assertEqual( compare.typeNames(null), ['null', 'object', 'GlobalObject'] ); }
 */
        function test_undefined_prototype      () { assertIdentical( 'undefined'   , String(undefined) ); }
        function test_undefined_typeof         () { assertIdentical( 'undefined'   , typeof(undefined) ); }
        function test_undefined_type           () { assertIdentical( 'undefined'   , compare.type(undefined) ); }

        function test_undefined_typeName       () { assertIdentical( 'Undefined', compare.typeName(undefined) ); }
        function test_undefined_typeName_native() { assertIdentical( 'undefined', compare.typeName_native(undefined) ); }
        function test_undefined_typeNames() { assertEqual( compare.typeNames(undefined), ['undefined', 'undefined', 'Undefined'] ); }
/* TODO iOS?
        function test_undefined_typeName       () { assertIdentical( 'GlobalObject', compare.typeName(undefined) ); }
        function test_undefined_typeName_native() { assertIdentical( 'globalobject', compare.typeName_native(undefined) ); }
        function test_undefined_typeNames() { assertEqual( compare.typeNames(undefined), ['undefined', 'undefined', 'GlobalObject'] ); }
 */
        function test_int_typeof         () { assertIdentical( 'number', typeof(3) ); }
        function test_int_type           () { assertIdentical( 'number', compare.type(3) ); }
        function test_int_typeName       () { assertIdentical( 'Number', compare.typeName(3) ); }
        function test_int_typeName_native() { assertIdentical( 'number', compare.typeName_native(3) ); }
        function test_int_typeNames() { assertEqual( compare.typeNames(3), ['number', 'number', 'Number'] ); }

        function test_Number_typeof         () { assertIdentical( 'object', typeof(Number_) ); }
        function test_Number_type           () { assertIdentical( 'number', compare.type(Number_) ); }
        function test_Number_typeName       () { assertIdentical( 'Number', compare.typeName(Number_) ); }
        function test_Number_typeName_native() { assertIdentical( 'number', compare.typeName_native(Number_) ); }
        function test_Number_typeNames() { assertEqual( compare.typeNames(Number_), ['number', 'object', 'Number'] ); }

        function test_string_typeof         () { assertIdentical( 'string', typeof('wa') ); }
        function test_string_type           () { assertIdentical( 'string', compare.type('wa') ); }
        function test_string_typeName       () { assertIdentical( 'String', compare.typeName('wa') ); }
        function test_string_typeName_native() { assertIdentical( 'string', compare.typeName_native('wa') ); }
        function test_string_typeNames() { assertEqual( compare.typeNames('wa'), ['string', 'string', 'String'] ); }
        
        function test_String_typeof         () { assertIdentical( 'object', typeof(String_) ); }
        function test_String_type           () { assertIdentical( 'string', compare.type(String_) ); }
        function test_String_typeName       () { assertIdentical( 'String', compare.typeName(String_) ); }
        function test_String_typeName_native() { assertIdentical( 'string', compare.typeName_native(String_) ); }
        function test_String_typeNames() { assertEqual( compare.typeNames(String_), ['string', 'object', 'String'] ); }
    }Test.UT.runAndCache(Test_compare_typeNames, 'compare.typeNames');


    function Test_compare_isValue()
    {
        var array      = [1, 2, 3];
        var dictionary = {a:1, b:2, c:3};
        var date       = new Date('2012-01-01');

        function test_native_true (){ assertTrue (true); }
        function test_native_false(){ assertFalse(false); }
        function test_native_cast_equivalent(){ assertTrue (3  == '3'); }
        function test_native_cast_identical (){ assertFalse(3 === '3'); }

        function test_equivalent_false  (){ assertTrue ( compare.isValue(3, '3', false) ); }
        function test_equivalent_true   (){ assertFalse( compare.isValue(3, '3', true ) ); }
        function test_equivalent_default(){ assertFalse( compare.isValue(3, '3') ); }

        function test_strings_different() { assertFalse( String('wa') === new String('wa') ); }
        function test_string_array() { assertIdentical( 'wa'[0], 'w' ); }

        function test_int_true (){ assertTrue ( compare.isValue(3, 3, true ) ); }
        function test_int_false(){ assertTrue ( compare.isValue(3, 3, false) ); }
        function test_float1   (){ assertTrue ( compare.isValue(3, 3.0) ); }
        function test_float2   (){ assertTrue ( compare.isValue(3.0, 3.00) ); }

        function test_string_true  (){ assertTrue ( compare.isValue('wa', 'wa') ); }
        function test_string_false (){ assertFalse( compare.isValue('wa', 'Wa', false) ); }
        function test_boolean_true (){ assertTrue ( compare.isValue(true, true) ); }
        function test_boolean_false(){ assertFalse( compare.isValue(true, false, false) ); }

        function test_isIdentical_identical  (){ assertTrue ( compare.isIdentical(3, 3) ); }
        function test_isIdentical_false      (){ assertFalse( compare.isIdentical(3, 3.1) ); }
        function test_isIdentical_equivalent (){ assertFalse( compare.isIdentical(3, '3') ); }
        function test_isEquivalent_identical (){ assertTrue ( compare.isEquivalent(3, 3) ); }
        function test_isEquivalent_false     (){ assertFalse( compare.isEquivalent(3, 3.1) ); }
        function test_isEquivalent_equivalent(){ assertTrue ( compare.isEquivalent(3, '3') ); }

        function test_isIdentical_regression(){ assertFalse( compare.isIdentical(null, 
            [null, null, undefined, 
             function (){ return arguments; },
             'wa', 123, 123.45, true, false, (function () { return arguments; })(), [1, 2, 3] ] ) ); }

        function test_same_array_true      (){ assertTrue ( compare.isValue(array, array, true) ); }
        function test_same_array_false     (){ assertTrue ( compare.isValue(array, array, false) ); }
        function test_same_dictionary_true (){ assertTrue ( compare.isValue(dictionary, dictionary, true) ); }
        function test_same_dictionary_false(){ assertTrue ( compare.isValue(dictionary, dictionary, false) ); }
        function test_same_date_true       (){ assertTrue ( compare.isValue(date, date, true) ); }
        function test_same_date_false      (){ assertTrue ( compare.isValue(date, date, false) ); }

        function test_jsUnity_array     (){ assertEqual( [1, 2, 3], [1, 2, 3] ); }
        function test_jsUnity_dictionary(){ assertEqual( {a:1, b:2, c:3}, {a:1, b:2, c:3} ); }
        function test_jsUnity_date      (){ assertEqual( new Date('2012-01-02'), new Date('2012-01-02') ); }

    // This can't be helped with this level of abstraction, but will get solved in higher levels
        function test_false_string_case     (){ assertFalse( compare.isValue( 'wa', 'Wa', false ) ); }
        function test_false_string_space    (){ assertFalse( compare.isValue( 'wa', 'wa ', false ) ); }
        function test_false_array_true      (){ assertFalse( compare.isValue( [1, 2, 3], [1, 2, 3], true ) ); }
        function test_false_array_false     (){ assertFalse( compare.isValue( [1, 2, 3], [1, 2, 3], false ) ); }
        function test_false_dictionary_true (){ assertFalse( compare.isValue( {a:1, b:2, c:3}, {a:1, b:2, c:3}, true ) ); }
        function test_false_dictionary_false(){ assertFalse( compare.isValue( {a:1, b:2, c:3}, {a:1, b:2, c:3}, false ) ); }
        function test_false_date_true       (){ assertFalse( compare.isValue( new Date('2012-01-02'), new Date('2012-01-02'), true ) ); }
        function test_false_date_false      (){ assertFalse( compare.isValue( new Date('2012-01-02'), new Date('2012-01-02'), false ) ); }
    }Test.UT.runAndCache(Test_compare_isValue, 'compare.isValue');


    function Test_compare_nothing()
    {
        function test_null_false        () { assertFalse( null      == false); }
        function test_null_true         () { assertFalse( null      == true); }
        function test_null_undefined    () { assertTrue ( null      == undefined); }
        function test_not_null          () { assertTrue (!null      == true); }
        function test_not_undefined     () { assertTrue (!undefined == true); }
        function test_not_null_undefined() { assertTrue (!null      == !undefined); }

        function test_native_typeof_null     (){ assertEqual( 'object'   , typeof(null) ); }
        function test_native_typeof_undefined(){ assertEqual( 'undefined', typeof(undefined) ); }
        function test_native_typeof_NaN      (){ assertEqual( 'number'   , typeof(NaN) ); }

    // WTF?! welcome to JavaScript!
        function test_native_NaN_equivalent  (){ assertFalse( NaN ==  NaN ); }
        function test_native_NaN_identical   (){ assertFalse( NaN === NaN ); }
        function test_native_NaN_PoC         (){ assertTrue ( NaN !=  NaN ); } // just to be sure
        function test_native_NaN_PoC2        (){ assertTrue ( NaN !== NaN ); } // just to be sure
        function test_native_isNaN_string    (){ assertTrue ( isNaN('wa') ); }
        function test_native_isNaN_array     (){ assertTrue ( isNaN( [1, 2, 3] ) ); }
        function test_native_isNaN_dictionary(){ assertTrue ( isNaN( {a:1, b:2, c:3} ) ); }
        function test_native_isNaN_number    (){ assertFalse( isNaN(3) ); }
        function test_native_isNaN_number_0  (){ assertFalse( isNaN(0) ); }

        function test_isNaN_NaN               (){ assertTrue ( compare.isNaN(NaN) ); }
        function test_isNaN_null              (){ assertFalse( compare.isNaN(null) ); }
        function test_isNaN_undefined         (){ assertFalse( compare.isNaN(undefined) ); }
        function test_isNaN_number            (){ assertFalse( compare.isNaN(3) ); }
        function test_isNaN_number_0          (){ assertFalse( compare.isNaN(0) ); }
        function test_isNaN_number_negative   (){ assertFalse( compare.isNaN(-12345678) ); }
        function test_isNaN_string            (){ assertFalse( compare.isNaN('wa') ); }
        function test_isNaN_string_empty      (){ assertFalse( compare.isNaN('') ); }
        function test_isNaN_string_array      (){ assertFalse( compare.isNaN( [1, 2, 3] ) ); }
        function test_isNaN_string_array_empty(){ assertFalse( compare.isNaN([]) ); }

        function test_native_type_null     (){ assertEqual( 'null'     , compare.type(null) ); }
        function test_native_type_undefined(){ assertEqual( 'undefined', compare.type(undefined) ); }
        function test_native_type_NaN      (){ assertEqual( 'NaN'      , compare.type(NaN) ); }

        function test_isNull_null_true      (){ assertTrue ( compare.isNull(null, true) ); }
        function test_isNull_null_false     (){ assertTrue ( compare.isNull(null, false) ); }
        function test_isNull_undefined_true (){ assertFalse( compare.isNull(undefined, true) ); }
        function test_isNull_undefined_false(){ assertTrue ( compare.isNull(undefined, false) ); }

        function test_isUndefined_undefined_exact  (){ assertTrue ( compare.isUndefined(undefined, true) ); }
        function test_isUndefined_undefined_inexact(){ assertTrue ( compare.isUndefined(undefined, false) ); }
        function test_isUndefined_null_exact       (){ assertFalse( compare.isUndefined(null, true) ); }
        function test_isUndefined_null_inexact     (){ assertTrue ( compare.isUndefined(null, false) ); }

        function test_isNothing_exact_null       (){ assertTrue ( compare.isNothing(null     , true) ); }
        function test_isNothing_exact_undefined  (){ assertTrue ( compare.isNothing(undefined, true) ); }
        function test_isNothing_inexact_null     (){ assertTrue ( compare.isNothing(null     , false) ); }
        function test_isNothing_inexact_undefined(){ assertTrue ( compare.isNothing(undefined, false) ); }
        function test_isNothing_string           (){ assertFalse( compare.isNothing('wa') ); }

        function test_isNotNothing_regression_1   () { assertTrue( compare.isNotNothing(1) ); }
        function test_isNotNothing_regression_2   () { assertTrue( compare.isNotNothing(2) ); }
        function test_isNotNothing_regression_list() { assertTrue( compare.isNotNothing( [1, 2] ) ); }
    }Test.UT.runAndCache(Test_compare_nothing, 'compare nothing');


    function Test_compare_type_string()
    {
        function test_typeof_string   (){ assertEqual( 'string', typeof('wa') ); }
        function test_typeof_String   (){ assertEqual( 'string', typeof( String('wa') ) ); }
        function test_typeof_newString(){ assertEqual( 'object', typeof( new String('wa') ) ); }
        function test_typeof_array    (){ assertEqual( 'object', typeof( ['w', 'a'] ) ); }

        function test_Type_Str      (){ assertEqual( 'string', compare.Type.Str  ); }
        function test_type_string   (){ assertEqual( 'string', compare.type('wa')  ); }
        function test_type_String   (){ assertEqual( 'string', compare.type( String('wa') ) ); }
        function test_type_newString(){ assertEqual( 'string', compare.type( new String('wa') ) ); }
        function test_type_newString(){ assertEqual( 'array' , compare.type( ['w', 'a'] ) ); }

        function test_isString_string   (){ assertTrue ( compare.isString('wa') ); }
        function test_isString_String   (){ assertTrue ( compare.isString( String('wa') ) ); }
        function test_isString_newString(){ assertTrue ( compare.isString( new String('wa') ) ); }
        function test_isString_array    (){ assertFalse( compare.isString( ['w', 'a'] ) ); }
    }Test.UT.runAndCache( Test_compare_type_string, 'compare strings' );


    function Test_compare_type_number()
    {
        function test_typeof_int_string    (){ assertEqual( 'string', typeof('3') ); }
        function test_typeof_int_number    (){ assertEqual( 'number', typeof(3) ); }
        function test_typeof_int_Number    (){ assertEqual( 'number', typeof( Number(3) ) ); }
        function test_typeof_int_newNumber (){ assertEqual( 'object', typeof( new Number(3) ) ); }
        function test_typeof_int_parseInt  (){ assertEqual( 'number', typeof( parseInt(3) ) ); }
        function test_typeof_int_parseFloat(){ assertEqual( 'number', typeof( parseFloat(3) ) ); }

        function test_typeof_float_string    (){ assertEqual( 'string', typeof('3.2') ); }
        function test_typeof_float_number    (){ assertEqual( 'number', typeof(3.2) ); }
        function test_typeof_float_Number    (){ assertEqual( 'number', typeof( Number(3.2) ) ); }
        function test_typeof_float_newNumber (){ assertEqual( 'object', typeof( new Number(3.2) ) ); }
        function test_typeof_float_parseInt  (){ assertEqual( 'number', typeof( parseInt(3.2) ) ); }
        function test_typeof_float_parseFloat(){ assertEqual( 'number', typeof( parseFloat(3.2) ) ); }

        function test_type_int_string    (){ assertEqual( 'string', compare.type('3') ); }
        function test_Type_Number        (){ assertEqual( 'number', compare.Type.Numeric ); }
        function test_type_int_number    (){ assertEqual( 'number', compare.type(3) ); }
        function test_type_int_Number    (){ assertEqual( 'number', compare.type( Number(3) ) ); }
        function test_type_int_newNumber (){ assertEqual( 'number', compare.type( new Number(3) ) ); }
        function test_type_int_parseInt  (){ assertEqual( 'number', compare.type( parseInt(3) ) ); }
        function test_type_int_parseFloat(){ assertEqual( 'number', compare.type( parseFloat(3) ) ); }

        function test_type_float_string    (){ assertEqual( 'string', compare.type('3.2') ); }
        function test_type_float_number    (){ assertEqual( 'number', compare.type(3.2) ); }
        function test_type_float_Number    (){ assertEqual( 'number', compare.type( Number(3.2) ) ); }
        function test_type_float_newNumber (){ assertEqual( 'number', compare.type( new Number(3.2) ) ); }
        function test_type_float_parseInt  (){ assertEqual( 'number', compare.type( parseInt(3.2) ) ); }
        function test_type_float_parseFloat(){ assertEqual( 'number', compare.type( parseFloat(3.2) ) ); }

        function test_isNumeric_int_string    (){ assertFalse( compare.isNumeric('3') ); }
        function test_isNumeric_int_number    (){ assertTrue ( compare.isNumeric(3) ); }
        function test_isNumeric_int_Number    (){ assertTrue ( compare.isNumeric( Number(3) ) ); }
        function test_isNumeric_int_newNumber (){ assertTrue ( compare.isNumeric( new Number(3) ) ); }
        function test_isNumeric_int_parseInt  (){ assertTrue ( compare.isNumeric( parseInt(3) ) ); }
        function test_isNumeric_int_parseFloat(){ assertTrue ( compare.isNumeric( parseFloat(3) ) ); }

        function test_isNumeric_float_string    (){ assertFalse( compare.isNumeric('3.2') ); }
        function test_isNumeric_float_number    (){ assertTrue ( compare.isNumeric(3.2)  ); }
        function test_isNumeric_float_Number    (){ assertTrue ( compare.isNumeric( Number(3.2) ) ); }
        function test_isNumeric_float_newNumber (){ assertTrue ( compare.isNumeric( new Number(3.2) ) ); }
        function test_isNumeric_float_parseInt  (){ assertTrue ( compare.isNumeric( parseInt(3.2) ) ); }
        function test_isNumeric_float_parseFloat(){ assertTrue ( compare.isNumeric( parseFloat(3.2) ) ); }

        function test_isInt_int_string    (){ assertFalse( compare.isInt('3') ); }
        function test_isInt_int_number    (){ assertTrue ( compare.isInt(3) ); }
        function test_isInt_int_Number    (){ assertTrue ( compare.isInt( Number(3) ) ); }
        function test_isInt_int_newNumber (){ assertTrue ( compare.isInt( new Number(3) ) ); }
        function test_isInt_int_parseInt  (){ assertTrue ( compare.isInt( parseInt(3) ) ); }
        function test_isInt_int_parseFloat(){ assertTrue ( compare.isInt( parseFloat(3) ) ); }

        function test_isInt_float_string    (){ assertFalse( compare.isInt('3.2') ); }
        function test_isInt_float_number    (){ assertFalse( compare.isInt(3.2) ); }
        function test_isInt_float_Number    (){ assertFalse( compare.isInt( Number(3.2) ) ); }
        function test_isInt_float_newNumber (){ assertFalse( compare.isInt( new Number(3.2) ) ); }
        function test_isInt_float_parseInt  (){ assertTrue ( compare.isInt( parseInt(3.2) ) ); }
        function test_isInt_float_parseFloat(){ assertFalse( compare.isInt( parseFloat(3.2) ) ); }

        function test_isFloat_int_string    (){ assertFalse( compare.isFloat('3') ); }
        function test_isFloat_int_number    (){ assertFalse( compare.isFloat(3) ); }
        function test_isFloat_int_Number    (){ assertFalse( compare.isFloat( Number(3) ) ); }
        function test_isFloat_int_newNumber (){ assertFalse( compare.isFloat( new Number(3) ) ); }
        function test_isFloat_int_parseInt  (){ assertFalse( compare.isFloat( parseInt(3) ) ); }
        function test_isFloat_int_parseFloat(){ assertFalse( compare.isFloat( parseFloat(3) ) ); }

        function test_isFloat_float_string    (){ assertFalse( compare.isFloat('3.2') ); }
        function test_isFloat_float_number    (){ assertTrue ( compare.isFloat(3.2) ); }
        function test_isFloat_float_Number    (){ assertTrue ( compare.isFloat( Number(3.2) ) ); }
        function test_isFloat_float_newNumber (){ assertTrue ( compare.isFloat( new Number(3.2) ) ); }
        function test_isFloat_float_parseInt  (){ assertFalse( compare.isFloat( parseInt(3.2) ) ); }
        function test_isFloat_float_parseFloat(){ assertTrue ( compare.isFloat( parseFloat(3.2) ) ); }

        function test_isInstanciated_number    (){ assertFalse( compare.isInstanciated(3.2) ); }
        function test_isInstanciated_Number    (){ assertFalse( compare.isInstanciated( Number(3.2) ) ); }
        function test_isInstanciated_newNumber (){ assertTrue ( compare.isInstanciated( new Number(3.2) ) ); }
    }Test.UT.runAndCache(Test_compare_type_number, 'compare numbers');


    function Test_compare_isZero()
    {// x == 0
        function test_num_exact_positive    (){ assertFalse( compare.isZero(1, true) ); }
        function test_num_exact_float       (){ assertFalse( compare.isZero(1.2, true) ); }
        function test_num_exact_negative    (){ assertFalse( compare.isZero(-1, true) ); }
        function test_num_inexact_positive  (){ assertFalse( compare.isZero(1, false) ); }
        function test_num_inexact_negative  (){ assertFalse( compare.isZero(-1, false) ); }
        function test_num_inexact_float     (){ assertFalse( compare.isZero(-1.2, false) ); }

        function test_string_exact_positive  (){ assertFalse( compare.isZero('0', true) ); }
        function test_string_exact_negative  (){ assertFalse( compare.isZero('-0', true) ); }
        function test_string_inexact_positive(){ assertTrue ( compare.isZero('0', false) ); }
        function test_string_inexact_negative(){ assertTrue ( compare.isZero('-0', false) ); }

        function test_int_positive  (){ assertTrue( compare.isZero(0, true) ); }
        function test_int_negative  (){ assertTrue( compare.isZero(-0, true) ); }

        function test_float_positive(){ assertTrue( compare.isZero(0.0, true) ); }
        function test_float_negative(){ assertTrue( compare.isZero(-0.0, true) ); }
    }Test.UT.runAndCache(Test_compare_isZero, 'compare.isZero');


    function Test_compare_date()
    {
        function test_isDate_newDate_empty    (){ assertTrue ( compare.isDate( new Date() ) ); }
        function test_isDate_newDate_string   (){ assertTrue ( compare.isDate( new Date('2012-01-01') ) ); }
        function test_isDate_newDate_number   (){ assertTrue ( compare.isDate( new Date(1) ) ); }
        function test_isDate_newDate_null     (){ assertTrue ( compare.isDate( new Date(null) ) ); }
        function test_isDate_newDate_undefined(){ assertTrue ( compare.isDate( new Date(undefined) ) ); }
        function test_isDate_newDate_invalid_1(){ assertTrue ( compare.isDate( new Date(-1) ) ); }
        function test_isDate_newDate_invalid_2(){ assertTrue ( compare.isDate( new Date('dragon/augustus/bicentenial') ) ); }
        function test_isDate_Date             (){ assertFalse( compare.isDate( Date ) ); } // this is the fn/class
        function test_isDate_string           (){ assertFalse( compare.isDate('2012-01-01') ); }

        function test_isDateValid_Date             (){ assertFalse( compare.isDateValid( Date ) ); } // this is the fn/class
        function test_isDateValid_newDate_empty    (){ assertTrue ( compare.isDateValid( new Date() ) ); }
        function test_isDateValid_newDate_string   (){ assertTrue ( compare.isDateValid( new Date('2012-01-01') ) ); }
        function test_isDateValid_newDate_number   (){ assertTrue ( compare.isDateValid( new Date(1) ) ); }
        function test_isDateValid_newDate_null     (){ assertTrue ( compare.isDateValid( new Date(null) ) ); }
        function test_isDateValid_newDate_undefined(){ assertTrue ( compare.isDateValid( new Date(undefined) ) ); }
        function test_isDateValid_newDate_invalid_1(){ assertFalse( compare.isDateValid( new Date(-1) ) ); }
        function test_isDateValid_newDate_invalid_2(){ assertFalse( compare.isDateValid( new Date('dragon/augustus/bicentenial') ) ); }
        function test_isDateValid_string           (){ assertFalse( compare.isDateValid('2012-01-01') ); }
    }Test.UT.runAndCache(Test_compare_isZero, 'compare dates');


    function Test_compare_boolean()
    {
        function test_typeof_boolean   (){ assertEqual( 'boolean', typeof(true) ); }
        function test_typeof_Boolean   (){ assertEqual( 'boolean', typeof( Boolean(true) ) ); }
        function test_typeof_newBoolean(){ assertEqual( 'object' , typeof( new Boolean(true) ) ); }

        function test_type_boolean   (){ assertEqual( 'boolean', compare.type(true) ); }
        function test_type_Boolean   (){ assertEqual( 'boolean', compare.type( Boolean(true) ) ); }
        function test_type_newBoolean(){ assertEqual( 'boolean', compare.type( new Boolean(true) ) ); }
        function test_Type_Bool      (){ assertEqual( 'boolean', compare.Type.Bool ); }

        function test_isInstanciated_boolean   (){ assertFalse( compare.isInstanciated(true) ); }
        function test_isInstanciated_Boolean   (){ assertFalse( compare.isInstanciated( Boolean(true) ) ); }
        function test_isInstanciated_newBoolean(){ assertTrue ( compare.isInstanciated( new Boolean(true) ) ); }

        function test_isBoolean_true        (){ assertTrue ( compare.isBoolean(true) ); }
        function test_isBoolean_false       (){ assertTrue ( compare.isBoolean(false) ); }
        function test_isBoolean_number      (){ assertFalse( compare.isBoolean(3) ); }
        function test_isBoolean_number_0    (){ assertFalse( compare.isBoolean(0) ); }
        function test_isBoolean_string      (){ assertFalse( compare.isBoolean('wa') ); }
        function test_isBoolean_string_empty(){ assertFalse( compare.isBoolean('') ); }
        function test_isBoolean_null        (){ assertFalse( compare.isBoolean(null) ); }
        function test_isBoolean_undefined   (){ assertFalse( compare.isBoolean(undefined) ); }

        function test_native_true_exact_boolean    (){ assertTrue (true === true); }
        function test_native_true_exact_string_true(){ assertFalse(true === 'true'); }
        function test_native_true_exact_string_t   (){ assertFalse(true === 't'); }
        function test_native_true_exact_string_yes (){ assertFalse(true === 'yes'); }
        function test_native_true_exact_string_y   (){ assertFalse(true === 'y'); }
        function test_native_true_exact_string_Y   (){ assertFalse(true === 'Y'); }
        function test_native_true_exact_number     (){ assertFalse(true === 1); }
        function test_native_true_exact_null       (){ assertFalse(true === null); }
        function test_native_true_exact_undefined  (){ assertFalse(true === undefined); }

        function test_native_true_inexact_boolean    (){ assertTrue (true == true ); }
        function test_native_true_inexact_string_true(){ assertFalse(true == 'true' ); }
        function test_native_true_inexact_string_t   (){ assertFalse(true == 't' ); }
        function test_native_true_inexact_string_yes (){ assertFalse(true == 'yes' ); }
        function test_native_true_inexact_string_y   (){ assertFalse(true == 'y' ); }
        function test_native_true_inexact_string_Y   (){ assertFalse(true == 'Y' ); }
        function test_native_true_inexact_number     (){ assertTrue (true == 1 ); }
        function test_native_true_inexact_null       (){ assertFalse(true == null ); }
        function test_native_true_inexact_undefined  (){ assertFalse(true == undefined ); }

        function test_native_false_exact_boolean     (){ assertTrue (false === false); }
        function test_native_false_exact_string_false(){ assertFalse(false === 'false'); }
        function test_native_false_exact_string_empty(){ assertFalse(false === ''); }
        function test_native_false_exact_string_f    (){ assertFalse(false === 'f'); }
        function test_native_false_exact_string_no   (){ assertFalse(false === 'no'); }
        function test_native_false_exact_string_n    (){ assertFalse(false === 'n'); }
        function test_native_false_exact_string_N    (){ assertFalse(false === 'N'); }
        function test_native_false_exact_number      (){ assertFalse(false === 0); }
        function test_native_false_exact_null        (){ assertFalse(false === null); }
        function test_native_false_exact_undefined   (){ assertFalse(false === undefined); }

        function test_native_false_exact_boolean     (){ assertTrue (false == false); }
        function test_native_false_exact_string_empty(){ assertTrue (false == ''); }
        function test_native_false_exact_number      (){ assertTrue (false == 0); }
        function test_native_false_exact_null        (){ assertFalse(false == null); }
        function test_native_false_exact_undefined   (){ assertFalse(false == undefined); }

    // any string is True
        function test_native_false_exact_string_false(){ assertFalse(false == 'false'); }
        function test_native_false_exact_string_f    (){ assertFalse(false == 'f'); }
        function test_native_false_exact_string_no   (){ assertFalse(false == 'no'); }
        function test_native_false_exact_string_n    (){ assertFalse(false == 'n'); }
        function test_native_false_exact_string_N    (){ assertFalse(false == 'N'); }


        function test_bool3states_boolean_true (){ assertTrue ( compare.bool3states(true) ); }
        function test_bool3states_boolean_false(){ assertFalse( compare.bool3states(false) ); }

        function test_bool3states_string_false_false(){ assertFalse( compare.bool3states('false') ); }
        function test_bool3states_string_false_False(){ assertFalse( compare.bool3states('False') ); }
        function test_bool3states_string_false_FALSE(){ assertFalse( compare.bool3states('FALSE') ); }
        function test_bool3states_string_false_FaLsE(){ assertFalse( compare.bool3states('FaLsE') ); }
        function test_bool3states_string_false_f    (){ assertFalse( compare.bool3states('f') ); }
        function test_bool3states_string_false_F    (){ assertFalse( compare.bool3states('F') ); }
        function test_bool3states_string_false_no   (){ assertFalse( compare.bool3states('no') ); }
        function test_bool3states_string_false_No   (){ assertFalse( compare.bool3states('No') ); }
        function test_bool3states_string_false_NO   (){ assertFalse( compare.bool3states('NO') ); }
        function test_bool3states_string_false_N    (){ assertFalse( compare.bool3states('N') ); }
        function test_bool3states_string_false_0    (){ assertFalse( compare.bool3states('0') ); }

        function test_bool3states_string_true_true    (){ assertTrue( compare.bool3states('true') ); }
        function test_bool3states_string_true_True    (){ assertTrue( compare.bool3states('True') ); }
        function test_bool3states_string_true_TRUE    (){ assertTrue( compare.bool3states('TRUE') ); }
        function test_bool3states_string_true_T       (){ assertTrue( compare.bool3states('T') ); }
        function test_bool3states_string_true_anything(){ assertTrue( compare.bool3states('wa') ); }

        function test_bool3states_number_1(){ assertTrue ( compare.bool3states(1) ); }
        function test_bool3states_number_0(){ assertFalse( compare.bool3states(0) ); }

        function test_bool3states_empty_string    (){ assertNull( compare.bool3states('') ); }
        function test_bool3states_empty_array     (){ assertNull( compare.bool3states([]) ); }
        function test_bool3states_empty_dictionary(){ assertNull( compare.bool3states({}) ); }
        function test_bool3states_empty_null      (){ assertNull( compare.bool3states(null) ); }
        function test_bool3states_empty_undefined (){ assertNull( compare.bool3states(undefined) ); }

        function test_bool2states_null_true (){ assertTrue ( compare.bool2states(null, true) ); }
        function test_bool2states_null_false(){ assertFalse( compare.bool2states(null, false) ); }

        function test_boolOrTrue (){ assertTrue ( compare.boolOrTrue (null) ); }
        function test_boolOrFalse(){ assertFalse( compare.boolOrFalse(null) ); }

        function test_defaultBoolean_true                 (){ assertTrue ( compare.defaultBoolean( true     , false ) ); }
        function test_defaultBoolean_false                (){ assertFalse( compare.defaultBoolean( false    , true ) ); }
        function test_defaultBoolean_other_string_true    (){ assertTrue ( compare.defaultBoolean( 'wa'     , true ) ); }
        function test_defaultBoolean_other_string_false   (){ assertFalse( compare.defaultBoolean( 'wa'     , false ) ); }
        function test_defaultBoolean_other_null_true      (){ assertTrue ( compare.defaultBoolean( null     , true ) ); }
        function test_defaultBoolean_other_null_false     (){ assertFalse( compare.defaultBoolean( null     , false ) ); }
        function test_defaultBoolean_other_undefined_true (){ assertTrue ( compare.defaultBoolean( undefined, true ) ); }
        function test_defaultBoolean_other_undefined_false(){ assertFalse( compare.defaultBoolean( undefined, false ) ); }
        function test_defaultBoolean_other_list_true      (){ assertTrue ( compare.defaultBoolean( [1, 2, 3], true ) ); }
        function test_defaultBoolean_other_list_false     (){ assertFalse( compare.defaultBoolean( [1, 2, 3], false ) ); }
    }Test.UT.runAndCache(Test_compare_boolean, 'compare bools');


    function Test_compare_isTrue()
    {
        function test_true_exact_boolean  (){ assertTrue ( compare.isTrue(true, true) ); }
        function test_true_exact_string   (){ assertFalse( compare.isTrue('true', true) ); }
        function test_true_exact_number   (){ assertFalse( compare.isTrue(1, true) ); }
        function test_true_exact_null     (){ assertFalse( compare.isTrue(null, true) ); }
        function test_true_exact_undefined(){ assertFalse( compare.isTrue(undefined, true) ); }

        function test_true_inexact_boolean(){ assertTrue ( compare.isTrue(true, false) ); }
        function test_true_inexact_string (){ assertFalse( compare.isTrue('true', false) ); }
        function test_true_inexact_number (){ assertTrue ( compare.isTrue(1, false) ); }
        function test_true_exact_null     (){ assertFalse( compare.isTrue(null, false) ); }
        function test_true_exact_undefined(){ assertFalse( compare.isTrue(undefined, false) ); }

        function test_false_exact_boolean     (){ assertFalse( compare.isTrue(false, true) ); }
        function test_false_exact_string_false(){ assertFalse( compare.isTrue('false', true) ); }
        function test_false_exact_string_empty(){ assertFalse( compare.isTrue('false', true) ); }
        function test_false_exact_number      (){ assertFalse( compare.isTrue(0, true) ); }

        function test_false_inexact_boolean     (){ assertFalse( compare.isTrue(false, false ) ); }
        function test_false_inexact_string_false(){ assertFalse( compare.isTrue('false', false) ); } // this is the native behaviour!
        function test_false_inexact_string_empty(){ assertFalse( compare.isTrue('', false) ); } // this is the native behaviour!
        function test_false_inexact_number      (){ assertFalse( compare.isTrue(0, false) ); }
    }Test.UT.runAndCache(Test_compare_isTrue, 'compare.isTrue');


    function Test_compare_isFalse()
    {
    	function test_true_exact_boolean  (){ assertFalse( compare.isFalse( true, true ) ) }
    	function test_true_exact_string   (){ assertFalse( compare.isFalse( 'true', true ) ) }
    	function test_true_exact_number   (){ assertFalse( compare.isFalse( 1, true ) ) }
    	function test_true_exact_null     (){ assertFalse( compare.isFalse( null, true ) ) }
    	function test_true_exact_undefined(){ assertFalse( compare.isFalse( undefined, true ) ) }
    
    	function test_true_inexact_boolean  (){ assertFalse( compare.isFalse( true, false ) ) }
    	function test_true_inexact_string   (){ assertFalse( compare.isFalse( 'true', false ) ) }
    	function test_true_inexact_number   (){ assertFalse( compare.isFalse( 1, false ) ) }
    	function test_true_inexact_null     (){ assertFalse( compare.isFalse( null, false ) ) }
    	function test_true_inexact_undefined(){ assertFalse( compare.isFalse( undefined, false ) ) }
    
    	function test_false_exact_boolean     (){ assertTrue ( compare.isFalse( false, true ) ) }
    	function test_false_exact_string_false(){ assertFalse( compare.isFalse( 'false', true ) ) }
    	function test_false_exact_string_empty(){ assertFalse( compare.isFalse( 'false', true ) ) }
    	function test_false_exact_number      (){ assertFalse( compare.isFalse( 0, true ) ) }
    
    	function test_false_inexact_boolean     (){ assertTrue ( compare.isFalse( false, false ) ) }
    	function test_false_inexact_string_empty(){ assertTrue ( compare.isFalse( '', false ) ) } // this is the native behaviour!
    	function test_false_inexact_number      (){ assertTrue ( compare.isFalse( 0, false ) ) }
    	function test_false_inexact_string_false(){ assertFalse( compare.isFalse( 'false', false ) ) } // this is the native behaviour!
    }Test.UT.runAndCache( Test_compare_isFalse, 'compare.isFalse' )
    
    
    function Test_compare_array()
    {
    	function getArguments(arg1, arg2) { return arguments }
    
    	function test_native_typeof_array          () { assertEqual( 'object', typeof( [1, 2, 3] ) ) }
    	function test_native_typeof_array_empty    () { assertEqual( 'object', typeof( [] ) ) }
    	function test_native_typeof_arguments      () { assertEqual( 'object', typeof( getArguments(1, 2, 3) ) ) }
    	function test_native_typeof_arguments_empty() { assertEqual( 'object', typeof( getArguments() ) ) }
    
    	function test_type_string         () { assertEqual( 'string'   , compare.type('wa') ) }
    	function test_Type_Array_         () { assertEqual( 'array'    , compare.Type.Array_ ) }
    	function test_type_array          () { assertEqual( 'array'    , compare.type( [1, 2, 3] ) ) }
    	function test_type_array_empty    () { assertEqual( 'array'    , compare.type( [] ) ) }
    	function test_Type_Arguments      () { assertEqual( 'arguments', compare.Type.Arguments ) }
    	function test_type_arguments      () { assertEqual( 'arguments', compare.type( getArguments(1, 2, 3) ) ) }
    	function test_type_arguments_empty() { assertEqual( 'arguments', compare.type( getArguments() ) ) }
    
    	function test_instanceof_Array       (){ assertTrue ( [1, 2, 3] instanceof Array ) }
    	function test_isArray_array          (){ assertTrue ( compare.isArray( [1, 2, 3] ) ) }
    	function test_isArray_array_empty    (){ assertTrue ( compare.isArray( [] ) ) }
    	function test_isArray_arguments      (){ assertFalse( compare.isArray( getArguments(1, 2, 3) ) ) }
    	function test_isArray_string         (){ assertFalse( compare.isArray( 'wa' ) ) }
    	function test_isArray_string_empty   (){ assertFalse( compare.isArray( '' ) ) }
    
    	function test_isArguments_array          (){ assertFalse( compare.isArguments(             [1, 2, 3] ) ) }
    	function test_isArguments_arguments      (){ assertTrue ( compare.isArguments( getArguments(1, 2, 3) ) ) }
    	function test_isArguments_arguments_empty(){ assertTrue ( compare.isArguments( getArguments() ) ) }
    	function test_isArguments_string         (){ assertFalse( compare.isArguments( 'wa' ) ) }
    	function test_isArguments_string_empty   (){ assertFalse( compare.isArguments( '' ) ) }
    
    	function test_isList_array    (){ assertTrue ( compare.isList(             [1, 2, 3] ) ) }
    	function test_isList_arguments(){ assertTrue ( compare.isList( getArguments(1, 2, 3) ) ) }
    	function test_isList_string   (){ assertFalse( compare.isList( 'wa' ) ) }
    
    	function test_isSequence_array     (){ assertTrue ( compare.isSequence(             [1, 2, 3] ) ) }
    	function test_isSequence_arguments (){ assertTrue ( compare.isSequence( getArguments(1, 2, 3) ) ) }
    	function test_isSequence_string    (){ assertTrue ( compare.isSequence( 'wa' ) ) }
    	function test_isSequence_number    (){ assertFalse( compare.isSequence(3) ) }
    	function test_isSequence_dictionary(){ assertFalse( compare.isSequence({a:1, b:2, c:3}) ) }
    
    	function test_hasProperty_length_array     () { assertTrue ( compare.hasProperty_length([]) ) }
    	function test_hasProperty_length_arguments () { assertTrue ( compare.hasProperty_length( getArguments() ) ) }
    	function test_hasProperty_length_string    () { assertTrue ( compare.hasProperty_length('wa') ) }
    	function test_hasProperty_length_dictionary() { assertFalse( compare.hasProperty_length({}) ) }
    	function test_hasProperty_length_function  () { assertTrue ( compare.hasProperty_length(getArguments) ) }
    	function test_hasProperty_length_number    () { assertFalse( compare.hasProperty_length(123) ) }
    	function test_hasProperty_length_null      () { assertFalse( compare.hasProperty_length(null) ) }
    
    	function test_has_length_array     () { assertTrue ( compare.has_length([]) ) }
    	function test_has_length_arguments () { assertTrue ( compare.has_length( getArguments() ) ) }
    	function test_has_length_string    () { assertTrue ( compare.has_length('wa') ) }
    	function test_has_length_dictionary() { assertFalse( compare.has_length({}) ) }
    	function test_has_length_function  () { assertTrue ( compare.has_length(getArguments) ) }
    	function test_has_length_number    () { assertFalse( compare.has_length(123) ) }
    	function test_has_length_null      () { assertFalse( compare.has_length(null) ) }
    
    
    	function test_has_length_0_empty_array     () { assertTrue ( compare.has_length_0([]) ) }
    	function test_has_length_0_empty_arguments () { assertTrue ( compare.has_length_0( getArguments() ) ) }
    	function test_has_length_0_empty_string    () { assertTrue ( compare.has_length_0('') ) }
    	function test_has_length_0_empty_dictionary() { assertFalse( compare.has_length_0({}) ) }
    	function test_has_length_0_empty_function  () { assertTrue ( compare.has_length_0(function() {}) ) }
    	function test_has_length_0_number          () { assertFalse( compare.has_length_0(123) ) }
    	function test_has_length_0_null            () { assertFalse( compare.has_length_0(null) ) }
    
    	function test_has_length_0_some_array     () { assertFalse( compare.has_length_0([1, 2]) ) }
    	function test_has_length_0_some_arguments () { assertFalse( compare.has_length_0( getArguments(1, 2) ) ) }
    	function test_has_length_0_some_string    () { assertFalse( compare.has_length_0('wa') ) }
    	function test_has_length_0_some_dictionary() { assertFalse( compare.has_length_0({a:1, b:2}) ) }
    	function test_has_length_0_some_function  () { assertFalse( compare.has_length_0(getArguments) ) }
    
    
    	function test_has_length_some_empty_array     () { assertFalse( compare.has_length_some([]) ) }
    	function test_has_length_some_empty_arguments () { assertFalse( compare.has_length_some( getArguments() ) ) }
    	function test_has_length_some_empty_string    () { assertFalse( compare.has_length_some('') ) }
    	function test_has_length_some_empty_dictionary() { assertFalse( compare.has_length_some({}) ) }
    	function test_has_length_some_empty_function  () { assertFalse( compare.has_length_some(function() {}) ) }
    	function test_has_length_some_number          () { assertFalse( compare.has_length_some(123) ) }
    	function test_has_length_some_null            () { assertFalse( compare.has_length_some(null) ) }
    
    	function test_has_length_some_some_array     () { assertTrue ( compare.has_length_some([1, 2]) ) }
    	function test_has_length_some_some_arguments () { assertTrue ( compare.has_length_some( getArguments(1, 2) ) ) }
    	function test_has_length_some_some_string    () { assertTrue ( compare.has_length_some('wa') ) }
    	function test_has_length_some_some_dictionary() { assertFalse( compare.has_length_some({a:1, b:2}) ) }
    	function test_has_length_some_some_function  () { assertTrue ( compare.has_length_some(getArguments) ) }
    
    
    	function test_isIndexInList_false1() { assertFalse( compare.isIndexInList( 3, [] ) ) }
    	function test_isIndexInList_false2() { assertFalse( compare.isIndexInList( 3, [10, 11] ) ) }
    	function test_isIndexInList_false3() { assertFalse( compare.isIndexInList( 3, [10, 11, 12] ) ) }
    	function test_isIndexInList_true  () { assertTrue ( compare.isIndexInList( 3, [10, 11, 12, 31] ) ) }
    	function test_isIndexInList_null1 () { assertFalse( compare.isIndexInList( 3, null ) ) }
    	function test_isIndexInList_null2 () { assertFalse( compare.isIndexInList( null, [01, 11] ) ) }
    
    	function test_isIntInLength_false1() { assertFalse( compare.isIntInLength( 3, [] ) ) }
    	function test_isIntInLength_false2() { assertFalse( compare.isIntInLength( 3, [10, 11] ) ) }
    	function test_isIntInLength_true  () { assertTrue ( compare.isIntInLength( 3, [10, 11, 12] ) ) }
    	function test_isIntInLength_null1 () { assertFalse( compare.isIntInLength( 3, null ) ) }
    	function test_isIntInLength_null2 () { assertFalse( compare.isIntInLength( null, [01, 11] ) ) }
    
    
    	function test_isIndexInList_regression_2 () { assertTrue( compare.isIndexInList(  2, [10, 11, 12] ) ) }
    	function test_isIndexInList_regression_1 () { assertTrue( compare.isIndexInList(  1, [10, 11, 12] ) ) }
    	function test_isIndexInList_regression_0 () { assertTrue( compare.isIndexInList(  1, [10, 11, 12] ) ) }
    	function test_isIndexInList_regression_m1() { assertTrue( compare.isIndexInList( -1, [10, 11, 12] ) ) }
    	function test_isIndexInList_regression_m2() { assertTrue( compare.isIndexInList( -2, [10, 11, 12] ) ) }
    }Test.UT.runAndCache( Test_compare_array, 'compare arrays' )
    
    
    function Test_compare_collection()
    {
    	function Class()
    	{
    		this.propertyA = 1
    		this.propertyB = 2
    		this.methodA   = function(){ return true }
    		this.methodB   = function(){ return 123  }
    	}
    
    	function inherit( Sub, Main )
    	{
    		Sub.prototype             = new Main()
    		Sub.prototype.constructor = Sub
    	}
    
    	function build( Sub, Main ) 
    	{
    		inherit( Sub, Main )
    	return new Sub()
    	}
    
    	function SubClass()
    	{
    		this.propertyC = 1
    		this.methodC   = function(){ return this.methodA() }
    	}
    	function createSubClass() { return build( SubClass, Class ) }
    	function SubClass2(){}
    	function createSubClass2() { return build( SubClass2, Class ) }
    
    	function setUp()
    	{
    		oSubClass = createSubClass()
    		oSubClass['propertyD'] = 'seriously?'
    
    		oSubClass2 = createSubClass2()
    	}
    
    	function test_native_object1_propertyA(){ assertTrue ( 'propertyA' in new Class() ) }
    	function test_native_object1_propertyB(){ assertTrue ( 'propertyB' in new Class() ) }
    	function test_native_object1_propertyC(){ assertFalse( 'propertyC' in new Class() ) }
    	function test_native_object1_propertyD(){ assertFalse( 'propertyD' in new Class() ) }
    	function test_native_object1_methodA  (){ assertTrue ( 'methodA'   in new Class() ) }
    	function test_native_object1_methodB  (){ assertTrue ( 'methodB'   in new Class() ) }
    	function test_native_object1_methodC  (){ assertFalse( 'methodC'   in new Class() ) }
    	function test_native_object1_methodA_R(){ assertTrue ( ( new Class() ).methodA() ) }
    
    	function test_native_object2_propertyA(){ assertTrue( 'propertyA' in oSubClass ) }
    	function test_native_object2_propertyB(){ assertTrue( 'propertyB' in oSubClass ) }
    	function test_native_object2_propertyC(){ assertTrue( 'propertyC' in oSubClass ) }
    	function test_native_object2_propertyD(){ assertTrue( 'propertyD' in oSubClass ) }
    	function test_native_object2_methodA  (){ assertTrue( 'methodA'   in oSubClass ) }
    	function test_native_object2_methodB  (){ assertTrue( 'methodB'   in oSubClass ) }
    	function test_native_object2_methodC  (){ assertTrue( 'methodC'   in oSubClass ) }
    
    	function test_native_object3_propertyA(){ assertTrue ( 'propertyA' in oSubClass2 ) }
    	function test_native_object3_propertyB(){ assertTrue ( 'propertyB' in oSubClass2 ) }
    	function test_native_object3_propertyC(){ assertFalse( 'propertyC' in oSubClass2 ) }
    	function test_native_object3_propertyD(){ assertFalse( 'propertyD' in oSubClass2 ) }
    	function test_native_object3_methodA  (){ assertTrue ( 'methodA'   in oSubClass2 ) }
    	function test_native_object3_methodB  (){ assertTrue ( 'methodB'   in oSubClass2 ) }
    	function test_native_object3_methodC  (){ assertFalse( 'methodC'   in oSubClass2 ) }
    
    	function test_native_typeof_dictionary(){ assertEqual( 'object'   , typeof( {a:1, b:2, c:3} ) ) }
    	function test_native_typeof_null      (){ assertEqual( 'object'   , typeof( null ) ) }
    	function test_native_typeof_undefined (){ assertEqual( 'undefined', typeof( undefined ) ) }
    	function test_native_typeof_object1   (){ assertEqual( 'object'   , typeof( new Class() ) ) }
    	function test_native_typeof_object2   (){ assertEqual( 'object'   , typeof( oSubClass ) ) }
    	function test_native_typeof_object3   (){ assertEqual( 'object'   , typeof( oSubClass2 ) ) }
    	function test_native_typeof_TiObject  (){ assertEqual( 'object'   , typeof( Ti.UI.createView() ) ) }
    
    	function test_Type_Obj       (){ assertEqual( 'object'   , compare.Type.Obj ) }
    	function test_type_null      (){ assertEqual( 'null'     , compare.type(null) ) }
    	function test_type_undefined (){ assertEqual( 'undefined', compare.type(undefined) ) }
    	function test_type_dictionary(){ assertEqual( 'object'   , compare.type({a:1, b:2, c:3}) ) }
    	function test_type_object1   (){ assertEqual( 'object'   , compare.type( new Class() ) ) }
    	function test_type_object2   (){ assertEqual( 'object'   , compare.type( oSubClass ) ) }
    	function test_type_object3   (){ assertEqual( 'object'   , compare.type( oSubClass2 ) ) }
    	function test_type_TiObject  (){ assertEqual( 'object'   , compare.type( Ti.UI.createView() ) ) }
    
    	function test_hasProperties_null            (){ assertFalse( compare.hasProperties(null) ) }
    	function test_hasProperties_undefined       (){ assertFalse( compare.hasProperties(undefined) ) }
    	function test_hasProperties_dictionary      (){ assertTrue ( compare.hasProperties({a:1, b:2, c:3}) ) }
    	function test_hasProperties_dictionary_emtpy(){ assertFalse( compare.hasProperties( {} ) ) }
    	function test_hasProperties_object1         (){ assertTrue ( compare.hasProperties( new Class() ) ) }
    	function test_hasProperties_object2         (){ assertTrue ( compare.hasProperties( oSubClass ) ) }
    	function test_hasProperties_object3         (){ assertTrue ( compare.hasProperties( oSubClass2 ) ) }
    	function test_hasProperties_TiObject        (){ assertTrue ( compare.hasProperties( Ti.UI.createView({color:'red'}) ) ) }
    	function test_hasProperties_TiObject_empty  (){ assertTrue ( compare.hasProperties( Ti.UI.createView() ) ) } // TODO FTW  { assertFalse( compare.hasProperties( Ti.UI.createView({}) ) ) }
    
    // it doesn't break! awesome =D
    	function test_hasProperty_null                      (){ assertFalse( compare.hasProperty( null, 'a' ) ) }
    	function test_hasProperty_undefined                 (){ assertFalse( compare.hasProperty( undefined, 'a' ) ) }
    
    	function test_hasProperty_dictionary_true           (){ assertTrue ( compare.hasProperty({a:1, b:2, c:3}, 'a' ) ) }
    	function test_hasProperty_dictionary_false          (){ assertFalse( compare.hasProperty({a:1, b:2, c:3}, 'd' ) ) }
    	function test_hasProperty_object1_true_property     (){ assertTrue ( compare.hasProperty( new Class(), 'propertyA' ) ) }
    	function test_hasProperty_object1_true_method       (){ assertTrue ( compare.hasProperty( new Class(), 'methodA' ) ) }
    	function test_hasProperty_object1_false_property    (){ assertFalse( compare.hasProperty( new Class(), 'propertyC' ) ) }
    	function test_hasProperty_object1_false_method      (){ assertFalse( compare.hasProperty( new Class(), 'methodC' ) ) }
    	function test_hasProperty_object2_inherited_property(){ assertTrue ( compare.hasProperty( oSubClass, 'propertyA' ) ) }
    	function test_hasProperty_object2_inherited_method  (){ assertTrue ( compare.hasProperty( oSubClass, 'methodA' ) ) }
    	function test_hasProperty_object2_own_property1     (){ assertTrue ( compare.hasProperty( oSubClass, 'propertyC' ) ) }
    	function test_hasProperty_object2_own_property2     (){ assertTrue ( compare.hasProperty( oSubClass, 'propertyD' ) ) }
    	function test_hasProperty_object3_own_method        (){ assertFalse( compare.hasProperty( oSubClass2, 'methodC' ) ) }
    	function test_hasProperty_object3_own_property      (){ assertFalse( compare.hasProperty( oSubClass2, 'propertyD' ) ) }
    	function test_hasProperty_TiObject                  (){ assertTrue ( compare.hasProperty( Ti.UI.createView(), 'color' ) ) } // so it IS a property!!
    
    	function test_hasMethod_dictionary_key           (){ assertFalse( compare.hasMethod({a:1, b:2, c:3}, 'a' ) ) } // a is not a method
    	function test_hasMethod_dictionary_not           (){ assertTrue ( compare.hasMethod({a:1, b:2, c:3, fly: function(){return false}}, 'fly' ) ) }
    	function test_hasMethod_dictionary_hasOwnProperty(){ assertTrue ( compare.hasMethod({a:1, b:2, c:3}, 'hasOwnProperty' ) ) }
    	function test_hasMethod_object1_true             (){ assertTrue ( compare.hasMethod( new Class(), 'methodA' ) ) }
    	function test_hasMethod_object1_false            (){ assertFalse( compare.hasMethod( new Class(), 'methodC' ) ) }
    	function test_hasMethod_object2_inherited        (){ assertTrue ( compare.hasMethod( oSubClass, 'methodA' ) ) }
    	function test_hasMethod_object2_own              (){ assertTrue ( compare.hasMethod( oSubClass, 'methodC' ) ) }
    	function test_hasMethod_TiObject                 (){ assertTrue ( compare.hasMethod( Ti.UI.createView(), 'addEventListener' ) ) } // so it IS a property!!
    
    	function test_hasMethod_hasOwnProperty_dictionary      (){ assertTrue ( compare.hasMethod_hasOwnProperty({a:1, b:2, c:3} ) ) }
    	function test_hasMethod_hasOwnProperty_dictionary_empty(){ assertTrue ( compare.hasMethod_hasOwnProperty({} ) ) }
    	function test_hasMethod_hasOwnProperty_object1         (){ assertTrue ( compare.hasMethod_hasOwnProperty( new Class() ) ) }
    	function test_hasMethod_hasOwnProperty_object2         (){ assertTrue ( compare.hasMethod_hasOwnProperty( oSubClass ) ) }
    	function test_hasMethod_hasOwnProperty_object3         (){ assertTrue ( compare.hasMethod_hasOwnProperty( oSubClass2 ) ) }
    	function test_hasMethod_hasOwnProperty_TiObject        (){ assertFalse( compare.hasMethod_hasOwnProperty( Ti.UI.createView() ) ) } // so it IS a property!!
    
    	function test_hasKeys_dictionary      (){ assertTrue ( compare.hasKeys({a:1, b:2, c:3} ) ) }
    	function test_hasKeys_dictionary_empty(){ assertFalse( compare.hasKeys({} ) ) }
    	function test_hasKeys_object1         (){ assertTrue ( compare.hasKeys( new Class() ) ) }
    	function test_hasKeys_object2         (){ assertTrue ( compare.hasKeys( oSubClass ) ) }
    	function test_hasKeys_object3         (){ assertFalse( compare.hasKeys( oSubClass2 ) ) }
    	function test_hasKeys_TiObject        (){ assertTrue( compare.hasKeys( Ti.UI.createView() ) ) } // horizontalWrap ?
    
    	function test_hasKey_dictionary      (){ assertTrue ( compare.hasKey({a:1, b:2, c:3}, 'a' ) ) }
    	function test_hasKey_dictionary_empty(){ assertFalse( compare.hasKey({}, 'a' ) ) }
    	function test_hasKey_object1         (){ assertTrue ( compare.hasKey( new Class(), 'propertyA' ) ) }
    	function test_hasKey_object2         (){ assertFalse( compare.hasKey( oSubClass, 'propertyA' ) ) }
    	function test_hasKey_object3         (){ assertFalse( compare.hasKey( oSubClass2, 'propertyA' ) ) }
    	function test_hasKey_TiObject        (){ assertFalse( compare.hasKey( Ti.UI.createView({color:'blue'}, 'color') ) ) } // so it IS a property!!
    
    	function test_hasTraits_dictionary      (){ assertFalse( compare.hasTraits({a:1, b:2, c:3} ) ) }
    	function test_hasTraits_dictionary_empty(){ assertFalse( compare.hasTraits({} ) ) }
    	function test_hasTraits_object1         (){ assertFalse( compare.hasTraits( new Class() ) ) }
    	function test_hasTraits_object2         (){ assertTrue ( compare.hasTraits( oSubClass ) ) }
    	function test_hasTraits_object3         (){ assertTrue ( compare.hasTraits( oSubClass2 ) ) }
    	function test_hasTraits_TiObject        (){ assertFalse( compare.hasTraits( Ti.UI.createView({color:'blue'}) ) ) }
    
    	function test_hasTrait_dictionary      (){ assertFalse( compare.hasTrait({a:1, b:2, c:3}, 'a' ) ) }
    	function test_hasTrait_object1         (){ assertFalse( compare.hasTrait( new Class(), 'propertyA' ) ) }
    	function test_hasTrait_object2         (){ assertTrue ( compare.hasTrait( oSubClass, 'propertyA' ) ) }
    	function test_hasTrait_object3         (){ assertTrue ( compare.hasTrait( oSubClass2, 'propertyA' ) ) }
    	function test_hasTrait_TiObject        (){ assertFalse( compare.hasTrait( Ti.UI.createView({color:'blue'}), 'color' ) ) } // Ti Objects don't have own properties
    
    //TODO	function test_isDontDelete_dictionary(){ assertTrue ( compare.isDontDelete({}) ) }
    //TODO	function test_isDontDelete_property  (){ assertFalse( compare.isDontDelete(oSubClass.propertyA) ) }
    
    	function test_isInstance_string          (){ assertFalse( compare.isInstance( 'wa' ) ) }
    	function test_isInstance_null            (){ assertFalse( compare.isInstance( null ) ) }
    	function test_isInstance_undefined       (){ assertFalse( compare.isInstance( undefined ) ) }
    	function test_isInstance_newString       (){ assertTrue ( compare.isInstance( new String('wa') ) ) }
    	function test_isInstance_newDate         (){ assertTrue ( compare.isInstance( new Date() ) ) }
    	function test_isInstance_newNumber       (){ assertTrue ( compare.isInstance( new Number() ) ) }
    	function test_isInstance_array           (){ assertTrue ( compare.isInstance([1, 2, 3]) ) }
    	function test_isInstance_dictionary      (){ assertTrue ( compare.isInstance({a:1, b:2, c:3} ) ) }
    	function test_isInstance_dictionary_empty(){ assertTrue ( compare.isInstance({} ) ) }
    	function test_isInstance_object1         (){ assertTrue ( compare.isInstance( new Class() ) ) }
    	function test_isInstance_object2         (){ assertTrue ( compare.isInstance( oSubClass ) ) }
    	function test_isInstance_object3         (){ assertTrue ( compare.isInstance( oSubClass2 ) ) }
    	function test_isInstance_TiObject        (){ assertTrue ( compare.isInstance( Ti.UI.createView() ) ) }
    
    	function test_isObject_string          (){ assertFalse( compare.isObject( 'wa' ) ) }
    	function test_isObject_null            (){ assertFalse( compare.isObject( null ) ) }
    	function test_isObject_undefined       (){ assertFalse( compare.isObject( undefined ) ) }
    	function test_isObject_newString       (){ assertFalse( compare.isObject( new String('wa') ) ) }
    	function test_isObject_newDate         (){ assertFalse( compare.isObject( new Date() ) ) }
    	function test_isObject_newNumber       (){ assertFalse( compare.isObject( new Number() ) ) }
    	function test_isObject_array           (){ assertFalse( compare.isObject([1, 2, 3]) ) }
    	function test_isObject_dictionary      (){ assertTrue ( compare.isObject({a:1, b:2, c:3} ) ) }
    	function test_isObject_dictionary_empty(){ assertTrue ( compare.isObject({} ) ) }
    	function test_isObject_object1         (){ assertTrue ( compare.isObject( new Class() ) ) }
    	function test_isObject_object2         (){ assertTrue ( compare.isObject( oSubClass ) ) }
    	function test_isObject_object3         (){ assertTrue ( compare.isObject( oSubClass2 ) ) }
    	function test_isObject_TiObject        (){ assertTrue ( compare.isObject( Ti.UI.createView() ) ) }
    
    	function test_isDictionary_string          (){ assertFalse( compare.isDictionary( 'wa' ) ) }
    	function test_isDictionary_newString       (){ assertFalse( compare.isDictionary( new String('wa') ) ) }
    	function test_isDictionary_newDate         (){ assertFalse( compare.isDictionary( new Date() ) ) }
    	function test_isDictionary_newNumber       (){ assertFalse( compare.isDictionary( new Number() ) ) }
    	function test_isDictionary_array           (){ assertFalse( compare.isDictionary([1, 2, 3]) ) }
    	function test_isDictionary_dictionary      (){ assertTrue ( compare.isDictionary({a:1, b:2, c:3} ) ) }
    	function test_isDictionary_dictionary_empty(){ assertTrue ( compare.isDictionary({} ) ) }
    	function test_isDictionary_object1         (){ assertTrue ( compare.isDictionary( new Class() ) ) }
    	function test_isDictionary_object2         (){ assertTrue ( compare.isDictionary( oSubClass ) ) }
    	function test_isDictionary_object3         (){ assertTrue ( compare.isDictionary( oSubClass2 ) ) }
    	function test_isDictionary_TiObject        (){ assertFalse( compare.isDictionary( Ti.UI.createView() ) ) }
    
    	function test_isDictionaryOnly_string          (){ assertFalse( compare.isDictionaryOnly( 'wa' ) ) }
    	function test_isDictionaryOnly_newString       (){ assertFalse( compare.isDictionaryOnly( new String('wa') ) ) }
    	function test_isDictionaryOnly_newDate         (){ assertFalse( compare.isDictionaryOnly( new Date() ) ) }
    	function test_isDictionaryOnly_newNumber       (){ assertFalse( compare.isDictionaryOnly( new Number() ) ) }
    	function test_isDictionaryOnly_array           (){ assertFalse( compare.isDictionaryOnly([1, 2, 3]) ) }
    	function test_isDictionaryOnly_dictionary      (){ assertTrue ( compare.isDictionaryOnly({a:1, b:2, c:3} ) ) }
    	function test_isDictionaryOnly_dictionary_empty(){ assertTrue ( compare.isDictionaryOnly({} ) ) }
    	function test_isDictionaryOnly_object1         (){ assertTrue ( compare.isDictionaryOnly( new Class() ) ) }
    	function test_isDictionaryOnly_object2         (){ assertFalse( compare.isDictionaryOnly( oSubClass ) ) }
    	function test_isDictionaryOnly_object3         (){ assertFalse( compare.isDictionaryOnly( oSubClass2 ) ) }
    	function test_isDictionaryOnly_TiObject        (){ assertFalse( compare.isDictionaryOnly( Ti.UI.createView() ) ) }
    	function test_isDictionaryOnly_string          (){ assertFalse( compare.isDictionaryOnly( 'wa' ) ) }
    	function test_isEnumerator_dictionary          (){ assertTrue ( compare.isEnumerator({a:1, b:2, c:3} ) ) }
    	function test_isEnumerator_dictionary_empty    (){ assertTrue ( compare.isEnumerator({} ) ) }
    	function test_isEnumerator_dictionary_strings  (){ assertTrue ( compare.isEnumerator({ param1: "I don't think m@n likes it", param2: "foo" }) ) }
    
    	function test_isCollection_string          (){ assertFalse( compare.isCollection( 'wa' ) ) }
    	function test_isCollection_newString       (){ assertFalse( compare.isCollection( new String('wa') ) ) }
    	function test_isCollection_newDate         (){ assertFalse( compare.isCollection( new Date() ) ) }
    	function test_isCollection_newNumber       (){ assertFalse( compare.isCollection( new Number() ) ) }
    	function test_isCollection_array           (){ assertTrue ( compare.isCollection([1, 2, 3]) ) }
    	function test_isCollection_dictionary      (){ assertTrue ( compare.isCollection({a:1, b:2, c:3} ) ) }
    	function test_isCollection_dictionary_empty(){ assertTrue ( compare.isCollection({} ) ) }
    	function test_isCollection_object1         (){ assertTrue ( compare.isCollection( new Class() ) ) }
    	function test_isCollection_object2         (){ assertTrue ( compare.isCollection( oSubClass ) ) }
    	function test_isCollection_object3         (){ assertTrue ( compare.isCollection( oSubClass2 ) ) }
    	function test_isCollection_TiObject        (){ assertFalse( compare.isCollection( Ti.UI.createView() ) ) }
    
    	function test_isIterable_null            (){ assertFalse( compare.isIterable(null) ) }
    	function test_isIterable_undefined       (){ assertFalse( compare.isIterable(undefined) ) }
    	function test_isIterable_string          (){ assertTrue ( compare.isIterable('wa') ) }
    	function test_isIterable_newString       (){ assertTrue ( compare.isIterable( new String('wa') ) ) }
    	function test_isIterable_newDate         (){ assertTrue ( compare.isIterable( new Date() ) ) }
    	function test_isIterable_newNumber       (){ assertTrue ( compare.isIterable( new Number() ) ) }
    	function test_isIterable_array           (){ assertTrue ( compare.isIterable([1, 2, 3]) ) }
    	function test_isIterable_dictionary      (){ assertTrue ( compare.isIterable({a:1, b:2, c:3} ) ) }
    	function test_isIterable_dictionary_empty(){ assertTrue ( compare.isIterable({} ) ) }
    	function test_isIterable_object1         (){ assertTrue ( compare.isIterable( new Class() ) ) }
    	function test_isIterable_object2         (){ assertTrue ( compare.isIterable( oSubClass ) ) }
    	function test_isIterable_object3         (){ assertTrue ( compare.isIterable( oSubClass2 ) ) }
    	function test_isIterable_TiObject        (){ assertTrue ( compare.isIterable( Ti.UI.createView() ) ) }
    
    	function test_isObjectOther_string          (){ assertFalse( compare.isObjectOther( 'wa' ) ) }
    	function test_isObjectOther_newString       (){ assertFalse( compare.isObjectOther( new String('wa') ) ) }
    	function test_isObjectOther_newDate         (){ assertFalse( compare.isObjectOther( new Date() ) ) }
    	function test_isObjectOther_newNumber       (){ assertFalse( compare.isObjectOther( new Number() ) ) }
    	function test_isObjectOther_array           (){ assertFalse( compare.isObjectOther([1, 2, 3]) ) }
    	function test_isObjectOther_dictionary      (){ assertFalse( compare.isObjectOther({a:1, b:2, c:3} ) ) }
    	function test_isObjectOther_dictionary_empty(){ assertFalse( compare.isObjectOther({} ) ) }
    	function test_isObjectOther_object1         (){ assertFalse( compare.isObjectOther( new Class() ) ) }
    	function test_isObjectOther_object2         (){ assertFalse( compare.isObjectOther( oSubClass ) ) }
    	function test_isObjectOther_object3         (){ assertFalse( compare.isObjectOther( oSubClass2 ) ) }
    	function test_isObjectOther_TiObject        (){ assertTrue ( compare.isObjectOther( Ti.UI.createView() ) ) }
    	function test_isObjectOther_string          (){ assertFalse( compare.isObjectOther( 'wa' ) ) }
    	function test_isObjectOther_list            (){ assertFalse( compare.isObjectOther( [1, 2, 3] ) ) }
    
    	function test_isEmpty_dictionary      (){ assertFalse( compare.isEmpty({a:1, b:2, c:3} ) ) }
    	function test_isEmpty_dictionary_empty(){ assertTrue ( compare.isEmpty({} ) ) }
    	function test_isEmpty_object1         (){ assertFalse( compare.isEmpty( new Class() ) ) }
    	function test_isEmpty_object2         (){ assertFalse( compare.isEmpty( oSubClass ) ) }
    	function test_isEmpty_object3         (){ assertTrue ( compare.isEmpty( oSubClass2 ) ) } // TODO?
    	function test_isEmpty_TiObject        (){ assertFalse( compare.isEmpty( Ti.UI.createView({color:'red'}) ) ) }
    	function test_isEmpty_TiObject_empty  (){ assertFalse( compare.isEmpty( Ti.UI.createView() ) ) } // TODO WTF? { assertTrue ( compare.isEmpty( Ti.UI.createView() ) ) }
    	function test_isEmpty_string          (){ assertTrue ( compare.isEmpty( '' ) ) }
    	function test_isEmpty_list            (){ assertTrue ( compare.isEmpty( [] ) ) }		
    }Test.UT.runAndCache( Test_compare_collection, 'compare collections' )
    
    
    function Test_compare_isTypeJSON()
    {
    	function getArguments() { return arguments }
    
    	function test_isTypeJSONable_number_positive (){ assertTrue ( compare.isTypeJSONable(123) ) }
    	function test_isTypeJSONable_number_negative (){ assertTrue ( compare.isTypeJSONable(-123) ) }
    	function test_isTypeJSONable_number_0        (){ assertTrue ( compare.isTypeJSONable(0) ) }
    	function test_isTypeJSONable_string          (){ assertTrue ( compare.isTypeJSONable('wa') ) }
    	function test_isTypeJSONable_date_object     (){ assertTrue ( compare.isTypeJSONable( new Date() ) ) }
    	function test_isTypeJSONable_date_invalid_1  (){ assertFalse( compare.isTypeJSONable( new Date(-1) ) ) }
    	function test_isTypeJSONable_date_invalid_2  (){ assertFalse( compare.isTypeJSONable( new Date(NaN) ) ) }
    	function test_isTypeJSONable_date_invalid_3  (){ assertFalse( compare.isTypeJSONable( new Date('dragon/augustus/bicentenial') ) ) }
    	function test_isTypeJSONable_list            (){ assertTrue ( compare.isTypeJSONable([1, 2, 3]) ) }
    	function test_isTypeJSONable_boolean_true    (){ assertTrue ( compare.isTypeJSONable(true) ) }
    	function test_isTypeJSONable_boolean_false   (){ assertTrue ( compare.isTypeJSONable(false) ) }
    	function test_isTypeJSONable_boolStr_true    (){ assertTrue ( compare.isTypeJSONable('true') ) }
    	function test_isTypeJSONable_boolStr_false   (){ assertTrue ( compare.isTypeJSONable('false') ) } 
    	function test_isTypeJSONable_booleans_list   (){ assertTrue ( compare.isTypeJSONable([true, false, 1, 0]) ) }
    	function test_isTypeJSONable_booleans_dict   (){ assertTrue ( compare.isTypeJSONable({a:true, b:false, c:1, d:0}) ) }
    	function test_isTypeJSONable_list_empty      (){ assertTrue ( compare.isTypeJSONable([]) ) }
    	function test_isTypeJSONable_dictionary      (){ assertTrue ( compare.isTypeJSONable({a:1, b:2, c:3}) ) }
    	function test_isTypeJSONable_dictionary_empty(){ assertTrue ( compare.isTypeJSONable({}) ) }
    	function test_isTypeJSONable_null            (){ assertTrue ( compare.isTypeJSONable(null) ) }
    	function test_isTypeJSONable_undefined       (){ assertFalse( compare.isTypeJSONable(undefined) ) } // this is why we default everything to null!!
    	function test_isTypeJSONable_undefined2      (){ assertTrue ( compare.isTypeJSONable( {a: undefined, b:2} ) ) } // don't worry, we'll catch it later on
    	function test_isTypeJSONable_arguments       (){ assertFalse( compare.isTypeJSONable( getArguments(1, 2, 3) ) ) }
    	function test_isTypeJSONable_arguments_empty (){ assertFalse( compare.isTypeJSONable( getArguments() ) ) }
    	function test_isTypeJSONable_TiObject        (){ assertFalse( compare.isTypeJSONable( Ti.UI.createView({color: 'red'}) ) ) }
    	function test_isTypeJSONable_TiFile          (){ assertFalse( compare.isTypeJSONable( Ti.Filesystem.getFile('KS_nav_ui.png') ) ) }
    	function test_isTypeJSONable_TiImage         (){ assertFalse( compare.isTypeJSONable( Ti.UI.createImageView({image:'KS_nav_ui.png'}) ) ) }
    	function test_isTypeJSONable_complex         (){ assertTrue ( compare.isTypeJSONable( {a: Ti.UI.createWindow({color: 'red'}), b: Ti.Filesystem.getFile('KS_nav_ui.png'), c: Ti.UI.createImageView({image:'KS_nav_ui.png'}) } ) ) } //We'll catch this puppy later on
    	function test_isTypeJSONable_function        (){ assertFalse( compare.isTypeJSONable( function(){ return false } ) ) }
    }Test.UT.runAndCache( Test_compare_isTypeJSON, 'compare JSON types' )
    
    
    function Test_compare_defaultToValue()
    {
    	function test_string_string  (){ assertIdentical( compare.defaultToValue( 'x'      , 'y'       ), 'x'   ) }
    	function test_null_string    (){ assertIdentical( compare.defaultToValue( null     , 'y'       ), 'y'   ) }
    	function test_false_null     (){ assertIdentical( compare.defaultToValue( false    , null      ), false ) }
    	function test_null_false     (){ assertIdentical( compare.defaultToValue( null     , false     ), false ) }
    	function test_false_undefined(){ assertIdentical( compare.defaultToValue( false    , undefined ), false ) }
    	function test_undefined_false(){ assertIdentical( compare.defaultToValue( undefined, false     ), false ) }
    	function test_true_null      (){ assertIdentical( compare.defaultToValue( true     , null      ), true  ) }
    	function test_null_true      (){ assertIdentical( compare.defaultToValue( null     , true      ), true  ) }
    	function test_true_undefined (){ assertIdentical( compare.defaultToValue( true     , undefined ), true  ) }
    	function test_undefined_true (){ assertIdentical( compare.defaultToValue( undefined, true      ), true  ) }
    	function test_undefined_null (){ assertIdentical( compare.defaultToValue( null     , undefined ), null  ) }
    	function test_null_undefined (){ assertIdentical( compare.defaultToValue( undefined, null      ), null  ) }
    }Test.UT.runAndCache( Test_compare_defaultToValue, 'compare.defaultToValue' )
    
    
    function Test_compare_defaultFunction()
    {
    	function test_empty                 () { assertIdentical( compare.f          , compare.defaultFunction() )}
    	function test_null                  () { assertIdentical( compare.f          , compare.defaultFunction( null ) )}
    	function test_boolOrCast_default    () { assertIdentical( compare.boolOrCast , compare.defaultFunction( null               , compare.boolOrCast ) ) }
    	function test_boolOrCast_bool3states() { assertIdentical( compare.bool3states, compare.defaultFunction( compare.bool3states, compare.boolOrCast ) ) }
    	function test_boolOrCast_boolOrFalse() { assertIdentical( compare.boolOrFalse, compare.defaultFunction( compare.boolOrFalse, compare.boolOrCast ) ) }
    }Test.UT.runAndCache( Test_compare_defaultFunction, 'compare.defaultFunction' )
    
    
    function Test_compare_defaultEventHandler()
    {
    	function setUp()
    	{
    		oTiButton = Ti.UI.createButton()
    		oObj      = {}
    		oBoolean  = new Boolean(true)
    	}
    
    	function test_nothing  () { assertTrue( compare.defaultEventHandler()          === Ti.App ) }
    	function test_null     () { assertTrue( compare.defaultEventHandler(null)      === null ) }
    	function test_undefined() { assertTrue( compare.defaultEventHandler(undefined) === Ti.App ) }
    	function test_TiButton () { assertTrue( compare.defaultEventHandler(oTiButton) === oTiButton ) }
    	function test_obj      () { assertTrue( compare.defaultEventHandler(oObj)      === oObj ) }
    	function test_boolean  () { assertTrue( compare.defaultEventHandler(oBoolean)  === oBoolean ) }
    }Test.UT.runAndCache( Test_compare_defaultEventHandler, 'compare.defaultEventHandler' )


    function Test_compare_resolve()
    {
        function setUp()
        {
            oView = Ti.UI.createView( {width: 50} );
            oObj = {
                value : 'value',
                fn    : function() { return 'function' },
                _value: 'private value',
                _fn   : function() { return 'private function' },
                array : [],
                bool  : true,
                view  : oView,
                view2 : null
            };
        }

        function test_resolve_value                       (){ assertIdentical( 'value'           , compare.resolve                (oObj.value) ) }
        function test_resolve_fn                          (){ assertIdentical( 'function'        , compare.resolve                (oObj.fn   ) ) }
        function test_resolveBoolean_bool                 (){ assertIdentical(  true             , compare.resolveBoolean         (oObj.bool ) ) }
        function test_resolveBoolean_array                (){ assertIdentical(  true             , compare.resolveBoolean         (oObj.array) ) }
        function test_resolveBoolean_array_3states        (){ assertIdentical(  null             , compare.resolveBoolean         (oObj.array, compare.bool3states ) ) }
        function test_resolveBoolean_array_false          (){ assertIdentical(  false            , compare.resolveBoolean         (oObj.array, compare.boolOrFalse ) ) }
        function test_resolveProperty_value               (){ assertIdentical( 'value'           , compare.resolveProperty        (oObj ,'value') ) }
        function test_resolveProperty_fn                  (){ assertIdentical( 'function'        , compare.resolveProperty        (oObj ,'fn'   ) ) }
        function test_resolvePropertyBoolean_bool         (){ assertIdentical(  true             , compare.resolvePropertyBoolean (oObj ,'bool' ) ) }
        function test_resolvePropertyBoolean_array        (){ assertIdentical(  true             , compare.resolvePropertyBoolean (oObj ,'array') ) }
        function test_resolvePropertyBoolean_array_3states(){ assertIdentical(  null             , compare.resolvePropertyBoolean (oObj ,'array', compare.bool3states ) ) }
        function test_resolvePropertyBoolean_array_false  (){ assertIdentical(  false            , compare.resolvePropertyBoolean (oObj ,'array', compare.boolOrFalse ) ) }
        function test_resolvePropertyPrivate_value        (){ assertIdentical( 'private value'   , compare.resolvePropertyPrivate (oObj ,'value' ) ) }
        function test_resolvePropertyPrivate_fn           (){ assertIdentical( 'private function', compare.resolvePropertyPrivate (oObj ,'fn'    ) ) }
        function test_resolvePropertyPrivate_array        (){ assertEqual    (  []               , compare.resolvePropertyPrivate (oObj ,'array' ) ) }
        function test_resolvePropertyPrivate_bool         (){ assertIdentical(  true             , compare.resolvePropertyPrivate (oObj ,'bool'  ) ) }
        function test_resolvePropertyOrObject_exists      (){ assertIdentical( 'value'           , compare.resolvePropertyOrObject(oObj ,'value' ) ) }
        function test_resolvePropertyOrObject_not         (){ assertIdentical( oObj              , compare.resolvePropertyOrObject(oObj ,'value2') ) }
        function test_resolvePropertyOrObject_null        (){ assertIdentical( null              , compare.resolvePropertyOrObject(null ,'view2' ) ) }
        function test_resolvePropertyOrObject_view        (){ assertIdentical( oView             , compare.resolvePropertyOrObject(oObj ,'view'  ) ) }
        function test_resolvePropertyOrObject_Ti_view     (){ assertIdentical( oView             , compare.resolvePropertyOrObject(oView,'view'  ) ) }
        function test_resolvePropertyOrObject_Ti_width    (){ assertIdentical( oView             , compare.resolvePropertyOrObject(oView,'width' ) ) } // TODO too much dynamic for Titanium?	
    }Test.UT.runAndCache( Test_compare_resolve, 'compare resolve' )
