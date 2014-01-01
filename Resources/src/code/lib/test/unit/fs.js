Ti.include('/src/code/lib/test/include.js')

	build     = require(TT.Module.Build)
	variable  = require(TT.Module.Var)
	functions = require(TT.Module.Fn)
	blob      = require(TT.Module.BLOb)
	fs        = require(TT.Module.FS)

	oFolder = null
	oFile   = null


	function Test_fs_assumtions()
	{
		function setUp()
		{
			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_assumtions')
			oFolder.createDirectory()
			oFile   = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_assumtions', 'test.txt')
			oFile.write('wa')
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}

		function test_type         () { assertIdentical( variable.type( Ti.Filesystem.getFile('src.txt') ), 'other' ) }
		function test_isObjectOther() { assertTrue     ( variable.isObjectOther(Ti.Filesystem.getFile('src.txt') ) ) }
// TODO	function test_isInstanceOf () { assertTrue     ( Ti.Filesystem.getFile('src.txt') instanceof Ti.Filesystem.File ) }
		function test_MIME_folder  () { assertIdentical( blob.MIME_get( oFolder.read() ), 'application/octet-stream' )  } // TODO on android?
		function test_MIME_file    () { assertIdentical( blob.MIME_get(   oFile.read() ), 'text/plain' )  }

		function test_text_folder  () { assertTrue     ( oFolder.read().text === '' )  }
		function test_text_file    () { assertIdentical(   oFile.read().text, 'wa' )  }

		function test_blobFile_folder() { assertIdentical( oFolder.read().nativePath, oFolder.nativePath ) }
		function test_blobFile_file  () { assertIdentical(   oFile.read().nativePath,   oFile.nativePath ) }
	}Test.UT.runAndCache( Test_fs_assumtions, 'fs assumtions' )


	function Test_fs_readonly()
	{
		function setUp()
		{
			resourcesReadOnly = !( build.Info.Environment == build.Environment.Prod )

			oDefault    = Ti.Filesystem.getFile()
			oROfolder   = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory) // Note that when running on the simulator, the resources directory may be writable, but it is not writable on device.
			oROfile     = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'test.txt')
			oROfile.write('wa')
			oROnoFolder = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'inexistingFolder')
			oROnoFile   = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'inexistingFile.invalid')

			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_readonly')
			oFolder.createDirectory()
			oFile   = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_readonly', 'test.txt')
			oFile.write('wa')

			oNoFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_readonly_inexisting')
			oNoFile   = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_readonly_inexisting', 'inexistingFile.invalid')
		}

		function tearDown()
		{
			if (oROfile) oFile.deleteFile()
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}


		function test_exists_readonly_folder           () { assertIdentical( oROfolder.exists()  , true  ) }
		function test_exists_readonly_file             () { assertIdentical( oROfile.exists()    , true  ) }
		function test_exists_readonly_inexisting_folder() { assertIdentical( oROnoFolder.exists(), false ) }
		function test_exists_readonly_inexisting_file  () { assertIdentical( oROnoFile.exists()  , false ) }

		function test_exists_default          () { assertIdentical( oDefault.exists() , true  ) }
		function test_exists_folder           () { assertIdentical( oFolder.exists()  , true  ) }
		function test_exists_file             () { assertIdentical( oFile.exists()    , true  ) }
		function test_exists_inexisting_folder() { assertIdentical( oNoFolder.exists(), false ) }
		function test_exists_inexisting_folder() { assertIdentical( oNoFile.exists()  , false ) }

	// DaFuq?
		function test_writable_inexisting_readonly_folder() { assertIdentical( oROnoFolder.writable, true ) }
		function test_writable_inexisting_readonly_file  () { assertIdentical( oROnoFile.writable  , true ) }
		function test_writable_inexisting_folder         () { assertIdentical( oNoFolder.writable  , true  ) }
		function test_writable_inexisting_file           () { assertIdentical( oNoFile.writable    , true  ) }
		function test_writable_readonly_folder           () { assertIdentical( oROfolder.writable  , resourcesReadOnly ) } 
		function test_writable_readonly_file             () { assertIdentical( oROfile.writable    , resourcesReadOnly ) }

		function test_writable_default() { assertIdentical( oDefault.writable, true  ) }
		function test_writable_folder () { assertIdentical( oFolder.writable , true  ) }
		function test_writable_file   () { assertIdentical( oFile.writable   , true  ) }

		function test_isResource_readonly_folder() { assertIdentical( fs.isResource(oROfolder), true  ) }
		function test_isResource_readonly_file  () { assertIdentical( fs.isResource(oROfile)  , true  ) }
		function test_isResource_folder         () { assertIdentical( fs.isResource(oFolder)  , false ) }
		function test_isResource_file           () { assertIdentical( fs.isResource(oFile)    , false ) }

	// the following is now homogenic in all dev environments
		function test_isWritable_readonly_folder() { assertIdentical( fs.isWritable(oROfolder), false ) }
		function test_isWritable_readonly_file  () { assertIdentical( fs.isWritable(oROfile)  , false ) }
		function test_isWritable_folder         () { assertIdentical( fs.isWritable(oFolder)  , true  ) }
		function test_isWritable_file           () { assertIdentical( fs.isWritable(oFile)    , true  ) }
	}Test.UT.runAndCache( Test_fs_readonly, 'fs readonly' )


	function Test_fs_path_build()
	{
		function test_array_1() { assertIdentical( fs.path_build(['wa']              ), '/wa' ) }
		function test_array_2() { assertIdentical( fs.path_build(['wa', 'foo']       ), '/wa/foo') }
		function test_array_3() { assertIdentical( fs.path_build(['wa', 'foo', 'wii']), '/wa/foo/wii') }

		function test_args_1() { assertIdentical( fs.path_build('wa'              ), 'wa' ) } // it assumes is already a path
		function test_args_2() { assertIdentical( fs.path_build('wa', 'foo'       ), '/wa/foo') }
		function test_args_3() { assertIdentical( fs.path_build('wa', 'foo', 'wii'), '/wa/foo/wii') }
	}Test.UT.runAndCache( Test_fs_path_build, 'fs.path_build' )


	function Test_fs_file()
	{
		function get() { return functions.fwd( fs.get, arguments ) }
		function assertFile()
		{
			oF  = functions.fwd( fs.get, arguments )
			oF2 = functions.fwd( Ti.Filesystem.getFile, arguments )
			assertIdentical( variable.hash(oF), variable.hash(oF2) )
			assertIdentical( oF.nativePath, oF2.nativePath )
			assertIdentical( oF.resolve() , oF2.resolve()  )	
		}

		function test_string () {    assertFile('src.txt') }
		function test_strings() {    assertIdentical( variable.hash(get('wa', 'src.txt'))  , variable.hash(Ti.Filesystem.getFile('wa', 'src.txt')) ) }
		function test_array  () {    assertIdentical( variable.hash(get(['wa', 'src.txt'])), variable.hash(Ti.Filesystem.getFile('wa', 'src.txt')) ) }
// TODO	function test_error  () { assertNotEqual( variable.hash(getF('img.jpg')), variable.hash(Ti.Filesystem.getFile('wa', 'src.txt')) ) }
	}Test.UT.runAndCache( Test_fs_file, 'fs.file' )


	function Test_fs_exists() 
	{
		function setUp()
		{
			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_exists')
			oFolder.createDirectory()
			oFile   = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_exists', 'test.txt')
			oFile.write('wa')
			oImage = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'KS_nav_ui.png')
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}

// TODO	function test_exists_null        () { assertTrue ( fs.exists() ) }
		function test_exists_false       () { assertFalse( fs.exists('wable') ) }
		function test_exists_false_folder() { assertFalse( fs.exists( Ti.Filesystem.tempDirectory, 't_mp3' ) ) }
		function test_exists_false_file  () { assertFalse( fs.exists( Ti.Filesystem.getFile('t_mp3.txt') ) ) }
		function test_exists_true_folder () { assertTrue ( fs.exists(oFolder) ) }
		function test_exists_true_file   () { assertTrue ( fs.exists(oFile) ) }

		function test_getDirectoryListing_folder() { assertEqual    ( oFolder.getDirectoryListing(), ['test.txt'] ) }
		function test_getDirectoryListing_file  () { assertUndefined(   oFile.getDirectoryListing() ) }

		function test_isFolder_folder() { assertIdentical( fs.isFolder(oFolder), true ) }
		function test_isFolder_file  () { assertIdentical( fs.isFolder(oFile)  , null ) }
		function test_isFile_file    () { assertIdentical( fs.isFile  (oFile)  , true ) }
		function test_isFile_folder  () { assertIdentical( fs.isFile  (oFolder), false ) }

		function test_read_folder() { assertEqual( oFolder.read(), {} ) }
		function test_read_file() 
		{
			oF = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_exists', 'tmp2.txt')
			oF.write('')
			assertEqual( oF.read(), {} )
			oF.deleteFile()
		}

		function test_isDocument_text () { assertTrue ( blob.isDocument(  oFile.read() ) ) }
		function test_isDocument_image() { assertFalse( blob.isDocument( oImage.read() ) ) }

		function test_isImage_text () { assertFalse( blob.isImage(  oFile.read() ) ) }
		function test_isImage_image() { assertTrue ( blob.isImage( oImage.read() ) ) }
	}Test.UT.runAndCache( Test_fs_exists, 'fs exists' )


	function Test_fs_RoN()
	{
		function setUp()
		{
			oFolder = fs.folder_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_RoN'])
			oFolder.createDirectory()
			oFile   = fs.file_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_RoN', 'tmp.txt'])
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}
		function test_folder_RoN_exists      () { assertTrue( fs.exists(oFolder) ) }
		function test_file_RoN_exists        () { assertTrue( fs.exists(oFile) ) }
	}Test.UT.runAndCache( Test_fs_RoN, 'fs RoN' )


	function Test_fs_subFolders()
	{
		function setUp()
		{
			oFolder = fs.folder_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_subFolders'])
					  fs.folder_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_subFolders', 'sub1'])
					  fs.folder_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_subFolders', 'sub2'])
					  fs.folder_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_subFolders', 'sub3'])
			oFile   = fs.get(Ti.Filesystem.tempDirectory, 'Test_fs_subFolders', 'tmp.txt')
			oFile.write('Le Puaso')
			 path   = fs.path(oFolder)
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}

		function test_subF() { 
			assertEqual( fs.subF(oFolder),
				{
					'sub1'   : path + '/sub1',
					'sub2'   : path + '/sub2',
					'sub3'   : path + '/sub3',
					'tmp.txt': path + '/tmp.txt',
				} ) }

		function test_isNameInDirectory_folder  () { assertTrue ( fs.isNameInDirectory( 'sub1'   , oFolder ) ) }
		function test_isNameInDirectory_file    () { assertFalse( fs.isNameInDirectory( 'tmp'    , oFolder ) ) }
		function test_isNameInDirectory_file_ext() { assertTrue ( fs.isNameInDirectory( 'tmp.txt', oFolder ) ) }
	}Test.UT.runAndCache( Test_fs_subFolders, 'fs subFolders' )


	function Test_fs_delete() 
	{
		function setUp()
		{
			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_exists')
			oFolder.createDirectory()
			oFile   = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_exists', 'test.txt')
			oFile.write('wa')
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}

		function test_deleteFolder_exists() { assertTrue ( fs.exists(oFolder) ) }
		function test_deleteFolder_folder() { assertTrue ( fs.exists( fs.deleteFolder(oFolder) ) ) }
		function test_deleteFolder_both  () { fs.deleteFile(oFile); 
											  assertFalse( fs.exists( fs.deleteFolder(oFolder) ) ) }
		function test_deleteFolder_file  () { assertTrue ( fs.exists( fs.deleteFolder(oFile) ) ) }

		function test_deleteFile_exists() { assertTrue ( fs.exists(oFile) ) }
		function test_deleteFile_file  () { assertFalse( fs.exists( fs.deleteFile(oFile) ) ) }
		function test_deleteFile_folder() { assertTrue ( fs.exists( fs.deleteFile(oFolder) ) ) }

		function test_disposeF_folder() { fs.deleteFile(oFile);
										  assertFalse( fs.exists( fs.dispose(oFolder) ) ) }
		function test_disposeF_file  () { assertFalse( fs.exists( fs.dispose(oFile) ) ) }
	}Test.UT.runAndCache( Test_fs_delete, 'fs delete' )


	function Test_fs_read()
	{
		function setUp()
		{
			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_read')
			oFolder.createDirectory()
			oFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_read', 'tmp.txt')
			oFile.write('QWERTYUIOPasdfghjkl')
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}

		function test_read        () { assertEqual    ( fs.read        (Ti.Filesystem.tempDirectory, 'Test_fs_read', 'tmp.txt'), {} ) }
		function test_readText    () { assertIdentical( fs.readText    (Ti.Filesystem.tempDirectory, 'Test_fs_read', 'tmp.txt'), 'QWERTYUIOPasdfghjkl' ) }
		function test_readAndClose() { assertIdentical( fs.readAndClose(Ti.Filesystem.tempDirectory, 'Test_fs_read', 'tmp.txt'), 'QWERTYUIOPasdfghjkl' ) }
	}Test.UT.runAndCache( Test_fs_read, 'fs read' )


	function Test_fs_write()
	{
		function test_setUp()
		{
			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_write')
			oFolder.createDirectory()
			oFile = fs.file_RoN([Ti.Filesystem.tempDirectory, 'Test_fs_write', 'tmp.txt'])
		}

		function test_write_default() 
		{ 
			fs.write( oFile, 'waa' )
			assertIdentical( fs.readText(oFile), 'waa' ) 
		}

		function test_write_append()
		{ 
			fs.write( oFile, 'wiru', true )
			assertIdentical( fs.readText(oFile), 'waawiru' ) 
		}

		function test_write_write()
		{ 
			fs.write( oFile, 'yahoo', false )
			assertIdentical( fs.readText(oFile), 'yahoo' ) 
		}

		function test_log()
		{
			fs.log( oFile, 'hehehe' )
			assertIdentical( fs.readText(oFile), 'yahoo\nhehehe' )
		}

		function test_file_copy()
		{
			oFile2 = fs.file_copy( oFile, [Ti.Filesystem.tempDirectory, 'Test_fs_write', 'tmp2.txt']  )
			assertNotIdentical( oFile.nativePath, oFile2.nativePath )
			assertIdentical   ( fs.readText(oFile), fs.readText(oFile2) )
		}

		function test_tearDown()
		{
			if (oFile)    oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}

	}Test.UT.runAndCache( Test_fs_write, 'fs write' )


	function Test_fs_move()
	{
		function setUp()
		{
			oFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_move')
			oFolder.createDirectory()
			oSubFolder = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_move', 'subFolder')
			oSubFolder.createDirectory()
			oSubFolder2 = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_move', 'subFolder2')
			oSubFolder2.createDirectory()
			oFile = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory, 'Test_fs_move', 'tmp.txt')
			oFile.write('wa')
		}

		function tearDown()
		{
			if (oFile)   oFile.deleteFile()
			if (oFolder) oFolder.deleteDirectory(true)
		}


		function test_rename_folder() { assertTrue( oSubFolder.rename('subFolder3') ) }
		function test_rename_file  () { assertTrue(      oFile.rename('tmp2.txt') ) }

		function test_move_folder() { assertTrue( oSubFolder.move( Ti.Filesystem.tempDirectory +  '/Test_fs_move/subFolder3' ) ) }
		function test_move_file  () { assertTrue(      oFile.move( Ti.Filesystem.tempDirectory +  '/Test_fs_move/subFolder/tmp3.txt' ) ) }

		function test_fs_rename_folder() { assertTrue( fs.exists( fs.rename( oSubFolder, 'subFolder3' ) ) ) }
		function test_fs_rename_file  () { assertTrue( fs.exists( fs.rename( oFile     , 'tmp2.txt'   ) ) ) }

		function test_fs_move_folder() { assertTrue( fs.exists( fs.move( oSubFolder, [ Ti.Filesystem.tempDirectory, 'Test_fs_move', 'subFolder3'] ) ) ) }
		function test_fs_move_file  () { assertTrue( fs.exists( fs.move( oFile     , [ Ti.Filesystem.tempDirectory, 'Test_fs_move', 'subFolder', 'tmp3.txt' ] ) ) ) }
	}Test.UT.runAndCache( Test_fs_move, 'fs move' )