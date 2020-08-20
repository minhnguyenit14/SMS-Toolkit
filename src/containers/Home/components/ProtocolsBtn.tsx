import React from 'react';
import { StyleSheet, GestureResponderEvent } from 'react-native';
import { Button, BodyText } from '@components';
import { ButtonType } from '@components/Button/constants';

export interface ProtocolsBtnProps {
    onPress: (event: GestureResponderEvent) => void,
    protocol: string
};

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 10
    },
    extraInput: {
        color: '#fff'
    }
});

const ProtocolsBtn: React.SFC<ProtocolsBtnProps> = ({
    onPress,
    protocol
}) => {
    return (
        <Button containerStyle={styles.btn} type={ButtonType.info} onPress={onPress}>
            <BodyText style={styles.extraInput}>{protocol}</BodyText>
        </Button>
    );
}

export default ProtocolsBtn;