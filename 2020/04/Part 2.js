const formatter = require('../../shared/formatting/format-puzzle-input');
let data = new formatter.Formatter(__dirname).getRaw().split('\r\n\r\n');
let validPassports = 0;
let passportInfo = [];

function formatData() {
  data.forEach(d => {
    let updated = d.replace(/\r|\n/g, ' ').split(' ');
    let info = [];
    updated.forEach(u => {
      let key = u.substring(0, u.indexOf(':'));
      let val = u.substring(u.indexOf(':') + 1, u.length);
      if (key) info.push({ key: key, val: val });
    })

    passportInfo.push(info);
  })
}

/**
 * byr (Birth Year)
 * Requirements: four digits; at least 1920 and at most 2002.
 */
function birthYearInvalid(birthYear) {
  return birthYear < 1920 || birthYear > 2002 || birthYear.toString().length !== 4;
}

/**
 * iyr (Issue Year)
 * Requirements: four digits; at least 2010 and at most 2020.
 */
function issueYearInvalid(issueYear) {
  return issueYear < 2010 || issueYear > 2020 || issueYear.toString().length !== 4;
}

/**
 * eyr (Expiration Year)
 * Requirements: four digits; at least 2020 and at most 2030.
 */
function expirationYearInvalid(expirationYear) {
  return expirationYear < 2020 || expirationYear > 2030 || expirationYear.toString().length !== 4;
}

/**
 * hgt (Height)
 * Requirements:
 *  - a number followed by either "cm" or "in".
 *    - If in, the number must be at least 59 and at most 76.
 *    - If cm, the number must be at least 150 and at most 193.
 */
function heightInvalid(value) {
  if (value.includes("in")) {
    const height = +value.substring(0, value.indexOf('in'));
    if (height < 59 || height > 76) return true;
  }
  else if (value.includes("cm")) {
    const height = +value.substring(0, value.indexOf('cm'));
    if (height < 150 || height > 193) return true;
  }
  else {
    // console.log(`Height (hgt) invalid: ${JSON.stringify(pData)}`);
    return true;
  }

  return false;
}

/**
 * hcl (Hair Color)
 * Requirements: a # followed by exactly six characters 0-9 or a-f. 
 */
function hairColorInvalid(hairColor) {
  const regex = new RegExp('^[#][0-9a-f]{6}$');
  const invalidRegex = !regex.test(hairColor);
  return invalidRegex;
}

/**
 * ecl (Eye Color)
 * Requirements: exactly one of: amb blu brn gry grn hzl oth.
 */
function eyeColorInvalid(eyeColor) {
  let colorCount = 0;

  if (eyeColor.includes("amb")) colorCount++;
  if (eyeColor.includes("blu")) colorCount++;
  if (eyeColor.includes("brn")) colorCount++;
  if (eyeColor.includes("gry")) colorCount++;
  if (eyeColor.includes("grn")) colorCount++;
  if (eyeColor.includes("hzl")) colorCount++;
  if (eyeColor.includes("oth")) colorCount++;

  if (colorCount !== 1) return true;
}

/**
 * pid (Passport ID)
 * Requirements: a nine-digit number, including leading zeroes.
 */
function passportIdInvalid(passportID) {
  const regex = new RegExp("^\\d{9}$");
  const invalidRegex = !regex.test(passportID);
  return invalidRegex;
}

function getValidPassportCount() {
  passportInfo.forEach(passport => {
    let valid = true;
    let fields = 0;

    passport.forEach(pData => {
      const value = pData.val;

      switch (pData.key) {
        case "byr":
          fields++;
          if (birthYearInvalid(+value)) valid = false;
          break;

        case "iyr":
          fields++;
          if (issueYearInvalid(+value)) valid = false;
          break;

        case "eyr":
          fields++;
          if (expirationYearInvalid(+value)) valid = false;
          break;

        case "hgt":
          fields++;
          if (heightInvalid(value)) valid = false;
          break;

        case "hcl":
          fields++;
          if (hairColorInvalid(value)) valid = false;
          break;

        case "ecl":
          fields++;
          if (eyeColorInvalid(value)) valid = false;
          break;

        case "pid":
          fields++;
          if (passportIdInvalid(value)) valid = false;
          break;

        case "cid": /** cid (Country ID) - ignored, missing or not. */
          break;

        default:
          console.log(`Invalid value in switch ${JSON.stringify(pData)}`)
          break;
      }
    })

    if (valid && fields === 7) validPassports++;
  })
}

function partTwo() {
  formatData();
  getValidPassportCount();
  return validPassports;
}

console.log(`Part Two Answer: ${partTwo()}`);