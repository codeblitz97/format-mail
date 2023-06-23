import { Fonts } from '../enums';

const emailFormatter = {
  img(url: string): string {
    return `<img src="${url}" />`;
  },
  bold(str: string): string {
    return `<strong>${str}</strong>`;
  },
  italic(str: string): string {
    return `<em>${str}</em>`;
  },
  strikethrough(str: string): string {
    return `<s>${str}</s>`;
  },
  font(font: Fonts, str: string): string {
    const fontName = font;
    return `<span style="font-family: ${fontName}">${str}</span>`;
  },
  underline(str: string): string {
    return `<u>${str}</u>`;
  },
  color(clr: string, str: string): string {
    return `<span style="color: ${clr}">${str}</span>`;
  },
  hex(value: string): string {
    return `#${value}`;
  },
  rgb(r: number, g: number, b: number): string {
    return `rgb(${r}, ${g}, ${b})`;
  },
  rgba(r: number, g: number, b: number, a: number): string {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  },
};

export { emailFormatter };
