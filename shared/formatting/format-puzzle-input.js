module.exports = {
  Formatter: class {
    constructor(directory, isSample) {
      const fs = require('fs');
      this.fs = fs;
      this.directory = directory;

      if (isSample) this.raw = fs.readFileSync(directory + '/sampleInput.txt').toString('utf-8');
      else this.raw = fs.readFileSync(directory + '/input.txt').toString('utf-8');
    }

    /**
     * Get the raw data
     * @returns the raw data as a string (includes \r and \n)
     */
    getRaw()
    {
      return this.raw;
    }

    /**
     * Get the data as a string
     * @returns the data as a string with /r and /n removed
     */
    getString()
    {
      return this.raw.replace(/\r|\n/g, ' ');
    }

    /**
     * Each line of raw data becomes an element in the array.
     * @returns an array of strings 
     */
    getArrayOfStringsByLine()
    {
      return this.raw.replace(/\r/g, '').split('\n');
    }

    /**
     * 
     */
    getArrayOfNumbersByLine()
    {
      return this.raw.replace(/\r/g, '').split('\n').map(Number);
    }

    /**
     * Each character in the raw data becomes an element in the array.
     * Spaces are removed.
     * @returns an array of strings
     */
    getArrayOfStringsByChar()
    {
      return this.raw.replace(/\s|\r|\n/g, '').split('');
    }

    /**
     * Get array of strings split by given characters
     * @param separator How to separate the elements.
     * @returns An array of strings.
     */
    getArrayOfStringsSplitByChar(separator)
    {
      return this.raw.replace(/\r|\n/g, ' ').split(separator);
    }

    /**
     * Will insert null when not a number
     * @param separator How to separate the elements (i.e. ',' OR ' '  OR '' ... etc.)
     * @returns an array of numbers
     */
    getArrayOfNumbers(separator)
    {
      return this.raw.replace(/\r|\n/g, separator).split(separator).map(Number);
    }

    /**
     * Get array of numbers by line
     * If your input has one number on each line, can use this to create an array of numbers.
     * @returns An array of numbers.
     */
    getArrayOfNumbersByLine()
    {
      return this.raw.replace(/\r/g, '').split('\n').map(Number);
    }

    /**
     * 
     */
    getArrayByLineBreaks()
    {
      return this.raw.split('\r\n\r\n').map(str => str.replace(/\r|\n/g, ""));
    }

    /**
     * Each line of raw data becomes a subarray whose elements are separated by the param you specified
     * @param separator how you would like the subarrays separated (ie ' ' OR ',' etc)
     * @returns a 2D array of strings
     */
    get2DArrayOfStrings(separator)
    {
      return this.raw.replace(/\r/g, '').split('\n').map(e => e.split(separator));
    }

    /**
     * Each line of raw data becomes a subarray whose elements are the numbers on that line separated by any non numeric character.
     * If there are no numbers on a line, an empty subarray is added.
     * @returns a 2D array of numbers
     */
    get2DArrayOfNumbers()
    {
      return this.raw.split('\n').map(str => (str.match(/-?[0-9]+/g) || []).map(Number))
    }

    /**
     * Requires an 'input.json' file in your directory
     * @returns a JSON object
     */
    getJSON()
    {
      return JSON.parse(this.fs.readFileSync(this.directory + '/input.json'));
    }

    /**
     * Returns a new string with items replaced or removed
     * Works with numbers or strings
     * @param toReplace [ [replaceThis, withThis], [replaceThis, withThis] ]
     * @returns Your data as a string with all elements specified replaced
     */
    getUpdated(toReplace)
    {
      let updatedString = this.raw;

      toReplace.forEach(el => {
        const replaceThis = el[0];
        const withThis = el[1] || '';
        updatedString = updatedString.replace(/\r|\n/g, ' ').replace(new RegExp(`\\b${replaceThis}\\b`, 'gi'), withThis);
      })

      return updatedString;
    }

  }
}