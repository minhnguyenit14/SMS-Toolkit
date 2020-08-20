import React from 'react';
import {
    Text, TextInputProps
} from 'react-native';
import { APP_STYLES } from '@constants';
import { TitleProps } from '@components/Typography/typescript';

const Title = ({
    style,
    ...props
}: TitleProps) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.title, style]}
        />
    );
}

export default Title;