class Config {
  private processor : NodeJS.Process;

  env: any;

  port: number;

  logDir: string;

  constructor(process: NodeJS.Process) {
    this.processor = process;
  }

  getConfig() {
    this.env = this.processor ? this.processor.env : process.env;
    this.port = this.env.APP_PORT;
    this.logDir = this.env.LOG_DIR;
    return this;
  }
}

export  { Config };
