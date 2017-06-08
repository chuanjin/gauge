var engine_gauge = new RadialGauge({
    renderTo: 'engine_speed',
    width: 250,
    height: 250,
    units: 'x 1000 r/min',
    title: false,
    value: 0,
    minValue: 0,
    maxValue: 8,
    borders: true,
    borderOuterWidth: 16,
    colorBorderOuter: '#C0C0C0',
    borderMiddleWidth: 0,
    borderInnerWidth: 8,
    borderShadowWidth: 5,
    majorTicks: [
        '0','1','2','3','4','5','6','7','8'
    ],
    ticksAngle: 150,
    highlights: [
        {"from": 7, "to": 8, "color": "red"}
    ],
    minorTicks: 3,
    strokeTicks: true,
    colorPlate: 'rgba(0,0,0,0.9)',
    colorMajorTicks: 'white',
    colorMinorTicks: 'white',
    colorTitle: '#fff',
    colorUnits: '#ccc',
    colorNumbers: '#eee',
    colorNeedle: 'rgba(240, 1, 2, 1)',
    colorNeedleEnd: 'rgba(255, 160, 122, .9)',
    valueBox: false,
    animationRule: 'bounce',
    animationDuration: 500
}).draw();


var vehicle_gauge = new RadialGauge({
    renderTo: 'vehicle_speed',
    width: 400,
    height: 400,
    units: 'Km/h',
    title: false,
    value: 0,
    minValue: 0,
    maxValue: 220,
    borders: true,
    borderOuterWidth: 30,
    colorBorderOuter: '#C0C0C0',
    borderMiddleWidth: 0,
    borderInnerWidth: 10,
    borderShadowWidth: 8,
    majorTicks: [
        '0','20','40','60','80','100','120','140','160','180','200','220'
    ],
    highlights: [],
    minorTicks: 5,
    strokeTicks: true,
    colorPlate: 'rgba(0,0,0,0.9)',
    colorMajorTicks: '#00ffff',
    colorMinorTicks: 'white',
    colorTitle: '#fff',
    colorUnits: '#ccc',
    colorNumbers: '#eee',
    colorNeedle: 'rgba(240, 1, 2, 1)',
    colorNeedleEnd: 'rgba(255, 160, 122, .9)',
    valueBox: false,
    animationRule: 'bounce',
    animationDuration: 500
}).draw();


var fuel_gauge = new RadialGauge({
    renderTo: "fuel",
    width: 200,
    height: 200,
    value: 0,
    minValue: 0,
    maxValue: 8,
    borders: true,
    borderOuterWidth: 20,
    colorBorderOuter: '#C0C0C0',
    borderMiddleWidth: 0,
    borderInnerWidth: 10,
    borderShadowWidth: 10,
    majorTicks: ['E','F'],
    ticksAngle: 100,
    highlights: [
        {"from": 0, "to": 1, "color": "red"}
    ],
    minorTicks: 4,
    strokeTicks: true,
    colorPlate: 'rgba(0,0,0,0.9)',
    colorMajorTicks: 'white',
    colorMinorTicks: 'white',
    colorTitle: '#fff',
    colorUnits: '#ccc',
    colorNumbers: '#eee',
    colorNeedle: 'rgba(240, 1, 2, 1)',
    colorNeedleEnd: 'rgba(255, 160, 122, .9)',
    valueBox: false,
    animationRule: 'bounce',
    animationDuration: 500
}).draw();


var fuel_gauge = new RadialGauge({
    renderTo: "temp",
    width: 200,
    height: 200,
    value: 0,
    minValue: 0,
    maxValue: 8,
    borders: true,
    borderOuterWidth: 20,
    colorBorderOuter: '#C0C0C0',
    borderMiddleWidth: 0,
    borderInnerWidth: 10,
    borderShadowWidth: 10,
    majorTicks: ['C','H'],
    ticksAngle: 100,
    highlights: [
        {"from": 7, "to": 8, "color": "red"}
    ],
    minorTicks: 1,
    strokeTicks: true,
    colorPlate: 'rgba(0,0,0,0.9)',
    colorMajorTicks: 'white',
    colorMinorTicks: 'white',
    colorTitle: '#fff',
    colorUnits: '#ccc',
    colorNumbers: '#eee',
    colorNeedle: 'rgba(240, 1, 2, 1)',
    colorNeedleEnd: 'rgba(255, 160, 122, .9)',
    valueBox: false,
    animationRule: 'bounce',
    animationDuration: 500
}).draw();



