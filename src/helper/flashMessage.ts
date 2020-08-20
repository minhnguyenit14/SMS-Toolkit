import FlashMessage, {
    showMessage,
    hideMessage,
    MessageOptions
} from 'react-native-flash-message';
import {
    FM_SUCCESS_THEME,
    FM_DANGER_THEME,
    FM_INFO_THEME,
    FM_WARNING_THEME
} from '@constants';


const showFlashMessage = (props: MessageOptions) => {
    let theme = {};
    switch (props.type) {
        case 'danger':
            theme = FM_DANGER_THEME;
            break;
        case 'success':
            theme = FM_SUCCESS_THEME;
            break;
        case 'info':
            theme = FM_INFO_THEME;
            break;
        case 'warning':
            theme = FM_WARNING_THEME;
            break;
        default:
            break;
    }
    showMessage({ ...props, ...theme });
};

const hideFlashMessage = hideMessage;

export {
    FlashMessage,
    showFlashMessage,
    hideFlashMessage
};