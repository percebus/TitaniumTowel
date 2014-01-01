Ti.API.info('src.controller.BoF')
Ti.include('/src/include.js')

	function init()
	{
logger.debug('src.controller.init.BoC')

var orientation = importer.includeOnce(lib.Module.Orientation)
  	orientation.toggleStatusbarOnOrientationChange()

logger.debug('src.controller.init.EoC')
	}exports.init = init

logger.debug('src.controller.EoF')