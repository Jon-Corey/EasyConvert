// displayName: The name of the unit as it should be displayed to the user.
// pluralDisplayName: The plural form of the display name.
// type: The type of unit (e.g. length, temperature, mass, volume, time, etc.). Used to make sure conversions are only done between compatible units.
// metric: Boolean indicating if the unit should allow metric prefixes (e.g. kilometer is fine, but kilofoot isn't a thing).
// aliases: An array of strings that can be used to identify the unit. This includes common abbreviations and alternative names.
// toBase: A function that converts a value from this unit to the base unit of its type.
// fromBase: A function that converts a value from the base unit of its type to this unit.
export const units = [
    // Temperature units
    {
        displayName: "°C",
        pluralDisplayName: "°C",
        type: "temperature",
        metric: false,
        aliases: ["°c", "c", "celsius"],
        toBase: (c) => c,
        fromBase: (c) => c
    },
    {
        displayName: "°F",
        pluralDisplayName: "°F",
        type: "temperature",
        metric: false,
        aliases: ["°f", "f", "fahrenheit"],
        toBase: (f) => (f - 32) * (5 / 9),
        fromBase: (c) => c * (9 / 5) + 32
    },
    {
        displayName: "Kelvin",
        pluralDisplayName: "Kelvins",
        type: "temperature",
        metric: true,
        aliases: ["k", "kelvin", "kelvins"],
        toBase: (k) => k - 273.15,
        fromBase: (c) => c + 273.15
    },
    {
        displayName: "°R",
        pluralDisplayName: "°R",
        type: "temperature",
        metric: false,
        aliases: ["°r", "r", "rankine", "rankines"],
        toBase: (r) => (r - 491.67) * (5 / 9),
        fromBase: (c) => c * (9 / 5) + 491.67
    },
    // Length units
    {
        displayName: "Meter",
        pluralDisplayName: "Meters",
        type: "length",
        metric: true,
        aliases: ["m", "meter", "meters", "metre", "metres", "mtr", "mtrs"],
        toBase: (m) => m,
        fromBase: (m) => m
    },
    {
        displayName: "Inch",
        pluralDisplayName: "Inches",
        type: "length",
        metric: false,
        aliases: ["in", "inch", "inches", "\"", "″", "“", "”", "inchs"],
        toBase: (inches) => inches * 0.0254,
        fromBase: (m) => m / 0.0254
    },
    {
        displayName: "Foot",
        pluralDisplayName: "Feet",
        type: "length",
        metric: false,
        aliases: ["f", "ft", "foot", "feet", "'"],
        toBase: (feet) => feet * 0.3048,
        fromBase: (m) => m / 0.3048
    },
    {
        displayName: "Yard",
        pluralDisplayName: "Yards",
        type: "length",
        metric: false,
        aliases: ["yd", "y", "yard", "yards"],
        toBase: (yards) => yards * 0.9144,
        fromBase: (m) => m / 0.9144
    },
    {
        displayName: "Mile",
        pluralDisplayName: "Miles",
        type: "length",
        metric: false,
        aliases: ["mi", "mile", "miles"],
        toBase: (miles) => miles * 1609.344,
        fromBase: (m) => m / 1609.344
    },
    {
        displayName: "Nautical Mile",
        pluralDisplayName: "Nautical Miles",
        type: "length",
        metric: false,
        aliases: ["nmi", "nautical mile", "nautical miles"],
        toBase: (nmi) => nmi * 1852,
        fromBase: (m) => m / 1852
    },
    // Area units
    {
        displayName: "Square Meter",
        pluralDisplayName: "Square Meters",
        type: "area",
        metric: true,
        aliases: ["m²", "square meter", "square meters", "square metre", "square metres", "m2", "sqm", "sq m", "m^2"],
        toBase: (m2) => m2,
        fromBase: (m) => m
    },
    {
        displayName: "Square Inch",
        pluralDisplayName: "Square Inches",
        type: "area",
        metric: false,
        aliases: ["in²", "square inch", "square inches", "in2", "sq in", "sqin", "in^2"],
        toBase: (in2) => in2 * 0.00064516,
        fromBase: (m) => m / 0.00064516
    },
    {
        displayName: "Square Foot",
        pluralDisplayName: "Square Feet",
        type: "area",
        metric: false,
        aliases: ["ft²", "square foot", "square feet", "ft2", "sq ft", "sqft", "ft^2"],
        toBase: (ft2) => ft2 * 0.092903,
        fromBase: (m) => m / 0.092903
    },
    {
        displayName: "Square Yard",
        pluralDisplayName: "Square Yards",
        type: "area",
        metric: false,
        aliases: ["yd²", "square yard", "square yards", "yd2", "sq yd", "sqyd", "yd^2"],
        toBase: (yd2) => yd2 * 0.836127,
        fromBase: (m) => m / 0.836127
    },
    {
        displayName: "Square Mile",
        pluralDisplayName: "Square Miles",
        type: "area",
        metric: false,
        aliases: ["mi²", "square mile", "square miles", "mi2", "sq mi", "sqmi", "mi^2"],
        toBase: (mi2) => mi2 * 2.58998811e6,
        fromBase: (m) => m / 2.58998811e6
    },
    {
        displayName: "Hectare",
        pluralDisplayName: "Hectares",
        type: "area",
        metric: true,
        aliases: ["ha", "hectare", "hectares"],
        toBase: (ha) => ha * 1e4,
        fromBase: (m) => m / 1e4
    },
    {
        displayName: "Acre",
        pluralDisplayName: "Acres",
        type: "area",
        metric: false,
        aliases: ["acre", "acres", "ac"],
        toBase: (acre) => acre * 4046.86,
        fromBase: (m) => m / 4046.86
    },
    // Mass/Weight units
    {
        displayName: "Gram",
        pluralDisplayName: "Grams",
        type: "mass",
        metric: true,
        aliases: ["g", "gram", "grams", "gm", "gms"],
        toBase: (g) => g,
        fromBase: (g) => g
    },
    {
        displayName: "Ounce",
        pluralDisplayName: "Ounces",
        type: "mass",
        metric: false,
        aliases: ["oz", "ounce", "ounces"],
        toBase: (oz) => oz * 28.3495,
        fromBase: (g) => g / 28.3495
    },
    {
        displayName: "Pound",
        pluralDisplayName: "Pounds",
        type: "mass",
        metric: false,
        aliases: ["lb", "pound", "pounds", "lbs"],
        toBase: (lb) => lb * 453.592,
        fromBase: (g) => g / 453.592
    },
    {
        displayName: "Ton",
        pluralDisplayName: "Tons",
        type: "mass",
        metric: false,
        aliases: ["ton", "tons", "t", "short ton", "short tons", "us ton", "us tons"],
        toBase: (ton) => ton * 907184.74,
        fromBase: (g) => g / 907184.74
    },
    {
        displayName: "Ton (metric)",
        pluralDisplayName: "Tons (metric)",
        type: "mass",
        metric: true,
        aliases: ["tonne", "metric ton", "metric tons", "tonnes", "mt"],
        toBase: (tonne) => tonne * 1e6,
        fromBase: (g) => g / 1e6
    },
    {
        displayName: "Stone",
        pluralDisplayName: "Stones",
        type: "mass",
        metric: false,
        aliases: ["st", "stone", "stones"],
        toBase: (st) => st * 63500.0,
        fromBase: (g) => g / 63500.0
    },
    // Volume units
    {
        displayName: "Liter",
        pluralDisplayName: "Liters",
        type: "volume",
        metric: true,
        aliases: ["l", "liter", "liters", "litre", "litres", "ltr", "ltrs"],
        toBase: (l) => l,
        fromBase: (l) => l
    },
    {
        displayName: "Cubic Meter",
        pluralDisplayName: "Cubic Meters",
        type: "volume",
        metric: true,
        aliases: ["m³", "cubic meter", "cubic meters", "cubic metre", "cubic metres", "m3", "cu m", "cum", "m^3"],
        toBase: (m3) => m3 * 1000,
        fromBase: (l) => l / 1000
    },
    {
        displayName: "Cubic Inch",
        pluralDisplayName: "Cubic Inches",
        type: "volume",
        metric: false,
        aliases: ["in³", "cubic inch", "cubic inches", "in3", "cu in", "cuin", "in^3"],
        toBase: (in3) => in3 * 0.0163871,
        fromBase: (l) => l / 0.0163871
    },
    {
        displayName: "Cubic Foot",
        pluralDisplayName: "Cubic Feet",
        type: "volume",
        metric: false,
        aliases: ["ft³", "cubic foot", "cubic feet", "ft3", "cu ft", "cuft", "ft^3"],
        toBase: (ft3) => ft3 * 28.3168,
        fromBase: (l) => l / 28.3168
    },
    {
        displayName: "Cubic Yard",
        pluralDisplayName: "Cubic Yards",
        type: "volume",
        metric: false,
        aliases: ["yd³", "cubic yard", "cubic yards", "yd3", "cu yd", "cuyd", "yd^3"],
        toBase: (yd3) => yd3 * 764.555,
        fromBase: (l) => l / 764.555
    },
    {
        displayName: "Gallon (US)",
        pluralDisplayName: "Gallons (US)",
        type: "volume",
        metric: false,
        aliases: ["gal", "gallon", "gallons", "us gallon", "us gallons", "us gal"],
        toBase: (gal) => gal * 3.78541,
        fromBase: (l) => l / 3.78541
    },
    {
        displayName: "Gallon (UK)",
        pluralDisplayName: "Gallons (UK)",
        type: "volume",
        metric: false,
        aliases: ["gal (uk)", "imperial gallon", "gallon uk", "gallons uk", "imperial gal", "imp gal", "uk gallon", "uk gallons", "uk gal"],
        toBase: (gal) => gal * 4.54609,
        fromBase: (l) => l / 4.54609
    },
    {
        displayName: "Quart (US)",
        pluralDisplayName: "Quarts (US)",
        type: "volume",
        metric: false,
        aliases: ["qt", "quart", "quarts", "us quart", "us quarts", "us qt"],
        toBase: (qt) => qt * 0.946353,
        fromBase: (l) => l / 0.946353
    },
    {
        displayName: "Quart (UK)",
        pluralDisplayName: "Quarts (UK)",
        type: "volume",
        metric: false,
        aliases: ["qt (uk)", "imperial quart", "quart uk", "quarts uk", "imperial qt", "imp qt", "uk quart", "uk quarts", "uk qt"],
        toBase: (qt) => qt * 1.13652,
        fromBase: (l) => l / 1.13652
    },
    {
        displayName: "Pint (US)",
        pluralDisplayName: "Pints (US)",
        type: "volume",
        metric: false,
        aliases: ["pt", "pint", "pints", "us pint", "us pints", "us pt"],
        toBase: (pt) => pt * 0.473176,
        fromBase: (l) => l / 0.473176
    },
    {
        displayName: "Pint (UK)",
        pluralDisplayName: "Pints (UK)",
        type: "volume",
        metric: false,
        aliases: ["pt (uk)", "imperial pint", "pint uk", "pints uk", "imperial pt", "imp pt", "uk pint", "uk pints", "uk pt"],
        toBase: (pt) => pt * 0.568261,
        fromBase: (l) => l / 0.568261
    },
    {
        displayName: "Cup (US)",
        pluralDisplayName: "Cups (US)",
        type: "volume",
        metric: false,
        aliases: ["cup", "cups", "us cup", "us cups"],
        toBase: (cup) => cup * 0.2365882365,
        fromBase: (l) => l / 0.2365882365
    },
    {
        displayName: "Cup (UK)",
        pluralDisplayName: "Cups (UK)",
        type: "volume",
        metric: false,
        aliases: ["cup (uk)", "imperial cup", "cup uk", "cups uk"],
        toBase: (cup) => cup * 0.284130625,
        fromBase: (l) => l / 0.284130625
    },
    {
        displayName: "Fluid Ounce (US)",
        pluralDisplayName: "Fluid Ounces (US)",
        type: "volume",
        metric: false,
        aliases: ["fl oz", "fluid ounce", "fluid ounces", "us fluid ounce", "us fluid ounces", "us fl oz", "floz"],
        toBase: (floz) => floz * 0.0295735,
        fromBase: (l) => l / 0.0295735
    },
    {
        displayName: "Fluid Ounce (UK)",
        pluralDisplayName: "Fluid Ounces (UK)",
        type: "volume",
        metric: false,
        aliases: ["fl oz (uk)", "imperial fluid ounce", "fluid ounce uk", "fluid ounces uk", "uk fluid ounce", "uk fluid ounces", "uk fl oz", "uk floz", "imp fl oz", "imp floz"],
        toBase: (floz) => floz * 0.0284131,
        fromBase: (l) => l / 0.0284131
    },
    {
        displayName: "Tablespoon (US)",
        pluralDisplayName: "Tablespoons (US)",
        type: "volume",
        metric: false,
        aliases: ["tbsp", "tablespoon", "tablespoons", "us tablespoon", "us tablespoons", "us tbsp"],
        toBase: (tbsp) => tbsp * 0.0147867648,
        fromBase: (l) => l / 0.0147867648
    },
    {
        displayName: "Tablespoon (UK)",
        pluralDisplayName: "Tablespoons (UK)",
        type: "volume",
        metric: false,
        aliases: ["tbsp (uk)", "imperial tablespoon", "tablespoon uk", "tablespoons uk", "uk tablespoon", "uk tablespoons", "uk tbsp", "imp tbsp"],
        toBase: (tbsp) => tbsp * 0.0177581725,
        fromBase: (l) => l / 0.0177581725
    },
    {
        displayName: "Teaspoon (US)",
        pluralDisplayName: "Teaspoons (US)",
        type: "volume",
        metric: false,
        aliases: ["tsp", "teaspoon", "teaspoons", "us teaspoon", "us teaspoons", "us tsp"],
        toBase: (tsp) => tsp * 0.00492892159,
        fromBase: (l) => l / 0.00492892159
    },
    {
        displayName: "Teaspoon (UK)",
        pluralDisplayName: "Teaspoons (UK)",
        type: "volume",
        metric: false,
        aliases: ["tsp (uk)", "imperial teaspoon", "teaspoon uk", "teaspoons uk", "uk teaspoon", "uk teaspoons", "uk tsp", "imp tsp"],
        toBase: (tsp) => tsp * 0.00591939013,
        fromBase: (l) => l / 0.00591939013
    },
    // Time units
    {
        displayName: "Second",
        pluralDisplayName: "Seconds",
        type: "time",
        metric: true,
        aliases: ["s", "sec", "second", "seconds"],
        toBase: (s) => s,
        fromBase: (s) => s
    },
    {
        displayName: "Minute",
        pluralDisplayName: "Minutes",
        type: "time",
        metric: false,
        aliases: ["min", "minute", "minutes"],
        toBase: (min) => min * 60,
        fromBase: (s) => s / 60
    },
    {
        displayName: "Hour",
        pluralDisplayName: "Hours",
        type: "time",
        metric: false,
        aliases: ["h", "hr", "hour", "hours"],
        toBase: (hr) => hr * 3600,
        fromBase: (s) => s / 3600
    },
    {
        displayName: "Day",
        pluralDisplayName: "Days",
        type: "time",
        metric: false,
        aliases: ["d", "day", "days", "dy"],
        toBase: (d) => d * 86400,
        fromBase: (s) => s / 86400
    },
    {
        displayName: "Week",
        pluralDisplayName: "Weeks",
        type: "time",
        metric: false,
        aliases: ["wk", "week", "weeks", "wks"],
        toBase: (wk) => wk * 604800,
        fromBase: (s) => s / 604800
    },
    {
        displayName: "Year",
        pluralDisplayName: "Years",
        type: "time",
        metric: false,
        aliases: ["yr", "year", "years", "yrs"],
        toBase: (yr) => yr * 3.154e7,
        fromBase: (s) => s / 3.154e7
    },
    {
        displayName: "Decade",
        pluralDisplayName: "Decades",
        type: "time",
        metric: false,
        aliases: ["decade", "decades"],
        toBase: (decade) => decade * 3.154e8,
        fromBase: (s) => s / 3.154e8
    },
    {
        displayName: "Century",
        pluralDisplayName: "Centuries",
        type: "time",
        metric: false,
        aliases: ["century", "centuries"],
        toBase: (century) => century * 3.154e9,
        fromBase: (s) => s / 3.154e9
    },
    {
        displayName: "Millennium",
        pluralDisplayName: "Millennia",
        type: "time",
        metric: false,
        aliases: ["millennium", "millennia"],
        toBase: (millennium) => millennium * 3.154e10,
        fromBase: (s) => s / 3.154e10
    },
    // Frequency units
    {
        displayName: "Hertz",
        pluralDisplayName: "Hertz",
        type: "frequency",
        metric: true,
        aliases: ["hz", "hertz"],
        toBase: (hz) => hz,
        fromBase: (hz) => hz
    },
    // Data units
    {
        displayName: "Bit",
        pluralDisplayName: "Bits",
        type: "data",
        metric: true,
        aliases: ["b", "bit", "bits"],
        toBase: (bit) => bit,
        fromBase: (bit) => bit
    },
    {
        displayName: "Byte",
        pluralDisplayName: "Bytes",
        type: "data",
        metric: true,
        aliases: ["B", "byte", "bytes"],
        toBase: (byte) => byte * 8,
        fromBase: (bit) => bit / 8
    },
    // Speed units
    {
        displayName: "Meter per second",
        pluralDisplayName: "Meters per second",
        type: "speed",
        metric: true,
        aliases: ["m/s", "meters per second"],
        toBase: (mps) => mps,
        fromBase: (mps) => mps
    },
    {
        displayName: "Meter per hour",
        pluralDisplayName: "Meters per hour",
        type: "speed",
        metric: true,
        aliases: ["m/h", "meters per hour"],
        toBase: (mph) => mph / 3600,
        fromBase: (mps) => mps * 3600
    },
    {
        // Adding Kilometers per hour here even though m/h is already defined to allow for using "kph" alias
        displayName: "Kilometer per hour",
        pluralDisplayName: "Kilometers per hour",
        type: "speed",
        metric: false,
        aliases: ["kph"],
        toBase: (kph) => kph * 0.2777777778,
        fromBase: (mps) => mps / 0.2777777778
    },
    {
        displayName: "Mile per hour",
        pluralDisplayName: "Miles per hour",
        type: "speed",
        metric: false,
        aliases: ["mph", "miles per hour", "mi/h"],
        toBase: (mph) => mph * 0.44704,
        fromBase: (mps) => mps / 0.44704
    },
    {
        displayName: "Knot",
        pluralDisplayName: "Knots",
        type: "speed",
        metric: false,
        aliases: ["kn", "knot", "knots"],
        toBase: (kn) => kn * 0.514444,
        fromBase: (mps) => mps / 0.514444
    },
    {
        displayName: "Foot per second",
        pluralDisplayName: "Feet per second",
        type: "speed",
        metric: false,
        aliases: ["ft/s", "feet per second", "fps"],
        toBase: (fps) => fps * 0.3048,
        fromBase: (mps) => mps / 0.3048
    },
    {
        displayName: "c (Light Speed)",
        pluralDisplayName: "c (Light Speed)",
        type: "speed",
        metric: false,
        aliases: ["c", "light speed"],
        toBase: (c) => c * 299792458,
        fromBase: (mps) => mps / 299792458
    },
    // Torque units
    {
        displayName: "Newton-meter",
        pluralDisplayName: "Newton-meters",
        type: "torque",
        metric: true,
        aliases: ["N·m", "Nm", "newton meter", "newton meters", "newton-meter", "newton-meters", "newton metre", "newton metres", "newton-metre", "newton-metres"],
        toBase: (nm) => nm,
        fromBase: (nm) => nm
    },
    {
        displayName: "Pound-foot",
        pluralDisplayName: "Pound-feet",
        type: "torque",
        metric: false,
        aliases: ["lb·ft", "lbf·ft", "pound-foot", "pound-feet"],
        toBase: (lbf) => lbf * 1.35582,
        fromBase: (nm) => nm / 1.35582
    },
    // Pressure units
    {
        displayName: "Pascal",
        pluralDisplayName: "Pascals",
        type: "pressure",
        metric: true,
        aliases: ["pa", "pascal", "pascals"],
        toBase: (pa) => pa,
        fromBase: (pa) => pa
    },
    {
        displayName: "Bar",
        pluralDisplayName: "Bars",
        type: "pressure",
        metric: true,
        aliases: ["bar", "bars"],
        toBase: (bar) => bar * 100000,
        fromBase: (pa) => pa / 100000
    },
    {
        displayName: "PSI",
        pluralDisplayName: "PSI",
        type: "pressure",
        metric: false,
        aliases: ["psi", "pound per square inch", "pounds per square inch", "pound/sq inch", "pounds/sq inch", "pound/inch²", "pounds/inch²", "pound/inch2", "pounds/inch2", "pound/inch^2", "pounds/inch^2"],
        toBase: (psi) => psi * 6894.76,
        fromBase: (pa) => pa / 6894.76
    },
    {
        displayName: "Atmosphere",
        pluralDisplayName: "Atmospheres",
        type: "pressure",
        metric: false,
        aliases: ["atm", "atms", "atmosphere", "atmospheres", "standard atmosphere", "standard atmospheres", "std atm", "std atms", "std atmosphere", "std atmospheres", "standard atm", "standard atms"],
        toBase: (atm) => atm * 101325,
        fromBase: (pa) => pa / 101325
    },
    {
        displayName: "Torr",
        pluralDisplayName: "Torr",
        type: "pressure",
        metric: false,
        aliases: ["torr"],
        toBase: (torr) => torr * 133.322,
        fromBase: (pa) => pa / 133.322
    },
    {
        displayName: "Millimeter of mercury",
        pluralDisplayName: "Millimeters of mercury",
        type: "pressure",
        metric: false,
        aliases: ["mmhg", "mm hg", "millimeter of mercury", "millimeters of mercury"],
        toBase: (mmHg) => mmHg * 133.322,
        fromBase: (pa) => pa / 133.322
    },
    {
        displayName: "Inch of mercury",
        pluralDisplayName: "Inches of mercury",
        type: "pressure",
        metric: false,
        aliases: ["inhg", "in hg", "inch of mercury", "inches of mercury", "hg"],
        toBase: (inHg) => inHg * 3386.39,
        fromBase: (pa) => pa / 3386.39
    },
    {
        displayName: "Inch of water",
        pluralDisplayName: "Inches of water",
        type: "pressure",
        metric: false,
        aliases: ["inh2O", "in h2O", "inch of water", "inches of water"],
        toBase: (inH2O) => inH2O * 249.08891,
        fromBase: (pa) => pa / 249.08891
    },
    {
        displayName: "Kilopound per square inch",
        pluralDisplayName: "Kilopounds per square inch",
        type: "pressure",
        metric: false,
        aliases: ["ksi", "kilopound per square inch", "kilopounds per square inch", "kpsi"],
        toBase: (ksi) => ksi * 6894757.29,
        fromBase: (pa) => pa / 6894757.29
    },
    // Force units
    {
        displayName: "Newton",
        pluralDisplayName: "Newtons",
        type: "force",
        metric: true,
        aliases: ["n", "newton", "newtons"],
        toBase: (n) => n,
        fromBase: (n) => n
    },
    {
        displayName: "Pound-force",
        pluralDisplayName: "Pound-force",
        type: "force",
        metric: false,
        aliases: ["lbf", "pound-force", "pound forces", "pound force"],
        toBase: (lbf) => lbf * 4.44822,
        fromBase: (n) => n / 4.44822
    },
    {
        displayName: "Kilogram-force",
        pluralDisplayName: "Kilogram-force",
        type: "force",
        metric: false,
        aliases: ["kgf", "kilogram-force", "kilograms-force", "kilogram forces"],
        toBase: (kgf) => kgf * 9.80665,
        fromBase: (n) => n / 9.80665
    },
    // Voltage units
    {
        displayName: "Volt",
        pluralDisplayName: "Volts",
        type: "voltage",
        metric: true,
        aliases: ["v", "volt", "volts"],
        toBase: (v) => v,
        fromBase: (v) => v
    },
    // Current units
    {
        displayName: "Amp",
        pluralDisplayName: "Amps",
        type: "current",
        metric: true,
        aliases: ["a", "amp", "ampere", "amperes", "amps"],
        toBase: (a) => a,
        fromBase: (a) => a
    },
    // Power units
    {
        displayName: "Watt",
        pluralDisplayName: "Watts",
        type: "power",
        metric: true,
        aliases: ["w", "watt", "watts", "joule per second", "joules per second", "j/s"],
        toBase: (w) => w,
        fromBase: (w) => w
    },
    {
        displayName: "Horsepower",
        pluralDisplayName: "Horsepower",
        type: "power",
        metric: false,
        aliases: ["hp", "horsepower", "horse power", "horse-power"],
        toBase: (hp) => hp * 745.7,
        fromBase: (w) => w / 745.7
    },
    {
        displayName: "BTU per hour",
        pluralDisplayName: "BTUs per hour",
        type: "power",
        metric: false,
        aliases: ["btu/h", "btu per hour", "btu/hr"],
        toBase: (btu) => btu * 0.29307107,
        fromBase: (w) => w / 0.29307107
    },
    {
        displayName: "BTU per minute",
        pluralDisplayName: "BTUs per minute",
        type: "power",
        metric: false,
        aliases: ["btu/m", "btu/min", "btu per minute"],
        toBase: (btu) => btu * 17.5842667,
        fromBase: (w) => w / 17.5842667
    },
    {
        displayName: "BTU per second",
        pluralDisplayName: "BTUs per second",
        type: "power",
        metric: false,
        aliases: ["btu/s", "btu per second", "btu/sec"],
        toBase: (btu) => btu * 1055.05585,
        fromBase: (w) => w / 1055.05585
    },
    {
        displayName: "Pferdestärke",
        pluralDisplayName: "Pferdestärken",
        type: "power",
        metric: false,
        aliases: ["ps", "pferdestärke", "pferdestärken", "metric horsepower", "metric hp"],
        toBase: (ps) => ps * 735.49875,
        fromBase: (w) => w / 735.49875
    },
    // Energy units
    {
        displayName: "Joule",
        pluralDisplayName: "Joules",
        type: "energy",
        metric: true,
        aliases: ["j", "joule", "joules"],
        toBase: (j) => j,
        fromBase: (j) => j
    },
    {
        displayName: "Calorie",
        pluralDisplayName: "Calories",
        type: "energy",
        metric: false,
        aliases: ["cal", "calorie", "calories"],
        toBase: (cal) => cal * 4.184,
        fromBase: (j) => j / 4.184
    },
    {
        displayName: "Kilocalorie",
        pluralDisplayName: "Kilocalories",
        type: "energy",
        metric: false,
        aliases: ["kcal", "kilocalorie", "kilocalories"],
        toBase: (kcal) => kcal * 4184,
        fromBase: (j) => j / 4184
    },
    {
        displayName: "Watt-hour",
        pluralDisplayName: "Watt-hours",
        type: "energy",
        metric: true,
        aliases: ["wh", "watt hour", "watt hours", "watt-hour", "watt-hours"],
        toBase: (Wh) => Wh * 3600,
        fromBase: (j) => j / 3600
    },
    // Angle units
    {
        displayName: "Degree",
        pluralDisplayName: "Degrees",
        type: "angle",
        metric: true,
        aliases: ["deg", "degree", "degrees", "°"],
        toBase: (deg) => deg,
        fromBase: (deg) => deg
    },
    {
        displayName: "Radian",
        pluralDisplayName: "Radians",
        type: "angle",
        metric: false,
        aliases: ["rad", "radian", "radians"],
        toBase: (rad) => rad * (180 / Math.PI),
        fromBase: (deg) => deg * (Math.PI / 180)
    },
    {
        displayName: "Gradian",
        pluralDisplayName: "Gradians",
        type: "angle",
        metric: false,
        aliases: ["grad", "gradians"],
        toBase: (grad) => grad * 0.9,
        fromBase: (deg) => deg / 0.9
    },
    {
        displayName: "Arcminute",
        pluralDisplayName: "Arcminutes",
        type: "angle",
        metric: false,
        aliases: ["arcmin", "arcminute", "arcminutes"],
        toBase: (arcmin) => arcmin / 60,
        fromBase: (deg) => deg * 60
    },
    {
        displayName: "Arcsecond",
        pluralDisplayName: "Arcseconds",
        type: "angle",
        metric: false,
        aliases: ["arcsec", "arcsecond", "arcseconds"],
        toBase: (arcsec) => arcsec / 3600,
        fromBase: (deg) => deg * 3600
    },
    // Acceleration units
    {
        displayName: "Meter per second squared",
        pluralDisplayName: "Meters per second squared",
        type: "acceleration",
        metric: true,
        aliases: ["m/s²", "m/s2", "m/s^2", "meter per second squared", "meters per second squared"],
        toBase: (m_s2) => m_s2,
        fromBase: (m_s2) => m_s2
    },
    {
        displayName: "Standard gravity",
        pluralDisplayName: "Standard gravities",
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

export default units;
