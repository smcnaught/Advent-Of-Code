/**
 *  *** Documentation ***
 *  https://www.w3schools.com/jsref/jsref_obj_regexp.asp
 *  https://digitalfortress.tech/tricks/top-15-commonly-used-regex/
 * 
 *  *** Notes ***
 *  g   perform a global match (don't stop after the first match)
 *  i   perform a case insensitive match
 *  m   perform multiline matching
 * 
 *  [abc]   Find any character between the brackets
 *  [^abc]  Find any character NOT between the brackets
 *  [0-9]   Find any character between the brackets (any digit)
 *  [^0-9]  Find any character NOT between the brackets (any non-digit)
 *  (x|y)   Find any of the alternatives specified
 * 
 *  *** Regex Methods ***
 *  exec()      Tests for a match in a string. Returns the first match
 *  test()      Tests for a match in a string. Returns true or false
 * 
 *  *** String Methods ***
 *  toString()  Returns the string value of the regular expression
 *  match()     Returns an array containing all the matches or null if no match is found
 *  matchAll()  Returns an iterator containing all of the matches
 *  search()    Tests for a match in a string. Returns the index of the match or -1 if not found
 *  replace()   Executes a search for a match in a string, and replaces the matches substring with whatever you specify
 *  split()     Uses a regular expression or a fixed string to break into an array of substrings
 */

let myRe = /d(b+)d/g;
let myArray = myRe.exec('cdbbdbsbz'); // [ 'dbbd', 'bb', index: 1, input: 'cdbbdbsbz', groups: undefined ]

let myStr = "Testing a Watermelon";
let pattern = /a Watermelon/g;
let myMatch = myStr.match(pattern); // [ 'a Watermelon' ]

/**
 * *** Common Expressions: ***
 */
let wholeNumbers = /^\d+$/;
let decimalNumbers = /^\d*\.\d+$/;
let wholeAndDecimal = /^\d*(\.\d+)?$/;
let negativePositiveWholeAndDecimal = /^-?\d*(\.\d+)?$/;
let wholeDecimalAndFractions = /[-]?[0-9]+[,.]?[0-9]*([\/][0-9]+[,.]?[0-9]*)*/;

let alphanumericWithoutSpace = /^[a-zA-Z0-9]*$/;
let alphanumericWithSpace = /^[a-zA-Z0-9 ]*$/;

let duplicatesInString = /(\b\w+\b)(?=.*\b\1\b)/;
let bananaString = "bananas bananas apples";
let bananaMatch = bananaString.match(duplicatesInString); // [ 'bananas', 'bananas', index: 0, input: 'bananas bananas apples', groups: undefined ]