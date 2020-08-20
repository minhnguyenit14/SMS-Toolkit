import React from 'react';
import {
    Text
} from 'react-native';
import { APP_STYLES } from '@constants';
import { DescriptionProps } from '@components/Typography/typescript';

const Description = ({
    style,
    ...props
}: DescriptionProps) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.description, style]}
        />
    );
}

export default Description;