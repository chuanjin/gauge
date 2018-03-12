import sys
import time
import paho.mqtt.client as mqtt
import threading
from random import randint, random

PORT=1883
HOST=sys.argv[1]

class StoppableThread(threading.Thread):
    """Thread class with a stop() method. The thread itself has to check
    regularly for the stopped() condition."""

    def __init__(self, **args):
        super(StoppableThread, self).__init__(**args)
        self._stop_event = threading.Event()

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()


def on_connect(self, mosq, obj, rc):
    print("Connected to MQTT broker: rc="+str(rc))
    mqttc.subscribe('cmd/program')

def on_message(mosq, userdata, msg):
    global program
    payload = msg.payload.decode("utf-8")
    print("Got topic: " + msg.topic + ", message: " + msg.payload.decode("utf-8"))
    if payload == 'on' and (not program or program.stopped()) :
        print "starting..."
        try:
            program = StoppableThread(target = start_program)
            program.start()
        except RuntimeError:
            # Thread can only start once,
            # therefore we call join() to terminate the current one
            # and create a new one.
            program.stop()
            program.join()
            program = threading.Thread(target = start_program)
            program.start()
    elif payload == 'off':
        mqttc.publish('engine_speed', 0, retain=True)
        mqttc.publish('vehicle_speed', 0, retain=True)
        mqttc.publish('temp', 0, retain=True)
        mqttc.publish('fuel', 0, retain=True)
        stop_program()

def mqttHandler():
    mqttc.connect(HOST, PORT, keepalive=100)

    while True:
        try:
            mqttc.loop()
        except KeyboardInterrupt:
            break

def update_speed(engine_speed, vehicle_speed):
    if vehicle_speed < 40:
        engine_speed = randint(1, 2)
        vehicle_speed = randint(15, 40)
    elif vehicle_speed >= 40:
        engine_speed = randint(2, 3)
        vehicle_speed = randint(40, 80)
    elif vehicle_speed >= 80:
        engine_speed = randint(3, 4)
        vehicle_speed = randint(80, 120)
    elif vehicle_speed >= 120:
        engine_speed = randint(4, 5)
        vehicle_speed = randint(80, 180)
    return engine_speed, vehicle_speed

def update_temp_fuel(start_time):
    current_time = time.time()
    elapsed = current_time - start_time
    if elapsed <= 15:
        temp = 1
        fuel = 7
    elif elapsed <= 30:
        temp = 2
        fuel = 6
    elif elapsed <= 60:
        temp = 3
        fuel = 6
    else:
        temp = 4
        fuel = 5
    return temp, fuel


def start_program():
    start_time = time.time()
    vehicle_speed = randint(0, 20)
    engine_speed = 1
    temp = 0
    fuel = 7
    while program and not program.stopped():
        mqttc.publish('temp', temp, retain=True)
        time.sleep(random())
        mqttc.publish('fuel', fuel, retain=True)
        time.sleep(random())
        mqttc.publish('engine_speed', engine_speed, retain=True)
        time.sleep(random())
        mqttc.publish('vehicle_speed', vehicle_speed, retain=True)
        time.sleep(random())
        engine_speed, vehicle_speed = update_speed(engine_speed, vehicle_speed)
        temp, fuel = update_temp_fuel(start_time)

def stop_program():
    if program:
        try:
            program.stop()
            program.join()
        except RuntimeError:
            pass


if __name__ == '__main__':
    mqttc = mqtt.Client(client_id="device", clean_session=False)
    mqttc.on_connect = on_connect
    mqttc.on_message = on_message

    program = None
    # Start the loop:
    mqttHandler()
