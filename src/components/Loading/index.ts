import { ViewStyle, StyleProp } from 'react-native';
import { PacmanIndicatorProps } from 'react-native-indicators';

export interface LoadingProps extends PacmanIndicatorProps {
    containerStyle?: StyleProp<ViewStyle>
}

export { default } from './Loading';