import { units, metricPrefixes } from './conversion-data.js';
import { parseConversion, findUnits, findMetricPrefix, shortenNumber } from './conversion.js';

export default runTests;
export function runTests() {
    console.group("Tests");

    // Conversion Data Tests
    testConflicts();
    testOverlappingAliasSets();
    testNamingFunctions();

    // Conversion Tests
    testParseConversion();
    testFindUnits();
    testFindMetricPrefix();
    testShortenNumber();

    console.groupEnd();
}

// Conversion Data Tests

function testConflicts() {
    console.group("Conflict Tests");

    let anyIssues = false;

    // Convert units array into a dictionary of <type, unit[]>
    const types = units.reduce((acc, unit) => {
        if (!acc[unit.type]) {
            acc[unit.type] = [];
        }
        acc[unit.type].push(unit);
        return acc;
    }, {});

    // For each type, check for conflicts
    for (const [type, unitList] of Object.entries(types)) {
        // Get all aliases
        const aliasMap = {};
        for (const unit of unitList) {
            for (const alias of unit.aliases) {
                if (!aliasMap[alias]) {
                    aliasMap[alias] = [];
                }
                aliasMap[alias].push(unit.getName());

                // Include metric prefixes if applicable
                if (unit.metric) {
                    for (const prefix of Object.values(metricPrefixes)) {
                        for (const prefixAlias of prefix.aliases) {
                            const prefixedAlias = prefixAlias + alias;
                            if (!aliasMap[prefixedAlias]) {
                                aliasMap[prefixedAlias] = [];
                            }
                            aliasMap[prefixedAlias].push(unit.getName(prefix.displayName));
                        }
                    }
                }
            }
        }

        // Check for conflicts
        // Get all aliases that map to more than one unit
        const conflicts = Object.entries(aliasMap).filter(([alias, unitNames]) => unitNames.length > 1);
        if (conflicts.length > 0) {
            for (const [alias, unitNames] of conflicts) {
                anyIssues = true;
                console.error(`Alias "${alias}" maps to multiple ${type} units: ${unitNames.join(', ')}`);
            }
        }
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }

    console.groupEnd();
}

function testOverlappingAliasSets() {
    console.group("Overlapping Alias Set Tests");

    let anyIssues = false;

    // Get all aliases
    const aliasMap = {};
    for (const unit of units) {
        for (const alias of unit.aliases) {
            if (!aliasMap[alias]) {
                aliasMap[alias] = [];
            }
            aliasMap[alias].push({ name: unit.getName(), type: unit.type });

            // Include metric prefixes if applicable
            if (unit.metric) {
                for (const prefix of Object.values(metricPrefixes)) {
                    for (const prefixAlias of prefix.aliases) {
                        const prefixedAlias = prefixAlias + alias;
                        if (!aliasMap[prefixedAlias]) {
                            aliasMap[prefixedAlias] = [];
                        }
                        aliasMap[prefixedAlias].push({ name: unit.getName(prefix.displayName), type: unit.type });
                    }
                }
            }
        }
    }

    // Check for overlap
    const conflicts = Object.entries(aliasMap).filter(([alias, units]) => units.length > 1);
    const overlapMap = {};
    for (const [alias, unitInfos] of conflicts) {
        for (let i = 0; i < unitInfos.length; i++) {
            for (let j = i + 1; j < unitInfos.length; j++) {
                if (unitInfos[i].type !== unitInfos[j].type) {
                    const key = `${unitInfos[i].type}-${unitInfos[j].type}`;
                    if (!overlapMap[key]) {
                        overlapMap[key] = [];
                    }
                    overlapMap[key].push({alias: alias, units: [unitInfos[i].name, unitInfos[j].name]});
                }
            }
        }
    }

    const overlapConflicts = Object.entries(overlapMap).filter(([key, overlaps]) => overlaps.length > 1);
    for (const [key, overlaps] of overlapConflicts) {
        anyIssues = true;

        const details = overlaps.map(overlap => `        Alias "${overlap.alias}" maps to units: ${overlap.units.join(' and ')}`).join('\r\n');
        console.error(`Overlapping aliases between unit types ${key.replace('-', ' and ')}:\r\n${details}`);
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }

    console.groupEnd();
}

function testNamingFunctions() {
    console.group("Naming Function Tests");

    let anyIssues = false;

    // Get meter unit
    const meterUnit = findUnits('meter')[0];
    if (!meterUnit) {
        anyIssues = true;
        console.error('Failed to find meter unit');
        return;
    }

    // Test getName
    const meterName = meterUnit.getName();
    if (meterName !== 'Meter') {
        anyIssues = true;
        console.error(`getName returned incorrect value for meter unit. Expected "Meter", got "${meterName}"`);
    }

    // Test getName with prefix
    const kiloMeterName = meterUnit.getName('Kilo');
    if (kiloMeterName !== 'Kilometer') {
        anyIssues = true;
        console.error(`getName returned incorrect value for meter unit with prefix. Expected "Kilometer", got "${kiloMeterName}"`);
    }

    // Test getName with plural
    const metersName = meterUnit.getName(null, true);
    if (metersName !== 'Meters') {
        anyIssues = true;
        console.error(`getName returned incorrect value for meter unit with plural. Expected "Meters", got "${metersName}"`);
    }

    // Test getName with plural and prefix
    const megaMetersName = meterUnit.getName('Mega', true);
    if (megaMetersName !== 'Megameters') {
        anyIssues = true;
        console.error(`getName returned incorrect value for meter unit with plural and prefix. Expected "Megameters", got "${megaMetersName}"`);
    }

    // Check to make sure every metric unit accepts prefixes correctly
    const metricUnits = units.filter(u => u.metric);
    for (const unit of metricUnits) {
        const name = unit.getName();
        const prefixName = unit.getName("Kilo");

        if (prefixName === name) {
            anyIssues = true;
            console.error(`Metric unit "${name}" did not change name when prefix "Kilo" was applied.`);
        }
        if (!prefixName.includes("Kilo")) {
            anyIssues = true;
            console.error(`Metric unit "${name}" did not correctly apply prefix "Kilo". Got "${prefixName}" instead.`);
        }
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }

    console.groupEnd();
}

// Conversion Tests

function testParseConversion() {
    console.group("Parsing and Conversion Tests");

    let anyIssues = false;

    const tests = [
        {
            // Public example
            input: "10f to c",
            shouldSucceed: true,
            expectedInputValue: "10",
            expectedInputUnitDisplayName: "°F",
            expectedOutputValue: "-12.222",
            expectedOutputUnitDisplayName: "°C"
        },
        {
            // Public example
            input: "5 miles in km",
            shouldSucceed: true,
            expectedInputValue: "5",
            expectedInputUnitDisplayName: "Miles",
            expectedOutputValue: "8.047",
            expectedOutputUnitDisplayName: "Kilometers"
        },
        {
            // Public example
            input: "60 GB to Mebibytes",
            shouldSucceed: true,
            expectedInputValue: "60",
            expectedInputUnitDisplayName: "Gigabytes",
            expectedOutputValue: "57220.459",
            expectedOutputUnitDisplayName: "Mebibytes"
        },
        {
            // Public example
            input: "1atm to psi",
            shouldSucceed: true,
            expectedInputValue: "1",
            expectedInputUnitDisplayName: "Atmosphere",
            expectedOutputValue: "14.696",
            expectedOutputUnitDisplayName: "PSI"
        },
        {
            // Test all lowercase
            input: "10 km in m",
            shouldSucceed: true,
            expectedInputValue: "10",
            expectedInputUnitDisplayName: "Kilometers",
            expectedOutputValue: "10000",
            expectedOutputUnitDisplayName: "Meters"
        },
        {
            // Test all uppercase
            input: "5 KM TO M",
            shouldSucceed: true,
            expectedInputValue: "5",
            expectedInputUnitDisplayName: "Kilometers",
            expectedOutputValue: "5000",
            expectedOutputUnitDisplayName: "Meters"
        },
        {
            // Test case sensitive units and prefixes
            input: "2000000000 mb to Mb",
            shouldSucceed: true,
            expectedInputValue: "2000000000",
            expectedInputUnitDisplayName: "Millibits",
            expectedOutputValue: "2",
            expectedOutputUnitDisplayName: "Megabits"
        },
        {
            // Test case sensitive units and prefixes
            input: "3MB to mB",
            shouldSucceed: true,
            expectedInputValue: "3",
            expectedInputUnitDisplayName: "Megabytes",
            expectedOutputValue: "3.00e+9",
            expectedOutputUnitDisplayName: "Millibytes"
        },
        {
            // Test negative input values
            input: "-10f -> m",
            shouldSucceed: true,
            expectedInputValue: "-10",
            expectedInputUnitDisplayName: "Feet",
            expectedOutputValue: "-3.048",
            expectedOutputUnitDisplayName: "Meters"
        },
        {
            // Test unit that doesn't have prefix but looks like it does
            input: "-0.2lb to gm",
            shouldSucceed: true,
            expectedInputValue: "-0.2",
            expectedInputUnitDisplayName: "Pounds",
            expectedOutputValue: "-90.718",
            expectedOutputUnitDisplayName: "Grams"
        },
        {
            // Test unit that does have prefix but looks like one that doesn't
            input: "100f to gm",
            shouldSucceed: true,
            expectedInputValue: "100",
            expectedInputUnitDisplayName: "Feet",
            expectedOutputValue: "3.05e-8",
            expectedOutputUnitDisplayName: "Gigameters"
        },
        {
            // Test missing output unit
            input: "100 feet in",
            shouldSucceed: false
        },
        {
            // Test incompatible units
            input: "10 Fahrenheit to Feet",
            shouldSucceed: false
        }
    ];

    for (const test of tests) {
        const result = parseConversion(test.input);
        
        if (test.shouldSucceed && !result) {
            anyIssues = true;
            console.error(`Failed to parse valid conversion input: "${test.input}"`);
            continue;
        }
        if (!test.shouldSucceed && result) {
            anyIssues = true;
            console.error(`Parsed invalid conversion input without error: "${test.input}"`);
            continue;
        }
        if (!test.shouldSucceed) {
            continue;
        }

        if (test.expectedInputValue !== result.inputValue) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected input value "${test.expectedInputValue}", but got "${result.inputValue}"`);
        }

        if (test.expectedInputUnitDisplayName !== result.inputUnit) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected input unit "${test.expectedInputUnitDisplayName}", but got "${result.inputUnit}"`);
        }

        if (test.expectedOutputValue !== result.outputValue) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected output value "${test.expectedOutputValue}", but got "${result.outputValue}"`);
        }

        if (test.expectedOutputUnitDisplayName !== result.outputUnit) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected output unit "${test.expectedOutputUnitDisplayName}", but got "${result.outputUnit}"`);
        }
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }

    console.groupEnd();
}

function testFindUnits() {
    console.group("Find Units Tests");

    let anyIssues = false;

    const tests = [
        {
            // Case insensitive unit
            input: "MeTeR",
            expectedResultNames: ["Meter"]
        },
        {
            // Alias with multiple units
            input: "f",
            expectedResultNames: ["°F", "Foot"]
        },
        {
            // Case sensitive unit
            input: "b",
            expectedResultNames: ["Bit"]
        },
        {
            // Case sensitive unit
            input: "B",
            expectedResultNames: ["Byte"]
        },
        {
            // Unit with special characters
            input: "°c",
            expectedResultNames: ["°C"]
        },
        {
            // Unit with special characters
            input: "M²",
            expectedResultNames: ["Square Meter"]
        }
    ];

    for (const test of tests) {
        const results = findUnits(test.input);
        const resultNames = results.map(u => u.getName());

        const expectedNamesSet = new Set(test.expectedResultNames);
        const resultNamesSet = new Set(resultNames);

        if (expectedNamesSet.size !== resultNamesSet.size || ![...expectedNamesSet].every(name => resultNamesSet.has(name))) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected result unit names [${[...expectedNamesSet].join(', ')}], but got [${[...resultNamesSet].join(', ')}]`);
        }
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }

    console.groupEnd();
}

function testFindMetricPrefix() {
    console.group("Find Metric Prefix Tests");

    let anyIssues = false;

    const tests = [
        {
            // Case insensitive prefix
            input: "kIlO",
            expectedResultName: "Kilo",
            expectedValue: 1e3
        },
        {
            // Case sensitive prefix
            input: "m",
            expectedResultName: "Milli",
            expectedValue: 1e-3
        },
        {
            // Case sensitive prefix
            input: "M",
            expectedResultName: "Mega",
            expectedValue: 1e6
        },
        {
            // Prefix with special characters
            input: "μ",
            expectedResultName: "Micro",
            expectedValue: 1e-6
        }
    ];

    for (const test of tests) {
        const result = findMetricPrefix(test.input);
        if (!result) {
            anyIssues = true;
            console.error(`Failed to find metric prefix for input "${test.input}"`);
            continue;
        }
        if (result.displayName !== test.expectedResultName) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected result prefix name "${test.expectedResultName}", but got "${result.displayName}"`);
        }
        if (result.value !== test.expectedValue) {
            anyIssues = true;
            console.error(`For input "${test.input}", expected result prefix value "${test.expectedValue}", but got "${result.value}"`);
        }
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }
    console.groupEnd();
}

function testShortenNumber() {
    console.group("Shorten Number Tests");

    let anyIssues = false;

    const tests = [
        {
            // Large-ish number
            input: 123456,
            expectedOutput: "123456"
        },
        {
            // Large number
            input: 1234567,
            expectedOutput: "1.23e+6"
        },
        {
            // Small-ish number
            input: 0.0123,
            expectedOutput: "0.012"
        },
        {
            // Small number
            input: 0.0001234,
            expectedOutput: "1.23e-4"
        },
        {
            // Large-ish number with rounding
            input: 987654321,
            expectedOutput: "9.88e+8"
        },
        {
            // Large number with rounding
            input: 987654321,
            expectedOutput: "9.88e+8"
        },
        {
            // Small-ish number with rounding
            input: 0.098765,
            expectedOutput: "0.099"
        },
        {
            // Small number with rounding
            input: 0.000098765,
            expectedOutput: "9.88e-5"
        }
    ];

    for (const test of tests) {
        const result = shortenNumber(test.input);
        if (result !== test.expectedOutput) {
            anyIssues = true;
            console.error(`For input ${test.input}, expected output "${test.expectedOutput}", but got "${result}"`);
        }
    }

    if (!anyIssues) {
        console.log("✅ No issues found.");
    }

    console.groupEnd();
}
