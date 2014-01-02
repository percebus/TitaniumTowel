Ti.API.info('src.controller.BoF');
Ti.include('/src/include.js');


    function init()
    {
logger.debug('src.controller.tests.init.BoC');

importer.includeOnce(lib.Module.Build); // show build info

var orientation = importer.includeOnce(lib.Module.Orientation);
    orientation.toggleStatusbarOnOrientationChange();

var tests = importer.index(project.Module.Test);
importer.includeOnce(tests.Module.Default); // run tests

logger.debug('src.controller.tests.init.EoC');
    }exports.init = init;


logger.debug('src.controller.tests.EoF');