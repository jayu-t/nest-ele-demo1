/* eslint-disable @typescript-eslint/no-unused-vars */
import { applyDecorators } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { configuredChannels } from './ipc.transport';

export function ElectronIpcOn(channel: string, opts?: any) {
  if (configuredChannels.has(channel)) {
    throw new Error(
      'Duplicate channel configured in ElectronIpcOn : ' + channel,
    );
  }
  return applyDecorators(
    (target: any, key: string, _descriptor: PropertyDescriptor) => {
      configuredChannels.set(channel, { target, key, channel, opts });
    },
    EventPattern(channel),
  );
}

export function ElectronIpcHandle(channel: string, opts?: any) {
  if (configuredChannels.has(channel)) {
    throw new Error(
      'Duplicate channel configured in ElectronIpcHandle : ' + channel,
    );
  }
  return applyDecorators(
    (target: any, key: string, _descriptor: PropertyDescriptor) => {
      configuredChannels.set(channel, { target, key, channel, opts });
    },
    MessagePattern(channel),
  );
}
