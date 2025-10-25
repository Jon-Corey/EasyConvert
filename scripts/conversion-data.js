// getName: A function that takes a metric prefix (e.g. "Kilo", "Milli") and a boolean indicating if the unit should be pluralized, and returns the display name of the unit.
// type: The type of unit (e.g. length, temperature, mass, volume, time, etc.). Used to make sure conversions are only done between compatible units.
// metric: Boolean indicating if the unit should allow metric prefixes (e.g. kilometer is fine, but kilofoot isn't a thing).
// aliases: An array of strings that can be used to identify the unit. This includes common abbreviations and alternative names.
// toBase: A function that converts a value from this unit to the base unit of its type.
// fromBase: A function that converts a value from the base unit of its type to this unit.
export const units = [
    // Temperature units
    {
        getName: (prefix, plural) => "°C",
        type: "temperature",
        metric: false,
        aliases: ["°c", "c", "celsius"],
        toBase: (c) => c,
        fromBase: (c) => c
    },
    {
        getName: (prefix, plural) => "°F",
        type: "temperature",
        metric: false,
        aliases: ["°f", "f", "fahrenheit"],
        toBase: (f) => (f - 32) * (5 / 9),
        fromBase: (c) => c * (9 / 5) + 32
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}kelvin${plural ? 's' : ''}`),
        type: "temperature",
        metric: true,
        aliases: ["k", "kelvin", "kelvins"],
        toBase: (k) => k - 273.15,
        fromBase: (c) => c + 273.15
    },
    {
        getName: (prefix, plural) => "°R",
        type: "temperature",
        metric: false,
        aliases: ["°r", "r", "rankine", "rankines"],
        toBase: (r) => (r - 491.67) * (5 / 9),
        fromBase: (c) => c * (9 / 5) + 491.67
    },
    // Length units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}meter${plural ? 's' : ''}`),
        type: "length",
        metric: true,
        aliases: ["m", "meter", "meters", "metre", "metres", "mtr", "mtrs"],
        toBase: (m) => m,
        fromBase: (m) => m
    },
    {
        getName: (prefix, plural) => `Inch${plural ? 'es' : ''}`,
        type: "length",
        metric: false,
        aliases: ["in", "i", "inch", "inches", "\"", "″", "“", "”", "inchs"],
        toBase: (inches) => inches * 0.0254,
        fromBase: (m) => m / 0.0254
    },
    {
        getName: (prefix, plural) => plural ? 'Feet' : 'Foot',
        type: "length",
        metric: false,
        aliases: ["f", "ft", "foot", "feet", "'"],
        toBase: (feet) => feet * 0.3048,
        fromBase: (m) => m / 0.3048
    },
    {
        getName: (prefix, plural) => `Yard${plural ? 's' : ''}`,
        type: "length",
        metric: false,
        aliases: ["yd", "y", "yard", "yards"],
        toBase: (yards) => yards * 0.9144,
        fromBase: (m) => m / 0.9144
    },
    {
        getName: (prefix, plural) => `Mile${plural ? 's' : ''}`,
        type: "length",
        metric: false,
        aliases: ["mi", "mile", "miles"],
        toBase: (miles) => miles * 1609.344,
        fromBase: (m) => m / 1609.344
    },
    {
        getName: (prefix, plural) => `Nautical Mile${plural ? 's' : ''}`,
        type: "length",
        metric: false,
        aliases: ["nmi", "nautical mile", "nautical miles"],
        toBase: (nmi) => nmi * 1852,
        fromBase: (m) => m / 1852
    },
    // Area units
    {
        getName: (prefix, plural) => capitalizeEachWord(`Square ${prefix ?? ""}meter${plural ? 's' : ''}`),
        type: "area",
        metric: true,
        aliases: ["m²", "square meter", "square meters", "square metre", "square metres", "m2", "sqm", "sq m", "m^2"],
        toBase: (m2) => m2,
        fromBase: (m) => m
    },
    {
        getName: (prefix, plural) => `Square Inch${plural ? 'es' : ''}`,
        type: "area",
        metric: false,
        aliases: ["in²", "square inch", "square inches", "in2", "sq in", "sqin", "in^2"],
        toBase: (in2) => in2 * 0.00064516,
        fromBase: (m) => m / 0.00064516
    },
    {
        getName: (prefix, plural) => `Square ${plural ? 'Feet' : 'Foot'}`,
        type: "area",
        metric: false,
        aliases: ["ft²", "square foot", "square feet", "ft2", "sq ft", "sqft", "ft^2"],
        toBase: (ft2) => ft2 * 0.092903,
        fromBase: (m) => m / 0.092903
    },
    {
        getName: (prefix, plural) => `Square Yard${plural ? 's' : ''}`,
        type: "area",
        metric: false,
        aliases: ["yd²", "square yard", "square yards", "yd2", "sq yd", "sqyd", "yd^2"],
        toBase: (yd2) => yd2 * 0.836127,
        fromBase: (m) => m / 0.836127
    },
    {
        getName: (prefix, plural) => `Square Mile${plural ? 's' : ''}`,
        type: "area",
        metric: false,
        aliases: ["mi²", "square mile", "square miles", "mi2", "sq mi", "sqmi", "mi^2"],
        toBase: (mi2) => mi2 * 2.58998811e6,
        fromBase: (m) => m / 2.58998811e6
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}hectare${plural ? 's' : ''}`),
        type: "area",
        metric: true,
        aliases: ["hectare", "hectares"],
        toBase: (ha) => ha * 1e4,
        fromBase: (m) => m / 1e4
    },
    {
        getName: (prefix, plural) => `Acre${plural ? 's' : ''}`,
        type: "area",
        metric: false,
        aliases: ["acre", "acres", "ac", "a"],
        toBase: (acre) => acre * 4046.86,
        fromBase: (m) => m / 4046.86
    },
    // Mass/Weight units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}gram${plural ? 's' : ''}`),
        type: "mass",
        metric: true,
        aliases: ["g", "gram", "grams", "gm", "gms"],
        toBase: (g) => g,
        fromBase: (g) => g
    },
    {
        getName: (prefix, plural) => `Ounce${plural ? 's' : ''}`,
        type: "mass",
        metric: false,
        aliases: ["oz", "o", "ounce", "ounces"],
        toBase: (oz) => oz * 28.3495,
        fromBase: (g) => g / 28.3495
    },
    {
        getName: (prefix, plural) => `Pound${plural ? 's' : ''}`,
        type: "mass",
        metric: false,
        aliases: ["lb", "pound", "pounds", "lbs"],
        toBase: (lb) => lb * 453.592,
        fromBase: (g) => g / 453.592
    },
    {
        getName: (prefix, plural) => `Ton${plural ? 's' : ''}`,
        type: "mass",
        metric: false,
        aliases: ["ton", "tons", "t", "short ton", "short tons", "us ton", "us tons"],
        toBase: (ton) => ton * 907184.74,
        fromBase: (g) => g / 907184.74
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}tonne${plural ? 's' : ''}`),
        type: "mass",
        metric: true,
        aliases: ["tonne", "metric ton", "metric tons", "tonnes", "mt"],
        toBase: (tonne) => tonne * 1e6,
        fromBase: (g) => g / 1e6
    },
    {
        getName: (prefix, plural) => `Stone${plural ? 's' : ''}`,
        type: "mass",
        metric: false,
        aliases: ["st", "s", "stone", "stones"],
        toBase: (st) => st * 63500.0,
        fromBase: (g) => g / 63500.0
    },
    // Volume units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}liter${plural ? 's' : ''}`),
        type: "volume",
        metric: true,
        aliases: ["l", "liter", "liters", "litre", "litres", "ltr", "ltrs"],
        toBase: (l) => l,
        fromBase: (l) => l
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`Cubic ${prefix ?? ""}meter${plural ? 's' : ''}`),
        type: "volume",
        metric: true,
        aliases: ["m³", "cubic meter", "cubic meters", "cubic metre", "cubic metres", "m3", "cu m", "cum", "m^3"],
        toBase: (m3) => m3 * 1000,
        fromBase: (l) => l / 1000
    },
    {
        getName: (prefix, plural) => `Cubic Inch${plural ? 'es' : ''}`,
        type: "volume",
        metric: false,
        aliases: ["in³", "cubic inch", "cubic inches", "in3", "cu in", "cuin", "in^3"],
        toBase: (in3) => in3 * 0.0163871,
        fromBase: (l) => l / 0.0163871
    },
    {
        getName: (prefix, plural) => `Cubic ${plural ? 'Feet' : 'Foot'}`,
        type: "volume",
        metric: false,
        aliases: ["ft³", "cubic foot", "cubic feet", "ft3", "cu ft", "cuft", "ft^3"],
        toBase: (ft3) => ft3 * 28.3168,
        fromBase: (l) => l / 28.3168
    },
    {
        getName: (prefix, plural) => `Cubic Yard${plural ? 's' : ''}`,
        type: "volume",
        metric: false,
        aliases: ["yd³", "cubic yard", "cubic yards", "yd3", "cu yd", "cuyd", "yd^3"],
        toBase: (yd3) => yd3 * 764.555,
        fromBase: (l) => l / 764.555
    },
    {
        getName: (prefix, plural) => `Gallon${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["gal", "g", "gallon", "gallons", "us gallon", "us gallons", "us gal"],
        toBase: (gal) => gal * 3.78541,
        fromBase: (l) => l / 3.78541
    },
    {
        getName: (prefix, plural) => `Gallon${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["gal (uk)", "imperial gallon", "gallon uk", "gallons uk", "imperial gal", "imp gal", "uk gallon", "uk gallons", "uk gal"],
        toBase: (gal) => gal * 4.54609,
        fromBase: (l) => l / 4.54609
    },
    {
        getName: (prefix, plural) => `Quart${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["qt", "q", "quart", "quarts", "us quart", "us quarts", "us qt"],
        toBase: (qt) => qt * 0.946353,
        fromBase: (l) => l / 0.946353
    },
    {
        getName: (prefix, plural) => `Quart${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["qt (uk)", "imperial quart", "quart uk", "quarts uk", "imperial qt", "imp qt", "uk quart", "uk quarts", "uk qt"],
        toBase: (qt) => qt * 1.13652,
        fromBase: (l) => l / 1.13652
    },
    {
        getName: (prefix, plural) => `Pint${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["pt", "p", "pint", "pints", "us pint", "us pints", "us pt"],
        toBase: (pt) => pt * 0.473176,
        fromBase: (l) => l / 0.473176
    },
    {
        getName: (prefix, plural) => `Pint${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["pt (uk)", "imperial pint", "pint uk", "pints uk", "imperial pt", "imp pt", "uk pint", "uk pints", "uk pt"],
        toBase: (pt) => pt * 0.568261,
        fromBase: (l) => l / 0.568261
    },
    {
        getName: (prefix, plural) => `Cup${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["cup", "c", "cups", "us cup", "us cups"],
        toBase: (cup) => cup * 0.2365882365,
        fromBase: (l) => l / 0.2365882365
    },
    {
        getName: (prefix, plural) => `Cup${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["cup (uk)", "imperial cup", "cup uk", "cups uk"],
        toBase: (cup) => cup * 0.284130625,
        fromBase: (l) => l / 0.284130625
    },
    {
        getName: (prefix, plural) => `Fluid Ounce${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["fl oz", "fluid ounce", "fluid ounces", "us fluid ounce", "us fluid ounces", "us fl oz", "floz"],
        toBase: (floz) => floz * 0.0295735,
        fromBase: (l) => l / 0.0295735
    },
    {
        getName: (prefix, plural) => `Fluid Ounce${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["fl oz (uk)", "imperial fluid ounce", "fluid ounce uk", "fluid ounces uk", "uk fluid ounce", "uk fluid ounces", "uk fl oz", "uk floz", "imp fl oz", "imp floz"],
        toBase: (floz) => floz * 0.0284131,
        fromBase: (l) => l / 0.0284131
    },
    {
        getName: (prefix, plural) => `Tablespoon${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["tbsp", "tablespoon", "tablespoons", "us tablespoon", "us tablespoons", "us tbsp"],
        toBase: (tbsp) => tbsp * 0.0147867648,
        fromBase: (l) => l / 0.0147867648
    },
    {
        getName: (prefix, plural) => `Tablespoon${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["tbsp (uk)", "imperial tablespoon", "tablespoon uk", "tablespoons uk", "uk tablespoon", "uk tablespoons", "uk tbsp", "imp tbsp"],
        toBase: (tbsp) => tbsp * 0.0177581725,
        fromBase: (l) => l / 0.0177581725
    },
    {
        getName: (prefix, plural) => `Teaspoon${plural ? 's' : ''} (US)`,
        type: "volume",
        metric: false,
        aliases: ["tsp", "teaspoon", "teaspoons", "us teaspoon", "us teaspoons", "us tsp"],
        toBase: (tsp) => tsp * 0.00492892159,
        fromBase: (l) => l / 0.00492892159
    },
    {
        getName: (prefix, plural) => `Teaspoon${plural ? 's' : ''} (UK)`,
        type: "volume",
        metric: false,
        aliases: ["tsp (uk)", "imperial teaspoon", "teaspoon uk", "teaspoons uk", "uk teaspoon", "uk teaspoons", "uk tsp", "imp tsp"],
        toBase: (tsp) => tsp * 0.00591939013,
        fromBase: (l) => l / 0.00591939013
    },
    // Time units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}second${plural ? 's' : ''}`),
        type: "time",
        metric: true,
        aliases: ["s", "sec", "second", "seconds"],
        toBase: (s) => s,
        fromBase: (s) => s
    },
    {
        getName: (prefix, plural) => `Minute${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["min", "minute", "minutes"],
        toBase: (min) => min * 60,
        fromBase: (s) => s / 60
    },
    {
        getName: (prefix, plural) => `Hour${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["h", "hr", "hour", "hours"],
        toBase: (hr) => hr * 3600,
        fromBase: (s) => s / 3600
    },
    {
        getName: (prefix, plural) => `Day${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["d", "day", "days", "dy"],
        toBase: (d) => d * 86400,
        fromBase: (s) => s / 86400
    },
    {
        getName: (prefix, plural) => `Week${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["w", "wk", "week", "weeks", "wks"],
        toBase: (wk) => wk * 604800,
        fromBase: (s) => s / 604800
    },
    {
        getName: (prefix, plural) => `Year${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["y", "yr", "year", "years", "yrs"],
        toBase: (yr) => yr * 3.154e7,
        fromBase: (s) => s / 3.154e7
    },
    {
        getName: (prefix, plural) => `Decade${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["decade", "decades"],
        toBase: (decade) => decade * 3.154e8,
        fromBase: (s) => s / 3.154e8
    },
    {
        getName: (prefix, plural) => `Century${plural ? 's' : ''}`,
        type: "time",
        metric: false,
        aliases: ["c", "century", "centuries"],
        toBase: (century) => century * 3.154e9,
        fromBase: (s) => s / 3.154e9
    },
    {
        getName: (prefix, plural) => plural ? 'Millennia' : 'Millennium',
        type: "time",
        metric: false,
        aliases: ["millennium", "millennia"],
        toBase: (millennium) => millennium * 3.154e10,
        fromBase: (s) => s / 3.154e10
    },
    // Frequency units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}hertz`),
        type: "frequency",
        metric: true,
        aliases: ["hz", "h", "hertz"],
        toBase: (hz) => hz,
        fromBase: (hz) => hz
    },
    // Data units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}bit${plural ? 's' : ''}`),
        type: "data",
        metric: true,
        aliases: ["b", "bit", "bits"],
        toBase: (bit) => bit,
        fromBase: (bit) => bit
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}byte${plural ? 's' : ''}`),
        type: "data",
        metric: true,
        aliases: ["B", "byte", "bytes"],
        toBase: (byte) => byte * 8,
        fromBase: (bit) => bit / 8
    },
    // Speed units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}meter${plural ? 's' : ''} Per Second`),
        type: "speed",
        metric: true,
        aliases: ["m/s", "meters per second"],
        toBase: (mps) => mps,
        fromBase: (mps) => mps
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}meter${plural ? 's' : ''} Per Hour`),
        type: "speed",
        metric: true,
        aliases: ["m/h", "meters per hour"],
        toBase: (mph) => mph / 3600,
        fromBase: (mps) => mps * 3600
    },
    {
        // Adding Kilometers per hour here even though m/h is already defined to allow for using "kph" alias
        getName: (prefix, plural) => `Kilometer${plural ? 's' : ''} Per Hour`,
        type: "speed",
        metric: false,
        aliases: ["kph"],
        toBase: (kph) => kph * 0.2777777778,
        fromBase: (mps) => mps / 0.2777777778
    },
    {
        getName: (prefix, plural) => `Mile${plural ? 's' : ''} Per Hour`,
        type: "speed",
        metric: false,
        aliases: ["mph", "miles per hour", "mi/h"],
        toBase: (mph) => mph * 0.44704,
        fromBase: (mps) => mps / 0.44704
    },
    {
        getName: (prefix, plural) => `Knot${plural ? 's' : ''}`,
        type: "speed",
        metric: false,
        aliases: ["kn", "knot", "knots"],
        toBase: (kn) => kn * 0.514444,
        fromBase: (mps) => mps / 0.514444
    },
    {
        getName: (prefix, plural) => `${plural ? 'Feet' : 'Foot'} Per Second`,
        type: "speed",
        metric: false,
        aliases: ["ft/s", "feet per second", "fps"],
        toBase: (fps) => fps * 0.3048,
        fromBase: (mps) => mps / 0.3048
    },
    {
        getName: (prefix, plural) => `c (Light Speed)`,
        type: "speed",
        metric: false,
        aliases: ["c", "light speed"],
        toBase: (c) => c * 299792458,
        fromBase: (mps) => mps / 299792458
    },
    // Torque units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}newton-Meter${plural ? 's' : ''}`),
        type: "torque",
        metric: true,
        aliases: ["N·m", "Nm", "newton meter", "newton meters", "newton-meter", "newton-meters", "newton metre", "newton metres", "newton-metre", "newton-metres"],
        toBase: (nm) => nm,
        fromBase: (nm) => nm
    },
    {
        getName: (prefix, plural) => `Pound ${plural ? 'Feet' : 'Foot'}`,
        type: "torque",
        metric: false,
        aliases: ["lb·ft", "lbf·ft", "pound-foot", "pound-feet"],
        toBase: (lbf) => lbf * 1.35582,
        fromBase: (nm) => nm / 1.35582
    },
    // Pressure units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}pascal${plural ? 's' : ''}`),
        type: "pressure",
        metric: true,
        aliases: ["pa", "p", "pascal", "pascals"],
        toBase: (pa) => pa,
        fromBase: (pa) => pa
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}bar${plural ? 's' : ''}`),
        type: "pressure",
        metric: true,
        aliases: ["bar", "bars"],
        toBase: (bar) => bar * 100000,
        fromBase: (pa) => pa / 100000
    },
    {
        getName: (prefix, plural) => "PSI",
        type: "pressure",
        metric: false,
        aliases: ["psi", "pound per square inch", "pounds per square inch", "pound/sq inch", "pounds/sq inch", "pound/inch²", "pounds/inch²", "pound/inch2", "pounds/inch2", "pound/inch^2", "pounds/inch^2"],
        toBase: (psi) => psi * 6894.76,
        fromBase: (pa) => pa / 6894.76
    },
    {
        getName: (prefix, plural) => `Atmosphere${plural ? 's' : ''}`,
        type: "pressure",
        metric: false,
        aliases: ["atm", "atms", "atmosphere", "atmospheres", "standard atmosphere", "standard atmospheres", "std atm", "std atms", "std atmosphere", "std atmospheres", "standard atm", "standard atms"],
        toBase: (atm) => atm * 101325,
        fromBase: (pa) => pa / 101325
    },
    {
        getName: (prefix, plural) => "Torr",
        type: "pressure",
        metric: false,
        aliases: ["torr"],
        toBase: (torr) => torr * 133.322,
        fromBase: (pa) => pa / 133.322
    },
    {
        getName: (prefix, plural) => `Millimeter${plural ? 's' : ''} of Mercury`,
        type: "pressure",
        metric: false,
        aliases: ["mmhg", "mm hg", "millimeter of mercury", "millimeters of mercury"],
        toBase: (mmHg) => mmHg * 133.322,
        fromBase: (pa) => pa / 133.322
    },
    {
        getName: (prefix, plural) => `Inch${plural ? 'es' : ''} of Mercury`,
        type: "pressure",
        metric: false,
        aliases: ["inhg", "in hg", "inch of mercury", "inches of mercury", "hg"],
        toBase: (inHg) => inHg * 3386.39,
        fromBase: (pa) => pa / 3386.39
    },
    {
        getName: (prefix, plural) => `Inch${plural ? 'es' : ''} of Water`,
        type: "pressure",
        metric: false,
        aliases: ["inh2O", "in h2o", "inch of water", "inches of water", "h2o"],
        toBase: (inH2O) => inH2O * 249.08891,
        fromBase: (pa) => pa / 249.08891
    },
    {
        getName: (prefix, plural) => `Kilopound${plural ? 's' : ''} Per Square Inch`,
        type: "pressure",
        metric: false,
        aliases: ["ksi", "kilopound per square inch", "kilopounds per square inch", "kpsi"],
        toBase: (ksi) => ksi * 6894757.29,
        fromBase: (pa) => pa / 6894757.29
    },
    // Force units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}newton${plural ? 's' : ''}`),
        type: "force",
        metric: true,
        aliases: ["n", "newton", "newtons"],
        toBase: (n) => n,
        fromBase: (n) => n
    },
    {
        getName: (prefix, plural) => "Pound-Force",
        type: "force",
        metric: false,
        aliases: ["lbf", "pound-force", "pound forces", "pound force"],
        toBase: (lbf) => lbf * 4.44822,
        fromBase: (n) => n / 4.44822
    },
    {
        getName: (prefix, plural) => "Kilogram-Force",
        type: "force",
        metric: false,
        aliases: ["kgf", "kilogram-force", "kilograms-force", "kilogram forces"],
        toBase: (kgf) => kgf * 9.80665,
        fromBase: (n) => n / 9.80665
    },
    // Voltage units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}volt${plural ? 's' : ''}`),
        type: "voltage",
        metric: true,
        aliases: ["v", "volt", "volts"],
        toBase: (v) => v,
        fromBase: (v) => v
    },
    // Current units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}amp${plural ? 's' : ''}`),
        type: "current",
        metric: true,
        aliases: ["a", "amp", "ampere", "amperes", "amps"],
        toBase: (a) => a,
        fromBase: (a) => a
    },
    // Power units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}watt${plural ? 's' : ''}`),
        type: "power",
        metric: true,
        aliases: ["w", "watt", "watts", "joule per second", "joules per second", "j/s"],
        toBase: (w) => w,
        fromBase: (w) => w
    },
    {
        getName: (prefix, plural) => "Horsepower",
        type: "power",
        metric: false,
        aliases: ["hp", "horsepower", "horse power", "horse-power"],
        toBase: (hp) => hp * 745.7,
        fromBase: (w) => w / 745.7
    },
    {
        getName: (prefix, plural) => `BTU${plural ? 's' : ''} Per Hour`,
        type: "power",
        metric: false,
        aliases: ["btu/h", "btu per hour", "btu/hr"],
        toBase: (btu) => btu * 0.29307107,
        fromBase: (w) => w / 0.29307107
    },
    {
        getName: (prefix, plural) => `BTU${plural ? 's' : ''} Per Minute`,
        type: "power",
        metric: false,
        aliases: ["btu/m", "btu/min", "btu per minute"],
        toBase: (btu) => btu * 17.5842667,
        fromBase: (w) => w / 17.5842667
    },
    {
        getName: (prefix, plural) => `BTU${plural ? 's' : ''} Per Second`,
        type: "power",
        metric: false,
        aliases: ["btu/s", "btu per second", "btu/sec"],
        toBase: (btu) => btu * 1055.05585,
        fromBase: (w) => w / 1055.05585
    },
    {
        getName: (prefix, plural) => plural ? "Pferdestärken" : "Pferdestärke",
        type: "power",
        metric: false,
        aliases: ["pferdestärke", "pferdestärken", "metric horsepower", "metric hp"],
        toBase: (ps) => ps * 735.49875,
        fromBase: (w) => w / 735.49875
    },
    // Energy units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}joule${plural ? 's' : ''}`),
        type: "energy",
        metric: true,
        aliases: ["j", "joule", "joules"],
        toBase: (j) => j,
        fromBase: (j) => j
    },
    {
        getName: (prefix, plural) => `Calorie${plural ? 's' : ''}`,
        type: "energy",
        metric: false,
        aliases: ["c", "cal", "calorie", "calories"],
        toBase: (cal) => cal * 4.184,
        fromBase: (j) => j / 4.184
    },
    {
        getName: (prefix, plural) => `Kilocalorie${plural ? 's' : ''}`,
        type: "energy",
        metric: false,
        aliases: ["kc", "kcal", "kilocalorie", "kilocalories"],
        toBase: (kcal) => kcal * 4184,
        fromBase: (j) => j / 4184
    },
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}watt-Hour${plural ? 's' : ''}`),
        type: "energy",
        metric: true,
        aliases: ["wh", "watt hour", "watt hours", "watt-hour", "watt-hours"],
        toBase: (Wh) => Wh * 3600,
        fromBase: (j) => j / 3600
    },
    // Angle units
    {
        getName: (prefix, plural) => `Degree${plural ? 's' : ''}`,
        type: "angle",
        metric: false,
        aliases: ["d", "deg", "degree", "degrees", "°"],
        toBase: (deg) => deg,
        fromBase: (deg) => deg
    },
    {
        getName: (prefix, plural) => `Radian${plural ? 's' : ''}`,
        type: "angle",
        metric: false,
        aliases: ["r", "rad", "radian", "radians"],
        toBase: (rad) => rad * (180 / Math.PI),
        fromBase: (deg) => deg * (Math.PI / 180)
    },
    {
        getName: (prefix, plural) => `Gradian${plural ? 's' : ''}`,
        type: "angle",
        metric: false,
        aliases: ["g", "grad", "gradians"],
        toBase: (grad) => grad * 0.9,
        fromBase: (deg) => deg / 0.9
    },
    {
        getName: (prefix, plural) => `Arcminute${plural ? 's' : ''}`,
        type: "angle",
        metric: false,
        aliases: ["arcmin", "arcminute", "arcminutes"],
        toBase: (arcmin) => arcmin / 60,
        fromBase: (deg) => deg * 60
    },
    {
        getName: (prefix, plural) => `Arcsecond${plural ? 's' : ''}`,
        type: "angle",
        metric: false,
        aliases: ["arcsec", "arcsecond", "arcseconds"],
        toBase: (arcsec) => arcsec / 3600,
        fromBase: (deg) => deg * 3600
    },
    // Acceleration units
    {
        getName: (prefix, plural) => capitalizeEachWord(`${prefix ?? ""}meter${plural ? 's' : ''} Per Second Squared`),
        type: "acceleration",
        metric: true,
        aliases: ["m/s²", "m/s2", "m/s^2", "meter per second squared", "meters per second squared"],
        toBase: (m_s2) => m_s2,
        fromBase: (m_s2) => m_s2
    },
    {
        getName: (prefix, plural) => `Standard ${plural ? 'Gravities' : 'Gravity'}`,
        type: "acceleration",
        metric: false,
        aliases: ["g", "standard gravity", "standard gravities"],
        toBase: (g) => g * 9.80665,
        fromBase: (m_s2) => m_s2 / 9.80665
    }
]

// displayName: The full name of the prefix used for display purposes
// aliases: Common abbreviations or alternative names for the prefix
// value: The numerical value the prefix represents (e.g., kilo = 1000 (1e3))
export const metricPrefixes = [
    {
        displayName: "Peta",
        aliases: ["peta", "P"],
        value: 1e15
    },
    {
        displayName: "Pebi",
        aliases: ["pebi", "Pi"],
        value: 1024 ** 5
    },
    {
        displayName: "Tera",
        aliases: ["tera", "T"],
        value: 1e12
    },
    {
        displayName: "Tebi",
        aliases: ["tebi", "Ti"],
        value: 1024 ** 4
    },
    {
        displayName: "Giga",
        aliases: ["giga", "G"],
        value: 1e9
    },
    {
        displayName: "Gibi",
        aliases: ["gibi", "Gi"],
        value: 1024 ** 3
    },
    {
        displayName: "Mega",
        aliases: ["mega", "M"],
        value: 1e6
    },
    {
        displayName: "Mebi",
        aliases: ["mebi", "Mi"],
        value: 1024 ** 2
    },
    {
        displayName: "Kilo",
        aliases: ["kilo", "k"],
        value: 1e3
    },
    {
        displayName: "Kibi",
        aliases: ["kibi", "Ki"],
        value: 1024
    },
    {
        displayName: "Hecto",
        aliases: ["hecto", "h"],
        value: 1e2
    },
    {
        displayName: "Deca",
        aliases: ["deca", "da"],
        value: 1e1
    },
    {
        displayName: "Deci",
        aliases: ["deci", "d"],
        value: 1e-1
    },
    {
        displayName: "Centi",
        aliases: ["centi", "c"],
        value: 1e-2
    },
    {
        displayName: "Milli",
        aliases: ["milli", "m"],
        value: 1e-3
    },
    {
        displayName: "Micro",
        aliases: ["micro", "μ"],
        value: 1e-6
    },
    {
        displayName: "Nano",
        aliases: ["nano", "n"],
        value: 1e-9
    },
    {
        displayName: "Pico",
        aliases: ["pico", "p"],
        value: 1e-12
    }
]

function capitalizeEachWord(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
