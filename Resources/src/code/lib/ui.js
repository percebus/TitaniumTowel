Ti.include('/src/code/lib/include.js')
var compare    = TT.require(TT.Module.Compare)
var validate   = TT.require(TT.Module.Validate)
var dictionary = TT.require(TT.Module.Dictionary)
var collection = TT.require(TT.Module.Collection)
var container  = TT.require(TT.Module.Container)


	var Attribute = exports.Attribute = {
			width : 'width',
			height: 'height',
			top   : 'top',
			right : 'right',
			bottom: 'bottom',
			left  : 'left',
			content:{
				Width : 'contentWidth',
				Height: 'contentHeight' }}

	var DIMENSIONS = exports.DIMENSIONS = [ exports.Attribute.width, exports.Attribute.height ]
	var DIMENSIONS_CONTENT = exports.DIMENSIONS_CONTENT = [ exports.Attribute.content.Width, exports.Attribute.content.Height ]
	var MARGINS = exports.MARGINS = [ exports.Attribute.top, exports.Attribute.right, exports.Attribute.bottom, exports.Attribute.left ]

	var Layout = {
			zIndex    : null,
			horizontal: 'horizontal',
			vertical  : 'vertical'}
		Layout.default_ = Layout.zIndex
	exports.Layout = Layout

	var AdjustTo = {
			parent  : Ti.UI.FILL,
			children: Ti.UI.SIZE }
		AdjustTo.default_ = AdjustTo.children
	exports.AdjustTo = AdjustTo

	var Align = exports.Align = {
			horizontal: {layout: exports.Layout.horizontal},
			vertical  : {layout: exports.Layout.vertical}}

	var Azimuth = exports.Azimuth = {
			N : '00:00',
			NE: '01:30',
			 E: '03:00',
			SE: '04:30',
			S : '06:00',
			SW: '07:30',
			 W: '09:00',
			NW: '11:30' }

	var Position = exports.Position = {
			N :   exports.Attribute.top,
			NE: [ exports.Attribute.top, exports.Attribute.right ],
			 E:   exports.Attribute.right,
			SE: [ exports.Attribute.right,exports.Attribute.bottom ],
			S :   exports.Attribute.bottom,
			SW: [ exports.Attribute.bottom, exports.Attribute.left ],
			 W:   exports.Attribute.left,
			NW: [ exports.Attribute.left, exports.Attribute.top ],
			horizontal: [ exports.Attribute.left, exports.Attribute.right  ],
			vertical  : [ exports.Attribute.top , exports.Attribute.bottom ] }


	function getScrollIndicator( x, y )
	{
		var x = compare.defaultBoolean( x, false )
		var y = compare.defaultBoolean( y, false )
	return {
		showHorizontalScrollIndicator: x,
		  showVerticalScrollIndicator: y }
	}exports.getScrollIndicator = getScrollIndicator


	function getScrollIndicatorLayout(y)
	{
		var isVertical = compare.boolCast(y)
	return exports.getScrollIndicator( !isVertical, isVertical )
	}exports.getScrollIndicatorLayout = getScrollIndicatorLayout


	var ScrollIndicator = exports.ScrollIndicator = {
			both      : exports.getScrollIndicator( true , true ),
			none      : exports.getScrollIndicator( false, false ),
			vertical  : exports.getScrollIndicatorLayout(true),
			horizontal: exports.getScrollIndicatorLayout(false) }


	function width_height( width, height )
	{
	return collection.listsToDict( arguments, exports.DIMENSIONS )
	}exports.width_height = exports.dimensions = width_height


	function contentWidth_contentHeight( contentWidth, contentHeight )
	{
	return collection.listsToDict( arguments, exports.DIMENSIONS_CONTENT )
	}exports.contentWidth_contentHeight = exports.contentDimensions = contentWidth_contentHeight


	function top_bottom( top, bottom )
	{
	return collection.listsToDict( arguments, exports.Position.vertical ) 
	}exports.top_bottom = exports.marginY = top_bottom


	function left_right( left, right )
	{
	return collection.listsToDict( arguments, exports.Position.horizontal ) 
	}exports.left_right = exports.marginX = left_right


	function margins( top, right, bottom, left )
	{
	return collection.listsToDict( arguments, exports.MARGINS )
	}exports.margins = margins


	function getMargins( x, attributes )
	{ // margins( 3, {top: 5}) will return {top: 5, right: 3, bottom: 3, left: 3}
validate.isNotNothing( x         , 'UI.getMargins.x          is False for isNotNothing' )
validate.isAttributes( attributes, 'UI.getMargins.attributes is False for isAttributes' )
	return dictionary.update( attributes, collection.listsToDict( exports.MARGINS, x ) )
	}exports.getMargins = getMargins


	function getDimension(x) { return exports.width_height( x, x ) }
	 exports.getDimension = exports.square = exports.dimension = getDimension

	function getDimensionContent(x) { return exports.contentWidth_contentHeight( x, x ) }
	 exports.getDimensionContent = exports.dimensionContent = getDimensionContent


	function getMargin(x) { return exports.getMargins(x) }
	 exports.getMargin = exports.margin = getMargin


	var Size = exports.Size = {
			parent    : exports.getDimension(exports.AdjustTo.parent),
			children  : exports.getDimension(exports.AdjustTo.children),
			horizontal: {width: exports.AdjustTo.parent  , height: exports.AdjustTo.children},
			vertical  : {width: exports.AdjustTo.children, height: exports.AdjustTo.parent }}

	var ContentSize = exports.ContentSize = {
			parent    : exports.getDimensionContent(exports.AdjustTo.parent),
			children  : exports.getDimensionContent(exports.AdjustTo.children),
			horizontal: {contentWidth: exports.AdjustTo.parent  , contentHeight: exports.AdjustTo.children},
			vertical  : {contentWidth: exports.AdjustTo.children, contentHeight: exports.AdjustTo.parent }}

	var Distribution = exports.Distribution = { 
			Stack: dictionary.update(  null,  [exports.Align.vertical  , exports.Size.horizontal] ),
			Float: dictionary.update(  null,  [exports.Align.horizontal, exports.Size.horizontal] )}


