import React from 'react';
import {
    Text
} from 'react-native';
import { APP_STYLES } from '@constants';
import { Heading3Props } from '@components/Typography/typescript';

const Heading3 = ({
    style,
    ...props
}: Heading3Props) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.heading_3, style]}
        />
    );
}

export default Heading3;