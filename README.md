#hello-ruff

用Ruff开发套件开发板物联网智能硬件应用开发

2017年3月

##实现特性
1.初始化后lcd显示“Hello Ruff!”
2.定时采集声音数据，输入到lcd上
3.led随机显示RGB颜色
4.红色按钮点击后，蜂鸣器响起，同时lcd显示温度值，温度值，光照值

##入口程序
src/index.js

##用到的传感器清单
LCD1602-02 lcd
ky-016 led
sound-01 声音传感器
fc-49 蜂鸣器
gy-30 光照传感器
dht11 温湿度传感器
CK002 红色按钮

##依赖
Ruff V1.7.1 
5V电源

##官网
https://ruff.io

##相关命令

	下载sdk https://ruff.io/zh-cn/docs/download.html
	rap system upgrade --hostname 192.168.199.114 ~/Downloads/ruffos-1.7.1.bin 固件如果不是最新的需要升级

	mkdir hello-ruff 新建项目文件夹
	cd hello-ruff 进入项目文件夹
	rap init 初始化Ruff应用

	rap device add|remove|list 添加、删除、查看外设 比如rap device add CK002
	rap layout --visual 添加外设后可根据可视化layout来插线

	rap deploy 192.168.199.114 -s 往ruff写程序同时启动应用
	rap start 192.168.199.114 启动应用
	rap stop 192.168.199.114 关闭应用
	rap log 192.168.199.114 应用日志输出

##可应用领域
火灾监测
门禁监控
可穿戴设备
...