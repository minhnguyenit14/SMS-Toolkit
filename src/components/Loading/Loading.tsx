import React from 'react';
import { PacmanIndicator } from 'react-native-indicators';
import { APP_STYLES } from '@constants';
import { View, StyleSheet } from 'react-native';
import { LoadingProps } from '.';

const styles = StyleSheet.create({
    containerStyle: {

    }
})

const Loading = ({
    color = APP_STYLES.loading.color,
    ...props }: LoadingProps) => {
    return (
        <View style={[styles.containerStyle, props.containerStyle]}>
            <PacmanIndicator
                color={color}
                {...props}
            />
        </View>
    )
}

export default Loading;
