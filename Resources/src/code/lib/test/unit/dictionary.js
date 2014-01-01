Ti.include('/src/code/lib/test/include.js')

	dictionary = require('src/code/lib/dictionary')


	function Test_heritage()
	{
		function test_array()
		{ 
			assertSimilar( dictionary.heritage([1, 2, 3]), [
				['Array' , [0, 1, 2, 'length']],
				['Array' , ['length', 'constructor', 'forEach', 'some', 'every', 'map', 'filter', 'reduce', 'reduceRight', 'push', 'pop', 'reverse', 'sort', 'indexOf', 'lastIndexOf', 'join', 'slice', 'shift', 'unshift', 'concat', 'splice', 'toString', 'toLocaleString']],
				['Object', ['constructor', 'isPrototypeOf', 'toString', 'hasOwnProperty', 'propertyIsEnumerable', 'valueOf', 'toLocaleString', '__defineSetter__', '__lookupGetter__', '__defineGetter__', '__lookupSetter__' ]]
			] )
		}

		function test_dict()
		{ 
			assertSimilar( dictionary.heritage({foo:'bar', spam:'eggs'}), [
					['Object', ['foo', 'spam']], 
					['Object', ['constructor', 'isPrototypeOf', 'toString', 'hasOwnProperty', 'propertyIsEnumerable', 'valueOf', 'toLocaleString', '__defineSetter__', '__lookupGetter__', '__defineGetter__', '__lookupSetter__']]
			])}
		function test_object()
		{ 
			assertSimilar( dictionary.heritage( new Object() ), [
				['Object', []], 
				['Object', ['constructor', 'isPrototypeOf', 'toString', 'hasOwnProperty', 'propertyIsEnumerable', 'valueOf', 'toLocaleString', '__defineSetter__', '__lookupGetter__', '__defineGetter__', '__lookupSetter__']]
			])}
	}Test.UT.runAndCache( Test_heritage, 'dictionary.heritage' )


	function Test_expose()
	{
		function setUp()
		{
			object = {
				'__special__': 'you are special',
				'__secret'   : 'can you keep a secret?',
				'_private'   : 'EXCUSE ME!',
				'public'     : 'Hello World!',
				'delete_'    : 'avoid conflict with delete'}
		}


		function test_Special() { assertEqual( dictionary.expose( object, dictionary.API.Special ), {
			'__special__': 'you are special',
			'__secret'   : 'can you keep a secret?',
			'_private'   : 'EXCUSE ME!',
			'public'     : 'Hello World!',
			'delete_'    : 'avoid conflict with delete'} ) }

		function test_Secret() { assertEqual( dictionary.expose( object, dictionary.API.Secret ), {
			'__secret': 'can you keep a secret?',
			'_private': 'EXCUSE ME!',
			'public'  : 'Hello World!',
			'delete_' : 'avoid conflict with delete'} ) }

		function test_Private() { assertEqual( dictionary.expose( object, dictionary.API.Private ), {
			'_private': 'EXCUSE ME!',
			'public'  : 'Hello World!',
			'delete_' : 'avoid conflict with delete'} ) }

		function test_Public() { assertEqual( dictionary.expose( object, dictionary.API.Public ), {
			'public' : 'Hello World!',
			'delete_': 'avoid conflict with delete'} ) }

		function test_NoConflict() { assertEqual( dictionary.expose( object, dictionary.API.NoConflict ), {
			'delete_': 'avoid conflict with delete'} ) }
	}Test.UT.runAndCache( Test_expose, 'dictionary.expose' )


	function Test_dictionary_dictionaries()
	{
		function test_default  () { assertEqual( dictionary.extend({a:1, b:2}, {a: 3, c:4}), {a:1, b:2, c:4} ) }
		function test_update   () { assertEqual( dictionary.update({a:1, b:2}, {a: 3, c:4}), {a:3, b:2, c:4} ) }
		function test_default_n() { assertEqual( dictionary.extend({a:1, b:2}, [{a: 3, c:4}, {d: 3, e:4}]), {a:1, b:2, c:4, d:3, e:4} ) }
		function test_update_n () { assertEqual( dictionary.update({a:1, b:2}, [{a: 3, c:4}, {d: 3, e:4}]), {a:3, b:2, c:4, d:3, e:4} ) }
	}Test.UT.runAndCache( Test_dictionary_dictionaries, 'dictionary default and update' )
