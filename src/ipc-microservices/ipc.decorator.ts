/* eslint-disable @typescript-eslint/no-unused-vars */
import { applyDecorators } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { configuredChannels } from './ipc.transport';

export function ElectronIpcOn(channel: string, opts?: any) {
  validateChannel(channel);
  return applyDecorators(ipcDecorator(channel, opts), EventPattern(channel));
}

export function ElectronIpcHandle(channel: string, opts?: any) {
  validateChannel(channel);
  return applyDecorators(ipcDecorator(channel, opts), MessagePattern(channel));
}

const ipcDecorator = (channel: string, opts?: any) => {
  return (target: any, key: string, _descriptor: PropertyDescriptor) => {
    configuredChannels.set(channel, { target, key, channel, opts });
  };
};

function validateChannel(channel: string) {
  if (configuredChannels.has(channel)) {
    throw new Error(
      'Duplicate channel configured in ElectronIpcOn : ' + channel,
    );
  }
}
