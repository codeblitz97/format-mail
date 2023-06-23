const { emailFormatter, Fonts } = require('../dist');

describe('emailFormatter', () => {
  test('formatting with bold', () => {
    const formattedText = emailFormatter.bold('Hello');
    expect(formattedText).toBe('<strong>Hello</strong>');
  });

  test('formatting with font', () => {
    const fontName = Fonts.Abel;
    const formattedText = emailFormatter.font(fontName, 'Hello');
    expect(formattedText).toBe('<span style="font-family: Abel">Hello</span>');
  });

  test('formatting with italic', () => {
    const formattedText = emailFormatter.italic('Hello');
    expect(formattedText).toBe('<em>Hello</em>');
  });

  test('formatting with color', () => {
    const formattedText = emailFormatter.color(
      emailFormatter.hex('FFFFFF'),
      'Hello!'
    );
    expect(formattedText).toBe('<span style="color: #FFFFFF">Hello!</span>');
  });
  test('formatting with color2', () => {
    const formattedText = emailFormatter.color(
      emailFormatter.rgba(255, 0, 0, 0.4),
      'Hello!'
    );
    expect(formattedText).toBe(
      '<span style="color: rgba(255, 0, 0, 0.4)">Hello!</span>'
    );
  });
  test('formatting with color3', () => {
    const formattedText = emailFormatter.color(
      emailFormatter.rgb(255, 0, 0),
      'Hello!'
    );
    expect(formattedText).toBe(
      '<span style="color: rgb(255, 0, 0)">Hello!</span>'
    );
  });

  test('formatting with image', () => {
    const formattedImage = emailFormatter.img(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png'
    );
    expect(formattedImage).toBe(
      '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" />'
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
});
