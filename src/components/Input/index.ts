import {
    TextInputProps,
    ViewStyle,
    TextStyle,
    StyleProp
} from 'react-native';

export interface InputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>,
    inputContainerStyle?: StyleProp<ViewStyle>,
    labelStyle?: StyleProp<TextStyle>,
    label?: string,
    labelContainerStyle?: StyleProp<ViewStyle>,
    leftInput?: React.ReactNode,
    rightInput?: React.ReactNode,
    extraLabel?: React.ReactNode
}

export { default } from './Input';