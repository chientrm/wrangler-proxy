export interface Params {
  proxyType: string;
  name: string;
  metadata: any;
}

export type Data = ReadableStream<any> | null;

export const jsonInit: ResponseInit = {
  headers: { 'Content-Type': 'application/json' },
};

export const stringInit: ResponseInit = {
  headers: { 'Content-Type': 'text/plain' },
};

export type R2PutOptionsExtra = R2PutOptions & {
  onlyIfArr: [key: string, value: string][] | undefined;
  httpMetadataArr: [key: string, value: string][] | undefined;
};
