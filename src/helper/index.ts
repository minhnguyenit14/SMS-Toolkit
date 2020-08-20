import {
    FlashMessage,
    showFlashMessage,
    hideFlashMessage
} from './flashMessage';
import logger from './logger';
import {
    handleSmsPermissionAndroid,
    checkSmsPermissions,
    requestSmsPermissions
} from './permissions';
import { lightenColor } from './colors';
import {
    getSMSAndroid,
    executeAPIByScript
} from './sms'

export {
    FlashMessage,
    showFlashMessage,
    hideFlashMessage,

    logger,

    handleSmsPermissionAndroid,
    checkSmsPermissions,
    requestSmsPermissions,

    lightenColor,

    getSMSAndroid,
    executeAPIByScript
};