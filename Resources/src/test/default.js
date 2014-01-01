Ti.include('/src/test/include.js')
var tests = importer.index(project.Module.Test)
importer.includeOnce(tests.Module.Unit)
// importer.includeOnce(tests.Module.Integration)