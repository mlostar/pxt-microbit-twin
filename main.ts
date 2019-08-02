/**
 * Enumeration for output pins
 */
enum OutPins {
    //% block=P8
    P8,
    //% block=P14
    P14,
    //% block=P16
    P16
}

/**
 * Enumeration for input pins 
 */
enum InPins {
    //% block=P0
    P0,
    //% block=P1
    P1,
    //% block=P2
    P2
}
/**
 * Enumeration for sensor types
 */
enum SensorType {
    //% block=Movement
    movement,
    //% block=Light
    light,
    //% block=Sound
    sound
}
/**
* Enumeration for buzer melodies 
*/
enum BuzzerMelodies {
    Starwars
}
/**
* Enumeration for buzzer notes 
*/
enum BuzzerNotes {
    LowC = 131,
    LowCS = 139,
    LowD = 147,
    LowDS = 156,
    LowE = 165,
    LowF = 175,
    LowFS = 185,
    LowG = 196,
    LowGS = 208,
    LowA = 220,
    LowAS = 234,
    LowB = 247,
    MiddleC = 262,
    MiddleCS = 278,
    MiddleD = 294,
    MiddleDS = 311,
    MiddleE = 330,
    MiddleF = 349,
    MiddleFS = 370,
    MiddleG = 394,
    MiddleGS = 415,
    MiddleB = 494,
    HighC = 523,
    HighCS = 554,
    HighD = 587,
    HighDS = 632,
    HighE = 659,
    HighF = 699,
    HighFS = 740,
    HighG = 784,
    HighGS = 831,
    HighA = 880,
    HighAS = 932,
    HighB = 988,
}
/**
* Enumeration for pin modes 
*/
enum PinMode {
    Analog,
    Digital
}

/**
 * Provides access to Twin micro:bit extension
 */
//% color=170 weight=49 block="Twin" icon="\uf076"
namespace twin {

    //Movement
    /**
    * Select DC Motor Pin and velocity
    */
    //% blockId="twin_dc_movement" block="DC motor at %outPin speed %velocity"
    //% velocity.min=0 velocity.max=100
    //% weight=100
    //% subcategory=Movement
    export function dcMotor(outPin: OutPins, velocity: number) {
        if (velocity != 0) {
            velocity = 495 + 5.28 * velocity
        }
        pinWrite(PinMode.Analog, outPin, velocity);
    }

    /**
    * Select Servomotor Pin and speed when it is operating in b mode
    */
    //% blockId="twin_servo_movement" block="Servomotor at %outPin rotation speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=90
    //% subcategory=Movement
    export function servoMotor(outPin: OutPins, speed: number) {
        pinWrite(PinMode.Analog, outPin, speed)
    }

    //Detect
    /**
    * Read the sensor at given pin
    */
    //% blockId="twin_sensor_detect" block="Value read by the %sensor sensor at %inPin"
    //% weight=100
    //% subcategory=Detect
    export function readSensor(sensor: SensorType, inPin: InPins): number {
        let readValue = pinRead(PinMode.Analog, inPin);
        return readValue
    }
    
    /**
    * Read the button at given pin
    */
    //% blockId="twin_button_detect" block="Button at %inPin is pressed"
    //% weight=95
    //% subcategory=Detect
    export function buttonPress(inPin: InPins): boolean {
        let readValue = pinRead(PinMode.Analog, inPin);
        if (aToD(readValue)) return true;
        else return false;
    }

    /**
    * Read the remote control at given pin
    */
    //% blockId="twin_remote_detect" block="Remote control at %inPin detects signal"
    //% weight=90
    //% subcategory=Detect
    export function remoteControl(inPin: InPins): boolean {
        let readValue = pinRead(PinMode.Analog, inPin);
        if (aToD(readValue)) return true;
        else return false;
    }

    /**
    * Read the potantiometer value at given pin
    */
    //% blockId="twin_potantiometer_detect" block="Value read by the potantiometer at %inPin"
    //% weight=85
    //% subcategory=Detect
    export function potantiometer(inPin: InPins): number {
        return pinRead(PinMode.Analog, inPin);
    }

    /**
    * Read the infrared proximity sensor value at given pin
    */
    //% blockId="twin_proximity_detect" block="Value read by the proximity sensor at %inPin"
    //% weight=80
    //% subcategory=Detect
    export function proxSensor(inPin: InPins): number {
        return pinRead(PinMode.Analog, inPin);
    }

    //Light and Sound
    /**
     * Select the pin the buzzer is connected to
     */
    //% blockId="twin_buzzersel_sound" block="Select %outpin as the buzzer connection"
    //% weight=100
    //% subcategory=Sound
    export function buzzerPinSel(outPin: OutPins) {
        switch (outPin) {
            case OutPins.P8:
                pins.analogSetPitchPin(AnalogPin.P8);
                break;
            case OutPins.P14:
                pins.analogSetPitchPin(AnalogPin.P14);
                break;
            case OutPins.P16:
                pins.analogSetPitchPin(AnalogPin.P16);
                break;
        }
    }

    /**
     * Play the selected melody on the buzzer connected at the selected pin
     */
    //% blockId="twin_melody_sound" block="Play %melody on the buzzer"
    //% weight=97
    //% subcategory=Sound
    export function buzzerMelody(melody: BuzzerMelodies) {
        //TODO simdilik sadece starwars
        switch (melody) {
            case BuzzerMelodies.Starwars:
                starWars();
                break;
        }
    }

    /**
     * Play the selected note on the buzzer connected at the selected pin
     */
    //% blockId="twin_note_sound" block="Play tone %note for %ms ms"
    //% weight=95
    //% subcategory=Sound
    export function buzzerNote(note: BuzzerNotes, ms: number) {
        pins.analogPitch(note, ms);
    }

    /**
     * Play the input frequency on the buzzer connected at the selected pin
     */
    //% blockId="twin_customnote_sound" block="Play tone %note (Hz) for %ms ms"
    //% weight=90
    //% subcategory=Sound
    export function buzzerCustomNote(note: number, ms: number) {
        pins.analogPitch(note, ms);
    }

    function pinWrite(pinmode: PinMode, outPin: OutPins, value: number) {
        if (pinmode == PinMode.Analog) {
            switch (outPin) {
                case OutPins.P8:
                    pins.analogWritePin(AnalogPin.P8, value);
                    break;
                case OutPins.P14:
                    pins.analogWritePin(AnalogPin.P14, value);
                    break;
                case OutPins.P16:
                    pins.analogWritePin(AnalogPin.P16, value);
                    break;
            }
        } else {
            switch (outPin) {
                case OutPins.P8:
                    pins.digitalWritePin(DigitalPin.P8, value);
                    break;
                case OutPins.P14:
                    pins.digitalWritePin(DigitalPin.P14, value);
                    break;
                case OutPins.P16:
                    pins.digitalWritePin(DigitalPin.P16, value);
                    break;
            }
        }
    }
    function pinRead(pinmode: PinMode, inPin: InPins): number {
        if (pinmode == PinMode.Analog) {
            switch (inPin) {
                case InPins.P0:
                    return pins.analogReadPin(AnalogPin.P0);
                case InPins.P1:
                    return pins.analogReadPin(AnalogPin.P1);
                case InPins.P2:
                    return pins.analogReadPin(AnalogPin.P2);
                default: return -1;
            }
        } else {
            switch (inPin) {
                case InPins.P0:
                    return pins.digitalReadPin(DigitalPin.P0);
                case InPins.P1:
                    return pins.digitalReadPin(DigitalPin.P1);
                case InPins.P2:
                    return pins.digitalReadPin(DigitalPin.P2);
                default: return -1;
            }
        }
    }
    function aToD(value: number): number { if (value >= 495) return 1; else return 0; }
    function starWars() {
        pins.analogPitch(440, 500)
        pins.analogPitch(440, 500)
        pins.analogPitch(440, 500)
        pins.analogPitch(349, 350)
        pins.analogPitch(523, 150)
        pins.analogPitch(440, 500)
        pins.analogPitch(349, 350)
        pins.analogPitch(523, 150)
        pins.analogPitch(440, 650)
        basic.pause(500)
        pins.analogPitch(659, 500)
        pins.analogPitch(659, 500)
        pins.analogPitch(659, 500)
        pins.analogPitch(698, 350)
        pins.analogPitch(523, 150)
        pins.analogPitch(415, 500)
        pins.analogPitch(349, 350)
        pins.analogPitch(523, 150)
        pins.analogPitch(440, 650)
        basic.pause(500)
        pins.analogPitch(880, 500)
        pins.analogPitch(440, 300)
        pins.analogPitch(440, 150)
        pins.analogPitch(880, 500)
        pins.analogPitch(831, 325)
        pins.analogPitch(784, 175)
        pins.analogPitch(740, 125)
        pins.analogPitch(698, 125)
        pins.analogPitch(740, 250)
        basic.pause(325)
        pins.analogPitch(466, 250)
        pins.analogPitch(622, 500)
        pins.analogPitch(587, 325)
        pins.analogPitch(554, 175)
        pins.analogPitch(523, 125)
        pins.analogPitch(466, 125)
        pins.analogPitch(523, 250)
        basic.pause(350)
        pins.analogPitch(349, 250)
        pins.analogPitch(415, 500)
        pins.analogPitch(349, 350)
        pins.analogPitch(440, 125)
        pins.analogPitch(523, 500)
        pins.analogPitch(440, 375)
        pins.analogPitch(523, 125)
        pins.analogPitch(659, 650)
        basic.pause(500)
        pins.analogPitch(880, 500)
        pins.analogPitch(440, 300)
        pins.analogPitch(440, 150)
        pins.analogPitch(880, 500)
        pins.analogPitch(831, 325)
        pins.analogPitch(784, 175)
        pins.analogPitch(740, 125)
        pins.analogPitch(698, 125)
        pins.analogPitch(740, 250)
        basic.pause(325)
        pins.analogPitch(466, 250)
        pins.analogPitch(622, 500)
        pins.analogPitch(587, 325)
        pins.analogPitch(554, 175)
        pins.analogPitch(523, 125)
        pins.analogPitch(466, 125)
        pins.analogPitch(523, 250)
        basic.pause(350)
        pins.analogPitch(349, 250)
        pins.analogPitch(415, 500)
        pins.analogPitch(349, 375)
        pins.analogPitch(523, 125)
        pins.analogPitch(440, 500)
        pins.analogPitch(349, 375)
        pins.analogPitch(523, 125)
        pins.analogPitch(440, 650)
        basic.pause(650)
    }


}

