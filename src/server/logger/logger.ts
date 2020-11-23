

import config, { log as logconfig } from '../config/config';
import { postWebServer } from '../util/util';


enum LOG_LEVEL {
    DEBUG,
    INFO,
    WARN,
    ERROR,
    CRITICAL
}

enum LOG_CHENNEL {
    LOCAL = 'local',
    WEB = 'web'
}


class Logger {

    private currentChennel: string;
    readonly defaultChennel: string;

    constructor() {
        this.defaultChennel = logconfig.defualt_log_channel;
        this.currentChennel = logconfig.defualt_log_channel;
    }

    public channel(chennel: string): Logger  {
        this.currentChennel = chennel;
        return this;
    }

    public info(msg: string): void {
        const logText = `[info] : ${msg}`;
        this.send(logText, LOG_LEVEL.INFO);
    }

    public error(msg: string): void  {
        const logText = `[error] : ${msg}`;
        this.send(logText, LOG_LEVEL.ERROR);
    }

    public critical(msg: string): void  {
        const logText = `[critical!!] : ${msg}`;
        this.send(logText, LOG_LEVEL.CRITICAL);
    }


    public warning(msg: string): void  {
        const logText = `[warning] : ${msg}`;
        this.send(logText, LOG_LEVEL.WARN);
    }

    public debug(msg: string): void  {
        const logText = `[debug] : ${msg}`;
        this.send(logText, LOG_LEVEL.DEBUG);
    }

    public send(msg: string, level: LogLevel): void  {
        switch (this.currentChennel) {
            case LOG_CHENNEL.LOCAL:
                this.sendLocal(msg, level);
                break;
            case LOG_CHENNEL.WEB:
                this.sendWeb(msg, level);
                break;
        }
        this.currentChennel = this.defaultChennel;
    }

    private sendLocal(msg: string, level: LogLevel): void {
        print(msg);
    }

    private sendWeb(msg: string, level: LogLevel): void {
        Server.HttpPost(config.WEB_BASE_URL + 'logger', { msg, level }, (response) => {
            postWebServer(config.WEB_BASE_URL, { msg, level}, (res) => {
                //
            }, () => {
                this.sendLocal(msg + '(web log timeout)', level);
            });
        });
    }
}




const instance = new Logger();

export const logger = instance;
