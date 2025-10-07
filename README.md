# Easy Convert

Easy Convert is a web-based tool for performing unit conversions. Want to know how many tablespoons are in a cup or how many kilometers are in 100 miles? This tool can answer that for you.

![Easy Convert tool showing a conversion from 10 degrees Fahrenheit to -12.222 degrees Celsius](/images/card.png)

## Features

- ⚡ Simple, single-input query for fast conversions (e.g., "10ft to in")
- 🌐 Supports a wide range of units and metric prefixes
- ✨ Instant results with clear, easy-to-read formatting
- 📱 Mobile-friendly design for quick conversions on the go
- 🚫 No unnecessary clutter—just the information you need
- 🏖️ Works entirely in your browser, no sign-up or installation required
- 🌗 Easily toggle between light and dark themes
- 📦 Installable as a Progressive Web App (PWA) for offline use and home screen access

## Why Did I Make Another Unit Conversion Website?

Before this tool existed, I'd either ask Siri or search Google for the conversion. They would give me a straight answer about half the time, so the other half the time I'd end up clicking on one of the websites that provide unit conversions.

Those websites are often overcomplicated and filled with so much extra stuff that it's hard to find the info I'm actually looking for.

And if I start on one of those websites, there's a whole process to select which units and values I want which involves scrolling through long lists of categories and units, which is especially hard to do on a phone.

Easy Convert is the simple and easy to use alternative. It takes a different approach by letting you type a query into a single input box such as "10f to c". Easy Convert then parses your query, does the conversion, and shows you just the info you need. Simple, easy, and it works well on a phone.

## Find an Issue?

I do my best to make sure Easy Convert is as issue-free as possible, but sometimes issues slip through the cracks. Reporting the issue helps me to find it and fix it. You can submit a new issue report using [this link](https://github.com/Jon-Corey/EasyConvert/issues/new).

## Have a Suggestion?

I'd love to hear your suggestions for making Easy Convert better. You can submit a new suggestion using [this link](https://github.com/Jon-Corey/EasyConvert/issues/new).

## Want to Contribute Some Code?

If you have a feature or a fix that you would like to add to Easy Convert, feel free to create a pull request. Here's some info that might help:

### Code Overview

This tool is a simple static website. It uses HTML, CSS, and JavaScript. It doesn't use any CSS or JavaScript frameworks. There is no build process.

### Where Logic Happens

- `index.html` - Includes some JavaScript in the `<head>` for setting the theme (light/dark) before the page renders.
- `app.js` - Handles the theme toggle button and keeping the copyright year up to date. This is the place for putting miscellaneous JavaScript.
- `conversion.js` - Handles everything related to conversion. Handles the input, conversion, and output.
- `conversion-data.js` - Holds all of the data that defines each unit (Meter, Gram, Pound, etc.) and each metric prefix (Giga-, Mega-, Kilo-, etc.).

### Happy Path Flow

- User enters a query in the input box (e.g. "10ft to in")
- The query is parsed to extract the input value, input unit, and output unit (e.g. 10, Foot, Inch)
- The input value is converted to the base type for that type of unit (e.g. 10 Feet -> 3.048 Meters)
- The base value is converted to the output type (e.g. 3.048 Meters -> 120 Inches)
- The input and output are formatted nicely and shown to the user

### Running Locally

Since this is just a static website, it can be run locally by quite a few tools. I typically use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) plugin for [VS Code](https://code.visualstudio.com/) since it's really easy to use and supports Hot Reload.

## Want to Support Me or Say Thanks?

If you want to help me work on this tool and other tools like it, I have a Patreon where you can support me. I'd appreciate it if you took a look: [Patreon](https://patreon.com/JonCorey).

## Where to Find The Rest of the Cool Stuff I Do

I publish the rest of the cool stuff I do on my website, [JonCorey.Dev](https://joncorey.dev).
