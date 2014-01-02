// require('src/include/require_once').monkeypatch(this) // XXX ?
var exports = exports || {};

    var PATH  = 'src/code/towel/';

    var Path = exports.Path = {
            TT   : PATH,
            Third: 'src/code/'};


    var Module = { // just in case we decide to move the files from place
        // basic
            Lorem        : PATH + 'lorem',
            Color        : PATH + 'color',
            UID          : PATH + 'uid',
            Font         : PATH + 'font',
            Log          : PATH + 'log',
            Import       : PATH + 'import',
            Native       : PATH + 'native',
            Cast         : PATH + 'cast',
        // build
            Titanium     : PATH + 'titanium',
            Build        : PATH + 'build',
            OS           : PATH + 'os', // detect Operating system
            Application  : PATH + 'application',
        // variables
            Compare      : PATH + 'compare',
            Validate     : PATH + 'validate',
            Math_        : PATH + 'math',
        // structures
            Suscriptible : PATH + 'suscriptible',
			Sort         : PATH + 'sort',
			Sequence     : PATH + 'sequence', 
			Dictionary   : PATH + 'dictionary',
			Collection   : PATH + 'collection', 
			Iterable     : PATH + 'iterable',
			Recursive    : PATH + 'recursive',
			OOP          : PATH + 'oop',
			Str          : PATH + 'string',
			Ext          : PATH + 'ext',
			ASCII        : PATH + 'ascii',
			Name         : PATH + 'name',
			RegEx        : PATH + 'regexp',
			DateTime     : PATH + 'date',
			Time         : PATH + 'time',
			Locale       : PATH + 'locale',
		// fn delegation
			Fn           : PATH + 'function',
			Cross        : PATH + 'cross',
		// Reliable Vars layer
			Data         : PATH + 'data',
			Var          : PATH + 'var',
			Assert       : PATH + 'assert',
			JSON         : PATH + 'json',
		// Data
			Global       : PATH + 'global',
			AppProperties: PATH + 'AppProperties',
			Event        : PATH + 'event',
		// memory management
			Mem          : PATH + 'mem',
			BLOb         : PATH + 'blob',
		// File System
			FS           : PATH + 'fs',
			Path         : PATH + 'path',
		// Data structures
			URI          : PATH + 'uri',
			SQLess       : PATH + 'sqless',
		// Advanced data management
			Stream       : PATH + 'stream',
			NW           : PATH + 'nw',
		// other
			Unit         : PATH + 'unit',
			Test         : PATH + 'test',
			ISO8601      : Path.Third + 'iso8601',
			underscore   : Path.Third + 'underscore.1.3.3',
			jsunity      : Path.Third + 'jsunity.0.6',
		// UI
			Display      : PATH + 'display',
			Orientation  : PATH + 'orientation',
			Container    : PATH + 'container',
			UI           : PATH + 'ui'};
			Module.Debug = Module.Log; // XXX
			Module.Session = Module.AppProperties;
	exports.Module = Module;

var logger = require(exports.Module.Log);

    function require_(x) 
    {
logger.debug( 'requiring', x, true );
return require(x);
    }exports.require = require_;

logger.info( 'Titanium Towel modules', exports.Module);
