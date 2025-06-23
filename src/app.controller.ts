import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  apiInfo() {
    const uptime = process.uptime();
    const mem = process.memoryUsage();
    const cpu = process.cpuUsage();

    const memoryMB = Object.fromEntries(
      Object.entries(mem).map(([key, value]) => [
        key,
        +(value / 1024 / 1024).toFixed(2),
      ]),
    );

    const cpuMs = {
      user: +(cpu.user / 1000).toFixed(2),
      system: +(cpu.system / 1000).toFixed(2),
    };

    return {
      live: 'OK',
      memoryMB,
      cpuMs,
      env: process.env.ENV || 'development',
      upTime: {
        hours: Math.floor(uptime / 3600),
        minutes: Math.floor((uptime % 3600) / 60),
        seconds: Math.floor(uptime % 60),
      },
    };
  }
}
