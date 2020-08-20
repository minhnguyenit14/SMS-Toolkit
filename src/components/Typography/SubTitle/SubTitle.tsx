import React from 'react';
import {
    Text, TextInputProps
} from 'react-native';
import { APP_STYLES } from '@constants';
import { SubTitleProps } from '@components/Typography/typescript';

const SubTitle = ({
    style,
    ...props
}: SubTitleProps) => {
    return (
        <Text
            {...props}
            style={[APP_STYLES.subTitle, style]}
        />
    );
}

export default SubTitle;