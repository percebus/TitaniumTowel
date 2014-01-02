Ti.include('/src/code/towel/include.js');
var cast = TT.require(TT.Module.Cast);

	var Version = exports.Version = {
			'2.1.1': new Date('2012/07/31'),
			'2.1.0': new Date('2012/06/29'),
			'2.0.2': new Date('2012/05/31'),
			'2.0.1': new Date('2012/04/17') };

	var Feature = exports.Feature = {
			Ti: {
				App: {
					Properties: {
						getObject: Version['2.1.0'],
						setObject: Version['2.1.0'] }}}};

	var Handler = exports.Handler = {
			Event  : Ti.App,
			Session: Ti.App.Properties,
			UI     : Ti.UI,
			Locale : Ti.Locale,
			Mem    : Ti.Platform };

	var Current = exports.Current = {
			win: Ti.UI.currentWindow,
			tab: Ti.UI.currentTab };


	var Info = exports.Info = {
			Release: {
				Version : Ti.version,
				DateTime: exports.Version[Ti.version] || cast.now() }};

logger.info('Titanium SDK', Info);



	var TiUI_PREFIX = 'TiUI';
	var TiUI_SUFFIX = 'View';

	var Ti_ = exports.Ti = {
			UI: {
				_prefix     : TiUI_PREFIX,
				_suffix     : TiUI_SUFFIX,
				View        : TiUI_PREFIX                + TiUI_SUFFIX,
				Image_      : TiUI_PREFIX + 'Image'      + TiUI_SUFFIX,
				Scroll      : TiUI_PREFIX + 'Scroll'     + TiUI_SUFFIX,
				Scrollable  : TiUI_PREFIX + 'Scrollable' + TiUI_SUFFIX,
				Table       : TiUI_PREFIX + 'Table'      + TiUI_SUFFIX,
				TableSection: TiUI_PREFIX + 'Table'      + TiUI_SUFFIX + 'Section',
				TableRow    : TiUI_PREFIX + 'Table'      + TiUI_SUFFIX + 'Row' ,
				Window      : TiUI_PREFIX + 'Window',
				Button_     : TiUI_PREFIX + 'Button',
				ButtonBar   : TiUI_PREFIX + 'BurronBar',
				Label       : TiUI_PREFIX + 'Label',
				OptionDialog: TiUI_PREFIX + 'OptionDialog',
				SearchBar   : TiUI_PREFIX + 'SearchBar',
				Slider      : TiUI_PREFIX + 'Slider',
				Switch      : TiUI_PREFIX + 'Switch',
				TabbedBar   : TiUI_PREFIX + 'TabbedBar',
				TextArea    : TiUI_PREFIX + 'TextArea',
				TextField   : TiUI_PREFIX + 'TextField' ,
				TabGroup    : TiUI_PREFIX + 'TabGroup',
				Tab         : TiUI_PREFIX + 'Tab' ,
				Picker      : TiUI_PREFIX + 'Picker',
				PickerColumn: TiUI_PREFIX + 'PickerColumn',
				PickerRow   : TiUI_PREFIX + 'PickerRow'  }};
