import React from 'react';
import {
    TouchableOpacity,
    TouchableHighlight, StyleSheet
} from 'react-native';
import { ButtonProps } from '.';
import { ButtonType, HIT_SLOP } from './constants';
import { Heading3 } from '../Typography';
import config from '@config';
import { lightenColor } from '@helper';

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 8
    },
    label: {
        color: '#fff',
        textAlign: 'center'
    },
    primary: {
        backgroundColor: config.colors.primary
    },
    success: {
        backgroundColor: config.colors.status.success
    },
    danger: {
        backgroundColor: config.colors.status.danger
    },
    warning: {
        backgroundColor: config.colors.status.warning
    },
    disabled: {
        backgroundColor: config.colors.status.disabled
    },
    cancel: {
        backgroundColor: config.colors.status.cancel
    },
    info: {
        backgroundColor: config.colors.status.primary
    },
})

const Button = ({
    containerStyle,
    label,
    labelStyle,
    type = ButtonType.primary,
    children,
    touchableOpacity = false,
    underlayColor,
    style,
    ...props
}: ButtonProps) => {

    const ButtonComponent = touchableOpacity
        ? TouchableOpacity
        : TouchableHighlight;

    function getTheme() {
        switch (type) {
            case ButtonType.primary:
                return styles.primary;
            case ButtonType.success:
                return styles.success;
            case ButtonType.danger:
                return styles.danger;
            case ButtonType.warning:
                return styles.warning;
            case ButtonType.disabled:
                return styles.disabled;
            case ButtonType.cancel:
                return styles.cancel;
            case ButtonType.info:
                return styles.info;
            default:
                return styles.primary;
        }
    }

    function getUnderlayColor() {
        return underlayColor || lightenColor(getTheme().backgroundColor, -10);
    }

    function renderContent() {
        let title = "";
        if (children) {
            if (typeof children === 'string') {
                title = children;
            } else {
                return children;
            }
        } else if (!!label) {
            title = label;
        }

        return (
            <Heading3 style={[
                styles.label,
                labelStyle
            ]}>
                {title}
            </Heading3>
        )
    }

    return (
        <ButtonComponent
            hitSlop={HIT_SLOP}
            style={[styles.container, getTheme(), style, containerStyle]}
            underlayColor={getUnderlayColor()}
            {...props}
        >
            {renderContent()}
        </ButtonComponent>
    );
}

export default Button;