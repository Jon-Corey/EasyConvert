import { units, metricPrefixes } from "/scripts/conversion-data.js";

// The input field and result container
const input = document.getElementById('conversionInput');
const result = document.getElementById('result');

// Shown when there isn't any input. Instructs the user on how to use the converter and gives some example inputs.
const tutorialHTML = `
    <div class="conversion-card">
        <div class="card-text">
            <strong>Welcome!</strong>
            <p>Get started by entering a conversion in the box above. We'll parse your input and show you the result.</p>
            <p>Example input:</p>
            <ul>
                <li><code>10f to c</code></li>
                <li><code>5 miles in km</code></li>
                <li><code>60 GB to Mebibytes</code></li>
                <li><code>1atm to psi</code></li>
            </ul>
        </div>
    </div>
`;
// Shown when the input couldn't be parsed.
const couldntParseHTML = `
    <div class="conversion-card">
        <div class="card-text">
            <strong>Couldn't parse your input</strong>
            <p>We try to allow for a variety of input formats, but sometimes we need a little help understanding what you're trying to convert.</p>
            <p>If you expected to see results, please let us know by <a href="https://github.com/Jon-Corey/EasyConvert/issues/new" target="_blank" rel="noopener noreferrer">submitting an issue on GitHub</a>.</p>
        </div>
    </div>
`;
// Shown while the user is typing to prevent the "Couldn't Parse" message from showing before we're sure there's an issue (as opposed to just an incomplete input).
const loadingHTML = `
    <div class="conversion-card">
        <div class="card-text">
            <strong>Loading...</strong>
        </div>
    </div>
`;

// Used to debounce the couldn't parse message while the user is typing.
let parseTimeout = null;

// Accept an initial input from the URL query string if present
const urlParams = new URLSearchParams(window.location.search);
const initialInput = urlParams.get('query');
if (initialInput) {
    input.value = initialInput;
    handleInput();
}

// Event listener for input changes
document.addEventListener('DOMContentLoaded', function() {
    input.addEventListener('input', function() {
        handleInput();
    });
});

/**
 * Handles input changes and updates the conversion result.
 * @returns {void}
 */
function handleInput() {
    const query = input.value.trim();

    // Clear any previous timeout
    if (parseTimeout) {
        clearTimeout(parseTimeout);
        parseTimeout = null;
    }

    if (query.length === 0) {
        result.innerHTML = tutorialHTML;
        return;
    }

    const results = parseConversion(query);
    if (!results) {
        result.innerHTML = loadingHTML;
        parseTimeout = setTimeout(() => {
            // Only show Couldn't Parse if input hasn't changed
            if (input.value.trim() === query) {
                result.innerHTML = couldntParseHTML;
            }
        }, 1000);
        return;
    }

    // If parse succeeds, show result instantly
    result.innerHTML = `
        <div class="conversion-card">
            <div class="card-side">
                <div class="card-number">${results.inputValue}</div>
                <div class="card-unit">${results.inputUnit}</div>
            </div>
            <div class="card-arrow">
                <svg fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </div>
            <div class="card-side">
                <div class="card-number">${results.outputValue}</div>
                <div class="card-unit">${results.outputUnit}</div>
            </div>
        </div>
    `;
}

/**
 * Parses the conversion query and performs the conversion.
 * @param {string} query - The conversion query string.
 * @returns {Object|null} - An object containing inputValue, inputUnit, outputValue, and outputUnit, or null if parsing fails.
 */
function parseConversion(query) {
    // Starts from the beginning of the string, matches any of the metric prefixes or their abbreviations, followed immediately by one or more non-whitespace characters that continue to the end of the string. Case insensitive.
    // First group is the prefix, second group is the unit.
    // Examples:
    // "kilogram" -> ["kilo", "gram"]
    // "mb" -> ["m", "b"]
    // "Milliwatt" -> ["Milli", "watt"]
    const metricRegex = /^(peta|pebi|tera|tebi|giga|gibi|mega|mebi|kilo|kibi|hecto|deca|deci|centi|milli|micro|nano|pico|Pi|P|Ti|T|Gi|G|Mi|M|Ki|k|h|da|d|c|m|μ|n|p)(\S+)$/i;

    // Starts from the beginning of the string, matches a number (integer or decimal), followed by optional whitespace, followed by a unit (which can include spaces), followed by "to", "in", "into", "as", ">", "=", "->", "=>", or ":", followed by required whitespace, followed by another unit (which can include spaces), and continues to the end of the string. Case insensitive.
    // First group is the input value, second group is the input unit, third group is the output unit.
    // Examples:
    // "10f to c" -> ["10", "f", "c"]
    // "5 miles in km" -> ["5", "miles", "km"]
    // "60 GB to Mebibytes" -> ["60", "GB", "Mebibytes"]
    // "1atm to psi" -> ["1", "atm", "psi"]
    const queryRegex = /^([\d.]+)\s*(\S.*?)\s+(?:to|in|into|as|>|=|->|=>|:)\s+(\S.*)$/i;

    // Extract the input value, input unit, and output unit from the query
    const match = query.match(queryRegex);
    if (!match) return null;
    const inputValue = match[1];
    const inputUnit = match[2];
    const outputUnit = match[3];

    // Get the data for the input unit (kg, g, meter, etc.)
    let inputUnits = findUnits(inputUnit);
    let inputPrefix = null;
    // If no units were found, check for metric prefixes (kilo, milli, etc.)
    if (inputUnits.length === 0) {
        if (inputUnit.toLowerCase().startsWith("square ")) {
            const inputUnitMetricMatch = inputUnit.slice(7).match(metricRegex);
            if (inputUnitMetricMatch) {
                inputPrefix = inputUnitMetricMatch[1];
                const baseUnit = "square " + inputUnitMetricMatch[2];
                inputUnits = findUnits(baseUnit, true, "area");
            }
        } else if (inputUnit.toLowerCase().startsWith("cubic ")) {
            const inputUnitMetricMatch = inputUnit.slice(6).match(metricRegex);
            if (inputUnitMetricMatch) {
                inputPrefix = inputUnitMetricMatch[1];
                const baseUnit = "cubic " + inputUnitMetricMatch[2];
                inputUnits = findUnits(baseUnit, true, "volume");
            }
        } else {
            const inputUnitMetricMatch = inputUnit.match(metricRegex);
            if (inputUnitMetricMatch) {
                inputPrefix = inputUnitMetricMatch[1];
                const baseUnit = inputUnitMetricMatch[2];
                inputUnits = findUnits(baseUnit, true);
            }
        }
    }
    // If still no units were found, return null
    if (inputUnits.length === 0) return null;

    // Get the data for the output unit (kg, g, meter, etc.)
    let outputUnits = findUnits(outputUnit);
    let outputPrefix = null;
    // If no units were found, check for metric prefixes (kilo, milli, etc.)
    if (outputUnits.length === 0) {
        if (outputUnit.toLowerCase().startsWith("square ")) {
            const outputUnitMetricMatch = outputUnit.slice(7).match(metricRegex);
            if (outputUnitMetricMatch) {
                outputPrefix = outputUnitMetricMatch[1];
                const baseUnit = "square " + outputUnitMetricMatch[2];
                outputUnits = findUnits(baseUnit, true, "area");
            }
        } else if (outputUnit.toLowerCase().startsWith("cubic ")) {
            const outputUnitMetricMatch = outputUnit.slice(6).match(metricRegex);
            if (outputUnitMetricMatch) {
                outputPrefix = outputUnitMetricMatch[1];
                const baseUnit = "cubic " + outputUnitMetricMatch[2];
                outputUnits = findUnits(baseUnit, true, "volume");
            }
        } else {
            const outputUnitMetricMatch = outputUnit.match(metricRegex);
            if (outputUnitMetricMatch) {
                outputPrefix = outputUnitMetricMatch[1];
                const baseUnit = outputUnitMetricMatch[2];
                outputUnits = findUnits(baseUnit, true);
            }
        }
    }
    // If still no units were found, return null
    if (outputUnits.length === 0) return null;

    let inputUnitData = null;
    let outputUnitData = null;

    // Find a pair of units that are of the same type (e.g. both length, both temperature, etc.)
    // This resolves overlap in unit names between different types (e.g. "f" can mean both Fahrenheit and Foot. We want to make sure we use the correct one based on the output unit.)
    for (const iu of inputUnits) {
        for (const ou of outputUnits) {
            if (iu.type === ou.type) {
                inputUnitData = iu;
                outputUnitData = ou;
                break;
            }
        }
    }
    // If no matching types were found, return null
    if (!inputUnitData || !outputUnitData) return null;
    if (inputUnitData.type !== outputUnitData.type) return null;
    
    // Convert the value from the input unit to the output unit
    let value = 0;
    let inputPrefixData = null;
    let outputPrefixData = null;
    if (inputPrefix) {
        inputPrefixData = findMetricPrefix(inputPrefix);
        value = inputUnitData.toBase(parseFloat(inputValue * inputPrefixData.value));
    } else {
        value = inputUnitData.toBase(parseFloat(inputValue));
    }
    if (outputPrefix) {
        outputPrefixData = findMetricPrefix(outputPrefix);
        value = outputUnitData.fromBase(value) / outputPrefixData.value;
    } else {
        value = outputUnitData.fromBase(value);
    }

    // Get the display values
    value = shortenNumber(value);

    let inputUnitDisplay = parseFloat(inputValue) === 1 ? inputUnitData.displayName : inputUnitData.pluralDisplayName;
    if (inputPrefixData) {
        if (inputUnitDisplay.toLowerCase().startsWith("square ")) {
            inputUnitDisplay = "Square " + inputPrefixData.displayName + inputUnitDisplay.slice(7).toLowerCase();
        } else if (inputUnitDisplay.toLowerCase().startsWith("cubic ")) {
            inputUnitDisplay = "Cubic " + inputPrefixData.displayName + inputUnitDisplay.slice(6).toLowerCase();
        } else {
            inputUnitDisplay = inputPrefixData.displayName + inputUnitDisplay.toLowerCase();
        }
    }
    let outputUnitDisplay = parseFloat(value) === 1 ? outputUnitData.displayName : outputUnitData.pluralDisplayName;
    if (outputPrefixData) {
        if (outputUnitDisplay.toLowerCase().startsWith("square ")) {
            outputUnitDisplay = "Square " + outputPrefixData.displayName + outputUnitDisplay.slice(7).toLowerCase();
        } else if (outputUnitDisplay.toLowerCase().startsWith("cubic ")) {
            outputUnitDisplay = "Cubic " + outputPrefixData.displayName + outputUnitDisplay.slice(6).toLowerCase();
        } else {
            outputUnitDisplay = outputPrefixData.displayName + outputUnitDisplay.toLowerCase();
        }
    }

    // Return the display values
    return { inputValue, inputUnit: inputUnitDisplay, outputValue: value, outputUnit: outputUnitDisplay };
}

/**
 * Finds units based on the provided criteria.
 * @param {string} unitName - The name of the unit to find.
 * @param {boolean|null} isMetric - Whether to filter by metric (true), imperial (false), or not at all (null).
 * @param {string|null} type - The type of unit to filter to (e.g. length, weight, etc.). Null doesn't filter by type.
 * @returns {Array} - An array of matching unit objects.
 */
function findUnits(unitName, isMetric = null, type = null) {
    // Checks first for exact matches (case sensitive), then for case insensitive matches if none are found.
    // This allows for case sensitive units (e.g. "B" for byte vs "b" for bit) while still allowing for flexibility in user input.
    let foundUnits = units.filter(unit => unit.aliases.includes(unitName) && (isMetric === null || unit.metric === isMetric) && (type === null || unit.type === type));
    if (foundUnits.length === 0) {
        foundUnits = units.filter(unit => unit.aliases.includes(unitName.toLowerCase()) && (isMetric === null || unit.metric === isMetric) && (type === null || unit.type === type));
    }
    return foundUnits;
}

/**
 * Finds a metric prefix by its name.
 * @param {string} prefixName - The name of the prefix to find.
 * @returns {Object|null} - The matching prefix object, or null if not found.
 */
function findMetricPrefix(prefixName) {
    // Checks first for exact matches (case sensitive), then for case insensitive matches if none are found.
    // This allows for case sensitive prefixes (e.g. "M" for mega vs "m" for milli) while still allowing for flexibility in user input.
    let foundPrefix = metricPrefixes.find(prefix => prefix.aliases.includes(prefixName));
    if (!foundPrefix) {
        foundPrefix = metricPrefixes.find(prefix =>
            prefix.aliases.some(alias => alias.toLowerCase() === prefixName.toLowerCase())
        );
    }
    return foundPrefix;
}

/**
 * Shortens a number by converting very large or very small numbers to scientific notation any by rounding other numbers to 3 decimal places.
 * @param {number} number - The number to shorten.
 * @returns {string} - The shortened number as a string.
 */
function shortenNumber(number) {
    if (Math.abs(number) >= 1e6 || (Math.abs(number) > 0 && Math.abs(number) < 1e-3)) {
        // Convert very big or very small numbers to scientific notation
        return number.toExponential(2);
    } else {
        // Otherwise round to 3 decimal places
        return (Math.round(number * 1000) / 1000).toString();
    }
}
