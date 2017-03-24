'use strict';

$.ready(function (error) {
  if (error) {
    console.log(error);
    return;
  }

  $('#led-g').turnOn();
  console.log('start: ' + new Date());

  //lcd https://github.com/ruff-drivers/hd44780
  var lcd = $('#LCD1602-02');
  lcd.clear();
  lcd.print('Hello,Ruff!');
  //lcd.turnOff();
  
  function writeLcd(label,value,x,y){
      lcd.setCursor(x,y);
      // console.log(label + ':' + value);
      if(label) label += ':'; 
      lcd.print(label + value); 
  }

  //led https://rap.ruff.io/raps/ky-016
  var led = $('#ky-016');
  led.turnOn();
  var r, g, b;
  var lightTimer =  setInterval(function () {
      r = Math.random() * 255;
      g = Math.random() * 255;
      b = Math.random() * 255;
      led.setRGB(r, g, b);
  }, 3000);
  //led.turnOff();

  //声音传感器 https://rap.ruff.io/raps/sound-01
  var sound = $('#sound-01');
  var soundTimeout;
  sound.on('sound', function(data) {
      // console.log('sound detected');
      writeLcd('', '.', 15, 1);
      clearTimeout(soundTimeout);
      soundTimeout = setTimeout(function () {
        writeLcd('', 1, 15, 1)
      }, 5000);
  });
  //sound.disable(function(){})

  var 
  tem=0, //温度值
  hum=0, //湿度值
  ill=0 //光照值

  //蜂鸣器 https://rap.ruff.io/raps/buzzer-gpio
  var buzzer = $('#fc-49');
  
  //光照传感器 https://rap.ruff.io/raps/gy-30
  var gz = $('#gy-30');

  //温湿度传感器 https://rap.ruff.io/raps/dht11
  //dht11要安装0.3.5版本驱动,0.3.6有问题的,安装完毕需要重启ruff
  var dht = $('#dht11');
  
  //红色按钮 https://rap.ruff.io/raps/button-gpio
  var button = $('#CK002');
  button.on('push', function () {
    // console.log('Button pushed.');

    buzzer.turnOn(function (error) {
      if (error) {
        console.error(error);
        return;
      }
    });

    dht.getTemperature(function (error, temperature) {
      if (error) {
        console.error(error);
        return;
      }
      // console.log('temperature', temperature);
      tem = temperature;
    });
    
    dht.getRelativeHumidity(function (error, humidity) {
      if (error) {
        console.error(error);
        return;
      }
      // console.log('humidity', humidity);
      hum = humidity;
    });

    gz.getIlluminance(function (error, value) {
      if (error) {
        console.error(error);
        return;
      }
      // console.log('illuminance', value);
      ill = value;
    });
  });

  button.on('release', function () {
    // console.log('Button released.');

    buzzer.turnOff(function (error) {
      if (error) {
        console.error(error);
        return;
      }
    });

    lcd.clear();
    writeLcd('tem', tem, 0, 0)
    writeLcd('hum', hum, 10, 0)
    writeLcd('ill', ill, 0, 1)
  });
});

$.end(function () {
    $('#led-g').turnOff();
    console.log('end  : ' + new Date());
});
