import SmsAndroid, {SmsFilter} from 'react-native-get-sms-android';
import {ReceivedSmsMessage} from 'react-native-android-sms-listener';
import {post} from '@network';
import logger, {loggerError} from './logger';
import {showFlashMessage} from './flashMessage';
import {HTTP_STATUS} from '@constants';
import encoding from 'react-native-md5';
import {getUniqueId} from 'react-native-device-info';

const getSMSAndroid = (
  filter: SmsFilter,
  onSuccess: Function,
  onFail: Function = () => {},
) => {
  SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log('get_sms_android' + fail);
      onFail(fail);
    },
    (count, smsListStringnified) => {
      const smsList = JSON.parse(smsListStringnified);
      onSuccess(count, smsList);
    },
  );
};

const callAPIFilteredByKeyword = (
  api: string,
  keyword: string,
  sms: ReceivedSmsMessage,
  secretKey: string,
  getCancelable: Function,
  onPreExecuteAPI: Function = () => {},
  onSuccess: Function = () => {},
  onFail: Function = () => {},
  onFinally: Function = () => {},
) => {
  if (sms.body.includes(keyword)) {
    onPreExecuteAPI();
    executeAPIByScript(
      api,
      sms.originatingAddress,
      sms.body,
      secretKey,
      getCancelable,
      onSuccess,
      onFail,
      onFinally,
    );
  }
};

const callAPIFilteredByRegex = (
  api: string,
  regexString: string,
  regexFlag: string,
  sms: ReceivedSmsMessage,
  secretKey: string,
  getCancelable: Function,
  onPreExecuteAPI: Function = () => {},
  onSuccess: Function = () => {},
  onFail: Function = () => {},
  onFinally: Function = () => {},
) => {
  const regex = new RegExp(regexString, regexFlag);
  if (sms.body.match(regex)) {
    onPreExecuteAPI();
    executeAPIByScript(
      api,
      sms.originatingAddress,
      sms.body,
      secretKey,
      getCancelable,
      onSuccess,
      onFail,
      onFinally,
    );
  }
};

export const executeAPIByScript = async (
  api: string,
  originatingAddress: string,
  message: string,
  secretKey: string,
  getCancelable: Function,
  onSuccess: Function = () => {},
  onFail: Function = () => {},
  onFinally: Function = () => {},
) => {
  try {
    const device_id = getUniqueId();
    const phone_number = originatingAddress;
    const signature = encoding.hex_md5(
      device_id + message + phone_number + secretKey,
    );

    const data = {
      phone_number,
      device_id,
      message,
      signature,
    };

    console.log(data, 'aaa');
    const {cancel, promise} = post(api, data);
    getCancelable(cancel);
    const response = await promise();

    if (response && response.status === HTTP_STATUS.SUCCESS) {
      logger('executeAPIByScript')(response, api, message);
      onSuccess(message);
      showFlashMessage({
        type: 'success',
        message: JSON.stringify(response.data),
        duration: 3000,
      });
    } else {
      loggerError('executeAPIByScript')(response);
      onFail(message);
      showFlashMessage({
        type: 'danger',
        message: response
          ? //@ts-ignore
            response.message || 'Error happened!'
          : 'Error happened!',
      });
    }
  } catch (err) {
    loggerError('executeAPIByScript')(err, api, message);
    onFail(message);
    showFlashMessage({
      type: 'danger',
      message: err
        ? //@ts-ignore
          err.message || 'Error happened!'
        : 'Error happened!',
    });
  } finally {
    onFinally();
  }
};

export {getSMSAndroid, callAPIFilteredByKeyword, callAPIFilteredByRegex};
