import {
    TouchableHighlightProps,
    TouchableOpacityProps,
    ViewStyle,
    TextStyle,
    StyleProp
} from 'react-native';
import { ButtonType } from './constants';


export interface ButtonProps extends TouchableHighlightProps, TouchableOpacityProps {
    containerStyle?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
    label?: string,
    type?: ButtonType,
    children?: React.ReactNode,
    touchableOpacity?: boolean
}

export { default } from './Button';

export {
    ButtonType
}