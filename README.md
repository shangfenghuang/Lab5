ENGO651-lab5

Group 4: Cheuk Him, NG (30183823); Shang Feng, Huang (30163965)

In this lab, we designed a web page application that allow users to establish a connection with an MQTT message broker and publish messages to any topic they choose. It can create and publish a Geojson message with the user's current location with a random temperature value, which can be subscribed to and read by MQTTX. Aside from that, this application could also be used on the web browsers and mobile phones. Our application offers the following features:

1. Customizable MQTT message broker host and port.
2. Start/End button to establish and finish a connection with the MQTT message broker.
3. Automatic re-connection in case of disconnection with proper messages.
4. Ability to publish messages to any topic.
5. "Share my status" button to generate and publish a Geojson message with the user's location and temperature value to an MQTT topic.
6. Map display of the user's current location and temperature value.
7. Automatic update of the map display upon publishing the Geojson message to MQTTX.

It can provide users with a seamless experience in establishing and maintaining a connection with an MQTT message broker, while also offering the ability to publish and subscribe to various topics. Additionally, the "share my status" function allows users to share their current location and temperature, making it a great tool for location-based IoT services.
