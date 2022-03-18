# ESP32 Smart Light Remote
Using the ESP32 to turn a simple light into a smart light by replicating the infrared remote with an infrared transmitter module.

## How it works
The smart light will be accessible over the web by using the capabilities of the ESP32 to host an asynchronous webserver. With this, url parameters can trigger certain actions such as turning the light on or off by sending the right IR (Infrared) codes using the infrared transmitter module.

The project will have the front-end contained in a Progressive Web App (PWA) so it can be easily installable on (mobile) devices using only web development.
For now the application will contain basic remote functions, but can be further extended in the future to provide smart features such as home assistant based (voice) commands.

The ESP32 can send data back to the application (it´s state: e.g. light is on or off) using the same method as described before (url parameters).

## How to install
The front-end mobile/desktop app can be installed using the following [link](https://vdbthomas.github.io/esp32-smart-light-remote/pwa/).
Make sure that your browser and device supports progressive web apps.

The back-end [code](https://vdbthomas.github.io/esp32-smart-light-remote/esp32/IR_remote_server.ino) for your ESP32 can be uploaded to your board by using the Arduino IDE (most simple option) or any other supported program.
To add support in the Arduino IDE for the ESP32, follow this [guide](https://docs.espressif.com/projects/arduino-esp32/en/latest/installing.html).

Most libraries used come pre-installed with the Espressif Board Manager, for Infrared support I am using the [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266) library by crankyoldgit.
This library can be installed by following the installation steps on the github page.
