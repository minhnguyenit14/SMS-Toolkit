const logging = (namespace: any, log: any, ...argurments: Array<any>) => {
    if (argurments.length !== 0) {
        console.log(namespace, log, ...argurments);
    } else {
        console.log(namespace, log);
    }
};

const logger = (namespace: any = '') => {
    return (log: any, ...argurments: any) => {
        logging(namespace, log, ...argurments);
    };
};

export const loggerError = (namespace = '') => {
    namespace += "_error";
    return (log: any, ...argurments: any) => {
        logging(namespace, log, ...argurments);
    };
};

export default logger;