const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const port = new SerialPort({ path: "/dev/tty.usbserial-A70063ha", baudRate: 9600 });

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }
    log('Port open success');
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

parser.on('data', (data) => {
    console.log(data);
    port.write('Node js\n');
    port.drain(err => {
        if (err) {
            return console.log('Error on write: ', err.message);
        };
        console.log("send finished");
    });
});
