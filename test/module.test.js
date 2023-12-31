const { emailFormatter, Fonts, Align, HTMLTags } = require('../dist');
describe('emailFormatter', () => {
  test('formatting with bold', () => {
    const formattedText = emailFormatter.bold('Hello');
    expect(formattedText).toBe('<b>Hello</b>');
  });

  test('formatting with font', () => {
    const fontName = Fonts.SansSerif;
    const formattedText = emailFormatter.font(fontName, 'Hello');
    expect(formattedText).toBe(
      '<span style="font-family: sans serif">Hello</span>',
    );
  });

  test('formatting with italic', () => {
    const formattedText = emailFormatter.italic('Hello');
    expect(formattedText).toBe('<em>Hello</em>');
  });

  test('formatting with color', () => {
    const formattedText = emailFormatter.color(
      emailFormatter.hex('FFFFFF'),
      'Hello!',
    );
    expect(formattedText).toBe('<span style="color: #FFFFFF">Hello!</span>');
  });
  test('formatting with color2', () => {
    const formattedText = emailFormatter.color(
      emailFormatter.rgba(255, 0, 0, 0.4),
      'Hello!',
    );
    expect(formattedText).toBe(
      '<span style="color: rgba(255, 0, 0, 0.4)">Hello!</span>',
    );
  });
  test('formatting with color3', () => {
    const formattedText = emailFormatter.color(
      emailFormatter.rgb(255, 0, 0),
      'Hello!',
    );
    expect(formattedText).toBe(
      '<span style="color: rgb(255, 0, 0)">Hello!</span>',
    );
  });

  test('formatting with strikethrough', () => {
    const formattedText = emailFormatter.strikethrough('Hello!');

    expect(formattedText).toBe('<s>Hello!</s>');
  });

  test('formatting with underline', () => {
    const formattedText = emailFormatter.underline('Hello!');

    expect(formattedText).toBe('<u>Hello!</u>');
  });

  test('formatting with size', () => {
    const newSizeText = emailFormatter.size('1rem', 'Hello');

    expect(newSizeText).toBe('<span style="font-size: 1rem">Hello</span>');
  });
  test('Align a string', () => {
    const AlignedText = emailFormatter.align(Align.center, 'Hello World!');
    expect(AlignedText).toBe(
      `<span style="text-align: center">Hello World!</span>`,
    );
  });
});

describe('HTMLTags', () => {
  test('formatting with image', () => {
    const formattedImage = HTMLTags.img(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
    );
    expect(formattedImage).toBe(
      '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"/>',
    );
  });
  test('multiple functions', () => {
    const MultipleFunctions = HTMLTags.heading1(
      `Hello ${HTMLTags.span('World', 'color: green', 'font-size: 60px')}`,
    );
    expect(MultipleFunctions).toBe(
      `<h1>Hello <span style="color: green; font-size: 60px;">World</span></h1>`,
    );
  });
});
