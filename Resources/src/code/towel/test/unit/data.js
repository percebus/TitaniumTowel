Ti.include('/src/code/towel/test/include.js');

	data = require(TT.Module.Data);


	function Test_data_entriesToDict()
	{
		function test_entriesToDict_WCF(){ assertEqual( data.entriesToDict_WCF( [{'Key':'propertyC', 'Value':1}, {'Key':'methodC', 'Value':'false'}, {'Key':'propertyD', 'Value':'seriously?'}] ), {'propertyC':1, 'methodC':'false', 'propertyD':'seriously?'} ) }
	}Test.UT.runAndCache( Test_data_entriesToDict, 'data.entriesToDict_WCF' )


	function Test_data_pluralize()
	{
		function test_1        () { assertIdentical( data.pluralize('year', 1       ), 'year'  ) }
		function test_n        () { assertIdentical( data.pluralize('year', 2       ), 'years' ) }
		function test_complex_1() { assertIdentical( data.pluralize('man' , 1, 'men'), 'man'   ) }
		function test_complex_n() { assertIdentical( data.pluralize('man' , 2, 'men'), 'men'   ) }
	}Test.UT.runAndCache( Test_data_pluralize, 'data.pluralize' )


	function Test_data_rename()
	{
		function test_1() { assertEqual( data.rename({name: 'Juan', lastName: 'Guerrero'}, {name: 'nombre', lastName: 'appelido'}),  {nombre: 'Juan', apellido: 'Guerrero'}  ) }
	}Test.UT.runAndCache( Test_data_pluralize, 'data.pluralize' )
