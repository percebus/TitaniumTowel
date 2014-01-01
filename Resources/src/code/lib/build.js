Ti.include('/src/code/lib/include.js')
var os      = TT.require(TT.Module.OS)
var appData = TT.require(TT.Module.Application)

	var Environment = exports.Environment = {
			Test: 'test',
			Dev : 'development',
			UAT : 'UAT',
			Prod: 'production' }

	var Info = exports.Info = {
			Build: {
				DateTime: Ti.buildDate,
				Hash    : Ti.buildHash },
			Environment: Ti.App.deployType,
			OS: {
				Name: os.name,
				Type: os.type }}

debug.log( 'build', Info )
