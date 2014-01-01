Ti.include('/src/code/lib/test/include.js')

	variable = require('src/code/lib/var')
	fs       = require('src/code/lib/fs')
	paths    = require('src/code/lib/path')


	function Test_path_RoN()
	{
		function setUp()
		{
			pathFolder = [Ti.Filesystem.tempDirectory, 'Test_path_RoN', 'subFolder', 'subSubFolder']
			pathFile   = [Ti.Filesystem.tempDirectory, 'Test_path_RoN', 'subFolder', 'subSubFolder', 'tmp3.txt']
		}

		function tearDown()
		{
			oFolder = fs.getF(Ti.Filesystem.tempDirectory, 'Test_path_RoN')
			oFolder.deleteDirectory(true)
		}


		function test_pathRoN    () { assertTrue( fs.exists( paths.path_RoN(pathFolder) ) ) }
		function test_filePathRoN() { assertTrue( fs.exists( paths.path_file_RoN(pathFile) ) ) }
		function test_pathDelete ()
		{
			paths.path_RoN(pathFolder)
			assertTrue ( fs.exists(pathFolder) )
			paths.remove( [Ti.Filesystem.tempDirectory, 'Test_path_RoN'] )
			assertFalse( fs.exists(pathFolder) )
		}
	}Test.UT.runAndCache( Test_path_RoN, 'path RoN' )
