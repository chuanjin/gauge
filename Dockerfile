FROM python:3

WORKDIR /

COPY sim.py ./
RUN pip install paho-mqtt

CMD [ "python", "./sim.py", "mqtt.flespi.io" ]
