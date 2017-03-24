'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    console.log('start');

    var button = $('#CK002');

    button.on('push', function () {
        console.log('Button pushed.');
        $('#led-r').turnOn();
    });

    button.on('release', function () {
        console.log('Button released.');
        $('#led-r').turnOff();
    });
});

$.end(function () {
    console.log('end');
    $('#led-r').turnOff();
});
