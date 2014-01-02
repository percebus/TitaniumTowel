Ti.include('/src/code/towel/test/include.js');

	regExp   = require(TT.Module.RegEx);
	dateTime = require(TT.Module.DateTime);
	variable = require(TT.Module.Var);

	function Test_dateTime_Enumeators()
	{
		function test_Day1    () { assertEqual( dateTime.Day1    , {year: 1970, month: 1, day: 1} ) }
		function test_MidNigth() { assertEqual( dateTime.MidNight, {hour: 0, minute: 0, second: 0, milliSecond: 0} ) }
		function test_BoT     () { assertEqual( dateTime.BoT     , {year: 1970, month: 1, day: 1, hour: 0, minute: 0, second: 0, milliSecond: 0} ) }
	}Test.UT.runAndCache( Test_dateTime_Enumeators, 'dateTime enumerators' )


	function Test_dateTime_listToDict()
	{
		function test_time(){ assertEqual(  dateTime.listToDict( [null, null, null, 1, 2, 3] ), {year:1970, month:1, day:1, hour:1, minute:2, second:3, milliSecond:0}) }
		function test_day (){ assertEqual(  dateTime.listToDict( [2000,    1,    1]          ), {year:2000, month:1, day:1, hour:0, minute:0, second:0, milliSecond:0}) }
	}Test.UT.runAndCache( Test_dateTime_listToDict, 'dateTime.listToDict' )


	function Test_dateTime_conversions()
	{
		function setUp()
		{
			year  = 365.24225
			month =  30.436854166666667
		}

		function test_yearsToDays     (){ assertIdentical( dateTime.yearsToDays     (1),  year ) }
		function test_monthsToDays    (){ assertIdentical( dateTime.monthsToDays    (1),  month ) }
		function test_weeksToDays     (){ assertIdentical( dateTime.weeksToDays     (1),   7 ) }
		function test_daysToHours     (){ assertIdentical( dateTime.daysToHours     (1),  24 ) }
		function test_hoursToMinutes  (){ assertIdentical( dateTime.hoursToMinutes  (1),  60 ) }
		function test_minutesToSeconds(){ assertIdentical( dateTime.minutesToSeconds(1),  60 ) }

		function test_secondsToMilliseconds(){ assertIdentical( dateTime.secondsToMilliseconds(1), 1000 ) }
		function test_minutesToMilliseconds(){ assertIdentical( dateTime.minutesToMilliseconds(1), 1000 *60 ) }
		function test_hoursToMilliseconds  (){ assertIdentical( dateTime.hoursToMilliseconds  (1), 1000 *60 *60 ) }
		function test_daysToMilliseconds   (){ assertIdentical( dateTime.daysToMilliseconds   (1), 1000 *60 *60 *24 ) }
		function test_weeksToMilliseconds  (){ assertIdentical( dateTime.weeksToMilliseconds  (1), 1000 *60 *60 *24 *7 ) }
		function test_monthsToMilliseconds (){ assertIdentical( dateTime.monthsToMilliseconds (1), 1000 *60 *60 *24 *month ) }
		function test_yearsToMilliseconds  (){ assertIdentical( dateTime.yearsToMilliseconds  (1), 1000 *60 *60 *24 *year ) }

		function test_secondsToMinutes(){ assertIdentical( dateTime.secondsToMinutes(60), 1 ) }
		function test_minutesToHours  (){ assertIdentical( dateTime.minutesToHours  (60), 1 ) }
		function test_hoursToDays     (){ assertIdentical( dateTime.hoursToDays     (24), 1 ) }
		function test_daysToWeeks     (){ assertIdentical( dateTime.daysToWeeks      (7), 1 ) }
		function test_daysToMonths    (){ assertIdentical( dateTime.daysToMonths (month), 1 ) }
		function test_daysToYears     (){ assertIdentical( dateTime.daysToYears   (year), 1 ) }

		function test_millisecondsToSeconds(){ assertIdentical( dateTime.millisecondsToSeconds(1000)                   , 1 ) }
		function test_millisecondsToMinutes(){ assertIdentical( dateTime.millisecondsToMinutes(1000 *60)               , 1 ) }
		function test_millisecondsToHours  (){ assertIdentical( dateTime.millisecondsToHours  (1000 *60 *60)           , 1 ) }
		function test_millisecondsToDays   (){ assertIdentical( dateTime.millisecondsToDays   (1000 *60 *60 *24)       , 1 ) }
		function test_millisecondsToWeeks  (){ assertIdentical( dateTime.millisecondsToWeeks  (1000 *60 *60 *24 *7)    , 1 ) }
		function test_millisecondsToMonths (){ assertIdentical( dateTime.millisecondsToMonths (1000 *60 *60 *24 *month), 1 ) }
		function test_millisecondsToYears  (){ assertIdentical( dateTime.millisecondsToYears  (1000 *60 *60 *24 *year) , 1 ) }

		function test_backAndForth(){ assertIdentical( 3, dateTime.millisecondsToYears( dateTime.yearsToMilliseconds(3) ) ) }
	}Test.UT.runAndCache( Test_dateTime_conversions, 'dateTime conversions' )


	function Test_dateTime_regexp()
	{
		function test_slash_true () { assertTrue ( regExp.matches( '2012/11/15', dateTime.DateRegexp.YYYYMMDD.Slash ) ) }
		function test_slash_false() { assertFalse( regExp.matches( '2012-11-15', dateTime.DateRegexp.YYYYMMDD.Slash ) ) }

		function test_hyphen_true () { assertTrue ( regExp.matches( '2012-11-15', dateTime.DateRegexp.YYYYMMDD.Hyphen ) ) }
		function test_hyphen_false() { assertFalse( regExp.matches( '2012/11/15', dateTime.DateRegexp.YYYYMMDD.Hyphen ) ) }

		function test_any_slash () { assertTrue( regExp.matches( '2012-11-15', dateTime.DateRegexp.YYYYMMDD.Any ) ) }
		function test_any_hyphen() { assertTrue( regExp.matches( '2012/11/15', dateTime.DateRegexp.YYYYMMDD.Any ) ) }

		function test_ISO8601_any_day  () { assertTrue( regExp.matches( '2012-11-15'       , dateTime.DateRegexp.ISO8601.Any ) ) }
		function test_ISO8601_any_Z    () { assertTrue( regExp.matches( '2012-11-15T00:00Z', dateTime.DateRegexp.ISO8601.Any ) ) }
		function test_ISO8601_any_local() { assertTrue( regExp.matches( '2012-11-15T00:00' , dateTime.DateRegexp.ISO8601.Any ) ) }

		function test_MS_any_UTC() { assertTrue( regExp.matches( '/Date(1234567890)/'    , dateTime.DateRegexp.MS.Any ) ) }
		function test_MS_any_GMT() { assertTrue( regExp.matches( '/Date(1234567890-600)/', dateTime.DateRegexp.MS.Any ) ) }
	}Test.UT.runAndCache( Test_dateTime_regexp, 'dateTime RegExp' )


	function Test_dateTime_dateToMilliseconds()
	{
		function setUp()
		{
			oDate = new Date( 2012, 10, 15, 9, 16, 50 )
		}

		function test_dateToMilliseconds           () { assertIdentical( dateTime.dateToMilliseconds      ( oDate                                   ), 1352992610000 ) }
		function test_dateFromMillisecondsUTC      () { assertIdentical( dateTime.dateUTCtoMilliseconds   ( oDate                                   ), 1352971010000 ) }
		function test_dateFromMillisecondsGMT_0    () { assertIdentical( dateTime.dateAndGMTtoMilliseconds( oDate,                               0  ), 1352971010000 ) }
		function test_dateFromMillisecondsGMT_Local() { assertIdentical( dateTime.dateAndGMTtoMilliseconds( oDate, -dateTime.hoursToMilliseconds(6) ), 1352992610000 ) }
		function test_dateFromMillisecondsGMT_GMT  () { assertIdentical( dateTime.dateAndGMTtoMilliseconds( oDate, -dateTime.hoursToMilliseconds(7) ), 1352992610000 + dateTime.hoursToMilliseconds(1) ) }
	}Test.UT.runAndCache( Test_dateTime_dateToMilliseconds, 'dateTime dateToMilliseconds' )


	function Test_dateTime_stringToDate()
	{
// TODO	function test_stringTimeToMilliseconds_milliSecond() { assertIdentical( dateTime.stringTimeToMilliseconds('0:0:0.001'),                                1  ) }
		function test_stringTimeToMilliseconds_second     () { assertIdentical( dateTime.stringTimeToMilliseconds('0:0:1'    ), dateTime.secondsToMilliseconds(1) ) }
		function test_stringTimeToMilliseconds_minue      () { assertIdentical( dateTime.stringTimeToMilliseconds('0:1'      ), dateTime.minutesToMilliseconds(1) ) }
		function test_stringTimeToMilliseconds_hour       () { assertIdentical( dateTime.stringTimeToMilliseconds('1:00'     ), dateTime.hoursToMilliseconds  (1) ) }
		function test_stringTimeToMilliseconds_mixed      () { assertIdentical( dateTime.stringTimeToMilliseconds('12:34:56' ), dateTime.hoursToMilliseconds(12) + dateTime.minutesToMilliseconds(34) + dateTime.secondsToMilliseconds(56) ) }

		function test_stringTimeWithColons_without_6() { assertIdentical( dateTime.stringTimeWithColons('123456'), '12:34:56' ) }
		function test_stringTimeWithColons_without_5() { assertIdentical( dateTime.stringTimeWithColons( '23456'),  '2:34:56' ) }
		function test_stringTimeWithColons_without_4() { assertIdentical( dateTime.stringTimeWithColons(  '3456'),    '34:56' ) }
		function test_stringTimeWithColons_without_3() { assertIdentical( dateTime.stringTimeWithColons(   '456'),     '4:56' ) }
		function test_stringTimeWithColons_without_2() { assertIdentical( dateTime.stringTimeWithColons(    '56'),       '56' ) }

		function test_stringTimeWithColons_with_6() { assertIdentical( dateTime.stringTimeWithColons('12:34:56'), '12:34:56' ) }
		function test_stringTimeWithColons_with_5() { assertIdentical( dateTime.stringTimeWithColons( '2:34:56'),  '2:34:56' ) }
		function test_stringTimeWithColons_with_4() { assertIdentical( dateTime.stringTimeWithColons(   '34:56'),    '34:56' ) }
		function test_stringTimeWithColons_with_3() { assertIdentical( dateTime.stringTimeWithColons(    '4:56'),     '4:56' ) }
		function test_stringTimeWithColons_with_2() { assertIdentical( dateTime.stringTimeWithColons(      '56'),       '56' ) }

		function test_stringGMTtoMilliseconds_pHH   () { assertIdentical( dateTime.stringGMTtoMilliseconds('+01'   ),  dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_pHHMM () { assertIdentical( dateTime.stringGMTtoMilliseconds('+0100' ),  dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_pHHcMM() { assertIdentical( dateTime.stringGMTtoMilliseconds('+01:00'),  dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_HHcMM () { assertIdentical( dateTime.stringGMTtoMilliseconds( '01:00'),  dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_HHMM  () { assertIdentical( dateTime.stringGMTtoMilliseconds( '0100' ),  dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_mHH   () { assertIdentical( dateTime.stringGMTtoMilliseconds('-01'   ), -dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_mHHMM () { assertIdentical( dateTime.stringGMTtoMilliseconds('-0100' ), -dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_mHH   () { assertIdentical( dateTime.stringGMTtoMilliseconds('-01'   ), -dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_mHHcMM() { assertIdentical( dateTime.stringGMTtoMilliseconds('-01:00'), -dateTime.hoursToMilliseconds(1) ) }
		function test_stringGMTtoMilliseconds_mixed () { assertIdentical( dateTime.stringGMTtoMilliseconds('-0630' ), -( dateTime.hoursToMilliseconds(6) + dateTime.minutesToMilliseconds(30) ) ) }

		function test_name_day       () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('Nov 15, 2012'              ) ), 1352959200000 ) }
		function test_slash_day      () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012/11/15'                ) ), 1352959200000 ) }
// TODO	function test_ISO8601_YMD    () { assertIdentical( dateTime.dateToUTCmilliseconds( dateTime.stringToDate('2012-11-15'                ) ), 1352992610000 ) }
		function test_day            () { assertIdentical( dateTime.dateToMilliseconds   (           new Date ( 2012, 11-1, 15               ) ), 1352959200000 ) }
		function test_date           () { assertIdentical( dateTime.dateToMilliseconds   (           new Date ( 2012, 11-1, 15, 9, 16, 50, 0 ) ), 1352992610000 ) }
		function test_name_date      () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('Nov 15, 2012 9:16:50'      ) ), 1352992610000 ) }
		function test_slash_date_2   () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012/11/15 09:16:50'       ) ), 1352992610000 ) }
		function test_slash_date_2_AM() { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012/11/15 09:16:50 AM'    ) ), 1352992610000 ) }
		function test_slash_date_1   () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012/11/15 9:16:50'        ) ), 1352992610000 ) }
		function test_slash_date_1_AM() { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012/11/15 9:16:50 AM'     ) ), 1352992610000 ) }
// TODO	function test_ISO8601        () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012-11-15T09:16:50'       ) ), 1352992610000 ) }
		function test_ISO8601_GMT    () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('2012-11-15T09:16:50-06:00' ) ), 1352992610000 ) }
		function test_ISO8601_0      () { assertIdentical( dateTime.dateToUTCmilliseconds( dateTime.stringToDate('2012-11-15T09:16:50-00:00' ) ), 1352992610000 ) }
		function test_ISO8601_UTC    () { assertIdentical( dateTime.dateToUTCmilliseconds( dateTime.stringToDate('2012-11-15T09:16:50Z'      ) ), 1352992610000 ) }
		function test_MS_UTC         () { assertIdentical( dateTime.dateToUTCmilliseconds( dateTime.stringToDate('/Date(1352992610000)/'     ) ), 1352992610000 ) }
		function test_MS_GMT         () { assertIdentical( dateTime.dateToMilliseconds   ( dateTime.stringToDate('/Date(1352992610000-0600)/') ), 1352992610000 ) }

		function test_GMT_ISO8601() { assertIdentical( dateTime.dateToMilliseconds( dateTime.stringToDate('2012-11-15T09:16:50-07:00' ) ), 1352996210000 ) }
		function test_GMT_MS     () { assertIdentical( dateTime.dateToMilliseconds( dateTime.stringToDate('/Date(1352992610000-0700)/') ), 1352996210000 ) }
	}Test.UT.runAndCache( Test_dateTime_stringToDate, 'dateTime.stringToDate' )


	function Test_dateTime_dateParts()
	{
		function setUp()
		{
			oDate = new Date( 2012, 10, 15, 9, 16, 50 )
		}

		function test_dateToDict_false  () { assertEqual( dateTime.dateToDict( oDate, false ), {year: 2012, month: 11-1, day: 15, weekDay: 5-1, hour: 9, minute: 16, second: 50, milliSecond: 0} ) }
		function test_dateToDict_true   () { assertEqual( dateTime.dateToDict( oDate, true  ), {year: 2012, month: 11  , day: 15, weekDay: 5  , hour: 9, minute: 16, second: 50, milliSecond: 0} ) }
		function test_dateToDict_default() { assertEqual( dateTime.dateToDict( oDate        ), {year: 2012, month: 11  , day: 15, weekDay: 5  , hour: 9, minute: 16, second: 50, milliSecond: 0} ) }

		function test_dateToDictUTC_false  () { assertEqual( dateTime.dateToDictUTC( oDate, false ), {year: 2012, month: 11-1, day: 15, weekDay: 5-1, hour: 15, minute: 16, second: 50, milliSecond: 0} ) }
		function test_dateToDictUTC_true   () { assertEqual( dateTime.dateToDictUTC( oDate, true  ), {year: 2012, month: 11  , day: 15, weekDay: 5  , hour: 15, minute: 16, second: 50, milliSecond: 0} ) }
		function test_dateToDictUTC_default() { assertEqual( dateTime.dateToDictUTC( oDate        ), {year: 2012, month: 11  , day: 15, weekDay: 5  , hour: 15, minute: 16, second: 50, milliSecond: 0} ) }

		function test_UTC   () { assertEqual( dateTime.dateParts( oDate, true        ), {year: 2012, month: 11, day: 15, weekDay: 5, hour:  15 , minute: 16, second: 50, milliSecond: 0} ) }
		function test_simple() { assertEqual( dateTime.dateParts( oDate              ), {year: 2012, month: 11, day: 15, weekDay: 5, hour:   9 , minute: 16, second: 50, milliSecond: 0} ) }
		function test_digits() { assertEqual( dateTime.dateParts( oDate, false, true ), {year: 2012, month: 11, day: 15, weekDay: 5, hour: '09', minute: 16, second: 50, milliSecond: '000'} ) }

		function test_regression() { assertEqual( dateTime.dateParts( dateTime.datetime("2012-08-28T07:46:40Z") ), {year: 2012, month: 8, day: 28, weekDay: 3, hour: 2, minute: 46, second: 40, milliSecond: 0} ) }		
	}Test.UT.runAndCache( Test_dateTime_dateParts, 'dateTime.dateParts' )


	function Test_dateTime_formatDateCount()
	{
		function test_1year () { assertIdentical( dateTime.formatDateCount( dateTime.yearsToMilliseconds(1) ), '1 year'  ) }
		function test_2years() { assertIdentical( dateTime.formatDateCount( dateTime.yearsToMilliseconds(2) ), '2 years' ) }
		function test_complex() { assertIdentical( 
			dateTime.formatDateCount( 
				dateTime.toMillisecondsFromYears(3) 
			  + dateTime.toMillisecondsFromMonths(4) 
			  + dateTime.toMillisecondsFromWeeks(1) 
			  + dateTime.toMillisecondsFromDays(6) 
			  + dateTime.toMillisecondsFromHours(3) 
			  + dateTime.toMillisecondsFromMinutes(15) ),
			'3 years, 4 months, 1 week, 6 days, 3 hours, 15 minutes' ) }
	}Test.UT.runAndCache( Test_dateTime_formatDateCount, 'dateTime.formatDateCount' )


	function Test_dateTime_formatDateCountShort()
	{
		function test_1year () { assertIdentical( dateTime.formatDateCountShort( dateTime.yearsToMilliseconds(1) ), '1Y'  ) }
		function test_2years() { assertIdentical( dateTime.formatDateCountShort( dateTime.yearsToMilliseconds(2) ), '2Y' ) }
		function test_complex() { assertIdentical( 
			dateTime.formatDateCountShort( 
				dateTime.toMillisecondsFromYears(3) 
			  + dateTime.toMillisecondsFromMonths(4) 
			  + dateTime.toMillisecondsFromWeeks(1) 
			  + dateTime.toMillisecondsFromDays(6) 
			  + dateTime.toMillisecondsFromHours(3) 
			  + dateTime.toMillisecondsFromMinutes(15) ),
			'3Y 4M 1W 6D 3h 15m' ) }
	}Test.UT.runAndCache( Test_dateTime_formatDateCountShort, 'dateTime.formatDateCountShort' )
