# ESP32 Smart Light Remote
Using the ESP32 to turn a simple light into a smart light by replicating the infrared remote with an infrared transmitter module.

## How it works
The smart light will be accessible over the web by using the capabilities of the ESP32 to host an asynchronous webserver. With this, url parameters can trigger certain actions such as turning the light on or off by sending the right IR (Infrared) codes using the infrared transmitter module.

The project will have the front-end contained in a Progressive Web App (PWA) so it can be easily installable on (mobile) devices using only web development.
For now the application will contain basic remote functions, but can be further extended in the future to provide smart features such as home assistant based (voice) commands.

The ESP32 can send data back to the application (it´s state: e.g. light is on or off) using the same method as described before (url parameters).
