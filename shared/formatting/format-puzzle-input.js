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
     * Each line of raw data becomes a number in the array.
     * @warning Leading zeroes will be removed.
     * @returns an array of numbers.
     */
    getArrayOfNumbersByLine()
    {
      return this.raw.replace(/\r/g, '').split('\n').map(Number);
    }

    /**
     * When given rows of data, it will give you a 2D array with the numbers in each column.
     * @param separator how the numbers in the rows are separated ('' = no space between row items, etc.)
     * @returns Returns an array of all numbers in a column.
     */
    getArrayOfNumbersByColumn(separator)
    {
      let columns = [];
      let rows = this.raw.replace(/\r/g, '').split('\n').map(e => e.split(separator));
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        row.forEach((r, index) => {
          if (!columns[index]) columns[index] = [+r];
          else columns[index].push(+r);
        })
      }

      return columns;
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
     * Each character in the raw data becomes an element in the array.
     * Spaces are NOT removed.
     * @returns an array of strings
     */
      getArrayOfStringsByCharWithSpaces()
      {
        return this.raw.replace(/\r|\n/g, '').split('');
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
     * Get array of strings split by an empty line.
     * @returns An array of strings.
     */
    getArrayOfStringsSplitByBlankLine() {
      return this.raw.split('\r\n\r\n');
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
     * Returns the ascii value for the given character.
     * @param character The character that you'd like the ASCII value for. 
     * @returns The ASCII value for the provided character.
     */
    ascii (character) { return character.charCodeAt(0); }

    /**
     * Get the ASCII values for each number in the list.
     * @param separator How to separate the elements (i.e. ',' OR ' ' OR '' ... etc.)
     * @param includeSeparator Boolean - Whether to include the separator ASCII values. 
     * If comma is the separator, ASCII character '44' will be included in the array every time there is a comma.
     * @returns An array of all the ASCII values for each number in your list.
     */
    getArrayOfASCIINumbers(separator, includeSeparator)
    {
      const asciiValues = this.raw.replace(/\s|\r|\n/g, separator).split(separator).map(this.ascii);
      if (includeSeparator) {
        const withSeparators = [].concat(...asciiValues.map(n => [n, this.ascii(separator)])).slice(0, -1)
        return withSeparators;
      }
      else return asciiValues;
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
     * Returns an array split by line breaks.
     */
    getArrayByLineBreaks()
    {
      return this.raw.split('\r\n\r\n').map(str => str.replace(/\r|\n/g, ""));
    }

    /**
     * Each line of raw data becomes a subarray whose elements are separated by the param you specified
     * @param separator how you would like the subarrays separated (ie ' ' OR ',' etc)
     * @returns a 2D array of strings (spaces NOT removed)
     */
    get2DArrayOfStrings(separator)
    {
      return this.raw.replace(/\r/g, '').split('\n').map(e => e.split(separator));
    }

    /**
     * Each line of raw data becomes a subarray whose elements are separated by the param you specified
     * @param separator how you would like the subarrays separated (ie ' ' OR ',' etc)
     * @returns a 2D array of strings (spaces removed)
     */
    get2DArrayOfStringsSpacesRemoved(separator)
    {
      return this.raw.replace(/\r/g, '').split('\n').map(e => e.split(separator).map(s => s.trim()));
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
     * Each line of raw data becomes a subarray whose elements are the numbers on that line separated by any non numeric character.
     * If there are no numbers on a line, an empty subarray is added.
     * @param toReplace [ [replaceThis, withThis], [replaceThis, withThis] ]
     * @returns a 2D array of numbers
     */
     get2DArrayOfNumbersWithItemsReplaced(toReplace)
     {
      this.raw = this.getUpdated(toReplace);
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
        updatedString = updatedString.replace(new RegExp(`\\b${replaceThis}\\b`, 'gi'), withThis);
      })

      return updatedString;
    }

  }
}