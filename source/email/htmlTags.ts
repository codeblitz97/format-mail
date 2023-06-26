/**
 * Returns the type of the given identifier.
 * @param {*} identifier - The identifier to check the type of.
 * @returns {number | "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | null} - The type of the identifier.
 */

const getType = (identifier: any) => {
  if (identifier === Number.isNaN) {
    return NaN;
  } else if (identifier === null) {
    return null;
  } else {
    return typeof identifier;
  }
};

/**
 * Represents the type of error.
 * @typedef {("Error"|"TypeError"|"SyntaxError"|"ReferenceError"|"RangeError"|"Custom")} ErrorType
 */

type ErrorType =
  | 'Error'
  | 'TypeError'
  | 'SyntaxError'
  | 'ReferenceError'
  | 'RangeError'
  | 'Custom';

/**
 * Creates a custom error class with the given error name.
 * @param {string} errorName - The name of the custom error class.
 * @returns {any} - The created custom error class.
 */
function createCustomErrorClass(errorName: string) {
  return eval(`
      class ${errorName} extends Error {
        constructor(message) {
          const errorMessage = message.join(" ");
          super(\`${errorName}\${errorMessage}\`);
          this.name = "${errorName}";
          Object.setPrototypeOf(this, new.target.prototype);
        }
      }
      
      ${errorName};
    `);
}

/**
 * Throws an error with the specified error type, error name, and message.
 * @param {ErrorType} errorType - The type of the error.
 * @param {string} errorName - The name of the error.
 * @param {...string} message - The error message.
 * @returns {void}
 */
function throwError(
  errorType: ErrorType,
  errorName: string,
  ...message: string[]
) {
  if (errorType === 'Custom') {
    const customErrorClass = createCustomErrorClass(errorName);
    throw new customErrorClass(message);
  }

  const errorConstructor = globalThis[errorType] || Error;
  const errorMessage = message.join('\n');
  throw new errorConstructor(`${errorName}\n${errorMessage}`);
}

/**
 * Object with the HTML Tags.
 * @namespace
 */
export const HTMLTags = {
  /**
   * Generates an h1 tag with optional styles.
   * @param {string} str - The content of the h1 tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated h1 tag HTML.
   */
  heading1(str: string, ...style: string[]) {
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidHeadingType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<h1${
      styleString ? ' style="' + styleString + '"' : ''
    }>${str}</h1>`;
  },

  /**
   * Generates an h2 tag with optional styles.
   * @param {string} str - The content of the h2 tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated h2 tag HTML.
   */
  heading2(str: string, ...style: string[]) {
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidHeadingType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<h2${
      styleString ? ' style="' + styleString + '"' : ''
    }>${str}</h2>`;
  },

  /**
   * Generates an h3 tag with optional styles.
   * @param {string} str - The content of the h3 tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated h3 tag HTML.
   */
  heading3(str: string, ...style: string[]) {
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidHeadingType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<h3${
      styleString ? ' style="' + styleString + '"' : ''
    }>${str}</h3>`;
  },

  /**
   * Generates an anchor tag with optional styles.
   * @param {string} href - The URL for the anchor tag.
   * @param {string} str - The text content of the anchor tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated anchor tag HTML.
   */
  link(href: string, str: string, ...style: string[]) {
    if (typeof href !== 'string') {
      throwError(
        'Custom',
        'InvalidHeadingType',
        `Expected type of 'href' to be 'string' but got ${getType(
          href
        )} instead.`
      );
    }
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidHeadingType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<a href=${href}${
      styleString ? ' style="' + styleString + '"' : ''
    }>${str}</a>`;
  },
  /**
   * Formats the given URL into an image tag.
   * @param {string} url - The URL of the image.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} - The formatted image tag.
   */
  img(url: string, ...style: string[]) {
    if (typeof url !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'URL' to be 'string' but received ${getType(url)}`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<img src="${url}"${
      styleString ? ' style="' + styleString + '"' : ''
    }/>`;
  },
  paragraph(str: string, ...style: string[]) {
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidParagraphType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<p${styleString ? ' style="' + styleString + '"' : ''}>${str}</p>`;
  },
  div(str: string, ...style: string[]) {
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidDivType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<div${
      styleString ? ' style="' + styleString + '"' : ''
    }>${str}</div>`;
  },
};
