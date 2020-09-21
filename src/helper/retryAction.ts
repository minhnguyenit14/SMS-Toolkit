export type RetryTimeoutObjectType = {
  [key: number]: {timeout?: NodeJS.Timeout; isClear: boolean};
};

export type RetryActionType = {
  id: number;
  cancel: () => void;
};

const retryTimeoutObject: RetryTimeoutObjectType = {};

export const retryAction = (
  action: Function,
  maxTime: number,
  interval: number,
  onFinish: Function = () => {},
): RetryActionType => {
  const id = new Date().getTime();
  retryTimeoutObject[id] = {
    isClear: false,
  };
  actionPromise(id, action, maxTime, interval, onFinish);

  return {
    id,
    cancel: () => cancelRetry(id),
  };
};

const actionPromise = (
  id: number,
  action: Function,
  maxTime: number,
  interval: number,
  resolve: Function,
  time: number = 1,
) => {
  if (time <= maxTime) {
    if (!retryTimeoutObject[id].isClear) {
      retryTimeoutObject[id].timeout = setTimeout(() => {
        action(time);
        actionPromise(id, action, maxTime, interval, resolve, ++time);
      }, interval);
    } else {
      delete retryTimeoutObject[id];
      console.log('resolve retry', retryTimeoutObject);
      resolve();
    }
  } else {
    cancelRetry(id);
    delete retryTimeoutObject[id];
    console.log('resolve retry', retryTimeoutObject);
    resolve();
  }
};

const cancelRetry = (id: number) => {
  retryTimeoutObject[id].isClear = true;
  if (retryTimeoutObject[id].timeout !== undefined) {
    //@ts-ignore
    clearTimeout(retryTimeoutObject[id].timeout);
  }
};
