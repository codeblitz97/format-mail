# Format-Mail ✉️

Formatter for email, making your email look beautiful! 😍

## ℹ️ Info

Format-Mail is a simple Node.js module for formatting email contents. With this module, you can add images, headings, and styles to your email to make it visually appealing. It is specifically designed for use with [Nodemailer](https://npmjs.com/nodemailer), a popular email sending library.

## Installation

```sh
npm install format-mail@latest
```

Or, if you prefer using Yarn:

```sh
yarn add format-mail@latest
```

## Basic Formatting Example (JavaScript)

```javascript
'use strict';
const nodemailer = require('nodemailer');
const { emailFormatter, HTMLTags } = require('format-mail');

const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    // TODO: Replace `user` and `pass` values from <https://forwardemail.net>
    user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
    pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
  },
});

// async..await is not allowed in the global scope, so we wrap the code in an async function
async function main() {
  // Send mail with the defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // Sender address
    to: 'bar@example.com, baz@example.com', // List of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // Plain text body
    html: `${emailFormatter.bold('Hello world?')}\n${HTMLTags.heading1(
      'Hello world!',
      'text-align: center',
      'display: flex',
      'justify-contents: center',
      'align-items: center'
    )}`, // HTML body with formatted text and basic styles
  });

  console.log('Message sent: %s', info.messageId);
  // Output: Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see the delivery status and preview of your email.
  //       Alternatively, you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator.
  //       Check out the repository at <https://github.com/forwardemail/preview-email>.
  //
}

main().catch(console.error);
```

## Basic Formatting Example (TypeScript)

```typescript
import * as nodemailer from 'nodemailer';
import { emailFormatter, HTMLTags } from 'format-mail';

const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    // TODO: Replace `user` and `pass` values from <https://forwardemail.net>
    user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
    pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // Sender address
    to: 'bar@example.com, baz@example.com', // List of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // Plain text body
    html: `${emailFormatter.bold('Hello world?')}\

n${HTMLTags.heading1(
      'Hello world!',
      'text-align: center',
      'display: flex',
      'justify-contents: center',
      'align-items: center'
    )}`, // HTML body with formatted text and basic styles
  });

  console.log('Message sent: %s', info.messageId);
  // Output: Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see the delivery status and preview of your email.
  //       Alternatively, you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator.
  //       Check out the repository at <https://github.com/forwardemail/preview-email>.
  //
}

main().catch(console.error);
```

Feel free to explore the Format-Mail module and unleash your creativity in formatting beautiful emails! 😊🎉
