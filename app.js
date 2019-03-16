var client;
var reconnectTimeout = 20000;
var port = 443;
var host = "iot.eclipse.org"
var topic = "chuanjin/gauge/#"

function MQTTconnect() {
    client = new Paho.MQTT.Client(
            host,
            port,
            "web_" + parseInt(Math.random() * 100, 10));
    var options = {
        timeout: 3,
        cleanSession: false,
        useSSL: true,
        onSuccess: onConnect,
        onFailure: function (message) {
            console.log("Fail to connect!")
            setTimeout(MQTTconnect, reconnectTimeout);
        }
    };

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect(options);
}

function onConnect() {
    // Connection succeeded; subscribe to our topic
    client.subscribe(topic, {qos: 0});
    console.log("Connected!")
}

function onConnectionLost(response) {
    setTimeout(MQTTconnect, reconnectTimeout);
};

function onMessageArrived(message) {
    var from = message.destinationName;
    var payload = message.payloadString;
    topic_arr = from.split("/")
    topic = topic_arr[topic_arr.length - 1]

    if (topic == "vehicle_speed" ) {
        vehicle_gauge.value = payload
    }
    else if (topic == "engine_speed") {
        engine_gauge.value = payload
    }
    else if (topic == "fuel") {
        fuel_gauge.value = payload
    }
    else if (topic == "temp") {
        temp_gauge.value = payload
    }
};

function sendData(topic, data) {
    message = new Paho.MQTT.Message(data);
    message.destinationName = topic;
    client.send(message);
}

function startProg() {
    sendData("cmd/program", "on")
}

function stopProg() {
    sendData("cmd/program", "off")
}



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


var temp_gauge = new RadialGauge({
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



MQTTconnect();
