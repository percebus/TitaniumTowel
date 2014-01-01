var exports = exports || {}

	var PATH = 'src/'

	var Module = exports.Module = {
			Env       : PATH + 'env',
			Mock      : PATH + 'mock',
			Lib       : PATH + 'code/lib',
			Import    : PATH + 'code/lib/import',
			Config    : PATH + 'cfg/default',
			Img       : PATH + 'cfg/img',
			UI        : PATH + 'ui',
			Theme     : PATH + 'style', // originally was in UI, but a Theme/Style affects files as well
			Business  : PATH + 'business',
			Tech      : PATH + 'tech',
			Controller: PATH + 'controller',
			Test      : PATH + 'test'}
