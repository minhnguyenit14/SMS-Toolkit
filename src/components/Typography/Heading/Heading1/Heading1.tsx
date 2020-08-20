import React from 'react';
import {
    Text,
} from 'react-native';
import { APP_STYLES } from '@constants';
import { Heading1Props } from '@components/Typography/typescript';

const Heading1 = ({
    style,
    ...props
}: Heading1Props) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.heading_1, style]}
        />
    );
}

export default Heading1;