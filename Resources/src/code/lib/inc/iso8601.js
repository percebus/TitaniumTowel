var exports = exports || {}

function parseISO8601Date(s){
 
  // parenthese matches:
  // year month day    hours minutes seconds  
  // dotmilliseconds 
  // tzstring plusminus hours minutes
  var re = /(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?(Z|([+-])(\d\d):(\d\d))/;
 
  var d = [];
  d = s.match(re);
 
  // "2010-12-07T11:00:00.000-09:00" parses to:
  //  ["2010-12-07T11:00:00.000-09:00", "2010", "12", "07", "11",
  //     "00", "00", ".000", "-09:00", "-", "09", "00"]
  // "2010-12-07T11:00:00.000Z" parses to:
  //  ["2010-12-07T11:00:00.000Z",      "2010", "12", "07", "11", 
  //     "00", "00", ".000", "Z", undefined, undefined, undefined]
 
  if (! d) {
    throw "Couldn't parse ISO 8601 date string '" + s + "'";
  }
 
  // parse strings, leading zeros into proper ints
  var a = [1,2,3,4,5,6,10,11];
  for (var i in a) {
    d[a[i]] = parseInt(d[a[i]], 10);
  }
  d[7] = parseFloat(d[7]);
 
  // Date.UTC(year, month[, date[, hrs[, min[, sec[, ms]]]]])
  // note that month is 0-11, not 1-12
  // see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/UTC
  var ms = Date.UTC(d[1], d[2] - 1, d[3], d[4], d[5], d[6]);
 
  // if there are milliseconds, add them
  if (d[7] > 0) {  
    ms += Math.round(d[7] * 1000);
  }
 
  // if there's a timezone, calculate it
  if (d[8] != "Z" && d[10]) {
    var offset = d[10] * 60 * 60 * 1000;
    if (d[11]) {
      offset += d[11] * 60 * 1000;
    }
    if (d[9] == "-") {
      ms -= offset;
    }
    else {
      ms += offset;
    }
  }
 
  return new Date(ms);
}exports.parseISO8601Date = parseISO8601Date