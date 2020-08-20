import { TextStyle, ViewStyle, GestureResponderEvent, StyleProp } from 'react-native';

export interface PopupProps {
    visible?: boolean,
    title?: string,
    content?: string,
    okText?: string,
    cancelText?: string,
    pressToHide?: boolean,
    onCancel?: (event?: GestureResponderEvent) => void,
    onRequestClose?: (event?: GestureResponderEvent) => void,
    onOk?: (event?: GestureResponderEvent) => void,
    titleStyle?: StyleProp<TextStyle>,
    contentStyle?: StyleProp<ViewStyle>,
    renderContent?: React.ReactNode
}

export { default } from './Popup';