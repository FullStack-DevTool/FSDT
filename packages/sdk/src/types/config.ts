export type FsdtServerConfig = {
  port: number;
  domainName?: string; // default is "localhost"
  connectionType?: 'source' | 'monitor';
  useConsole?: boolean;
  disable?: boolean;
  printErrors?: boolean;
};
