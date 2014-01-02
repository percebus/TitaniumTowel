console.debug('src.include.BoF');

var project  = require('src/index');
var importer = require(project.Module.Import);
var lib      = importer.index(  project.Module.TT);
var envs     = importer.includeOnce(project.Module.Env);
var logger   = importer.includeOnce(lib.Module.Log);
var builtin  = importer.includeOnce(lib.Module.Native);
var exports  = exports || {};

logger.debug('src.include.EoF');