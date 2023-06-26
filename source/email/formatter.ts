import { Align, Fonts } from '../enums';

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
        super(\`${errorName}\\n\${errorMessage}\`);
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
 * The emailFormatter object with various formatting functions.
 * @namespace
 */
export const emailFormatter = {
  /**
   * Formats the given string into bold text.
   * @param {string} str - The text you want to be bold.
   * @returns {string} - The formatted bold text.
   */
  bold(text?: string) {
    const str = text ?? 'Hello, World!';
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<strong>${str}</strong>`;
  },

  /**
   * Formats the given string into italic text.
   * @param {string} str - The text you want to be italic.
   * @returns {string} - The formatted italic text.
   */
  italic(text?: string) {
    const str = text ?? 'Hello, World!';

    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<em>${str}</em>`;
  },

  /**
   * Formats the given string into strikethrough text.
   * @param {string} str - The text you want to be strikethrough.
   * @returns {string} - The formatted strikethrough text.
   */
  strikethrough(text?: string) {
    const str = text ?? 'Hello, World!';

    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<s>${str}</s>`;
  },

  /**
   * Formats the given string with the specified font.
   * @param {Fonts} font - The font name.
   * @param {string} str - The text you want to change the font.
   * @returns {string} - The formatted text with the new font.
   */
  font(font?: Fonts, text?: string) {
    const str = text ?? 'Hello, World!';
    const fontName = font ?? Fonts.SansSerif;
    if (!Object.values(Fonts).includes(fontName)) {
      throwError(
        'Error',
        'InvalidFont',
        `Expected a valid font. But got ${font}`
      );
    }
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<span style="font-family: ${fontName}">${str}</span>`;
  },

  /**
   * Formats the given string into underlined text.
   * @param {string} str - The text you want to be underline.
   * @returns {string} - The formatted underlined text.
   */
  underline(text?: string) {
    const str = text ?? 'Hello, World!';
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<u>${str}</u>`;
  },

  /**
   * Formats the given string with the specified color.
   * @param {string} clr - The color value.
   * @param {string} str - The text you want to change the color.
   * @returns {string} - The formatted text with the new color.
   */
  color(color?: string, text?: string) {
    const str = text ?? 'Hello, World!';
    let clr = color ?? 'black';

    if (typeof clr !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'CLR' to be 'string' but received ${getType(clr)}`
      );
    }
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<span style="color: ${clr}">${str}</span>`;
  },

  /**
   * Formats the given value into a hexadecimal color.
   * @param {string} value - The value to format as hexadecimal.
   * @returns {string} - The formatted hexadecimal color.
   */
  hex(hexString: string) {
    let value = hexString ?? 'FFFFFF';
    if (typeof value !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'value' to be 'string' but received ${getType(value)}`
      );
    }
    return `#${value}`;
  },

  /**
   * Formats the given RGB values into an RGB color.
   * @param {number} r - The red component (0-255).
   * @param {number} g - The green component (0-255).
   * @param {number} b - The blue component (0-255).
   * @returns {string} - The formatted RGB color.
   */
  rgb(red: number, green: number, blue: number) {
    let r = red ?? 255;
    let g = green ?? 0;
    let b = blue ?? 0;

    if (typeof r !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'r' to be 'number' but received ${getType(r)}`
      );
    }
    if (typeof g !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'g' to be 'number' but received ${getType(g)}`
      );
    }
    if (typeof b !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'b' to be 'number' but received ${getType(b)}`
      );
    }
    return `rgb(${r}, ${g}, ${b})`;
  },

  /**
   * Formats the given RGB values and alpha channel into an RGBA color.
   * @param {number} r - The red component (0-255).
   * @param {number} g - The green component (0-255).
   * @param {number} b - The blue component (0-255).
   * @param {number} a - The alpha channel (0-1).
   * @returns {string} - The formatted RGBA color.
   */
  rgba(red: number, green: number, blue: number, alpha: number) {
    let r = red ?? 255;
    let g = green ?? 0;
    let b = blue ?? 0;
    let a = alpha ?? 0.4;

    if (typeof r !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'r' to be 'number' but received ${getType(r)}`
      );
    }
    if (typeof g !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'g' to be 'number' but received ${getType(g)}`
      );
    }
    if (typeof b !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'b' to be 'number' but received ${getType(b)}`
      );
    }
    if (typeof a !== 'number') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'a' to be 'number' but received ${getType(a)}`
      );
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  },

  /**
   * Formats the given string with the specified font size.
   * @param {string} size - The font size.
   * @param {string} str - The text you want to change the font size.
   * @returns {string} - The formatted text with the new font size.
   */
  size(fontSize?: string, text?: string) {
    const str = text ?? 'Hello, World!';
    let size = fontSize ?? 'medium';

    if (typeof size !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'size' to be 'string' but received ${getType(size)}`
      );
    }
    if (typeof str !== 'string') {
      throwError(
        'Custom',
        'EmailFormatterError',
        `Expected type of 'STR' to be 'string' but received ${getType(str)}`
      );
    }
    return `<span style="font-size: ${size}">${str}</span>`;
  },

  /**
   * Formats the given string with the specified text alignment.
   * @param {Align} align - The text alignment.
   * @param {string} str - The text you want to align.
   * @returns {string} - The formatted text with the new alignment.
   */
  align(textAlign?: Align, text?: string) {
    const align = textAlign ?? Align.left;
    const str = text ?? 'Hello, World!';

    return `<span style="text-align: ${align}">${str}</span>`;
  },
};
