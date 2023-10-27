export type FsdtServerConfig = {
  domainName?: string; // default is "localhost"
  port: number;
  connectionType?: 'source' | 'monitor';
  useConsole?: boolean;
  disable?: boolean;
};
