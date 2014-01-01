exports.monkeypatch = function(object) {// https://gist.github.com/1093947
	var scriptRegistry = {},
		old_require = object.require;
	object.require = function(moduleName) {
		if (!scriptRegistry[moduleName]) {
			var mod = old_require(moduleName),
				moduleRoot = moduleName.split(/[\/ ]+/).pop();
			if (typeof(mod[moduleRoot]) === 'function') {
				scriptRegistry[moduleName] = mod[moduleRoot];
			}
			else {
				scriptRegistry[moduleName] = mod;
			}	
		}
		return scriptRegistry[moduleName];
	};
};