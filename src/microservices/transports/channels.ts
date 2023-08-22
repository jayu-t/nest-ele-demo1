import type { IpcOptions } from '../interface';

interface MapData {
  target: object;
  key: string | symbol;
  channel: string;
  opts?: IpcOptions;
}

export const ChannelMaps = new Map<string, MapData>();
