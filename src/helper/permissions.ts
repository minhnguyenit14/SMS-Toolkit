import {
    PermissionsAndroid,
    Platform,
    PermissionStatus
} from 'react-native';
import logger, { loggerError } from './logger';

const handleSmsPermissionAndroid = async () => {
    let hasPermissions = false;
    if (Platform.OS === "android") {
        try {
            hasPermissions = await checkSmsPermissions();
            if (!hasPermissions) {
                hasPermissions = await requestSmsPermissions();
            }
            return hasPermissions;
        } catch (e) {
            loggerError('handleSmsPermissionAndroid')(e);
            hasPermissions = false;
        } finally {
            return hasPermissions;
        }
    };

    return false;
}

const checkSmsPermissions = async () => {
    let hasPermissions = false;
    try {
        // hasPermissions = await PermissionsAndroid.check(
        //     PermissionsAndroid.PERMISSIONS.READ_SMS
        // );
        hasPermissions = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
        );
    } catch (e) {
        loggerError('checkSmsPermissions')(e);
        hasPermissions = false;
    } finally {
        return hasPermissions;
    }
}

const requestSmsPermissions = async () => {
    let granted: { [key: string]: PermissionStatus } = {};
    let hasPermissions: boolean | null = true;
    try {
        // logger("requestSmsPermissions")("requesting SMS permissions");
        granted = await PermissionsAndroid.requestMultiple(
            [
                // PermissionsAndroid.PERMISSIONS.READ_SMS,
                PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
                // PermissionsAndroid.PERMISSIONS.SEND_SMS
            ]
        );
        // logger("requestSmsPermissions")(granted);
        Object.values(granted).forEach((result: PermissionStatus) => {
            if (result !== PermissionsAndroid.RESULTS.GRANTED && hasPermissions !== null) {
                hasPermissions = false;
            }
            if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                hasPermissions = null;
            }
        })
        if (hasPermissions) {
            logger("requestSmsPermissions")("You can use SMS features");
        } else {
            logger("requestSmsPermissions")("SMS permission denied");
        }
        console.log(hasPermissions, 'a')
        return hasPermissions;
    } catch (err) {
        loggerError('requestSmsPermissions')(err);
        return false;
    }
}

export {
    handleSmsPermissionAndroid,
    checkSmsPermissions,
    requestSmsPermissions
}