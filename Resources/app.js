Ti.API.debug('app.BoF');
Ti.include('/src/include.js');
importer.includeOnce(lib.Module.Build);

var controller = importer.includeOnce(project.Module.Controller);
	controller.init();

var tests = importer.index(project.Module.Test);
importer.includeOnce(tests.Module.Default);

logger.debug('app.EoF');