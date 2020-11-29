import config from "../config/config";

const TIME_OUT = 30;

export const postWebServer = (uri:string, data: object, successCallback: (res: string) => void , timeOutCallback: Function, timeOut?: number) => {
    let isResponed = false;
    Server.HttpPost(config.WEB_BASE_URL + uri, data, (response)=> {
        if (isResponed) {
            return false;
        }
        successCallback(response);
        isResponed = true;
    });
    Server.RunLater(() =>{
        if (!isResponed) {
            timeOutCallback();
        }
    },timeOut? timeOut : TIME_OUT);
};
