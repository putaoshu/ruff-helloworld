'use strict';

$.ready(function (error) {
  if (error) {
    console.log(error);
    return;
  }

  $('#led-r').turnOn();
  console.log(1);

  //lcd https://github.com/ruff-drivers/hd44780
  var lcd = $('#LCD1602-02');
  lcd.clear();
  lcd.print('Hello,Ruff!');
  lcd.setCursor(0,1);
  lcd.print('vip');
  // lcd.turnOff();

  //led https://rap.ruff.io/raps/ky-016
  var led = $('#ky-016');
  led.turnOn();
  var r, g, b;
  var lightTimer =  setInterval(function () {
      r = Math.random() * 255;
      g = Math.random() * 255;
      b = Math.random() * 255;
      led.setRGB(r, g, b);
  }, 2000);
  // led.turnOff();

  //蜂鸣器 https://rap.ruff.io/raps/buzzer-gpio
  var buzzer = $('#fc-49');
  // buzzer.turnOn(function (error) {
  //   if (error) {
  //     console.error(error);
  //     return;
  //   }
  //   console.log('turned on');
  // });

  //光照传感器 https://rap.ruff.io/raps/gy-30
  var gz = $('#gy-30');
  gz.getIlluminance(function (error, value) {
    if (error) {
      console.error(error);
      return;
    }
    console.log('illuminance', value);
  });

  //声音 sound-01 https://rap.ruff.io/raps/sound-01
  var sound = $('#sound-01');
  sound.on('sound', function(data) {
      console.log('sound detected');
  });
  sound.disable(function(){})

  //温湿度传感器 https://rap.ruff.io/raps/dht11
  // Error: ENOENT: no such file or directory: /sys/devices/dht11/iio:device0/in_temp_input
  //需要重启一下机器
  //"dht11" 驱动要安装 (0.3.5) 0.3.6有问题
  var dht = $('#dht11');
  dht.getTemperature(function (error, temperature) {
    if (error) {
      console.error(error);
      return;
    }
    console.log('temperature', temperature);
  });
  
  dht.getRelativeHumidity(function (error, humidity) {
    if (error) {
      console.error(error);
      return;
    }
    console.log('humidity', humidity);
  });

});

$.end(function () {
    $('#led-r').turnOff();
    $('#fc-49').turnOff();
    console.log(0);
});
