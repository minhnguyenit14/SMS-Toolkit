import React, { useState, useEffect } from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputFocusEventData
} from 'react-native';
import { useCode, cond, set, block, call, interpolate } from 'react-native-reanimated';
import { useValue, timing } from 'react-native-redash';
import { InputProps } from '.';
import { Title } from '@components/Typography';
import { APP_STYLES } from '@constants';
import ClearButton from './ClearButton';
import config from '@config';

const styles = StyleSheet.create({
    containerStyle: {
        overflow: 'hidden',
    },
    labelContainer: {
        ...APP_STYLES.rowContainer,
    },
    label: {
        marginBottom: 7
    },
    inputContainer: {
        ...APP_STYLES.rowContainer,
        backgroundColor: '#e7e3da',
        borderRadius: 8,
    },
    input: {
        ...APP_STYLES.bodyText,
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 10

    }
})

const Input = ({
    containerStyle,
    inputContainerStyle,
    style,
    label,
    labelContainerStyle,
    labelStyle,
    leftInput,
    rightInput,
    extraLabel,
    onFocus = () => { },
    onBlur = () => { },
    onChangeText = () => { },
    ...props
}: InputProps) => {
    const [isFocusing, setFocusing] = useState(false);
    const translateX = useValue(100);
    const isInputFocusing = useValue(0);

    useCode(() => {
        return block([
            set(isInputFocusing, isFocusing ? 1 : 0),
            cond(isInputFocusing,
                set(translateX, timing({ from: translateX, to: 0 })),
                set(translateX, timing({ from: translateX, to: 100 }))
            )
        ])
    }, [isFocusing]);

    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setFocusing(true);
        onFocus(e);
    }

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setFocusing(false);
        onBlur(e);
    }

    function handleChangeText(text: string) {
        onChangeText(text);
    }

    function handleClearText() {
        handleChangeText("");
    }

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            <View style={[styles.labelContainer, labelContainerStyle]}>
                {!!label &&
                    <Title style={[styles.label, labelStyle]}>{label}</Title>}
                {extraLabel}
            </View>
            <View style={[styles.inputContainer, inputContainerStyle]}>
                {leftInput}
                <TextInput
                    selectionColor={config.colors.logo.sub3}
                    {...props}
                    onChangeText={handleChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={[styles.input, style]}
                />
                <ClearButton
                    containerStyle={{
                        transform: [{ translateX }],
                        opacity: interpolate(translateX, {
                            inputRange: [0, 100],
                            outputRange: [1, 0]
                        })
                    }}
                    onPress={handleClearText}
                />
                {rightInput}
            </View>
        </View>
    );
}

export default Input;