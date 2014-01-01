Ti.include('/src/code/lib/include.js')
var SDK      = TT.require(TT.Module.Titanium)
var dateTime = TT.require(TT.Module.DateTime)


	var InterNational = exports.InterNational = {
			Locale: SDK.Handler.Locale.currentLocale,
			Language: SDK.Handler.Locale.currentLanguage,
			Country : SDK.Handler.Locale.currentCountry,
			DateTime: {
				Format: {
					Day : dateTime.FormatDay.Locale,
					Time: dateTime.FormatTime.Locale }},
			Decimal  : builtin.formatDecimal,
			Telephone: SDK.Handler.Locale.formatTelephoneNumber,
			Currency: {
				Format: builtin.formatCurrency,
				Code  : SDK.Handler.Locale.getCurrencyCode,
				Symbol: SDK.Handler.Locale.getCurrencySymbol },
			Dictionary: SDK.Handler.Locale.getString }

logger.log( 'locale', InterNational )