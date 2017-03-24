'use strict';

var http = require('http');

var options = {
    host: 'httpbin.org',
    path: '/post',
    method: 'POST'
};

function postState(state) {
    var req = http.request(options, function(res) {
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });

    req.write(state);
    req.end();
}

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#button').on('push', function() {
        console.log('Button pushed.');
        $('#led-r').turnOn(function() {
            postState('turn on');
        });
    });

    $('#button').on('release', function() {
        console.log('Button released.');
        $('#led-r').turnOff(function() {
            postState('turn off');
        });
    });
});

$.end(function () {
    $('#led-r').turnOff();
});
