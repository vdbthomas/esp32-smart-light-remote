/*

created for arduino 
25 Nov 2012 by Tom Igoe

ported for sparkfun esp32 
31.01.2017 by Jan Hendrik Berlin

edited on 
02.03.2022 by vdbthomas
 
 */

#include <WiFi.h>
#include <ESPmDNS.h>
#include <Arduino.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

const char* ssid     = "ssid";
const char* password = "pass";

WiFiServer server(80);

const uint16_t kIrLed = 4;  // GPIO pin for IR signal. Recommended: 4 (D2).

IRsend irsend(kIrLed);

void setup()
{
    Serial.begin(115200);
    irsend.begin();

    delay(10);

    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    MDNS.begin("esp");
    
    server.begin();

}

int value = 0;

void loop(){
 WiFiClient client = server.available();   // listen for incoming clients

  if (client) {                             // if you get a client,
    Serial.println("New Client.");           // print a message out the serial port
    String currentLine = "";                // make a String to hold incoming data from the client
    while (client.connected()) {            // loop while the client's connected
      if (client.available()) {             // if there's bytes to read from the client,
        char c = client.read();             // read a byte, then
        Serial.write(c);                    // print it out the serial monitor
        if (c == '\n') {                    // if the byte is a newline character

          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0) {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // and a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();

            // the content of the HTTP response follows the header:
            client.print("");

            // The HTTP response ends with another blank line:
            client.println();
            // break out of the while loop:
            break;
          } else {    // if you got a newline, then clear currentLine:
            currentLine = "";
          }
        } else if (c != '\r') {  // if you got anything else but a carriage return character,
          currentLine += c;      // add it to the end of the currentLine
        }

        // Check to see if the client request was "GET /on" or "GET /off":
        if (currentLine.endsWith("GET /on")) {
            irsend.sendNEC(0xFFB04F, 32);
            delay(500);
            digitalWrite(kIrLed, LOW);               // GET /on turns the LED on
        }
        if (currentLine.endsWith("GET /off")) {
            irsend.sendNEC(0xFFF807, 32);
            delay(500);
            digitalWrite(kIrLed, LOW);                  // GET /off turns the LED off
        }
      }
    }
    // close the connection:
    client.stop();
    Serial.println("Client Disconnected.");
  }
}
