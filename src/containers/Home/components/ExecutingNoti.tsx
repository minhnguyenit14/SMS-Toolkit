import React, { SFC, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import { useValue, timing } from 'react-native-redash';
import Animated, { set, useCode, block } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Entypo';
import config from '@config';
import Description from '@components/Typography/Description';
import { BlurView } from '@react-native-community/blur';

export type ExecutingNotiType = "success" | "error" | "loading" | "";

export interface ExecutingNotiProps {
    type?: ExecutingNotiType,
    visible?: boolean,
    message?: string
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 30,
        maxWidth: 200,
        backgroundColor: 'rgba(0,0,0,.3)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        overflow: 'hidden'
    },
    icon: {
        fontSize: 36,
        color: '#fff'
    },
    iconSuccess: {
        color: config.colors.status.success
    },
    iconError: {
        color: config.colors.status.danger
    },
    message: {
        marginTop: 15,
        color: '#fff',
    }
})

const executingNoti: SFC<ExecutingNotiProps> = ({
    type = "loading",
    visible = false,
    message = ""
}) => {
    const [executingMessageType, setExecutingMessageType] = useState(type);
    const isVisible = useValue(0);
    const opacity = useValue(0);

    useEffect(() => {
        if (visible) {
            set(isVisible, 1);
        }
    }, [])

    useEffect(() => {
        if (type !== "") {
            setExecutingMessageType(type);
        }
    }, [type]);

    useCode(() => {
        return block([
            set(isVisible, visible ? 1 : 0),
            set(opacity, timing({ from: opacity, to: visible ? 1 : 0, duration: 300 }))
        ]);
    }, [visible]);

    const renderContent = () => {
        switch (executingMessageType) {
            case "loading":
                return (
                    <ActivityIndicator size="large" color="#fff" />
                )
            case "success":
                return (
                    <Icon name="check" style={[styles.icon, styles.iconSuccess]} />
                )
            case "error":
                return (
                    <Icon name="cross" style={[styles.icon, styles.iconError]} />
                )
        }
    }

    return (
        <Animated.View pointerEvents="none" style={[styles.container, { opacity }]}>
            <BlurView
                style={StyleSheet.absoluteFillObject}
                blurAmount={2}
            />
            <View style={[styles.content]}>
                {renderContent()}
                {!!message && <Description numberOfLines={6} style={styles.message}>{message}</Description>}
            </View>
        </Animated.View>
    )
}

export default executingNoti;