# Twin Science Kit Extension for PXT/microbit
This extension provides the blocks for [Twin](https://www.twinscience.com/what/).
## Input and output
Pins P0, P1, P2 are reserved for input related modules such as movement and light sensors.
Pins P8,P14,P16 are reserved for output related modules such as the DC and servomotor.
## Movement
Movement subgroub provides the necessary blocks to drive the DC and servomotors 
included in the Twin Science Kit. Speed values can be selected between 0 and 100.
### DC Motor
```blocks
// Select P8 which is connected to the dc motor set speed to 100. 
twin.dcMotor(OutPins.P8, 100)
```   
### Servomotor
```blocks
// Select P14 which is connected to the servomotor and set rotation speed to 80. 
twin.dcMotor(OutPins.P14, 80)
```   
## Detect
Value based detection blocks return the analog value read from the sensor.
### Reading Sensors
```blocks
// Read the value of the movement sensor connected to P0
twin.readSensor(SensorType.movement, InPins.P0)
```
```blocks
// Read the value of the potentiometer connected to P1
twin.potantiometer(InPins.P1)
```
```blocks
// Read the value of the infrared proximity sensor connected to P2
twin.proxSensor(InPins.P2)
```
Boolean based detection blocks return true or false based on the response of the module.
```blocks
// Returns true when the button connected to P0 is pressed.
twin.buttonPress(InPins.P0)
```
```blocks
// Returns true when the reciever connected to P0 is recieves a signal.
twin.remoteControl(InPins.P0)
```
## Sound
### Specifying the pin connected to buzzer
You have to use the pin select block to specify the pin that is connected to the buzzer before using any blocks in this subgroup.
```blocks
//When there is a buzzer connected to the P8 pin
twin.buzzerPinSel(OutPins.P8)
```
### Playing a melody from the buzzer
You can select any of the melodies previously added by us to play on the buzzer.
```blocks
//Plays the starwars melody
twin.buzzerMelody(0)
```
### Playing a note on the buzzer
To play specific notes for any duration(ms) you can use this block.
```blocks
//Plays the selected note for 100 ms
twin.buzzerNote(BuzzerNotes.LowC, 100)
```
To play any note by specifying the frequency and duration(ms) you can use this block.
```blocks
//Plays the 340(Hz) note for 100 ms
twin.buzzerCustomNote(340, 100)
```

## License



## Supported targets

* for PXT/microbit


