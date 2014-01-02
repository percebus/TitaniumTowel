Ti.API.debug('app.BoF');
Ti.include('/src/include.js');

var controllers      = importer.index(project.Module.Controller);
var controller_tests = importer.includeOnce(controllers.Controller.Tests);
	controller_tests.init();
 
logger.debug('app.EoF');