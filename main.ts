/**
 * Enumeration for output pins
 */
enum OUTPINS {
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
enum INPINS {
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
enum SENSORTYPE {
    //% block=movement
    MOVEMENT,
    //% block=light
    LIGHT,
    //% block=sound
    SOUND
}
/**
* Enumeration for buzer melodies 
*/
enum BUZZERMELODIES {
    STARWARS
}
/**
* Enumeration for buzzer notes 
*/
enum BUZZERNOTES {
    LOWC = 131,
    LOWCS = 139,
    LOWD = 147,
    LOWDS = 156,
    LOWE = 165,
    LOWF = 175,
    LOWFS = 185,
    LOWG = 196,
    LOWGS = 208,
    LOWA = 220,
    LOWAS = 234,
    LOWB = 247,
    MIDDLEC = 262,
    MIDDLECS = 278,
    MIDDLED = 294,
    MIDDLEDS = 311,
    MIDDLEE = 330,
    MIDDLEF = 349,
    MIDDLEFS = 370,
    MIDDLEG = 394,
    MIDDLEGS = 415,
    MIDDLEB = 494,
    HIGHC = 523,
    HIGHCS = 554,
    HIGHD = 587,
    HIGHDS = 632,
    HIGHE = 659,
    HIGHF = 699,
    HIGHFS = 740,
    HIGHG = 784,
    HIGHGS = 831,
    HIGHA = 880,
    HIGHAS = 932,
    HIGHB = 988,
}
/**
* Enumeration for pin modes 
*/
enum PINMODE {
    ANALOG,
    DIGITAL
}

/**
 * Provides access to Twin micro:bit extension
 */
//% color=170 weight=49 block="Twin" icon="\uf076"
namespace twin {
    let buzzerOccupied = false;
    //Movement
    /**
    * Select DC Motor Pin and velocity
    */
    //% blockId="twin_dc_movement" block="DC motor at %outPin speed %velocity"
    //% velocity.min=0 velocity.max=100
    //% weight=100
    //% subcategory=Movement
    export function dcMotor(outPin: OUTPINS, velocity: number) {
        if (velocity != 0) {
            velocity = 495 + 5.28 * velocity
        }
        pinWrite(PINMODE.ANALOG, outPin, velocity);
    }

    /**
    * Select Servomotor Pin and speed when it is operating in b mode
    */
    //% blockId="twin_servo_movement" block="servomotor at %outPin rotation speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=90
    //% subcategory=Movement
    export function servoMotor(outPin: OUTPINS, speed: number) {
        pinWrite(PINMODE.ANALOG, outPin, speed)
    }

    //Detect
    /**
    * Read the sensor at given pin
    */
    //% blockId="twin_sensor_detect" block="value read by the %sensor sensor at %inPin"
    //% weight=100
    //% subcategory=Detect
    export function readSensor(sensor: SENSORTYPE, inPin: INPINS): number {
        let readValue = pinRead(PINMODE.ANALOG, inPin);
        return readValue
    }

    /**
    * Get the button state(Pressed or not) at given pin
    */
    //% blockId="twin_button_detect" block="button at %inPin is pressed"
    //% weight=95
    //% subcategory=Detect
    export function buttonPress(inPin: INPINS): boolean {
        let readValue = pinRead(PINMODE.ANALOG, inPin);
        if (aToD(readValue)) return true;
        else return false;
    }

    /**
    * Get the remote control state(Detecs signal or not) at given pin
    */
    //% blockId="twin_remote_detect" block="remote control at %inPin detects signal"
    //% weight=90
    //% subcategory=Detect
    export function remoteControl(inPin: INPINS): boolean {
        let readValue = pinRead(PINMODE.ANALOG, inPin);
        if (aToD(readValue)) return true;
        else return false;
    }

    /**
    * Read the potantiometer value at given pin
    */
    //% blockId="twin_potantiometer_detect" block="value read by the potantiometer at %inPin"
    //% weight=85
    //% subcategory=Detect
    export function potantiometer(inPin: INPINS): number {
        return pinRead(PINMODE.ANALOG, inPin);
    }

    /**
    * Read the infrared proximity sensor value at given pin
    */
    //% blockId="twin_proximity_detect" block="value read by the proximity sensor at %inPin"
    //% weight=80
    //% subcategory=Detect
    export function proxSensor(inPin: INPINS): number {
        return pinRead(PINMODE.ANALOG, inPin);
    }

    //Light and Sound
    /**
     * Select the pin the buzzer is connected to
     */
    //% blockId="twin_buzzersel_sound" block="select %outpin as the buzzer connection"
    //% weight=100
    //% subcategory=Sound
    export function buzzerPinSel(outPin: OUTPINS) {
        switch (outPin) {
            case OUTPINS.P8:
                pins.analogSetPitchPin(AnalogPin.P8);
                break;
            case OUTPINS.P14:
                pins.analogSetPitchPin(AnalogPin.P14);
                break;
            case OUTPINS.P16:
                pins.analogSetPitchPin(AnalogPin.P16);
                break;
        }
    }

    /**
     * Play the selected melody on the buzzer connected at the selected pin
     *  Next block will not wait this melody to complete!
     */
    //% blockId="twin_melody_sound" block="play %melody on the buzzer"
    //% weight=97
    //% subcategory=Sound
    export function buzzerMelody(melody: BUZZERMELODIES) {
        //TODO STARWARS only for now
        switch (melody) {
            case BUZZERMELODIES.STARWARS:
                STARWARS();
                break;
        }
    }

    /**
     * Play the selected note on the buzzer connected at the selected pin
     */
    //% blockId="twin_note_sound" block="play tone %note for %ms ms"
    //% weight=95
    //% subcategory=Sound
    export function buzzerNote(note: BUZZERNOTES, ms: number) {
        pins.analogPitch(note, ms);
    }

    /**
     * Play the input frequency on the buzzer connected at the selected pin
     */
    //% blockId="twin_customnote_sound" block="play tone %note (Hz) for %ms ms"
    //% weight=90
    //% subcategory=Sound
    export function buzzerCustomNote(note: number, ms: number) {
        pins.analogPitch(note, ms);
    }


    function pinWrite(PinMode: PINMODE, outPin: OUTPINS, value: number) {
        if (PinMode == PINMODE.ANALOG) {
            switch (outPin) {
                case OUTPINS.P8:
                    pins.analogWritePin(AnalogPin.P8, value);
                    break;
                case OUTPINS.P14:
                    pins.analogWritePin(AnalogPin.P14, value);
                    break;
                case OUTPINS.P16:
                    pins.analogWritePin(AnalogPin.P16, value);
                    break;
            }
        } else {
            switch (outPin) {
                case OUTPINS.P8:
                    pins.digitalWritePin(DigitalPin.P8, value);
                    break;
                case OUTPINS.P14:
                    pins.digitalWritePin(DigitalPin.P14, value);
                    break;
                case OUTPINS.P16:
                    pins.digitalWritePin(DigitalPin.P16, value);
                    break;
            }
        }
    }
    function pinRead(pinMode: PINMODE, inPin: INPINS): number {
        if (pinMode == PINMODE.ANALOG) {
            switch (inPin) {
                case INPINS.P0:
                    return pins.analogReadPin(AnalogPin.P0);
                case INPINS.P1:
                    return pins.analogReadPin(AnalogPin.P1);
                case INPINS.P2:
                    return pins.analogReadPin(AnalogPin.P2);
                default: return -1;
            }
        } else {
            switch (inPin) {
                case INPINS.P0:
                    return pins.digitalReadPin(DigitalPin.P0);
                case INPINS.P1:
                    return pins.digitalReadPin(DigitalPin.P1);
                case INPINS.P2:
                    return pins.digitalReadPin(DigitalPin.P2);
                default: return -1;
            }
        }
    }
    function aToD(value: number): number { if (value >= 495) return 1; else return 0; }
    //Todo BuzzerOccupied is a temporary solution
    function STARWARS() {
        if (buzzerOccupied != true) {
            control.inBackground(function () {
                buzzerOccupied = true;
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
                buzzerOccupied = false;
            })
        }
    }


}

