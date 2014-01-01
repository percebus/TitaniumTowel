Ti.include('/src/code/lib/include.js')
var compare      = TT.require(TT.Module.Compare)
var validate     = TT.require(TT.Module.Validate)
var math         = TT.require(TT.Module.Math_)
var sequence     = TT.require(TT.Module.Sequence)
var dictionary   = TT.require(TT.Module.Dictionary)
var collection   = TT.require(TT.Module.Collection)
var str          = TT.require(TT.Module.Str)
var regExp       = TT.require(TT.Module.RegEx)
var functions    = TT.require(TT.Module.Fn)
var data         = TT.require(TT.Module.Data)
// var parseISO8601 = TT.require(TT.Module.ISO8601).parseISO8601Date

exports.now = compare.now

	var DatePart = exports.DatePart = { // precision points
			year       : 'year',
			month      : 'month',
			day        : 'day',

			week       : 'week',
			weekDay    : 'weekDay',

			hour       : 'hour',
			minute     : 'minute',
			second     : 'second',
			milliSecond: 'milliSecond' }

	var DateInitial = exports.DateInitial = {
			year       : 'Y',
			month      : 'M',
			day        : 'D',
			week       : 'W',
			hour       : 'h',
			minute     : 'm',
			second     : 's',
			milliSecond: 'ms' }


	function storedToRepresented(x) { return x +1 } // Month 0-11 O.o?? 1-12 n,n
	 exports.storedToRepresented = storedToRepresented

	function representedToStored(x) { return x -1 }
	 exports.representedToStored = representedToStored

	var quirks = exports.quirks = [ exports.DatePart.month, exports.DatePart.weekDay ]

	var DateFormat = exports.DateFormat = {
			'short' : 'short',
			'medium': 'medium',
			'long'  : 'long' }

// TODO add ^/$ ?
	var DateRegexp = {
			Any        : /\d+/,
			Year       : /\d{4}/,
			Month      : /[0-1]?[0-9]/, // 1 - 12
			Day        : /[0-3]?[0-9]/, // 1 - 31
			Hour       : /[0-2]?[0-9]/, // 0 - 24
			Twelve     : /[0-1]?[0-9]/, // 1 - 12
			PM         : /(AM|PM)/, // AM | PM
			Minute     : /[0-5]?[0-9]/, // 0 - 59
			Second     : /[0-5]?[0-9]/, // 0 - 59
			MilliSecond: /\d{1,3}/, // 0 - 999
			Tics       : /\d+/,
			GMT        : /(\+|\-)/, // + or -
			Nixon      : /\//, // /
			Separator: {
				Day: {
					Hyphen: /-/, // -
					Slash: /\//, //  /
					Any: /(\-|\/)/ // - or /
				},
				DayTime: {
					Space: /\s/,
					ISO  : /T/ 
				},
				Time: {
					Colon: /:/
				}
			},
			YYYYMMDD: {},
			Time: {},
			MS: {}
		}
		DateRegexp.YYYYMMDD.List   = [DateRegexp.Year, DateRegexp.Month, DateRegexp.Day]
		DateRegexp.Time.List       = [DateRegexp.Hour, DateRegexp.Minute, DateRegexp.Second]
//		DateRegexp.Time.Any        = regExp.concat( DateRegexp.Hour, ':', DateRegexp.Minute, regExp.optional( regExp.concat(':', DateRegexp.Second, regExp.optional( regExp.concat('.', DateRegexp.MilliSecond) ) ) ) )
		DateRegexp.MS.GMT          = regExp.concat( DateRegexp.GMT, /\d{2,4}/ )
		DateRegexp.YYYYMMDD.Hyphen = regExp.join( DateRegexp.YYYYMMDD.List, '-' )
		DateRegexp.YYYYMMDD.Slash  = regExp.join( DateRegexp.YYYYMMDD.List, '/' )
		DateRegexp.YYYYMMDD.Any    = regExp.join( DateRegexp.YYYYMMDD.List, DateRegexp.Separator.Day.Any )
		DateRegexp.MS = {
			Any: regExp.concat( DateRegexp.Nixon, /Date\(\d+/, '(', (DateRegexp.MS.GMT), ')?', /\)/, DateRegexp.Nixon ),
			UTC: regExp.concat( DateRegexp.Nixon, /Date\(\d+/,                                 /\)/, DateRegexp.Nixon ),
		}
		DateRegexp.ISO8601 = {
			Any: /\d{4}(-?\d{2}){2}(T\d{2}(:?\d{2}){2}(\.\d{0,3})?Z?)?/
		}

		DateRegexp.JSON = {
			List: [ DateRegexp.YYYYMMDD.Any, DateRegexp.ISO8601.Any, DateRegexp.MS.Any ]
		}
	exports.DateRegexp = DateRegexp

	var Order = {
			Day : [ exports.DatePart.year, exports.DatePart.month, exports.DatePart.day ],
			Time: [ exports.DatePart.hour, exports.DatePart.minute, exports.DatePart.second, exports.DatePart.milliSecond ]}
	    Order.DateTime = sequence.concat( Order.Day, Order.Time )
	    Order.Period   = sequence.concat( [exports.DatePart.year, exports.DatePart.month, exports.DatePart.week, exports.DatePart.day], Order.Time )
	exports.Order = Order

logger.info( 'dateTime.Order', exports.Order )

	var Digits = exports.Digits = {
			year       : 4, //1970-2070
			month      : 2, //1-12
			day        : 2, //1-31

			weekDay    : 1, //1-7

			hour       : 2, //0-23
			minute     : 2, //0-59
			second     : 2, //0-59
			milliSecond: 3  //0-999 
		}

	var DayPart = exports.DayPart = {
			MidNight:  0,
			SunRise :  6,
			Noon    : 12,
			SunSet  : 18 }

	var MidNight = exports.MidNight = {
			hour       : 0,
			minute     : 0,
			second     : 0,
			milliSecond: 0 }

	var Day1 = exports.Day1 = {
			year : 1970,
			month:    1,
			day  :    1 }


// Since Beginning of Time (not really, January 1st of 1970)
	var BoT = exports.BoT = dictionary.update( dictionary.copy(exports.Day1), exports.MidNight )


	var WeekDay = exports.WeekDay = {
			Sunday   : 1,
			Monday   : 2,
			Tuesday  : 3,
			Wednesday: 4,
			Thursday : 5,
			Friday   : 6,
			Saturday : 7 }

	var Month = exports.Month = {
			January  :  1,
			February :  2,
			March    :  3, 
			April    :  4,
			May      :  5,
			June     :  6,
			July     :  7,
			August   :  8,
			September:  9,
			October  : 10,
			November : 11,
			December : 12 }

	var Year = exports.Year = { // http://en.wikipedia.org/wiki/Gregorian_calendar#Accuracy
			Standard  : 365,
			LeapYear  : 366,
			Julian    : 365.25,
			JulianLeap: 365.2425, // every 400 years
			Gregorian : 365.24237,
			Herschel  : 365.24225 }

	var Ratio = {
			SecondToMilliseconds: 1000,
			MinuteToSeconds     :   60,
			HourToMinutes       :   60,
			DayToHours          :   24,
			WeekToDays          :    7,
			YearToDays          : exports.Year.Herschel,
			YearToMonths        :   12
		}
		Ratio.MonthToDays = Ratio.YearToDays / Ratio.YearToMonths
	exports.Ratio = Ratio

	var MonthDays = exports.MonthDays = {
			Normal: [ 31, 28, 31, 30, 31, 30, 30, 31, 30, 31, 30, 31 ],
			Leap  : [ 31, 29, 31, 30, 31, 30, 30, 31, 30, 31, 30, 31 ] }

	var Names = exports.Names = {
			Month  : {
				Initials: [ 'J'      , 'F'       , 'Mar'  , 'May', 'Jun' , 'Jul'   , 'A'       , 'S'  , 'O'  , 'N'  , 'D'    ],
				Three   : [ 'Jan'    , 'Feb'     , 'Mar'  , 'May', 'Jun' , 'Jul'   , 'Aug'     , 'Sep', 'Oct', 'Nov', 'Dec'  ],
				Geek    : [ 'January', 'February', 'March', 'May', 'June', 'Julius', 'Augustus', '7th', '8th', '9th', '10th' ] },
			WeekDay: {
				Initials : [ 'Su'     , 'M'       , 'Tu'        , 'W'           , 'Th'        , 'F'          , 'Sa'         ],
				Three    : [ 'Sun'    , 'Mon'     , 'Tue'       , 'Wed'         , 'Thu'       , 'Fri'        , 'Sat'        ],
				CamelCase: [ 'SunDay' , 'MonDay'  , 'TuesDay'   , 'WednesDay'   , 'ThursDay'  , 'FriDay'     , 'SaturDay'   ],
				Julian   : [ 'Sunday' , 'Monday'  , 'Tuesday'   , 'Wednesday'   , 'Thursday'  , 'Friday'     , 'Saturday'   ],
				Geek     : [ 'Sun-Day', 'Moon-Day', "Tiw's-Day'", "Wodan's-Day'", "Thor's-Day", "Frigg's-Day", 'Saturn-Day' ] }}


	var conversions = exports.conversions = [ // NOTE: I don't use conversions.year = Ratio.YearToMonths because I need to ensure the order
			{ part: exports.DatePart.year  , ratio: exports.Ratio.YearToMonths         }, 
			{ part: exports.DatePart.month , ratio: exports.Ratio.MonthToDays          }, // TODO Months to weeks?
		// TODO weeks to days?  
			{ part: exports.DatePart.day   , ratio: exports.Ratio.DayToHours           }, 
			{ part: exports.DatePart.hour  , ratio: exports.Ratio.HourToMinutes        }, 
			{ part: exports.DatePart.minute, ratio: exports.Ratio.MinuteToSeconds      }, 
			{ part: exports.DatePart.second, ratio: exports.Ratio.SecondToMilliseconds }]

logger.info( 'date.Ratio', exports.Ratio )


	function listToDict( list, d ) { return dictionary.defaults(  collection.listsToDict( list, exports.Order.DateTime ), dictionary.defaults( d, exports.BoT ) ) }
	 exports.listToDict = listToDict


	function dateToDict( oDate, printable )
	{
validate.isDateValid( oDate, 'dateTime.dateToDict.oDate is False for isDateValid' )
validate.isNothingOrFn( printable, compare.isBoolean, 'dateTime.dateToDict.printable is False for isBoolean' )
//		var oDate = compare.defaultDate(oDate)
		var fn    = compare.defaultBoolean( printable, true ) ? exports.storedToRepresented : compare.f
	return {
		year       : 	 oDate.getFullYear(),
		month      : fn( oDate.getMonth() ),
		day        : 	 oDate.getDate(),
		weekDay    : fn( oDate.getDay() ),
		hour       : 	 oDate.getHours(),
		minute     : 	 oDate.getMinutes(),
		second     : 	 oDate.getSeconds(),
		milliSecond: 	 oDate.getMilliseconds() }
	}exports.dateToDict = dateToDict


	function dateToDictUTC( oDate, printable )
	{
validate.isDateValid( oDate, 'dateTime.dateToDictUTC.oDate is False for isDateValid' )
validate.isNothingOrFn( printable, compare.isBoolean, 'dateTime.dateToDictUTC.printable is False for isBoolean' )
//		var oDate = compare.defaultDate(oDate)
		var fn    = compare.defaultBoolean( printable, true ) ? exports.storedToRepresented : compare.f
	return {
		year       : 	 oDate.getUTCFullYear(),
		month      : fn( oDate.getUTCMonth() ),
		day        : 	 oDate.getUTCDate(),
		weekDay    : fn( oDate.getUTCDay() ),
		hour       : 	 oDate.getUTCHours(),
		minute     : 	 oDate.getUTCMinutes(),
		second     : 	 oDate.getUTCSeconds(),
		milliSecond: 	 oDate.getUTCMilliseconds() }
	}exports.dateToDictUTC = dateToDictUTC


	function datePartConvert( x, ratio, G2P )
	{// General To Particular or Particular to General?
		var G2P = compare.defaultBoolean( G2P, true )
	return  G2P ? x * ratio : x / ratio
	}exports.datePartConvert = datePartConvert


// ***** G2P conversions *****
	function toDaysFromYears (x) { return x * exports.Ratio.YearToDays }
	 exports.toDaysFromYears = exports.yearsToDays = toDaysFromYears

	function toDaysFromMonths(x) { return x * exports.Ratio.MonthToDays }
	 exports.toDaysFromMonths = exports.monthsToDays = toDaysFromMonths

	function toDaysFromWeeks (x) { return x * exports.Ratio.WeekToDays }
	 exports.toDaysFromWeeks = exports.weeksToDays = toDaysFromWeeks


	function daysToHours     (x) { return x * exports.Ratio.DayToHours }
	 exports.daysToHours = daysToHours

	function hoursToMinutes  (x) { return x * exports.Ratio.HourToMinutes }
	 exports.hoursToMinutes = hoursToMinutes

	function minutesToSeconds(x) { return x * exports.Ratio.MinuteToSeconds }
	 exports.minutesToSeconds = minutesToSeconds


	function toMillisecondsFromSeconds(x) { return builtin.parseInt( x * exports.Ratio.SecondToMilliseconds ) } 
	 exports.toMillisecondsFromSeconds = exports.secondsToMilliseconds = toMillisecondsFromSeconds

	function toMillisecondsFromMinutes(x) { return exports.secondsToMilliseconds( exports.minutesToSeconds(x) ) }
	 exports.toMillisecondsFromMinutes = exports.minutesToMilliseconds = toMillisecondsFromMinutes

	function toMillisecondsFromHours  (x) { return exports.minutesToMilliseconds( exports.hoursToMinutes(x) ) }
	 exports.toMillisecondsFromHours = exports.hoursToMilliseconds = toMillisecondsFromHours

	function toMillisecondsFromDays   (x) { return exports.hoursToMilliseconds( exports.daysToHours(x) ) }
	 exports.toMillisecondsFromDays = exports.daysToMilliseconds = toMillisecondsFromDays

	function toMillisecondsFromWeeks  (x) { return exports.daysToMilliseconds( exports.weeksToDays(x) ) }
	 exports.toMillisecondsFromWeeks = exports.weeksToMilliseconds = toMillisecondsFromWeeks

	function toMillisecondsFromMonths (x) { return exports.daysToMilliseconds( exports.monthsToDays(x) ) }
	 exports.toMillisecondsFromMonths = exports.monthsToMilliseconds = toMillisecondsFromMonths

	function toMillisecondsFromYears  (x) { return exports.daysToMilliseconds( exports.yearsToDays(x) ) }
	 exports.toMillisecondsFromYears = exports.yearsToMilliseconds = toMillisecondsFromYears


// ***** P2G conversions *****
	function secondsToMinutes(x) { return x / exports.Ratio.MinuteToSeconds }
	 exports.secondsToMinutes = secondsToMinutes

	function minutesToHours  (x) { return x / exports.Ratio.HourToMinutes }
	 exports.minutesToHours = minutesToHours

	function hoursToDays     (x) { return x / exports.Ratio.DayToHours }
	 exports.hoursToDays = hoursToDays


	function daysToWeeks     (x) { return x / exports.Ratio.WeekToDays }
	 exports.daysToWeeks = daysToWeeks

	function daysToMonths    (x) { return x / exports.Ratio.MonthToDays }
	 exports.daysToMonths = daysToMonths

	function daysToYears     (x) { return x / exports.Ratio.YearToDays }
	 exports.daysToYears = daysToYears


	function millisecondsToSeconds(x) { return ( x / exports.Ratio.SecondToMilliseconds ) }
	 exports.millisecondsToSeconds = millisecondsToSeconds

	function millisecondsToMinutes(x) { return exports.secondsToMinutes( exports.millisecondsToSeconds(x) ) }
	 exports.millisecondsToMinutes = millisecondsToMinutes

	function millisecondsToHours  (x) { return exports.minutesToHours( exports.millisecondsToMinutes(x) ) }
	 exports.millisecondsToHours = millisecondsToHours

	function millisecondsToDays   (x) { return exports.hoursToDays( exports.millisecondsToHours(x) ) }
	 exports.millisecondsToDays = millisecondsToDays

	function millisecondsToWeeks  (x) { return exports.daysToWeeks( exports.millisecondsToDays(x) ) }
	 exports.millisecondsToWeeks = millisecondsToWeeks

	function millisecondsToMonths (x) { return exports.daysToMonths( exports.millisecondsToDays(x) ) }
	 exports.millisecondsToMonths = millisecondsToMonths

	function millisecondsToYears  (x) { return exports.daysToYears( exports.millisecondsToDays(x) ) }
	 exports.millisecondsToYears = millisecondsToYears


	var Convert = exports.Convert = {}
			Convert[exports.DatePart.year       ] = { to: exports.toMillisecondsFromYears  , from: exports.millisecondsToYears   }
			Convert[exports.DatePart.month      ] = { to: exports.toMillisecondsFromMonths , from: exports.millisecondsToMonths  }
			Convert[exports.DatePart.week       ] = { to: exports.toMillisecondsFromWeeks  , from: exports.millisecondsToWeeks   }
			Convert[exports.DatePart.day        ] = { to: exports.toMillisecondsFromDays   , from: exports.millisecondsToDays    }
			Convert[exports.DatePart.hour       ] = { to: exports.toMillisecondsFromHours  , from: exports.millisecondsToHours   }
			Convert[exports.DatePart.minute     ] = { to: exports.toMillisecondsFromMinutes, from: exports.millisecondsToMinutes }
			Convert[exports.DatePart.second     ] = { to: exports.toMillisecondsFromSeconds, from: exports.millisecondsToSeconds }
			Convert[exports.DatePart.milliSecond] = { to: compare.f                        , from: compare.f                     }

	var MilliSeconds = exports.MilliSeconds = {
			year       : exports.toMillisecondsFromYears  (1),
			month      : exports.toMillisecondsFromMonths (1),
			week       : exports.toMillisecondsFromWeeks  (1),
			day        : exports.toMillisecondsFromDays   (1),
			hour       : exports.toMillisecondsFromHours  (1),
			minute     : exports.toMillisecondsFromMinutes(1),
			second     : exports.toMillisecondsFromSeconds(1),
			milliSecond:                                   1 }
logger.info( 'dateTime.MilliSeconds', exports.MilliSeconds )


	function rangeToDict(ms)
	{
validate.isZeroOrMore( ms, 'dateTime.rangeToDict.ms is False for isZeroOrMore' )
		var newDict = {}
		sequence.each( exports.Order.Period, 
			function(datePart)
			{
				var n = math.Round.Lower( exports.Convert[datePart].from(ms) )
					newDict[datePart] = n
				if ( n >= 1 )
					ms -= exports.Convert[datePart].to(n)
			} )
	return newDict
	}exports.rangeToDict = rangeToDict


	var Precision = {}
	dictionary.each( exports.MilliSeconds, function( value, key ){ Precision[key] = 1 / value } )
	exports.Precision = Precision
logger.info( 'dateTime.Precision', exports.Precision )


// ***** parsers *****
	function parseInt(x) 
	{
validate.isNothingOrFn( x, compare.canBeNumber, 'dateTime.parseInt.x is False for canBeNumber' )
	return builtin.parseInt( compare.defaultTo0(x) ) 
	}exports.parseInt = parseInt


	function stringToMilliseconds(x)
	{
validate.isSomeString( x, 'dateTime.stringToMilliseconds is False for isSomeString' )
		try
		{
		var milliseconds = builtin.Date.parse(x)
	return compare.isZeroOrGreater(milliseconds) ? milliseconds : null
		}
		catch(err){}
	return null
	}exports.stringToMilliseconds = exports.parseDate = stringToMilliseconds


// ***** Common date to millisecond conversions *****
	function dateToMilliseconds( x, add )
	{
validate.isDateValid( x, 'dateTime.dateToMilliseconds.x is False for isDateValid' )
validate.isNothingOrFn( add, compare.isInt, 'dateTime.dateToMilliseconds.add is False for isInt' )
	return x.getTime() + compare.defaultTo0(add)
	}exports.dateToMilliseconds = exports.d2ms = dateToMilliseconds

	function dateToOffsetMillisecondsToUTC(x)
	{ // GMT -6 will return 360 minutes to ms. milliseconds + offset = UTC
validate.isDateValid( x, 'dateTime.dateToOffsetMillisecondsToUTC.x is False for isDateValid' )
	return exports.minutesToMilliseconds( x.getTimezoneOffset() )
	}exports.dateToOffsetMillisecondsToUTC = dateToOffsetMillisecondsToUTC

	function dateToOffsetMillisecondsFromUTC(x)
	{ // GMT -6 will now return -360 minutes to ms. UTC + offset = milliseconds
validate.isDateValid( x, 'dateTime.dateToOffsetMillisecondsFromUTC.x is False for isDateValid' )
	return exports.dateToOffsetMillisecondsToUTC(x) * -1
	}exports.dateToOffsetMillisecondsFromUTC = dateToOffsetMillisecondsFromUTC

	function dateToUTCmilliseconds(x)
	{
validate.isDateValid( x, 'dateTime.dateToUTCmillisecondsmilliseconds.x is False for isDateValid' )
	return exports.dateToMilliseconds(x) + exports.dateToOffsetMillisecondsToUTC(x)
	}exports.dateToUTCmilliseconds = dateToUTCmilliseconds

	function dateUTCtoMilliseconds(x)
	{
validate.isDateValid( x, 'dateTime.dateUTCtoMilliseconds.x is False for isDateValid' )
	return exports.dateToMilliseconds(x) + exports.dateToOffsetMillisecondsFromUTC(x)
	}exports.dateUTCtoMilliseconds = dateUTCtoMilliseconds

	function dateAndGMTtoMilliseconds( x, milliseconds )
	{
validate.isDateValid( x, 'dateTime.dateAndGMTtoMilliseconds.x is False for isDateValid' )
	return exports.dateUTCtoMilliseconds(x) - compare.defaultTo0(milliseconds)
	}exports.dateAndGMTtoMilliseconds = dateAndGMTtoMilliseconds

	function stringTimeToMilliseconds(x)
	{ // uses 1970/1/1 as day. Since this is "UTC" we have to parse it as local
validate.isSomeString( x, 'dateTime.stringTimeToMilliseconds.x is False for isSomeString' )
	return exports.dateUTCtoMilliseconds(   new Date(  exports.stringToMilliseconds( '1970/1/1' + str.ensureStartsWith( x, ' ' ) )  )   )
	}exports.stringTimeToMilliseconds = stringTimeToMilliseconds


// ***** string to date conversions *****
	function stringTimeWithColons(x)
	{// TODO Add in string lib an ''ensureCharAt'
validate.isSomeString( x, 'dateTime.stringTimeWithColons.x is False for isSomeString' )
		if ( str.contains( x, ':' ) )
		{
	return x
		}
	// implicit else
		var output = ''
		var i = 0
		sequence.descending( x, 
			function(letter)
			{
				if ( ++i > 2 )
				{
					i = 1
					output = ':' + output
				}
				output = letter + output
			})
	return output
	}exports.stringTimeWithColons = stringTimeWithColons


	function stringGMTtoMilliseconds(x)
	{
validate.isSomeString( x, 'dateTime.stringGMT.x is False for isSomeString' )
		if (  !str.startsWith( x, '+' )  &&  !str.startsWith( x, '-' )  )
			x = '+' + x
		var sign      = builtin.parseInt( str.charFirst(x) + '1' )
		var string    = exports.stringTimeWithColons(  str.removeFromLeft( x, 1 )  )
		var parts     = str.split( string, ':' )
		var GMThour   =                                   exports.toMillisecondsFromHours  (  sequence.nth( parts, 1 )  )
		var GMTminute = compare.hasPosition( parts, 2 ) ? exports.toMillisecondsFromMinutes(  sequence.nth( parts, 2 )  ) : 0
		var GMTsecond = compare.hasPosition( parts, 3 ) ? exports.toMillisecondsFromSeconds(  sequence.nth( parts, 3 )  ) : 0
		var milliseconds = GMThour + GMTminute + GMTsecond
	return  milliseconds *sign
	}exports.stringGMTtoMilliseconds = stringGMTtoMilliseconds


	function stringNixonToDate(x)
	{
		var string  = str.unwrap( '/Date(', x, ')/' )
		var splitBy = str.contains( string, '+' ) ? '+' : '-'
		var parts   = str.split( string, splitBy )
		var GMT     = ( sequence.size(parts) > 1 ) ? exports.stringGMTtoMilliseconds(  splitBy + sequence.nth( parts, 2 )  ) : 0
	return new Date(  exports.dateAndGMTtoMilliseconds(  new Date( builtin.parseInt( sequence.first(parts) ) ),  GMT )  )
	}exports.stringNixonToDate = stringNixonToDate


	function stringISO8601toDate(x)
	{
validate.isSomeString( x, 'date.stringISO8601toDate.x is False for isSomeString' )
		try
		{
	return parseISO8601(x)
		}catch(err){}
	return null	
	}exports.stringISO8601toDate = stringISO8601toDate


	function stringToDate(x)
	{
validate.isSomeString( x, 'date.stringToDate.x is False for isSomeString')
/* TODO
		var oDate = exports.stringISO8601toDate(x)
	if ( compare.isDateValid(oDate) )						return oDate
 */ 
		var milliseconds = exports.stringToMilliseconds(x)
	if ( compare.isZeroOrMore(milliseconds) ) 				return new Date(milliseconds)
	if ( regExp.matches( x, exports.DateRegexp.MS.Any ) ) 	return exports.stringNixonToDate(x)

logger.warn( ' ! dateTime.stringToDate.x is invalid date for ' + x, typeof(milliseconds), true )
	return null
/*
		var matches = exports.DateRegexp.YYYYMMDD.Any.exec(x)
	return (  matches  &&  ( matches.length >= 4 )  ) ? new Date( matches[3], exports.representedToStored( matches[1] ), matches[2] ) : new Date()
 */
	}exports.stringToDate = stringToDate


// ***** all mighty date creator *****
	function getDate() // args
	{
		var input = sequence.unpack(arguments)
	if ( compare.isDate(input) )       	return input
	if ( compare.canBeNumber(input) )	return new Date( exports.parseInt(input) )
	if ( compare.isString(input) )     	return exports.stringToDate(input)

		if ( compare.isList(input) )
	 		var input = exports.listToDict(input) 	
	if ( compare.isDictionary(input) ) return new Date( input.year, exports.representedToStored(input.month), input.day, input.hour, input.minute, input.second, input.milliSecond )
// implicit else, return today
									   return exports.now()
	}exports.getDate = exports.date_get = exports.datetime = getDate


	function getDateParts( input, useUTC, enforceDigits, printable )
	{
validate.isNothingOrFn( useUTC       , compare.isBoolean, 'dateTime.dateParts_get.useUTC        is False for isBoolean' )
validate.isNothingOrFn( enforceDigits, compare.isBoolean, 'dateTime.dateParts_get.enforceDigits is False for isBoolean' )
validate.isNothingOrFn( printable    , compare.isBoolean, 'dateTime.dateParts_get.printable     is False for isBoolean' )
		var oDate         = exports.datetime(input)
		var enforceDigits = compare.defaultBoolean( enforceDigits, false )
		var printable     = enforceDigits ? true : compare.defaultBoolean( printable, true )
		var useUTC        = compare.defaultBoolean(  compare.resolveProperty( oDate, 'isUTC' ),  compare.defaultBoolean( useUTC, false )  )
		var parts     = useUTC ? exports.dateToDictUTC( oDate, printable ) : exports.dateToDict( oDate, printable )
		if (enforceDigits)		
		{// having 2012-01-03 instead of 2012-1-3
			parts.year        = str.digits( parts.year       , exports.Digits.year        )
			parts.month       = str.digits( parts.month      , exports.Digits.month       )
			parts.day         = str.digits( parts.day        , exports.Digits.day         )
			parts.weekDay     = str.digits( parts.weekDay    , exports.Digits.weekDay     )
			parts.hour        = str.digits( parts.hour       , exports.Digits.hour        )
			parts.minute      = str.digits( parts.minute     , exports.Digits.minute      )
			parts.second      = str.digits( parts.second     , exports.Digits.second      )
			parts.milliSecond = str.digits( parts.milliSecond, exports.Digits.milliSecond )
		}
	return  parts
	}exports.getDateParts = exports.dateParts_get = exports.dateParts = getDateParts


	function millisecondsSBoT     () { return exports.dateToMilliseconds   ( exports.datetime(arguments) ) }
	 exports.millisecondsSBoT = millisecondsSBoT

	function millisecondsSBoTtoUTC() { return exports.dateToUTCmilliseconds( exports.datetime(arguments) ) }
	 exports.millisecondsSBoTtoUTC = millisecondsSBoTtoUTC

	function millisecondsSBoTasUTC() { return exports.dateUTCtoMilliseconds( exports.datetime(arguments) ) }
	 exports.millisecondsSBoTasUTC = millisecondsSBoTasUTC


	function dateUTC( input, useUTC ) // TODO ?
	{
		var oDate = exports.datetime(input)
		if ( !compare.isDateValid(input) )
		{
		    oDate.isUTC = true
//		    oDate.setTime( exports.dateUTCtoMilliseconds(oDate) ) // we adjust the timezone so it meets the time!
		}
	return  oDate
	}exports.dateUTC = dateUTC


	function Now(useUTC)   { return compare.defaultBoolean( useUTC, false ) ? exports.datetime( exports.millisecondsSBoTtoUTC() ) : exports.now() }
	 exports.Now = Now


	function Today(useUTC) { return exports.datetime( dictionary.update(  exports.dateParts( null, useUTC ),  exports.DayPart.MidNight  )  ) }
	 exports.Today = Today


	function delta(oDate1, oDate2) 
	{ //TODO what is the difference between oDate1 - oDate2 and oDate1.getTime() - oDate2.getTime()
		var oDate2b = compare.defaultDate(oDate2, oDate1)
		var oDate1  = compare.isNothing(oDate2) ? exports.now() : oDate1
	return exports.dateToMilliseconds(oDate2b) - exports.dateToMilliseconds(oDate1)
	}exports.delta = exports.diff = delta


	function isPast  (oDate, orEqual) { return   compare.isLowerThanZero( exports.delta(oDate), orEqual ) }
	 exports.isPast = isPast

	function isFuture(oDate, orEqual) { return compare.isGreaterThanZero( exports.delta(oDate), orEqual ) }
	 exports.isFuture = isFuture

	function isNow   (oDate) { return exports.delta(oDate) === 0 }
	 exports.isNow = exports.isPresent = isNow


	function add(oDate, ms) { return new Date( exports.dateToMilliseconds(oDate) +ms ) }
	 exports.add = add


	function formatDay( input, order, separator, enforceDigits )
	{
		var oDate     = exports.datetime(input)
		var order     = compare.defaultList( order, exports.Order.Day )
		var separator = compare.defaultToValue( separator, '-' ) // ISO
		var date      = ''
		var parts     = dictionary.select(  exports.dateParts( oDate, false, compare.defaultBoolean( enforceDigits, true ), true ),  exports.Order.Day  )
		sequence.each( order, function(part, index)
		{
			if ( index > 0 )
				date += separator
			date += str.toString( parts[part] )				
		} )
	return date
	}exports.formatDay = formatDay

// TODO
	function formatDayMDY() /* args */ { return exports.formatDay( functions.fwd( exports.datetime, arguments ), [ exports.DatePart.month, exports.DatePart.day, exports.DatePart.year ], '-' ) }
	 exports.formatDayMDY = formatDayMDY

	function formatDayIOS() /* args */ { return exports.formatDay( functions.fwd( exports.datetime, arguments ), [ exports.DatePart.month, exports.DatePart.day, exports.DatePart.year ], '/' ) }
	 exports.formatDayIOS = formatDayIOS

	function formatDayDMY() /* args */ { return exports.formatDay( functions.fwd( exports.datetime, arguments ), [ exports.DatePart.day, exports.DatePart.month, exports.DatePart.year ], '/' ) }
	 exports.formatDayMDY = formatDayMDY

	function formatDayYMD() /* args */ { return exports.formatDay( functions.fwd( exports.datetime, arguments ), [ exports.DatePart.year, exports.DatePart.month, exports.DatePart.day ], '/' ) }
	 exports.formatDayYMD = formatDayYMD

	function formatDayMMMDD() // arguments
	{
		var oDate  = exports.formatDay(  functions.fwd( exports.datetime, arguments )  )
			 parts = exports.dateToDict( oDate, false )
	return exports.Names.Month.Three[ parts[exports.DatePart.month] ] + str.toString( parts[exports.DatePart.day] )
	}exports.formatDayMMMDD = formatDayMMMDD

	function formatDayWMD()
	{
		var oDate = exports.formatDay(  functions.fwd( exports.datetime, arguments )  )
	return exports.Names.WeekDay.Julian[   exports.dateToDict( oDate, false )[exports.DatePart.weekDay]   ] + ', ' + exports.formatDayMMMDD(oDate)
	}exports.formatDayWMD = formatDayWMD


	function formatDayDefault() // arguments
	{// http://www.w3schools.com/jsref/jsref_todatestring.asp
		var oDate = functions.fwd( exports.datetime, arguments )
	return  oDate.toDateString() //Sat Aug 18 2012
	}exports.formatDayDefault = formatDayDefault

	function formatDayLocaleShort()  { return builtin.formatDate(  functions.fwd( exports.datetime, arguments ),  exports.DateFormat.short  ) }
	 exports.formatDayLocaleShort = formatDayLocaleShort

	function formatDayLocaleMedium() { return builtin.formatDate(  functions.fwd( exports.datetime, arguments ),  exports.DateFormat.medium ) }
	 exports.formatDayLocaleMedium = formatDayLocaleMedium

	function formatDayLocaleLong()   { return builtin.formatDate(  functions.fwd( exports.datetime, arguments ),  exports.DateFormat.long   ) }
	 exports.formatDayLocaleLong = formatDayLocaleLong

	function formatDayLocale( input, extension )
	{// http://www.w3schools.com/jsref/jsref_tolocaledatestring.asp
		var oDate = exports.datetime(input)
		switch(extension)
		{
	case exports.DateFormat.short : return exports.formatDayLocaleShort (oDate); break
	case exports.DateFormat.medium: return exports.formatDayLocaleMedium(oDate); break
	case exports.DateFormat.long  : return exports.formatDayLocaleLong  (oDate); break
		}
	// implicit else
	return oDate.toLocaleDateString() // 18 de agosto de 2012
	}exports.formatDayLocale = formatDayLocale


	var FormatDay = {
			Default: exports.formatDayDefault,
			Locale : {
				Default: exports.formatDayLocale,
				Short  : exports.formatDayLocaleShort,
				Medium : exports.formatDayLocaleMedium,
				Long   : exports.formatDayLocaleLong
			},
			MDY    : exports.formatDayMDY,
			iOS    : exports.formatDayIOS,
			DMY    : exports.formatDayDMY,
			YMD    : exports.formatDayYMD,
			MMMDD  : exports.formatDayMMMDD,
			WMD    : exports.formatDayWMD,
			Custom : exports.formatDay
		}
	exports.FormatDay = FormatDay


	function formatTimeDefault() // args
	{// http://www.w3schools.com/jsref/jsref_totimestring.asp
		var oDate = functions.fwd( exports.datetime, arguments )
	return  oDate.toTimeString() // 10:31:04 GMT-0500 (CDT)
	}exports.formatTimeDefault = formatTimeDefault

	function formatTimeLocaleShort()  { return builtin.formatTime(  functions.fwd( exports.datetime, arguments ),  exports.DateFormat.short  ) }
	 exports.formatTimeLocaleShort = formatTimeLocaleShort

	function formatTimeLocaleMedium() { return builtin.formatTime(  functions.fwd( exports.datetime, arguments ),  exports.DateFormat.medium ) }
	 exports.formatTimeLocaleMedium = formatTimeLocaleMedium

	function formatTimeLocaleLong()   { return builtin.formatTime(  functions.fwd( exports.datetime, arguments ),  exports.DateFormat.long   ) }
	 exports.formatTimeLocaleLong = formatTimeLocaleLong

	function formatTimeLocale( input, extension )  // args
	{// http://www.w3schools.com/jsref/jsref_tolocaletimestring.asp
		var oDate = exports.datetime(input)
		switch(extension)
		{
	case exports.DateFormat.short : return exports.formatTimeLocaleShort (oDate); break
	case exports.DateFormat.medium: return exports.formatTimeLocaleMedium(oDate); break
	case exports.DateFormat.long  : return exports.formatTimeLocaleLong  (oDate); break
		}
	return  oDate.toLocaleTimeString() //10:30:58 -0500
	}exports.formatTimeLocale = formatTimeLocale


	function formatTime24( input, precision, useUTC, enforceDigits ) // args
	{
		var oDate       = exports.datetime(input)
		var parts       = dictionary.select(  exports.dateParts( oDate, useUTC, enforceDigits, true ),  exports.Order.Time )
		var time        = str.toString(parts.hour) + ':' + str.toString(parts.minute)
		var  precision  = compare.defaultToValue( precision, exports.Precision.minute )
		if ( precision >= exports.Precision.second )      time += ':' + str.toString(parts.second)
		if ( precision >= exports.Precision.milliSecond ) time += '.' + str.toString(parts.milliSecond)
	return  time
	}exports.formatTime24 = formatTime24


	function formatTimePM( input, precision, useUTC, enforceDigits ) // args
	{
		var oDate      = exports.datetime(input)
		var parts      = exports.dateParts( oDate, useUTC, enforceDigits, true )
		var precision  = compare.defaultToValue( precision, exports.Precision.minute )
		var hour       = exports.dateParts( oDate, useUTC, false, true ).hour // we don't enforce digits to obtain the numeric value of hour
		var time       =  str.digits(   str.toString(  ( hour > exports.DayPart.Noon )  ?  hour -12 : hour  ),   exports.Digits.hour  ) 
			time      += ':' + str.toString(parts.minute)
			if ( precision >= exports.Precision.second )      time += ':' + str.toString(parts.second)
			if ( precision >= exports.Precision.milliSecond ) time += '.' + str.toString(parts.milliSecond)
//			time += ' '
			time += ( hour >= exports.DayPart.Noon ) ? 'PM' : 'AM' 
	return  time
	}exports.formatTimePM = formatTimePM


	var FormatTime = {
			Default: exports.formatTimeDefault,
			Locale : {
				Default: exports.formatTimeLocale,
				Short  : exports.formatTimeLocaleShort,
				Medium : exports.formatTimeLocaleMedium,
				Long   : exports.formatTimeLocaleLong
			},
			'24'   : exports.formatTime24,
			PM     : exports.formatTimePM
		}
	exports.FormatTime = FormatTime


	function formatDayAndTime( input, separator, precision, enforceDigits, useUTC, fnDay, fnTime )
	{
		var oDate      = exports.datetime(input)
		var  separator = compare.defaultToValue( separator, ' ' )
		var  precision = compare.defaultToValue( precision, exports.Precision.minute )
		var	 fnDay     = compare.defaultFunction( fnDay, exports.FormatDay.YMD )
		var	 fnTime    = compare.defaultFunction( fnTime, exports.FormatTime.PM )
		var  date      = fnDay(oDate)
		if ( precision >= exports.Precision.hour )
			date += separator + fnTime( oDate, precision, useUTC, enforceDigits )
	return  date
	}exports.formatDayAndTime = formatDayAndTime


	function formatDayAndTimeISO() // args
	{// http://www.w3schools.com/jsref/jsref_toisostring.asp
		var oDate = functions.fwd( exports.datetime, arguments )
	return  oDate.toISOString() // 2012-08-18T16:35:01.188Z
	}exports.formatDayAndTimeISO = formatDayAndTimeISO

	function formatDayAndTimeJSON()
	{// http://www.w3schools.com/jsref/jsref_tojson.asp
		var oDate = functions.fwd( exports.datetime, arguments )
	return  oDate.toJSON() // 2012-08-18T16:30:14.964Z
	}exports.formatDayAndTimeJSON = formatDayAndTimeJSON

	function formatDayAndTimeLocale() // args
	{// http://www.w3schools.com/jsref/jsref_tolocalestring.asp
		var oDate = functions.fwd( exports.datetime, arguments )
	return  oDate.toLocaleString() // 18 de agosto de 2012 10:31:00 -0500
	}exports.formatDayAndTimeLocale = formatDayAndTimeLocale

	function formatDayAndTimeDefault() // args
	{// http://www.w3schools.com/jsref/jsref_tostring_date.asp
		var oDate = functions.fwd( exports.datetime, arguments )
	return  oDate.toString() // Sat Aug 18 2012 10:31:01 GMT-0500 (CDT)
	}exports.formatDayAndTimeDefault = formatDayAndTimeDefault


	var FormatDayAndTime = {
			Default: exports.formatDayAndTimeDefault,
			Locale : exports.formatDayAndTimeLocale,
			JSON   : exports.formatDayAndTimeJSON,
			ISO    : exports.formatDayAndTimeISO,
			Custom : exports.formatDayAndTime
		}
	exports.FormatDayAndTime = FormatDayAndTime


	function past_present_future( list, propertyDateStart, propertyDateEnd )
	{
		var ms      = exports.dateToMilliseconds( exports.now() )
		var past    = []
		var present = []
		var future  = []
		var propertyDateStart = propertyDateStart || 'dateStart'
		var propertyDateEnd   = propertyDateEnd   || 'dateEnd'
		sequence.each( sequence.toList(list), 
			function(row)
			{
				if      (  ms  <  exports.millisecondsSBoT( row[propertyDateStart] )  ) { sequence.append( row, future  ) }
				else if (  ms  >  exports.millisecondsSBoT( row[propertyDateEnd]   )  ) { sequence.append( row, past    ) }
				else																    { sequence.append( row, present ) }
			} )
	return {past:past, present:present, future:future}
	}exports.past_present_future = past_present_future


	function formatDateCount( ms, attributes )
	{
validate.isZeroOrMore( ms        , 'dateTime.formatDateCount.ms         is False for isPositiveInt' )
validate.isAttributes( attributes, 'dateTime.formatDateCount.attributes is False for isAttributes' )
		var output     = ''
		var attributes = dictionary.defaults( attributes, {separator:', ', spacer:' ', fn:data.pluralize})
		var parts      = exports.rangeToDict(ms)
		sequence.each( exports.Order.Period, 
			function(part)
			{
				var number = parts[part]
				if ( number >= 1 )
				{
					if ( compare.isSomeString(output) )
						output += attributes.separator
					output += str.toString(number) + attributes.spacer + attributes.fn( part, number )
				}
			} )
	return output
	}exports.formatDateCount = formatDateCount

	function formatDateCountShort(ms) { return exports.formatDateCount( ms, {separator: ' ', spacer: '', fn: function(x){ return exports.DateInitial[x] } } ) }
	 exports.formatDateCountShort = formatDateCountShort

	var FormatRange = exports.FormatRange = {
			Default: exports.formatDateCount,
			Short  : exports.formatDateCountShort }


	function delta_pretty( x, y, attributes )
	{
validate.isAttributes( attributes, 'dateTime.delta_pretty.attributes is False for isAttributes' )
		var attributes = dictionary.defaults( attributes, {past:'%s ago', future:'in %s', fn:exports.formatDateCount} )
		var ms         = exports.diff( x, y )
		var fmt        = ( ms >= 0 ) ? attributes.future : attributes.past
	return str.format(  fmt,  fn( builtin.abs(ms) )  ) 
	}exports.delta_pretty = exports.prettyDiff = delta_pretty

