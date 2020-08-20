import React from 'react';
import {
    StyleSheet, GestureResponderEvent
} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@components/Button';

export interface ClearButtonProps {
    onPress: (e: GestureResponderEvent) => void,
    containerStyle?: Animated.AnimateStyle<any>
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
    },
    btn: {
        padding: 0,
        backgroundColor: 'transparent'
    },
    icon: {
        fontSize: 18,
        color: '#999'
    },
})

const ClearButton = ({
    containerStyle,
    onPress
}: ClearButtonProps) => {

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <Button touchableOpacity onPress={onPress} containerStyle={styles.btn}>
                <Icon name="close-circle" style={styles.icon} />
            </Button>
        </Animated.View>
    );
}

export default ClearButton;