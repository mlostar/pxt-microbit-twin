// tests go here; this will not be compiled when this package is used as a library
{
    //Movement - Motor tests at P8
    //Set DC motor speed to 100
    twin.dcMotor(OUTPINS.P8, 100);
    //Set servomotor rotation speed to 100
    twin.servoMotor(OUTPINS.P8, 100);
    basic.pause(100);

    //Detect - Sensor read tests at P0
    //Show the value read by the proximity sensor
    basic.showNumber(twin.proxSensor(INPINS.P0));
    basic.pause(100);
    //Show the value read by the potantiometer
    basic.showNumber(twin.potantiometer(INPINS.P0));
    basic.pause(100);
    //Show the value read by the sensor
    twin.readSensor(SENSORTYPE.MOVEMENT, INPINS.P0);
    basic.pause(100);

    //Detect - Boolean block tests at P1 
    if (twin.remoteControl(INPINS.P1)) {
        basic.showNumber(1);
    } else {
        basic.showNumber(0);
    }
    basic.pause(100);
    if (twin.buttonPress(INPINS.P1)) {
        basic.showNumber(1);
    } else {
        basic.showNumber(0);
    }
    basic.pause(100);

    //Sound - Buzzer tests at P14
    //Set the buzzer pin as P14
    twin.buzzerPinSel(OUTPINS.P14)
    //Play 100 Hz note for 150 ms
    twin.buzzerCustomNote(100, 150)
    //Play LowC for 200 ms
    twin.buzzerNote(BUZZERNOTES.LOWC, 200)
    //Play Starwars on the buzzer
    twin.buzzerMelody(0)
}