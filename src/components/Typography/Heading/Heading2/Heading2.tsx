import React from 'react';
import {
    Text
} from 'react-native';
import { APP_STYLES } from '@constants';
import { Heading2Props } from '@components/Typography/typescript';

const Heading2 = ({
    style,
    ...props
}: Heading2Props) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.heading_2, style]}
        />
    );
}

export default Heading2;