import React from 'react';
import {
    Text
} from 'react-native';
import { APP_STYLES } from '@constants';
import { BodyTextProps } from '@components/Typography/typescript';

const BodyText = ({
    style,
    ...props
}: BodyTextProps) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.bodyText, style]}
        />
    );
}

export default BodyText;