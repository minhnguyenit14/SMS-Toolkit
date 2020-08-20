import React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';
import { Button, BodyText } from '@components';
import { ButtonType } from '@components/Button/constants';

export type RegexFlagType = "" | "g" | "i" | "m" | "s" | "u" | "y";

export interface RegexFlagsBtnProps {
    onPress: (event: GestureResponderEvent) => void,
    flags: Array<RegexFlagType>
};

const styles = StyleSheet.create({
    btn: {
        height: '100%',
        marginLeft: 10,
        paddingVertical: 10
    },
    extraInput: {
        color: '#fff'
    }
});

const RegexFlagsBtn: React.SFC<RegexFlagsBtnProps> = ({
    onPress,
    flags
}) => {
    return (
        <Button containerStyle={styles.btn} type={ButtonType.info} onPress={onPress}>
            <BodyText style={styles.extraInput}>{flags.join("")}</BodyText>
        </Button>
    );
}

export default RegexFlagsBtn;