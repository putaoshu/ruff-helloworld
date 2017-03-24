'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }
   	$('#led-b').turnOn();
   	console.log('#led-b turnOn');
});

$.end(function () {
    $('#led-b').turnOff();
    console.log('#led-b turnOff');
});
