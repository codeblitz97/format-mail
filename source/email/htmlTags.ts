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
  /**
   * Generates a paragraph tag with optional styles.
   * @param {string} str - The content of the h3 tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated paragraph tag HTML.
   */
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
  /**
   * Generates a div tag with optional styles.
   * @param {string} str - The content of the h3 tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated div tag HTML.
   */
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
  /**
   * Generates a span tag with optional styles.
   * @param {string} str - The content of the span tag.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated span tag HTML.
   */
  span(str: string, ...style: string[]) {
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'InvalidSpanType',
        `Expected type of 'STR' to be 'string' but got ${getType(str)} instead.`
      );
    }
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<span${
      styleString ? ' style="' + styleString + '"' : ''
    }>${str}</span>`;
  },

  /**
   * Generates an unordered list (ul) tag with optional styles.
   * @param {string[]} items - The array of list items.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated ul tag HTML.
   */
  ul(items: string[], ...style: string[]) {
    const itemTags = items.map((item) => `<li>${item}</li>`).join('');
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<ul${
      styleString ? ' style="' + styleString + '"' : ''
    }>${itemTags}</ul>`;
  },

  /**
   * Generates an ordered list (ol) tag with optional styles.
   * @param {string[]} items - The array of list items.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated ol tag HTML.
   */
  ol(items: string[], ...style: string[]) {
    const itemTags = items.map((item) => `<li>${item}</li>`).join('');
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<ol${
      styleString ? ' style="' + styleString + '"' : ''
    }>${itemTags}</ol>`;
  },

  /**
   * Generates a horizontal rule (hr) tag with optional styles.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated hr tag HTML.
   */
  hr(...style: string[]) {
    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<hr${styleString ? ' style="' + styleString + '"' : ''} />`;
  },

  /**
   * Generates a line break (br) tag.
   * @returns {string} The generated br tag HTML.
   */
  br() {
    return `<br />`;
  },

  /**
   * Generates a table (table) tag with optional styles.
   * @param {string} content - The content of the table.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated table tag HTML.
   */
  table(content: string, ...style: string[]) {
    if (typeof content !== 'string') {
      throwError(
        'Custom',
        'InvalidParagraphType',
        `Expected type of 'STR' to be 'string' but got ${getType(
          content
        )} instead.`
      );
    }

    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<table${
      styleString ? ' style="' + styleString + '"' : ''
    }>${content}</table>`;
  },

  /**
   * Generates a table row (tr) tag with optional styles.
   * @param {string} content - The content of the table row.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated tr tag HTML.
   */
  tr(content: string, ...style: string[]) {
    if (typeof content !== 'string') {
      throwError(
        'Custom',
        'InvalidParagraphType',
        `Expected type of 'STR' to be 'string' but got ${getType(
          content
        )} instead.`
      );
    }

    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<tr${
      styleString ? ' style="' + styleString + '"' : ''
    }>${content}</tr>`;
  },

  /**
   * Generates a table data (td) tag with optional styles.
   * @param {string} content - The content of the table data.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated td tag HTML.
   */
  td(content: string, ...style: string[]) {
    if (typeof content !== 'string') {
      throwError(
        'Custom',
        'InvalidParagraphType',
        `Expected type of 'STR' to be 'string' but got ${getType(
          content
        )} instead.`
      );
    }

    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<td${
      styleString ? ' style="' + styleString + '"' : ''
    }>${content}</td>`;
  },

  /**
   * Generates a table header (th) tag with optional styles.
   * @param {string} content - The content of the table header.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated th tag HTML.
   */
  th(content: string, ...style: string[]) {
    if (typeof content !== 'string') {
      throwError(
        'Custom',
        'InvalidParagraphType',
        `Expected type of 'STR' to be 'string' but got ${getType(
          content
        )} instead.`
      );
    }

    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';
    return `<th${
      styleString ? ' style="' + styleString + '"' : ''
    }>${content}</th>`;
  },

  /**
   * Generates a button tag with optional styles and onClick event handler.
   * @param {string} text - The text content of the button.
   * @param {Object} options - The options for the button.
   * @param {Function} options.onClick - The onClick event handler function.
   * @param {...string} style - Optional styles to be applied.
   * @returns {string} The generated button tag HTML.
   */
  button(text: string, options: { onClick: Function }, ...style: string[]) {
    const onClickHandler = options.onClick
      ? `onclick="${options.onClick.toString()}"`
      : '';

    const styleString =
      style.length > 0 ? style.map((s: string) => s + ';').join(' ') : '';

    return `<button${onClickHandler}${
      styleString ? ' style="' + styleString + '"' : ''
    }>${text}</button>`;
  },
};
